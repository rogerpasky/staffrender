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
  MIN_RESOLUTION
} from './model_constants';

import {
  NoteInfo
} from './staff_info';

import {
  BarsInfo
} from './bars_info';

/** A map of staff blocks indexed by starting quarter */
export type StaffBlockMap = Map<number, StaffBlock>;

/** Stores processed information related to a musical note in a staff */
export interface StaffNote extends NoteInfo {
  /** 
   * Vertical steps to position a note on score. It is measured in integer 
   * value, considering 2 positions per staff line (one for over line and other
   * for inter-lines), vertically inverted, being value 0 used for third line 
   * note, 1 used for next lower one and -1 for the next upper one.
   */
  vSteps: number;
  /** 
   * Identificator of the accidental kind as following encoding: 
   * 0 = none, 1 = sharp, 2 = flat, 3 = normal
   */
  accidental: number;
  /** Reference to previous tied note */
  tiedFrom?: StaffNote;
  /** Reference to following tied note */
  tiedTo?: StaffNote;
}

/**
 * Splits a note in two by a time point measured in note quarters
 * @param staffNote note to be splitted
 * @param quarters split point
 * @returns The second half of spritted note. First one is the received one,
 * which gets modified.
 */
export function splitStaffNote(staffNote: StaffNote, quarters: number): StaffNote {
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
    if (staffNote.tiedTo) { // Relinking ties if any in pre-splitted note
      splitted.tiedTo = staffNote.tiedTo;
      staffNote.tiedTo.tiedFrom = splitted;
    }
    staffNote.tiedTo = splitted;
  }
  return splitted;
} // TODO: review to move interface to class

/** 
 * Stores a block of notes in a staff, all of them starting and ending at once, 
 * even though some notes can be tied to notes in other blocks. A block with no 
 * notes is a rest. It will pre-process all available context (key signatures,
 * rithm splittings, clef...) to store all score details in order to represent 
 * it in a staff.
 */
export class StaffBlock {
  /** Starting time, in quarter note quantities (float) */
  public start: number;
  /** Note length, in quarter note quantities (float) */
  public length: number;
  /**
   * Reference to the symbol to be drawn (notes and rests) according to its
   * length measured in quarters.
   */
  headIndex: number;
  /**
   * Specifies note or rest length alteration, if any, as following encoding:
   * 1 = dot, 3 = triplet, 5 quintuplet (any other will be ignored)
   */
  headAlteration?: number;
  /** Block bar number (float) being .0 at bar beginning and .5 at bar half. */
  public notes: StaffNote[];
  /** Upper limit of vertical steps in block notes */
  public barNumber: number;
  /** The list of notes related to the block */
  public maxVStep: number;
  /** Lower limit of vertical steps in block notes */
  public minVStep: number;
  /** Member of a Beam starting from referenced block */
  public beamedFrom?: StaffBlock;
  /** Beamed to previous block */
  public beamingBackwards?: boolean;
  /** Beamed to next block */
  public beamingForwards?: boolean;
  /** Wether the block begins a new beat */
  public beatBegin?: boolean;
  /** Wether the block ends a new beat */
  public beatEnd?: boolean;

  /**
   * Creates a `StaffBlock` storing minimal score details, waiting to be 
   * modified further invoking other methods.
   * @param start Starting time, in quarter note quantities (float)
   * @param length Note length, in quarter note quantities (float)
   * @param notes The list of notes related to the block
   * @param maxVStep Upper limit of vertical steps in block notes
   * @param minVStep Lower limit of vertical steps in block notes
   */
  constructor (
    start=0, 
    length=0, 
    notes: StaffNote[]=[],
    barNumber=0,
    maxVStep=Number.MAX_SAFE_INTEGER,
    minVStep=Number.MIN_SAFE_INTEGER,
  ) {
    this.start = start;
    this.length = length;
    this.headIndex = 0;
    this.notes = notes;
    this.barNumber = barNumber;
    this.maxVStep = maxVStep;
    this.minVStep = minVStep;
  }

  /**
   * Adds a note to the block's note list, merging repetitions' length, 
   * adapting VSteps and block length
   * @param staffNote The note to be added
   */
  public addNote(staffNote: StaffNote) {
    let newNote = true;
    for (let i = 0; newNote && i < this.notes.length; ++i) {
      if (staffNote.pitch === this.notes[i].pitch) { // Repeated
        newNote = false;
        this.notes[i].length = Math.max(this.notes[i].length, staffNote.length);
        this.length = Math.max(this.length, staffNote.length);
      }
    }
    if (newNote) {
      this.notes.push(staffNote);  
      this.minVStep = Math.max(staffNote.vSteps, this.minVStep);
      this.maxVStep = Math.min(staffNote.vSteps, this.maxVStep);
      this.length = Math.max(this.length, staffNote.length);
    }
  }

