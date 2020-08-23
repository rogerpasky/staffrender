/**
 * @license
 * Copyright 2019 Pascual de Juan. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {
  StaffInfo, TimeSignatureInfo, NoteInfo, QuarterInfo, 
  DEFAULT_TEMPO, DEFAULT_TIME_SIGNATURE, DEFAULT_KEY_SIGNATURE
} from './staff_info';
import { StaffBlock, StaffNote, splitStaffNote } from './staff_block';
import { 
  MAX_QUARTER_DIVISION, SCALES, KEY_ACCIDENTALS 
} from './model_constants';
export { KEY_ACCIDENTALS }; // TODO: Review

/** A map of staff blocks indexed by starting quarter */
type StaffBlockMap = Map<number, StaffBlock>;

/** Temporary storage of accidentals activated on a bar by MIDI note */
type BarAccidentals = {[pitch: number]: number};

/**
 * Models a staff info into a musical structure of staff blocks indexed by the
 * quarter they start from
 */
export class StaffModel {
  /** The input staff info, stored for further outer modifications */
  public staffInfo: StaffInfo;
  /**  Staff clef as MIDI pitch note at the staff 3rd line (G clef -> B = 71) */
  public clef: number;
  /** Default Key in case there's none on staff info */
  public defaultKey: number;
  /** An extra block to store previous rest to complete anacrusis bar */
  public initialRest: StaffBlock; // TODO: Deprecated
  /** The resut of staff analysis on staff blocks indexed by starting quarter */
  public staffBlockMap: StaffBlockMap;
  /** The bar, tempo, time signature and key signature info by quarters */
  private quartersInfo: QuarterInfo[];
  /** Last handled quarter, i.e. staff length in quarters */
  private lastQ:number; // TODO: Deprecated

  /**
   * Creates a `StaffModel` storing input data and result
   * @param staffInfo Generic information about a score to crate a staff with
   * @param defaultKey Default value to force the desired key at bar 0
   */
  constructor(staffInfo: StaffInfo, defaultKey?: number) {
    this.staffInfo = staffInfo;
    const startingKey = defaultKey? 
      { start: 0, key: defaultKey }: DEFAULT_KEY_SIGNATURE;
      
    this.staffInfo.notes.sort( (x, y) => x.start - y.start );

    // TODO: Review
    this.lastQ = 0;
    this.staffInfo.notes.forEach(
      note => {
        if (note.start + note.length > this.lastQ) {
          this.lastQ = note.start + note.length;
        }
      }
    );

    if (this.staffInfo.tempos && this.staffInfo.tempos.length) {
      this.staffInfo.tempos.sort( (x, y) => x.start - y.start );
    }
    else {
      this.staffInfo.tempos = [DEFAULT_TEMPO];
    }
    if (this.staffInfo.tempos[0].start !== 0) {
      this.staffInfo.tempos = [DEFAULT_TEMPO].concat(this.staffInfo.tempos);
    }

    if (this.staffInfo.keySignatures && this.staffInfo.keySignatures.length) {
      this.staffInfo.keySignatures.sort( (x, y) => x.start - y.start );
    }
    else {
      this.staffInfo.keySignatures = [startingKey];
    }
    if (this.staffInfo.keySignatures[0].start !== 0) {
      this.staffInfo.keySignatures = 
        [startingKey].concat(this.staffInfo.keySignatures);
    }

    if (this.staffInfo.timeSignatures && this.staffInfo.timeSignatures.length) {
      this.staffInfo.timeSignatures.sort( (x, y) => x.start - y.start );
    }
    else {
      this.staffInfo.timeSignatures = [DEFAULT_TIME_SIGNATURE];
    }
    if (this.staffInfo.timeSignatures[0].start !== 0) {
      this.staffInfo.timeSignatures = 
        [DEFAULT_TIME_SIGNATURE].concat(this.staffInfo.timeSignatures);
    }

    this.clef = this.guessClef();
    this.defaultKey = staffInfo.keySignatures[0].key; // TODO: Remove
    this.quartersInfo = new Array();
    this.setQuartersInfo();

    this.initialRest = new StaffBlock(); // TODO: Optimize
    this.staffBlockMap = null;
    this.infoToBlocks(this.staffInfo);
  }

