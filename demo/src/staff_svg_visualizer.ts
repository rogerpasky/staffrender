/**
 * A demo module module containing a staff visualizer for `NoteSequences`.
 * NOTE: This is a evolving solution to be further optimized.
 *
 * @license
 * Copyright 2019 Pascual de Juan All Rights Reserved.
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

import {
  INoteSequence, NoteSequence, BaseVisualizer
} from '@magenta/music';

// WARNING: VisualizerConfig interface has not been exported from @magenta
// package, so it has been needed to be re-declared here until exportation
// gets accepted in master.
//
// import {VisualizerConfig} from '@magenta/music';

/**
 * An interface for providing configurable properties to a Visualizer.
 * @param noteHeight The vertical height in pixels of a note.
 * @param noteSpacing Number of horizontal pixels between each note.
 * @param pixelsPerTimeStep The horizontal scale at which notes are drawn. The
 * bigger this value, the "wider" a note looks.
 * @param noteRGB The color (as an RGB comma separated string) of a note.
 * @param activeNoteRGB The color (as an RGB comma separated string) of an
 * active note being played.
 * @param minPitch The smallest pitch to be included in the visualization. If
 * undefined, this will be computed from the NoteSequence being visualized.
 * @param maxPitch The biggest pitch to be included in the visualization. If
 * undefined, this will be computed from the NoteSequence being visualized.
 */
export interface VisualizerConfig {
  noteHeight?: number;
  noteSpacing?: number;
  pixelsPerTimeStep?: number;
  noteRGB?: string;
  activeNoteRGB?: string;
  minPitch?: number;
  maxPitch?: number;
}

import * as sr from '../../src';

/**
 * Enumeration of different ways of horizontal score scrolling, like paginated
 * (PAGE), note by note (NOTE) or in packed chunks by doing scroll just on bar 
 * starting (BAR is default value).
 */
export enum ScrollType {
  PAGE = 0,
  NOTE = 1,
  BAR = 2
}

/**
 * An interface for providing extra configurable properties to a Visualizer
 * extending the basic configurable properties of `VisualizerConfig`.
 *
 * @param defaultKey The musical key the score must use to adapt the score to
 * the right accidentals. It can be overwritten with
 * `NoteSequence.keySignatures` value at time or step 0. If not assigned it
 * will be asumed C key.
 * @param instruments The subset of the `NoteSequence` instrument track numbers
 * which should be merged and displayed. If not assigned or equal to [] it will
 * be used all instruments altogether.
 * @param scrollType Sets scrolling to follow scoreplaying in different ways
 * according to `ScrollType` enum values. BAR is default value
 */
export interface StaffSVGVisualizerConfig extends VisualizerConfig {
  defaultKey?: number;
  instruments?: number[];
  scrollType?: ScrollType;
}

/**
 * Displays a `NoteSecuence` as a staff on a given SVG. Staff is scaled to fit
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
 *
 * New configuration features have been introduced through
 * `StaffSVGVisualizerConfig` over basic `VisualizerConfig`.
 *
 * When connected to a player, the visualizer can also highlight
 * the notes being currently played.
 *
 * You can find more info at:
 *
 * https://github.com/rogerpasky/staffrender-magentaviewer
 */
export class StaffSVGVisualizer extends BaseVisualizer {
  private render: sr.StaffSVGRender; // The actual render.
  private instruments: number[]; // Instruments filter to be rendered.
  private drawnNotes: number; // Number of drawn notes. Will redraw if changed.

  /**
   * `StaffSVGVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param div The element where the visualization should be displayed.
   * @param config Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence,
      div: HTMLDivElement,
      config: StaffSVGVisualizerConfig = {}) {
    super(sequence, config);
    if ( // Overwritting super() value. Compact visualization as default.
        config.pixelsPerTimeStep === undefined ||
        config.pixelsPerTimeStep <= 0) {
      this.config.pixelsPerTimeStep = 0;
    }
    this.instruments = config.instruments || [];
    this.render = new sr.StaffSVGRender(
        this.getStaffInfo(sequence),
        {
          noteHeight: this.config.noteHeight || 15,
          noteSpacing: this.config.noteSpacing,
          pixelsPerTimeStep: this.config.pixelsPerTimeStep,
          noteRGB: this.config.noteRGB,
          activeNoteRGB: this.config.activeNoteRGB,
          defaultKey: config.defaultKey || 0,
          scrollType: config.scrollType || ScrollType.BAR,
        },
        div);
    this.drawnNotes = sequence.notes.length;
    this.clear();
    this.redraw();
  }

  /**
   * Clears and resets the visualizer object for further redraws from scratch.
   */
  protected clear() {
    this.render.clear();
  }

