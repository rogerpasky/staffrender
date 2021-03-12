/**
 * Functional unit test set for rhythm splitting on staffrender library.
 *
 * @license
 * Copyright 2018 Pascual de Juan All Rights Reserved.
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
 */

/**
 * Imports
 */
import * as test from 'tape';
import { StaffModel } from '../src/staff_model';

import * as bs from './basic_symbols_features';

test(`basic_symbols_test: ${bs.testData[0].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[0].data);
  let score = output.staffBlockMap;
  t.equal(score.get( 0.0).length, 4, 'Whole note length');
  t.equal(score.get( 4.0).length, 2, 'Half note length');
  t.equal(score.get( 8.0).length, 1, 'Quarter note length');
  t.equal(score.get(12.0).length, 0.5, 'Eigth note length');
  t.equal(score.get(16.0).length, 0.25, 'Sixteenth note length');
  t.equal(score.get(20.0).length, 0.125, 'Thirtysecondth note length');
  t.equal(score.get(24.0).length, 0.0625, 'Sixtyfourth note length');
  t.end();
});

// Testing in testData[1] is only visual.

test(`basic_symbols_test: ${bs.testData[2].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[2].data);
  let score = output.staffBlockMap;
  t.equal(score.get( 4.0 ).length, 4, 'Whole note rest length');
  t.equal(score.get(10.0 ).length, 2, 'Half note rest length');
  t.equal(score.get(13.0 ).length, 1, 'Quarter note rest length');
  t.equal(score.get(14.0 ).length, 0.5, 'Eigth note rest length');
  t.equal(score.get(15.0 ).length, 0.25, 'Sixteenth note rest length');
  t.equal(score.get(15.5 ).length, 0.125, 'Thirtysecondth note rest length');
  t.equal(score.get(15.75).length, 0.0625, 'Sixtyfourth note rest length');
  t.end();
});

test(`basic_symbols_test: ${bs.testData[3].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[3].data);
  let score = output.staffBlockMap;
  t.equal(score.get( 0.0 ).headAlteration, 1, 'Dotted note');
  t.doesNotEqual(score.get( 3.0 ).headAlteration, 1, 'Rests are not dotted');
  t.end();
});

test(`basic_symbols_test: ${bs.testData[4].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[4].data);
  let score = output.staffBlockMap;
  t.equal(output.clef, 71, 'Trebble Clef');
  t.equal(score.get( 0.0 ).notes[0].vSteps, 5, 'D3');
  t.end();
});

test(`basic_symbols_test: ${bs.testData[5].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[5].data);
  let score = output.staffBlockMap;
  t.equal(output.clef, 50, 'Bass Clef');
  t.equal(score.get( 0.0 ).notes[0].vSteps, -5, 'B3');
  t.end();
});

test(`basic_symbols_test: ${bs.testData[6].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[6].data);
  let score = output.staffBlockMap;
  t.equal(score.get(0.0).notes[0].accidental, 0, 'Unaltered note');
  t.equal(score.get(0.5).notes[0].accidental, 1, '# note');
  t.equal(score.get(1.0).notes[0].accidental, 0, '# (no symbol)');
  t.equal(score.get(1.5).notes[0].accidental, 1, '# (upper scale with symbol)');
  t.equal(score.get(2.0).notes[0].accidental, 3, 'Normal note from sharp');
  t.equal(score.get(2.5).notes[0].accidental, 0, '# (upper scale no symbol)');
  t.equal(score.get(3.0).notes[0].accidental, 0, 'Unaltered note');
  t.equal(score.get(3.5).notes[0].accidental, 1, '# note again');
  t.equal(score.get(4.0).notes[0].accidental, 1, '# note after bar');
  t.equal(score.get(6.0).notes[0].accidental, 0, '# note (Key S. lower scale');
  t.end();
});

