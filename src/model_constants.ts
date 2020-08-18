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

/** 
 * Minimal duration recognized note, which currently is valid for sixtyfourth 
 * note (1/16 of a quarter note) triplets and quintuplets.
 */
export const MAX_QUARTER_DIVISION = 16*3*5; // TODO: merge with equivalent constants

/** Chromatic scales per key, encoded for staff note placement */
export const SCALES = [ // Accidentals: 0=none, 1=sharp, 2=flat, 3=normal
  { // Chromatic  C C#/Db D D#/Eb E   F F#/Gb G G#/Ab A A#/Bb B   / KEY
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // C
    accidental: [ 0,  1,  0,  1,  0,  0,  1,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Db
    accidental: [ 0,  0,  3,  0,  3,  0,  0,  3,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // D
    accidental: [ 3,  0,  0,  1,  0,  3,  0,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Eb
    accidental: [ 0,  2,  0,  0,  3,  0,  2,  0,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // E
    accidental: [ 3,  0,  3,  0,  0,  3,  0,  3,  0,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // F
    accidental: [ 0,  2,  0,  2,  0,  0,  2,  0,  2,  0,  0,  3] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -7], // Gb
    accidental: [ 3,  0,  3,  0,  3,  0,  0,  3,  0,  3,  0,  0] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // G
    accidental: [ 0,  1,  0,  1,  0,  3,  0,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Ab
    accidental: [ 0,  0,  3,  0,  3,  0,  2,  0,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // A
    accidental: [ 3,  0,  0,  1,  0,  3,  0,  3,  0,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Bb
    accidental: [ 0,  2,  0,  0,  3,  0,  2,  0,  2,  0,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // B
    accidental: [ 3,  0,  3,  0,  0,  3,  0,  3,  0,  3,  0,  0] }
];

/** 
 * A list of all key accidentals indicating the accidental kind (1 = sharp
 * and 2 = flat) and the MIDI note it is associated to
 */
export const KEY_ACCIDENTALS = [
  {accidental: 1, pitches: []},                       // C
  {accidental: 2, pitches: [70, 75, 68, 73, 66]},     // Db
  {accidental: 1, pitches: [78, 73]},                 // D
  {accidental: 2, pitches: [70, 75, 68]},             // Eb
  {accidental: 1, pitches: [78, 73, 80, 75]},         // E
  {accidental: 2, pitches: [70]},                     // F
  {accidental: 2, pitches: [70, 75, 68, 73, 66, 71]}, // Gb
  {accidental: 1, pitches: [78]},                     // G
  {accidental: 2, pitches: [70, 75, 68, 73]},         // Ab
  {accidental: 1, pitches: [78, 73, 80]},             // A
  {accidental: 2, pitches: [70, 75]},                 // Bb
  {accidental: 1, pitches: [78, 73, 80, 75, 70]}      // B
];
