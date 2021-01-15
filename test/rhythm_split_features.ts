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

testData[0] = {
  title: `Uncomplete beat fulfillment`,
  description: `Notes should be splited and tied to make clear where does a \
    beat starts and ends, easing the rhythm readability.`,
  data: {
    notes: [
      { start: 0, length: 0.5, pitch: 67, intensity: 127 },
      { start: 0.5, length: 1, pitch: 67, intensity: 127 },
      { start: 1.5, length: 2.5, pitch: 67, intensity: 127 }
    ],
  }
};

testData[1] = {
  title: `Ties and rests ordering`,
  description: `The order of tied notes or rests groups uses to be decreasing \
    lengths from longer duration symbols to shorter ones, unless such group of \
    symbols complete a beat within a bar, in which case they will be ordered \
    increasing lengths from shorter to longer symbols in order to \
    symmetrically complete the starting part of the beat. Following score \
    shows three decreasing tied notes, an increasing rests set, followed by a \
    decreasing rest set and two ascending tied notes till the end of the bar, \
    tied again to note in next bar, followed by an ascending rest set to \
    complete the beat and then a regular decreasing rest. Last note makes \
    previous rest noticeable.`,
  data: {
    notes: [
      { start: 0, length: 2+1/2+1/8, pitch: 67, intensity: 127 },
      { start: 4-(1/4+1/16), length: 1/4+2/16, pitch: 67, intensity: 127 },
      { start: 8, length: 4, pitch: 67, intensity: 127 }
    ],
  }
};
