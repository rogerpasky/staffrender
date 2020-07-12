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
  SVGNS, drawSVGPath, drawSVGText, createSVGGroupChild, setFade, setFill,
  setStroke, highlightElement
} from './svg_tools';

import  {
  PATH_SCALE, NOTE_PATHS, REST_PATHS, CLEF_PATHS, ACCIDENTAL_PATHS,
  staffLinePath, extraLinePath, barPath, stemPath, singleFlagPath, 
  multiFlagPath, tiePath, dotPath
} from './svg_paths';

import {
  NoteInfo, StaffInfo, StaffBlock, getNoteDetails, getBarLength, 
  guessClef, keySignatureAtQ, timeSignatureAtQ, KEY_ACCIDENTALS, 
  TimeSignatureInfo, StaffNote, StaffDefaults, StaffModel
} from './staff_model';

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
  /** 
   * Paginated horizontal scrolling, advancing the scroll to next page once a
   * out of screen note is highlited, considering each page what horizontally 
   * fits on one screen. This is the default value.
   */
  PAGE = 0,
  /**
   * Note by note horizontal scrolling, advancing the scroll to center on 
   * screen every new highlighted note.
   */
  NOTE = 1,
  /**
   * Per bar horizontal scrolling, advancing the scroll to center the beginning
   * of a new starting bar once its first note is highlighted.
   */
  BAR = 2
}

/**
 * An interface for providing configurable properties to a StaffRender.
 */
export interface StaffRenderConfig {
  /** The vertical height in pixels of a note */
  noteHeight?: number;
  /** Number of horizontal pixels between each note */
  noteSpacing?: number;
  /** 
   * The horizontal scale at which notes are drawn (the bigger this value, 
   * the "wider" a note looks)
   */
  pixelsPerTimeStep?: number;
  /** The color (as an RGB comma separated string) of a non played note */
  noteRGB?: string;
  /** 
   * The color (as an RGB comma separated string) of an active note being 
   * played
   */
  activeNoteRGB?: string;
  /**
   * The musical key the score must use to adapt the score to the right 
   * accidentals. It can be overwritten with `StaffInfo.keySignatures` 
   * value at time or step 0. If not assigned it will be asumed C key.
   */
  defaultKey?: number;
  /**
   * Sets scrolling to follow scoreplaying in different ways according to 
   * `ScrollType` enum values.
   */
  scrollType?: ScrollType;
}

/**
 * An interface to hold temporary information for visual rendering
 */
interface LinkedSVGDetails {
  /** x position at the right of the note head to draw ties */
  xHeadRight: number;
  /** SVG Group to hold tied notes into */
  g?: SVGElement;
}

/**
 * The temporary map to locate linked visual resources on bindings
 */
type LinkedNoteMap = Map<StaffNote, LinkedSVGDetails>;

/**
 * Displays a `StaffInfo` as a staff on a given `DIV`. 
 * 
 * Staff is scaled to fit vertically `config.noteHeight` and note horizontal 
 * position can behave in two different ways: If `config.pixelsPerTimeStep` 
 * is greater than zero, horizontal position will be proportional to its 
 * starting time, allowing to pile several instances for different voices 
 * (parts). Otherwise, resulting staff will display notes in a compact form, 
 * using minimum horizontal space between musical symbols as regular paper 
 * staff does.
 *
 * Clef, key and time signature will be displayed at the leftmost side and the 
 * rest of the staff will scroll under this initial signature area accordingly.
 * In case of proportional note positioning, given it starts at pixel zero, the
 * signature area will blink meanwhile it collides with initial active notes.
 * Key and time signature changes will be shown accordingly through score.
 */
