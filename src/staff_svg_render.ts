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

import {
  MIN_RESOLUTION, STEM_WIDTH, LINE_STROKE, COMPACT_SPACING
} from "./constants";

import {
  SVGNS, drawSVGPath, drawSVGText, createSVGGroupChild, setFade
} from './svg_tools';

import  {
  PATH_SCALE, NOTE_PATHS, REST_PATHS, CLEF_PATHS, ACCIDENTAL_PATHS,
  staffLinePath, extraLinePath, barPath, stemPath, singleFlagPath, 
  multiFlagPath, tiePath, dotPath
} from './svg_paths';

const SCALES = [ // Accidentals: 0=none, 1=sharp, 2=flat, 3=normal
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

const KEY_ACCIDENTALS = [
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

export interface NoteInfo {
  start: number; // Starting time, in quarter note quantities (float)
  length: number; // Note length, in quarter note quantities (float)
  pitch: number; // Note pitch according to MIDI standard
  intensity: number; // Note intensity according to MIDI velocity
}
export interface TempoInfo {
  start: number; 
  qpm: number;
}
export interface KeySignatureInfo {
  start: number; 
  key: number;
}
export interface TimeSignatureInfo {
  start: number; 
  numerator: number; 
  denominator: number;
}
export interface ScoreInfo {
  notes: NoteInfo[];
  tempos?: TempoInfo[];
  keySignatures?: KeySignatureInfo[];
  timeSignatures?: TimeSignatureInfo[];
}

export interface QNote {
  start: number; // In quarter note quantities (float)
  length: number; // In quarter note quantities (float)
  vSteps: number; // In score steps (int, 2 per staff line), vertically invert.
  accidental: number; // Kind: -1 = natural, 0 = none, 1 = accidental
  opacity: number; // from 0.0 (fully transparent) to 1.0 (fully opaque)
  pitch: number; // MIDI/Protobuf pitch needed to name SVG Group
  xHeadRight: number; // x position at the right of the note head to draw ties
  tiedFrom?: QNote; // Reference to previous tied note
  g?: SVGElement; // SVG Group to hold tied notes into
}

export interface MusicBlock {
    maxVStep: number;
    minVStep: number;
    restToNextLength: number;
    isBarBeginning: boolean;
    notes: QNote[];
}

/**
 * Note resolution in fractions of quarter. No note shorter than 1/16 of a 
 * quarter will be rendered. This limit equals to sixty-fourth notes. 
 */
export const MAX_QUARTER_DIVISION = 16; 

/**
 * Enumeration of different ways of horizontal score scrolling, like paginaged
 * (PAGE is default value), note by note (NOTE) or in packed chunks by doing 
 * scroll just on bar starting (BAR).
 */
export enum ScrollType {
  PAGE = 0,
  NOTE = 1,
  BAR = 2
}

/**
 * An interface for providing configurable properties to a StaffRender.
 * @param noteHeight The vertical height in pixels of a note.
 * @param noteSpacing Number of horizontal pixels between each note.
 * @param pixelsPerTimeStep The horizontal scale at which notes are drawn. The
 * bigger this value, the "wider" a note looks.
 * @param noteRGB The color (as an RGB comma separated string) of a note.
 * @param activeNoteRGB The color (as an RGB comma separated string) of an
 * active note being played.
 * @param defaultKey The musical key the score must use to adapt the score to 
 * the right accidentals. It can be overwritten with 
 * `ScoreInfo.keySignatures` value at time or step 0. If not assigned it 
 * will be asumed C key.
 * @param scrollType Sets scrolling to follow scoreplaying in different ways 
 * according to `ScrollType` enum values.
 */
export interface StaffRenderConfig {
  noteHeight?: number;
  noteSpacing?: number;
  pixelsPerTimeStep?: number;
  noteRGB?: string;
  activeNoteRGB?: string;
  defaultKey?: number;
  scrollType?: ScrollType;
}

/**
 * Displays a `ScoreInfo` as a staff on a given DIV. Staff is scaled to fit 
 * vertically `config.noteHeight` and note horizontal position can behave in 
 * two different ways: If `config.pixelsPerTimeStep` is greater than zero, 
 * horizontal position will be proportional to its starting time, allowing to 
 * pile several instances for different voices (parts). Otherwise, resulting 
 * staff will display notes in a compact form, using minimum horizontal space 
 * between musical symbols as regular paper staff does. 
 * 
 * Clef, key and time signature will be displayed at the leftmost side and the 
 * rest of the staff will scroll under this initial signature area accordingly.
 * In case of proportional note positioning, given it starts at pixel zero, the
 * signature area will blink meanwhile it collides with initial active notes.
 * Key and time signature changes will be shown accordingly through score.
 */
export class StaffSVGRender {
  public scoreInfo: ScoreInfo; // The actual music score data to be rendered
  private config: StaffRenderConfig; // How it has to be rendered
  private height: number; // Full score height (pixels)
  private width: number; // Full score width (pixels)
  private parentElement: HTMLElement; // Upper container
  private div: HTMLDivElement; // Overall staff container
  private staffSVG: SVGSVGElement; // Main staff drawing area 
  private staffG: SVGElement; // Staff container for vertical repositioning
  private linesG: SVGElement; // Acting as background layer 
  private musicG: SVGElement; // Acting as middle plane layer
  private signaturesG: SVGElement; // Acting as foreground layer
  private overlaySVG: SVGSVGElement; // Overlay signature drawing area
  private overlayG: SVGElement; // Overlay container for vertical repositioning
  private signaturesQuarters: number; // When to stop blinking (in quarters)
  private signaturesBlinking: boolean; // Signatures displaying mode switch 
  private scale: number; // General scale appliable to all SVG elements
  private vStepSize: number; // Vertical factor in pixels (2 vStep/staff line)
  private hStepSize: number; // Horizontal factor in pixels (1 hStep/time unit)
  private staffOffset: number; // Vertical SVG distance to middle staff line
  private clef: number; // MIDI pitch note at the 3rd line (G clef -> B = 71)
  private key: number; // Measured in  semitones (0 = C, 1 = C#, ... 11 = B)
  private lastBar: number; // Time when last bar started in quarters
  private barAccidentals: {[pitch: number]: number}; // Temporal accidentals
  private timeSignatureNumerator: number; // like 3 in 3/4
  private timeSignatureDenominator: number; // like 4 in 3/4
  private signaturesList: Array<{x: number; q: number}>; // x positions
  private signatureCurrent: number; // Current signature beginning x position
  private signatureNext: number; // Current signature end x position
  private initialRest: MusicBlock; // initial block to hold starting rest
  private musicBlockMap: Map<number, MusicBlock>; // Music sorted blocks
  private playingNotes: NoteInfo[]; // Highlited ones
  private scrollType: ScrollType; // Kind of scrolling if any
  private ticking: boolean; // Mutex to reduce scroll handling everhead
  private lastKnownScrollLeft: number; // Optimized scroll value
  private lastQ: number; // Last drawn block start time in quarters

  /**
   * `StaffSVGRender` constructor.
   *
   * @param score The `ScoreInfo` to be visualized.
   * @param div The element where the visualization should be displayed.
   * @param config Visualization configuration options.
   */
  constructor(
    score: ScoreInfo, 
    config: StaffRenderConfig,
    div: HTMLDivElement
  ) {
    this.scoreInfo = score;
    const defaultPixelsPerTimeStep = 30;
    this.config = {
      noteHeight: config.noteHeight || 6,
      noteSpacing: config.noteSpacing || 1,
      pixelsPerTimeStep: config.pixelsPerTimeStep || defaultPixelsPerTimeStep,
      noteRGB: config.noteRGB || '8, 41, 64',
      activeNoteRGB: config.activeNoteRGB || '240, 84, 119',
    };
    this.div = div;
    this.timeSignatureNumerator = 4;
    this.timeSignatureDenominator = 4;
    this.key = config.defaultKey || 0;
    this.scrollType = config.scrollType || ScrollType.PAGE;
    this.scale = this.config.noteHeight / PATH_SCALE;
    if (
      config.pixelsPerTimeStep === undefined || config.pixelsPerTimeStep <= 0
    ) { // Compact visualization as default
      this.config.pixelsPerTimeStep = 0;
      this.config.noteSpacing = COMPACT_SPACING * this.scale;
    }
    this.clear(); // This will complete rest of member values initialization.
    this.redraw();
  }

  /**
   * Clears and resets the visualizer object for further redraws from scratch.
   */
  public clear() {
    // Div overall container (emptying previous existing SVG elements)
    while (this.div.lastChild) { this.div.removeChild(this.div.lastChild); }
    this.div.style.overflow = 'visible';
    this.div.style.position = 'relative';
    // Signatures overlay
    this.overlaySVG = document.createElementNS(SVGNS, 'svg');
    this.overlaySVG.style.position = 'absolute';
    this.div.appendChild(this.overlaySVG);
    this.overlayG = createSVGGroupChild(this.overlaySVG, 'overlay');
    this.signaturesBlinking = false;
    this.signaturesQuarters = 0;
    // Inner scrolleable Container
    this.parentElement = document.createElement('div');
    this.parentElement.style.overflow = 'auto';
    this.div.appendChild(this.parentElement);
    this.ticking = false;
    this.lastKnownScrollLeft = 0;
    this.parentElement.addEventListener('scroll', this.handleScrollEvent);
    // Staff drawing area
    this.staffSVG = document.createElementNS(SVGNS, 'svg');
    this.parentElement.appendChild(this.staffSVG);
    this.staffG = createSVGGroupChild(this.staffSVG, 'staff');
    // Background lines
    this.linesG = createSVGGroupChild(this.staffSVG, 'lines');
    this.setStroke(this.linesG);
    this.staffG.appendChild(this.linesG);
    // Middle plane symbols
    this.musicG = createSVGGroupChild(this.staffSVG, 'music');
    this.setFill(this.musicG);
    this.setStroke(this.musicG, 0);
    this.staffG.appendChild(this.musicG);
    // Foreground signatures
    this.signaturesG = createSVGGroupChild(this.staffSVG, 'signatures');
    this.staffG.appendChild(this.signaturesG);
    // Clef deduction: Average pitch under C4 -> F clef, otherwise G clef
    let pitchSum = 0;
    let countSum = 0;
    this.scoreInfo.notes.forEach(
      note => {
        pitchSum += note.pitch;
        ++countSum;
      }
    );
    const averagePitch = pitchSum / countSum;
    this.clef = averagePitch < 60 ? 50 : 71; // Numbers are MIDI pitch values
    // Signatures values
    this.signaturesList = [{x: 0, q: 0}];
    this.signatureCurrent = 0;
    this.signatureNext = 0; // To reset blinking if scrolled
    this.changeKeySignatureIfNeeded(0);
    this.changeTimeSignatureIfNeeded(0);
    // General visual references
    this.vStepSize = this.config.noteHeight / 2;
    this.hStepSize = this.config.pixelsPerTimeStep;
    this.staffOffset = 0;
    this.height = 0;    
    this.width = 0;    
    // Processed notes storage and reference
    this.musicBlockMap = new Map<number, MusicBlock>();
    this.playingNotes = [];
    this.lastBar = 0;
    this.barAccidentals = {};
    this.lastQ = -1;
  }

  private isPaintingActiveNote(
      note: NoteInfo, playedNote: NoteInfo): boolean {
    // A note is active if it's literally the same as the note we are
    // playing (aka activeNote), or if it overlaps because it's a held note.
    const isPlayedNote =
        note.start === playedNote.start;
    const heldDownDuringPlayedNote =
        note.start <= playedNote.start &&
        note.start + note.length >= playedNote.start + playedNote.length;
    return isPlayedNote || heldDownDuringPlayedNote;
  }

  /**
   * Redraws the entire `scoreInfo` in a staff if no `activeNote` is given,
   * highlighting on and off the appropriate notes otherwise. Should the 
   * `scoreInfo` had changed adding more notes at the end, calling this
   * method again would complete the redrawing from the very last note it was
   * drawn, maintaining the active note and the scroll position as they were. 
   * This is handy for incremental compositions. Given the complexity of 
   * adaption to a modified score, modifyied notes previously drawn will be
   * ignored (you can always `clear()` and `redraw()` for a full redraw). 
   * 
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color and there won't be an actual redrawing, but a 
   * re-colouring of the involved note heads, accidentals, dots and ties 
   * (activated and de-activated ones). Otherwise, all musical symbols which 
   * were not processed yet will be drawn to complete the score.
   * @param scrollIntoView (Optional) If specified and the active note to be 
   * highlited is not visualized in the container DIV, the later will be 
   * scrolled so that the note is viewed in the right place. This can be 
   * altered by `StaffRenderConfig.scrollType`.
   * @returns The x position of the highlighted active note relative to the 
   * beginning of the SVG, or -1 if there wasn't any given active note. Useful
   * for automatically advancing the visualization if needed.
   */
  public redraw(
    activeNote?: NoteInfo, 
    scrollIntoView?: boolean 
  ): number {
    let activeNotePosition = -1;
    const isCompact = (this.config.pixelsPerTimeStep === 0);
    if (activeNote) { // Given activeNote means highliting it
      const keepOnPlayingNotes: NoteInfo[] = [];
      this.playingNotes.forEach( // Revert non playing notes highliting
        note => {
          if (this.isPaintingActiveNote(note, activeNote)) {
            keepOnPlayingNotes.push(note);
          }
          else {
            this.highlightElement(this.getGroup(note), false);
          }
        }
      );
      this.playingNotes = keepOnPlayingNotes;
      const g = this.getGroup(activeNote);
      if (g) {
        this.playingNotes.push(activeNote); // Store to revert highlight later
        this.highlightElement(g, true);
        activeNotePosition = g.getBoundingClientRect().left - 
          this.staffSVG.getBoundingClientRect().left;
        const quarters = activeNote.start;
        const isBarBeginning = g.getAttribute('data-is-bar-beginning');
        if (this.scrollType !== ScrollType.BAR || isBarBeginning) {
          this.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
        }
        if (
          !isCompact && this.signaturesBlinking &&
          quarters >= this.signaturesQuarters
        ) {
          this.signaturesBlinking = false;
          setFade(this.overlayG, this.signaturesBlinking);
        }
      }
    }
    else { // No activeNote given means redrawing it all from scratch
      this.setDetails();
      const isFirstRedraw = (this.lastQ === -1);
      let x = 0;
      let width = 0;
      if (isFirstRedraw) {
        // Clef+Key+Time signatures
        width = this.drawSignatures(this.overlayG, x, true, true, true);
        if (isCompact) {
          this.width = 0;
          // First padding if compacted. Following are placed after drawings
          width += this.config.noteSpacing;
        }
      }
      else {
        x = this.width;
      }
      width += this.drawRests(this.initialRest, x + width);
      this.musicBlockMap.forEach ( // Music Blocks
        (musicBlock, quarters) => {
          if (quarters > this.lastQ) {
            if (!isCompact) {
              x = this.quartersToTime(quarters) * this.hStepSize;
            } 
            width += this.drawMusicBlock(musicBlock, x + width);
            this.lastQ = quarters;
          }
        }
      );
      const svgRect = this.staffSVG.getBoundingClientRect();
      const gRect = this.musicG.getBoundingClientRect();
      this.updateVerticalBoundaries( // Vertical resizing
        gRect.top - svgRect.top, gRect.bottom - svgRect.top
      );
      if (isCompact) { // Compact staff horizontal resizing
        this.width += width;
      }
      else { // Proportional staff horizontal resizing
        const lastBlock = this.musicBlockMap.get(this.lastQ);
        const endTime = 
          this.quartersToTime(this.lastQ + lastBlock.notes[0].length);
        this.width = endTime * this.config.pixelsPerTimeStep;
      }
      this.staffSVG.setAttributeNS(null, 'width', `${this.width}`);
      this.redrawStaff(this.linesG, 0, this.width);
    }
    return activeNotePosition;
  }

  private drawMusicBlock(musicBlock: MusicBlock, x: number): number {
    const quarter = musicBlock.notes[0].start;
    // Preceding bar
    let width = this.drawBarIfNeeded(quarter, x);
    // Signature change analysis and possible drawing
    width += this.drawSignaturesIfNeeded(quarter, x + width);
    // Kind of note selection (all block notes have same aspect, some are tied)
    let headIndex = 0;
    for (let i = 4; i >= MIN_RESOLUTION && !headIndex; i /= 2) {
      if (i <= musicBlock.notes[0].length) {
        headIndex = i;
      }
    }
    // Fallback for notes shorter than MIN_RESOLUTION. It will be warned on 
    // console and MIN_RESOLUTION note will be drawn.
    if (headIndex === 0) {
      const noteLength = musicBlock.notes[0].length === 0 ? '[infinite]' : 
        `${4 / musicBlock.notes[0].length}`;
      console.warn(
        ' StaffRender ', 'background:orange; color:white', 
        'StaffRender does not handle notes shorther than ' +
        `1/${4 / MIN_RESOLUTION}th, and this score tries to draw a ` +
        `1/${noteLength}th. Shortest possible note will be drawn instead.`
      );
      headIndex = MIN_RESOLUTION;
    }
    const noteHead = NOTE_PATHS[headIndex];
    // Stem placeholder created beforehand as a lower layer
    let stemG: SVGElement;
    if (noteHead.stemAnchor) {
      stemG = createSVGGroupChild(this.musicG, 'stem');
    }
    // Polyphonic block notes pitch part (everything but shared stem and flags)
    musicBlock.notes.forEach(
      note => {
        const y = note.vSteps * this.vStepSize;
        // Over and under staff extra lines
        const start = 2 * (
          note.vSteps>0 ? Math.floor(note.vSteps/2) : Math.ceil(note.vSteps/2)
        );
        const delta = note.vSteps > 0 ? -2 : 2;
        for (let i = start; Math.abs(i) > 4; i += delta) {
          drawSVGPath(this.linesG, extraLinePath, 
            x + width, i * this.vStepSize, this.scale, 1);
        }
        // Highlightable overall grouping placeholder
        note.g = (note.tiedFrom) ? note.tiedFrom.g : 
          createSVGGroupChild(this.musicG, `${note.start}-${note.pitch}`);
        if (musicBlock.isBarBeginning) {
          note.g.setAttribute('data-is-bar-beginning', 'true');
        }
        // Preceding Tie
        if (note.tiedFrom) {
          const tieWidth = x + width - note.tiedFrom.xHeadRight;
          drawSVGPath(
            note.g, tiePath, note.tiedFrom.xHeadRight, y, tieWidth/PATH_SCALE, 
            this.scale * (note.vSteps < 0 ? -1 : 1), note.opacity
          );
        }
        // Note head
        drawSVGPath(
          note.g, noteHead.path, 
          x + width, y, this.scale, this.scale, note.opacity
        );
        note.xHeadRight = x + width + noteHead.width*this.scale;
        // Dotted note
        if (headIndex * 1.5 <= note.length) {
          drawSVGPath(
            note.g, dotPath, 
            x + width + noteHead.width*this.scale + this.vStepSize/2, 
            y - this.vStepSize/2, this.scale, this.scale, note.opacity
          );
        }
        // Accidentals
        if (note.accidental !== 0) {
          drawSVGPath(
            note.g, ACCIDENTAL_PATHS[note.accidental],
            x + width, y, this.scale, this.scale, note.opacity
          );
        }
      }
    );
    if (noteHead.stemAnchor) { // There is a stem and potentially some flags
      let xStem = x + width;
      let y1: number, y2: number;
      const anchor = noteHead.stemAnchor*this.scale;
      const downwards = musicBlock.minVStep + musicBlock.maxVStep < 0;
      const multiple = (noteHead.flags > 2) ? 2 * (noteHead.flags-2) : 0;
      if (downwards) { // Downwards
        y1 = musicBlock.maxVStep * this.vStepSize - anchor;
        y2 = (musicBlock.minVStep + 7 + multiple) * this.vStepSize;
      }
      else { // Upwards
        xStem += (noteHead.width - STEM_WIDTH) * this.scale;
        y1 = musicBlock.minVStep * this.vStepSize + anchor;
        y2 = (musicBlock.maxVStep - 7 - multiple) * this.vStepSize;
      }
      drawSVGPath(
        stemG, stemPath, xStem, y1, this.scale, (y2 - y1) / PATH_SCALE
      );
      if (noteHead.flags === 1) { // Single flag
        drawSVGPath(
          stemG, singleFlagPath, xStem, y2, 
          this.scale, this.scale * (downwards ? -1 : 1), 1
        );
      }
      else if (noteHead.flags > 1) { // Multiple flag
        for (let i = 0; i < noteHead.flags; ++i) {
          drawSVGPath(
            stemG, multiFlagPath, xStem, y2, 
            this.scale, this.scale * (downwards ? -1 : 1), 1
          );
          y2 += (downwards ? -2 : 2) * this.vStepSize;
        }
      }
    }
    if (this.config.pixelsPerTimeStep === 0) { // Compact visualization
      width += noteHead.width * this.scale; // Head size
      if (stemG) {
        width += stemG.getBoundingClientRect().width; 
      }
      width += this.config.noteSpacing; // Post-spacing
    }
    width += this.drawRests(musicBlock, x + width);
    return width;
  }

  private drawBarIfNeeded(quarters: number, x: number): number {
    let width = 0;
    const nextBar = this.lastBar + this.getBarLength();
    if (quarters !== 0 && quarters >= nextBar) { // 1st bar skipped
      if (this.config.pixelsPerTimeStep > 0) { // Proportional visualization
        x -= this.config.noteSpacing; // Negative to avoid touching note head
      }
      else { // Compact visualization
        width = this.config.noteSpacing;
      }
      drawSVGPath(this.linesG, barPath, x, 0, 1, this.scale);
      this.lastBar = nextBar;
    }
    return width;
  }

  private drawRests(musicBlock: MusicBlock, x: number): number {
    let width = 0;
    let remainingLength = musicBlock.restToNextLength;
    if (remainingLength) {
      if (this.config.pixelsPerTimeStep > 0) {
        x += this.quartersToTime(musicBlock.notes[0].length) * this.hStepSize;
      }
      // Find a possible rest bar split
      let quarters = musicBlock.notes[0].start + musicBlock.notes[0].length;
      let lengthAfterNextBar = 0;
      const quartersToNextBar = this.lastBar + this.getBarLength() - quarters;
      if (remainingLength > quartersToNextBar) {
        lengthAfterNextBar = remainingLength - quartersToNextBar;
        remainingLength = quartersToNextBar;
      }
      let maxRest: number;
      for ( // Set the minimum viable rest in the bar
        maxRest = 4; 
        maxRest > this.getBarLength() && maxRest >= MIN_RESOLUTION;
        maxRest /= 2
      ) {}
      let l = maxRest;
      // Draw rests in a lowering size progression to fit the gap
      while ((remainingLength || lengthAfterNextBar) && l >= MIN_RESOLUTION) {
        if (l <= remainingLength) { // A rest of length l must be drawn
          width += this.drawBarIfNeeded(quarters, x + width);
          // Signature change analysis and possible drawing
          width += this.drawSignaturesIfNeeded(quarters, x + width);
          const rest = drawSVGPath(
            this.musicG, REST_PATHS[l], x + width, 0, this.scale, this.scale
          );
          if (this.config.pixelsPerTimeStep > 0) { // Proportional visualization
            x += this.quartersToTime(l) * this.hStepSize;
          }
          else { // Compact visualization
            width += rest.getBoundingClientRect().width;
            width += this.config.noteSpacing; // Post-spacing
          }
          quarters += l;
          remainingLength -= l;
        }
        if (lengthAfterNextBar && remainingLength <= 0) { // Swap the split
          const nextBarLength = this.getBarLength();
          if (lengthAfterNextBar > nextBarLength) {
            remainingLength =  nextBarLength;
            lengthAfterNextBar = lengthAfterNextBar - nextBarLength;
          }
          else {
            remainingLength =  lengthAfterNextBar;
            lengthAfterNextBar = 0;
          }
          for ( // Set the minimum viable rest in the starting bar
            maxRest = 4; 
            maxRest > this.getBarLength() && maxRest >= MIN_RESOLUTION;
            maxRest /= 2
          ) {}
          l = maxRest;
        }
        if (remainingLength < l) { // Same rest size won't fit next iteration
          l /= 2;
        }
      }
    }
    return width;
  }

  private redrawStaff(e: SVGElement, x: number, width: number) {
    let staff = e.querySelector('g[data-id="staff-five-lines"]') as SVGElement;
    if (staff) { // Already drawn
      staff.setAttributeNS(
        null, 'transform', `scale(${width/PATH_SCALE}, 1)`
      );
    }
    else {
      staff = createSVGGroupChild(e, 'staff-five-lines');
      const y = 0;
      for (let i = -4; i <= 4; i += 2) { // Draw five line staff
        drawSVGPath(
          staff, staffLinePath, x, y + i * this.vStepSize, width/PATH_SCALE, 1
        );
      }
    }
    return staff;
  }

  private clearSignatureOverlay() {
    while (this.overlayG.lastChild) {
      this.overlayG.removeChild(this.overlayG.lastChild);
    }
  }

  private drawSignaturesIfNeeded(quarter: number, x: number) {
    let width = 0;
    const keyChanged = this.changeKeySignatureIfNeeded(quarter);
    const timeChanged = this.changeTimeSignatureIfNeeded(quarter);
    if (keyChanged || timeChanged) {
      const clefSpacing = COMPACT_SPACING * this.scale * 
        (this.config.pixelsPerTimeStep > 0 ? 3 : 2);
      this.signaturesList.push({x: x - clefSpacing , q: quarter});
      if (this.signatureNext === null) {
        this.signatureNext = x;
      }
      const signatures = quarter > 0 ?
        createSVGGroupChild(this.signaturesG, 'signatures') : this.overlayG;
      width += this.drawSignatures(
        signatures, x + width, false, keyChanged, timeChanged
      );
    }
    return this.config.pixelsPerTimeStep === 0 ? width : 0;
  }

  private drawSignatures(
    e: SVGElement, x: number, 
    drawClef: boolean, drawKey: boolean, drawTime: boolean
  ): number {
    const spacing = COMPACT_SPACING * this.scale;
    let width = spacing;
    let background: SVGRectElement;
    const drawBackground = 
      e === this.overlayG || this.config.pixelsPerTimeStep > 0;

    if (drawBackground) {
      background = document.createElementNS(SVGNS, 'rect');
      background.setAttributeNS(null, 'x', `${x}`);
      background.setAttributeNS(null, 'y', '0');
      background.setAttributeNS(null, 'width', '1'); // 1 to avoid distortions
      background.setAttributeNS(null, 'height', '1'); // 1 to avoid distortions
      background.setAttribute('data-id', 'background');
      e.appendChild(background);
      const upperStyle = 
        document.defaultView.getComputedStyle(this.div.parentElement);
      background.setAttributeNS(
        null, 'fill', upperStyle.getPropertyValue('background-color')
      );
    }
    if (drawClef) {
      const clef = drawSVGPath(
        e, CLEF_PATHS[this.clef].path, x + width, 0, this.scale, this.scale
      );
      this.setFill(clef);
      width += 3 * spacing;
    }
    if (drawKey) {
      const accidental = KEY_ACCIDENTALS[this.key].accidental;
      const offset = (this.clef === 71) ? 0 : 14; // Measured in vStep
      KEY_ACCIDENTALS[this.key].pitches.forEach(
        pitch => {
          const steps = this.getPitchDetails(pitch).vSteps;
          const p = drawSVGPath(e, ACCIDENTAL_PATHS[accidental], 
            x + width, (offset + steps) * this.vStepSize, 
            this.scale, this.scale);
          this.setFill(p);
          width += p.getBoundingClientRect().width;
        }
      );
    }
    if (drawTime) { // 0.5 and 2.85 are empirical Times font values
      const timeKey = createSVGGroupChild(e, 'time-key');
      const fontSize = `${2.85*this.config.noteHeight}px`;
      drawSVGText(
        timeKey, `${this.timeSignatureNumerator}`, 
        x + width, - 0.5, fontSize, true
      );
      drawSVGText(
        timeKey, `${this.timeSignatureDenominator}`, 
        x + width, 4 * this.vStepSize - 0.5, fontSize, true
      );
      this.setFill(timeKey);
      width += timeKey.getBoundingClientRect().width + spacing;
    }    
    const staff = this.redrawStaff(e, x, width);
    this.setStroke(staff);
    // Vertical and horizontal resizing
    const divRect = this.div.getBoundingClientRect();
    const eRect = e.getBoundingClientRect();
    this.updateVerticalBoundaries(
      eRect.top - divRect.top, eRect.bottom - divRect.top
    );
    if (drawBackground) { // Late redimension after foreground drawing
      background.setAttributeNS(null, 'y', `${-this.staffOffset}`);
      background.setAttributeNS(null, 'height', `${this.height}`);
      background.setAttributeNS(null, 'width', `${width}`);
    }
    // Overlapping Gradient only applies in overlay
    if (e === this.overlayG) {
      this.overlaySVG.setAttributeNS(null, 'width', `${width + 5}`);
      for (let i = 0; i < 5; ++i) {
        const grad = drawSVGPath(
          e, stemPath, width + i, i * i - this.staffOffset, 1 / STEM_WIDTH, 
          (this.height - 2 * i * i) / PATH_SCALE, 
          (i - 5) * (i - 5) * 2 / PATH_SCALE
        );
        this.setFill(grad);
      }
    }
    // Blinking set up and return
    if (this.config.pixelsPerTimeStep > 0) { // Proportional visualization
      const firstOverlay = this.signaturesQuarters === 0;
      if (firstOverlay) { // First time overlay is drawn
        this.signaturesQuarters = this.timeToQuarters(width/this.hStepSize);
      }
      if (firstOverlay || x > 0) { // Excludes second overlay drawings
        this.signaturesBlinking = true;
        setFade(e, this.signaturesBlinking);
      }
      return 0;
    } 
    else { // Compact visualization
      return width;
    }
  }

  private changeKeySignatureIfNeeded(quarter: number): boolean {
    if (this.scoreInfo.keySignatures) {
      let candidateKey = this.key;
      for (let i = 0; i < this.scoreInfo.keySignatures.length; ++i) {
        if (this.scoreInfo.keySignatures[i].start <= quarter) {
          candidateKey = this.scoreInfo.keySignatures[i].key;
        }
        else {
          break;
        }
      }
      if (candidateKey !== this.key) {
        this.key = candidateKey;
        return true;
      }
    }
    return false;
  } 

  private changeTimeSignatureIfNeeded(quarter: number): boolean {
    if (this.scoreInfo.timeSignatures) {
      let altNumerator = this.timeSignatureNumerator;
      let altDenominator = this.timeSignatureDenominator;
      for (let i = 0; i < this.scoreInfo.timeSignatures.length; ++i) {
        if (this.scoreInfo.timeSignatures[i].start <= quarter) {
          altNumerator = this.scoreInfo.timeSignatures[i].numerator;
          altDenominator = this.scoreInfo.timeSignatures[i].denominator;
        }
        else {
          break;
        }
      }
      if (
        altNumerator !== this.timeSignatureNumerator ||
        altDenominator !== this.timeSignatureDenominator
      ) {
        this.timeSignatureNumerator = altNumerator;
        this.timeSignatureDenominator = altDenominator;
        return true;
      }
    }
    return false;
  }

//    current  x     next   <= current & next include the starting point
//          |  |     |
// [0      )[1      )[2     )null
  private changeAndDrawSignaturesIfNeeded(x: number) {
    let quarter: number;
    if (
      x < this.signatureCurrent || 
      (this.signatureNext !== null && this.signatureNext <= x)
    ) {
      quarter = this.signaturesList[0].q;
      this.signatureNext = null;
      for (let i = 0; i < this.signaturesList.length; ++i) {
        if (x < this.signaturesList[i].x) {
          this.signatureNext = this.signaturesList[i].x;
          break;
        }
        else {
          this.signatureCurrent = this.signaturesList[i].x;
          quarter = this.signaturesList[i].q;
        }
      }
    }

    if (quarter !== undefined) {
      const key = this.key;
      const timeSignatureNumerator = this.timeSignatureNumerator;
      const timeSignatureDenominator = this.timeSignatureDenominator;
      this.changeKeySignatureIfNeeded(quarter);
      this.changeTimeSignatureIfNeeded(quarter);
      this.clearSignatureOverlay();
      this.drawSignatures(this.overlayG, 0, true, true, true);
      this.key = key;
      this.timeSignatureNumerator = timeSignatureNumerator;
      this.timeSignatureDenominator = timeSignatureDenominator;
    }

    if (this.config.pixelsPerTimeStep > 0 && x === 0) {
      this.signatureNext = 0; // To reset blinking if scrolled
      this.signaturesBlinking = true;
      setFade(this.overlayG, this.signaturesBlinking);
    }
  }

  private getBarLength() {
    return this.timeSignatureNumerator * 4 / this.timeSignatureDenominator;
  }
  private handleScrollEvent = (_event: UIEvent) => {
    this.lastKnownScrollLeft = this.parentElement.scrollLeft;
    if (!this.ticking) {
      window.requestAnimationFrame(
        () => {
          this.changeAndDrawSignaturesIfNeeded(this.lastKnownScrollLeft);
          this.ticking = false;
        }
      );
    }
    this.ticking = true;
  };

  private scrollIntoViewIfNeeded(
    scrollIntoView: boolean, activeNotePosition: number) {
    if (scrollIntoView) {
      if (this.scrollType === ScrollType.PAGE) {
        // See if we need to scroll the container.
        const containerWidth = this.parentElement.getBoundingClientRect().width;
        if (activeNotePosition >
            (this.parentElement.scrollLeft + containerWidth)) {
          this.parentElement.scrollLeft = activeNotePosition - 20;
        }
      } 
      else { // Valid for both ScrollType.NOTE & ScrollType.BAR
        const containerWidth = this.parentElement.getBoundingClientRect().width;
        this.parentElement.scrollLeft = 
          activeNotePosition - containerWidth * 0.5;
      }
    }
  }

  private updateVerticalBoundaries(top: number, bottom: number) {
    let newHeight = 0;
    if (top < 0) {
      this.staffOffset -= top;
      const translation = `translate(0, ${this.staffOffset})`;
      this.overlayG.setAttributeNS(null, 'transform', translation);
      this.staffG.setAttributeNS(null, 'transform', translation);
      newHeight = this.height - top;
    }
    newHeight = Math.max(newHeight, bottom - top);
    if (newHeight > this.height) {
      this.height = newHeight;
      this.overlaySVG.setAttributeNS(null, 'height', `${this.height}`);
      this.staffSVG.setAttributeNS(null, 'height', `${this.height}`);
      const els = this.div.querySelectorAll('rect[data-id="background"]');
      for (let i = 0; i < els.length; ++i) {
        const el = els[i];
        el.setAttributeNS(null, 'y', `${-this.staffOffset}`);
        el.setAttributeNS(null, 'height', `${this.height}`);
      }  
    }
  }

  private setFill(e: SVGElement, isActive = false) {
    e.setAttributeNS(null, 'fill', this.getColor(isActive));
  }

  private setStroke(e: SVGElement, strokeWidth=LINE_STROKE, isActive=false) {
    e.setAttributeNS(null, 'stroke', this.getColor(isActive));
    e.setAttributeNS(null, 'stroke-width', `${strokeWidth}`);
  }

  private getColor(isActive: boolean): string {
    return `rgb(${isActive ? this.config.activeNoteRGB : this.config.noteRGB})`;
  }

  private getOpacity(noteVelocity?: number): number {
    const opacityBaseline = 0.2;  // Shift all the opacities up a little.
    return noteVelocity ? 
      (noteVelocity / 127) * (1 - opacityBaseline) + opacityBaseline : 1;
  }

  private getGroup(note: NoteInfo): SVGElement {
    const quarters = note.start;
    const pitch = note.pitch;
    return this.staffSVG.querySelector(`g[data-id="${quarters}-${pitch}"]`);
  }

  private highlightElement(e: SVGElement, isActive: boolean) {
    e.setAttribute('fill', this.getColor(isActive));
    e.setAttribute('stroke', this.getColor(isActive));
  }

  private getBarBeginnings(): Set<number> {
    const barBeginnings = new Set<number>();
    let lastQ = 0;
    this.scoreInfo.notes.forEach(
      n => {
        if (n.start + n.length > lastQ) {
          lastQ = n.start + n.length;
        }
      }
    );
    const timeSignatures = (this.scoreInfo.timeSignatures) ?
      this.scoreInfo.timeSignatures.slice(0) : 
      [{start: 0, numerator: 4, denominator: 4}];
    timeSignatures.sort((x, y) => x.start - y.start);
    let q = 0;
    for (let i = 0; i < timeSignatures.length; ++i) {
      const signatureEnd = (i === timeSignatures.length - 1) ?
        lastQ : timeSignatures[i].start;
      const qPerBar = 
        timeSignatures[i].numerator * 4 / timeSignatures[i].denominator;
      for (; q < signatureEnd; q += qPerBar) {
        barBeginnings.add(q);
      }
    }
    return barBeginnings;
  }
  
  private quartersToTime(quarters: number): number {
    return quarters / this.scoreInfo.tempos[0].qpm * 60;
  }

  private timeToQuarters(time: number): number {
    return time * this.scoreInfo.tempos[0].qpm / 60;
  }

  private setDetails() {
    let blocks = new Map<number, QNote[]>();
    const barBeginnings = this.getBarBeginnings();
    const splites = new Set<number>(barBeginnings); // Bars = split points
    // First pass to translate all notes to quarters
    const sortedNotes = this.scoreInfo.notes.slice().sort(
      (x, y) => x.start - y.start
    );
    sortedNotes.forEach( 
      note => {
        const qNote = this.getQNote(note);
        splites.add(qNote.start);
        splites.add(qNote.start + qNote.length);
        if (blocks.has(qNote.start)) {
          blocks.get(qNote.start).push(qNote);
        }
        else {
          blocks.set(qNote.start, [qNote]);
        }
      }
    );
    // Second pass to apply all splites to the right blocks
    const sortedSplites = Array.from(splites).sort((x, y) => x - y);
    sortedSplites.forEach(
      split => {
        const remains: QNote[] = [];
        blocks.forEach(
          block => {
            block.forEach(
              qNote => {
                const remainQNote = this.splitQNote(qNote, split);
                if (remainQNote) { remains.push(remainQNote); }
              }
            );
          }
        );
        remains.forEach(
          qNote => {
            if (blocks.has(qNote.start)) {
              blocks.get(qNote.start).push(qNote);
            }
            else {
              blocks.set(qNote.start, [qNote]);
            }
          }
        );
      }
    );
    blocks = new Map(Array.from(blocks).sort((x, y) => x[0] - y[0]));
    // Third pass to fill vertical step, accidentals, min/max values and rests.
    const initialKey = this.key;
    let lastMusicBlock: MusicBlock = null;
    let lastBlockEnd = 0;
    const it = barBeginnings[Symbol.iterator]();
    let currentBar = it.next();
    blocks.forEach(
      (block: QNote[], quarters: number) => {
        const musicBlock: MusicBlock = {
          maxVStep: Number.MAX_SAFE_INTEGER,
          minVStep: Number.MIN_SAFE_INTEGER, 
          restToNextLength: 0,
          isBarBeginning: false,
          notes: []
        };
        this.changeKeySignatureIfNeeded(quarters);
        const value: number = currentBar.value;
        const currentBarEnd = value + this.getBarLength();
        if (!currentBar.done && quarters >= currentBarEnd) {
          currentBar = it.next();
          this.barAccidentals = {}; // Reset bar accidentals
          musicBlock.isBarBeginning = true;
        }
        block.forEach(
          qNote => {
            this.analyzePitch(qNote, quarters);
            musicBlock.minVStep = 
              Math.max(qNote.vSteps, musicBlock.minVStep);
            musicBlock.maxVStep = 
              Math.min(qNote.vSteps, musicBlock.maxVStep);
            musicBlock.notes.push(qNote);  
          }
        );
        if (lastMusicBlock) { // Rest length from last block to this one
          lastMusicBlock.restToNextLength = quarters - lastBlockEnd;
        }
        this.musicBlockMap.set(quarters, musicBlock);
        lastMusicBlock = musicBlock;
        lastBlockEnd = quarters + musicBlock.notes[0].length;
      }
    );
    this.initialRest = {
      maxVStep: 0,
      minVStep: 0, 
      restToNextLength: 
        this.musicBlockMap.values().next().value.notes[0].start,
      isBarBeginning: true,
      notes: [
        {
          start: 0, 
          length:0, 
          vSteps: 0, 
          accidental: 0, 
          opacity: 0, 
          pitch: 0, 
          xHeadRight: 0
        }
      ]
    };
    this.key = initialKey;
  }

  private getQNote(note: NoteInfo): QNote {
    return {
      start: note.start,
      length: note.length,
      vSteps: 0, // Delayed assignation till analyzePitch() call
      accidental: 0, // Delayed assignation till analyzePitch() call
      opacity: this.getOpacity(note.intensity),
      pitch: note.pitch,
      xHeadRight: 0
    };
  }

  private splitQNote(qNote: QNote, quarters: number): QNote {
    const remainLength = (qNote.start + qNote.length) - quarters;
    if (quarters > qNote.start && remainLength > 0) {
      qNote.length -= remainLength;
      return {
        start: quarters,
        length: remainLength,
        vSteps: qNote.vSteps,
        accidental: qNote.accidental,
        opacity: qNote.opacity,
        pitch: qNote.pitch,
        xHeadRight: 0,
        tiedFrom: qNote
      };
    }
    else {
      return null;
    }
  }

  private analyzePitch(qNote: QNote, quarters: number) {
    const pitchDetails = this.getPitchDetails(qNote.pitch);
    if (pitchDetails.vSteps in this.barAccidentals) { // Previous occurrence
      if (
        pitchDetails.accidental === this.barAccidentals[pitchDetails.vSteps]
      ) {
        pitchDetails.accidental = 0; // Ignore repetitions
      }
      else { // Replace with the new one
        if (this.barAccidentals[pitchDetails.vSteps] === 3) {
          // If changing from normal accidental, force key accidental
          pitchDetails.accidental = pitchDetails.keyAccidental;
        }
        else if (pitchDetails.accidental === 0) {
          // Otherwise, changing to no accidental, force normal
          pitchDetails.accidental = 3;
        }
        this.barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
      }
    }
    else { // Register new occurrence
      if (qNote.tiedFrom) { // Unless it is a tied note (even after bar reset)
        pitchDetails.accidental = 0; // Tied notes use the inital accidental
      }
      this.barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
    }
    qNote.vSteps = pitchDetails.vSteps;
    qNote.accidental = pitchDetails.accidental;
  }

  private getPitchDetails(notePitch: number)
  : {vSteps: number, accidental: number, keyAccidental: number} {
    const semitones = notePitch - 60;
    const octave = Math.floor(semitones / 12);
    const reminderSemitones = semitones - 12 * octave;
    const steps = SCALES[this.key].steps[reminderSemitones];
    const offset = (this.clef === 71) ? 6 : -6;
    const noteInKey = KEY_ACCIDENTALS[this.key].accidental === 1 ?
      69 + (reminderSemitones + 3) % 12 : 64 + (reminderSemitones + 8) % 12;
    return {
      vSteps: offset - 7 * octave + steps, 
      accidental: SCALES[this.key].accidental[reminderSemitones],
      keyAccidental: 
        KEY_ACCIDENTALS[this.key].pitches.indexOf(noteInKey) > -1 ?
          KEY_ACCIDENTALS[this.key].accidental : 0
    };
  }
}