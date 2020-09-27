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
  NoteInfo, ReferenceInfo
} from './staff_info';

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
export class StaffBlock {
  /** Starting time, in quarter note quantities (float) */
  public start: number;
  /** Note length, in quarter note quantities (float) */
  public length: number;
  /** Block bar number (float) being .0 at bar beginning and .5 at bar half. */
  public barNumber: number;
  /** The list of notes related to the block */
  public notes: StaffNote[];
  /** Upper limit of vertical steps in block notes */
  public maxVStep: number;
  /** Lower limit of vertical steps in block notes */
  public minVStep: number;

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
    this.notes = notes;
    this.barNumber = barNumber;
    this.maxVStep = maxVStep;
    this.minVStep = minVStep;
  }

  public isBarBeginning(): boolean {
    return this.barNumber - Math.trunc(this.barNumber) === 0.0;
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
      this.length = this.length;
    }
  }

  /**
   * Splits a block in two by a time point measured in note quarters
   * @param quarters split point
   * @param quartersInfo An Array with bar and signatures info per quarter
   * @returns The second half of splitted block. First one is the received one,
   * which gets modified.
   */
  public split(quarters: number, referencesInfo: ReferenceInfo[]): StaffBlock {
    const remainLength = (this.start + this.length) - quarters;
    let splittedBlock: StaffBlock = null;
    if (quarters > this.start && remainLength > 0) {
      splittedBlock = new StaffBlock(
        quarters, 
        remainLength,
        [], 
        referencesInfo[Math.trunc(quarters)].barNumber
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
    return splittedBlock;
  }

  /**
   * Splits a block in two by to ritmically complete previous one
   * @param lastStaffBlock The previous block to ritmically complete
   * @param quartersInfo An Array with bar and signatures info per quarter
   * @returns The second half of splitted block. First one is the received one,
   * which gets modified.
   */
  public splitToComplete(
    lastStaffBlock: StaffBlock, referencesInfo: ReferenceInfo[]
  ): StaffBlock {
//    const remainLength = (this.start + this.length) - quarters;
    let splittedBlock: StaffBlock = null;
/*    if (quarters > this.start && remainLength > 0) {
      splittedBlock = new StaffBlock(
        quarters, 
        remainLength,
        [], 
        referencesInfo[Math.trunc(quarters)].barNumber
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
    }*/
    return splittedBlock;
  }

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
    staffNote.tiedTo = splitted;
  }
  return splitted;
} // TODO: review to move interface to class