test(`basic_symbols_test: ${bs.testData[7].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[7].data);
  let score = output.staffBlockMap;
  t.equal(score.get(0.0).notes[0].accidental, 0, 'Unaltered note');
  t.equal(score.get(0.5).notes[0].accidental, 2, 'b note');
  t.equal(score.get(1.0).notes[0].accidental, 0, 'b (no symbol)');
  t.equal(score.get(1.5).notes[0].accidental, 2, 'b (upper scale with symbol)');
  t.equal(score.get(2.0).notes[0].accidental, 3, 'Normal note from sharp');
  t.equal(score.get(2.5).notes[0].accidental, 0, 'b (upper scale no symbol)');
  t.equal(score.get(3.0).notes[0].accidental, 0, 'Unaltered note');
  t.equal(score.get(3.5).notes[0].accidental, 2, 'b note again');
  t.equal(score.get(4.0).notes[0].accidental, 2, 'b note after bar');
  t.equal(score.get(6.0).notes[0].accidental, 0, 'b note (Key S. lower scale)');
  t.end();
});

test(`basic_symbols_test: ${bs.testData[8].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[8].data);
  const accidentals = [
    [ 0 , 1 , 0 , 1 , 0 , 0 , 1 , 0 , 1 , 0 , 1 , 0] , // C
    [ 0 , 0 , 3 , 0 , 3 , 0 , 0 , 3 , 0 , 3 , 0 , 3] , // Db
    [ 3 , 1 , 0 , 1 , 0 , 3 , 1 , 0 , 1 , 0 , 1 , 0] , // D
    [ 0 , 2 , 3 , 0 , 3 , 0 , 2 , 3 , 0 , 3 , 0 , 3] , // Eb
    [ 3 , 1 , 3 , 1 , 0 , 3 , 1 , 3 , 0 , 0 , 1 , 0] , // E
    [ 0 , 2 , 3 , 2 , 0 , 0 , 2 , 3 , 2 , 3 , 0 , 3] , // F
    [ 3 , 0 , 3 , 0 , 3 , 0 , 0 , 3 , 0 , 3 , 0 , 0] , // Gb
    [ 0 , 1 , 0 , 1 , 0 , 3 , 1 , 0 , 1 , 0 , 1 , 0] , // G
    [ 0 , 0 , 3 , 0 , 3 , 0 , 2 , 3 , 0 , 3 , 0 , 3] , // Ab
    [ 3 , 1 , 0 , 1 , 0 , 3 , 1 , 3 , 0 , 0 , 1 , 0] , // A
    [ 0 , 2 , 3 , 0 , 3 , 0 , 2 , 3 , 2 , 3 , 0 , 3] , // Bb
    [ 3 , 1 , 3 , 1 , 0 , 3 , 1 , 3 , 0 , 3 , 1 , 0]   // B
  ];
  let score = output.staffBlockMap;
  score.forEach(
    block => {
      const scale = output.staffInfo.keySignatures[
        Math.floor(block.notes[0].start / 12)
      ].key;
      const note = block.notes[0].pitch - 60;
      t.equal(
        block.notes[0].accidental, accidentals[scale][note],
        `Accidental on scale ${scale} note ${note}`
      )
    }
  )
  t.end();
});

test(`basic_symbols_test: ${bs.testData[9].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[9].data);
  const barsInfo = output.barsInfo;
  let score = output.staffBlockMap;
  let numerator = 2;
  let denominator = 2;
  let count = 0;
  score.forEach(
    block => {
      t.equal(block.headIndex, 4 / denominator, `Note Ok`);
      t.equal(output.barsInfo.timeSignatureAtQ(block.start).numerator, numerator, `Numerator Ok`);
      t.equal(output.barsInfo.timeSignatureAtQ(block.start).denominator, denominator, `Denominator Ok`);
      if (++count === numerator) {
        count = 0;
        if (++numerator > 12) {
          numerator = 2;
          denominator *= 2;
        }
      }
    }
  )
  t.end();
});

test(`basic_symbols_test: ${bs.testData[10].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[10].data);
  let score = output.staffBlockMap;
  t.equal(score.get(  0.0 ).headIndex, 4, '3/4 whole rest');
  t.equal(score.get(  6.0 ).headIndex, 4, '6/8 whole rest');
  t.equal(score.get( 12.0 ).headIndex, 4, '7/2 whole rest');
  t.equal(score.get( 40.0 ).headIndex, 4, '4/4 whole rest');
  t.end();
});

test(`basic_symbols_test: ${bs.testData[11].title}`, (t: test.Test) => {
  const output = new StaffModel(bs.testData[11].data);
  t.equal(output.staffBlockMap.get(0.0).length, 2.0, 'Rhythm split 1');
  t.equal(output.staffBlockMap.get(2.0).length, 0.5, 'Rhythm split 2');
  t.equal(output.staffBlockMap.get(2.5).length, 0.125, 'Rhythm split 3');
  t.equal(output.staffBlockMap.get(2.625).length, 0.125, 'Rhythm split 4');
  t.equal(output.staffBlockMap.get(2.75).length, 0.25, 'Rhythm split 5');
  t.equal(output.staffBlockMap.get(3.0).length, 1.0, 'Rhythm split 6');
  t.equal(output.staffBlockMap.get(4.0).length, 4.0, 'Rhythm split 7');
  t.end();
});