  /**
   * Analyzes stored info and defaults to update `staffBlockMap`, unless the
   * staff info received has not changed (in length of its members).
   * @param staffInfo New staff information to replace previous one.
   * @returns Analyzed staff as an indexed per quarter `StaffBlockMap`
   */
  public analyzeStaffInfo(staffInfo: StaffInfo): StaffBlockMap {
    if (
      this.staffBlockMap === null || // Constructor use case
      staffInfo.notes.length !== this.staffInfo.notes.length ||
      staffInfo.tempos.length !== this.staffInfo.tempos.length ||
      staffInfo.keySignatures.length !== this.staffInfo.keySignatures.length ||
      staffInfo.timeSignatures.length !== this.staffInfo.timeSignatures.length
    ) {
      this.staffInfo = staffInfo;
      this.staffBlockMap = new Map(); // Future usage for incremental blocks
      this.lastQ = -1;
      const barBeginnings = this.getBarBeginnings();

      // 1st pass to group all notes into chunks and define split points
      let chunks = new Map<number, StaffNote[]>();
      const splites = new Set<number>(barBeginnings); // Bars = split points
      this.staffInfo.notes.forEach( 
        note => {
          const staffNote = toStaffNote(note);
          const staffNoteEnd = staffNote.start + staffNote.length;
          noteToChunk(staffNote, chunks);
          splites.add(staffNote.start);
          splites.add(staffNoteEnd);
          if (staffNoteEnd > this.lastQ) { this.lastQ = staffNoteEnd; }
        }
      );
      this.setQuartersInfo(); // Once this.lastQ is known

      // 2nd pass to apply all splites to the right chunks
      const sortedSplites = Array.from(splites).sort((x, y) => x - y);
      sortedSplites.forEach( // TODO: Review optimization
        split => {
          const remains: StaffNote[] = [];
          chunks.forEach(
            chunk => {
              chunk.forEach(
                staffNote => {
                  const remainStaffNote = splitStaffNote(staffNote, split);
                  if (remainStaffNote) {
                    remains.push(remainStaffNote);
                  }
                }
              );
            }
          );
          remains.forEach(staffNote => noteToChunk(staffNote, chunks));
        }
      );
      chunks = new Map(Array.from(chunks).sort((x, y) => x[0] - y[0]));

      // 3rd pass, chunk to block (vStep, accidentals, min/max values and rests)
      let barAccidentals: BarAccidentals = {}; // Temporal accidentals
      let lastStaffBlock: StaffBlock = null;
      let lastBlockEnd = 0;
      const it = barBeginnings[Symbol.iterator]();
      let currentBar = it.next();
      chunks.forEach(
        (chunk: StaffNote[], quarters: number) => {
          const keySignature = this.keySignatureAtQ(quarters);
          const barStart: number = currentBar.value;
          const barLength = getBarLength(this.timeSignatureAtQ(quarters));
          const barEnd = barStart + barLength;
          const staffBlock = new StaffBlock( // The block to be filled&inserted
            quarters,
            chunk[0].length,
            [],
            quarters / barLength // TODO: Review time changes
          );
          if (staffBlock.isBarBeginning()) {
            barAccidentals = {}; // Reset bar accidentals
          }
          if (!currentBar.done && quarters >= barEnd) { // New bar
            currentBar = it.next(); // Prepare for next iteration
          }
          chunk.forEach(
            staffNote => {
              placeNote(staffNote, barAccidentals, this.clef, keySignature);
              staffBlock.minVStep = 
                Math.max(staffNote.vSteps, staffBlock.minVStep);
              staffBlock.maxVStep = 
                Math.min(staffNote.vSteps, staffBlock.maxVStep);
              staffBlock.notes.push(staffNote);  
            }
          );
          if (lastStaffBlock) { // Rest length from last block to this one
            lastStaffBlock.restToNextLength = quarters - lastBlockEnd;
            const previousRest = new StaffBlock( // TODO: crossing bars rest ***
              lastBlockEnd,
              quarters - lastBlockEnd,
              [],
              lastBlockEnd / barLength // TODO: Review time changes
            );
            this.staffBlockMap.set(lastBlockEnd, previousRest);
          }
          lastStaffBlock = staffBlock;
          lastBlockEnd = quarters + staffBlock.notes[0].length;
          this.staffBlockMap.set(quarters, staffBlock); // Block insertion
        }
      );
  
      this.initialRest.restToNextLength = // First rest in case of anacrusis
        this.staffBlockMap.values().next().value.notes[0].start;
    }
    return this.staffBlockMap;
  }

