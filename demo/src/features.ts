/**
 * @license
 * Copyright 2021 Pascual de Juan All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TestData } from '../../test/test_data';
import { StaffSVGRender, ScrollType } from '../../src/staff_svg_render';

const config = {
  noteHeight: 15,
  pixelsPerTimeStep: 0,
  instruments: [0],
  defaultKey: 0,
  scrollType: ScrollType.BAR
}

function visualize(div: HTMLDivElement, test: TestData) {
  const detailsDiv = document.createElement("div");
  div.appendChild(detailsDiv);
  const title = document.createElement("h3");
  title.innerText = test.title;
  detailsDiv.appendChild(title);
  const description = document.createElement("p");
  description.innerText = test.description;
  detailsDiv.appendChild(description);
  const containerDiv = document.createElement("div");
  containerDiv.className = 'visualizer-container';
  div.appendChild(containerDiv);
  const scoreDiv = document.createElement("div");
  containerDiv.appendChild(scoreDiv);
  div.appendChild(document.createElement("br"));
  new StaffSVGRender(test.data, config, scoreDiv);
}

import * as bs from '../../test/basic_symbols_features';
const bsDiv = document.getElementById('basicSymbols') as HTMLDivElement;
bs.testData.forEach( test => visualize(bsDiv, test) );

import * as rs from '../../test/rhythm_split_features';
const rsDiv = document.getElementById('rhythmSplit') as HTMLDivElement;
rs.testData.forEach( test => visualize(rsDiv, test) );
