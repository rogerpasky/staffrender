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

var position = 0; // Used for incremental note starting point

testData[0] = {
  title: `Note symbols`,
  description: `Notes of different length should complete each bar. Stems on \
    first half bar should be upwards and should be downwards on second half`,
  data: {
    notes: [],
  }
};
position = 0;
for (let n = 1; n < 128; n *= 2) {
  const duration = 4 / n;
  for (let i = 0; i < n; ++i) {
    const notePitch = 67 + (i >= n / 2 ? 5 : 0);
    testData[0].data.notes.push(
      { start: position, length: duration, pitch: notePitch, intensity: 127 }
    );
    position += duration;
  }
}

testData[1] = { // Not required for unitary test but for visual test.
  title: `Stem direction threshold`,
  description: `Stem should be upwards up to third line notes (included).`,
  data: {
    notes: [
      { start: 0, length: 1, pitch: 69, intensity: 127 },
      { start: 1, length: 1, pitch: 71, intensity: 127 },
      { start: 2, length: 1, pitch: 72, intensity: 127 },
      { start: 3, length: 1, pitch: 74, intensity: 127 }
    ],
  }
};

testData[2] = {
  title: `Rest symbols`,
  description: `Notes of different length should be paired with their relative \
    rest. Last note has been placed to complete the bar and make last rest \
    noticeable.`,
  data: {
    notes: [],
  }
};
position = 0;
for (let n = 1; n < 128; n *= 2) {
  const duration = 4 / n;
  testData[2].data.notes.push(
    { start: position, length: duration, pitch: 67, intensity: 127 }
  );
  position += 2 * duration;
}
testData[2].data.notes.push(
  { start: position, length: 0.125, pitch: 67, intensity: 127 }
); // Completing bar

testData[3] = { // Not required for unitary test but for visual test.
  title: `Treble Clef (G-Clef)`,
  description: `Leftmost symbol (spiral-like) makes five lines pentagram to \
    cover pitches from D3 to G4 touching extreme lines. Higher and lower \
    pitches are represented using extra lines. C3 is considered "G-Clef lower \
    bound", even though lower notes can be represented. There's no "upper \
    bound" and higher notes from A4 can be represented. Once setted in a staff \
    it cannot be replaced by another Clef.`,
  data: {
    notes: [
      { start: 0, length: 1, pitch: 62, intensity: 127 },
      { start: 1, length: 1, pitch: 64, intensity: 127 },
      { start: 2, length: 1, pitch: 65, intensity: 127 },
      { start: 3, length: 1, pitch: 67, intensity: 127 },
      { start: 4, length: 1, pitch: 69, intensity: 127 },
      { start: 5, length: 1, pitch: 71, intensity: 127 },
      { start: 6, length: 1, pitch: 72, intensity: 127 },
      { start: 7, length: 1, pitch: 74, intensity: 127 },
      { start: 8, length: 1, pitch: 76, intensity: 127 },
      { start: 9, length: 1, pitch: 77, intensity: 127 },
      { start: 10, length: 1, pitch: 79, intensity: 127 },
      { start: 11, length: 1, pitch: 60, intensity: 127 },
      { start: 12, length: 1, pitch: 59, intensity: 127 },
      { start: 13, length: 1, pitch: 57, intensity: 127 },
      { start: 14, length: 1, pitch: 55, intensity: 127 },
      { start: 15, length: 1, pitch: 81, intensity: 127 },
      { start: 16, length: 1, pitch: 83, intensity: 127 },
      { start: 17, length: 1, pitch: 84, intensity: 127 },
      { start: 18, length: 1, pitch: 86, intensity: 127 }
    ],
  }
};