  /**
   * Analyzes stored info and defaults to update `staffBlockMap`, unless the
   * staff info received has not changed (in length of its members).
   * @param staffInfo New staff information to replace previous one.
   * @returns Analyzed staff as an indexed per quarter `StaffBlockMap`
   */
  public infoToBlocks(staffInfo: StaffInfo): StaffBlockMap {
    if (
      this.staffBlockMap === null || // Constructor use case
      staffInfo.notes.length !== this.staffInfo.notes.length ||
      staffInfo.tempos.length !== this.staffInfo.tempos.length ||
      staffInfo.keySignatures.length !== this.staffInfo.keySignatures.length ||
      staffInfo.timeSignatures.length !== this.staffInfo.timeSignatures.length
    ) {
      this.staffInfo = staffInfo;
      this.staffBlockMap = new Map(); // Future usage for incremental blocks
      this.lastQ = 0;

      // Group notes into blocks, set note split points
      const blocks: StaffBlockMap = new Map();
      const splites = new Set<number>(); // Split points = bars + starts + ends
      let barAccidentals: BarAccidentals = {}; // Temporal accidentals
      let lastBar = 0;
      let lastBlock: StaffBlock = null;
      this.staffInfo.notes.forEach( 
        note => {
          const staffNote = toStaffNote(note); // TODO: Review
          const currentBar = Math.trunc(this.quartersInfo[Math.trunc(staffNote.start)].barNumber);
          if (currentBar > lastBar) {
            lastBar = currentBar;
            barAccidentals = {}; // Reset
          }
          const keySignature = this.keySignatureAtQ(staffNote.start);
          placeNote(staffNote, barAccidentals, this.clef, keySignature);
          const staffNoteEnd = staffNote.start + staffNote.length;

          const currentBlock = noteToBlocks(staffNote, blocks, currentBar);
          if (currentBlock === lastBlock) { // Adding notes to current block
            if (staffNote.length < lastBlock.length) { // Split to staffNote
              const quarters = staffNote.start + staffNote.length;
              const bar = this.quartersInfo[Math.trunc(quarters)].barNumber;
              const splittedBlock = currentBlock.split(quarters, bar);
              this.staffBlockMap.set(splittedBlock.start, splittedBlock);
            }
            else if (lastBlock.length < staffNote.length){ // Split to lastBlock
              const quarters = lastBlock.start + lastBlock.length;
              const bar = this.quartersInfo[Math.trunc(quarters)].barNumber;
              const splittedBlock = currentBlock.split(quarters, bar);
              this.staffBlockMap.set(splittedBlock.start, splittedBlock);
              this.lastQ = staffNoteEnd;
            } // Otherwise, same length, nothing to do
          }
          else { // Adding notes to a new block
            if (staffNote.start > this.lastQ) { // Blocks gap means a rest
              lastBlock.restToNextLength = staffNote.start - this.lastQ; // TODO: Deprecated
              const quarters = this.lastQ;
              const bar = this.quartersInfo[Math.trunc(quarters)].barNumber;
              const restBlock = new StaffBlock(
                quarters, staffNote.start - this.lastQ, [], bar
              );
              this.staffBlockMap.set(restBlock.start, restBlock);
              this.lastQ = staffNoteEnd;
            }
            else if (staffNote.start < this.lastQ) { // New block start overlaps
              splites.add(staffNote.start);
              if (staffNoteEnd < this.lastQ) { // New block end overlaps too
                splites.add(staffNoteEnd);
              }
              else if (this.lastQ < staffNoteEnd) { // Old block overlaps new
                splites.add(this.lastQ);
                this.lastQ = staffNoteEnd;
              }
            }
            else { // Otherwise, consecutive blocks
              this.lastQ = staffNoteEnd;
            }
            lastBlock = currentBlock;
          }
        }
      );
      this.quartersInfo.forEach( // complete splits with bars in quartersInfo
        (quarterInfo: QuarterInfo, quarters:number) => {
          if (quarterInfo.barNumber - Math.trunc(quarterInfo.barNumber) === 0) {
            splites.add(quarters); // Add bar beginning quarters
          }
        }
      );

      // 2nd pass to apply all splites to the right chunks
      const sortedSplites = Array.from(splites).sort((x, y) => x - y);
      sortedSplites.forEach( // TODO: Review optimization
        quarters => {
          blocks.forEach(
            block => {
              const splitted = block.split(
                quarters, this.quartersInfo[Math.trunc(quarters)].barNumber
              );
              if (splitted) {
                blockToBlocks(splitted, blocks);
              }
            }
          );
        }
      );

      this.staffBlockMap = blocks; // TODO: Review
  
      this.initialRest.restToNextLength = // First rest in case of anacrusis
        this.staffBlockMap.values().next().value.notes[0].start;
    }
    return this.staffBlockMap;
  }