  /**
   * Splits a block in two by a time point measured in note quarters
   * @param quarters split point
   * @param barsInfo An Array with bar and signatures info per quarter
   * @returns The second half of splitted block. First one is the received one,
   * which gets modified.
   */
  public split(quarters: number, barsInfo: BarsInfo): StaffBlock {
    const remainLength = (this.start + this.length) - quarters;
    let splittedBlock: StaffBlock = null;
    if (quarters > this.start && remainLength > 0) {
      splittedBlock = new StaffBlock(
        quarters, 
        remainLength,
        [], 
        barsInfo.barNumberAtQ(quarters)
      );
      this.length -= remainLength;
      this.notes.forEach(
        staffNote => {
          const remainStaffNote = splitStaffNote(staffNote, quarters);
          if (remainStaffNote) {
            splittedBlock.addNote(remainStaffNote);
          }
        }
      );
    }
    if (splittedBlock && this.beatEnd) {
      splittedBlock.beatEnd = true;
      this.beatEnd = false; // Applicable to symbol splitting (post-beat)
    }
    return splittedBlock;
  }

  /**
   * Splits a block in two by next beat to ritmically complete previous one.
   * It marks as well if the affected block is beginning or ending a beat.
   * @param barsInfo An Array with bar and signatures info per quarter
   * @returns The second half of splitted block. First half remains in current
   * object, which gets modified.
   */
  public splitToBeat(barsInfo: BarsInfo): StaffBlock {
    const timeSignature = barsInfo.timeSignatureAtQ(this.start);
    const barLength = barsInfo.barLenghtAtQ(this.start);
    const barFractionFromBar = this.barNumber - Math.floor(this.barNumber);
    const quartersFromBarBeginning = // Javascript math safe
      Math.round(barLength * barFractionFromBar * 1000000) / 1000000;
    const quartersAtBarBeginning = this.start - quartersFromBarBeginning;
    const metricBeat = 4 / timeSignature.denominator;
    const blockBeat = quartersFromBarBeginning / metricBeat;
    const splittingBeat = Math.ceil(blockBeat);
    let splittedBlock: StaffBlock = null;
    if (!isSafeZero(splittingBeat - blockBeat)) { // Splitting on next beat
      const quartersAtBeat = Math.round( // Javascript math safe
        (quartersAtBarBeginning + splittingBeat * metricBeat) * 1000000
      ) / 1000000;
      splittedBlock = this.split(quartersAtBeat, barsInfo);
      if (isSafeZero(this.start + this.length - quartersAtBeat)) {
        this.beatEnd = true; // Block ends at beat end
      }
    }
    else { // Beginning a beat, splitting only at bar end if applicable
      this.beatBegin = true;
      const quartersAtBarEnd = Math.round( // Javascript math safe
        (quartersAtBarBeginning + timeSignature.numerator * metricBeat) * 
        1000000
      ) / 1000000;
      splittedBlock = this.split(quartersAtBarEnd, barsInfo);
      if (isSafeZero(this.start + this.length - quartersAtBarEnd)) {
        this.beatEnd = true; // Block ends at beat end
      }
    }
    if (splittedBlock) { // It was splitted before beat end
      this.beatEnd = true;
    }
    return splittedBlock;
  }

  /**
   * Splits a block in two to make the first one fit in the size of standard
   * musical symbols length.
   * @param barsInfo An Array with bar and signatures info per quarter
   * @param increasing Wether the split must be done shorter to longer notes
   * @returns The second half of splitted block. First half remains in current
   * object, which gets modified.
   */
  public splitToSymbols(barsInfo: BarsInfo, increasing: boolean): StaffBlock {
    let remainBlock: StaffBlock = null;
    if (this.length >= MIN_RESOLUTION) {
      if ( // Whole rest applies to whole bar, whatever its length
        !this.notes.length && // Is a rest and beat splitted to bar length
        this.length === barsInfo.barLenghtAtQ(this.start)
      ) {
        this.headIndex = 4;
      }
      else { // Kind of note selection (all block notes have same aspect)
        remainBlock = increasing? 
          this.splitShorter(barsInfo): this.splitLonger(barsInfo);
      }
    }
    // Fallback for notes shorter than MIN_RESOLUTION. It will be warned on 
    // console and MIN_RESOLUTION note will be drawn.
    else {
      const noteLength = isSafeZero(this.length) ? '[infinite]' : 
        `${4 / this.length}`;
      console.warn(
        '%cStaffRender:', 'background:orange; color:white', 
        'StaffRender does not handle notes shorther than ' +
        `1/${4 / MIN_RESOLUTION}th, and this score tries to draw a ` +
        `1/${noteLength}th. Shortest possible note will be drawn instead.`
      );
      this.headIndex = MIN_RESOLUTION;
      remainBlock = null;
    }
    return remainBlock;
  }
  
