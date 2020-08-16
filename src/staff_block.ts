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
  NoteInfo
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
  length: number;
  /** Block bar number (float) being .0 at bar beginning and .5 at bar half. */
  public barNumber: number;
  /** The list of notes related to the block */
  public notes: StaffNote[];
  /** Upper limit of vertical steps in block notes */
  public maxVStep: number;
  /** Lower limit of vertical steps in block notes */
  public minVStep: number;
  /** Following rest to next block, if any */
  public restToNextLength: number;

  constructor (
    start=0, 
    length=0, 
    barNumber=0,
    notes: StaffNote[]=[],
    maxVStep=Number.MAX_SAFE_INTEGER,
    minVStep=Number.MIN_SAFE_INTEGER,
    restToNextLength=0,
  ) {
    this.start = start;
    this.length = length;
    this.barNumber = barNumber;
    this.notes = notes;
    this.maxVStep = maxVStep;
    this.minVStep = minVStep;
    this.restToNextLength = restToNextLength;
  }

  public isBarBeginning(): boolean {
    return this.barNumber - Math.trunc(this.barNumber) === 0.0;
  }
}
  