  /**
   * Gets the set of bar begginings in quarters considering time signatures.
   * @returns The set of bar beginnings
   */
  private getBarBeginnings(): Set<number> {
    const barBeginnings = new Set<number>();
    let lastQ = 0;
    this.staffInfo.notes.forEach(
      n => {
        if (n.start + n.length > lastQ) {
          lastQ = n.start + n.length;
        }
      }
    );
    const timeSignatures = (this.staffInfo.timeSignatures) ?
      this.staffInfo.timeSignatures.slice(0) : 
      [{start: 0, numerator: 4, denominator: 4}];
    timeSignatures.sort((x, y) => x.start - y.start);
    let q = 0;
    for (let i = 0; i < timeSignatures.length; ++i) {
      const signatureEnd = (i === timeSignatures.length - 1) ?
        lastQ : timeSignatures[i].start;
      const qPerBar = 
        timeSignatures[i].numerator * 4 / timeSignatures[i].denominator;
      for (; q < signatureEnd; q += qPerBar) {
        barBeginnings.add(q);
      }
    }
    return barBeginnings;
  }

  /** Fills the Quarters info (bar, tempo, time signature and key signature) */
  private setQuartersInfo() {
    let tempoIndex = 0;
    let keyIndex = 0;
    let timeIndex = 0;
    let currentTempo = this.staffInfo.tempos[0];
    let currentKeySignature = this.staffInfo.keySignatures[0];
    let currentTimeSignature = this.staffInfo.timeSignatures[0];
    let currentTimeSignatureBar = 0; // Bar where current time signature starts
    let currentBarLength = getBarLength(currentTimeSignature);
    for (let quarters = 0; quarters < this.lastQ; ++quarters) { // All quarters
      const quarterInfo: QuarterInfo = { 
        barNumber: currentTimeSignatureBar, 
        barLength: currentBarLength,
        tempo: currentTempo,
        keySignature: currentKeySignature,
        timeSignature: currentTimeSignature
      };
      if (
        tempoIndex < this.staffInfo.tempos.length && 
        this.staffInfo.tempos[tempoIndex].start === quarters
      ) { // Register a tempo change in this quarter
        currentTempo = this.staffInfo.tempos[tempoIndex++];
        quarterInfo.tempoChange = currentTempo;
      }
      if ( // Register a key signature change in this quarter
        keyIndex < this.staffInfo.keySignatures.length && 
        this.staffInfo.keySignatures[keyIndex].start === quarters
      ) {
        currentKeySignature = this.staffInfo.keySignatures[keyIndex++];
        quarterInfo.keyChange = currentKeySignature;
      }
      if (
        timeIndex < this.staffInfo.timeSignatures.length && 
        this.staffInfo.timeSignatures[timeIndex].start === quarters
      ) { // Register a time signature in this quarter
        quarterInfo.barNumber += (quarters - currentTimeSignature.start) / 
          currentBarLength;
        currentTimeSignatureBar = quarterInfo.barNumber; // New time signat. bar
        quarterInfo.timeChange = this.staffInfo.timeSignatures[timeIndex++];
        currentTimeSignature = quarterInfo.timeChange; // New time signature
        quarterInfo.barLength = getBarLength(currentTimeSignature);
        currentBarLength = quarterInfo.barLength; // New length
      }
      quarterInfo.barNumber += (quarters - currentTimeSignature.start) / 
        currentBarLength; // Add bars from time sign. change
      this.quartersInfo.push(quarterInfo);
    }      
  }

