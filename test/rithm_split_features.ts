/**
 * Functional unit test set for rithm splitting on staffrender library.
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
  title: `Uncomplete pulse completion`,
  description: `Notes should be splited to complete pulse`,
  data: {
    notes: [
      { start: 0, length: 0.5, pitch: 67, intensity: 127 },
      { start: 0.5, length: 1, pitch: 67, intensity: 127 },
      { start: 1.5, length: 2.5, pitch: 67, intensity: 127 }
    ],
  }
};
