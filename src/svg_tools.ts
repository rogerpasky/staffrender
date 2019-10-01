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

export const SVGNS = 'http://www.w3.org/2000/svg';

export function drawSVGPath(
  e: SVGElement, path: string, x: number, y: number, 
  scaleX: number, scaleY: number, opacity = 1
): SVGElement {
  const child = document.createElementNS(SVGNS, 'path');
  child.setAttributeNS(null, 'd', path);
  child.setAttributeNS(
    null, 'transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`
  );
  child.setAttributeNS(null, 'opacity', `${opacity}`);
  e.appendChild(child);
  return child;
}

export function drawSVGText(
  e: SVGElement, text: string, x: number, y: number, 
  fontSize: string, isBold=false, scaleX = 1, scaleY = 1
): SVGElement {
  const child = document.createElementNS(SVGNS, 'text');
  child.setAttributeNS(null, 'font-family', 'Times');
  child.setAttributeNS(null, 'font-size', fontSize);
  if (isBold) {child.setAttributeNS(null, 'font-weight', 'bold');}
  child.setAttributeNS(
    null, 'transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`
  );
  const textNode = document.createTextNode(text);
  child.appendChild(textNode);
  e.appendChild(child);
  return child;
}

export function createSVGGroupChild(e: SVGElement, id: string): SVGElement {
  const child = document.createElementNS(SVGNS, 'g');
  child.setAttribute('data-id', id);
  e.appendChild(child);
  return child;
}

export function setFade(
  e: SVGElement, bounce = false, from = 1, to = 0
): SVGElement {
  let animation = e.querySelector(`animate`);
  if (!animation){
    animation = document.createElementNS(SVGNS, 'animate');
    animation.setAttributeNS(null, 'attributeName', 'opacity');
    animation.setAttributeNS(null, 'dur', '4s');
    animation.setAttributeNS(null, 'fill', 'freeze');
    animation.setAttributeNS(null, 'keyTimes', '0; 0.25; 0.5; 0.75; 1');
    const easyIn = (from + 3 * to) / 4;
    animation.setAttributeNS(
      null, 'values', `${from}; ${easyIn}; ${to}; ${easyIn}; ${from}`
    );
  }
  if (bounce) {
    animation.setAttributeNS(null, 'repeatCount', 'indefinite');
  }
  else {
    animation.setAttributeNS(null, 'repeatCount', '1');
  }
  e.appendChild(animation);
  return e;
}