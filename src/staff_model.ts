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

/** Stores minimal information related to a musical note */
export interface NoteInfo {
  /** Starting time, in quarter note quantities (float) */
  start: number;
  /** Note length, in quarter note quantities (float) */
  length: number;
  /** Note pitch according to MIDI standard */
  pitch: number;
  /** Note intensity according to MIDI velocity */
  intensity: number;
}

/** Stores information related to a tempo change on a score (not used yet) */
export interface TempoInfo {
  /** Starting time, in quarter note quantities (float) */
  start: number; 
  /** Quarters Per Minute from this quarter on, unless further changes */
  qpm: number;
}

/** Stores information related to a key signature change on a score */
export interface KeySignatureInfo {
  /** Starting time, in quarter note quantities (float) */
  start: number; 
  /** Key signature from this quarter on, unless further changes */
  key: number;
}

/** Stores information related to a time signature change on a score */
export interface TimeSignatureInfo {
  /** Starting time, in quarter note quantities (float) */
  start: number;
  /** Would hold 3 in a 3/4 time signature change */
  numerator: number; 
  /** Would hold 4 in a 3/4 time signature change*/
  denominator: number;
}

/** Stores the bare minimal information related to a full single staff score */
export interface StaffInfo {
  /** All notes in a staff. There's no need to be sorted by start q */
  notes: NoteInfo[];
  /** All tempo changes in a staff. They will get sorted by start q */
  tempos?: TempoInfo[];
  /** All key signature changes in a staff. They will get sorted by start q */
  keySignatures?: KeySignatureInfo[];
  /** All time signature changes in a staff. They will get sorted by start q */
  timeSignatures?: TimeSignatureInfo[];
}

/** Stores processed information related to a musical note in a staff */
export interface StaffNote extends NoteInfo {
  /** 
   * Vertical steps to position a note on score. It is measured in integer 
   * value, considering 2 positions per staff line, vertically inverted, being
   * in G clef value 0 used for middle C note and -1 used for following D note.
   */
  vSteps: number;
  /** 
   * Identificator of the accidental kind as following encoding: 
   * -1 = natural, 0 = none, 1 = accidental (the one used in the key)
   */
  accidental: number;
  /** Reference to previous tied note */
  tiedFrom?: StaffNote;
  /** Reference to following tied note */
  tiedTo?: StaffNote;
}

/** 
 * Stores a block of notes in a staff, all of them starting and ending at once, 
 * even though some notes can be tied to notes in other blocks. It can be 
 * followed by a rest, which has no representation in a separate data structure.
 */
export interface StaffBlock {
  /** Upper limit of vertical steps in block notes */
  maxVStep: number;
  /** Lower limit of vertical steps in block notes */
  minVStep: number;
  /** Following rest to next block, if any */
  restToNextLength: number;
  /** Wether the block is starting a new bar */
  isBarBeginning: boolean;
  /** The list of notes related to the block */
  notes: StaffNote[];
}

/** A map of staff blocks indexed by starting quarter */
export type StaffBlockMap = Map<number, StaffBlock>;

/** Default key in case none is found (C key) */
const DEFAULT_KEY: number = 0;

/** Default time signature in case none is found (4/4) */
const DEFAULT_TIME_SIGNATURE: TimeSignatureInfo = {
  start: 0, 
  numerator: 4, 
  denominator: 4
}

/** 
 * Minimal duration recognized note, which currently is valid for sixtyfourth 
 * note (1/16 of a quarter note) triplets and quintuplets.
 */
export const MAX_QUARTER_DIVISION = 16*3*5; 