  /**
   * Gets the key signature at a quarter on the staff
   * @param quarters Quarter to look key signature at
   * @returns The key which is operative at given quarter 
   */
  public keySignatureAtQ(quarters: number): number {
    return this.quartersInfo[Math.trunc(quarters)].keySignature.key;
    /*
    let key = this.defaultKey;
    if (this.staffInfo.keySignatures) {
      for (let i = 0; i < this.staffInfo.keySignatures.length; ++i) {
        if (this.staffInfo.keySignatures[i].start <= quarters) {
          key = this.staffInfo.keySignatures[i].key;
        }
        else {
          break;
        }
      }
    }
    return key;*/
  } 
  
  /**
   * Gets the time signature at a quarter on the staff
   * @param quarter Quarter to look time signature at
   * @returns The time signature which is operative at given quarter 
   */
  public timeSignatureAtQ(quarters: number): TimeSignatureInfo {
    return this.quartersInfo[Math.trunc(quarters)].timeSignature;
    /*
    let timeSignature = DEFAULT_TIME_SIGNATURE;
    if (this.staffInfo.timeSignatures) {
      for (let i = 0; i < this.staffInfo.timeSignatures.length; ++i) {
        if (this.staffInfo.timeSignatures[i].start <= quarter) {
          timeSignature = this.staffInfo.timeSignatures[i];
        }
        else {
          break;
        }
      }
    }
    return timeSignature;*/
  }
  
  /**
   * Clef deduction: Average pitch under C4 -> F clef, otherwise G clef
   * @returns The deducted clef as Midi pitch values
   */
  public guessClef(): number {
    let pitchSum = 0;
    let countSum = 0;
    this.staffInfo.notes.forEach(
      note => {
        pitchSum += note.pitch;
        ++countSum;
      }
    );
    const averagePitch = pitchSum / countSum;
    return averagePitch < 60 ? 50 : 71; // Numbers are MIDI pitch values  
  }

  /**
   * Convert a given amount of quarters to seconds. **NOTE**: it doesn't 
   * covers tempo changes yet, and assumes score keeps it stable till the end.
   * @param quarters The given amount of quarters
   * @returns The equivalent amount of seconds
   */
  public quartersToTime(quarters: number): number {
    return quarters / this.staffInfo.tempos[0].qpm * 60;
  }
  
  /**
   * Convert a given amount of seconds to quarters. **NOTE**: it doesn't 
   * covers tempo changes yet, and assumes score keeps it stable till the end.
   * It will be rounded to minimum note division to avoid JavaScript number
   * rounding issues.
   * @param quarters The given amount of seconds
   * @returns The equivalent amount of quarters
   */
  public timeToQuarters(time: number): number {
    const q = time * this.staffInfo.tempos[0].qpm / 60;
    return Math.round(q * MAX_QUARTER_DIVISION) / MAX_QUARTER_DIVISION;
  }
  
}

/**
 * Converts a note from `NoteInfo` interface to `StaffNote` interface. It 
 * resets `vStep` and `accidental` to zero and lets `tiedFrom` and `tiedTo`
 * as `undefined`.
 * @param note The note to be converted
 * @returns The converted note
 */
function toStaffNote(note: NoteInfo): StaffNote {
  return {
    start: note.start,
    length: note.length,
    pitch: note.pitch,
    intensity: note.intensity,
    vSteps: 0, // Delayed assignation till placeNote() call
    accidental: 0 // Delayed assignation till placeNote() call
  };
}

/**
 * Inserts or appends a note into a new or existing chunk, respectively.
 * @param note Note to be included into a block map indexed by starting quarter
 * @param chunks Chunk map to hold notes
 */
function noteToChunk(note: StaffNote, chunks: Map<number, StaffNote[]>) {
  if (chunks.has(note.start)) {
    chunks.get(note.start).push(note);
  }
  else {
    chunks.set(note.start, [note]);
  }
}

/**
 * Sets a block into the block map or appends it into an existing block
 * @param staffBlock The block to be considered to set or append
 * @param blocks Block map to hold blocks
 */
