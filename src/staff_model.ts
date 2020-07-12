export interface NoteInfo {
  start: number; // Starting time, in quarter note quantities (float)
  length: number; // Note length, in quarter note quantities (float)
  pitch: number; // Note pitch according to MIDI standard
  intensity: number; // Note intensity according to MIDI velocity
}

export interface TempoInfo {
  start: number; 
  qpm: number;
}
export interface KeySignatureInfo {
  start: number; 
  key: number;
}
export interface TimeSignatureInfo {
  start: number; 
  numerator: number; 
  denominator: number;
}
export interface StaffInfo {
  notes: NoteInfo[];
  tempos?: TempoInfo[];
  keySignatures?: KeySignatureInfo[];
  timeSignatures?: TimeSignatureInfo[];
}

export interface StaffNote {
  start: number; // In quarter note quantities (float)
  length: number; // In quarter note quantities (float)
  pitch: number; // MIDI/Protobuf pitch needed to name SVG Group
  intensity: number; // Note intensity according to MIDI velocity
  vSteps: number; // In score steps (int, 2 per staff line), vertically invert.
  accidental: number; // Kind: -1 = natural, 0 = none, 1 = accidental
  tiedFrom?: StaffNote; // Reference to previous tied note // TODO: Remove ?
  tiedTo?: StaffNote; // Reference to following tied note
}

export interface StaffBlock {
  maxVStep: number;
  minVStep: number;
  restToNextLength: number;
  isBarBeginning: boolean;
  notes: StaffNote[];
}

export type StaffBlockMap = Map<number, StaffBlock>;

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

type BarAccidentals = {[pitch: number]: number};

export type StaffDefaults = {
  clef: number; // As MIDI pitch note at the staff 3rd line (G clef -> B = 71)
  key: number; // As semitones (0 = C, 1 = C#, ... 11 = B)
  timeSignature: TimeSignatureInfo; // Like 3/4 at some precise bar
  initialRest: StaffBlock;
};

/**
 * Models a staff info into a musical structure of staff blocks indexed by the
 * quarter they start from
 */
export class StaffModel {
  /** The input staff info, stored for further outer modifications */
  public staffInfo: StaffInfo;
  /** The input staff defaults, stored for further outer modifications */
  public staffDefaults: StaffDefaults;
  /** The resut of staff analysis on staff blocks indexed by starting quarter */
  public staffBlockMap: StaffBlockMap;

  /**
   * Creates a `StaffModel` storing input data and result
   * @param staffInfo Generic information about a score to crate a staff with
   * @param staffDefaults Default values to fill the gaps if needed
   */
  constructor(staffInfo: StaffInfo, staffDefaults: StaffDefaults) {
    this.staffInfo = staffInfo;
    this.staffDefaults = staffDefaults;
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
      const barBeginnings = getBarBeginnings(this.staffInfo);
      const splites = new Set<number>(barBeginnings); // Bars = split points
      // First pass to translate all notes to quarters
      const sortedNotes = this.staffInfo.notes.slice().sort(
        (x, y) => x.start - y.start
      );
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
      const initialKey = this.staffDefaults.key;
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
          this.staffDefaults.key = keySignatureAtQ(quarters, this.staffDefaults.key, this.staffInfo);
          this.staffDefaults.timeSignature = timeSignatureAtQ(quarters, this.staffDefaults.timeSignature, this.staffInfo); // TODO: Review adding here ???
          const value: number = currentBar.value;
          const currentBarEnd = value + getBarLength(this.staffDefaults.timeSignature);
          if (!currentBar.done && quarters >= currentBarEnd) {
            currentBar = it.next();
            barAccidentals = {}; // Reset bar accidentals
            staffBlock.isBarBeginning = true;
          }
          block.forEach(
            staffNote => {
              analyzeNote(this.staffDefaults.clef, this.staffDefaults.key, staffNote, quarters, barAccidentals);
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
      this.staffDefaults.initialRest.restToNextLength = this.staffBlockMap.values().next().value.notes[0].start;
      this.staffDefaults.key = initialKey;
    }
    return this.staffBlockMap
  }
}


function getBarBeginnings(staffInfo: StaffInfo): Set<number> {
  const barBeginnings = new Set<number>();
  let lastQ = 0;
  staffInfo.notes.forEach(
    n => {
      if (n.start + n.length > lastQ) {
        lastQ = n.start + n.length;
      }
    }
  );
  const timeSignatures = (staffInfo.timeSignatures) ?
    staffInfo.timeSignatures.slice(0) : 
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

export function getStaffNote(note: NoteInfo): StaffNote {
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
      tiedFrom: staffNote // TODO: Remove
    };
    staffNote.tiedTo = splitted;
  }
  return splitted;
}

/**
 * Analyzes a note based on full context
 * @param staffNote note to be analyzed 
 * @param quarters // TODO: Remove?
 * @param barAccidentals active accidentals in current bar
 */
function analyzeNote( // TODO: review if quarters parameter is really needed
  clef:number, key:number, staffNote: StaffNote, quarters: number, barAccidentals: BarAccidentals
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

export function keySignatureAtQ(
  quarter: number, currentKey: number, staffInfo: StaffInfo
): number {
  if (staffInfo.keySignatures) {
    for (let i = 0; i < staffInfo.keySignatures.length; ++i) {
      if (staffInfo.keySignatures[i].start <= quarter) {
        currentKey = staffInfo.keySignatures[i].key;
      }
      else {
        break;
      }
    }
  }
  return currentKey;
} 

export function timeSignatureAtQ(
  quarter: number, currentTimeSignature: TimeSignatureInfo, staffInfo: StaffInfo
): TimeSignatureInfo {
  if (staffInfo.timeSignatures) {
    for (let i = 0; i < staffInfo.timeSignatures.length; ++i) {
      if (staffInfo.timeSignatures[i].start <= quarter) {
        currentTimeSignature = staffInfo.timeSignatures[i];
      }
      else {
        break;
      }
    }
  }
  return currentTimeSignature;
}

export function getBarLength(timeSignature: TimeSignatureInfo) {
  return timeSignature.numerator * 4 / timeSignature.denominator;
}

/**
 * Clef deduction: Average pitch under C4 -> F clef, otherwise G clef
 * @param staffInfo The staff description to look into
 */
export function guessClef(staffInfo: StaffInfo): number {
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