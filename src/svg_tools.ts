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

 /** SVG NameSpace string */
export const SVGNS = 'http://www.w3.org/2000/svg';

/**
 * Draws a SVG path on a SVG container element
 * @param e The SVG container element
 * @param path The SVG path
 * @param x Horizontal position relative to container origin
 * @param y Vertical position relative to container origin
 * @param scaleX Horizontal scale in a factor over 1.0
 * @param scaleY Vertical scale in a factor over 1.0
 * @param opacity Opacity (where 0 is transparent and 1 is fully opaque)
 * @returns The drawn SVG path element
 */
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

/**
 * Draws a SVG text on a SVG container element
 * @param e The SVG container element
 * @param text The text to be drawn
 * @param x Horizontal position relative to container origin
 * @param y Vertical position relative to container origin
 * @param fontSize The font size
 * @param isBold Wether the text should be bold or not
 * @param scaleX Horizontal scale in a factor over 1.0
 * @param scaleY Vertical scale in a factor over 1.0
 * @returns The drawn SVG text element
 */
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

/**
 * Creates a SVG group on a SVG container element
 * @param e The SVG container element
 * @param id The string to identify it when searched for
 * @returns The created SVG group element
 */
export function createSVGGroupChild(e: SVGElement, id: string): SVGElement {
  const child = document.createElementNS(SVGNS, 'g');
  child.setAttribute('data-id', id);
  e.appendChild(child);
  return child;
}

/**
 * Creates a fading animation to play on a SVG element
 * @param e The element to be animated
 * @param bounce Wether the animation should repeat backwards and forward
 * @param from Initial opacity (1 is fully opaque)
 * @param to Final opacity (0 is transparent)
 * @returns The received SVG element to be animated
 */
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

/**
 * Fills a SVG element with a given color
 * @param e The SVG element fo be filled
 * @param color The fill color
 */
export function setFill(e: SVGElement, color: string) {
  e.setAttributeNS(null, 'fill', color);
}

/**
 * Changes stroke width and colour of a given SVG element
 * @param e The SVG element to change the stroke to
 * @param strokeWidth The stroke width
 * @param color The new colour
 */
export function setStroke(e: SVGElement, strokeWidth: number, color: string) {
  e.setAttributeNS(null, 'stroke-width', `${strokeWidth}`);
  e.setAttributeNS(null, 'stroke', color);
}

/**
 * Changes both fill and stroke colours of a SVG element
 * @param e The SVG element to change colours
 * @param color The new colour
 */
export function highlightElement(e: SVGElement, color: string) {
  e.setAttribute('fill', color);
  e.setAttribute('stroke', color);
}