  /**
   * Splits a block in two to make the first one the shortest possible size of 
   * standard musical symbols.
   * @param barsInfo An Array with bar and signatures info per quarter
   * @returns The second half of splitted block. First half remains in current
   * object, which gets modified.
   */
  public splitShorter(barsInfo: BarsInfo): StaffBlock {
    let length = this.length;
    let splitLength = 0;
    let headIndex = 0;
    let headAlteration = 0;
    for (let i = 4; !isSafeZero(length); i /= 2) {
      if ( // Dotted note
        isSafeZero(length - i * 3/2) &&
        (barsInfo.allowDottedRests || this.notes.length)
      ) {
        length -= i * 3/2;
        splitLength = i * 3/2;
        headIndex = i;
        headAlteration = 1;
      }
      else if (length >= i) { // Plain note
        length -= i;
        splitLength = i;
        headIndex = i;
      }
      else if (isSafeZero(length - i * 4/5)) { // Quintuplet
        length -= i * 4/5;
        splitLength = i * 4/5;
        headIndex = i;
        headAlteration = 5;
      }
      else if (isSafeZero(length - i * 2/3)) { // Triplet
        length -= i * 2/3;
        splitLength = i * 2/3;
        headIndex = i;
        headAlteration = 3;
      }
    }
    const remainBlock = this.split(this.start + splitLength, barsInfo);
    this.headIndex = headIndex;
    this.headAlteration = headAlteration;
    return remainBlock;
  }

  /**
   * Splits a block in two to make the first one the longest possible size of 
   * standard musical symbols.
   * @param barsInfo An Array with bar and signatures info per quarter
   * @returns The second half of splitted block. First half remains in current
   * object, which gets modified.
   */
  public splitLonger(barsInfo: BarsInfo): StaffBlock {
    let remainBlock: StaffBlock = null;
    for (let i = 4; !this.headIndex; i /= 2) {
      if ( // Dotted note
        isSafeZero(this.length - i * 3/2) &&
        (barsInfo.allowDottedRests || this.notes.length)
      ) {
        remainBlock = this.split(this.start + i * 3/2, barsInfo);
        this.headIndex = i;
        this.headAlteration = 1;
      }
      else if (this.length >= i) {
        remainBlock = this.split(this.start + i, barsInfo);
        this.headIndex = i; // Plain note
      }
      else if (isSafeZero(this.length - i * 4/5)) { // Quintuplet
        remainBlock = this.split(this.start + i * 4/5, barsInfo);
        this.headIndex = i;
        this.headAlteration = 5;
      }
      else if (isSafeZero(this.length - i * 2/3)) { // Triplet
        remainBlock = this.split(this.start + i * 2/3, barsInfo);
        this.headIndex = i;
        this.headAlteration = 3;
      }
    }
    return remainBlock;
  }

  /**
   * Sets a block into the block map or appends its content into an existing 
   * block
   * @param map Block map to hold blocks
   */
  public mergeToMap(map: StaffBlockMap) {
    if (map.has(this.start)) {
      const existingBlock = map.get(this.start);
      this.notes.forEach(note => existingBlock.addNote(note));
    }
    else {
      map.set(this.start, this);
    }
  }

  /**
   * Checks if the block starts at bar beginning
   * @returns true if it is so
   */
  public isBarBeginning(): boolean {
    return this.barNumber - Math.trunc(this.barNumber) === 0.0;
  }

  /**
   * Fulfills beaming info according to previous block and signatures context
   * @param previousStaffBlock The previous block to ritmically complete
   * @param quartersInfo An Array with bar and signatures info per quarter
   */
  public setBeaming(
    previousStaffBlock: StaffBlock, barsInfo: BarsInfo
  ) {
  }
}

/**
 * Verifies if a given number is closer to zero than 0.0000001 in order to 
 * avoid Javascript math imprecissions.
 * @param n Number to be checked
 */
function isSafeZero(n: number): boolean {
  return Math.round(n * 1000000) === 0;
}