testData[4] = { // Not required for unitary test but for visual test.
  title: `Bass Clef (F-Clef)`,
  description: `Leftmost symbol (the curved one alongsidewith colon) makes \
    five lines pentagram to cover pitches from F1 to B2 touching extreme \
    lines. Higher and lower pitches are represented using extra lines. C3 is \
    considered "F-Clef upper bound", even though higher notes can be \
    represented. There's no "lower bound" and lower notes from E1 can be \
    represented. Once setted in a staff it cannot be replaced by another Clef.`,
  data: {
    notes: [
      { start: 0, length: 1, pitch: 59, intensity: 127 },
      { start: 1, length: 1, pitch: 57, intensity: 127 },
      { start: 2, length: 1, pitch: 55, intensity: 127 },
      { start: 3, length: 1, pitch: 53, intensity: 127 },
      { start: 4, length: 1, pitch: 52, intensity: 127 },
      { start: 5, length: 1, pitch: 50, intensity: 127 },
      { start: 6, length: 1, pitch: 48, intensity: 127 },
      { start: 7, length: 1, pitch: 47, intensity: 127 },
      { start: 8, length: 1, pitch: 45, intensity: 127 },
      { start: 9, length: 1, pitch: 43, intensity: 127 },
      { start: 10, length: 1, pitch: 41, intensity: 127 },
      { start: 11, length: 1, pitch: 60, intensity: 127 },
      { start: 12, length: 1, pitch: 62, intensity: 127 },
      { start: 13, length: 1, pitch: 64, intensity: 127 },
      { start: 14, length: 1, pitch: 65, intensity: 127 },
      { start: 15, length: 1, pitch: 40, intensity: 127 },
      { start: 16, length: 1, pitch: 38, intensity: 127 },
      { start: 17, length: 1, pitch: 36, intensity: 127 },
      { start: 18, length: 1, pitch: 35, intensity: 127 }
    ],
  }
};

testData[5] = {
  title: `Sharp Accidentals`,
  description: `Notes can modify their pitch one semitone up using Accidental \
    symbol '#' (called sharp) before a note symbol. Once modified (let's say \
    C3), all notes in same staff position are modified as well until the end \
    of current bar. Setting an Accidental at the beginning of a bar instead to \
    a single note makes it apply all notes of same name (i.e. C3 and C4) to \
    this and following bars. This is called Key Signature and resets previous \
    Key Signatures, if any. There is a Normal Symbol to anule active \
    note Accidental of following notes until the end of bar, where there would \
    be a Key Signature re-activation. Following score shows a Key Signature \
    and some notes, in order, unaltered, sharp, sharp (no need for Accidental \
    symbol), sharp (in other scale, needing for sharp symbol again), normal \
    (back to unaltered), sharp (in ither scale again with no need for \
    Accidental), unaltered, sharp again, end of bar with Accidentals \
    reset (except the ones from key signature), sharp and, finally, sharp \
    (applying key signature to same name note in other scale).`,
  data: {
    keySignatures: [ { start: 0, key: 7 } ],
    notes: [
      { start: 0, length: 0.5, pitch: 67, intensity: 127 },
      { start: 0.5, length: 0.5, pitch: 68, intensity: 127 },
      { start: 1.0, length: 0.5, pitch: 68, intensity: 127 },
      { start: 1.5, length: 0.5, pitch: 80, intensity: 127 },
      { start: 2.0, length: 0.5, pitch: 67, intensity: 127 },
      { start: 2.5, length: 0.5, pitch: 80, intensity: 127 },
      { start: 3, length: 0.5, pitch: 67, intensity: 127 },
      { start: 3.5, length: 0.5, pitch: 68, intensity: 127 },
      { start: 4, length: 2, pitch: 68, intensity: 127 },
      { start: 6, length: 2, pitch: 66, intensity: 127 }
    ],
  }
};

