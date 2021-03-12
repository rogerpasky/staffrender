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
import { TestData } from './test_data';

export const testData: TestData[] = [];

var position = 0; // Used for incremental note starting point

testData[0] = {
  title: `Notes ordered by length in same block.`,
  description: `Notes will be ordered by length in same block.`,
  data: {
    notes: [
      { start: 0, length: 1.0, pitch: 61, intensity: 127 },
      { start: 0, length: 3.0, pitch: 62, intensity: 127 },
      { start: 0, length: 0.5, pitch: 60, intensity: 127 },
      { start: 0, length: 3.5, pitch: 63, intensity: 127 },
      { start: 0, length: 4.0, pitch: 64, intensity: 127 }
    ],
  }
};

testData[1] = {
  title: `Same pitch overlapped notes skipped.`,
  description: `Same length or longer overlapped notes will be ignored.`,
  data: {
    notes: [
      { start: 0, length: 1.0, pitch: 60, intensity: 127 },
      { start: 0, length: 1.0, pitch: 60, intensity: 127 },
      { start: 1, length: 1.0, pitch: 61, intensity: 127 },
      { start: 1, length: 3.5, pitch: 61, intensity: 127 }
    ],
  }
};

testData[2] = {
  title: `Same pitch overlapped notes shortened.`,
  description: `Shorter overlapped notes will replace previous longer ones.`,
  data: {
    notes: [
      { start: 0, length: 2.0, pitch: 60, intensity: 127 },
      { start: 0, length: 1.0, pitch: 60, intensity: 127 },
    ],
  }
};

testData[3] = {
  title: `Overlapping blocks splitting.`,
  description: `Overlapping new blocks will split overlapped to the new \
    block start.`,
  data: {
    notes: [
      { start: 0, length: 3.0, pitch: 60, intensity: 127 },
      { start: 0, length: 3.0, pitch: 61, intensity: 127 },
      { start: 1, length: 2.0, pitch: 62, intensity: 127 },
    ],
  }
};

testData[4] = {
  title: `Same pitch overlapped notes keep ties.`,
  description: `Shorter overlapping notes will replace longer ones adapting \
    the previous ties to the new notes.`,
  data: {
    notes: [
      { start: 0, length: 6.0, pitch: 60, intensity: 127 },
      { start: 4, length: 1.0, pitch: 60, intensity: 127 },
    ],
  }
};