export class StaffSVGRender {
  /** The actual music score data to be rendered */
  public staffInfo: StaffInfo;
  /** Intermediate staff model arranged in non-overlapped blocks */
  public staffModel: StaffModel;
  /** How it has to be rendered */
  private config: StaffRenderConfig;
  /** Full score height (pixels) */
  private height: number;
  /** Full score width (pixels) */
  private width: number;
  /** Upper container */
  private parentElement: HTMLElement;
  /** Overall staff container */
  private div: HTMLDivElement;
  /** Main staff drawing area */
  private staffSVG: SVGSVGElement;
  /** Staff container for vertical repositioning */
  private staffG: SVGElement;
  /** Acting as background layer */
  private linesG: SVGElement;
  /** Acting as middle plane layer */
  private musicG: SVGElement;
  /** Acting as foreground layer */
  private signaturesG: SVGElement;
  /** Overlay signature drawing area */
  private overlaySVG: SVGSVGElement;
  /** Overlay container for vertical repositioning */
  private overlayG: SVGElement;
  /** When to stop blinking (in quarters) */
  private signaturesQuarters: number;
  /** Signatures displaying mode switch */
  private signaturesBlinking: boolean;
  /** General scale appliable to all SVG elements */
  private scale: number;
  /** Vertical factor in pixels (2 vStep/staff line) */
  private vStepSize: number;
  /** Horizontal factor in pixels (1 hStep/time unit) */
  private hStepSize: number;
  /** Vertical SVG distance to middle staff line */
  private staffOffset: number;
  /** MIDI pitch note at the 3rd line (G clef -> B = 71) */
  private clef: number;
  /** Coded in semitones (0 = C, 1 = C#, ... 11 = B) */
  private currentKey: number;
  /** Like 3/4 */
  private currentTimeSignature: TimeSignatureInfo;
  /** x positions */
  private signaturesList: Array<{x: number; q: number}>;
  /** Current signature beginning x position */
  private signatureCurrent: number;
  /** Current signature end x position */
  private signatureNext: number;
  /** initial block to hold starting rest */
  private initialRest: StaffBlock;
  /** Highlited ones */
  private playingNotes: NoteInfo[];
  /** Kind of scrolling if any */
  private scrollType: ScrollType;
  /** Mutex to reduce scroll handling everhead */
  private ticking: boolean;
  /** Optimized scroll value */
  private lastKnownScrollLeft: number;
  /** Last drawn block start time in quarters */
  private lastQ: number;
  /** Time when last bar started in quarters */
  private lastBar: number;

  /**
   * `StaffSVGRender` constructor.
   * @constructor
   * @param score The `StaffInfo` to be visualized.
   * @param config Visualization configuration options.
   * @param div The element where the visualization should be displayed.
   */
  constructor(
    score: StaffInfo, 
    config: StaffRenderConfig,
    div: HTMLDivElement
  ) {
    this.staffInfo = score;
    const defaultPixelsPerTimeStep = 30;
    this.config = {
      noteHeight: config.noteHeight || 6,
      noteSpacing: config.noteSpacing || 1,
      pixelsPerTimeStep: config.pixelsPerTimeStep || defaultPixelsPerTimeStep,
      noteRGB: config.noteRGB || '8, 41, 64',
      activeNoteRGB: config.activeNoteRGB || '240, 84, 119',
    };
    this.div = div;

    // Musical defaults can be overwritten 
    this.clef = guessClef(this.staffInfo);
    this.currentKey = config.defaultKey || 0;
    this.currentTimeSignature = {start: 0, numerator: 4, denominator: 4};
    this.initialRest = { // TODO: Optimize
      maxVStep: 0,
      minVStep: 0, 
      restToNextLength: 0,
      isBarBeginning: true,
      notes: [
        {
          start: 0, 
          length:0, 
          pitch: 0, 
          intensity: 0,
          vSteps: 0, 
          accidental: 0, 
        }
      ]
    };

    this.scrollType = config.scrollType || ScrollType.PAGE;
    this.scale = this.config.noteHeight / PATH_SCALE;
    if (
      config.pixelsPerTimeStep === undefined || config.pixelsPerTimeStep <= 0
    ) { // Compact visualization as default
      this.config.pixelsPerTimeStep = 0;
      this.config.noteSpacing = COMPACT_SPACING * this.scale;
    }

    const defaults: StaffDefaults = { // TODO: Optimize
      clef: this.clef, 
      key: this.currentKey, 
      timeSignature: this.currentTimeSignature,
      initialRest: this.initialRest
    }
    this.staffModel = new StaffModel(this.staffInfo, defaults);
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
    setStroke(this.linesG, LINE_STROKE, this.getColor());
    this.staffG.appendChild(this.linesG);
    // Middle plane symbols
    this.musicG = createSVGGroupChild(this.staffSVG, 'music');
    setFill(this.musicG, this.getColor());
    setStroke(this.musicG, 0, this.getColor());
    this.staffG.appendChild(this.musicG);
    // Foreground signatures
    this.signaturesG = createSVGGroupChild(this.staffSVG, 'signatures');
    this.staffG.appendChild(this.signaturesG);
    // Signatures values
    this.signaturesList = [{x: 0, q: 0}];
    this.signatureCurrent = 0;
    this.signatureNext = 0; // To reset blinking if scrolled
    this.changeKeySignatureIfNeeded(0); // TODO: Review
    this.changeTimeSignatureIfNeeded(0); // TODO: Review
    // General visual references
    this.vStepSize = this.config.noteHeight / 2;
    this.hStepSize = this.config.pixelsPerTimeStep;
    this.staffOffset = 0;
    this.height = 0;    
    this.width = 0;    
    // Processed notes storage and reference
    this.playingNotes = [];
    this.lastBar = 0;
    this.lastQ = -1;
  }