  /**
   * Redraws the entire `noteSequence` in a staff if no `activeNote` is given,
   * highlighting on and off the appropriate notes otherwise. Should the
   * `noteSequence` had changed adding more notes at the end, calling this
   * method again would complete the redrawing from the very last note it was
   * drawn, maintaining the active note and the scroll position as they were.
   * This is handy for incremental compositions. Given the complexity of
   * adaption to a modified score, modifyied notes previously drawn will be
   * ignored (you can always `clear()` and `redraw()` for a full redraw).
   * Please have in mind `mm.Player` does not have this incremental capability
   * so, once the player had started, it will go on ignoring the changes.
   *
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color and there won't be an actual redrawing, but a
   * re-colouring of the involved note heads, accidentals, dots and ties
   * (activated and de-activated ones). Otherwise, all musical symbols which
   * were not processed yet will be drawn to complete the score.
   * @param scrollIntoView (Optional) If specified and the active note to be
   * highlighted is not visualized in the container DIV, the latter will be
   * scrolled so that the note is viewed in the right place. This can be
   * altered by `AdvancedVisualizerConfig.scrollType`.
   * @returns The x position of the highlighted active note relative to the
   * beginning of the DIV, or -1 if there wasn't any given active note. Useful
   * for automatically advancing the visualization if needed.
   */
  public redraw(
      activeNote?: NoteSequence.INote,
      scrollIntoView?: boolean): number {
    if (this.drawnNotes !== this.noteSequence.notes.length) {
      this.render.staffInfo = this.getStaffInfo(this.noteSequence);
    }
    const activeNoteInfo = activeNote ?
        this.getNoteInfo(activeNote) : undefined;
    return this.render.redraw(activeNoteInfo, scrollIntoView);
  }

  private isNoteInInstruments(note: NoteSequence.INote) : boolean {
    if (note.instrument === undefined || this.instruments.length === 0) {
      return true; // No instrument information in note means no filtering.
    }
    else { // Instrument filtering
      return this.instruments.indexOf(note.instrument) >= 0;
    }
  }

  private timeToQuarters(time: number): number {
    const q = time * this.noteSequence.tempos[0].qpm / 60;
    return Math.round(q * sr.MAX_QUARTER_DIVISION) / sr.MAX_QUARTER_DIVISION;
  }

  private quantizedStepsToQuarters(steps: number): number {
    const q = steps / this.noteSequence.quantizationInfo.stepsPerQuarter;
    return Math.round(q * sr.MAX_QUARTER_DIVISION) / sr.MAX_QUARTER_DIVISION;
  }

  private getNoteInfo(note: NoteSequence.INote): sr.NoteInfo {
    const startQ = note.quantizedStartStep ? // TODO: different to base class
        this.quantizedStepsToQuarters(note.quantizedStartStep) :
        this.timeToQuarters(note.startTime);
    const endQ = note.quantizedEndStep ? // TODO: different to base class
        this.quantizedStepsToQuarters(note.quantizedEndStep) :
        this.timeToQuarters(note.endTime);
    return {
      start: startQ,
      length: endQ - startQ,
      pitch: note.pitch,
      intensity: note.velocity
    };
  }

  private getStaffInfo(sequence: INoteSequence): sr.StaffInfo {
    const notesInfo: sr.NoteInfo[] = [];
    sequence.notes.forEach((note: NoteSequence.INote) => {
      if (this.isNoteInInstruments(note)) {
        notesInfo.push(this.getNoteInfo(note));
      }
    });
    return {
      notes: notesInfo,
      tempos: sequence.tempos ?
        sequence.tempos.map((t: NoteSequence.ITempo) => {
          return { start: this.timeToQuarters(t.time), qpm: t.qpm };
        }) : [],
      keySignatures: sequence.keySignatures ?
        sequence.keySignatures.map((ks: NoteSequence.IKeySignature) => {
          return { start: this.timeToQuarters(ks.time), key: ks.key };
        }) : [],
      timeSignatures: sequence.timeSignatures ?
        sequence.timeSignatures.map((ts: NoteSequence.ITimeSignature) => {
          return {
            start: this.timeToQuarters(ts.time),
            numerator: ts.numerator,
            denominator: ts.denominator
          };
        }) : []
    };
  }
  
  public clearActiveNotes() {
    this.redraw();
  }
}