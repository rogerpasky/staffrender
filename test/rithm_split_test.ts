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
import * as test from 'tape';
import '../src/index';
import { StaffModel } from '../src/index';

import * as rs from './rithm_split_features';

test(`rithm_split_test: ${rs.testData[0].title}`, (t: test.Test) => {
  const output = new StaffModel(rs.testData[0].data);
  t.equal(output.staffBlockMap.get(0.5).length, 0.5, 'First rithm split');
  t.equal(output.staffBlockMap.get(1.0).length, 0.5, 'First split remain');
  t.equal(output.staffBlockMap.get(1.5).length, 0.5, 'Second rithm split');
  t.equal(output.staffBlockMap.get(2.0).length, 2.0, 'Second rithm remain');
  t.end();
});