function blockToBlocks(staffBlock: StaffBlock, blocks: StaffBlockMap) {
  if (blocks.has(staffBlock.start)) {
    const existingBlock = blocks.get(staffBlock.start);
    staffBlock.notes.forEach(note => existingBlock.addNote(note));
  }
  else {
    blocks.set(staffBlock.start, staffBlock);
  }
}

/**
 * Sets or appends a note into a new or existing block, respectively, 
 * returning it.
 * @param note Note to be included into a block map indexed by starting quarter
 * @param blocks Block map to hold notes
 * @returns The block where the note has been setted or appended
 */
function noteToBlocks(note: StaffNote, blocks: StaffBlockMap, barNumber: number)
: StaffBlock {
  if (blocks.has(note.start)) {
    const existingBlock = blocks.get(note.start);
    existingBlock.addNote(note);
    return existingBlock;
  }
  else {
    const newBlock = new StaffBlock(note.start, note.length, [note], barNumber, note.vSteps, note.vSteps); // TODO: redo constructor
    blocks.set(note.start, newBlock);
    return newBlock;
  }
}

/**
 * Analyzes a note based on full accidentals context, updating `barAccidentals`
 * @param staffNote Note to be analyzed 
 * @param barAccidentals Active accidentals in current bar
 * @param clef Contextual applicable clef
 * @param key Contextual applicable key
 */
function placeNote(
  staffNote: StaffNote, barAccidentals: BarAccidentals, clef:number, key:number
) {
  const pitchDetails = getNoteDetails(staffNote.pitch, clef, key);
  if (pitchDetails.vSteps in barAccidentals) { // Previous occurrence
    if (pitchDetails.accidental === barAccidentals[pitchDetails.vSteps]) {
      pitchDetails.accidental = 0; // Ignore repetitions
    }
    else { // Replace with the new one
      if (barAccidentals[pitchDetails.vSteps] === 3) {
        // If changing from normal accidental, force key accidental
        pitchDetails.accidental = pitchDetails.keyAccidental;
      }
      else if (pitchDetails.accidental === 0) {
        // Otherwise, changing to no accidental, force normal
        pitchDetails.accidental = 3;
      }
      barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
    }
  }
  else { // Register new occurrence
    if (staffNote.tiedFrom) { // Unless it is a tied note (even after bar reset)
      pitchDetails.accidental = 0; // Tied notes use the inital accidental
    }
    barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
  }
  staffNote.vSteps = pitchDetails.vSteps;
  staffNote.accidental = pitchDetails.accidental;
}

/**
 * Gets the note details from pitch value according overall staff context
 * @param notePitch pitch of the note to get the details from
 * @param clef Encoded as MIDI pitch note at the 3rd line (G clef -> B = 71)
 * @param key Encoded as semitones (0 = C, 1 = C#, ... 11 = B)
 * @returns An object where `vSteps:` is the note height in the staff,
 * `accidental:` is the accidental to be drawn if it were applied C key and 
 * `keyAccidental:` is the accidental forced by current key, if any
 */
export function getNoteDetails(notePitch: number, clef: number, key: number)
: {vSteps: number, accidental: number, keyAccidental: number} {
  const semitones = notePitch - 60;
  const octave = Math.floor(semitones / 12);
  const reminderSemitones = semitones - 12 * octave;
  const steps = SCALES[key].steps[reminderSemitones];
  const offset = (clef === 71) ? 6 : -6;
  const noteInKey = KEY_ACCIDENTALS[key].accidental === 1 ?
    69 + (reminderSemitones + 3) % 12 : 64 + (reminderSemitones + 8) % 12;
  return {
    vSteps: offset - 7 * octave + steps, 
    accidental: SCALES[key].accidental[reminderSemitones],
    keyAccidental: 
      KEY_ACCIDENTALS[key].pitches.indexOf(noteInKey) > -1 ?
        KEY_ACCIDENTALS[key].accidental : 0
  };
}

/**
 * Calculates the number of quarters that fits within a bar in a given
 * time signature
 * @param timeSignature The time signature
 * @returns The number of quarters that fit in
 */
export function getBarLength(timeSignature: TimeSignatureInfo): number {
  return timeSignature.numerator * 4 / timeSignature.denominator;
}