  /**
   * Verifies if a given highlighted `note` should stay that way
   * 
   * A note is active if it's literally the same as the note we are
   * playing (aka activeNote), or if it overlaps because it's a held note.
   * @param note One of the highlighted notes which are currently been played
   * @param activeNote A new active note pending to be highlighted
   * @returns If it should stay highlighted or not
   */
  private isPaintingActiveNote(
      note: NoteInfo, activeNote: NoteInfo
  ): boolean {
    const isPlayedNote =
        note.start === activeNote.start;
    const heldDownDuringPlayedNote =
        note.start <= activeNote.start &&
        note.start + note.length >= activeNote.start + activeNote.length;
    return isPlayedNote || heldDownDuringPlayedNote;
  }

  /**
   * Redraws the entire `staffInfo` in a staff if no `activeNote` is given,
   * highlighting on and off the appropriate notes otherwise. Should the 
   * `staffInfo` had changed adding more notes at the end, calling this
   * method again would complete the redrawing from the very last note it was
   * drawn, maintaining the active note and the scroll position as they were. 
   * This is handy for incremental compositions. 
   * 
   * Given the complexity of adaptation to a modified score, modifyied notes 
   * previously drawn will be ignored, however, you can always `clear()` and 
   * `redraw()` for a full redraw.
   * @param activeNote If specified, this `Note` will be painted
   * in the active color and there won't be an actual redrawing, but a 
   * re-colouring of the involved note heads, accidentals, dots and ties 
   * (activated and de-activated ones). Otherwise, all musical symbols which 
   * were not processed yet will be drawn to complete the score.
   * @param scrollIntoView If specified and the active note to be 
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
            highlightElement(this.getGroup(note), this.getColor(false));
          }
        }
      );
      this.playingNotes = keepOnPlayingNotes;
      const g = this.getGroup(activeNote);
      if (g) {
        console.log(activeNote);
        this.playingNotes.push(activeNote); // Store to revert highlight later
        highlightElement(g, this.getColor(true));
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
     const staffBlockMap = this.staffModel.analyzeStaffInfo(this.staffInfo);
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
        width += this.drawRests(this.initialRest, x + width);
      }
      else {
        x = this.width;
      }
      const linkedNoteMap: LinkedNoteMap = new Map();
      staffBlockMap.forEach( // Music Blocks
        (staffBlock, quarters) => {
          if (!isCompact) {
            x = this.quartersToTime(quarters) * this.hStepSize;
          }
          if (quarters > this.lastQ) {
            width += this.drawStaffBlock(staffBlock, x + width, linkedNoteMap);
            this.lastQ = quarters;
          }
          else if (quarters === this.lastQ) { // Undrawn ending rests
            width += this.drawRests(staffBlock, x + width);
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
        const lastBlock = staffBlockMap.get(this.lastQ);
        const endTime = 
          this.quartersToTime(this.lastQ + lastBlock.notes[0].length);
        this.width = endTime * this.config.pixelsPerTimeStep;
      }
      this.staffSVG.setAttributeNS(null, 'width', `${this.width}`);
      this.redrawStaffLines(this.linesG, 0, this.width);
    }
    return activeNotePosition;
  }

  /**
   * Draws a set of musical notes grouped in a block into a staff
   * @param staffBlock The block to be drawn
   * @param x Horizontal position to draw the block
   * @param linkedNoteMap Temporary storage of visual data aids
   * @returns The width of the drawn block
   */
  private drawStaffBlock(staffBlock: StaffBlock, x: number, linkedNoteMap: LinkedNoteMap): number {
    const quarter = staffBlock.notes[0].start;
    // Preceding bar
    let width = this.drawBarIfNeeded(quarter, x);
    // Signature change analysis and possible drawing
    width += this.drawSignaturesIfNeeded(quarter, x + width);
    // Kind of note selection (all block notes have same aspect, some are tied)
    let headIndex = 0;
    for (let i = 4; i >= MIN_RESOLUTION && !headIndex; i /= 2) {
      if (i <= staffBlock.notes[0].length) {
        headIndex = i;
      }
    }
    // Fallback for notes shorter than MIN_RESOLUTION. It will be warned on 
    // console and MIN_RESOLUTION note will be drawn.
    if (headIndex === 0) {
      const noteLength = staffBlock.notes[0].length === 0 ? '[infinite]' : 
        `${4 / staffBlock.notes[0].length}`;
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
    staffBlock.notes.forEach(
      note => {
        const opacity = this.getOpacity(note.intensity);
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
        const _g = (note.tiedFrom) ? linkedNoteMap.get(note.tiedFrom).g : 
          createSVGGroupChild(this.musicG, `${note.start}-${note.pitch}`);
        if (staffBlock.isBarBeginning) {
          _g.setAttribute('data-is-bar-beginning', 'true');
        }
        // Preceding Tie
        if (note.tiedFrom) {
          const tieWidth = x + width - linkedNoteMap.get(note.tiedFrom).xHeadRight; // TODO: Simplify
          drawSVGPath(
            _g, tiePath, linkedNoteMap.get(note.tiedFrom).xHeadRight, y, tieWidth/PATH_SCALE, // TODO: Simplify
            this.scale * (note.vSteps < 0 ? -1 : 1), opacity
          );
        }
        // Note head
        drawSVGPath(
          _g, noteHead.path, 
          x + width, y, this.scale, this.scale, opacity
        );
        const _xHeadRight = x + width + noteHead.width*this.scale;
        // Dotted note
        if (headIndex * 1.5 <= note.length) {
          drawSVGPath(
            _g, dotPath, 
            x + width + noteHead.width*this.scale + this.vStepSize/2, 
            y - this.vStepSize/2, this.scale, this.scale, opacity
          );
        }
        // Accidentals
        if (note.accidental !== 0) {
          drawSVGPath(
            _g, ACCIDENTAL_PATHS[note.accidental],
            x + width, y, this.scale, this.scale, opacity
          );
        }
        // Store for further visual linkage if linked to some other note
        if (note.tiedTo) {
          linkedNoteMap.set(note, {g: _g, xHeadRight: _xHeadRight})
        }
      }
    );
    if (noteHead.stemAnchor) { // There is a stem and potentially some flags
      let xStem = x + width;
      let y1: number, y2: number;
      const anchor = noteHead.stemAnchor*this.scale;
      const downwards = staffBlock.minVStep + staffBlock.maxVStep < 0;
      const multiple = (noteHead.flags > 2) ? 2 * (noteHead.flags-2) : 0;
      if (downwards) { // Downwards
        y1 = staffBlock.maxVStep * this.vStepSize - anchor;
        y2 = (staffBlock.minVStep + 7 + multiple) * this.vStepSize;
      }
      else { // Upwards
        xStem += (noteHead.width - STEM_WIDTH) * this.scale;
        y1 = staffBlock.minVStep * this.vStepSize + anchor;
        y2 = (staffBlock.maxVStep - 7 - multiple) * this.vStepSize;
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
    width += this.drawRests(staffBlock, x + width);
    return width;
  }

  /**
   * Draws the rests which follows a musical block in a staff
   * @param staffBlock The block which indicates how much rest should be 
   * displayed till the next block
   * @param x Horizontal position to draw the rests
   * @returns The width of the drawn rests
   */
  private drawRests(staffBlock: StaffBlock, x: number): number {
    let width = 0;
    let remainingLength = staffBlock.restToNextLength;
    if (remainingLength) {
      if (this.config.pixelsPerTimeStep > 0) {
        x += this.quartersToTime(staffBlock.notes[0].length) * this.hStepSize;
      }
      // Find a possible rest bar split
      let quarters = staffBlock.notes[0].start + staffBlock.notes[0].length;
      let lengthAfterNextBar = 0;
      const quartersToNextBar = this.lastBar + getBarLength(this.currentTimeSignature) - quarters;
      if (remainingLength > quartersToNextBar) {
        lengthAfterNextBar = remainingLength - quartersToNextBar;
        remainingLength = quartersToNextBar;
      }
      let maxRest: number;
      for ( // Set the minimum viable rest in the bar
        maxRest = 4; 
        maxRest > getBarLength(this.currentTimeSignature) && maxRest >= MIN_RESOLUTION;
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
          const nextBarLength = getBarLength(this.currentTimeSignature);
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
            maxRest > getBarLength(this.currentTimeSignature) && maxRest >= MIN_RESOLUTION;
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

  /**
   * Draws the five horizontal lines of a staff (pentagram) or scales them to 
   * the current width of the score if already drawn
   * @param e The SVG container of the lines
   * @param x Horizontal starting point of the drawing
   * @param width Width of the pentagram
   * @returns The SVG which represents the pentagram
   */
  private redrawStaffLines(e: SVGElement, x: number, width: number) {
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

  /**
   * Draws a bar line if this quarter fits on the beginning of a new bar
   * @param quarters Quarters from beginning where bar could start
   * @param x Horizontal position in staff to draw the bar line, if any.
   * @returns The with of the drawn bar line
   */
  private drawBarIfNeeded(quarters: number, x: number): number {
    let width = 0;
    const nextBar = this.lastBar + getBarLength(this.currentTimeSignature);
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

  /**
   * Erases all graphical elements on the signature overlay
   */
  private clearSignatureOverlay() {
    while (this.overlayG.lastChild) {
      this.overlayG.removeChild(this.overlayG.lastChild);
    }
  }

  /**
   * Draws signatures if there's a signature change on specified quarter
   * @param quarters Quarters from beginning where signatiures could start
   * @param x Horizontal position where it should be drawn
   * @returns Width of the drawn signatures or 0 if proportional visualization
   */
  private drawSignaturesIfNeeded(quarters: number, x: number): number {
    let width = 0;
    const keyChanged = this.changeKeySignatureIfNeeded(quarters);
    const timeChanged = this.changeTimeSignatureIfNeeded(quarters);
    if (keyChanged || timeChanged) {
      const clefSpacing = COMPACT_SPACING * this.scale * 
        (this.config.pixelsPerTimeStep > 0 ? 3 : 2);
      this.signaturesList.push({x: x - clefSpacing , q: quarters});
      if (this.signatureNext === null) {
        this.signatureNext = x;
      }
      const signatures = quarters > 0 ?
        createSVGGroupChild(this.signaturesG, 'signatures') : this.overlayG;
      width += this.drawSignatures(
        signatures, x + width, false, keyChanged, timeChanged
      );
    }
    return this.config.pixelsPerTimeStep === 0 ? width : 0;
  }

  /**
   * Draws the signatires in the given container
   * @param e Container of the signatures to be drawn
   * @param x Horizontal position to start drawing it
   * @param drawClef Wether to draw the clef or not
   * @param drawKey Wether to draw the key or not
   * @param drawTime Wether to draw the time signature or not
   * @returns The width of the whole signature set drawn
   */
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
      setFill(clef, this.getColor());
      width += 3 * spacing;
    }
    if (drawKey) {
      const accidental = KEY_ACCIDENTALS[this.currentKey].accidental;
      const offset = (this.clef === 71) ? 0 : 14; // Measured in vStep
      KEY_ACCIDENTALS[this.currentKey].pitches.forEach(
        pitch => {
          const steps = getNoteDetails(pitch,this.clef, this.currentKey).vSteps;
          const p = drawSVGPath(e, ACCIDENTAL_PATHS[accidental], 
            x + width, (offset + steps) * this.vStepSize, 
            this.scale, this.scale);
          setFill(p, this.getColor());
          width += p.getBoundingClientRect().width;
        }
      );
    }
    if (drawTime) { // 0.5 and 2.85 are empirical Times font values
      const timeKey = createSVGGroupChild(e, 'time-key');
      const fontSize = `${2.85*this.config.noteHeight}px`;
      drawSVGText(
        timeKey, `${this.currentTimeSignature.numerator}`, 
        x + width, - 0.5, fontSize, true
      );
      drawSVGText(
        timeKey, `${this.currentTimeSignature.denominator}`, 
        x + width, 4 * this.vStepSize - 0.5, fontSize, true
      );
      setFill(timeKey, this.getColor());
      width += timeKey.getBoundingClientRect().width + spacing;
    }    
    const staff = this.redrawStaffLines(e, x, width);
    setStroke(staff, LINE_STROKE, this.getColor());
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
        setFill(grad, this.getColor());
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

  /**
   * Changes the current key according to the quarter position
   * @param quarters Quarters from beginning where change could happen
   * @returns Wether it changed or not
   */
  private changeKeySignatureIfNeeded(quarters: number): boolean {
    const candidateKey = keySignatureAtQ(quarters, this.currentKey, this.staffInfo);
    if (candidateKey !== this.currentKey) {
      this.currentKey = candidateKey;
      return true;
    }
    else {
      return false;
    }
  } 

  /**
   * Changes the current time signature according to the quarter position
   * @param quarters Quarters from beginning where change could happen
   * @returns Wether it changed or not
   */
  private changeTimeSignatureIfNeeded(quarter: number): boolean {
    const candidateTimeSign = timeSignatureAtQ(
      quarter, this.currentTimeSignature, this.staffInfo
    );
    if (
      candidateTimeSign.numerator !== this.currentTimeSignature.numerator ||
      candidateTimeSign.denominator != this.currentTimeSignature.denominator
    ) {
      this.currentTimeSignature = candidateTimeSign
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Combines signatures change and drawing according to x position. It's used
   * to replace overlays on horizontal scrolling according to next diagram:
   *```
   *   current  x     next   <= current & next include the starting point
   *         |  |     |
   *[0      )[1      )[2     )null
   *```
   * @param x Horizontal position to draw signatures
   */
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
      const tmpKey = this.currentKey;
      const tmpTimeSignature = this.currentTimeSignature;
      this.changeKeySignatureIfNeeded(quarter);
      this.changeTimeSignatureIfNeeded(quarter);
      this.clearSignatureOverlay();
      this.drawSignatures(this.overlayG, 0, true, true, true);
      this.currentKey = tmpKey;
      this.currentTimeSignature = tmpTimeSignature;
    }

    if (this.config.pixelsPerTimeStep > 0 && x === 0) {
      this.signatureNext = 0; // To reset blinking if scrolled
      this.signaturesBlinking = true;
      setFade(this.overlayG, this.signaturesBlinking);
    }
  }

  /**
   * Callback handler for horizonatal scroll events
   * @param _event Ignored
   */
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

  /**
   * Actuator on the horizontal scroll to show highlited note
   * @param scrollIntoView Wether the scroll must follow active note or not
   * @param activeNotePosition Horizontal position of the current active note
   */
  private scrollIntoViewIfNeeded(
    scrollIntoView: boolean, activeNotePosition: number
  ) {
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

  /**
   * Resizes containers to fully hold staff on possible resizes
   * @param top Vertical top position on highest staff component
   * @param bottom Vertical bottom position on lowest staff component
   */
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

  /**
   * Generates a http string with the default color (default) or the active one
   * @param isActive Wether the color is active (highlight) or not
   * @returns The color string
   */
  private getColor(isActive: boolean=false): string {
    return `rgb(${isActive ? this.config.activeNoteRGB : this.config.noteRGB})`;
  }

  /**
   * Generates an alpha transparency value with a slight bump to avoid 
   * quiet notes to be invisible
   * @param noteVelocity The MIDI velocity of the note (from 0 to 127)
   * @returns A numerical value for opacity (from 0.0 = full transparent to 
   * 1.0 = full opacity) 
   */
  private getOpacity(noteVelocity?: number): number {
    const opacityBaseline = 0.2;  // Shift all the opacities up a little.
    return noteVelocity ? 
      (noteVelocity / 127) * (1 - opacityBaseline) + opacityBaseline : 1;
  }

  /**
   * Locates a SVG group to highlight the symbols it contains
   * @param note The note to locate the SVG group it belongs to
   * @returns The SVG Group
   */
  private getGroup(note: NoteInfo): SVGElement {
    const quarters = note.start;
    const pitch = note.pitch;
    return this.staffSVG.querySelector(`g[data-id="${quarters}-${pitch}"]`);
  }

  /**
   * 
   * @param quarters 
   */
  private quartersToTime(quarters: number): number {
    return quarters / this.staffInfo.tempos[0].qpm * 60;
  }
  
  private timeToQuarters(time: number): number {
    return time * this.staffInfo.tempos[0].qpm / 60;
  }
  
}