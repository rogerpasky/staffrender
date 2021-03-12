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

import * as ni from './note_insertion_features';

test(`note_insertion_test: ${ni.testData[0].title}`, (t: test.Test) => {
  const output = new StaffModel(ni.testData[0].data);
  const block = output.staffBlockMap.get(0.0);
  t.equal(block.notes[0].pitch, 60, 'Ordered 1st');
  t.equal(block.notes[1].pitch, 61, 'Ordered 2nd');
  t.equal(block.notes[2].pitch, 62, 'Ordered 3rd');
  t.equal(block.notes[3].pitch, 63, 'Ordered 4th');
  t.equal(block.notes[4].pitch, 64, 'Ordered 5th');
  t.end();
});

test(`note_insertion_test: ${ni.testData[1].title}`, (t: test.Test) => {
  const output = new StaffModel(ni.testData[1].data);
  let block = output.staffBlockMap.get(0.0);
  t.equal(output.staffBlockMap.size, 2, 'Just two blocks');
  t.equal(block.notes.length, 1, 'Equal note has been skipped');
  t.equal(block.notes[0].length, 1, 'Remained one quarter long');
  block = output.staffBlockMap.get(1.0);
  t.equal(block.notes.length, 1, 'Overlapped longer note has been skipped');
  t.equal(block.notes[0].length, 1, 'Remained shortest length');
  t.end();
});

test(`note_insertion_test: ${ni.testData[2].title}`, (t: test.Test) => {
  const output = new StaffModel(ni.testData[2].data);
  let block = output.staffBlockMap.get(0.0);
  t.equal(block.notes.length, 1, 'Shorter note has been replaced');
  t.equal(block.notes[0].length, 1, 'Remained one quarter long');
  t.end();
});

test(`note_insertion_test: ${ni.testData[3].title}`, (t: test.Test) => {
  const output = new StaffModel(ni.testData[3].data);
  t.equal(output.staffBlockMap.size, 2, 'Two blocks');
  let block = output.staffBlockMap.get(0.0);
  t.equal(block.notes.length, 2, 'Two notes on first block');
  t.equal(block.length, 1, 'First block is one quarter long');
  t.equal(block.notes[0].length, 1, 'First note became one quarter long');
  t.equal(block.notes[0].pitch, 60, 'First note pitch Ok');
  t.equal(block.notes[1].length, 1, 'Second note became one quarter long');
  t.equal(block.notes[1].pitch, 61, 'Second note pitch Ok');
  block = output.staffBlockMap.get(1.0);
  t.equal(block.notes.length, 3, 'Three notes on second block');
  t.equal(block.length, 2, 'Second block is two quarters long');
  t.equal(block.notes[0].length, 2, 'First note became two quarter long');
  t.equal(block.notes[0].pitch, 60, 'First note pitch Ok');
  t.equal(block.notes[1].length, 2, 'Second note became two quarter long');
  t.equal(block.notes[1].pitch, 61, 'Second note pitch Ok');
  t.equal(block.notes[2].length, 2, 'Third note became two quarter long');
  t.equal(block.notes[2].pitch, 62, 'Third note pitch Ok');
  t.end();
});

test(`note_insertion_test: ${ni.testData[4].title}`, (t: test.Test) => {
  const output = new StaffModel(ni.testData[4].data);
  let block = output.staffBlockMap.get(4.0);
  t.equal(block.notes.length, 1, 'Shorter note has been replaced');
  t.equal(block.notes[0].length, 1, 'Remained one quarter long');
  t.equal(block.notes[0].tiedFrom.length, 4, 'Tied from previous one');
  block = output.staffBlockMap.get(0.0);
  t.equal(block.notes[0].tiedTo.length, 1, 'Previous one tied to shorter');
  t.end();
});
