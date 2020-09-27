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
  StaffInfo, NoteInfo, ReferenceInfo, TimeSignatureInfo, KeySignatureInfo, 
  DEFAULT_TEMPO, DEFAULT_TIME_SIGNATURE, DEFAULT_KEY_SIGNATURE
} from './staff_info';
import { StaffBlock, StaffNote } from './staff_block';
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
  /** The bar, tempo, time signature and key signature info by quarters */
  private referencesInfo: ReferenceInfo[];
  /** The resut of staff analysis on staff blocks indexed by starting quarter */
  public staffBlockMap: StaffBlockMap;
  /** Last handled quarter, i.e. staff length in quarters */
  private lastQ:number;

  /**
   * Creates a `StaffModel` storing input data and result
   * @param staffInfo Generic information about a score to crate a staff with
   * @param defaultKey Default value to replace missing key at bar 0
   */
  constructor(staffInfo: StaffInfo, defaultKey?: number) {
    this.staffInfo = null;
    this.clef = this.guessClef(staffInfo);
    this.staffBlockMap = null;
    this.update(staffInfo, defaultKey);
  }

  /**
   * Processes new staff info to update internal model. It will modify received
   * staff info if it is disordered or incomplete.
   * @param staffInfo New staff information to replace previous one
   */
  public update(staffInfo: StaffInfo, defaultKey?: number) {
    staffInfo.notes.sort( (x, y) => x.start - y.start );

    // TODO: Review
    this.lastQ = 0;
    staffInfo.notes.forEach(
      note => {
        if (note.start + note.length > this.lastQ) {
          this.lastQ = note.start + note.length;
        }
      }
    );

    if (staffInfo.tempos && staffInfo.tempos.length) {
      staffInfo.tempos.sort( (x, y) => x.start - y.start );
    }
    else {
      staffInfo.tempos = [DEFAULT_TEMPO];
    }
    if (staffInfo.tempos[0].start !== 0) {
      staffInfo.tempos = [DEFAULT_TEMPO].concat(staffInfo.tempos);
    }

    const startingKey: KeySignatureInfo = defaultKey? 
      { start: 0, key: defaultKey }: DEFAULT_KEY_SIGNATURE;
    if (staffInfo.keySignatures && staffInfo.keySignatures.length) {
      staffInfo.keySignatures.sort( (x, y) => x.start - y.start );
    }
    else {
      staffInfo.keySignatures = [startingKey];
    }
    if (staffInfo.keySignatures[0].start !== 0) {
      staffInfo.keySignatures = 
        [startingKey].concat(staffInfo.keySignatures);
    }

    if (staffInfo.timeSignatures && staffInfo.timeSignatures.length) {
      staffInfo.timeSignatures.sort( (x, y) => x.start - y.start );
    }
    else {
      staffInfo.timeSignatures = [DEFAULT_TIME_SIGNATURE];
    }
    if (staffInfo.timeSignatures[0].start !== 0) {
      staffInfo.timeSignatures = 
        [DEFAULT_TIME_SIGNATURE].concat(staffInfo.timeSignatures);
    }

    this.referencesInfo = new Array();
    this.setReferencesInfo(staffInfo);

    this.infoToBlocks(staffInfo);
  }

  /**
   * Analyzes stored info and defaults to update `staffBlockMap`, unless the
   * staff info received has not changed (in length of its members).
   * @param staffInfo New staff information to replace previous one.
   * @returns Analyzed staff as an indexed per quarter `StaffBlockMap`
   */
  private infoToBlocks(staffInfo: StaffInfo): StaffBlockMap {
    if (
      this.staffBlockMap === null || // Constructor use case
      staffInfo.notes.length !== this.staffInfo.notes.length ||
      staffInfo.tempos.length !== this.staffInfo.tempos.length ||
      staffInfo.keySignatures.length !== this.staffInfo.keySignatures.length ||
      staffInfo.timeSignatures.length !== this.staffInfo.timeSignatures.length
    ) {
      this.staffInfo = staffInfo;
      this.lastQ = 0;

      // Group notes into blocks, set note split points
      const blocks: StaffBlockMap = new Map();
      // TODO: Future approach to this.staffBlockMap for incremental blocks
      const splites = new Set<number>(); // Split points = bars + starts + ends
      let barAccidentals: BarAccidentals = {}; // Temporal accidentals
      let lastBar = 0;
      let lastBlock: StaffBlock = null;
      this.staffInfo.notes.forEach( 
        note => {
          const staffNote = toStaffNote(note); // TODO: Review
          const currentBar = Math.trunc(this.referencesInfo[Math.trunc(staffNote.start)].barNumber);
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
              const splittedBlock = 
                currentBlock.split(quarters, this.referencesInfo);
              blocks.set(splittedBlock.start, splittedBlock);
            }
            else if (lastBlock.length < staffNote.length){ // Split to lastBlock
              const quarters = lastBlock.start + lastBlock.length;
              const splittedBlock = 
                currentBlock.split(quarters, this.referencesInfo);
              blocks.set(splittedBlock.start, splittedBlock);
              this.lastQ = staffNoteEnd;
            } // Otherwise, same length, nothing to do
          }
          else { // Adding notes to a new block
            if (staffNote.start > this.lastQ) { // Blocks gap means a prior rest
              const quarters = this.lastQ;
              const bar = this.referencesInfo[Math.trunc(quarters)].barNumber;
              const restBlock = new StaffBlock(
                quarters, staffNote.start - this.lastQ, [], bar
              );
              blocks.set(restBlock.start, restBlock);
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
      this.referencesInfo.forEach( // complete splits with bars in referencesInfo
        (referenceInfo: ReferenceInfo, quarters:number) => {
          if (referenceInfo.barNumber - Math.trunc(referenceInfo.barNumber) === 0) {
            splites.add(quarters); // Add bar beginning quarters
          }
        }
      );

      // TODO: Insert in previous pass with iterators
      // 2nd pass to apply all splites to the right chunks
      const sortedSplites = Array.from(splites).sort((x, y) => x - y);
      sortedSplites.forEach( // TODO: Review optimization
        quarters => {
          blocks.forEach(
            currentBlock => {
             const splittedBlock = 
                currentBlock.split(quarters, this.referencesInfo);
              if (splittedBlock) {
                blockToBlocks(splittedBlock, blocks);
              }
            }
          );
        }
      );
      // Sorting for further iteration
      this.staffBlockMap = 
        new Map(Array.from(blocks).sort((x, y) => x[0] - y[0]));

      // 3rd pass to apply tuplets and rithm splitting and association
      let lastStaffBlock: StaffBlock = null;
      this.staffBlockMap.forEach(
        staffBlock => {
          const splittedBlock = 
            staffBlock.splitToComplete(lastStaffBlock, this.referencesInfo);
          if (splittedBlock) {
            blockToBlocks(splittedBlock, blocks);
          }
        }
      );
      // Sorting for further iteration
      this.staffBlockMap = 
        new Map(Array.from(blocks).sort((x, y) => x[0] - y[0]));

    }
    return this.staffBlockMap;
  }

  /** 
   * Fills the reference info (bar, tempo, time signature and key signature)
   * in a per quarter array as a fast method to furthe fill details in blocks
   * @param staffInfo The staff information get references from.
   */
  private setReferencesInfo(staffInfo: StaffInfo) {
    let tempoIndex = 0;
    let keyIndex = 0;
    let timeIndex = 0;
    let currentTempo = staffInfo.tempos[0];
    let currentKeySignature = staffInfo.keySignatures[0];
    let currentTimeSignature = staffInfo.timeSignatures[0];
    let currentTimeSignatureBar = 0; // Bar where current time signature starts
    let currentBarLength = getBarLength(currentTimeSignature);
    for (let quarters = 0; quarters < this.lastQ; ++quarters) { // All quarters
      const referenceInfo: ReferenceInfo = { 
        barNumber: currentTimeSignatureBar, 
        barLength: currentBarLength,
        tempo: currentTempo,
        keySignature: currentKeySignature,
        timeSignature: currentTimeSignature
      };
      if (
        tempoIndex < staffInfo.tempos.length && 
        staffInfo.tempos[tempoIndex].start === quarters
      ) { // Register a tempo change in this quarter
        currentTempo = staffInfo.tempos[tempoIndex++];
        referenceInfo.tempo = currentTempo;
        referenceInfo.tempoChange = currentTempo;
      }
      if ( // Register a key signature change in this quarter
        keyIndex < staffInfo.keySignatures.length && 
        staffInfo.keySignatures[keyIndex].start === quarters
      ) {
        currentKeySignature = staffInfo.keySignatures[keyIndex++];
        referenceInfo.keySignature = currentKeySignature;
        referenceInfo.keyChange = currentKeySignature;
      }
      if (
        timeIndex < staffInfo.timeSignatures.length && 
        staffInfo.timeSignatures[timeIndex].start === quarters
      ) { // Register a time signature in this quarter
        referenceInfo.barNumber += (quarters - currentTimeSignature.start) / 
          currentBarLength;
        currentTimeSignatureBar = referenceInfo.barNumber; // New time signat. bar
        referenceInfo.timeChange = staffInfo.timeSignatures[timeIndex++];
        currentTimeSignature = referenceInfo.timeChange; // New time signature
        referenceInfo.timeSignature = currentTimeSignature;
        referenceInfo.barLength = getBarLength(currentTimeSignature);
        currentBarLength = referenceInfo.barLength; // New length
      }
      referenceInfo.barNumber += (quarters - currentTimeSignature.start) / 
        currentBarLength; // Add bars from time sign. change
      this.referencesInfo.push(referenceInfo);
    }      
  }

  /**
   * Gets the key signature at a quarter on the staff
   * @param quarters Quarter to look key signature at
   * @returns The key which is operative at given quarter 
   */
  public keySignatureAtQ(quarters: number): number {
    return this.referencesInfo[Math.trunc(quarters)].keySignature.key;
  } 
  
  /**
   * Gets the time signature at a quarter on the staff
   * @param quarter Quarter to look time signature at
   * @returns The time signature which is operative at given quarter 
   */
  public timeSignatureAtQ(quarters: number): TimeSignatureInfo {
    return this.referencesInfo[Math.trunc(quarters)].timeSignature;
  }
  
  /**
   * Clef deduction: Average pitch under C4 -> F clef, otherwise G clef
   * @returns The deducted clef as Midi pitch values
   */
  public guessClef(staffInfo: StaffInfo): number {
    let pitchSum = 0;
    let countSum = 0;
    staffInfo.notes.forEach(
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