/** Chromatic scales per key, encoded for staff note placement */
const SCALES = [ // Accidentals: 0=none, 1=sharp, 2=flat, 3=normal
  { // Chromatic  C C#/Db D D#/Eb E   F F#/Gb G G#/Ab A A#/Bb B   / KEY
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // C
    accidental: [ 0,  1,  0,  1,  0,  0,  1,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Db
    accidental: [ 0,  0,  3,  0,  3,  0,  0,  3,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // D
    accidental: [ 3,  0,  0,  1,  0,  3,  0,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Eb
    accidental: [ 0,  2,  0,  0,  3,  0,  2,  0,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // E
    accidental: [ 3,  0,  3,  0,  0,  3,  0,  3,  0,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // F
    accidental: [ 0,  2,  0,  2,  0,  0,  2,  0,  2,  0,  0,  3] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -7], // Gb
    accidental: [ 3,  0,  3,  0,  3,  0,  0,  3,  0,  3,  0,  0] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // G
    accidental: [ 0,  1,  0,  1,  0,  3,  0,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Ab
    accidental: [ 0,  0,  3,  0,  3,  0,  2,  0,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // A
    accidental: [ 3,  0,  0,  1,  0,  3,  0,  3,  0,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Bb
    accidental: [ 0,  2,  0,  0,  3,  0,  2,  0,  2,  0,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // B
    accidental: [ 3,  0,  3,  0,  0,  3,  0,  3,  0,  3,  0,  0] }
];

/** 
 * A list of all key accidentals indicating the accidental kind (1 = sharp
 * and 2 = flat) and the MIDI note it is associated to */
export const KEY_ACCIDENTALS = [
  {accidental: 1, pitches: []},                       // C
  {accidental: 2, pitches: [70, 75, 68, 73, 66]},     // Db
  {accidental: 1, pitches: [78, 73]},                 // D
  {accidental: 2, pitches: [70, 75, 68]},             // Eb
  {accidental: 1, pitches: [78, 73, 80, 75]},         // E
  {accidental: 2, pitches: [70]},                     // F
  {accidental: 2, pitches: [70, 75, 68, 73, 66, 71]}, // Gb
  {accidental: 1, pitches: [78]},                     // G
  {accidental: 2, pitches: [70, 75, 68, 73]},         // Ab
  {accidental: 1, pitches: [78, 73, 80]},             // A
  {accidental: 2, pitches: [70, 75]},                 // Bb
  {accidental: 1, pitches: [78, 73, 80, 75, 70]}      // B
];

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
  public initialRest: StaffBlock;
  /** The resut of staff analysis on staff blocks indexed by starting quarter */
  public staffBlockMap: StaffBlockMap;

  /**
   * Creates a `StaffModel` storing input data and result
   * @param staffInfo Generic information about a score to crate a staff with
   * @param staffDefaults Default values to fill the gaps if needed
   */
  constructor(staffInfo: StaffInfo, defaultKey?: number) {
    this.staffInfo = staffInfo;
    this.staffInfo.notes.sort( (x, y) => x.start - y.start );
    if (this.staffInfo.tempos) {
      this.staffInfo.tempos.sort( (x, y) => x.start - y.start );
    }
    if (this.staffInfo.keySignatures) {
      this.staffInfo.keySignatures.sort( (x, y) => x.start - y.start );
    }
    if (this.staffInfo.timeSignatures) {
      this.staffInfo.keySignatures.sort( (x, y) => x.start - y.start );
    }

    this.clef = this.guessClef();
    this.defaultKey = (
      staffInfo.keySignatures && staffInfo.keySignatures.length && staffInfo.keySignatures[0].start === 0
    ) ? staffInfo.keySignatures[0].key : defaultKey || DEFAULT_KEY;
    this.defaultKey = staffInfo.keySignatures ? 
      staffInfo.keySignatures.length ? staffInfo.keySignatures[0].key : defaultKey :
      defaultKey;
    this.initialRest = { // TODO: Optimize
      maxVStep: 0,
      minVStep: 0, 
      restToNextLength: 0,
      isBarBeginning: true,
      notes: [
        {
          start: 0, 
          length:0, 
          pitch: 0, 
          intensity: 0,
          vSteps: 0, 
          accidental: 0, 
        }
      ]
    };
    this.staffBlockMap = null;
    this.analyzeStaffInfo(this.staffInfo);
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

      let barAccidentals: BarAccidentals = {}; // Temporal accidentals
      let blocks = new Map<number, StaffNote[]>();
      const barBeginnings = this.getBarBeginnings();
      const splites = new Set<number>(barBeginnings); // Bars = split points
      // First pass to translate all notes to quarters
      const sortedNotes = this.staffInfo.notes.slice();
      sortedNotes.forEach( 
        note => {
          const staffNote = getStaffNote(note);
          splites.add(staffNote.start);
          splites.add(staffNote.start + staffNote.length);
          if (blocks.has(staffNote.start)) {
            blocks.get(staffNote.start).push(staffNote);
          }
          else {
            blocks.set(staffNote.start, [staffNote]);
          }
        }
      );
      // Second pass to apply all splites to the right blocks
      const sortedSplites = Array.from(splites).sort((x, y) => x - y);
      sortedSplites.forEach(
        split => {
          const remains: StaffNote[] = [];
          blocks.forEach(
            block => {
              block.forEach(
                staffNote => {
                  const remainStaffNote = splitStaffNote(staffNote, split);
                  if (remainStaffNote) { remains.push(remainStaffNote); }
                }
              );
            }
          );
          remains.forEach(
            staffNote => {
              if (blocks.has(staffNote.start)) {
                blocks.get(staffNote.start).push(staffNote);
              }
              else {
                blocks.set(staffNote.start, [staffNote]);
              }
            }
          );
        }
      );
      blocks = new Map(Array.from(blocks).sort((x, y) => x[0] - y[0]));
      // Third pass to fill vertical step, accidentals, min/max values and rests.
      let lastStaffBlock: StaffBlock = null;
      let lastBlockEnd = 0;
      const it = barBeginnings[Symbol.iterator]();
      let currentBar = it.next();
      blocks.forEach(
        (block: StaffNote[], quarters: number) => {
          const staffBlock: StaffBlock = {
            maxVStep: Number.MAX_SAFE_INTEGER,
            minVStep: Number.MIN_SAFE_INTEGER, 
            restToNextLength: 0,
            isBarBeginning: false,
            notes: []
          };
          const tmpKey = this.keySignatureAtQ(quarters);
          const value: number = currentBar.value;
          const currentBarEnd = value + getBarLength(this.timeSignatureAtQ(quarters));
          if (!currentBar.done && quarters >= currentBarEnd) {
            currentBar = it.next();
            barAccidentals = {}; // Reset bar accidentals
            staffBlock.isBarBeginning = true;
          }
          block.forEach(
            staffNote => {
              analyzeNote(staffNote, this.clef, tmpKey, barAccidentals);
              staffBlock.minVStep = 
                Math.max(staffNote.vSteps, staffBlock.minVStep);
              staffBlock.maxVStep = 
                Math.min(staffNote.vSteps, staffBlock.maxVStep);
              staffBlock.notes.push(staffNote);  
            }
          );
          if (lastStaffBlock) { // Rest length from last block to this one
            lastStaffBlock.restToNextLength = quarters - lastBlockEnd;
          }
          this.staffBlockMap.set(quarters, staffBlock);
          lastStaffBlock = staffBlock;
          lastBlockEnd = quarters + staffBlock.notes[0].length;
        }
      );
  
      this.initialRest.restToNextLength = this.staffBlockMap.values().next().value.notes[0].start;
    }
    return this.staffBlockMap
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

  /**
   * Gets the key signature at a quarter on the staff
   * @param quarter Quarter to look key signature at
   * @returns The key which is operative at given quarter 
   */
  public keySignatureAtQ(quarter: number): number {
    let key = this.defaultKey;
    if (this.staffInfo.keySignatures) {
      for (let i = 0; i < this.staffInfo.keySignatures.length; ++i) {
        if (this.staffInfo.keySignatures[i].start <= quarter) {
          key = this.staffInfo.keySignatures[i].key;
        }
        else {
          break;
        }
      }
    }
    return key;
  } 
  
  /**
   * Gets the time signature at a quarter on the staff
   * @param quarter Quarter to look time signature at
   * @returns The time signature which is operative at given quarter 
   */
  public timeSignatureAtQ(quarter: number): TimeSignatureInfo {
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
    return timeSignature;
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
 * Converts a note from `NoteInfo` interface to `StaffNote` interface
 * @param note The note to be converted
 * @returns The converted note
 */
function getStaffNote(note: NoteInfo): StaffNote {
  return {
    start: note.start,
    length: note.length,
    pitch: note.pitch,
    intensity: note.intensity,
    vSteps: 0, // Delayed assignation till analyzeNote() call
    accidental: 0 // Delayed assignation till analyzeNote() call
  };
}

/**
 * Splits a note in two by a time point measured in note quarters
 * @param staffNote note to be splitted
 * @param quarters split point
 * @returns The second half of spritted note. First one is the received one,
 * which gets modified.
 */
function splitStaffNote(staffNote: StaffNote, quarters: number): StaffNote {
  const remainLength = (staffNote.start + staffNote.length) - quarters;
  let splitted: StaffNote = null;
  if (quarters > staffNote.start && remainLength > 0) {
    staffNote.length -= remainLength;
    splitted = {
      start: quarters,
      length: remainLength,
      pitch: staffNote.pitch,
      intensity: staffNote.intensity,
      vSteps: staffNote.vSteps,
      accidental: staffNote.accidental,
      tiedFrom: staffNote
    };
    staffNote.tiedTo = splitted;
  }
  return splitted;
}

/**
 * Analyzes a note based on full context
 * @param staffNote Note to be analyzed 
 * @param clef Contextual applicable clef
 * @param key Contextual applicable key
 * @param barAccidentals Active accidentals in current bar
 */
function analyzeNote(
  staffNote: StaffNote, clef:number, key:number, barAccidentals: BarAccidentals
) {
  const pitchDetails = getNoteDetails(staffNote.pitch, clef, key);
  if (pitchDetails.vSteps in barAccidentals) { // Previous occurrence
    if (
      pitchDetails.accidental === barAccidentals[pitchDetails.vSteps]
    ) {
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
 * @returns 
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