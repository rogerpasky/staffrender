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
  title: `Note symbols and their durations`,
  description: `Notes of different length should complete each bar going from \
    whole note through 1/2th, 1/4th, 1/8th, 1/16th, 1/32th and 1/64th, which \
    is the lowest handled resolution. Stems on first half bar should be \
    upwards and should be downwards on second half.`,
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
  title: `Rest symbols and their durations`,
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

testData[3] = {
  title: `Dotted notes`,
  description: `Note length can be extended to a 150% of its nominal value \
    adding a dot after the note symbol. This applies to all note symbols but \
    it will not be applied to rests symbols, besides it is not forbidden under \
    some circumstances, following the classical music transcription chriteria \
    disrecommending the use of dotted rests in order to ease the readability. \
    Last note is included to make last rests noticeable.`,
  data: {
    notes: [
      { start: 0, length: 3, pitch: 67, intensity: 127 },
      { start: 3.75, length: 0.25, pitch: 67, intensity: 127 }
    ],
  }
};

testData[4] = { // Not required for unitary test but for visual test.
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

testData[5] = { // Not required for unitary test but for visual test.
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

testData[6] = {
  title: `Sharp Accidentals`,
  description: `Notes can modify their pitch one semitone up using Accidental \
    symbol '#' (called sharp) before a note symbol. Once modified (let's say \
    G3), all notes in same staff position are modified as well until the end \
    of current bar. Setting an Accidental at the beginning of a bar instead to \
    a single note makes it apply all notes of same name (i.e. G3 and G4) to \
    this and following bars. This is called Key Signature and resets previous \
    Key Signatures, if any. There is a Normal Symbol to anule active \
    note Accidental of following notes until the end of bar, where there would \
    be a Key Signature re-activation. Double sharp and similar Accidentals are \
    not covered and will be represented as next note if applicable. Following \
    score shows a Key Signature and some notes, in order, unaltered, sharp, \
    sharp (no need for Accidental symbol), sharp (in other scale, needing for \
    sharp symbol again), normal (back to unaltered), sharp (in ither scale \
    again with no need for Accidental), unaltered, sharp again, end of bar \
    with Accidentals reset (except the ones from key signature), sharp and, \
    finally, sharp (applying key signature to same name note in other scale).`,
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

testData[7] = {
  title: `Flat Accidentals`,
  description: `Notes can modify their pitch one semitone down using \
    Accidental symbol 'b' (called flat) before a note symbol. Same rules apply \
    as in Sharp Accidentals scenario. Double flat is not covered either. \
    Similar pattern has been used on score`,
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

testData[8] = {
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
    testData[8].data.notes.push(
      { start: position++, length: 1, pitch: p, intensity: 127 }
    );
  }
}

testData[9] = {
  title: `Time Signatures`,
  description: `Notes can be gropued on bars according to "pulse" rhythm \
    patterns, defined by Time Signatures consisting on a numerator and a \
    denominator number. Denominator defines the length of its pulse as the \
    fraction of a whole note, and numerator defines the number of pulses \
    needed to complete a bar. A Time Signature shown at the beginning of a \
    bar changes rhythm to that bar and followings. Next score shows several \
    Time Signatures.`,
  data: {
    timeSignatures: [],
    notes: [],
  }
};
position = 0;
for (let d = 2; d <= 8; d *= 2) {
  const l = 4 / d;
  const data = testData[9].data;
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

testData[10] = {
  title: `Whole rests`,
  description: `Whole rest symbol is used to specify a whole silent bar, no \
    matter which the time signature is.`,
  data: {
    timeSignatures: [ 
      { start:   0, numerator:  3, denominator: 4 },
      { start:   6, numerator:  6, denominator: 8 },
      { start:  12, numerator:  7, denominator: 2 },
      { start:  40, numerator:  4, denominator: 4 }
    ],
    notes: [ 
      { start:  3, length:  3, pitch: 67, intensity: 127 },
      { start:  9, length:  3, pitch: 67, intensity: 127 },
      { start: 26, length: 14, pitch: 67, intensity: 127 },
      { start: 44, length:  4, pitch: 67, intensity: 127 },
    ]
  }
};

testData[11] = {
  title: `Ties`,
  description: `Notes longer than avilable note symbols length can be achieved \
  combining two or more through ties. Notes which surpass bars must be \
  splitted using ties. Rest aggregation does not need any tie. Following \
  score shows three tied notes, a rests set, two tied notes to surpass a bar.`,
  data: {
    notes: [
      { start: 0, length: 2+1/2+1/8, pitch: 67, intensity: 127 },
      { start: 3, length: 2, pitch: 67, intensity: 127 },
      { start: 7, length: 1, pitch: 67, intensity: 127 }
    ],
  }
};