testData[6] = {
  title: `Flat Accidentals`,
  description: `Notes can modify their pitch one semitone down using \
    Accidental symbol 'b' (called flat) before a note symbol. Same rules apply \
    as in Sharp Accidentals scenario. Similar pattern has been used on score`,
  data: {
    keySignatures: [ { start: 0, key: 5 } ],
    notes: [
      { start: 0, length: 0.5, pitch: 69, intensity: 127 },
      { start: 0.5, length: 0.5, pitch: 68, intensity: 127 },
      { start: 1.0, length: 0.5, pitch: 68, intensity: 127 },
      { start: 1.5, length: 0.5, pitch: 80, intensity: 127 },
      { start: 2.0, length: 0.5, pitch: 69, intensity: 127 },
      { start: 2.5, length: 0.5, pitch: 80, intensity: 127 },
      { start: 3, length: 0.5, pitch: 69, intensity: 127 },
      { start: 3.5, length: 0.5, pitch: 68, intensity: 127 },
      { start: 4, length: 2, pitch: 68, intensity: 127 },
      { start: 6, length: 2, pitch: 58, intensity: 127 }
    ],
  }
};

testData[7] = {
  title: `Key Signatures on chromatic scales`,
  description: `There is a close set of 12 Key Signatures. Half of them use \
    sharps (from 0 to 5 sharps: C, G, D, A, E and B keys, the right side of \
    the Circle of Fifths) and the rest use flats (from 1 to 6 flats: F, Bb, \
    Eb, Ab, Db and Gb keys). Following score will show a chromatic scale on \
    each key in that precise order. Overlapping keys with different names (Gb \
    = F#) have been removed for simplicity sake. Accidentals will be of a \
    unique kind along a given key, so tere won't appear a mix sharps and \
    flats (even though it's allowed in musical handwriting).`,
  data: {
    keySignatures: [ 
      { start:   0, key:  0 },
      { start:  12, key:  7 },
      { start:  24, key:  2 },
      { start:  36, key:  9 },
      { start:  48, key:  4 },
      { start:  60, key: 11 },
      { start:  72, key:  5 },
      { start:  84, key: 10 },
      { start:  96, key:  3 },
      { start: 108, key:  8 },
      { start: 120, key:  1 },
      { start: 132, key:  6 }
    ],
    notes: [],
  }
};
position = 0;
for (let n = 0; n < 12; ++n) {
  for (let p = 60; p < 72; ++p) {
    testData[7].data.notes.push(
      { start: position++, length: 1, pitch: p, intensity: 127 }
    );
  }
}

testData[8] = {
  title: `Time Signatures`,
  description: `Notes can be gropued on bars according to "pulse" rithm \
    patterns, defined by Time Signatures consisting on a numerator and a \
    denominator number. Denominator defines the length of its pulse as the \
    fraction of a whole note, and numerator defines the number of pulses \
    needed to complete a bar. A Time Signature shown at the beginning of a \
    bar changes rithm to that bar and followings. Next score shows several \
    Time Signatures.`,
  data: {
    timeSignatures: [],
    notes: [],
  }
};
position = 0;
for (let d = 2; d <= 8; d *= 2) {
  const l = 4 / d;
  const data = testData[8].data;
  for (let n = 2; n <= 12; ++n) {
    data.timeSignatures.push(
      { start: position, numerator: n, denominator: d }
    )
    for (let i = 0; i < n; ++i) {
      data.notes.push(
        { start: position, length: l, pitch: 67, intensity: 127 }
      );
      position += l;
    }
  }
}

testData[9] = {
  title: `Ties`,
  description: `Notes longer than avilable note symbols length can be achieved \
  combining two or more through ties. Notes which surpass bars must be \
  splitted using ties. Rest aggregation does not need any tie. Following \
  score shows three tied notes, a rests set, two tied notes, a long rest set \
  and two notes tied to surpass a bar.`,
  data: {
    notes: [
      { start: 0, length: 2+1/2+1/8, pitch: 67, intensity: 127 },
      { start: 4-(1/4+1/16), length: 1/4+1/16, pitch: 67, intensity: 127 },
      { start: 8-1/16, length: 4+1/16, pitch: 67, intensity: 127 }
    ],
  }
};
