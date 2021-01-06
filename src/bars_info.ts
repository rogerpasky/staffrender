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
    StaffInfo, TempoInfo, TimeSignatureInfo, KeySignatureInfo, getBarLength
  } from './staff_info';

import { 
  MAX_QUARTER_DIVISION
} from './model_constants';
  
export interface BarInfo {
    start: number;
    barNumber: number;
    barLength: number;
    tempo: TempoInfo;
    keySignature: KeySignatureInfo;
    timeSignature: TimeSignatureInfo;
    tempoChange?: boolean;
    keyChange?: boolean;
    timeChange?: boolean;
  }
  
export class BarsInfo {
  private barsInfo: Array<BarInfo>;

  /** 
   * Fills the reference info (bar, tempo, time signature and key signature)
   * in a per quarter array as a fast method to furthe fill details in blocks
   * @param staffInfo The staff information get references from.
   */
  constructor (staffInfo: StaffInfo, lastQ: number) {
    this.barsInfo = new Array;
    let tempoIndex = 0;
    let keyIndex = 0;
    let timeIndex = 0;
    let currentTempo = staffInfo.tempos[0];
    let currentKeySignature = staffInfo.keySignatures[0];
    let currentTimeSignature = staffInfo.timeSignatures[0];
    let barNumberAtCurrentTimeSignature = 0;
    let currentBarLength = getBarLength(currentTimeSignature);
    for (let quarters = 0; quarters < lastQ; quarters += 1/16) { // All quarters
      const barInfo: BarInfo = { 
        start: quarters,
        barNumber: barNumberAtCurrentTimeSignature + 
          (quarters - currentTimeSignature.start) / currentBarLength, 
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
        barInfo.tempo = currentTempo;
        barInfo.tempoChange = true;
      }
      if ( // Register a key signature change in this quarter
        keyIndex < staffInfo.keySignatures.length && 
        staffInfo.keySignatures[keyIndex].start === quarters
      ) {
        currentKeySignature = staffInfo.keySignatures[keyIndex++];
        barInfo.keySignature = currentKeySignature;
        barInfo.keyChange = true;
      }
      if (
        timeIndex < staffInfo.timeSignatures.length && 
        staffInfo.timeSignatures[timeIndex].start === quarters
      ) { // Register a time signature in this quarter
        barNumberAtCurrentTimeSignature = barInfo.barNumber; // New t.s. start
        currentTimeSignature = staffInfo.timeSignatures[timeIndex++];
        barInfo.timeSignature = currentTimeSignature;
        currentBarLength = getBarLength(currentTimeSignature);
        barInfo.barLength = currentBarLength;
        barInfo.timeChange = true;
      }
      this.barsInfo.push(barInfo);
    }      
  }

  /**
   * Gets the bar number of a note starting at a given position. It will be an
   * integer value if it relies at the beginning of the bar, and it will 
   * reflect the position within the bar along with the decimals (a note 
   * starting in the middle of the third 4/4 bar will return 3.5)
   * @param quarters  
   */
  public barNumberAtQ(start: number): number { // TODO: Change resolution
    const reference = this.barsInfo[Math.trunc(start * 16)];
    const quartersAdvance = start - reference.start;
    const barAdvanceSinceReference = quartersAdvance / reference.barLength;
    return reference.barNumber + barAdvanceSinceReference;
  }

  /**
   * Gets the bar length at a quarter on the staff
   * @param quarter Quarter to look the bar lenght at
   * @returns The length of the bar at given quarter 
   */
  public barLenghtAtQ(start: number): number {
    return this.barsInfo[Math.trunc(start * 16)].barLength;
  }

  /**
   * Gets the tempo in qpm at a quarter on the staff. **NOTE**: it doesn't 
   * cover tempo changes yet, and assumes score keeps it stable till the end.
   * @param quarters Quarter to look key signature at
   * @returns The key which is operative at given quarter 
   */
  public tempoAtQ(_start: number): number {
    return this.barsInfo[0].tempo.qpm;
  } 
  
  /**
   * Gets the key signature at a quarter on the staff
   * @param quarters Quarter to look key signature at
   * @returns The key which is operative at given quarter 
   */
  public keySignatureAtQ(start: number): number {
    return this.barsInfo[Math.trunc(start * 16)].keySignature.key;
  } 
  
  /**
   * Gets the time signature at a quarter on the staff
   * @param quarter Quarter to look time signature at
   * @returns The time signature which is operative at given quarter 
   */
  public timeSignatureAtQ(start: number): TimeSignatureInfo {
    return this.barsInfo[Math.trunc(start * 16)].timeSignature;
  }

  /**
   * Convert a given amount of quarters to seconds. **NOTE**: it doesn't 
   * cover tempo changes yet, and assumes score keeps it stable till the end.
   * @param quarters The given amount of quarters
   * @returns The equivalent amount of seconds
   */
  public quartersToTime(quarters: number): number {
    return quarters / this.barsInfo[0].tempo.qpm * 60;
  }
  
  /**
   * Convert a given amount of seconds to quarters. **NOTE**: it doesn't 
   * cover tempo changes yet, and assumes score keeps it stable till the end.
   * It will be rounded to minimum note division to avoid JavaScript number
   * rounding issues.
   * @param quarters The given amount of seconds
   * @returns The equivalent amount of quarters
   */
  public timeToQuarters(time: number): number {
    const q = time * this.barsInfo[0].tempo.qpm / 60;
    return Math.round(q * MAX_QUARTER_DIVISION) / MAX_QUARTER_DIVISION;
  }

}  