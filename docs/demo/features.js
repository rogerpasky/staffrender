/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/features.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/bars_info.ts":
/*!***************************!*\
  !*** ../src/bars_info.ts ***!
  \***************************/
/*! exports provided: BarsInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarsInfo", function() { return BarsInfo; });
/* harmony import */ var _staff_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staff_info */ "../src/staff_info.ts");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model_constants */ "../src/model_constants.ts");


class BarsInfo {
    constructor(staffInfo, lastQ) {
        this.barsInfo = [];
        let tempoIndex = 0;
        let keyIndex = 0;
        let timeIndex = 0;
        let currentTempo = staffInfo.tempos[0];
        let currentKeySignature = staffInfo.keySignatures[0];
        let currentTimeSignature = staffInfo.timeSignatures[0];
        let barNumberAtCurrentTimeSignature = 0;
        let currentBarLength = Object(_staff_info__WEBPACK_IMPORTED_MODULE_0__["getBarLength"])(currentTimeSignature);
        for (let quarters = 0; quarters < lastQ; quarters += 1 / 16) {
            const barInfo = {
                start: quarters,
                barNumber: barNumberAtCurrentTimeSignature +
                    (quarters - currentTimeSignature.start) / currentBarLength,
                barLength: currentBarLength,
                tempo: currentTempo,
                keySignature: currentKeySignature,
                timeSignature: currentTimeSignature
            };
            if (tempoIndex < staffInfo.tempos.length &&
                staffInfo.tempos[tempoIndex].start === quarters) {
                currentTempo = staffInfo.tempos[tempoIndex++];
                barInfo.tempo = currentTempo;
                barInfo.tempoChange = true;
            }
            if (keyIndex < staffInfo.keySignatures.length &&
                staffInfo.keySignatures[keyIndex].start === quarters) {
                currentKeySignature = staffInfo.keySignatures[keyIndex++];
                barInfo.keySignature = currentKeySignature;
                barInfo.keyChange = true;
            }
            if (timeIndex < staffInfo.timeSignatures.length &&
                staffInfo.timeSignatures[timeIndex].start === quarters) {
                barNumberAtCurrentTimeSignature = barInfo.barNumber;
                currentTimeSignature = staffInfo.timeSignatures[timeIndex++];
                barInfo.timeSignature = currentTimeSignature;
                currentBarLength = Object(_staff_info__WEBPACK_IMPORTED_MODULE_0__["getBarLength"])(currentTimeSignature);
                barInfo.barLength = currentBarLength;
                barInfo.timeChange = true;
            }
            this.barsInfo.push(barInfo);
        }
    }
    barNumberAtQ(start) {
        const reference = this.barsInfo[Math.trunc(start * 16)];
        const quartersAdvance = start - reference.start;
        const barAdvanceSinceReference = quartersAdvance / reference.barLength;
        return reference.barNumber + barAdvanceSinceReference;
    }
    barLenghtAtQ(start) {
        return this.barsInfo[Math.trunc(start * 16)].barLength;
    }
    tempoAtQ(_start, onlyChanges = false) {
        const barInfo = this.barsInfo[0];
        return !onlyChanges || barInfo.tempoChange ? barInfo.tempo.qpm : -1;
    }
    keySignatureAtQ(start, onlyChanges = false) {
        const barInfo = this.barsInfo[Math.trunc(start * 16)];
        return !onlyChanges || barInfo.keyChange ? barInfo.keySignature.key : -1;
    }
    timeSignatureAtQ(start, onlyChanges = false) {
        const barInfo = this.barsInfo[Math.trunc(start * 16)];
        return !onlyChanges || barInfo.timeChange ? barInfo.timeSignature : null;
    }
    quartersToTime(quarters) {
        return quarters / this.barsInfo[0].tempo.qpm * 60;
    }
    timeToQuarters(time) {
        const q = time * this.barsInfo[0].tempo.qpm / 60;
        return Math.round(q * _model_constants__WEBPACK_IMPORTED_MODULE_1__["MAX_QUARTER_DIVISION"]) / _model_constants__WEBPACK_IMPORTED_MODULE_1__["MAX_QUARTER_DIVISION"];
    }
}


/***/ }),

/***/ "../src/model_constants.ts":
/*!*********************************!*\
  !*** ../src/model_constants.ts ***!
  \*********************************/
/*! exports provided: MIN_RESOLUTION, MAX_QUARTER_DIVISION, SCALES, KEY_ACCIDENTALS, TREBLE_CLEF, BASS_CLEF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_RESOLUTION", function() { return MIN_RESOLUTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_QUARTER_DIVISION", function() { return MAX_QUARTER_DIVISION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCALES", function() { return SCALES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_ACCIDENTALS", function() { return KEY_ACCIDENTALS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TREBLE_CLEF", function() { return TREBLE_CLEF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASS_CLEF", function() { return BASS_CLEF; });
const MIN_RESOLUTION = 0.0625;
const MAX_QUARTER_DIVISION = 16 * 3 * 5;
const SCALES = [
    {
        steps: [0, 0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6],
        accidental: [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]
    }, {
        steps: [0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6],
        accidental: [0, 0, 3, 0, 3, 0, 0, 3, 0, 3, 0, 3]
    }, {
        steps: [0, 0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6],
        accidental: [3, 0, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0]
    }, {
        steps: [0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6],
        accidental: [0, 2, 0, 0, 3, 0, 2, 0, 0, 3, 0, 3]
    }, {
        steps: [0, 0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6],
        accidental: [3, 0, 3, 0, 0, 3, 0, 3, 0, 0, 1, 0]
    }, {
        steps: [0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6],
        accidental: [0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 3]
    }, {
        steps: [0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -7],
        accidental: [3, 0, 3, 0, 3, 0, 0, 3, 0, 3, 0, 0]
    }, {
        steps: [0, 0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6],
        accidental: [0, 1, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0]
    }, {
        steps: [0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6],
        accidental: [0, 0, 3, 0, 3, 0, 2, 0, 0, 3, 0, 3]
    }, {
        steps: [0, 0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6],
        accidental: [3, 0, 0, 1, 0, 3, 0, 3, 0, 0, 1, 0]
    }, {
        steps: [0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6],
        accidental: [0, 2, 0, 0, 3, 0, 2, 0, 2, 0, 0, 3]
    }, {
        steps: [0, 0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6],
        accidental: [3, 0, 3, 0, 0, 3, 0, 3, 0, 3, 0, 0]
    }
];
const KEY_ACCIDENTALS = [
    { accidental: 1, pitches: [] },
    { accidental: 2, pitches: [70, 75, 68, 73, 66] },
    { accidental: 1, pitches: [78, 73] },
    { accidental: 2, pitches: [70, 75, 68] },
    { accidental: 1, pitches: [78, 73, 80, 75] },
    { accidental: 2, pitches: [70] },
    { accidental: 2, pitches: [70, 75, 68, 73, 66, 71] },
    { accidental: 1, pitches: [78] },
    { accidental: 2, pitches: [70, 75, 68, 73] },
    { accidental: 1, pitches: [78, 73, 80] },
    { accidental: 2, pitches: [70, 75] },
    { accidental: 1, pitches: [78, 73, 80, 75, 70] }
];
const TREBLE_CLEF = 71;
const BASS_CLEF = 50;


/***/ }),

/***/ "../src/render_constants.ts":
/*!**********************************!*\
  !*** ../src/render_constants.ts ***!
  \**********************************/
/*! exports provided: STEM_WIDTH, LINE_STROKE, COMPACT_SPACING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STEM_WIDTH", function() { return STEM_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINE_STROKE", function() { return LINE_STROKE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPACT_SPACING", function() { return COMPACT_SPACING; });
const STEM_WIDTH = 15;
const LINE_STROKE = 1;
const COMPACT_SPACING = 150;


/***/ }),

/***/ "../src/staff_block.ts":
/*!*****************************!*\
  !*** ../src/staff_block.ts ***!
  \*****************************/
/*! exports provided: splitStaffNote, StaffBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitStaffNote", function() { return splitStaffNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaffBlock", function() { return StaffBlock; });
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model_constants */ "../src/model_constants.ts");

function splitStaffNote(staffNote, quarters) {
    const remainLength = (staffNote.start + staffNote.length) - quarters;
    let splitted = null;
    if (quarters > staffNote.start && remainLength > 0) {
        staffNote.length -= remainLength;
        splitted = {
            start: quarters,
            length: remainLength,
            pitch: staffNote.pitch,
            intensity: staffNote.intensity,
            vSteps: staffNote.vSteps,
            accidental: staffNote.accidental,
            tiedFrom: staffNote
        };
        if (staffNote.tiedTo) {
            splitted.tiedTo = staffNote.tiedTo;
            staffNote.tiedTo.tiedFrom = splitted;
        }
        staffNote.tiedTo = splitted;
    }
    return splitted;
}
class StaffBlock {
    constructor(start = 0, length = 0, notes = [], barNumber = 0, maxVStep = Number.MAX_SAFE_INTEGER, minVStep = Number.MIN_SAFE_INTEGER) {
        this.start = start;
        this.length = length;
        this.headIndex = 0;
        this.notes = notes;
        this.barNumber = barNumber;
        this.maxVStep = maxVStep;
        this.minVStep = minVStep;
    }
    addNote(staffNote) {
        let newNote = true;
        for (let i = 0; newNote && i < this.notes.length; ++i) {
            if (staffNote.pitch === this.notes[i].pitch) {
                newNote = false;
                this.notes[i].length = Math.max(this.notes[i].length, staffNote.length);
                this.length = Math.max(this.length, staffNote.length);
            }
        }
        if (newNote) {
            this.notes.push(staffNote);
            this.minVStep = Math.max(staffNote.vSteps, this.minVStep);
            this.maxVStep = Math.min(staffNote.vSteps, this.maxVStep);
            this.length = Math.max(this.length, staffNote.length);
        }
    }
    split(quarters, barsInfo) {
        const remainLength = (this.start + this.length) - quarters;
        let splittedBlock = null;
        if (quarters > this.start && remainLength > 0) {
            splittedBlock = new StaffBlock(quarters, remainLength, [], barsInfo.barNumberAtQ(quarters));
            this.length -= remainLength;
            this.notes.forEach(staffNote => {
                const remainStaffNote = splitStaffNote(staffNote, quarters);
                if (remainStaffNote) {
                    splittedBlock.addNote(remainStaffNote);
                }
            });
        }
        if (splittedBlock && this.beatEnd) {
            splittedBlock.beatEnd = true;
            this.beatEnd = false;
        }
        return splittedBlock;
    }
    splitToBeat(barsInfo) {
        const timeSignature = barsInfo.timeSignatureAtQ(this.start);
        const barLength = barsInfo.barLenghtAtQ(this.start);
        const barFractionFromBar = this.barNumber - Math.floor(this.barNumber);
        const quartersFromBarBeginning = Math.round(barLength * barFractionFromBar * 1000000) / 1000000;
        const quartersAtBarBeginning = this.start - quartersFromBarBeginning;
        const metricBeat = 4 / timeSignature.denominator;
        const blockBeat = quartersFromBarBeginning / metricBeat;
        const splittingBeat = Math.ceil(blockBeat);
        let splittedBlock = null;
        if (!isSafeZero(splittingBeat - blockBeat)) {
            const quartersAtBeat = Math.round((quartersAtBarBeginning + splittingBeat * metricBeat) * 1000000) / 1000000;
            splittedBlock = this.split(quartersAtBeat, barsInfo);
            if (isSafeZero(this.start + this.length - quartersAtBeat)) {
                this.beatEnd = true;
            }
        }
        else {
            this.beatBegin = true;
            const quartersAtBarEnd = Math.round((quartersAtBarBeginning + timeSignature.numerator * metricBeat) *
                1000000) / 1000000;
            splittedBlock = this.split(quartersAtBarEnd, barsInfo);
            if (isSafeZero(this.start + this.length - quartersAtBarEnd)) {
                this.beatEnd = true;
            }
        }
        if (splittedBlock) {
            this.beatEnd = true;
        }
        return splittedBlock;
    }
    splitToSymbols(barsInfo, increasing) {
        let remainBlock = null;
        if (this.length >= _model_constants__WEBPACK_IMPORTED_MODULE_0__["MIN_RESOLUTION"]) {
            if (!this.notes.length &&
                this.length === barsInfo.barLenghtAtQ(this.start)) {
                this.headIndex = 4;
            }
            else {
                remainBlock = increasing ?
                    this.splitShorter(barsInfo) : this.splitLonger(barsInfo);
            }
        }
        else {
            const noteLength = isSafeZero(this.length) ? '[infinite]' :
                `${4 / this.length}`;
            console.warn('%cStaffRender:', 'background:orange; color:white', 'StaffRender does not handle notes shorther than ' +
                `1/${4 / _model_constants__WEBPACK_IMPORTED_MODULE_0__["MIN_RESOLUTION"]}th, and this score tries to draw a ` +
                `1/${noteLength}th. Shortest possible note will be drawn instead.`);
            this.headIndex = _model_constants__WEBPACK_IMPORTED_MODULE_0__["MIN_RESOLUTION"];
            remainBlock = null;
        }
        return remainBlock;
    }
    splitShorter(barsInfo) {
        let length = this.length;
        let splitLength = 0;
        let headIndex = 0;
        let headAlteration = 0;
        for (let i = 4; !isSafeZero(length); i /= 2) {
            if (isSafeZero(length - i * 3 / 2) &&
                (barsInfo.allowDottedRests || this.notes.length)) {
                length -= i * 3 / 2;
                splitLength = i * 3 / 2;
                headIndex = i;
                headAlteration = 1;
            }
            else if (length >= i) {
                length -= i;
                splitLength = i;
                headIndex = i;
            }
            else if (isSafeZero(length - i * 4 / 5)) {
                length -= i * 4 / 5;
                splitLength = i * 4 / 5;
                headIndex = i;
                headAlteration = 5;
            }
            else if (isSafeZero(length - i * 2 / 3)) {
                length -= i * 2 / 3;
                splitLength = i * 2 / 3;
                headIndex = i;
                headAlteration = 3;
            }
        }
        const remainBlock = this.split(this.start + splitLength, barsInfo);
        this.headIndex = headIndex;
        this.headAlteration = headAlteration;
        return remainBlock;
    }
    splitLonger(barsInfo) {
        let remainBlock = null;
        for (let i = 4; !this.headIndex; i /= 2) {
            if (isSafeZero(this.length - i * 3 / 2) &&
                (barsInfo.allowDottedRests || this.notes.length)) {
                remainBlock = this.split(this.start + i * 3 / 2, barsInfo);
                this.headIndex = i;
                this.headAlteration = 1;
            }
            else if (this.length >= i) {
                remainBlock = this.split(this.start + i, barsInfo);
                this.headIndex = i;
            }
            else if (isSafeZero(this.length - i * 4 / 5)) {
                remainBlock = this.split(this.start + i * 4 / 5, barsInfo);
                this.headIndex = i;
                this.headAlteration = 5;
            }
            else if (isSafeZero(this.length - i * 2 / 3)) {
                remainBlock = this.split(this.start + i * 2 / 3, barsInfo);
                this.headIndex = i;
                this.headAlteration = 3;
            }
        }
        return remainBlock;
    }
    mergeToMap(map) {
        if (map.has(this.start)) {
            const existingBlock = map.get(this.start);
            this.notes.forEach(note => existingBlock.addNote(note));
        }
        else {
            map.set(this.start, this);
        }
    }
    isBarBeginning() {
        return this.barNumber - Math.trunc(this.barNumber) === 0.0;
    }
    setBeaming(previousStaffBlock, barsInfo) {
    }
}
function isSafeZero(n) {
    return Math.round(n * 1000000) === 0;
}


/***/ }),

/***/ "../src/staff_info.ts":
/*!****************************!*\
  !*** ../src/staff_info.ts ***!
  \****************************/
/*! exports provided: DEFAULT_TEMPO, DEFAULT_KEY_SIGNATURE, DEFAULT_TIME_SIGNATURE, getBarLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TEMPO", function() { return DEFAULT_TEMPO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_KEY_SIGNATURE", function() { return DEFAULT_KEY_SIGNATURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TIME_SIGNATURE", function() { return DEFAULT_TIME_SIGNATURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBarLength", function() { return getBarLength; });
const DEFAULT_TEMPO = {
    start: 0,
    qpm: 60
};
const DEFAULT_KEY_SIGNATURE = {
    start: 0,
    key: 0
};
const DEFAULT_TIME_SIGNATURE = {
    start: 0,
    numerator: 4,
    denominator: 4
};
function getBarLength(timeSignature) {
    return timeSignature.numerator * 4 / timeSignature.denominator;
}


/***/ }),

/***/ "../src/staff_model.ts":
/*!*****************************!*\
  !*** ../src/staff_model.ts ***!
  \*****************************/
/*! exports provided: KEY_ACCIDENTALS, StaffModel, getNoteDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaffModel", function() { return StaffModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNoteDetails", function() { return getNoteDetails; });
/* harmony import */ var _staff_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staff_info */ "../src/staff_info.ts");
/* harmony import */ var _bars_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bars_info */ "../src/bars_info.ts");
/* harmony import */ var _staff_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staff_block */ "../src/staff_block.ts");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model_constants */ "../src/model_constants.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KEY_ACCIDENTALS", function() { return _model_constants__WEBPACK_IMPORTED_MODULE_3__["KEY_ACCIDENTALS"]; });






class StaffModel {
    constructor(staffInfo, defaultKey) {
        this.staffInfo = null;
        this.clef = guessClef(staffInfo);
        this.staffBlockMap = null;
        this.update(staffInfo, defaultKey);
    }
    update(staffInfo, defaultKey) {
        staffInfo.notes.sort((x, y) => x.start - y.start);
        this.lastQ = 0;
        staffInfo.notes.forEach(note => {
            if (note.start + note.length > this.lastQ) {
                this.lastQ = note.start + note.length;
            }
        });
        if (staffInfo.tempos && staffInfo.tempos.length) {
            staffInfo.tempos.sort((x, y) => x.start - y.start);
        }
        else {
            staffInfo.tempos = [_staff_info__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_TEMPO"]];
        }
        if (staffInfo.tempos[0].start !== 0) {
            staffInfo.tempos = [_staff_info__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_TEMPO"]].concat(staffInfo.tempos);
        }
        const startingKey = defaultKey ?
            { start: 0, key: defaultKey } : _staff_info__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_KEY_SIGNATURE"];
        if (staffInfo.keySignatures && staffInfo.keySignatures.length) {
            staffInfo.keySignatures.sort((x, y) => x.start - y.start);
        }
        else {
            staffInfo.keySignatures = [startingKey];
        }
        if (staffInfo.keySignatures[0].start !== 0) {
            staffInfo.keySignatures =
                [startingKey].concat(staffInfo.keySignatures);
        }
        if (staffInfo.timeSignatures && staffInfo.timeSignatures.length) {
            staffInfo.timeSignatures.sort((x, y) => x.start - y.start);
        }
        else {
            staffInfo.timeSignatures = [_staff_info__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_TIME_SIGNATURE"]];
        }
        if (staffInfo.timeSignatures[0].start !== 0) {
            staffInfo.timeSignatures =
                [_staff_info__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_TIME_SIGNATURE"]].concat(staffInfo.timeSignatures);
        }
        this.barsInfo = new _bars_info__WEBPACK_IMPORTED_MODULE_1__["BarsInfo"](staffInfo, this.lastQ);
        this.infoToBlocks(staffInfo);
    }
    infoToBlocks(staffInfo) {
        if (this.staffBlockMap === null ||
            staffInfo.notes.length !== this.staffInfo.notes.length ||
            staffInfo.tempos.length !== this.staffInfo.tempos.length ||
            staffInfo.keySignatures.length !== this.staffInfo.keySignatures.length ||
            staffInfo.timeSignatures.length !== this.staffInfo.timeSignatures.length) {
            this.staffInfo = staffInfo;
            this.lastQ = 0;
            const blocks = new Map();
            const splites = new Set();
            let barAccidentals = {};
            let lastBar = 0;
            let lastBlock = null;
            this.staffInfo.notes.forEach(note => {
                const staffNote = toStaffNote(note);
                const barNumber = this.barsInfo.barNumberAtQ(staffNote.start);
                const currentBar = Math.trunc(barNumber);
                if (currentBar > lastBar) {
                    lastBar = currentBar;
                    barAccidentals = {};
                }
                const keySignature = this.barsInfo.keySignatureAtQ(staffNote.start);
                placeNote(staffNote, barAccidentals, this.clef, keySignature);
                const staffNoteEnd = staffNote.start + staffNote.length;
                const lastBlockLength = lastBlock ? lastBlock.length : 0;
                const currentBlock = noteToBlocks(staffNote, blocks, barNumber);
                if (currentBlock === lastBlock) {
                    if (staffNote.length < lastBlock.length) {
                        const splittedBlock = currentBlock.split(staffNoteEnd, this.barsInfo);
                        splittedBlock.mergeToMap(blocks);
                    }
                    else if (lastBlockLength < staffNote.length) {
                        const quarters = lastBlock.start + lastBlockLength;
                        const splittedBlock = currentBlock.split(quarters, this.barsInfo);
                        splittedBlock.mergeToMap(blocks);
                        this.lastQ = staffNoteEnd;
                    }
                }
                else {
                    if (staffNote.start > this.lastQ) {
                        const quarters = this.lastQ;
                        const bar = this.barsInfo.barNumberAtQ(quarters);
                        const restBlock = new _staff_block__WEBPACK_IMPORTED_MODULE_2__["StaffBlock"](quarters, staffNote.start - this.lastQ, [], bar);
                        restBlock.mergeToMap(blocks);
                        this.lastQ = staffNoteEnd;
                    }
                    else if (staffNote.start < this.lastQ) {
                        splites.add(staffNote.start);
                        if (staffNoteEnd < this.lastQ) {
                            splites.add(staffNoteEnd);
                        }
                        else if (this.lastQ < staffNoteEnd) {
                            splites.add(this.lastQ);
                            this.lastQ = staffNoteEnd;
                        }
                    }
                    else {
                        this.lastQ = staffNoteEnd;
                    }
                    lastBlock = currentBlock;
                }
            });
            const sortedSplites = Array.from(splites).sort((x, y) => x - y);
            sortedSplites.forEach(quarters => {
                blocks.forEach(currentBlock => {
                    const splittedBlock = currentBlock.split(quarters, this.barsInfo);
                    if (splittedBlock) {
                        splittedBlock.mergeToMap(blocks);
                    }
                });
            });
            this.staffBlockMap =
                new Map(Array.from(blocks).sort((x, y) => x[0] - y[0]));
            const staffBlockMap = new Map();
            let lastStaffBlock = null;
            this.staffBlockMap.forEach(currentBlock => {
                let remainingBlock = null;
                do {
                    remainingBlock = currentBlock.splitToBeat(this.barsInfo);
                    const increasing = !currentBlock.beatBegin && currentBlock.beatEnd;
                    let remainingSymbolsBlock = null;
                    do {
                        remainingSymbolsBlock =
                            currentBlock.splitToSymbols(this.barsInfo, increasing);
                        currentBlock.setBeaming(lastStaffBlock, this.barsInfo);
                        currentBlock.mergeToMap(staffBlockMap);
                        if (remainingSymbolsBlock) {
                            lastStaffBlock = currentBlock;
                            currentBlock = remainingSymbolsBlock;
                        }
                    } while (remainingSymbolsBlock);
                    if (remainingBlock) {
                        lastStaffBlock = currentBlock;
                        currentBlock = remainingBlock;
                    }
                } while (remainingBlock);
            });
            this.staffBlockMap = staffBlockMap;
        }
        return this.staffBlockMap;
    }
}
function toStaffNote(note) {
    return {
        start: note.start,
        length: note.length,
        pitch: note.pitch,
        intensity: note.intensity,
        vSteps: 0,
        accidental: 0
    };
}
function noteToBlocks(note, blocks, barNumber) {
    if (blocks.has(note.start)) {
        const existingBlock = blocks.get(note.start);
        existingBlock.addNote(note);
        return existingBlock;
    }
    else {
        const newBlock = new _staff_block__WEBPACK_IMPORTED_MODULE_2__["StaffBlock"](note.start, note.length, [note], barNumber, note.vSteps, note.vSteps);
        newBlock.mergeToMap(blocks);
        return newBlock;
    }
}
function placeNote(staffNote, barAccidentals, clef, key) {
    const pitchDetails = getNoteDetails(staffNote.pitch, clef, key);
    if (pitchDetails.vSteps in barAccidentals) {
        if (pitchDetails.accidental === barAccidentals[pitchDetails.vSteps]) {
            pitchDetails.accidental = 0;
        }
        else {
            if (barAccidentals[pitchDetails.vSteps] === 3) {
                pitchDetails.accidental = pitchDetails.keyAccidental;
            }
            else if (pitchDetails.accidental === 0) {
                pitchDetails.accidental = 3;
            }
            barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
        }
    }
    else {
        if (staffNote.tiedFrom) {
            pitchDetails.accidental = 0;
        }
        barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
    }
    staffNote.vSteps = pitchDetails.vSteps;
    staffNote.accidental = pitchDetails.accidental;
}
function getNoteDetails(notePitch, clef, key) {
    const semitones = notePitch - 60;
    const octave = Math.floor(semitones / 12);
    const reminderSemitones = semitones - 12 * octave;
    const steps = _model_constants__WEBPACK_IMPORTED_MODULE_3__["SCALES"][key].steps[reminderSemitones];
    const offset = (clef === 71) ? 6 : -6;
    const noteInKey = _model_constants__WEBPACK_IMPORTED_MODULE_3__["KEY_ACCIDENTALS"][key].accidental === 1 ?
        69 + (reminderSemitones + 3) % 12 : 64 + (reminderSemitones + 8) % 12;
    return {
        vSteps: offset - 7 * octave + steps,
        accidental: _model_constants__WEBPACK_IMPORTED_MODULE_3__["SCALES"][key].accidental[reminderSemitones],
        keyAccidental: _model_constants__WEBPACK_IMPORTED_MODULE_3__["KEY_ACCIDENTALS"][key].pitches.indexOf(noteInKey) > -1 ?
            _model_constants__WEBPACK_IMPORTED_MODULE_3__["KEY_ACCIDENTALS"][key].accidental : 0
    };
}
function guessClef(staffInfo) {
    let pitchSum = 0;
    let countSum = 0;
    staffInfo.notes.forEach(note => {
        pitchSum += note.pitch;
        ++countSum;
    });
    const averagePitch = pitchSum / countSum;
    return averagePitch < 60 ? _model_constants__WEBPACK_IMPORTED_MODULE_3__["BASS_CLEF"] : _model_constants__WEBPACK_IMPORTED_MODULE_3__["TREBLE_CLEF"];
}


/***/ }),

/***/ "../src/staff_svg_render.ts":
/*!**********************************!*\
  !*** ../src/staff_svg_render.ts ***!
  \**********************************/
/*! exports provided: MAX_QUARTER_DIVISION, ScrollType, StaffSVGRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_QUARTER_DIVISION", function() { return MAX_QUARTER_DIVISION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollType", function() { return ScrollType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaffSVGRender", function() { return StaffSVGRender; });
/* harmony import */ var _render_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render_constants */ "../src/render_constants.ts");
/* harmony import */ var _svg_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svg_tools */ "../src/svg_tools.ts");
/* harmony import */ var _svg_paths__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svg_paths */ "../src/svg_paths.ts");
/* harmony import */ var _staff_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./staff_info */ "../src/staff_info.ts");
/* harmony import */ var _staff_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./staff_model */ "../src/staff_model.ts");





const MAX_QUARTER_DIVISION = 16;
var ScrollType;
(function (ScrollType) {
    ScrollType[ScrollType["PAGE"] = 0] = "PAGE";
    ScrollType[ScrollType["NOTE"] = 1] = "NOTE";
    ScrollType[ScrollType["BAR"] = 2] = "BAR";
})(ScrollType || (ScrollType = {}));
class StaffSVGRender {
    constructor(score, config, div) {
        this.handleScrollEvent = (_event) => {
            this.lastKnownScrollLeft = this.parentElement.scrollLeft;
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.changeAndDrawSignaturesIfNeeded(this.lastKnownScrollLeft);
                    this.ticking = false;
                });
            }
            this.ticking = true;
        };
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
        this.scrollType = config.scrollType || ScrollType.PAGE;
        this.scale = this.config.noteHeight / _svg_paths__WEBPACK_IMPORTED_MODULE_2__["PATH_SCALE"];
        if (config.pixelsPerTimeStep === undefined || config.pixelsPerTimeStep <= 0) {
            this.config.pixelsPerTimeStep = 0;
            this.config.noteSpacing = _render_constants__WEBPACK_IMPORTED_MODULE_0__["COMPACT_SPACING"] * this.scale;
        }
        this.staffModel = new _staff_model__WEBPACK_IMPORTED_MODULE_4__["StaffModel"](this.staffInfo, config.defaultKey);
        this.currentKey = this.staffModel.barsInfo.keySignatureAtQ(0);
        this.currentTimeSignature = this.staffModel.barsInfo.timeSignatureAtQ(0);
        this.clear();
        this.redraw();
    }
    clear() {
        while (this.div.lastChild) {
            this.div.removeChild(this.div.lastChild);
        }
        this.div.style.overflow = 'visible';
        this.div.style.position = 'relative';
        this.overlaySVG = document.createElementNS(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["SVGNS"], 'svg');
        this.overlaySVG.style.position = 'absolute';
        this.div.appendChild(this.overlaySVG);
        this.overlayG = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.overlaySVG, 'overlay');
        this.signaturesBlinking = false;
        this.signaturesQuarters = 0;
        this.parentElement = document.createElement('div');
        this.parentElement.style.overflow = 'auto';
        this.div.appendChild(this.parentElement);
        this.ticking = false;
        this.lastKnownScrollLeft = 0;
        this.parentElement.addEventListener('scroll', this.handleScrollEvent);
        this.staffSVG = document.createElementNS(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["SVGNS"], 'svg');
        this.parentElement.appendChild(this.staffSVG);
        this.staffG = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.staffSVG, 'staff');
        this.linesG = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.staffSVG, 'lines');
        Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setStroke"])(this.linesG, _render_constants__WEBPACK_IMPORTED_MODULE_0__["LINE_STROKE"], this.getColor());
        this.staffG.appendChild(this.linesG);
        this.musicG = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.staffSVG, 'music');
        Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFill"])(this.musicG, this.getColor());
        Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setStroke"])(this.musicG, 0, this.getColor());
        this.staffG.appendChild(this.musicG);
        this.signaturesG = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.staffSVG, 'signatures');
        this.staffG.appendChild(this.signaturesG);
        this.signaturesList = [{ x: 0, q: 0 }];
        this.signatureCurrent = 0;
        this.signatureNext = 0;
        this.changeKeySignatureIfNeeded(0);
        this.changeTimeSignatureIfNeeded(0);
        this.vStepSize = this.config.noteHeight / 2;
        this.hStepSize = this.config.pixelsPerTimeStep;
        this.staffOffset = 0;
        this.height = 0;
        this.width = 0;
        this.playingNotes = [];
        this.lastBar = 0;
        this.lastQ = -1;
    }
    redraw(activeNote, scrollIntoView) {
        let activeNotePosition = -1;
        const isCompact = (this.config.pixelsPerTimeStep === 0);
        if (activeNote) {
            const keepOnPlayingNotes = [];
            this.playingNotes.forEach(note => {
                if (this.isPaintingActiveNote(note, activeNote)) {
                    keepOnPlayingNotes.push(note);
                }
                else {
                    Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["highlightElement"])(this.getGroup(note), this.getColor(false));
                }
            });
            this.playingNotes = keepOnPlayingNotes;
            const g = this.getGroup(activeNote);
            if (g) {
                this.playingNotes.push(activeNote);
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["highlightElement"])(g, this.getColor(true));
                activeNotePosition = g.getBoundingClientRect().left -
                    this.staffSVG.getBoundingClientRect().left;
                const quarters = activeNote.start;
                const isBarBeginning = g.getAttribute('data-is-bar-beginning');
                if (this.scrollType !== ScrollType.BAR || isBarBeginning) {
                    this.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
                }
                if (!isCompact && this.signaturesBlinking &&
                    quarters >= this.signaturesQuarters) {
                    this.signaturesBlinking = false;
                    Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFade"])(this.overlayG, this.signaturesBlinking);
                }
            }
        }
        else {
            const isFirstRedraw = (this.lastQ === -1);
            this.staffModel.update(this.staffInfo, this.config.defaultKey);
            let x = 0;
            let width = 0;
            if (isFirstRedraw) {
                width = this.drawSignatures(this.overlayG, x, true, true, true);
                if (isCompact) {
                    this.width = 0;
                    width += this.config.noteSpacing;
                }
            }
            else {
                x = this.width;
            }
            const linkedNoteMap = new Map();
            this.staffModel.staffBlockMap.forEach((staffBlock, quarters) => {
                if (!isCompact) {
                    x = this.staffModel.barsInfo.quartersToTime(quarters) *
                        this.hStepSize;
                }
                if (quarters > this.lastQ) {
                    width += this.drawStaffBlock(staffBlock, x + width, linkedNoteMap);
                    this.lastQ = quarters;
                }
            });
            const svgRect = this.staffSVG.getBoundingClientRect();
            const gRect = this.musicG.getBoundingClientRect();
            this.updateVerticalBoundaries(gRect.top - svgRect.top, gRect.bottom - svgRect.top);
            if (isCompact) {
                this.width += width;
            }
            else {
                const lastBlock = this.staffModel.staffBlockMap.get(this.lastQ);
                const endTime = this.staffModel.barsInfo.quartersToTime(this.lastQ + lastBlock.length);
                this.width = endTime * this.config.pixelsPerTimeStep;
            }
            this.staffSVG.setAttributeNS(null, 'width', `${this.width}`);
            this.redrawStaffLines(this.linesG, 0, this.width);
        }
        return activeNotePosition;
    }
    isPaintingActiveNote(note, activeNote) {
        const isPlayedNote = note.start === activeNote.start;
        const heldDownDuringPlayedNote = note.start <= activeNote.start &&
            note.start + note.length >= activeNote.start + activeNote.length;
        return isPlayedNote || heldDownDuringPlayedNote;
    }
    drawStaffBlock(staffBlock, x, linkedNoteMap) {
        const quarter = staffBlock.start;
        let width = this.drawBarIfNeeded(quarter, x);
        width += this.drawSignaturesIfNeeded(quarter, x + width);
        if (staffBlock.notes.length) {
            width += this.drawNotes(staffBlock, x + width, linkedNoteMap);
        }
        else {
            width += this.drawRests(staffBlock, x + width);
        }
        return width;
    }
    drawNotes(staffBlock, x, linkedNoteMap) {
        let width = 0;
        const noteHead = _svg_paths__WEBPACK_IMPORTED_MODULE_2__["NOTE_PATHS"][staffBlock.headIndex];
        let stemG;
        if (noteHead.stemAnchor) {
            stemG = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.musicG, 'stem');
        }
        staffBlock.notes.forEach(note => {
            const opacity = this.getOpacity(note.intensity);
            const y = note.vSteps * this.vStepSize;
            const start = 2 * (note.vSteps > 0 ? Math.floor(note.vSteps / 2) : Math.ceil(note.vSteps / 2));
            const delta = note.vSteps > 0 ? -2 : 2;
            for (let i = start; Math.abs(i) > 4; i += delta) {
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(this.linesG, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["extraLinePath"], x + width, i * this.vStepSize, this.scale, 1);
            }
            const _g = (note.tiedFrom) ? linkedNoteMap.get(note.tiedFrom).g :
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.musicG, `${note.start}-${note.pitch}`);
            if (staffBlock.isBarBeginning()) {
                _g.setAttribute('data-is-bar-beginning', 'true');
            }
            if (note.tiedFrom) {
                const tieWidth = x + width - linkedNoteMap.get(note.tiedFrom).xHeadRight;
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(_g, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["tiePath"], linkedNoteMap.get(note.tiedFrom).xHeadRight, y, tieWidth / _svg_paths__WEBPACK_IMPORTED_MODULE_2__["PATH_SCALE"], this.scale * (note.vSteps < 0 ? -1 : 1), opacity);
            }
            Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(_g, noteHead.path, x + width, y, this.scale, this.scale, opacity);
            const _xHeadRight = x + width + noteHead.width * this.scale;
            if (staffBlock.headAlteration === 1) {
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(_g, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["dotPath"], x + width + noteHead.width * this.scale + this.vStepSize / 2, y - this.vStepSize / 2, this.scale, this.scale, opacity);
            }
            if (note.accidental !== 0) {
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(_g, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["ACCIDENTAL_PATHS"][note.accidental], x + width, y, this.scale, this.scale, opacity);
            }
            if (note.tiedTo) {
                linkedNoteMap.set(note, { g: _g, xHeadRight: _xHeadRight });
            }
        });
        if (noteHead.stemAnchor) {
            let xStem = x + width;
            let y1, y2;
            const anchor = noteHead.stemAnchor * this.scale;
            const downwards = staffBlock.minVStep + staffBlock.maxVStep < 0;
            const multiple = (noteHead.flags > 2) ? 2 * (noteHead.flags - 2) : 0;
            if (downwards) {
                y1 = staffBlock.maxVStep * this.vStepSize - anchor;
                y2 = (staffBlock.minVStep + 7 + multiple) * this.vStepSize;
            }
            else {
                xStem += (noteHead.width - _render_constants__WEBPACK_IMPORTED_MODULE_0__["STEM_WIDTH"]) * this.scale;
                y1 = staffBlock.minVStep * this.vStepSize + anchor;
                y2 = (staffBlock.maxVStep - 7 - multiple) * this.vStepSize;
            }
            Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(stemG, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["stemPath"], xStem, y1, this.scale, (y2 - y1) / _svg_paths__WEBPACK_IMPORTED_MODULE_2__["PATH_SCALE"]);
            if (noteHead.flags === 1) {
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(stemG, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["singleFlagPath"], xStem, y2, this.scale, this.scale * (downwards ? -1 : 1), 1);
            }
            else if (noteHead.flags > 1) {
                for (let i = 0; i < noteHead.flags; ++i) {
                    Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(stemG, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["multiFlagPath"], xStem, y2, this.scale, this.scale * (downwards ? -1 : 1), 1);
                    y2 += (downwards ? -2 : 2) * this.vStepSize;
                }
            }
        }
        if (this.config.pixelsPerTimeStep === 0) {
            width += noteHead.width * this.scale;
            if (stemG) {
                width += stemG.getBoundingClientRect().width;
            }
            width += this.config.noteSpacing;
        }
        return width;
    }
    drawRests(staffBlock, x) {
        let width = 0;
        const rest = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(this.musicG, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["REST_PATHS"][staffBlock.headIndex], x + width, 0, this.scale, this.scale);
        if (this.config.pixelsPerTimeStep > 0) {
            x += this.staffModel.barsInfo.quartersToTime(staffBlock.headIndex) *
                this.hStepSize;
        }
        else {
            width += rest.getBoundingClientRect().width;
            width += this.config.noteSpacing;
        }
        return width;
    }
    redrawStaffLines(e, x, width) {
        let staff = e.querySelector('g[data-id="staff-five-lines"]');
        if (staff) {
            staff.setAttributeNS(null, 'transform', `scale(${width / _svg_paths__WEBPACK_IMPORTED_MODULE_2__["PATH_SCALE"]}, 1)`);
        }
        else {
            staff = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(e, 'staff-five-lines');
            const y = 0;
            for (let i = -4; i <= 4; i += 2) {
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(staff, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["staffLinePath"], x, y + i * this.vStepSize, width / _svg_paths__WEBPACK_IMPORTED_MODULE_2__["PATH_SCALE"], 1);
            }
        }
        return staff;
    }
    drawBarIfNeeded(quarters, x) {
        let width = 0;
        if (quarters !== 0) {
            const nextBar = this.lastBar + Object(_staff_info__WEBPACK_IMPORTED_MODULE_3__["getBarLength"])(this.currentTimeSignature);
            if (quarters >= nextBar) {
                if (this.config.pixelsPerTimeStep > 0) {
                    x -= this.config.noteSpacing;
                }
                else {
                    width = this.config.noteSpacing;
                }
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(this.linesG, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["barPath"], x, 0, 1, this.scale);
                this.lastBar = nextBar;
            }
        }
        return width;
    }
    clearSignatureOverlay() {
        while (this.overlayG.lastChild) {
            this.overlayG.removeChild(this.overlayG.lastChild);
        }
    }
    drawSignaturesIfNeeded(quarters, x) {
        let width = 0;
        if (quarters !== 0) {
            const keyChanged = this.changeKeySignatureIfNeeded(quarters);
            const timeChanged = this.changeTimeSignatureIfNeeded(quarters);
            if (keyChanged || timeChanged) {
                const clefSpacing = _render_constants__WEBPACK_IMPORTED_MODULE_0__["COMPACT_SPACING"] * this.scale *
                    (this.config.pixelsPerTimeStep > 0 ? 3 : 2);
                this.signaturesList.push({ x: x - clefSpacing, q: quarters });
                if (this.signatureNext === null) {
                    this.signatureNext = x;
                }
                const signatures = quarters > 0 ?
                    Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(this.signaturesG, 'signatures') : this.overlayG;
                width += this.drawSignatures(signatures, x + width, false, keyChanged, timeChanged);
            }
        }
        return this.config.pixelsPerTimeStep === 0 ? width : 0;
    }
    drawSignatures(e, x, drawClef, drawKey, drawTime) {
        const spacing = _render_constants__WEBPACK_IMPORTED_MODULE_0__["COMPACT_SPACING"] * this.scale;
        let width = spacing;
        let background;
        const drawBackground = e === this.overlayG || this.config.pixelsPerTimeStep > 0;
        if (drawBackground) {
            background = document.createElementNS(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["SVGNS"], 'rect');
            background.setAttributeNS(null, 'x', `${x}`);
            background.setAttributeNS(null, 'y', '0');
            background.setAttributeNS(null, 'width', '1');
            background.setAttributeNS(null, 'height', '1');
            background.setAttribute('data-id', 'background');
            e.appendChild(background);
            const upperStyle = document.defaultView.getComputedStyle(this.div.parentElement);
            background.setAttributeNS(null, 'fill', upperStyle.getPropertyValue('background-color'));
        }
        if (drawClef) {
            const clef = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(e, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["CLEF_PATHS"][this.staffModel.clef], x + width, 0, this.scale, this.scale);
            Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFill"])(clef, this.getColor());
            width += 3 * spacing;
        }
        if (drawKey) {
            const accidental = _staff_model__WEBPACK_IMPORTED_MODULE_4__["KEY_ACCIDENTALS"][this.currentKey].accidental;
            const offset = (this.staffModel.clef === 71) ? 0 : 14;
            _staff_model__WEBPACK_IMPORTED_MODULE_4__["KEY_ACCIDENTALS"][this.currentKey].pitches.forEach(pitch => {
                const steps = Object(_staff_model__WEBPACK_IMPORTED_MODULE_4__["getNoteDetails"])(pitch, this.staffModel.clef, this.currentKey).vSteps;
                const p = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(e, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["ACCIDENTAL_PATHS"][accidental], x + width, (offset + steps) * this.vStepSize, this.scale, this.scale);
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFill"])(p, this.getColor());
                width += p.getBoundingClientRect().width;
            });
        }
        if (drawTime) {
            const timeKey = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["createSVGGroupChild"])(e, 'time-key');
            const fontSize = `${2.85 * this.config.noteHeight}px`;
            Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGText"])(timeKey, `${this.currentTimeSignature.numerator}`, x + width, -0.5, fontSize, true);
            Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGText"])(timeKey, `${this.currentTimeSignature.denominator}`, x + width, 4 * this.vStepSize - 0.5, fontSize, true);
            Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFill"])(timeKey, this.getColor());
            width += timeKey.getBoundingClientRect().width + spacing;
        }
        const staff = this.redrawStaffLines(e, x, width);
        Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setStroke"])(staff, _render_constants__WEBPACK_IMPORTED_MODULE_0__["LINE_STROKE"], this.getColor());
        const divRect = this.div.getBoundingClientRect();
        const eRect = e.getBoundingClientRect();
        this.updateVerticalBoundaries(eRect.top - divRect.top, eRect.bottom - divRect.top);
        if (drawBackground) {
            background.setAttributeNS(null, 'y', `${-this.staffOffset}`);
            background.setAttributeNS(null, 'height', `${this.height}`);
            background.setAttributeNS(null, 'width', `${width}`);
        }
        if (e === this.overlayG) {
            this.overlaySVG.setAttributeNS(null, 'width', `${width + 5}`);
            for (let i = 0; i < 5; ++i) {
                const grad = Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["drawSVGPath"])(e, _svg_paths__WEBPACK_IMPORTED_MODULE_2__["stemPath"], width + i, i * i - this.staffOffset, 1 / _render_constants__WEBPACK_IMPORTED_MODULE_0__["STEM_WIDTH"], (this.height - 2 * i * i) / _svg_paths__WEBPACK_IMPORTED_MODULE_2__["PATH_SCALE"], (i - 5) * (i - 5) * 2 / _svg_paths__WEBPACK_IMPORTED_MODULE_2__["PATH_SCALE"]);
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFill"])(grad, this.getColor());
            }
        }
        if (this.config.pixelsPerTimeStep > 0) {
            const firstOverlay = this.signaturesQuarters === 0;
            if (firstOverlay) {
                this.signaturesQuarters =
                    this.staffModel.barsInfo.timeToQuarters(width / this.hStepSize);
            }
            if (firstOverlay || x > 0) {
                this.signaturesBlinking = true;
                Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFade"])(e, this.signaturesBlinking);
            }
            return 0;
        }
        else {
            return width;
        }
    }
    changeKeySignatureIfNeeded(quarters) {
        const key = this.staffModel.barsInfo.keySignatureAtQ(quarters, true);
        if (key >= 0) {
            this.currentKey = key;
            return true;
        }
        else {
            return false;
        }
    }
    changeTimeSignatureIfNeeded(quarters) {
        const ts = this.staffModel.barsInfo.timeSignatureAtQ(quarters, true);
        if (ts) {
            this.currentTimeSignature = ts;
            return true;
        }
        else {
            return false;
        }
    }
    changeAndDrawSignaturesIfNeeded(x) {
        let quarter;
        if (x < this.signatureCurrent ||
            (this.signatureNext !== null && this.signatureNext <= x)) {
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
            this.signatureNext = 0;
            this.signaturesBlinking = true;
            Object(_svg_tools__WEBPACK_IMPORTED_MODULE_1__["setFade"])(this.overlayG, this.signaturesBlinking);
        }
    }
    scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition) {
        if (scrollIntoView) {
            if (this.scrollType === ScrollType.PAGE) {
                const containerWidth = this.parentElement.getBoundingClientRect().width;
                if (activeNotePosition >
                    (this.parentElement.scrollLeft + containerWidth)) {
                    this.parentElement.scrollLeft = activeNotePosition - 20;
                }
            }
            else {
                const containerWidth = this.parentElement.getBoundingClientRect().width;
                this.parentElement.scrollLeft =
                    activeNotePosition - containerWidth * 0.5;
            }
        }
    }
    updateVerticalBoundaries(top, bottom) {
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
    getColor(isActive = false) {
        return `rgb(${isActive ? this.config.activeNoteRGB : this.config.noteRGB})`;
    }
    getOpacity(noteVelocity) {
        const opacityBaseline = 0.2;
        return noteVelocity ?
            (noteVelocity / 127) * (1 - opacityBaseline) + opacityBaseline : 1;
    }
    getGroup(note) {
        const quarters = note.start;
        const pitch = note.pitch;
        return this.staffSVG.querySelector(`g[data-id="${quarters}-${pitch}"]`);
    }
}


/***/ }),

/***/ "../src/svg_paths.ts":
/*!***************************!*\
  !*** ../src/svg_paths.ts ***!
  \***************************/
/*! exports provided: PATH_SCALE, staffLinePath, extraLinePath, barPath, stemPath, singleFlagPath, multiFlagPath, tiePath, dotPath, NOTE_PATHS, REST_PATHS, CLEF_PATHS, ACCIDENTAL_PATHS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATH_SCALE", function() { return PATH_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staffLinePath", function() { return staffLinePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extraLinePath", function() { return extraLinePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "barPath", function() { return barPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stemPath", function() { return stemPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleFlagPath", function() { return singleFlagPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiFlagPath", function() { return multiFlagPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tiePath", function() { return tiePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dotPath", function() { return dotPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTE_PATHS", function() { return NOTE_PATHS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REST_PATHS", function() { return REST_PATHS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEF_PATHS", function() { return CLEF_PATHS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCIDENTAL_PATHS", function() { return ACCIDENTAL_PATHS; });
const PATH_SCALE = 100;
const gClefPath = `M 139,48 C 102,57 76,120 131,151 41,128 64,24 129,2 L 
117,-57 C -32,47 26,217 166,182 Z m 12,-1 27,131 C 242,153 216,46 151,47 
Z m -35,-177 c 34,-23 82,-117 50,-140 -23,-17 -71,33 -50,140 z m -10,10 c 
-23,-77 -20,-200 48,-213 19,-4 89,171 -26,266 l 13,66 c 120,-6 137,155 
39,191 l 12,58 c 30,131 -137,145 -138,47 0,-29 37,-59 63,-37 21,18 25,71 
-25,70 32,42 103,0 91,-65 L 167,193 C 56,232 -112,63 106,-120 Z`;
const fClefPath = `m 101,-199 c -49,0 -100,28 -100,83 0,39 58,57 82,26 15,-20 
-4,-47 -32,-47 -23,1 -25,0 -25,-8 0,-22 40,-46 71,-41 91,16 67,208 -105,302 
75,-27 198,-94 211,-201 6,-66 -42,-114 -102,-114 z m 143,33 c -13,0 -23,11 
-23,24 0,14 10,24 23,24 13,0 23,-11 23,-24 0,-13 -10,-24 -23,-24 z m 2,83 c 
-13,0 -23,11 -23,24 0,14 10,24 23,24 13,0 23,-11 23,-24 0,-13 -10,-24 -23,-24 
z`;
const wholeHeadPath = `m 0,0 c 0,-37 49,-51 79,-51 31,0 83,13 83,51 0,39 
-55,51 -84,51 C 49,51 0,37 0,0 Z m 111,31 c 13,-19 0,-58 -22,-68 -33,-15 
-53,10 -39,49 9,27 48,39 61,19 z`;
const halfHeadPath = `m 0,10 c 0,-25 35,-60 80,-60 15,0 45,4 45,40 C 125,16 
89,50 45,50 17,50 0,36 0,10 Z m 71,7 c 17,-11 45,-34 38,-45 -7,-10 -39,1 
-57,12 -19,11 -42,31 -36,42 6,10 37,2 55,-9 z`;
const quarterHeadPath = `M 0,10 C 0,-15 35,-50 80,-50 110,-50 125,-35 125,-10 
125,15 90,50 45,50 15,50 0,35 0,10 Z`;
const sharpPath = `m -49,-121 v 52 l -29,9 v -48 h -8 v 51 l -20,6 v 29 l 
20,-6 v 70 l -20,6 v 30 l 20,-6 v 51 h 8 V 69 l 30,-8 v 50 h 8 V 58 l 20,-6 
V 23 l -20,6 v -71 l 20,-6 v -29 l -20,6 v -50 z m 1,82 v 71 l -29,9 v -71 z`;
const flatPath = `M -106,-166 V 67 c 52,-42 85,-56 85,-94 0,-47 -46,-51 
-73,-22 v -117 z m 31,120 c 20,0 42,46 -20,91 V -7 c 0,-28 10,-39 20,-39 z`;
const normalPath = `m -81,-58 v -48 H -92 V 73 l 60,-13 v 50 h 11 V -72 Z m 
50,24 v 58 l -50,11 v -58 z`;
const wholeRestPath = 'm 0,-50 h 125 v -50 H 0 Z';
const halfRestPath = 'M 0,0 H 125 V -50 H 0 Z';
const quarterRestPath = `m 0,-25 c 39,-39 37,-75 8,-120 l 6,-5 61,103 C 
40,-13 31,4 73,71 l -5,5 C 14,52 16,125 67,144 l -4,6 C -37,102 -1,22 59,60 Z`;
const eigthRestPath = `m 52,-47 c 26,-2 42,-21 48,-42 l 12,4 L 64,83 52,79 
88,-49 c 0,0 -17,22 -57,22 -16,0 -31,-13 -31,-27 0,-18 10,-31 27,-31 17,0 
33,15 25,38 z`;
const sixteenthRestPath = `m 129,-191 c -6,21 -22,40 -48,42 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 l -20,69 
c -7,18 -22,33 -45,35 8,-23 -8,-38 -25,-38 -17,0 -27,13 -27,31 0,14 15,27 
31,27 40,0 57,-22 57,-22 l -36,128 12,4 77,-270 z`;
const thirtySecondRestPath = `m 129,-191 c -6,21 -22,40 -48,42 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 l -20,69 
c -7,18 -22,33 -45,35 8,-23 -8,-38 -25,-38 -17,0 -27,13 -27,31 0,14 15,27 
31,27 40,0 57,-22 57,-22 L 68,20 C 61,37 46,51 24,52 32,29 16,14 -1,14 c 
-17,0 -27,13 -27,31 0,14 15,27 31,27 38,0 55,-20 57,-22 l -36,128 12,4 
105,-369 z`;
const sixtyFourthRestPath = `m 158,-292 c -6,21 -22,40 -48,42 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 l -17,61 
v 0 c -6,21 -22,40 -48,42 8,-23 -8,-38 -25,-38 -17,0 -27,13 -27,31 0,14 
15,27 31,27 40,0 57,-22 57,-22 l -20,69 c -7,18 -22,33 -45,35 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 L 68,20 C 
61,37 46,51 24,52 32,29 16,14 -1,14 c -17,0 -27,13 -27,31 0,14 15,27 31,27 
38,0 55,-20 57,-22 l -36,128 12,4 134,-469 z`;
const staffLinePath = 'm 0,0 h 100';
const extraLinePath = 'm -25,0 h 175';
const barPath = 'm 0,-200 v 400';
const stemPath = 'm 0,0 v 100 h 15 v -100 z';
const singleFlagPath = `M0,0 h 12 c 7,100 175,156 62,314 79,-177 -49,
-193 -61,-200 l -13,-5 z`;
const multiFlagPath = `m 0,0 h 10 c 6,72 173,64 84,227 44,-120 -44,
-123 -94,-167 z`;
const tiePath = `M 0,25 C 10,46 30,67 50,67 69,67 90,47 100,25 94,
65 73,89 50,89 26,89 5,63 0,25 Z`;
const dotPath = 'M 5 -20 a 20 20 0 1 0 0.00001 0 z';
const NOTE_PATHS = {
    4: {
        path: wholeHeadPath, width: 150, stemVSteps: 0, stemAnchor: 0,
        flags: 0
    },
    2: {
        path: halfHeadPath, width: 125, stemVSteps: 7, stemAnchor: -10,
        flags: 0
    },
    1: {
        path: quarterHeadPath, width: 125, stemVSteps: 7, stemAnchor: -10,
        flags: 0
    },
    0.5: {
        path: quarterHeadPath, width: 125, stemVSteps: 7, stemAnchor: -10,
        flags: 1
    },
    0.25: {
        path: quarterHeadPath, width: 125, stemVSteps: 9, stemAnchor: -10,
        flags: 2
    },
    0.125: {
        path: quarterHeadPath, width: 125, stemVSteps: 11, stemAnchor: -10,
        flags: 3
    },
    0.0625: {
        path: quarterHeadPath, width: 125, stemVSteps: 13, stemAnchor: -10,
        flags: 4
    }
};
const REST_PATHS = {
    4: wholeRestPath,
    2: halfRestPath,
    1: quarterRestPath,
    0.5: eigthRestPath,
    0.25: sixteenthRestPath,
    0.125: thirtySecondRestPath,
    0.0625: sixtyFourthRestPath
};
const CLEF_PATHS = {
    50: fClefPath,
    71: gClefPath
};
const ACCIDENTAL_PATHS = [null, sharpPath, flatPath, normalPath];


/***/ }),

/***/ "../src/svg_tools.ts":
/*!***************************!*\
  !*** ../src/svg_tools.ts ***!
  \***************************/
/*! exports provided: SVGNS, drawSVGPath, drawSVGText, createSVGGroupChild, setFade, setFill, setStroke, highlightElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGNS", function() { return SVGNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawSVGPath", function() { return drawSVGPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawSVGText", function() { return drawSVGText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSVGGroupChild", function() { return createSVGGroupChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFade", function() { return setFade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFill", function() { return setFill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStroke", function() { return setStroke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightElement", function() { return highlightElement; });
const SVGNS = 'http://www.w3.org/2000/svg';
function drawSVGPath(e, path, x, y, scaleX, scaleY, opacity = 1) {
    const child = document.createElementNS(SVGNS, 'path');
    child.setAttributeNS(null, 'd', path);
    child.setAttributeNS(null, 'transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`);
    child.setAttributeNS(null, 'opacity', `${opacity}`);
    e.appendChild(child);
    return child;
}
function drawSVGText(e, text, x, y, fontSize, isBold = false, scaleX = 1, scaleY = 1) {
    const child = document.createElementNS(SVGNS, 'text');
    child.setAttributeNS(null, 'font-family', 'Times');
    child.setAttributeNS(null, 'font-size', fontSize);
    if (isBold) {
        child.setAttributeNS(null, 'font-weight', 'bold');
    }
    child.setAttributeNS(null, 'transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`);
    const textNode = document.createTextNode(text);
    child.appendChild(textNode);
    e.appendChild(child);
    return child;
}
function createSVGGroupChild(e, id) {
    const child = document.createElementNS(SVGNS, 'g');
    child.setAttribute('data-id', id);
    e.appendChild(child);
    return child;
}
function setFade(e, bounce = false, from = 1, to = 0) {
    let animation = e.querySelector(`animate`);
    if (!animation) {
        animation = document.createElementNS(SVGNS, 'animate');
        animation.setAttributeNS(null, 'attributeName', 'opacity');
        animation.setAttributeNS(null, 'dur', '4s');
        animation.setAttributeNS(null, 'fill', 'freeze');
        animation.setAttributeNS(null, 'keyTimes', '0; 0.25; 0.5; 0.75; 1');
        const easyIn = (from + 3 * to) / 4;
        animation.setAttributeNS(null, 'values', `${from}; ${easyIn}; ${to}; ${easyIn}; ${from}`);
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
function setFill(e, color) {
    e.setAttributeNS(null, 'fill', color);
}
function setStroke(e, strokeWidth, color) {
    e.setAttributeNS(null, 'stroke-width', `${strokeWidth}`);
    e.setAttributeNS(null, 'stroke', color);
}
function highlightElement(e, color) {
    e.setAttribute('fill', color);
    e.setAttribute('stroke', color);
}


/***/ }),

/***/ "../test/basic_symbols_features.ts":
/*!*****************************************!*\
  !*** ../test/basic_symbols_features.ts ***!
  \*****************************************/
/*! exports provided: testData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testData", function() { return testData; });
const testData = [];
var position = 0;
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
        testData[0].data.notes.push({ start: position, length: duration, pitch: notePitch, intensity: 127 });
        position += duration;
    }
}
testData[1] = {
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
    rest. Last note has been placed to complete the bar and make previous rest \
    noticeable.`,
    data: {
        notes: [],
    }
};
position = 0;
for (let n = 1; n < 128; n *= 2) {
    const duration = 4 / n;
    testData[2].data.notes.push({ start: position, length: duration, pitch: 67, intensity: 127 });
    position += 2 * duration;
}
testData[2].data.notes.push({ start: position, length: 0.125, pitch: 67, intensity: 127 });
testData[3] = {
    title: `Dotted notes`,
    description: `Note length can be extended to a 150% of its nominal value \
    adding a dot after the note symbol. This applies to all note symbols but \
    it will not be applied to rests symbols, besides it is not forbidden under \
    some circumstances, following the classical music transcription chriteria \
    disrecommending the use of dotted rests in order to ease the readability. \
    Last note is included to make previous rests noticeable.`,
    data: {
        notes: [
            { start: 0, length: 3, pitch: 67, intensity: 127 },
            { start: 3.75, length: 0.25, pitch: 67, intensity: 127 }
        ],
    }
};
testData[4] = {
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
testData[5] = {
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
        keySignatures: [{ start: 0, key: 7 }],
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
        keySignatures: [{ start: 0, key: 5 }],
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
            { start: 0, key: 0 },
            { start: 12, key: 7 },
            { start: 24, key: 2 },
            { start: 36, key: 9 },
            { start: 48, key: 4 },
            { start: 60, key: 11 },
            { start: 72, key: 5 },
            { start: 84, key: 10 },
            { start: 96, key: 3 },
            { start: 108, key: 8 },
            { start: 120, key: 1 },
            { start: 132, key: 6 }
        ],
        notes: [],
    }
};
position = 0;
for (let n = 0; n < 12; ++n) {
    for (let p = 60; p < 72; ++p) {
        testData[8].data.notes.push({ start: position++, length: 1, pitch: p, intensity: 127 });
    }
}
testData[9] = {
    title: `Time Signatures`,
    description: `Notes can be gropued on bars according to "beat" rhythm \
    patterns, defined by Time Signatures consisting on a numerator and a \
    denominator number. Denominator defines the length of its beat as the \
    fraction of a whole note, and numerator defines the number of beats \
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
        data.timeSignatures.push({ start: position, numerator: n, denominator: d });
        for (let i = 0; i < n; ++i) {
            data.notes.push({ start: position, length: l, pitch: 67, intensity: 127 });
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
            { start: 0, numerator: 3, denominator: 4 },
            { start: 6, numerator: 6, denominator: 8 },
            { start: 12, numerator: 7, denominator: 2 },
            { start: 40, numerator: 4, denominator: 4 }
        ],
        notes: [
            { start: 3, length: 3, pitch: 67, intensity: 127 },
            { start: 9, length: 3, pitch: 67, intensity: 127 },
            { start: 26, length: 14, pitch: 67, intensity: 127 },
            { start: 44, length: 4, pitch: 67, intensity: 127 },
        ]
    }
};
testData[11] = {
    title: `Ties`,
    description: `Notes longer than avilable note symbols length can be achieved \
  combining two or more through ties. Notes which surpass bars must be \
  splitted using ties. Rest aggregation does not need any tie. Following score \
  shows three tied notes, a rests set and two tied notes to surpass a bar.`,
    data: {
        notes: [
            { start: 0, length: 2 + 1 / 2 + 1 / 8, pitch: 67, intensity: 127 },
            { start: 3, length: 5, pitch: 67, intensity: 127 }
        ],
    }
};


/***/ }),

/***/ "../test/rhythm_split_features.ts":
/*!****************************************!*\
  !*** ../test/rhythm_split_features.ts ***!
  \****************************************/
/*! exports provided: testData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testData", function() { return testData; });
const testData = [];
testData[0] = {
    title: `Uncomplete beat fulfillment`,
    description: `Notes should be splited and tied to make clear where does a \
    beat starts and ends, easing the rhythm readability.`,
    data: {
        notes: [
            { start: 0, length: 0.5, pitch: 67, intensity: 127 },
            { start: 0.5, length: 1, pitch: 67, intensity: 127 },
            { start: 1.5, length: 2.5, pitch: 67, intensity: 127 }
        ],
    }
};
testData[1] = {
    title: `Ties and rests ordering`,
    description: `The order of tied notes or rests groups uses to be decreasing \
    lengths from longer duration symbols to shorter ones, unless such group of \
    symbols complete a beat within a bar, in which case they will be ordered \
    increasing lengths from shorter to longer symbols in order to \
    symmetrically complete the starting part of the beat. Following score \
    shows three decreasing tied notes, an increasing rests set, followed by a \
    decreasing rest set and two ascending tied notes till the end of the bar, \
    tied again to note in next bar, followed by an ascending rest set to \
    complete the beat and then a regular decreasing rest. Last note makes \
    previous rest noticeable.`,
    data: {
        notes: [
            { start: 0, length: 2 + 1 / 2 + 1 / 8, pitch: 67, intensity: 127 },
            { start: 4 - (1 / 4 + 1 / 16), length: 1 / 4 + 2 / 16, pitch: 67, intensity: 127 },
            { start: 8, length: 4, pitch: 67, intensity: 127 }
        ],
    }
};


/***/ }),

/***/ "./src/features.ts":
/*!*************************!*\
  !*** ./src/features.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_staff_svg_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/staff_svg_render */ "../src/staff_svg_render.ts");
/* harmony import */ var _test_basic_symbols_features__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../test/basic_symbols_features */ "../test/basic_symbols_features.ts");
/* harmony import */ var _test_rhythm_split_features__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../test/rhythm_split_features */ "../test/rhythm_split_features.ts");

const config = {
    noteHeight: 15,
    pixelsPerTimeStep: 0,
    instruments: [0],
    defaultKey: 0,
    scrollType: _src_staff_svg_render__WEBPACK_IMPORTED_MODULE_0__["ScrollType"].BAR
};
function visualize(div, test) {
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
    new _src_staff_svg_render__WEBPACK_IMPORTED_MODULE_0__["StaffSVGRender"](test.data, config, scoreDiv);
}

const bsDiv = document.getElementById('basicSymbols');
_test_basic_symbols_features__WEBPACK_IMPORTED_MODULE_1__["testData"].forEach(test => visualize(bsDiv, test));

const rsDiv = document.getElementById('rhythmSplit');
_test_rhythm_split_features__WEBPACK_IMPORTED_MODULE_2__["testData"].forEach(test => visualize(rsDiv, test));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9iYXJzX2luZm8udHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tb2RlbF9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXJfY29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3RhZmZfYmxvY2sudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9zdGFmZl9pbmZvLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3RhZmZfbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9zdGFmZl9zdmdfcmVuZGVyLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3ZnX3BhdGhzLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3ZnX3Rvb2xzLnRzIiwid2VicGFjazovLy8uLi90ZXN0L2Jhc2ljX3N5bWJvbHNfZmVhdHVyZXMudHMiLCJ3ZWJwYWNrOi8vLy4uL3Rlc3Qvcmh5dGhtX3NwbGl0X2ZlYXR1cmVzLnRzIiwid2VicGFjazovLy8uL3NyYy9mZWF0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNB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QUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUU7Q0FDakUsQ0FBQztBQU1LLE1BQU0sZUFBZSxHQUFHO0lBQzdCLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFDO0lBQzVCLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7SUFDOUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztJQUNsQyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztJQUN0QyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7SUFDMUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0lBQzlCLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0lB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Q2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtTQUNwRDtLQUNGO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRztJQUNaLEtBQUssRUFBRSxvQkFBb0I7SUFDM0IsV0FBVyxFQUFFOzs7OzsrRUFLZ0U7SUFDN0UsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFO1lBQ0wsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ3BEO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQ1osS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixXQUFXLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs4RUFlK0Q7SUFDNUUsSUFBSSxFQUFFO1FBQ0osYUFBYSxFQUFFLENBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBRTtRQUN2QyxLQUFLLEVBQUU7WUFDTCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7U0FDbkQ7S0FDRjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUc7SUFDWixLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLFdBQVcsRUFBRTs7OzJDQUc0QjtJQUN6QyxJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUUsQ0FBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFFO1FBQ3ZDLEtBQUssRUFBRTtZQUNMLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFB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QUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFFLENBQUMiLCJmaWxlIjoiZmVhdHVyZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9mZWF0dXJlcy50c1wiKTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1xuICBTdGFmZkluZm8sIFRlbXBvSW5mbywgVGltZVNpZ25hdHVyZUluZm8sIEtleVNpZ25hdHVyZUluZm8sIGdldEJhckxlbmd0aFxufSBmcm9tICcuL3N0YWZmX2luZm8nO1xuXG5pbXBvcnQgeyBcbiAgTUFYX1FVQVJURVJfRElWSVNJT05cbn0gZnJvbSAnLi9tb2RlbF9jb25zdGFudHMnO1xuICBcbi8qKlxuICogU3RvcmVzIHRoZSBzY29yZSBzdHJ1Y3R1cmFsIGluZm8gaW4gY2h1bmtzLCBsaWtlIHNpZ25hdHVyZXMgYW5kIGJhciBkZXRhaWxzLCBcbiAqIGluIG9yZGVyIHRvIHVzZSBpdCBmb3IgYmFyIGhhbmRsaW5nLiBFdmVyeSBjaHVuayBhcHBsaWVzIGZyb20gaXRzIHN0YXJ0XG4gKiBwb2ludCB0byB0aGUgbmV4dCBvbmUuIFRoaXMgaW5mbyBjYW4gYmUgZWFzaWx5IGluZGV4ZWQgdG8gZG8gYSBmYXN0IGxvb2t1cC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCYXJJbmZvIHtcbiAgLyoqIFdoZXJlIGFsbCB0aGlzIGluZm8gc3RhcnRzIGFwcGx5aW5nICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKiBUaGUgYXBwbGljYWJsZSBiYXIgbnVtYmVyIGluIHRoaXMgY2h1bmsgKi9cbiAgYmFyTnVtYmVyOiBudW1iZXI7XG4gIC8qKiBUaGUgYXBwbGljYWJsZSBiYXIgbGVuZ3RoIGluIHRoaXMgY2h1bmsgKi9cbiAgYmFyTGVuZ3RoOiBudW1iZXI7XG4gIC8qKiBUaGUgYXBwbGljYWJsZSB0ZW1wbyBpbiB0aGlzIGNodW5rICovXG4gIHRlbXBvOiBUZW1wb0luZm87XG4gIC8qKiBUaGUgYXBwbGljYWJsZSBLZXkgU2lnbmF0dXJlIGluIHRoaXMgY2h1bmsgKi9cbiAga2V5U2lnbmF0dXJlOiBLZXlTaWduYXR1cmVJbmZvO1xuICAvKiogVGhlIGFwcGxpY2FibGUgVGltZSBTaWduYXR1cmUgaW4gdGhpcyBjaHVuayAqL1xuICB0aW1lU2lnbmF0dXJlOiBUaW1lU2lnbmF0dXJlSW5mbztcbiAgLyoqIFdldGhlciB0aGUgVGVtcG8gY2hhbmdlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgY2h1bmsgKi9cbiAgdGVtcG9DaGFuZ2U/OiBib29sZWFuO1xuICAvKiogV2V0aGVyIHRoZSBLZXkgU2lnbmF0dXJlIGNoYW5nZWQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzIGNodW5rICovXG4gIGtleUNoYW5nZT86IGJvb2xlYW47XG4gIC8qKiBXZXRoZXIgdGhlIFRpbWUgU2lnbmF0dXJlIGNoYW5nZWQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzIGNodW5rICovXG4gIHRpbWVDaGFuZ2U/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgZnJhbWV3b3JrIGZvciBCYXJJbmZvIGluZGV4aW5nIGFuZCBmYXN0IHRyYXZlcnNpbmcgaW4gaXJkZXIgdG8gXG4gKiBsb2NhdGUgdGhlIHN0cnVjdHVyYWwgaW5mbyByZWxhdGVkIHRvIGFueSBub3RlLiBJdCBjdXJyZW50bHkgc3RvcmVzIHRoZSBpbmZvIFxuICogaW4gY2h1bmtzIGFzIHNob3J0IGFzIGEgc2l4dHlmb3VydGggbm90ZSwgaS5lLiB0aGUgc2hvcnRlc3QgbWFuYWdlYWJsZVxuICogYmVhdCAobGlrZSBpbiA0LzY0IFRpbWUgU2lnbmF0dXJlKS5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhcnNJbmZvIHtcbiAgLyoqIEZsYWcgdG8gZGVmaW5lIGRvdHRlZCByZXN0cyBjb25maWd1dGFyaW9uIChtYXkgY2hhbmdlIGluIGEgZnV0dXJlKS4gKi9cbiAgcHVibGljIGFsbG93RG90dGVkUmVzdHM/OiBib29sZWFuO1xuICAvKiogSW50ZXJuYWwgc3RvcmFnZSBvZiBzdHJ1Y3R1cmFsIGNodW5rcy4gKi9cbiAgcHJpdmF0ZSBiYXJzSW5mbzogQmFySW5mb1tdO1xuXG4gIC8qKiBcbiAgICogRmlsbHMgdGhlIHJlZmVyZW5jZSBpbmZvIChiYXIsIHRlbXBvLCB0aW1lIHNpZ25hdHVyZSBhbmQga2V5IHNpZ25hdHVyZSlcbiAgICogaW4gYSBwZXIgY2h1bmsgYXJyYXkgYXMgYSBmYXN0IG1ldGhvZCB0byBmdXJ0aGUgZmlsbCBkZXRhaWxzIGluIGJsb2Nrcy5cbiAgICogQHBhcmFtIHN0YWZmSW5mbyBUaGUgc3RhZmYgaW5mb3JtYXRpb24gZ2V0IHJlZmVyZW5jZXMgZnJvbS5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChzdGFmZkluZm86IFN0YWZmSW5mbywgbGFzdFE6IG51bWJlcikge1xuICAgIHRoaXMuYmFyc0luZm8gPSBbXTtcbiAgICBsZXQgdGVtcG9JbmRleCA9IDA7XG4gICAgbGV0IGtleUluZGV4ID0gMDtcbiAgICBsZXQgdGltZUluZGV4ID0gMDtcbiAgICBsZXQgY3VycmVudFRlbXBvID0gc3RhZmZJbmZvLnRlbXBvc1swXTtcbiAgICBsZXQgY3VycmVudEtleVNpZ25hdHVyZSA9IHN0YWZmSW5mby5rZXlTaWduYXR1cmVzWzBdO1xuICAgIGxldCBjdXJyZW50VGltZVNpZ25hdHVyZSA9IHN0YWZmSW5mby50aW1lU2lnbmF0dXJlc1swXTtcbiAgICBsZXQgYmFyTnVtYmVyQXRDdXJyZW50VGltZVNpZ25hdHVyZSA9IDA7XG4gICAgbGV0IGN1cnJlbnRCYXJMZW5ndGggPSBnZXRCYXJMZW5ndGgoY3VycmVudFRpbWVTaWduYXR1cmUpO1xuICAgIGZvciAobGV0IHF1YXJ0ZXJzID0gMDsgcXVhcnRlcnMgPCBsYXN0UTsgcXVhcnRlcnMgKz0gMS8xNikgeyAvLyBBbGwgcXVhcnRlcnNcbiAgICAgIGNvbnN0IGJhckluZm86IEJhckluZm8gPSB7IFxuICAgICAgICBzdGFydDogcXVhcnRlcnMsXG4gICAgICAgIGJhck51bWJlcjogYmFyTnVtYmVyQXRDdXJyZW50VGltZVNpZ25hdHVyZSArIFxuICAgICAgICAgIChxdWFydGVycyAtIGN1cnJlbnRUaW1lU2lnbmF0dXJlLnN0YXJ0KSAvIGN1cnJlbnRCYXJMZW5ndGgsIFxuICAgICAgICBiYXJMZW5ndGg6IGN1cnJlbnRCYXJMZW5ndGgsXG4gICAgICAgIHRlbXBvOiBjdXJyZW50VGVtcG8sXG4gICAgICAgIGtleVNpZ25hdHVyZTogY3VycmVudEtleVNpZ25hdHVyZSxcbiAgICAgICAgdGltZVNpZ25hdHVyZTogY3VycmVudFRpbWVTaWduYXR1cmVcbiAgICAgIH07XG4gICAgICBpZiAoXG4gICAgICAgIHRlbXBvSW5kZXggPCBzdGFmZkluZm8udGVtcG9zLmxlbmd0aCAmJiBcbiAgICAgICAgc3RhZmZJbmZvLnRlbXBvc1t0ZW1wb0luZGV4XS5zdGFydCA9PT0gcXVhcnRlcnNcbiAgICAgICkgeyAvLyBSZWdpc3RlciBhIHRlbXBvIGNoYW5nZSBpbiB0aGlzIHF1YXJ0ZXJcbiAgICAgICAgY3VycmVudFRlbXBvID0gc3RhZmZJbmZvLnRlbXBvc1t0ZW1wb0luZGV4KytdO1xuICAgICAgICBiYXJJbmZvLnRlbXBvID0gY3VycmVudFRlbXBvO1xuICAgICAgICBiYXJJbmZvLnRlbXBvQ2hhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICggLy8gUmVnaXN0ZXIgYSBrZXkgc2lnbmF0dXJlIGNoYW5nZSBpbiB0aGlzIHF1YXJ0ZXJcbiAgICAgICAga2V5SW5kZXggPCBzdGFmZkluZm8ua2V5U2lnbmF0dXJlcy5sZW5ndGggJiYgXG4gICAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzW2tleUluZGV4XS5zdGFydCA9PT0gcXVhcnRlcnNcbiAgICAgICkge1xuICAgICAgICBjdXJyZW50S2V5U2lnbmF0dXJlID0gc3RhZmZJbmZvLmtleVNpZ25hdHVyZXNba2V5SW5kZXgrK107XG4gICAgICAgIGJhckluZm8ua2V5U2lnbmF0dXJlID0gY3VycmVudEtleVNpZ25hdHVyZTtcbiAgICAgICAgYmFySW5mby5rZXlDaGFuZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aW1lSW5kZXggPCBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMubGVuZ3RoICYmIFxuICAgICAgICBzdGFmZkluZm8udGltZVNpZ25hdHVyZXNbdGltZUluZGV4XS5zdGFydCA9PT0gcXVhcnRlcnNcbiAgICAgICkgeyAvLyBSZWdpc3RlciBhIHRpbWUgc2lnbmF0dXJlIGluIHRoaXMgcXVhcnRlclxuICAgICAgICBiYXJOdW1iZXJBdEN1cnJlbnRUaW1lU2lnbmF0dXJlID0gYmFySW5mby5iYXJOdW1iZXI7IC8vIE5ldyB0LnMuIHN0YXJ0XG4gICAgICAgIGN1cnJlbnRUaW1lU2lnbmF0dXJlID0gc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzW3RpbWVJbmRleCsrXTtcbiAgICAgICAgYmFySW5mby50aW1lU2lnbmF0dXJlID0gY3VycmVudFRpbWVTaWduYXR1cmU7XG4gICAgICAgIGN1cnJlbnRCYXJMZW5ndGggPSBnZXRCYXJMZW5ndGgoY3VycmVudFRpbWVTaWduYXR1cmUpO1xuICAgICAgICBiYXJJbmZvLmJhckxlbmd0aCA9IGN1cnJlbnRCYXJMZW5ndGg7XG4gICAgICAgIGJhckluZm8udGltZUNoYW5nZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmJhcnNJbmZvLnB1c2goYmFySW5mbyk7XG4gICAgfSAgICAgIFxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGJhciBudW1iZXIgb2YgYSBub3RlIHN0YXJ0aW5nIGF0IGEgZ2l2ZW4gcG9zaXRpb24uIEl0IHdpbGwgYmUgYW5cbiAgICogaW50ZWdlciB2YWx1ZSBpZiBpdCByZWxpZXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYmFyLCBhbmQgaXQgd2lsbCBcbiAgICogcmVmbGVjdCB0aGUgcG9zaXRpb24gd2l0aGluIHRoZSBiYXIgYWxvbmcgd2l0aCB0aGUgZGVjaW1hbHMgKGEgbm90ZSBcbiAgICogc3RhcnRpbmcgaW4gdGhlIG1pZGRsZSBvZiB0aGUgdGhpcmQgNC80IGJhciB3aWxsIHJldHVybiAzLjUpXG4gICAqIEBwYXJhbSBxdWFydGVycyAgXG4gICAqL1xuICBwdWJsaWMgYmFyTnVtYmVyQXRRKHN0YXJ0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IHRoaXMuYmFyc0luZm9bTWF0aC50cnVuYyhzdGFydCAqIDE2KV07XG4gICAgY29uc3QgcXVhcnRlcnNBZHZhbmNlID0gc3RhcnQgLSByZWZlcmVuY2Uuc3RhcnQ7XG4gICAgY29uc3QgYmFyQWR2YW5jZVNpbmNlUmVmZXJlbmNlID0gcXVhcnRlcnNBZHZhbmNlIC8gcmVmZXJlbmNlLmJhckxlbmd0aDtcbiAgICByZXR1cm4gcmVmZXJlbmNlLmJhck51bWJlciArIGJhckFkdmFuY2VTaW5jZVJlZmVyZW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBiYXIgbGVuZ3RoIGF0IGEgcXVhcnRlciBvbiB0aGUgc3RhZmZcbiAgICogQHBhcmFtIHF1YXJ0ZXIgUXVhcnRlciB0byBsb29rIHRoZSBiYXIgbGVuZ2h0IGF0XG4gICAqIEByZXR1cm5zIFRoZSBsZW5ndGggb2YgdGhlIGJhciBhdCBnaXZlbiBxdWFydGVyIFxuICAgKi9cbiAgcHVibGljIGJhckxlbmdodEF0UShzdGFydDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5iYXJzSW5mb1tNYXRoLnRydW5jKHN0YXJ0ICogMTYpXS5iYXJMZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdGVtcG8gaW4gcXBtIGF0IGEgcXVhcnRlciBvbiB0aGUgc3RhZmYuICoqTk9URSoqOiBpdCBkb2Vzbid0IFxuICAgKiBjb3ZlciB0ZW1wbyBjaGFuZ2VzIHlldCwgYW5kIGFzc3VtZXMgc2NvcmUga2VlcHMgaXQgc3RhYmxlIHRpbGwgdGhlIGVuZC5cbiAgICogQHBhcmFtIHF1YXJ0ZXJzIFF1YXJ0ZXIgdG8gbG9vayBrZXkgc2lnbmF0dXJlIGF0XG4gICAqIEBwYXJhbSBvbmx5Q2hhbmdlcyBJZiB0cnVlIHJldHVybnMgLTEgaW4gY2FzZSB0aGVyZSdzIG5vIGNoYW5nZSBhdCBxdWFydGVyc1xuICAgKiBAcmV0dXJucyBUaGUga2V5IHdoaWNoIGlzIG9wZXJhdGl2ZSBhdCBnaXZlbiBxdWFydGVyLCBvciAtMSBpZiBuZWVkZWRcbiAgICovXG4gIHB1YmxpYyB0ZW1wb0F0UShcbiAgICBfc3RhcnQ6IG51bWJlciwgb25seUNoYW5nZXMgPSBmYWxzZVxuICApOiBudW1iZXIge1xuICAgIGNvbnN0IGJhckluZm8gPSB0aGlzLmJhcnNJbmZvWzBdOyAvLyBXaWxsIGJlIF9zdGFydCBpbnN0ZWFkIDBcbiAgICByZXR1cm4gIW9ubHlDaGFuZ2VzIHx8IGJhckluZm8udGVtcG9DaGFuZ2U/IGJhckluZm8udGVtcG8ucXBtOiAtMTtcbiAgfSBcbiAgXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBrZXkgc2lnbmF0dXJlIGF0IGEgcXVhcnRlciBvbiB0aGUgc3RhZmZcbiAgICogQHBhcmFtIHF1YXJ0ZXJzIFF1YXJ0ZXIgdG8gbG9vayBrZXkgc2lnbmF0dXJlIGF0XG4gICAqIEBwYXJhbSBvbmx5Q2hhbmdlcyBJZiB0cnVlIHJldHVybnMgLTEgaW4gY2FzZSB0aGVyZSdzIG5vIGNoYW5nZSBhdCBxdWFydGVyc1xuICAgKiBAcmV0dXJucyBUaGUga2V5IHdoaWNoIGlzIG9wZXJhdGl2ZSBhdCBnaXZlbiBxdWFydGVyLCBvciAtMSBpZiBuZWVkZWRcbiAgICovXG4gIHB1YmxpYyBrZXlTaWduYXR1cmVBdFEoXG4gICAgc3RhcnQ6IG51bWJlciwgb25seUNoYW5nZXMgPSBmYWxzZVxuICApOiBudW1iZXIge1xuICAgIGNvbnN0IGJhckluZm8gPSB0aGlzLmJhcnNJbmZvW01hdGgudHJ1bmMoc3RhcnQgKiAxNildO1xuICAgIHJldHVybiAhb25seUNoYW5nZXMgfHwgYmFySW5mby5rZXlDaGFuZ2U/IGJhckluZm8ua2V5U2lnbmF0dXJlLmtleTogLTE7XG4gIH0gXG4gIFxuICAvKipcbiAgICogR2V0cyB0aGUgdGltZSBzaWduYXR1cmUgYXQgYSBxdWFydGVyIG9uIHRoZSBzdGFmZlxuICAgKiBAcGFyYW0gcXVhcnRlciBRdWFydGVyIHRvIGxvb2sgdGltZSBzaWduYXR1cmUgYXRcbiAgICogQHBhcmFtIG9ubHlDaGFuZ2VzIElmIHRydWUgcmV0dXJucyBudWxsIGluIGNhc2UgdGhlcmUncyBubyBjaGFuZ2UgYXQgcS5cbiAgICogQHJldHVybnMgVGhlIHRpbWUgc2lnbmF0dXJlIHdoaWNoIGlzIG9wZXJhdGl2ZSBhdCBnaXZlbiBxdWFydGVyLCBvciBudWxsXG4gICAqL1xuICBwdWJsaWMgdGltZVNpZ25hdHVyZUF0UShcbiAgICBzdGFydDogbnVtYmVyLCBvbmx5Q2hhbmdlcyA9IGZhbHNlXG4gICk6IFRpbWVTaWduYXR1cmVJbmZvIHtcbiAgICBjb25zdCBiYXJJbmZvID0gdGhpcy5iYXJzSW5mb1tNYXRoLnRydW5jKHN0YXJ0ICogMTYpXTtcbiAgICByZXR1cm4gIW9ubHlDaGFuZ2VzIHx8IGJhckluZm8udGltZUNoYW5nZT8gYmFySW5mby50aW1lU2lnbmF0dXJlOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBnaXZlbiBhbW91bnQgb2YgcXVhcnRlcnMgdG8gc2Vjb25kcy4gKipOT1RFKio6IGl0IGRvZXNuJ3QgXG4gICAqIGNvdmVyIHRlbXBvIGNoYW5nZXMgeWV0LCBhbmQgYXNzdW1lcyBzY29yZSBrZWVwcyBpdCBzdGFibGUgdGlsbCB0aGUgZW5kLlxuICAgKiBAcGFyYW0gcXVhcnRlcnMgVGhlIGdpdmVuIGFtb3VudCBvZiBxdWFydGVyc1xuICAgKiBAcmV0dXJucyBUaGUgZXF1aXZhbGVudCBhbW91bnQgb2Ygc2Vjb25kc1xuICAgKi9cbiAgcHVibGljIHF1YXJ0ZXJzVG9UaW1lKHF1YXJ0ZXJzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBxdWFydGVycyAvIHRoaXMuYmFyc0luZm9bMF0udGVtcG8ucXBtICogNjA7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgZ2l2ZW4gYW1vdW50IG9mIHNlY29uZHMgdG8gcXVhcnRlcnMuICoqTk9URSoqOiBpdCBkb2Vzbid0IFxuICAgKiBjb3ZlciB0ZW1wbyBjaGFuZ2VzIHlldCwgYW5kIGFzc3VtZXMgc2NvcmUga2VlcHMgaXQgc3RhYmxlIHRpbGwgdGhlIGVuZC5cbiAgICogSXQgd2lsbCBiZSByb3VuZGVkIHRvIG1pbmltdW0gbm90ZSBkaXZpc2lvbiB0byBhdm9pZCBKYXZhU2NyaXB0IG51bWJlclxuICAgKiByb3VuZGluZyBpc3N1ZXMuXG4gICAqIEBwYXJhbSBxdWFydGVycyBUaGUgZ2l2ZW4gYW1vdW50IG9mIHNlY29uZHNcbiAgICogQHJldHVybnMgVGhlIGVxdWl2YWxlbnQgYW1vdW50IG9mIHF1YXJ0ZXJzXG4gICAqL1xuICBwdWJsaWMgdGltZVRvUXVhcnRlcnModGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBxID0gdGltZSAqIHRoaXMuYmFyc0luZm9bMF0udGVtcG8ucXBtIC8gNjA7XG4gICAgcmV0dXJuIE1hdGgucm91bmQocSAqIE1BWF9RVUFSVEVSX0RJVklTSU9OKSAvIE1BWF9RVUFSVEVSX0RJVklTSU9OO1xuICB9XG5cbn0gICIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG4vKiogMS8xNiBvZiBhIHF1YXJ0ZXIgbm90ZSAoMS82NHRoIG5vdGUpICovXG5leHBvcnQgY29uc3QgTUlOX1JFU09MVVRJT04gPSAwLjA2MjU7IC8vIFRPRE86IFVuaWZ5XG5cbi8qKiBcbiAqIE1pbmltYWwgZHVyYXRpb24gcmVjb2duaXplZCBub3RlLCB3aGljaCBjdXJyZW50bHkgaXMgdmFsaWQgZm9yIHNpeHR5Zm91cnRoIFxuICogbm90ZSAoMS8xNiBvZiBhIHF1YXJ0ZXIgbm90ZSkgdHJpcGxldHMgYW5kIHF1aW50dXBsZXRzLlxuICovXG5leHBvcnQgY29uc3QgTUFYX1FVQVJURVJfRElWSVNJT04gPSAxNiozKjU7IC8vIFRPRE86IG1lcmdlIHdpdGggZXF1aXZhbGVudCBjb25zdGFudHNcblxuLyoqIENocm9tYXRpYyBzY2FsZXMgcGVyIGtleSwgZW5jb2RlZCBmb3Igc3RhZmYgbm90ZSBwbGFjZW1lbnQgKi9cbmV4cG9ydCBjb25zdCBTQ0FMRVMgPSBbIC8vIEFjY2lkZW50YWxzOiAwPW5vbmUsIDE9c2hhcnAsIDI9ZmxhdCwgMz1ub3JtYWxcbiAgeyAvLyBDaHJvbWF0aWMgIEMgQyMvRGIgRCBEIy9FYiBFICAgRiBGIy9HYiBHIEcjL0FiIEEgQSMvQmIgQiAgIC8gS0VZXG4gICAgc3RlcHM6ICAgICAgWyAwLCAgMCwgLTEsIC0xLCAtMiwgLTMsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTZdLCAvLyBDXG4gICAgYWNjaWRlbnRhbDogWyAwLCAgMSwgIDAsICAxLCAgMCwgIDAsICAxLCAgMCwgIDEsICAwLCAgMSwgIDBdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsIC0xLCAtMSwgLTIsIC0yLCAtMywgLTQsIC00LCAtNSwgLTUsIC02LCAtNl0sIC8vIERiXG4gICAgYWNjaWRlbnRhbDogWyAwLCAgMCwgIDMsICAwLCAgMywgIDAsICAwLCAgMywgIDAsICAzLCAgMCwgIDNdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsICAwLCAtMSwgLTEsIC0yLCAtMywgLTMsIC00LCAtNCwgLTUsIC01LCAtNl0sIC8vIERcbiAgICBhY2NpZGVudGFsOiBbIDMsICAwLCAgMCwgIDEsICAwLCAgMywgIDAsICAwLCAgMSwgIDAsICAxLCAgMF0gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgLTEsIC0xLCAtMiwgLTIsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTYsIC02XSwgLy8gRWJcbiAgICBhY2NpZGVudGFsOiBbIDAsICAyLCAgMCwgIDAsICAzLCAgMCwgIDIsICAwLCAgMCwgIDMsICAwLCAgM10gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgIDAsIC0xLCAtMSwgLTIsIC0zLCAtMywgLTQsIC00LCAtNSwgLTUsIC02XSwgLy8gRVxuICAgIGFjY2lkZW50YWw6IFsgMywgIDAsICAzLCAgMCwgIDAsICAzLCAgMCwgIDMsICAwLCAgMCwgIDEsICAwXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAtMSwgLTEsIC0yLCAtMiwgLTMsIC00LCAtNCwgLTUsIC01LCAtNiwgLTZdLCAvLyBGXG4gICAgYWNjaWRlbnRhbDogWyAwLCAgMiwgIDAsICAyLCAgMCwgIDAsICAyLCAgMCwgIDIsICAwLCAgMCwgIDNdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsIC0xLCAtMSwgLTIsIC0yLCAtMywgLTQsIC00LCAtNSwgLTUsIC02LCAtN10sIC8vIEdiXG4gICAgYWNjaWRlbnRhbDogWyAzLCAgMCwgIDMsICAwLCAgMywgIDAsICAwLCAgMywgIDAsICAzLCAgMCwgIDBdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsICAwLCAtMSwgLTEsIC0yLCAtMywgLTMsIC00LCAtNCwgLTUsIC01LCAtNl0sIC8vIEdcbiAgICBhY2NpZGVudGFsOiBbIDAsICAxLCAgMCwgIDEsICAwLCAgMywgIDAsICAwLCAgMSwgIDAsICAxLCAgMF0gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgLTEsIC0xLCAtMiwgLTIsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTYsIC02XSwgLy8gQWJcbiAgICBhY2NpZGVudGFsOiBbIDAsICAwLCAgMywgIDAsICAzLCAgMCwgIDIsICAwLCAgMCwgIDMsICAwLCAgM10gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgIDAsIC0xLCAtMSwgLTIsIC0zLCAtMywgLTQsIC00LCAtNSwgLTUsIC02XSwgLy8gQVxuICAgIGFjY2lkZW50YWw6IFsgMywgIDAsICAwLCAgMSwgIDAsICAzLCAgMCwgIDMsICAwLCAgMCwgIDEsICAwXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAtMSwgLTEsIC0yLCAtMiwgLTMsIC00LCAtNCwgLTUsIC01LCAtNiwgLTZdLCAvLyBCYlxuICAgIGFjY2lkZW50YWw6IFsgMCwgIDIsICAwLCAgMCwgIDMsICAwLCAgMiwgIDAsICAyLCAgMCwgIDAsICAzXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAgMCwgLTEsIC0xLCAtMiwgLTMsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTZdLCAvLyBCXG4gICAgYWNjaWRlbnRhbDogWyAzLCAgMCwgIDMsICAwLCAgMCwgIDMsICAwLCAgMywgIDAsICAzLCAgMCwgIDBdIH1cbl07XG5cbi8qKiBcbiAqIEEgbGlzdCBvZiBhbGwga2V5IGFjY2lkZW50YWxzIGluZGljYXRpbmcgdGhlIGFjY2lkZW50YWwga2luZCAoMSA9IHNoYXJwXG4gKiBhbmQgMiA9IGZsYXQpIGFuZCB0aGUgTUlESSBub3RlIGl0IGlzIGFzc29jaWF0ZWQgdG9cbiAqL1xuZXhwb3J0IGNvbnN0IEtFWV9BQ0NJREVOVEFMUyA9IFtcbiAge2FjY2lkZW50YWw6IDEsIHBpdGNoZXM6IFtdfSwgICAgICAgICAgICAgICAgICAgICAgIC8vIENcbiAge2FjY2lkZW50YWw6IDIsIHBpdGNoZXM6IFs3MCwgNzUsIDY4LCA3MywgNjZdfSwgICAgIC8vIERiXG4gIHthY2NpZGVudGFsOiAxLCBwaXRjaGVzOiBbNzgsIDczXX0sICAgICAgICAgICAgICAgICAvLyBEXG4gIHthY2NpZGVudGFsOiAyLCBwaXRjaGVzOiBbNzAsIDc1LCA2OF19LCAgICAgICAgICAgICAvLyBFYlxuICB7YWNjaWRlbnRhbDogMSwgcGl0Y2hlczogWzc4LCA3MywgODAsIDc1XX0sICAgICAgICAgLy8gRVxuICB7YWNjaWRlbnRhbDogMiwgcGl0Y2hlczogWzcwXX0sICAgICAgICAgICAgICAgICAgICAgLy8gRlxuICB7YWNjaWRlbnRhbDogMiwgcGl0Y2hlczogWzcwLCA3NSwgNjgsIDczLCA2NiwgNzFdfSwgLy8gR2JcbiAge2FjY2lkZW50YWw6IDEsIHBpdGNoZXM6IFs3OF19LCAgICAgICAgICAgICAgICAgICAgIC8vIEdcbiAge2FjY2lkZW50YWw6IDIsIHBpdGNoZXM6IFs3MCwgNzUsIDY4LCA3M119LCAgICAgICAgIC8vIEFiXG4gIHthY2NpZGVudGFsOiAxLCBwaXRjaGVzOiBbNzgsIDczLCA4MF19LCAgICAgICAgICAgICAvLyBBXG4gIHthY2NpZGVudGFsOiAyLCBwaXRjaGVzOiBbNzAsIDc1XX0sICAgICAgICAgICAgICAgICAvLyBCYlxuICB7YWNjaWRlbnRhbDogMSwgcGl0Y2hlczogWzc4LCA3MywgODAsIDc1LCA3MF19ICAgICAgLy8gQlxuXTtcblxuLyoqIFRyZWJsZSBjbGVmIHZhbHVlLiBOdW1iZXIgaXMgcmVmZXJlbmNlIE1JREkgcGl0Y2ggdmFsdWUgKi9cbmV4cG9ydCBjb25zdCBUUkVCTEVfQ0xFRiA9IDcxO1xuXG4vKiogQmFzcyBjbGVmIHZhbHVlLiBOdW1iZXIgaXMgcmVmZXJlbmNlIE1JREkgcGl0Y2ggdmFsdWUgKi9cbmV4cG9ydCBjb25zdCBCQVNTX0NMRUYgPSA1MDsiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBQYXNjdWFsIGRlIEp1YW4uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqIDE1JSBvZiBhY2NpZGVudGFscyB3aWR0aCAqL1xuZXhwb3J0IGNvbnN0IFNURU1fV0lEVEggPSAxNTtcbi8qKiAxIHBpeGVsICovXG5leHBvcnQgY29uc3QgTElORV9TVFJPS0UgPSAxO1xuLyoqIDE1MCUgb2YgYWNjaWRlbnRhbHMgd2lkdGggKi9cbmV4cG9ydCBjb25zdCBDT01QQUNUX1NQQUNJTkcgPSAxNTA7IiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7XG4gIE1JTl9SRVNPTFVUSU9OXG59IGZyb20gJy4vbW9kZWxfY29uc3RhbnRzJztcblxuaW1wb3J0IHtcbiAgTm90ZUluZm9cbn0gZnJvbSAnLi9zdGFmZl9pbmZvJztcblxuaW1wb3J0IHtcbiAgQmFyc0luZm9cbn0gZnJvbSAnLi9iYXJzX2luZm8nO1xuXG4vKiogQSBtYXAgb2Ygc3RhZmYgYmxvY2tzIGluZGV4ZWQgYnkgc3RhcnRpbmcgcXVhcnRlciAqL1xuZXhwb3J0IHR5cGUgU3RhZmZCbG9ja01hcCA9IE1hcDxudW1iZXIsIFN0YWZmQmxvY2s+O1xuXG4vKiogU3RvcmVzIHByb2Nlc3NlZCBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGEgbXVzaWNhbCBub3RlIGluIGEgc3RhZmYgKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhZmZOb3RlIGV4dGVuZHMgTm90ZUluZm8ge1xuICAvKiogXG4gICAqIFZlcnRpY2FsIHN0ZXBzIHRvIHBvc2l0aW9uIGEgbm90ZSBvbiBzY29yZS4gSXQgaXMgbWVhc3VyZWQgaW4gaW50ZWdlciBcbiAgICogdmFsdWUsIGNvbnNpZGVyaW5nIDIgcG9zaXRpb25zIHBlciBzdGFmZiBsaW5lIChvbmUgZm9yIG92ZXIgbGluZSBhbmQgb3RoZXJcbiAgICogZm9yIGludGVyLWxpbmVzKSwgdmVydGljYWxseSBpbnZlcnRlZCwgYmVpbmcgdmFsdWUgMCB1c2VkIGZvciB0aGlyZCBsaW5lIFxuICAgKiBub3RlLCAxIHVzZWQgZm9yIG5leHQgbG93ZXIgb25lIGFuZCAtMSBmb3IgdGhlIG5leHQgdXBwZXIgb25lLlxuICAgKi9cbiAgdlN0ZXBzOiBudW1iZXI7XG4gIC8qKiBcbiAgICogSWRlbnRpZmljYXRvciBvZiB0aGUgYWNjaWRlbnRhbCBraW5kIGFzIGZvbGxvd2luZyBlbmNvZGluZzogXG4gICAqIDAgPSBub25lLCAxID0gc2hhcnAsIDIgPSBmbGF0LCAzID0gbm9ybWFsXG4gICAqL1xuICBhY2NpZGVudGFsOiBudW1iZXI7XG4gIC8qKiBSZWZlcmVuY2UgdG8gcHJldmlvdXMgdGllZCBub3RlICovXG4gIHRpZWRGcm9tPzogU3RhZmZOb3RlO1xuICAvKiogUmVmZXJlbmNlIHRvIGZvbGxvd2luZyB0aWVkIG5vdGUgKi9cbiAgdGllZFRvPzogU3RhZmZOb3RlO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhIG5vdGUgaW4gdHdvIGJ5IGEgdGltZSBwb2ludCBtZWFzdXJlZCBpbiBub3RlIHF1YXJ0ZXJzXG4gKiBAcGFyYW0gc3RhZmZOb3RlIG5vdGUgdG8gYmUgc3BsaXR0ZWRcbiAqIEBwYXJhbSBxdWFydGVycyBzcGxpdCBwb2ludFxuICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwcml0dGVkIG5vdGUuIEZpcnN0IG9uZSBpcyB0aGUgcmVjZWl2ZWQgb25lLFxuICogd2hpY2ggZ2V0cyBtb2RpZmllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0U3RhZmZOb3RlKHN0YWZmTm90ZTogU3RhZmZOb3RlLCBxdWFydGVyczogbnVtYmVyKTogU3RhZmZOb3RlIHtcbiAgY29uc3QgcmVtYWluTGVuZ3RoID0gKHN0YWZmTm90ZS5zdGFydCArIHN0YWZmTm90ZS5sZW5ndGgpIC0gcXVhcnRlcnM7XG4gIGxldCBzcGxpdHRlZDogU3RhZmZOb3RlID0gbnVsbDtcbiAgaWYgKHF1YXJ0ZXJzID4gc3RhZmZOb3RlLnN0YXJ0ICYmIHJlbWFpbkxlbmd0aCA+IDApIHtcbiAgICBzdGFmZk5vdGUubGVuZ3RoIC09IHJlbWFpbkxlbmd0aDtcbiAgICBzcGxpdHRlZCA9IHtcbiAgICAgIHN0YXJ0OiBxdWFydGVycyxcbiAgICAgIGxlbmd0aDogcmVtYWluTGVuZ3RoLFxuICAgICAgcGl0Y2g6IHN0YWZmTm90ZS5waXRjaCxcbiAgICAgIGludGVuc2l0eTogc3RhZmZOb3RlLmludGVuc2l0eSxcbiAgICAgIHZTdGVwczogc3RhZmZOb3RlLnZTdGVwcyxcbiAgICAgIGFjY2lkZW50YWw6IHN0YWZmTm90ZS5hY2NpZGVudGFsLFxuICAgICAgdGllZEZyb206IHN0YWZmTm90ZVxuICAgIH07XG4gICAgaWYgKHN0YWZmTm90ZS50aWVkVG8pIHsgLy8gUmVsaW5raW5nIHRpZXMgaWYgYW55IGluIHByZS1zcGxpdHRlZCBub3RlXG4gICAgICBzcGxpdHRlZC50aWVkVG8gPSBzdGFmZk5vdGUudGllZFRvO1xuICAgICAgc3RhZmZOb3RlLnRpZWRUby50aWVkRnJvbSA9IHNwbGl0dGVkO1xuICAgIH1cbiAgICBzdGFmZk5vdGUudGllZFRvID0gc3BsaXR0ZWQ7XG4gIH1cbiAgcmV0dXJuIHNwbGl0dGVkO1xufSAvLyBUT0RPOiByZXZpZXcgdG8gbW92ZSBpbnRlcmZhY2UgdG8gY2xhc3NcblxuLyoqIFxuICogU3RvcmVzIGEgYmxvY2sgb2Ygbm90ZXMgaW4gYSBzdGFmZiwgYWxsIG9mIHRoZW0gc3RhcnRpbmcgYW5kIGVuZGluZyBhdCBvbmNlLCBcbiAqIGV2ZW4gdGhvdWdoIHNvbWUgbm90ZXMgY2FuIGJlIHRpZWQgdG8gbm90ZXMgaW4gb3RoZXIgYmxvY2tzLiBBIGJsb2NrIHdpdGggbm8gXG4gKiBub3RlcyBpcyBhIHJlc3QuIEl0IHdpbGwgcHJlLXByb2Nlc3MgYWxsIGF2YWlsYWJsZSBjb250ZXh0IChrZXkgc2lnbmF0dXJlcyxcbiAqIHJpdGhtIHNwbGl0dGluZ3MsIGNsZWYuLi4pIHRvIHN0b3JlIGFsbCBzY29yZSBkZXRhaWxzIGluIG9yZGVyIHRvIHJlcHJlc2VudCBcbiAqIGl0IGluIGEgc3RhZmYuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGFmZkJsb2NrIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgcHVibGljIHN0YXJ0OiBudW1iZXI7XG4gIC8qKiBOb3RlIGxlbmd0aCwgaW4gcXVhcnRlciBub3RlIHF1YW50aXRpZXMgKGZsb2F0KSAqL1xuICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHN5bWJvbCB0byBiZSBkcmF3biAobm90ZXMgYW5kIHJlc3RzKSBhY2NvcmRpbmcgdG8gaXRzXG4gICAqIGxlbmd0aCBtZWFzdXJlZCBpbiBxdWFydGVycy5cbiAgICovXG4gIGhlYWRJbmRleDogbnVtYmVyO1xuICAvKipcbiAgICogU3BlY2lmaWVzIG5vdGUgb3IgcmVzdCBsZW5ndGggYWx0ZXJhdGlvbiwgaWYgYW55LCBhcyBmb2xsb3dpbmcgZW5jb2Rpbmc6XG4gICAqIDEgPSBkb3QsIDMgPSB0cmlwbGV0LCA1IHF1aW50dXBsZXQgKGFueSBvdGhlciB3aWxsIGJlIGlnbm9yZWQpXG4gICAqL1xuICBoZWFkQWx0ZXJhdGlvbj86IG51bWJlcjtcbiAgLyoqIEJsb2NrIGJhciBudW1iZXIgKGZsb2F0KSBiZWluZyAuMCBhdCBiYXIgYmVnaW5uaW5nIGFuZCAuNSBhdCBiYXIgaGFsZi4gKi9cbiAgcHVibGljIG5vdGVzOiBTdGFmZk5vdGVbXTtcbiAgLyoqIFVwcGVyIGxpbWl0IG9mIHZlcnRpY2FsIHN0ZXBzIGluIGJsb2NrIG5vdGVzICovXG4gIHB1YmxpYyBiYXJOdW1iZXI6IG51bWJlcjtcbiAgLyoqIFRoZSBsaXN0IG9mIG5vdGVzIHJlbGF0ZWQgdG8gdGhlIGJsb2NrICovXG4gIHB1YmxpYyBtYXhWU3RlcDogbnVtYmVyO1xuICAvKiogTG93ZXIgbGltaXQgb2YgdmVydGljYWwgc3RlcHMgaW4gYmxvY2sgbm90ZXMgKi9cbiAgcHVibGljIG1pblZTdGVwOiBudW1iZXI7XG4gIC8qKiBNZW1iZXIgb2YgYSBCZWFtIHN0YXJ0aW5nIGZyb20gcmVmZXJlbmNlZCBibG9jayAqL1xuICBwdWJsaWMgYmVhbWVkRnJvbT86IFN0YWZmQmxvY2s7XG4gIC8qKiBCZWFtZWQgdG8gcHJldmlvdXMgYmxvY2sgKi9cbiAgcHVibGljIGJlYW1pbmdCYWNrd2FyZHM/OiBib29sZWFuO1xuICAvKiogQmVhbWVkIHRvIG5leHQgYmxvY2sgKi9cbiAgcHVibGljIGJlYW1pbmdGb3J3YXJkcz86IGJvb2xlYW47XG4gIC8qKiBXZXRoZXIgdGhlIGJsb2NrIGJlZ2lucyBhIG5ldyBiZWF0ICovXG4gIHB1YmxpYyBiZWF0QmVnaW4/OiBib29sZWFuO1xuICAvKiogV2V0aGVyIHRoZSBibG9jayBlbmRzIGEgbmV3IGJlYXQgKi9cbiAgcHVibGljIGJlYXRFbmQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYFN0YWZmQmxvY2tgIHN0b3JpbmcgbWluaW1hbCBzY29yZSBkZXRhaWxzLCB3YWl0aW5nIHRvIGJlIFxuICAgKiBtb2RpZmllZCBmdXJ0aGVyIGludm9raW5nIG90aGVyIG1ldGhvZHMuXG4gICAqIEBwYXJhbSBzdGFydCBTdGFydGluZyB0aW1lLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpXG4gICAqIEBwYXJhbSBsZW5ndGggTm90ZSBsZW5ndGgsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdClcbiAgICogQHBhcmFtIG5vdGVzIFRoZSBsaXN0IG9mIG5vdGVzIHJlbGF0ZWQgdG8gdGhlIGJsb2NrXG4gICAqIEBwYXJhbSBtYXhWU3RlcCBVcHBlciBsaW1pdCBvZiB2ZXJ0aWNhbCBzdGVwcyBpbiBibG9jayBub3Rlc1xuICAgKiBAcGFyYW0gbWluVlN0ZXAgTG93ZXIgbGltaXQgb2YgdmVydGljYWwgc3RlcHMgaW4gYmxvY2sgbm90ZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChcbiAgICBzdGFydD0wLCBcbiAgICBsZW5ndGg9MCwgXG4gICAgbm90ZXM6IFN0YWZmTm90ZVtdPVtdLFxuICAgIGJhck51bWJlcj0wLFxuICAgIG1heFZTdGVwPU51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgIG1pblZTdGVwPU51bWJlci5NSU5fU0FGRV9JTlRFR0VSLFxuICApIHtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oZWFkSW5kZXggPSAwO1xuICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB0aGlzLmJhck51bWJlciA9IGJhck51bWJlcjtcbiAgICB0aGlzLm1heFZTdGVwID0gbWF4VlN0ZXA7XG4gICAgdGhpcy5taW5WU3RlcCA9IG1pblZTdGVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBub3RlIHRvIHRoZSBibG9jaydzIG5vdGUgbGlzdCwgbWVyZ2luZyByZXBldGl0aW9ucycgbGVuZ3RoLCBcbiAgICogYWRhcHRpbmcgVlN0ZXBzIGFuZCBibG9jayBsZW5ndGhcbiAgICogQHBhcmFtIHN0YWZmTm90ZSBUaGUgbm90ZSB0byBiZSBhZGRlZFxuICAgKi9cbiAgcHVibGljIGFkZE5vdGUoc3RhZmZOb3RlOiBTdGFmZk5vdGUpIHtcbiAgICBsZXQgbmV3Tm90ZSA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IG5ld05vdGUgJiYgaSA8IHRoaXMubm90ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChzdGFmZk5vdGUucGl0Y2ggPT09IHRoaXMubm90ZXNbaV0ucGl0Y2gpIHsgLy8gUmVwZWF0ZWRcbiAgICAgICAgbmV3Tm90ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGVzW2ldLmxlbmd0aCA9IE1hdGgubWF4KHRoaXMubm90ZXNbaV0ubGVuZ3RoLCBzdGFmZk5vdGUubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgc3RhZmZOb3RlLmxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuZXdOb3RlKSB7XG4gICAgICB0aGlzLm5vdGVzLnB1c2goc3RhZmZOb3RlKTsgIFxuICAgICAgdGhpcy5taW5WU3RlcCA9IE1hdGgubWF4KHN0YWZmTm90ZS52U3RlcHMsIHRoaXMubWluVlN0ZXApO1xuICAgICAgdGhpcy5tYXhWU3RlcCA9IE1hdGgubWluKHN0YWZmTm90ZS52U3RlcHMsIHRoaXMubWF4VlN0ZXApO1xuICAgICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgc3RhZmZOb3RlLmxlbmd0aCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0cyBhIGJsb2NrIGluIHR3byBieSBhIHRpbWUgcG9pbnQgbWVhc3VyZWQgaW4gbm90ZSBxdWFydGVyc1xuICAgKiBAcGFyYW0gcXVhcnRlcnMgc3BsaXQgcG9pbnRcbiAgICogQHBhcmFtIGJhcnNJbmZvIEFuIEFycmF5IHdpdGggYmFyIGFuZCBzaWduYXR1cmVzIGluZm8gcGVyIHF1YXJ0ZXJcbiAgICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwbGl0dGVkIGJsb2NrLiBGaXJzdCBvbmUgaXMgdGhlIHJlY2VpdmVkIG9uZSxcbiAgICogd2hpY2ggZ2V0cyBtb2RpZmllZC5cbiAgICovXG4gIHB1YmxpYyBzcGxpdChxdWFydGVyczogbnVtYmVyLCBiYXJzSW5mbzogQmFyc0luZm8pOiBTdGFmZkJsb2NrIHtcbiAgICBjb25zdCByZW1haW5MZW5ndGggPSAodGhpcy5zdGFydCArIHRoaXMubGVuZ3RoKSAtIHF1YXJ0ZXJzO1xuICAgIGxldCBzcGxpdHRlZEJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICBpZiAocXVhcnRlcnMgPiB0aGlzLnN0YXJ0ICYmIHJlbWFpbkxlbmd0aCA+IDApIHtcbiAgICAgIHNwbGl0dGVkQmxvY2sgPSBuZXcgU3RhZmZCbG9jayhcbiAgICAgICAgcXVhcnRlcnMsIFxuICAgICAgICByZW1haW5MZW5ndGgsXG4gICAgICAgIFtdLCBcbiAgICAgICAgYmFyc0luZm8uYmFyTnVtYmVyQXRRKHF1YXJ0ZXJzKVxuICAgICAgKTtcbiAgICAgIHRoaXMubGVuZ3RoIC09IHJlbWFpbkxlbmd0aDtcbiAgICAgIHRoaXMubm90ZXMuZm9yRWFjaChcbiAgICAgICAgc3RhZmZOb3RlID0+IHtcbiAgICAgICAgICBjb25zdCByZW1haW5TdGFmZk5vdGUgPSBzcGxpdFN0YWZmTm90ZShzdGFmZk5vdGUsIHF1YXJ0ZXJzKTtcbiAgICAgICAgICBpZiAocmVtYWluU3RhZmZOb3RlKSB7XG4gICAgICAgICAgICBzcGxpdHRlZEJsb2NrLmFkZE5vdGUocmVtYWluU3RhZmZOb3RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChzcGxpdHRlZEJsb2NrICYmIHRoaXMuYmVhdEVuZCkge1xuICAgICAgc3BsaXR0ZWRCbG9jay5iZWF0RW5kID0gdHJ1ZTtcbiAgICAgIHRoaXMuYmVhdEVuZCA9IGZhbHNlOyAvLyBBcHBsaWNhYmxlIHRvIHN5bWJvbCBzcGxpdHRpbmcgKHBvc3QtYmVhdClcbiAgICB9XG4gICAgcmV0dXJuIHNwbGl0dGVkQmxvY2s7XG4gIH1cblxuICAvKipcbiAgICogU3BsaXRzIGEgYmxvY2sgaW4gdHdvIGJ5IG5leHQgYmVhdCB0byByaXRtaWNhbGx5IGNvbXBsZXRlIHByZXZpb3VzIG9uZS5cbiAgICogSXQgbWFya3MgYXMgd2VsbCBpZiB0aGUgYWZmZWN0ZWQgYmxvY2sgaXMgYmVnaW5uaW5nIG9yIGVuZGluZyBhIGJlYXQuXG4gICAqIEBwYXJhbSBiYXJzSW5mbyBBbiBBcnJheSB3aXRoIGJhciBhbmQgc2lnbmF0dXJlcyBpbmZvIHBlciBxdWFydGVyXG4gICAqIEByZXR1cm5zIFRoZSBzZWNvbmQgaGFsZiBvZiBzcGxpdHRlZCBibG9jay4gRmlyc3QgaGFsZiByZW1haW5zIGluIGN1cnJlbnRcbiAgICogb2JqZWN0LCB3aGljaCBnZXRzIG1vZGlmaWVkLlxuICAgKi9cbiAgcHVibGljIHNwbGl0VG9CZWF0KGJhcnNJbmZvOiBCYXJzSW5mbyk6IFN0YWZmQmxvY2sge1xuICAgIGNvbnN0IHRpbWVTaWduYXR1cmUgPSBiYXJzSW5mby50aW1lU2lnbmF0dXJlQXRRKHRoaXMuc3RhcnQpO1xuICAgIGNvbnN0IGJhckxlbmd0aCA9IGJhcnNJbmZvLmJhckxlbmdodEF0USh0aGlzLnN0YXJ0KTtcbiAgICBjb25zdCBiYXJGcmFjdGlvbkZyb21CYXIgPSB0aGlzLmJhck51bWJlciAtIE1hdGguZmxvb3IodGhpcy5iYXJOdW1iZXIpO1xuICAgIGNvbnN0IHF1YXJ0ZXJzRnJvbUJhckJlZ2lubmluZyA9IC8vIEphdmFzY3JpcHQgbWF0aCBzYWZlXG4gICAgICBNYXRoLnJvdW5kKGJhckxlbmd0aCAqIGJhckZyYWN0aW9uRnJvbUJhciAqIDEwMDAwMDApIC8gMTAwMDAwMDtcbiAgICBjb25zdCBxdWFydGVyc0F0QmFyQmVnaW5uaW5nID0gdGhpcy5zdGFydCAtIHF1YXJ0ZXJzRnJvbUJhckJlZ2lubmluZztcbiAgICBjb25zdCBtZXRyaWNCZWF0ID0gNCAvIHRpbWVTaWduYXR1cmUuZGVub21pbmF0b3I7XG4gICAgY29uc3QgYmxvY2tCZWF0ID0gcXVhcnRlcnNGcm9tQmFyQmVnaW5uaW5nIC8gbWV0cmljQmVhdDtcbiAgICBjb25zdCBzcGxpdHRpbmdCZWF0ID0gTWF0aC5jZWlsKGJsb2NrQmVhdCk7XG4gICAgbGV0IHNwbGl0dGVkQmxvY2s6IFN0YWZmQmxvY2sgPSBudWxsO1xuICAgIGlmICghaXNTYWZlWmVybyhzcGxpdHRpbmdCZWF0IC0gYmxvY2tCZWF0KSkgeyAvLyBTcGxpdHRpbmcgb24gbmV4dCBiZWF0XG4gICAgICBjb25zdCBxdWFydGVyc0F0QmVhdCA9IE1hdGgucm91bmQoIC8vIEphdmFzY3JpcHQgbWF0aCBzYWZlXG4gICAgICAgIChxdWFydGVyc0F0QmFyQmVnaW5uaW5nICsgc3BsaXR0aW5nQmVhdCAqIG1ldHJpY0JlYXQpICogMTAwMDAwMFxuICAgICAgKSAvIDEwMDAwMDA7XG4gICAgICBzcGxpdHRlZEJsb2NrID0gdGhpcy5zcGxpdChxdWFydGVyc0F0QmVhdCwgYmFyc0luZm8pO1xuICAgICAgaWYgKGlzU2FmZVplcm8odGhpcy5zdGFydCArIHRoaXMubGVuZ3RoIC0gcXVhcnRlcnNBdEJlYXQpKSB7XG4gICAgICAgIHRoaXMuYmVhdEVuZCA9IHRydWU7IC8vIEJsb2NrIGVuZHMgYXQgYmVhdCBlbmRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7IC8vIEJlZ2lubmluZyBhIGJlYXQsIHNwbGl0dGluZyBvbmx5IGF0IGJhciBlbmQgaWYgYXBwbGljYWJsZVxuICAgICAgdGhpcy5iZWF0QmVnaW4gPSB0cnVlO1xuICAgICAgY29uc3QgcXVhcnRlcnNBdEJhckVuZCA9IE1hdGgucm91bmQoIC8vIEphdmFzY3JpcHQgbWF0aCBzYWZlXG4gICAgICAgIChxdWFydGVyc0F0QmFyQmVnaW5uaW5nICsgdGltZVNpZ25hdHVyZS5udW1lcmF0b3IgKiBtZXRyaWNCZWF0KSAqIFxuICAgICAgICAxMDAwMDAwXG4gICAgICApIC8gMTAwMDAwMDtcbiAgICAgIHNwbGl0dGVkQmxvY2sgPSB0aGlzLnNwbGl0KHF1YXJ0ZXJzQXRCYXJFbmQsIGJhcnNJbmZvKTtcbiAgICAgIGlmIChpc1NhZmVaZXJvKHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aCAtIHF1YXJ0ZXJzQXRCYXJFbmQpKSB7XG4gICAgICAgIHRoaXMuYmVhdEVuZCA9IHRydWU7IC8vIEJsb2NrIGVuZHMgYXQgYmVhdCBlbmRcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNwbGl0dGVkQmxvY2spIHsgLy8gSXQgd2FzIHNwbGl0dGVkIGJlZm9yZSBiZWF0IGVuZFxuICAgICAgdGhpcy5iZWF0RW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNwbGl0dGVkQmxvY2s7XG4gIH1cblxuICAvKipcbiAgICogU3BsaXRzIGEgYmxvY2sgaW4gdHdvIHRvIG1ha2UgdGhlIGZpcnN0IG9uZSBmaXQgaW4gdGhlIHNpemUgb2Ygc3RhbmRhcmRcbiAgICogbXVzaWNhbCBzeW1ib2xzIGxlbmd0aC5cbiAgICogQHBhcmFtIGJhcnNJbmZvIEFuIEFycmF5IHdpdGggYmFyIGFuZCBzaWduYXR1cmVzIGluZm8gcGVyIHF1YXJ0ZXJcbiAgICogQHBhcmFtIGluY3JlYXNpbmcgV2V0aGVyIHRoZSBzcGxpdCBtdXN0IGJlIGRvbmUgc2hvcnRlciB0byBsb25nZXIgbm90ZXNcbiAgICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwbGl0dGVkIGJsb2NrLiBGaXJzdCBoYWxmIHJlbWFpbnMgaW4gY3VycmVudFxuICAgKiBvYmplY3QsIHdoaWNoIGdldHMgbW9kaWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3BsaXRUb1N5bWJvbHMoYmFyc0luZm86IEJhcnNJbmZvLCBpbmNyZWFzaW5nOiBib29sZWFuKTogU3RhZmZCbG9jayB7XG4gICAgbGV0IHJlbWFpbkJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICBpZiAodGhpcy5sZW5ndGggPj0gTUlOX1JFU09MVVRJT04pIHtcbiAgICAgIGlmICggLy8gV2hvbGUgcmVzdCBhcHBsaWVzIHRvIHdob2xlIGJhciwgd2hhdGV2ZXIgaXRzIGxlbmd0aFxuICAgICAgICAhdGhpcy5ub3Rlcy5sZW5ndGggJiYgLy8gSXMgYSByZXN0IGFuZCBiZWF0IHNwbGl0dGVkIHRvIGJhciBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggPT09IGJhcnNJbmZvLmJhckxlbmdodEF0USh0aGlzLnN0YXJ0KVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaGVhZEluZGV4ID0gNDtcbiAgICAgIH1cbiAgICAgIGVsc2UgeyAvLyBLaW5kIG9mIG5vdGUgc2VsZWN0aW9uIChhbGwgYmxvY2sgbm90ZXMgaGF2ZSBzYW1lIGFzcGVjdClcbiAgICAgICAgcmVtYWluQmxvY2sgPSBpbmNyZWFzaW5nPyBcbiAgICAgICAgICB0aGlzLnNwbGl0U2hvcnRlcihiYXJzSW5mbyk6IHRoaXMuc3BsaXRMb25nZXIoYmFyc0luZm8pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBGYWxsYmFjayBmb3Igbm90ZXMgc2hvcnRlciB0aGFuIE1JTl9SRVNPTFVUSU9OLiBJdCB3aWxsIGJlIHdhcm5lZCBvbiBcbiAgICAvLyBjb25zb2xlIGFuZCBNSU5fUkVTT0xVVElPTiBub3RlIHdpbGwgYmUgZHJhd24uXG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBub3RlTGVuZ3RoID0gaXNTYWZlWmVybyh0aGlzLmxlbmd0aCkgPyAnW2luZmluaXRlXScgOiBcbiAgICAgICAgYCR7NCAvIHRoaXMubGVuZ3RofWA7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICclY1N0YWZmUmVuZGVyOicsICdiYWNrZ3JvdW5kOm9yYW5nZTsgY29sb3I6d2hpdGUnLCBcbiAgICAgICAgJ1N0YWZmUmVuZGVyIGRvZXMgbm90IGhhbmRsZSBub3RlcyBzaG9ydGhlciB0aGFuICcgK1xuICAgICAgICBgMS8kezQgLyBNSU5fUkVTT0xVVElPTn10aCwgYW5kIHRoaXMgc2NvcmUgdHJpZXMgdG8gZHJhdyBhIGAgK1xuICAgICAgICBgMS8ke25vdGVMZW5ndGh9dGguIFNob3J0ZXN0IHBvc3NpYmxlIG5vdGUgd2lsbCBiZSBkcmF3biBpbnN0ZWFkLmBcbiAgICAgICk7XG4gICAgICB0aGlzLmhlYWRJbmRleCA9IE1JTl9SRVNPTFVUSU9OO1xuICAgICAgcmVtYWluQmxvY2sgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcmVtYWluQmxvY2s7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBTcGxpdHMgYSBibG9jayBpbiB0d28gdG8gbWFrZSB0aGUgZmlyc3Qgb25lIHRoZSBzaG9ydGVzdCBwb3NzaWJsZSBzaXplIG9mIFxuICAgKiBzdGFuZGFyZCBtdXNpY2FsIHN5bWJvbHMuXG4gICAqIEBwYXJhbSBiYXJzSW5mbyBBbiBBcnJheSB3aXRoIGJhciBhbmQgc2lnbmF0dXJlcyBpbmZvIHBlciBxdWFydGVyXG4gICAqIEByZXR1cm5zIFRoZSBzZWNvbmQgaGFsZiBvZiBzcGxpdHRlZCBibG9jay4gRmlyc3QgaGFsZiByZW1haW5zIGluIGN1cnJlbnRcbiAgICogb2JqZWN0LCB3aGljaCBnZXRzIG1vZGlmaWVkLlxuICAgKi9cbiAgcHVibGljIHNwbGl0U2hvcnRlcihiYXJzSW5mbzogQmFyc0luZm8pOiBTdGFmZkJsb2NrIHtcbiAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgbGV0IHNwbGl0TGVuZ3RoID0gMDtcbiAgICBsZXQgaGVhZEluZGV4ID0gMDtcbiAgICBsZXQgaGVhZEFsdGVyYXRpb24gPSAwO1xuICAgIGZvciAobGV0IGkgPSA0OyAhaXNTYWZlWmVybyhsZW5ndGgpOyBpIC89IDIpIHtcbiAgICAgIGlmICggLy8gRG90dGVkIG5vdGVcbiAgICAgICAgaXNTYWZlWmVybyhsZW5ndGggLSBpICogMy8yKSAmJlxuICAgICAgICAoYmFyc0luZm8uYWxsb3dEb3R0ZWRSZXN0cyB8fCB0aGlzLm5vdGVzLmxlbmd0aClcbiAgICAgICkge1xuICAgICAgICBsZW5ndGggLT0gaSAqIDMvMjtcbiAgICAgICAgc3BsaXRMZW5ndGggPSBpICogMy8yO1xuICAgICAgICBoZWFkSW5kZXggPSBpO1xuICAgICAgICBoZWFkQWx0ZXJhdGlvbiA9IDE7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsZW5ndGggPj0gaSkgeyAvLyBQbGFpbiBub3RlXG4gICAgICAgIGxlbmd0aCAtPSBpO1xuICAgICAgICBzcGxpdExlbmd0aCA9IGk7XG4gICAgICAgIGhlYWRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1NhZmVaZXJvKGxlbmd0aCAtIGkgKiA0LzUpKSB7IC8vIFF1aW50dXBsZXRcbiAgICAgICAgbGVuZ3RoIC09IGkgKiA0LzU7XG4gICAgICAgIHNwbGl0TGVuZ3RoID0gaSAqIDQvNTtcbiAgICAgICAgaGVhZEluZGV4ID0gaTtcbiAgICAgICAgaGVhZEFsdGVyYXRpb24gPSA1O1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNTYWZlWmVybyhsZW5ndGggLSBpICogMi8zKSkgeyAvLyBUcmlwbGV0XG4gICAgICAgIGxlbmd0aCAtPSBpICogMi8zO1xuICAgICAgICBzcGxpdExlbmd0aCA9IGkgKiAyLzM7XG4gICAgICAgIGhlYWRJbmRleCA9IGk7XG4gICAgICAgIGhlYWRBbHRlcmF0aW9uID0gMztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVtYWluQmxvY2sgPSB0aGlzLnNwbGl0KHRoaXMuc3RhcnQgKyBzcGxpdExlbmd0aCwgYmFyc0luZm8pO1xuICAgIHRoaXMuaGVhZEluZGV4ID0gaGVhZEluZGV4O1xuICAgIHRoaXMuaGVhZEFsdGVyYXRpb24gPSBoZWFkQWx0ZXJhdGlvbjtcbiAgICByZXR1cm4gcmVtYWluQmxvY2s7XG4gIH1cblxuICAvKipcbiAgICogU3BsaXRzIGEgYmxvY2sgaW4gdHdvIHRvIG1ha2UgdGhlIGZpcnN0IG9uZSB0aGUgbG9uZ2VzdCBwb3NzaWJsZSBzaXplIG9mIFxuICAgKiBzdGFuZGFyZCBtdXNpY2FsIHN5bWJvbHMuXG4gICAqIEBwYXJhbSBiYXJzSW5mbyBBbiBBcnJheSB3aXRoIGJhciBhbmQgc2lnbmF0dXJlcyBpbmZvIHBlciBxdWFydGVyXG4gICAqIEByZXR1cm5zIFRoZSBzZWNvbmQgaGFsZiBvZiBzcGxpdHRlZCBibG9jay4gRmlyc3QgaGFsZiByZW1haW5zIGluIGN1cnJlbnRcbiAgICogb2JqZWN0LCB3aGljaCBnZXRzIG1vZGlmaWVkLlxuICAgKi9cbiAgcHVibGljIHNwbGl0TG9uZ2VyKGJhcnNJbmZvOiBCYXJzSW5mbyk6IFN0YWZmQmxvY2sge1xuICAgIGxldCByZW1haW5CbG9jazogU3RhZmZCbG9jayA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDQ7ICF0aGlzLmhlYWRJbmRleDsgaSAvPSAyKSB7XG4gICAgICBpZiAoIC8vIERvdHRlZCBub3RlXG4gICAgICAgIGlzU2FmZVplcm8odGhpcy5sZW5ndGggLSBpICogMy8yKSAmJlxuICAgICAgICAoYmFyc0luZm8uYWxsb3dEb3R0ZWRSZXN0cyB8fCB0aGlzLm5vdGVzLmxlbmd0aClcbiAgICAgICkge1xuICAgICAgICByZW1haW5CbG9jayA9IHRoaXMuc3BsaXQodGhpcy5zdGFydCArIGkgKiAzLzIsIGJhcnNJbmZvKTtcbiAgICAgICAgdGhpcy5oZWFkSW5kZXggPSBpO1xuICAgICAgICB0aGlzLmhlYWRBbHRlcmF0aW9uID0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMubGVuZ3RoID49IGkpIHtcbiAgICAgICAgcmVtYWluQmxvY2sgPSB0aGlzLnNwbGl0KHRoaXMuc3RhcnQgKyBpLCBiYXJzSW5mbyk7XG4gICAgICAgIHRoaXMuaGVhZEluZGV4ID0gaTsgLy8gUGxhaW4gbm90ZVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNTYWZlWmVybyh0aGlzLmxlbmd0aCAtIGkgKiA0LzUpKSB7IC8vIFF1aW50dXBsZXRcbiAgICAgICAgcmVtYWluQmxvY2sgPSB0aGlzLnNwbGl0KHRoaXMuc3RhcnQgKyBpICogNC81LCBiYXJzSW5mbyk7XG4gICAgICAgIHRoaXMuaGVhZEluZGV4ID0gaTtcbiAgICAgICAgdGhpcy5oZWFkQWx0ZXJhdGlvbiA9IDU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1NhZmVaZXJvKHRoaXMubGVuZ3RoIC0gaSAqIDIvMykpIHsgLy8gVHJpcGxldFxuICAgICAgICByZW1haW5CbG9jayA9IHRoaXMuc3BsaXQodGhpcy5zdGFydCArIGkgKiAyLzMsIGJhcnNJbmZvKTtcbiAgICAgICAgdGhpcy5oZWFkSW5kZXggPSBpO1xuICAgICAgICB0aGlzLmhlYWRBbHRlcmF0aW9uID0gMztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbWFpbkJsb2NrO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBibG9jayBpbnRvIHRoZSBibG9jayBtYXAgb3IgYXBwZW5kcyBpdHMgY29udGVudCBpbnRvIGFuIGV4aXN0aW5nIFxuICAgKiBibG9ja1xuICAgKiBAcGFyYW0gbWFwIEJsb2NrIG1hcCB0byBob2xkIGJsb2Nrc1xuICAgKi9cbiAgcHVibGljIG1lcmdlVG9NYXAobWFwOiBTdGFmZkJsb2NrTWFwKSB7XG4gICAgaWYgKG1hcC5oYXModGhpcy5zdGFydCkpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nQmxvY2sgPSBtYXAuZ2V0KHRoaXMuc3RhcnQpO1xuICAgICAgdGhpcy5ub3Rlcy5mb3JFYWNoKG5vdGUgPT4gZXhpc3RpbmdCbG9jay5hZGROb3RlKG5vdGUpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBtYXAuc2V0KHRoaXMuc3RhcnQsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGJsb2NrIHN0YXJ0cyBhdCBiYXIgYmVnaW5uaW5nXG4gICAqIEByZXR1cm5zIHRydWUgaWYgaXQgaXMgc29cbiAgICovXG4gIHB1YmxpYyBpc0JhckJlZ2lubmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5iYXJOdW1iZXIgLSBNYXRoLnRydW5jKHRoaXMuYmFyTnVtYmVyKSA9PT0gMC4wO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bGZpbGxzIGJlYW1pbmcgaW5mbyBhY2NvcmRpbmcgdG8gcHJldmlvdXMgYmxvY2sgYW5kIHNpZ25hdHVyZXMgY29udGV4dFxuICAgKiBAcGFyYW0gcHJldmlvdXNTdGFmZkJsb2NrIFRoZSBwcmV2aW91cyBibG9jayB0byByaXRtaWNhbGx5IGNvbXBsZXRlXG4gICAqIEBwYXJhbSBxdWFydGVyc0luZm8gQW4gQXJyYXkgd2l0aCBiYXIgYW5kIHNpZ25hdHVyZXMgaW5mbyBwZXIgcXVhcnRlclxuICAgKi9cbiAgcHVibGljIHNldEJlYW1pbmcoXG4gICAgcHJldmlvdXNTdGFmZkJsb2NrOiBTdGFmZkJsb2NrLCBiYXJzSW5mbzogQmFyc0luZm9cbiAgKSB7XG4gIH1cbn1cblxuLyoqXG4gKiBWZXJpZmllcyBpZiBhIGdpdmVuIG51bWJlciBpcyBjbG9zZXIgdG8gemVybyB0aGFuIDAuMDAwMDAwMSBpbiBvcmRlciB0byBcbiAqIGF2b2lkIEphdmFzY3JpcHQgbWF0aCBpbXByZWNpc3Npb25zLlxuICogQHBhcmFtIG4gTnVtYmVyIHRvIGJlIGNoZWNrZWRcbiAqL1xuZnVuY3Rpb24gaXNTYWZlWmVybyhuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIE1hdGgucm91bmQobiAqIDEwMDAwMDApID09PSAwO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKiBTdG9yZXMgbWluaW1hbCBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGEgbXVzaWNhbCBub3RlICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdGVJbmZvIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgc3RhcnQ6IG51bWJlcjtcbiAgLyoqIE5vdGUgbGVuZ3RoLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpICovXG4gIGxlbmd0aDogbnVtYmVyO1xuICAvKiogTm90ZSBwaXRjaCBhY2NvcmRpbmcgdG8gTUlESSBzdGFuZGFyZCAqL1xuICBwaXRjaDogbnVtYmVyO1xuICAvKiogTm90ZSBpbnRlbnNpdHkgYWNjb3JkaW5nIHRvIE1JREkgdmVsb2NpdHkgKi9cbiAgaW50ZW5zaXR5OiBudW1iZXI7XG59XG4gIFxuLyoqIFN0b3JlcyBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGEgdGVtcG8gY2hhbmdlIG9uIGEgc2NvcmUgKG5vdCB1c2VkIHlldCkgKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcG9JbmZvIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgc3RhcnQ6IG51bWJlcjsgXG4gIC8qKiBRdWFydGVycyBQZXIgTWludXRlIGZyb20gdGhpcyBxdWFydGVyIG9uLCB1bmxlc3MgZnVydGhlciBjaGFuZ2VzICovXG4gIHFwbTogbnVtYmVyO1xufVxuXG4vKiogU3RvcmVzIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gYSBrZXkgc2lnbmF0dXJlIGNoYW5nZSBvbiBhIHNjb3JlICovXG5leHBvcnQgaW50ZXJmYWNlIEtleVNpZ25hdHVyZUluZm8ge1xuICAvKiogU3RhcnRpbmcgdGltZSwgaW4gcXVhcnRlciBub3RlIHF1YW50aXRpZXMgKGZsb2F0KSAqL1xuICBzdGFydDogbnVtYmVyOyBcbiAgLyoqIEtleSBzaWduYXR1cmUgZnJvbSB0aGlzIHF1YXJ0ZXIgb24sIHVubGVzcyBmdXJ0aGVyIGNoYW5nZXMgKi9cbiAga2V5OiBudW1iZXI7XG59XG5cbi8qKiBTdG9yZXMgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBhIHRpbWUgc2lnbmF0dXJlIGNoYW5nZSBvbiBhIHNjb3JlICovXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVTaWduYXR1cmVJbmZvIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgc3RhcnQ6IG51bWJlcjtcbiAgLyoqIFdvdWxkIGhvbGQgMyBpbiBhIDMvNCB0aW1lIHNpZ25hdHVyZSBjaGFuZ2UgKi9cbiAgbnVtZXJhdG9yOiBudW1iZXI7IFxuICAvKiogV291bGQgaG9sZCA0IGluIGEgMy80IHRpbWUgc2lnbmF0dXJlIGNoYW5nZSAqL1xuICBkZW5vbWluYXRvcjogbnVtYmVyO1xufVxuXG4vKiogU3RvcmVzIHRoZSBiYXJlIG1pbmltYWwgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBhIGZ1bGwgc2luZ2xlIHN0YWZmIHNjb3JlICovXG5leHBvcnQgaW50ZXJmYWNlIFN0YWZmSW5mbyB7XG4gIC8qKiBBbGwgbm90ZXMgaW4gYSBzdGFmZi4gVGhlcmUncyBubyBuZWVkIHRvIGJlIHNvcnRlZCBieSBzdGFydCBxICovXG4gIG5vdGVzOiBOb3RlSW5mb1tdO1xuICAvKiogQWxsIHRlbXBvIGNoYW5nZXMgaW4gYSBzdGFmZi4gVGhleSB3aWxsIGdldCBzb3J0ZWQgYnkgc3RhcnQgcSAqL1xuICB0ZW1wb3M/OiBUZW1wb0luZm9bXTtcbiAgLyoqIEFsbCBrZXkgc2lnbmF0dXJlIGNoYW5nZXMgaW4gYSBzdGFmZi4gVGhleSB3aWxsIGdldCBzb3J0ZWQgYnkgc3RhcnQgcSAqL1xuICBrZXlTaWduYXR1cmVzPzogS2V5U2lnbmF0dXJlSW5mb1tdO1xuICAvKiogQWxsIHRpbWUgc2lnbmF0dXJlIGNoYW5nZXMgaW4gYSBzdGFmZi4gVGhleSB3aWxsIGdldCBzb3J0ZWQgYnkgc3RhcnQgcSAqL1xuICB0aW1lU2lnbmF0dXJlcz86IFRpbWVTaWduYXR1cmVJbmZvW107XG59XG5cbi8qKiBEZWZhdWx0IHRlbXBvIGluIGNhc2Ugbm9uZSBpcyBmb3VuZCAoNjAgYnBtKSAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEVNUE86IFRlbXBvSW5mbyA9IHtcbiAgc3RhcnQ6IDAsXG4gIHFwbTogNjBcbn07XG4vKiogRGVmYXVsdCBrZXkgaW4gY2FzZSBub25lIGlzIGZvdW5kIChDIGtleSkgKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0tFWV9TSUdOQVRVUkU6IEtleVNpZ25hdHVyZUluZm8gPSB7XG4gIHN0YXJ0OiAwLFxuICBrZXk6IDBcbn07XG4vKiogRGVmYXVsdCB0aW1lIHNpZ25hdHVyZSBpbiBjYXNlIG5vbmUgaXMgZm91bmQgKDQvNCkgKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVfU0lHTkFUVVJFOiBUaW1lU2lnbmF0dXJlSW5mbyA9IHtcbiAgc3RhcnQ6IDAsIFxuICBudW1lcmF0b3I6IDQsIFxuICBkZW5vbWluYXRvcjogNFxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgcXVhcnRlcnMgdGhhdCBmaXRzIHdpdGhpbiBhIGJhciBpbiBhIGdpdmVuXG4gKiB0aW1lIHNpZ25hdHVyZVxuICogQHBhcmFtIHRpbWVTaWduYXR1cmUgVGhlIHRpbWUgc2lnbmF0dXJlXG4gKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIHF1YXJ0ZXJzIHRoYXQgZml0IGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYXJMZW5ndGgodGltZVNpZ25hdHVyZTogVGltZVNpZ25hdHVyZUluZm8pOiBudW1iZXIge1xuICByZXR1cm4gdGltZVNpZ25hdHVyZS5udW1lcmF0b3IgKiA0IC8gdGltZVNpZ25hdHVyZS5kZW5vbWluYXRvcjtcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1xuICBTdGFmZkluZm8sIE5vdGVJbmZvLCBLZXlTaWduYXR1cmVJbmZvLCBcbiAgREVGQVVMVF9URU1QTywgREVGQVVMVF9USU1FX1NJR05BVFVSRSwgREVGQVVMVF9LRVlfU0lHTkFUVVJFXG59IGZyb20gJy4vc3RhZmZfaW5mbyc7XG5pbXBvcnQgeyBCYXJzSW5mbyB9IGZyb20gJy4vYmFyc19pbmZvJztcbmltcG9ydCB7IFN0YWZmQmxvY2ssIFN0YWZmQmxvY2tNYXAsIFN0YWZmTm90ZSB9IGZyb20gJy4vc3RhZmZfYmxvY2snO1xuaW1wb3J0IHsgXG4gIFNDQUxFUywgS0VZX0FDQ0lERU5UQUxTLCBUUkVCTEVfQ0xFRiwgQkFTU19DTEVGIFxufSBmcm9tICcuL21vZGVsX2NvbnN0YW50cyc7XG5leHBvcnQgeyBLRVlfQUNDSURFTlRBTFMgfTsgLy8gVE9ETzogUmV2aWV3XG5cbi8qKiBUZW1wb3Jhcnkgc3RvcmFnZSBvZiBhY2NpZGVudGFscyBhY3RpdmF0ZWQgb24gYSBiYXIgYnkgTUlESSBub3RlICovXG50eXBlIEJhckFjY2lkZW50YWxzID0ge1twaXRjaDogbnVtYmVyXTogbnVtYmVyfTtcblxuLyoqXG4gKiBNb2RlbHMgYSBzdGFmZiBpbmZvIGludG8gYSBtdXNpY2FsIHN0cnVjdHVyZSBvZiBzdGFmZiBibG9ja3MgaW5kZXhlZCBieSB0aGVcbiAqIHF1YXJ0ZXIgdGhleSBzdGFydCBmcm9tXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGFmZk1vZGVsIHtcbiAgLyoqIFRoZSBpbnB1dCBzdGFmZiBpbmZvLCBzdG9yZWQgZm9yIGZ1cnRoZXIgb3V0ZXIgbW9kaWZpY2F0aW9ucyAqL1xuICBwdWJsaWMgc3RhZmZJbmZvOiBTdGFmZkluZm87XG4gIC8qKiAgU3RhZmYgY2xlZiBhcyBNSURJIHBpdGNoIG5vdGUgYXQgdGhlIHN0YWZmIDNyZCBsaW5lIChHIGNsZWYgLT4gQiA9IDcxKSAqL1xuICBwdWJsaWMgY2xlZjogbnVtYmVyO1xuICAvKiogVGhlIGJhciwgdGVtcG8sIHRpbWUgc2lnbmF0dXJlIGFuZCBrZXkgc2lnbmF0dXJlIGluZm8gYnkgcXVhcnRlcnMgKi9cbiAgcHVibGljIGJhcnNJbmZvOiBCYXJzSW5mbztcbiAgLyoqIFRoZSByZXN1dCBvZiBzdGFmZiBhbmFseXNpcyBvbiBzdGFmZiBibG9ja3MgaW5kZXhlZCBieSBzdGFydGluZyBxdWFydGVyICovXG4gIHB1YmxpYyBzdGFmZkJsb2NrTWFwOiBTdGFmZkJsb2NrTWFwO1xuICAvKiogTGFzdCBoYW5kbGVkIHF1YXJ0ZXIsIGkuZS4gc3RhZmYgbGVuZ3RoIGluIHF1YXJ0ZXJzICovXG4gIHByaXZhdGUgbGFzdFE6bnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYFN0YWZmTW9kZWxgIHN0b3JpbmcgaW5wdXQgZGF0YSBhbmQgcmVzdWx0XG4gICAqIEBwYXJhbSBzdGFmZkluZm8gR2VuZXJpYyBpbmZvcm1hdGlvbiBhYm91dCBhIHNjb3JlIHRvIGNyYXRlIGEgc3RhZmYgd2l0aFxuICAgKiBAcGFyYW0gZGVmYXVsdEtleSBEZWZhdWx0IHZhbHVlIHRvIHJlcGxhY2UgbWlzc2luZyBrZXkgYXQgYmFyIDBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YWZmSW5mbzogU3RhZmZJbmZvLCBkZWZhdWx0S2V5PzogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFmZkluZm8gPSBudWxsO1xuICAgIHRoaXMuY2xlZiA9IGd1ZXNzQ2xlZihzdGFmZkluZm8pO1xuICAgIHRoaXMuc3RhZmZCbG9ja01hcCA9IG51bGw7XG4gICAgdGhpcy51cGRhdGUoc3RhZmZJbmZvLCBkZWZhdWx0S2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgbmV3IHN0YWZmIGluZm8gdG8gdXBkYXRlIGludGVybmFsIG1vZGVsLiBJdCB3aWxsIG1vZGlmeSByZWNlaXZlZFxuICAgKiBzdGFmZiBpbmZvIGlmIGl0IGlzIGRpc29yZGVyZWQgb3IgaW5jb21wbGV0ZS5cbiAgICogQHBhcmFtIHN0YWZmSW5mbyBOZXcgc3RhZmYgaW5mb3JtYXRpb24gdG8gcmVwbGFjZSBwcmV2aW91cyBvbmVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoc3RhZmZJbmZvOiBTdGFmZkluZm8sIGRlZmF1bHRLZXk/OiBudW1iZXIpIHtcbiAgICBzdGFmZkluZm8ubm90ZXMuc29ydCggKHgsIHkpID0+IHguc3RhcnQgLSB5LnN0YXJ0ICk7XG5cbiAgICAvLyBUT0RPOiBGdWxsIHJldmlldyB0byBtYWtlIGl0IGluY3JlbWVudGFsIGF2b2lkaW5nIHVubmVkZWQgdXBkYXRlIHdvcmtcbiAgICB0aGlzLmxhc3RRID0gMDtcbiAgICBzdGFmZkluZm8ubm90ZXMuZm9yRWFjaChcbiAgICAgIG5vdGUgPT4ge1xuICAgICAgICBpZiAobm90ZS5zdGFydCArIG5vdGUubGVuZ3RoID4gdGhpcy5sYXN0USkge1xuICAgICAgICAgIHRoaXMubGFzdFEgPSBub3RlLnN0YXJ0ICsgbm90ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKHN0YWZmSW5mby50ZW1wb3MgJiYgc3RhZmZJbmZvLnRlbXBvcy5sZW5ndGgpIHtcbiAgICAgIHN0YWZmSW5mby50ZW1wb3Muc29ydCggKHgsIHkpID0+IHguc3RhcnQgLSB5LnN0YXJ0ICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhZmZJbmZvLnRlbXBvcyA9IFtERUZBVUxUX1RFTVBPXTtcbiAgICB9XG4gICAgaWYgKHN0YWZmSW5mby50ZW1wb3NbMF0uc3RhcnQgIT09IDApIHtcbiAgICAgIHN0YWZmSW5mby50ZW1wb3MgPSBbREVGQVVMVF9URU1QT10uY29uY2F0KHN0YWZmSW5mby50ZW1wb3MpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0aW5nS2V5OiBLZXlTaWduYXR1cmVJbmZvID0gZGVmYXVsdEtleT8gXG4gICAgICB7IHN0YXJ0OiAwLCBrZXk6IGRlZmF1bHRLZXkgfTogREVGQVVMVF9LRVlfU0lHTkFUVVJFO1xuICAgIGlmIChzdGFmZkluZm8ua2V5U2lnbmF0dXJlcyAmJiBzdGFmZkluZm8ua2V5U2lnbmF0dXJlcy5sZW5ndGgpIHtcbiAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzLnNvcnQoICh4LCB5KSA9PiB4LnN0YXJ0IC0geS5zdGFydCApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzID0gW3N0YXJ0aW5nS2V5XTtcbiAgICB9XG4gICAgaWYgKHN0YWZmSW5mby5rZXlTaWduYXR1cmVzWzBdLnN0YXJ0ICE9PSAwKSB7XG4gICAgICBzdGFmZkluZm8ua2V5U2lnbmF0dXJlcyA9IFxuICAgICAgICBbc3RhcnRpbmdLZXldLmNvbmNhdChzdGFmZkluZm8ua2V5U2lnbmF0dXJlcyk7XG4gICAgfVxuXG4gICAgaWYgKHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcyAmJiBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMubGVuZ3RoKSB7XG4gICAgICBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMuc29ydCggKHgsIHkpID0+IHguc3RhcnQgLSB5LnN0YXJ0ICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzID0gW0RFRkFVTFRfVElNRV9TSUdOQVRVUkVdO1xuICAgIH1cbiAgICBpZiAoc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzWzBdLnN0YXJ0ICE9PSAwKSB7XG4gICAgICBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMgPSBcbiAgICAgICAgW0RFRkFVTFRfVElNRV9TSUdOQVRVUkVdLmNvbmNhdChzdGFmZkluZm8udGltZVNpZ25hdHVyZXMpO1xuICAgIH1cblxuICAgIHRoaXMuYmFyc0luZm8gPSBuZXcgQmFyc0luZm8oc3RhZmZJbmZvLCB0aGlzLmxhc3RRKTtcblxuICAgIHRoaXMuaW5mb1RvQmxvY2tzKHN0YWZmSW5mbyk7XG4gIH1cblxuICAvKipcbiAgICogQW5hbHl6ZXMgc3RvcmVkIGluZm8gYW5kIGRlZmF1bHRzIHRvIHVwZGF0ZSBgc3RhZmZCbG9ja01hcGAsIHVubGVzcyB0aGVcbiAgICogc3RhZmYgaW5mbyByZWNlaXZlZCBoYXMgbm90IGNoYW5nZWQgKGluIGxlbmd0aCBvZiBpdHMgbWVtYmVycykuXG4gICAqIEBwYXJhbSBzdGFmZkluZm8gTmV3IHN0YWZmIGluZm9ybWF0aW9uIHRvIHJlcGxhY2UgcHJldmlvdXMgb25lLlxuICAgKiBAcmV0dXJucyBBbmFseXplZCBzdGFmZiBhcyBhbiBpbmRleGVkIHBlciBxdWFydGVyIGBTdGFmZkJsb2NrTWFwYFxuICAgKi9cbiAgcHJpdmF0ZSBpbmZvVG9CbG9ja3Moc3RhZmZJbmZvOiBTdGFmZkluZm8pOiBTdGFmZkJsb2NrTWFwIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YWZmQmxvY2tNYXAgPT09IG51bGwgfHwgLy8gQ29uc3RydWN0b3IgdXNlIGNhc2VcbiAgICAgIHN0YWZmSW5mby5ub3Rlcy5sZW5ndGggIT09IHRoaXMuc3RhZmZJbmZvLm5vdGVzLmxlbmd0aCB8fFxuICAgICAgc3RhZmZJbmZvLnRlbXBvcy5sZW5ndGggIT09IHRoaXMuc3RhZmZJbmZvLnRlbXBvcy5sZW5ndGggfHxcbiAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzLmxlbmd0aCAhPT0gdGhpcy5zdGFmZkluZm8ua2V5U2lnbmF0dXJlcy5sZW5ndGggfHxcbiAgICAgIHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcy5sZW5ndGggIT09IHRoaXMuc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzLmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy5zdGFmZkluZm8gPSBzdGFmZkluZm87XG4gICAgICB0aGlzLmxhc3RRID0gMDtcblxuICAgICAgLy8gR3JvdXAgbm90ZXMgaW50byBibG9ja3MsIHNldCBub3RlIHNwbGl0IHBvaW50c1xuICAgICAgY29uc3QgYmxvY2tzOiBTdGFmZkJsb2NrTWFwID0gbmV3IE1hcCgpO1xuICAgICAgLy8gVE9ETzogRnV0dXJlIGFwcHJvYWNoIHRvIHRoaXMuc3RhZmZCbG9ja01hcCBmb3IgaW5jcmVtZW50YWwgYmxvY2tzXG4gICAgICBjb25zdCBzcGxpdGVzID0gbmV3IFNldDxudW1iZXI+KCk7IC8vIFNwbGl0IHBvaW50cyA9IGJhcnMgKyBzdGFydHMgKyBlbmRzXG4gICAgICBsZXQgYmFyQWNjaWRlbnRhbHM6IEJhckFjY2lkZW50YWxzID0ge307IC8vIFRlbXBvcmFsIGFjY2lkZW50YWxzXG4gICAgICBsZXQgbGFzdEJhciA9IDA7XG4gICAgICBsZXQgbGFzdEJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhZmZJbmZvLm5vdGVzLmZvckVhY2goIFxuICAgICAgICBub3RlID0+IHtcbiAgICAgICAgICBjb25zdCBzdGFmZk5vdGUgPSB0b1N0YWZmTm90ZShub3RlKTtcbiAgICAgICAgICBjb25zdCBiYXJOdW1iZXIgPSB0aGlzLmJhcnNJbmZvLmJhck51bWJlckF0UShzdGFmZk5vdGUuc3RhcnQpO1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRCYXIgPSBNYXRoLnRydW5jKGJhck51bWJlcik7XG4gICAgICAgICAgaWYgKGN1cnJlbnRCYXIgPiBsYXN0QmFyKSB7XG4gICAgICAgICAgICBsYXN0QmFyID0gY3VycmVudEJhcjtcbiAgICAgICAgICAgIGJhckFjY2lkZW50YWxzID0ge307IC8vIFJlc2V0XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGtleVNpZ25hdHVyZSA9IHRoaXMuYmFyc0luZm8ua2V5U2lnbmF0dXJlQXRRKHN0YWZmTm90ZS5zdGFydCk7XG4gICAgICAgICAgcGxhY2VOb3RlKHN0YWZmTm90ZSwgYmFyQWNjaWRlbnRhbHMsIHRoaXMuY2xlZiwga2V5U2lnbmF0dXJlKTtcbiAgICAgICAgICBjb25zdCBzdGFmZk5vdGVFbmQgPSBzdGFmZk5vdGUuc3RhcnQgKyBzdGFmZk5vdGUubGVuZ3RoO1xuICAgICAgICAgIGNvbnN0IGxhc3RCbG9ja0xlbmd0aCA9IGxhc3RCbG9jayA/IGxhc3RCbG9jay5sZW5ndGggOiAwO1xuXG4gICAgICAgICAgY29uc3QgY3VycmVudEJsb2NrID0gbm90ZVRvQmxvY2tzKHN0YWZmTm90ZSwgYmxvY2tzLCBiYXJOdW1iZXIpO1xuICAgICAgICAgIGlmIChjdXJyZW50QmxvY2sgPT09IGxhc3RCbG9jaykgeyAvLyBBZGRpbmcgbm90ZXMgdG8gY3VycmVudCBibG9ja1xuICAgICAgICAgICAgaWYgKHN0YWZmTm90ZS5sZW5ndGggPCBsYXN0QmxvY2subGVuZ3RoKSB7IC8vIFNwbGl0IHRvIHN0YWZmTm90ZVxuICAgICAgICAgICAgICBjb25zdCBzcGxpdHRlZEJsb2NrID0gXG4gICAgICAgICAgICAgICAgY3VycmVudEJsb2NrLnNwbGl0KHN0YWZmTm90ZUVuZCwgdGhpcy5iYXJzSW5mbyk7XG4gICAgICAgICAgICAgIHNwbGl0dGVkQmxvY2subWVyZ2VUb01hcChibG9ja3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGFzdEJsb2NrTGVuZ3RoIDwgc3RhZmZOb3RlLmxlbmd0aCl7IC8vIFNwbGl0IHRvIGxhc3RCbG9ja1xuICAgICAgICAgICAgICBjb25zdCBxdWFydGVycyA9IGxhc3RCbG9jay5zdGFydCArIGxhc3RCbG9ja0xlbmd0aDtcbiAgICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWRCbG9jayA9IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9jay5zcGxpdChxdWFydGVycywgdGhpcy5iYXJzSW5mbyk7XG4gICAgICAgICAgICAgIHNwbGl0dGVkQmxvY2subWVyZ2VUb01hcChibG9ja3MpO1xuICAgICAgICAgICAgICB0aGlzLmxhc3RRID0gc3RhZmZOb3RlRW5kO1xuICAgICAgICAgICAgfSAvLyBPdGhlcndpc2UsIHNhbWUgbGVuZ3RoLCBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgeyAvLyBBZGRpbmcgbm90ZXMgdG8gYSBuZXcgYmxvY2tcbiAgICAgICAgICAgIGlmIChzdGFmZk5vdGUuc3RhcnQgPiB0aGlzLmxhc3RRKSB7IC8vIEJsb2NrcyBnYXAgbWVhbnMgYSBwcmlvciByZXN0XG4gICAgICAgICAgICAgIGNvbnN0IHF1YXJ0ZXJzID0gdGhpcy5sYXN0UTtcbiAgICAgICAgICAgICAgY29uc3QgYmFyID0gdGhpcy5iYXJzSW5mby5iYXJOdW1iZXJBdFEocXVhcnRlcnMpO1xuICAgICAgICAgICAgICBjb25zdCByZXN0QmxvY2sgPSBuZXcgU3RhZmZCbG9jayhcbiAgICAgICAgICAgICAgICBxdWFydGVycywgc3RhZmZOb3RlLnN0YXJ0IC0gdGhpcy5sYXN0USwgW10sIGJhclxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXN0QmxvY2subWVyZ2VUb01hcChibG9ja3MpO1xuICAgICAgICAgICAgICB0aGlzLmxhc3RRID0gc3RhZmZOb3RlRW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhZmZOb3RlLnN0YXJ0IDwgdGhpcy5sYXN0USkgeyAvLyBOZXcgYmxvY2sgc3RhcnQgb3ZlcmxhcHNcbiAgICAgICAgICAgICAgc3BsaXRlcy5hZGQoc3RhZmZOb3RlLnN0YXJ0KTtcbiAgICAgICAgICAgICAgaWYgKHN0YWZmTm90ZUVuZCA8IHRoaXMubGFzdFEpIHsgLy8gTmV3IGJsb2NrIGVuZCBvdmVybGFwcyB0b29cbiAgICAgICAgICAgICAgICBzcGxpdGVzLmFkZChzdGFmZk5vdGVFbmQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubGFzdFEgPCBzdGFmZk5vdGVFbmQpIHsgLy8gT2xkIGJsb2NrIG92ZXJsYXBzIG5ld1xuICAgICAgICAgICAgICAgIHNwbGl0ZXMuYWRkKHRoaXMubGFzdFEpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFEgPSBzdGFmZk5vdGVFbmQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyBPdGhlcndpc2UsIGNvbnNlY3V0aXZlIGJsb2Nrc1xuICAgICAgICAgICAgICB0aGlzLmxhc3RRID0gc3RhZmZOb3RlRW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdEJsb2NrID0gY3VycmVudEJsb2NrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgLy8gVE9ETzogSW5zZXJ0IGluIHByZXZpb3VzIHBhc3Mgb3B0aW1pemluZyB3aXRoIGl0ZXJhdG9ycyAoT14yIC0+IGxpbmVhbClcbiAgICAgIC8vIDJuZCBwYXNzIHRvIGFwcGx5IGFsbCBzcGxpdGVzIHRvIHRoZSByaWdodCBjaHVua3NcbiAgICAgIGNvbnN0IHNvcnRlZFNwbGl0ZXMgPSBBcnJheS5mcm9tKHNwbGl0ZXMpLnNvcnQoKHgsIHkpID0+IHggLSB5KTtcbiAgICAgIHNvcnRlZFNwbGl0ZXMuZm9yRWFjaChcbiAgICAgICAgcXVhcnRlcnMgPT4ge1xuICAgICAgICAgIGJsb2Nrcy5mb3JFYWNoKFxuICAgICAgICAgICAgY3VycmVudEJsb2NrID0+IHtcbiAgICAgICAgICAgICBjb25zdCBzcGxpdHRlZEJsb2NrID0gXG4gICAgICAgICAgICAgICAgY3VycmVudEJsb2NrLnNwbGl0KHF1YXJ0ZXJzLCB0aGlzLmJhcnNJbmZvKTtcbiAgICAgICAgICAgICAgaWYgKHNwbGl0dGVkQmxvY2spIHtcbiAgICAgICAgICAgICAgICBzcGxpdHRlZEJsb2NrLm1lcmdlVG9NYXAoYmxvY2tzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBTb3J0aW5nIGZvciBmdXJ0aGVyIGl0ZXJhdGlvblxuICAgICAgdGhpcy5zdGFmZkJsb2NrTWFwID0gXG4gICAgICAgIG5ldyBNYXAoQXJyYXkuZnJvbShibG9ja3MpLnNvcnQoKHgsIHkpID0+IHhbMF0gLSB5WzBdKSk7XG5cbiAgICAgIC8vIDNyZCBwYXNzIHRvIGFwcGx5IHR1cGxldHMgYW5kIHJpdGhtIHNwbGl0dGluZyBhbmQgYXNzb2NpYXRpb25cbiAgICAgIGNvbnN0IHN0YWZmQmxvY2tNYXA6IFN0YWZmQmxvY2tNYXAgPSBuZXcgTWFwKCk7XG4gICAgICBsZXQgbGFzdFN0YWZmQmxvY2s6IFN0YWZmQmxvY2sgPSBudWxsO1xuICAgICAgdGhpcy5zdGFmZkJsb2NrTWFwLmZvckVhY2goXG4gICAgICAgIGN1cnJlbnRCbG9jayA9PiB7XG4gICAgICAgICAgbGV0IHJlbWFpbmluZ0Jsb2NrID0gbnVsbDtcbiAgICAgICAgICBkb3tcbiAgICAgICAgICAgIHJlbWFpbmluZ0Jsb2NrID0gY3VycmVudEJsb2NrLnNwbGl0VG9CZWF0KHRoaXMuYmFyc0luZm8pO1xuICAgICAgICAgICAgY29uc3QgaW5jcmVhc2luZyA9IFxuICAgICAgICAgICAgICAhY3VycmVudEJsb2NrLmJlYXRCZWdpbiAmJiBjdXJyZW50QmxvY2suYmVhdEVuZDtcbiAgICAgICAgICAgIGxldCByZW1haW5pbmdTeW1ib2xzQmxvY2s6IFN0YWZmQmxvY2sgPSBudWxsO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICByZW1haW5pbmdTeW1ib2xzQmxvY2sgPSBcbiAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2suc3BsaXRUb1N5bWJvbHModGhpcy5iYXJzSW5mbywgaW5jcmVhc2luZyk7XG4gICAgICAgICAgICAgIGN1cnJlbnRCbG9jay5zZXRCZWFtaW5nKGxhc3RTdGFmZkJsb2NrLCB0aGlzLmJhcnNJbmZvKTtcbiAgICAgICAgICAgICAgY3VycmVudEJsb2NrLm1lcmdlVG9NYXAoc3RhZmZCbG9ja01hcCk7XG4gICAgICAgICAgICAgIGlmIChyZW1haW5pbmdTeW1ib2xzQmxvY2spIHtcbiAgICAgICAgICAgICAgICBsYXN0U3RhZmZCbG9jayA9IGN1cnJlbnRCbG9jaztcbiAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2sgPSByZW1haW5pbmdTeW1ib2xzQmxvY2s7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKHJlbWFpbmluZ1N5bWJvbHNCbG9jayk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nQmxvY2spIHtcbiAgICAgICAgICAgICAgbGFzdFN0YWZmQmxvY2sgPSBjdXJyZW50QmxvY2s7XG4gICAgICAgICAgICAgIGN1cnJlbnRCbG9jayA9IHJlbWFpbmluZ0Jsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKHJlbWFpbmluZ0Jsb2NrKTsgLy8gRWFjaCBibG9jayBjYW4gaG9sZCBtb3JlIHRoYW4gb25lIGJlYXRcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHRoaXMuc3RhZmZCbG9ja01hcCA9IHN0YWZmQmxvY2tNYXA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YWZmQmxvY2tNYXA7XG4gIH1cbiAgXG59XG5cbi8qKlxuICogQ29udmVydHMgYSBub3RlIGZyb20gYE5vdGVJbmZvYCBpbnRlcmZhY2UgdG8gYFN0YWZmTm90ZWAgaW50ZXJmYWNlLiBJdCBcbiAqIHJlc2V0cyBgdlN0ZXBgIGFuZCBgYWNjaWRlbnRhbGAgdG8gemVybyBhbmQgbGV0cyBgdGllZEZyb21gIGFuZCBgdGllZFRvYFxuICogYXMgYHVuZGVmaW5lZGAuXG4gKiBAcGFyYW0gbm90ZSBUaGUgbm90ZSB0byBiZSBjb252ZXJ0ZWRcbiAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgbm90ZVxuICovXG5mdW5jdGlvbiB0b1N0YWZmTm90ZShub3RlOiBOb3RlSW5mbyk6IFN0YWZmTm90ZSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IG5vdGUuc3RhcnQsXG4gICAgbGVuZ3RoOiBub3RlLmxlbmd0aCxcbiAgICBwaXRjaDogbm90ZS5waXRjaCxcbiAgICBpbnRlbnNpdHk6IG5vdGUuaW50ZW5zaXR5LFxuICAgIHZTdGVwczogMCwgLy8gRGVsYXllZCBhc3NpZ25hdGlvbiB0aWxsIHBsYWNlTm90ZSgpIGNhbGxcbiAgICBhY2NpZGVudGFsOiAwIC8vIERlbGF5ZWQgYXNzaWduYXRpb24gdGlsbCBwbGFjZU5vdGUoKSBjYWxsXG4gIH07XG59XG5cbi8qKlxuICogU2V0cyBvciBhcHBlbmRzIGEgbm90ZSBpbnRvIGEgbmV3IG9yIGV4aXN0aW5nIGJsb2NrLCByZXNwZWN0aXZlbHksIFxuICogcmV0dXJuaW5nIGl0LlxuICogQHBhcmFtIG5vdGUgTm90ZSB0byBiZSBpbmNsdWRlZCBpbnRvIGEgYmxvY2sgbWFwIGluZGV4ZWQgYnkgc3RhcnRpbmcgcXVhcnRlclxuICogQHBhcmFtIGJsb2NrcyBCbG9jayBtYXAgdG8gaG9sZCBub3Rlc1xuICogQHJldHVybnMgVGhlIGJsb2NrIHdoZXJlIHRoZSBub3RlIGhhcyBiZWVuIHNldHRlZCBvciBhcHBlbmRlZFxuICovXG5mdW5jdGlvbiBub3RlVG9CbG9ja3Mobm90ZTogU3RhZmZOb3RlLCBibG9ja3M6IFN0YWZmQmxvY2tNYXAsIGJhck51bWJlcjogbnVtYmVyKVxuOiBTdGFmZkJsb2NrIHtcbiAgaWYgKGJsb2Nrcy5oYXMobm90ZS5zdGFydCkpIHtcbiAgICBjb25zdCBleGlzdGluZ0Jsb2NrID0gYmxvY2tzLmdldChub3RlLnN0YXJ0KTtcbiAgICBleGlzdGluZ0Jsb2NrLmFkZE5vdGUobm90ZSk7XG4gICAgcmV0dXJuIGV4aXN0aW5nQmxvY2s7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgbmV3QmxvY2sgPSBuZXcgU3RhZmZCbG9jayhcbiAgICAgIG5vdGUuc3RhcnQsIG5vdGUubGVuZ3RoLCBbbm90ZV0sIGJhck51bWJlciwgbm90ZS52U3RlcHMsIG5vdGUudlN0ZXBzXG4gICAgKTtcbiAgICBuZXdCbG9jay5tZXJnZVRvTWFwKGJsb2Nrcyk7XG4gICAgcmV0dXJuIG5ld0Jsb2NrO1xuICB9XG59XG5cbi8qKlxuICogQW5hbHl6ZXMgYSBub3RlIGJhc2VkIG9uIGZ1bGwgYWNjaWRlbnRhbHMgY29udGV4dCwgdXBkYXRpbmcgYGJhckFjY2lkZW50YWxzYFxuICogQHBhcmFtIHN0YWZmTm90ZSBOb3RlIHRvIGJlIGFuYWx5emVkIFxuICogQHBhcmFtIGJhckFjY2lkZW50YWxzIEFjdGl2ZSBhY2NpZGVudGFscyBpbiBjdXJyZW50IGJhclxuICogQHBhcmFtIGNsZWYgQ29udGV4dHVhbCBhcHBsaWNhYmxlIGNsZWZcbiAqIEBwYXJhbSBrZXkgQ29udGV4dHVhbCBhcHBsaWNhYmxlIGtleVxuICovXG5mdW5jdGlvbiBwbGFjZU5vdGUoXG4gIHN0YWZmTm90ZTogU3RhZmZOb3RlLCBiYXJBY2NpZGVudGFsczogQmFyQWNjaWRlbnRhbHMsIGNsZWY6bnVtYmVyLCBrZXk6bnVtYmVyXG4pIHtcbiAgY29uc3QgcGl0Y2hEZXRhaWxzID0gZ2V0Tm90ZURldGFpbHMoc3RhZmZOb3RlLnBpdGNoLCBjbGVmLCBrZXkpO1xuICBpZiAocGl0Y2hEZXRhaWxzLnZTdGVwcyBpbiBiYXJBY2NpZGVudGFscykgeyAvLyBQcmV2aW91cyBvY2N1cnJlbmNlXG4gICAgaWYgKHBpdGNoRGV0YWlscy5hY2NpZGVudGFsID09PSBiYXJBY2NpZGVudGFsc1twaXRjaERldGFpbHMudlN0ZXBzXSkge1xuICAgICAgcGl0Y2hEZXRhaWxzLmFjY2lkZW50YWwgPSAwOyAvLyBJZ25vcmUgcmVwZXRpdGlvbnNcbiAgICB9XG4gICAgZWxzZSB7IC8vIFJlcGxhY2Ugd2l0aCB0aGUgbmV3IG9uZVxuICAgICAgaWYgKGJhckFjY2lkZW50YWxzW3BpdGNoRGV0YWlscy52U3RlcHNdID09PSAzKSB7XG4gICAgICAgIC8vIElmIGNoYW5naW5nIGZyb20gbm9ybWFsIGFjY2lkZW50YWwsIGZvcmNlIGtleSBhY2NpZGVudGFsXG4gICAgICAgIHBpdGNoRGV0YWlscy5hY2NpZGVudGFsID0gcGl0Y2hEZXRhaWxzLmtleUFjY2lkZW50YWw7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9PT0gMCkge1xuICAgICAgICAvLyBPdGhlcndpc2UsIGNoYW5naW5nIHRvIG5vIGFjY2lkZW50YWwsIGZvcmNlIG5vcm1hbFxuICAgICAgICBwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9IDM7XG4gICAgICB9XG4gICAgICBiYXJBY2NpZGVudGFsc1twaXRjaERldGFpbHMudlN0ZXBzXSA9IHBpdGNoRGV0YWlscy5hY2NpZGVudGFsO1xuICAgIH1cbiAgfVxuICBlbHNlIHsgLy8gUmVnaXN0ZXIgbmV3IG9jY3VycmVuY2VcbiAgICBpZiAoc3RhZmZOb3RlLnRpZWRGcm9tKSB7IC8vIFVubGVzcyBpdCBpcyBhIHRpZWQgbm90ZSAoZXZlbiBhZnRlciBiYXIgcmVzZXQpXG4gICAgICBwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9IDA7IC8vIFRpZWQgbm90ZXMgdXNlIHRoZSBpbml0YWwgYWNjaWRlbnRhbFxuICAgIH1cbiAgICBiYXJBY2NpZGVudGFsc1twaXRjaERldGFpbHMudlN0ZXBzXSA9IHBpdGNoRGV0YWlscy5hY2NpZGVudGFsO1xuICB9XG4gIHN0YWZmTm90ZS52U3RlcHMgPSBwaXRjaERldGFpbHMudlN0ZXBzO1xuICBzdGFmZk5vdGUuYWNjaWRlbnRhbCA9IHBpdGNoRGV0YWlscy5hY2NpZGVudGFsO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5vdGUgZGV0YWlscyBmcm9tIHBpdGNoIHZhbHVlIGFjY29yZGluZyBvdmVyYWxsIHN0YWZmIGNvbnRleHRcbiAqIEBwYXJhbSBub3RlUGl0Y2ggcGl0Y2ggb2YgdGhlIG5vdGUgdG8gZ2V0IHRoZSBkZXRhaWxzIGZyb21cbiAqIEBwYXJhbSBjbGVmIEVuY29kZWQgYXMgTUlESSBwaXRjaCBub3RlIGF0IHRoZSAzcmQgbGluZSAoRyBjbGVmIC0+IEIgPSA3MSlcbiAqIEBwYXJhbSBrZXkgRW5jb2RlZCBhcyBzZW1pdG9uZXMgKDAgPSBDLCAxID0gQyMsIC4uLiAxMSA9IEIpXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2hlcmUgYHZTdGVwczpgIGlzIHRoZSBub3RlIGhlaWdodCBpbiB0aGUgc3RhZmYsXG4gKiBgYWNjaWRlbnRhbDpgIGlzIHRoZSBhY2NpZGVudGFsIHRvIGJlIGRyYXduIGlmIGl0IHdlcmUgYXBwbGllZCBDIGtleSBhbmQgXG4gKiBga2V5QWNjaWRlbnRhbDpgIGlzIHRoZSBhY2NpZGVudGFsIGZvcmNlZCBieSBjdXJyZW50IGtleSwgaWYgYW55XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb3RlRGV0YWlscyhub3RlUGl0Y2g6IG51bWJlciwgY2xlZjogbnVtYmVyLCBrZXk6IG51bWJlcilcbjoge3ZTdGVwczogbnVtYmVyLCBhY2NpZGVudGFsOiBudW1iZXIsIGtleUFjY2lkZW50YWw6IG51bWJlcn0ge1xuICBjb25zdCBzZW1pdG9uZXMgPSBub3RlUGl0Y2ggLSA2MDtcbiAgY29uc3Qgb2N0YXZlID0gTWF0aC5mbG9vcihzZW1pdG9uZXMgLyAxMik7XG4gIGNvbnN0IHJlbWluZGVyU2VtaXRvbmVzID0gc2VtaXRvbmVzIC0gMTIgKiBvY3RhdmU7XG4gIGNvbnN0IHN0ZXBzID0gU0NBTEVTW2tleV0uc3RlcHNbcmVtaW5kZXJTZW1pdG9uZXNdO1xuICBjb25zdCBvZmZzZXQgPSAoY2xlZiA9PT0gNzEpID8gNiA6IC02O1xuICBjb25zdCBub3RlSW5LZXkgPSBLRVlfQUNDSURFTlRBTFNba2V5XS5hY2NpZGVudGFsID09PSAxID9cbiAgICA2OSArIChyZW1pbmRlclNlbWl0b25lcyArIDMpICUgMTIgOiA2NCArIChyZW1pbmRlclNlbWl0b25lcyArIDgpICUgMTI7XG4gIHJldHVybiB7XG4gICAgdlN0ZXBzOiBvZmZzZXQgLSA3ICogb2N0YXZlICsgc3RlcHMsIFxuICAgIGFjY2lkZW50YWw6IFNDQUxFU1trZXldLmFjY2lkZW50YWxbcmVtaW5kZXJTZW1pdG9uZXNdLFxuICAgIGtleUFjY2lkZW50YWw6IFxuICAgICAgS0VZX0FDQ0lERU5UQUxTW2tleV0ucGl0Y2hlcy5pbmRleE9mKG5vdGVJbktleSkgPiAtMSA/XG4gICAgICAgIEtFWV9BQ0NJREVOVEFMU1trZXldLmFjY2lkZW50YWwgOiAwXG4gIH07XG59XG5cbi8qKlxuICogQ2xlZiBkZWR1Y3Rpb246IEF2ZXJhZ2UgcGl0Y2ggdW5kZXIgQzQgLT4gRiBjbGVmLCBvdGhlcndpc2UgRyBjbGVmXG4gKiBAcmV0dXJucyBUaGUgZGVkdWN0ZWQgY2xlZiBhcyBNaWRpIHBpdGNoIHZhbHVlc1xuICovXG5mdW5jdGlvbiBndWVzc0NsZWYoc3RhZmZJbmZvOiBTdGFmZkluZm8pOiBudW1iZXIge1xuICBsZXQgcGl0Y2hTdW0gPSAwO1xuICBsZXQgY291bnRTdW0gPSAwO1xuICBzdGFmZkluZm8ubm90ZXMuZm9yRWFjaChcbiAgICBub3RlID0+IHtcbiAgICAgIHBpdGNoU3VtICs9IG5vdGUucGl0Y2g7XG4gICAgICArK2NvdW50U3VtO1xuICAgIH1cbiAgKTtcbiAgY29uc3QgYXZlcmFnZVBpdGNoID0gcGl0Y2hTdW0gLyBjb3VudFN1bTtcbiAgcmV0dXJuIGF2ZXJhZ2VQaXRjaCA8IDYwID8gQkFTU19DTEVGIDogVFJFQkxFX0NMRUY7IC8vIDYwIGlzIEMzIE1JREkgdmFsdWVcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1xuICBTVEVNX1dJRFRILCBMSU5FX1NUUk9LRSwgQ09NUEFDVF9TUEFDSU5HXG59IGZyb20gJy4vcmVuZGVyX2NvbnN0YW50cyc7XG5cbmltcG9ydCB7XG4gIFNWR05TLCBkcmF3U1ZHUGF0aCwgZHJhd1NWR1RleHQsIGNyZWF0ZVNWR0dyb3VwQ2hpbGQsIHNldEZhZGUsIHNldEZpbGwsXG4gIHNldFN0cm9rZSwgaGlnaGxpZ2h0RWxlbWVudFxufSBmcm9tICcuL3N2Z190b29scyc7XG5cbmltcG9ydCAge1xuICBQQVRIX1NDQUxFLCBOT1RFX1BBVEhTLCBSRVNUX1BBVEhTLCBDTEVGX1BBVEhTLCBBQ0NJREVOVEFMX1BBVEhTLFxuICBzdGFmZkxpbmVQYXRoLCBleHRyYUxpbmVQYXRoLCBiYXJQYXRoLCBzdGVtUGF0aCwgc2luZ2xlRmxhZ1BhdGgsIFxuICBtdWx0aUZsYWdQYXRoLCB0aWVQYXRoLCBkb3RQYXRoXG59IGZyb20gJy4vc3ZnX3BhdGhzJztcblxuaW1wb3J0IHtcbiAgU3RhZmZJbmZvLCBUaW1lU2lnbmF0dXJlSW5mbywgTm90ZUluZm8sIGdldEJhckxlbmd0aFxufSBmcm9tICcuL3N0YWZmX2luZm8nO1xuXG5pbXBvcnQge1xuICBTdGFmZkJsb2NrLCBTdGFmZk5vdGVcbn0gZnJvbSAnLi9zdGFmZl9ibG9jayc7XG5cbmltcG9ydCB7XG4gIFN0YWZmTW9kZWwsIGdldE5vdGVEZXRhaWxzLCBLRVlfQUNDSURFTlRBTFNcbn0gZnJvbSAnLi9zdGFmZl9tb2RlbCc7XG5cbi8qKlxuICogTm90ZSByZXNvbHV0aW9uIGluIGZyYWN0aW9ucyBvZiBxdWFydGVyLiBObyBub3RlIHNob3J0ZXIgdGhhbiAxLzE2IG9mIGEgXG4gKiBxdWFydGVyIHdpbGwgYmUgcmVuZGVyZWQuIFRoaXMgbGltaXQgZXF1YWxzIHRvIHNpeHR5LWZvdXJ0aCBub3Rlcy4gXG4gKi9cbmV4cG9ydCBjb25zdCBNQVhfUVVBUlRFUl9ESVZJU0lPTiA9IDE2OyBcblxuLyoqXG4gKiBFbnVtZXJhdGlvbiBvZiBkaWZmZXJlbnQgd2F5cyBvZiBob3Jpem9udGFsIHNjb3JlIHNjcm9sbGluZywgbGlrZSBwYWdpbmFnZWRcbiAqIChQQUdFIGlzIGRlZmF1bHQgdmFsdWUpLCBub3RlIGJ5IG5vdGUgKE5PVEUpIG9yIGluIHBhY2tlZCBjaHVua3MgYnkgZG9pbmcgXG4gKiBzY3JvbGwganVzdCBvbiBiYXIgc3RhcnRpbmcgKEJBUikuXG4gKi9cbmV4cG9ydCBlbnVtIFNjcm9sbFR5cGUge1xuICAvKiogXG4gICAqIFBhZ2luYXRlZCBob3Jpem9udGFsIHNjcm9sbGluZywgYWR2YW5jaW5nIHRoZSBzY3JvbGwgdG8gbmV4dCBwYWdlIG9uY2UgYVxuICAgKiBvdXQgb2Ygc2NyZWVuIG5vdGUgaXMgaGlnaGxpdGVkLCBjb25zaWRlcmluZyBlYWNoIHBhZ2Ugd2hhdCBob3Jpem9udGFsbHkgXG4gICAqIGZpdHMgb24gb25lIHNjcmVlbi4gVGhpcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAgICovXG4gIFBBR0UgPSAwLFxuICAvKipcbiAgICogTm90ZSBieSBub3RlIGhvcml6b250YWwgc2Nyb2xsaW5nLCBhZHZhbmNpbmcgdGhlIHNjcm9sbCB0byBjZW50ZXIgb24gXG4gICAqIHNjcmVlbiBldmVyeSBuZXcgaGlnaGxpZ2h0ZWQgbm90ZS5cbiAgICovXG4gIE5PVEUgPSAxLFxuICAvKipcbiAgICogUGVyIGJhciBob3Jpem9udGFsIHNjcm9sbGluZywgYWR2YW5jaW5nIHRoZSBzY3JvbGwgdG8gY2VudGVyIHRoZSBiZWdpbm5pbmdcbiAgICogb2YgYSBuZXcgc3RhcnRpbmcgYmFyIG9uY2UgaXRzIGZpcnN0IG5vdGUgaXMgaGlnaGxpZ2h0ZWQuXG4gICAqL1xuICBCQVIgPSAyXG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBwcm92aWRpbmcgY29uZmlndXJhYmxlIHByb3BlcnRpZXMgdG8gYSBTdGFmZlJlbmRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGFmZlJlbmRlckNvbmZpZyB7XG4gIC8qKiBUaGUgdmVydGljYWwgaGVpZ2h0IGluIHBpeGVscyBvZiBhIG5vdGUgKi9cbiAgbm90ZUhlaWdodD86IG51bWJlcjtcbiAgLyoqIE51bWJlciBvZiBob3Jpem9udGFsIHBpeGVscyBiZXR3ZWVuIGVhY2ggbm90ZSAqL1xuICBub3RlU3BhY2luZz86IG51bWJlcjtcbiAgLyoqIFxuICAgKiBUaGUgaG9yaXpvbnRhbCBzY2FsZSBhdCB3aGljaCBub3RlcyBhcmUgZHJhd24gKHRoZSBiaWdnZXIgdGhpcyB2YWx1ZSwgXG4gICAqIHRoZSBcIndpZGVyXCIgYSBub3RlIGxvb2tzKVxuICAgKi9cbiAgcGl4ZWxzUGVyVGltZVN0ZXA/OiBudW1iZXI7XG4gIC8qKiBUaGUgY29sb3IgKGFzIGFuIFJHQiBjb21tYSBzZXBhcmF0ZWQgc3RyaW5nKSBvZiBhIG5vbiBwbGF5ZWQgbm90ZSAqL1xuICBub3RlUkdCPzogc3RyaW5nO1xuICAvKiogXG4gICAqIFRoZSBjb2xvciAoYXMgYW4gUkdCIGNvbW1hIHNlcGFyYXRlZCBzdHJpbmcpIG9mIGFuIGFjdGl2ZSBub3RlIGJlaW5nIFxuICAgKiBwbGF5ZWRcbiAgICovXG4gIGFjdGl2ZU5vdGVSR0I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbXVzaWNhbCBrZXkgdGhlIHNjb3JlIG11c3QgdXNlIHRvIGFkYXB0IHRoZSBzY29yZSB0byB0aGUgcmlnaHQgXG4gICAqIGFjY2lkZW50YWxzLiBJdCBjYW4gYmUgb3ZlcndyaXR0ZW4gd2l0aCBgU3RhZmZJbmZvLmtleVNpZ25hdHVyZXNgIFxuICAgKiB2YWx1ZSBhdCB0aW1lIG9yIHN0ZXAgMC4gSWYgbm90IGFzc2lnbmVkIGl0IHdpbGwgYmUgYXN1bWVkIEMga2V5LlxuICAgKi9cbiAgZGVmYXVsdEtleT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNldHMgc2Nyb2xsaW5nIHRvIGZvbGxvdyBzY29yZXBsYXlpbmcgaW4gZGlmZmVyZW50IHdheXMgYWNjb3JkaW5nIHRvIFxuICAgKiBgU2Nyb2xsVHlwZWAgZW51bSB2YWx1ZXMuXG4gICAqL1xuICBzY3JvbGxUeXBlPzogU2Nyb2xsVHlwZTtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgdG8gaG9sZCB0ZW1wb3JhcnkgaW5mb3JtYXRpb24gZm9yIHZpc3VhbCByZW5kZXJpbmdcbiAqL1xuaW50ZXJmYWNlIExpbmtlZFNWR0RldGFpbHMge1xuICAvKiogeCBwb3NpdGlvbiBhdCB0aGUgcmlnaHQgb2YgdGhlIG5vdGUgaGVhZCB0byBkcmF3IHRpZXMgKi9cbiAgeEhlYWRSaWdodDogbnVtYmVyO1xuICAvKiogU1ZHIEdyb3VwIHRvIGhvbGQgdGllZCBub3RlcyBpbnRvICovXG4gIGc/OiBTVkdFbGVtZW50O1xufVxuXG4vKipcbiAqIFRoZSB0ZW1wb3JhcnkgbWFwIHRvIGxvY2F0ZSBsaW5rZWQgdmlzdWFsIHJlc291cmNlcyBvbiBiaW5kaW5nc1xuICovXG50eXBlIExpbmtlZE5vdGVNYXAgPSBNYXA8U3RhZmZOb3RlLCBMaW5rZWRTVkdEZXRhaWxzPjtcblxuLyoqXG4gKiBEaXNwbGF5cyBhIGBTdGFmZkluZm9gIGFzIGEgc3RhZmYgb24gYSBnaXZlbiBgRElWYC4gXG4gKiBcbiAqIFN0YWZmIGlzIHNjYWxlZCB0byBmaXQgdmVydGljYWxseSBgY29uZmlnLm5vdGVIZWlnaHRgIGFuZCBub3RlIGhvcml6b250YWwgXG4gKiBwb3NpdGlvbiBjYW4gYmVoYXZlIGluIHR3byBkaWZmZXJlbnQgd2F5czogSWYgYGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcGAgXG4gKiBpcyBncmVhdGVyIHRoYW4gemVybywgaG9yaXpvbnRhbCBwb3NpdGlvbiB3aWxsIGJlIHByb3BvcnRpb25hbCB0byBpdHMgXG4gKiBzdGFydGluZyB0aW1lLCBhbGxvd2luZyB0byBwaWxlIHNldmVyYWwgaW5zdGFuY2VzIGZvciBkaWZmZXJlbnQgdm9pY2VzIFxuICogKHBhcnRzKS4gT3RoZXJ3aXNlLCByZXN1bHRpbmcgc3RhZmYgd2lsbCBkaXNwbGF5IG5vdGVzIGluIGEgY29tcGFjdCBmb3JtLCBcbiAqIHVzaW5nIG1pbmltdW0gaG9yaXpvbnRhbCBzcGFjZSBiZXR3ZWVuIG11c2ljYWwgc3ltYm9scyBhcyByZWd1bGFyIHBhcGVyIFxuICogc3RhZmYgZG9lcy5cbiAqXG4gKiBDbGVmLCBrZXkgYW5kIHRpbWUgc2lnbmF0dXJlIHdpbGwgYmUgZGlzcGxheWVkIGF0IHRoZSBsZWZ0bW9zdCBzaWRlIGFuZCB0aGUgXG4gKiByZXN0IG9mIHRoZSBzdGFmZiB3aWxsIHNjcm9sbCB1bmRlciB0aGlzIGluaXRpYWwgc2lnbmF0dXJlIGFyZWEgYWNjb3JkaW5nbHkuXG4gKiBJbiBjYXNlIG9mIHByb3BvcnRpb25hbCBub3RlIHBvc2l0aW9uaW5nLCBnaXZlbiBpdCBzdGFydHMgYXQgcGl4ZWwgemVybywgdGhlXG4gKiBzaWduYXR1cmUgYXJlYSB3aWxsIGJsaW5rIG1lYW53aGlsZSBpdCBjb2xsaWRlcyB3aXRoIGluaXRpYWwgYWN0aXZlIG5vdGVzLlxuICogS2V5IGFuZCB0aW1lIHNpZ25hdHVyZSBjaGFuZ2VzIHdpbGwgYmUgc2hvd24gYWNjb3JkaW5nbHkgdGhyb3VnaCBzY29yZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YWZmU1ZHUmVuZGVyIHtcbiAgLyoqIFRoZSBhY3R1YWwgbXVzaWMgc2NvcmUgZGF0YSB0byBiZSByZW5kZXJlZCAqL1xuICBwdWJsaWMgc3RhZmZJbmZvOiBTdGFmZkluZm87XG4gIC8qKiBJbnRlcm1lZGlhdGUgc3RhZmYgbW9kZWwgYXJyYW5nZWQgaW4gbm9uLW92ZXJsYXBwZWQgYmxvY2tzICovXG4gIHB1YmxpYyBzdGFmZk1vZGVsOiBTdGFmZk1vZGVsO1xuICAvKiogSG93IGl0IGhhcyB0byBiZSByZW5kZXJlZCAqL1xuICBwcml2YXRlIGNvbmZpZzogU3RhZmZSZW5kZXJDb25maWc7XG4gIC8qKiBGdWxsIHNjb3JlIGhlaWdodCAocGl4ZWxzKSAqL1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAvKiogRnVsbCBzY29yZSB3aWR0aCAocGl4ZWxzKSAqL1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gIC8qKiBVcHBlciBjb250YWluZXIgKi9cbiAgcHJpdmF0ZSBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgLyoqIE92ZXJhbGwgc3RhZmYgY29udGFpbmVyICovXG4gIHByaXZhdGUgZGl2OiBIVE1MRGl2RWxlbWVudDtcbiAgLyoqIE1haW4gc3RhZmYgZHJhd2luZyBhcmVhICovXG4gIHByaXZhdGUgc3RhZmZTVkc6IFNWR1NWR0VsZW1lbnQ7XG4gIC8qKiBTdGFmZiBjb250YWluZXIgZm9yIHZlcnRpY2FsIHJlcG9zaXRpb25pbmcgKi9cbiAgcHJpdmF0ZSBzdGFmZkc6IFNWR0VsZW1lbnQ7XG4gIC8qKiBBY3RpbmcgYXMgYmFja2dyb3VuZCBsYXllciAqL1xuICBwcml2YXRlIGxpbmVzRzogU1ZHRWxlbWVudDtcbiAgLyoqIEFjdGluZyBhcyBtaWRkbGUgcGxhbmUgbGF5ZXIgKi9cbiAgcHJpdmF0ZSBtdXNpY0c6IFNWR0VsZW1lbnQ7XG4gIC8qKiBBY3RpbmcgYXMgZm9yZWdyb3VuZCBsYXllciAqL1xuICBwcml2YXRlIHNpZ25hdHVyZXNHOiBTVkdFbGVtZW50O1xuICAvKiogT3ZlcmxheSBzaWduYXR1cmUgZHJhd2luZyBhcmVhICovXG4gIHByaXZhdGUgb3ZlcmxheVNWRzogU1ZHU1ZHRWxlbWVudDtcbiAgLyoqIE92ZXJsYXkgY29udGFpbmVyIGZvciB2ZXJ0aWNhbCByZXBvc2l0aW9uaW5nICovXG4gIHByaXZhdGUgb3ZlcmxheUc6IFNWR0VsZW1lbnQ7XG4gIC8qKiBXaGVuIHRvIHN0b3AgYmxpbmtpbmcgKGluIHF1YXJ0ZXJzKSAqL1xuICBwcml2YXRlIHNpZ25hdHVyZXNRdWFydGVyczogbnVtYmVyO1xuICAvKiogU2lnbmF0dXJlcyBkaXNwbGF5aW5nIG1vZGUgc3dpdGNoICovXG4gIHByaXZhdGUgc2lnbmF0dXJlc0JsaW5raW5nOiBib29sZWFuO1xuICAvKiogR2VuZXJhbCBzY2FsZSBhcHBsaWFibGUgdG8gYWxsIFNWRyBlbGVtZW50cyAqL1xuICBwcml2YXRlIHNjYWxlOiBudW1iZXI7XG4gIC8qKiBWZXJ0aWNhbCBmYWN0b3IgaW4gcGl4ZWxzICgyIHZTdGVwL3N0YWZmIGxpbmUpICovXG4gIHByaXZhdGUgdlN0ZXBTaXplOiBudW1iZXI7XG4gIC8qKiBIb3Jpem9udGFsIGZhY3RvciBpbiBwaXhlbHMgKDEgaFN0ZXAvdGltZSB1bml0KSAqL1xuICBwcml2YXRlIGhTdGVwU2l6ZTogbnVtYmVyO1xuICAvKiogVmVydGljYWwgU1ZHIGRpc3RhbmNlIHRvIG1pZGRsZSBzdGFmZiBsaW5lICovXG4gIHByaXZhdGUgc3RhZmZPZmZzZXQ6IG51bWJlcjtcbiAgLyoqIENvZGVkIGluIHNlbWl0b25lcyAoMCA9IEMsIDEgPSBDIywgLi4uIDExID0gQikgKi9cbiAgcHJpdmF0ZSBjdXJyZW50S2V5OiBudW1iZXI7XG4gIC8qKiBMaWtlIDMvNCAqL1xuICBwcml2YXRlIGN1cnJlbnRUaW1lU2lnbmF0dXJlOiBUaW1lU2lnbmF0dXJlSW5mbztcbiAgLyoqIHggcG9zaXRpb25zICovXG4gIHByaXZhdGUgc2lnbmF0dXJlc0xpc3Q6IEFycmF5PHt4OiBudW1iZXI7IHE6IG51bWJlcn0+O1xuICAvKiogQ3VycmVudCBzaWduYXR1cmUgYmVnaW5uaW5nIHggcG9zaXRpb24gKi9cbiAgcHJpdmF0ZSBzaWduYXR1cmVDdXJyZW50OiBudW1iZXI7XG4gIC8qKiBDdXJyZW50IHNpZ25hdHVyZSBlbmQgeCBwb3NpdGlvbiAqL1xuICBwcml2YXRlIHNpZ25hdHVyZU5leHQ6IG51bWJlcjtcbiAgLyoqIEhpZ2hsaXRlZCBvbmVzICovXG4gIHByaXZhdGUgcGxheWluZ05vdGVzOiBOb3RlSW5mb1tdO1xuICAvKiogS2luZCBvZiBzY3JvbGxpbmcgaWYgYW55ICovXG4gIHByaXZhdGUgc2Nyb2xsVHlwZTogU2Nyb2xsVHlwZTtcbiAgLyoqIE11dGV4IHRvIHJlZHVjZSBzY3JvbGwgaGFuZGxpbmcgZXZlcmhlYWQgKi9cbiAgcHJpdmF0ZSB0aWNraW5nOiBib29sZWFuO1xuICAvKiogT3B0aW1pemVkIHNjcm9sbCB2YWx1ZSAqL1xuICBwcml2YXRlIGxhc3RLbm93blNjcm9sbExlZnQ6IG51bWJlcjtcbiAgLyoqIExhc3QgZHJhd24gYmxvY2sgc3RhcnQgdGltZSBpbiBxdWFydGVycyAqL1xuICBwcml2YXRlIGxhc3RROiBudW1iZXI7XG4gIC8qKiBUaW1lIHdoZW4gbGFzdCBiYXIgc3RhcnRlZCBpbiBxdWFydGVycyAqL1xuICBwcml2YXRlIGxhc3RCYXI6IG51bWJlcjtcblxuICAvKipcbiAgICogYFN0YWZmU1ZHUmVuZGVyYCBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzY29yZSBUaGUgYFN0YWZmSW5mb2AgdG8gYmUgdmlzdWFsaXplZC5cbiAgICogQHBhcmFtIGNvbmZpZyBWaXN1YWxpemF0aW9uIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAgICogQHBhcmFtIGRpdiBUaGUgZWxlbWVudCB3aGVyZSB0aGUgdmlzdWFsaXphdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgc2NvcmU6IFN0YWZmSW5mbywgXG4gICAgY29uZmlnOiBTdGFmZlJlbmRlckNvbmZpZyxcbiAgICBkaXY6IEhUTUxEaXZFbGVtZW50XG4gICkge1xuICAgIHRoaXMuc3RhZmZJbmZvID0gc2NvcmU7XG4gICAgY29uc3QgZGVmYXVsdFBpeGVsc1BlclRpbWVTdGVwID0gMzA7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBub3RlSGVpZ2h0OiBjb25maWcubm90ZUhlaWdodCB8fCA2LFxuICAgICAgbm90ZVNwYWNpbmc6IGNvbmZpZy5ub3RlU3BhY2luZyB8fCAxLFxuICAgICAgcGl4ZWxzUGVyVGltZVN0ZXA6IGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCB8fCBkZWZhdWx0UGl4ZWxzUGVyVGltZVN0ZXAsXG4gICAgICBub3RlUkdCOiBjb25maWcubm90ZVJHQiB8fCAnOCwgNDEsIDY0JyxcbiAgICAgIGFjdGl2ZU5vdGVSR0I6IGNvbmZpZy5hY3RpdmVOb3RlUkdCIHx8ICcyNDAsIDg0LCAxMTknLFxuICAgIH07XG4gICAgdGhpcy5kaXYgPSBkaXY7XG5cbiAgICB0aGlzLnNjcm9sbFR5cGUgPSBjb25maWcuc2Nyb2xsVHlwZSB8fCBTY3JvbGxUeXBlLlBBR0U7XG4gICAgdGhpcy5zY2FsZSA9IHRoaXMuY29uZmlnLm5vdGVIZWlnaHQgLyBQQVRIX1NDQUxFO1xuICAgIGlmIChcbiAgICAgIGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA8PSAwXG4gICAgKSB7IC8vIENvbXBhY3QgdmlzdWFsaXphdGlvbiBhcyBkZWZhdWx0XG4gICAgICB0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9IDA7XG4gICAgICB0aGlzLmNvbmZpZy5ub3RlU3BhY2luZyA9IENPTVBBQ1RfU1BBQ0lORyAqIHRoaXMuc2NhbGU7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFmZk1vZGVsID0gbmV3IFN0YWZmTW9kZWwodGhpcy5zdGFmZkluZm8sIGNvbmZpZy5kZWZhdWx0S2V5KTtcbiAgICAvLyBNdXNpY2FsIGRlZmF1bHRzIGNhbiBiZSBvdmVyd3JpdHRlbiBieSBzdGFmZk1vZGVsXG4gICAgdGhpcy5jdXJyZW50S2V5ID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLmtleVNpZ25hdHVyZUF0USgwKTtcbiAgICB0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLnRpbWVTaWduYXR1cmVBdFEoMCk7XG4gICAgdGhpcy5jbGVhcigpOyAvLyBUaGlzIHdpbGwgY29tcGxldGUgcmVzdCBvZiBtZW1iZXIgdmFsdWVzIGluaXRpYWxpemF0aW9uLlxuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFuZCByZXNldHMgdGhlIHZpc3VhbGl6ZXIgb2JqZWN0IGZvciBmdXJ0aGVyIHJlZHJhd3MgZnJvbSBzY3JhdGNoLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIC8vIERpdiBvdmVyYWxsIGNvbnRhaW5lciAoZW1wdHlpbmcgcHJldmlvdXMgZXhpc3RpbmcgU1ZHIGVsZW1lbnRzKVxuICAgIHdoaWxlICh0aGlzLmRpdi5sYXN0Q2hpbGQpIHsgdGhpcy5kaXYucmVtb3ZlQ2hpbGQodGhpcy5kaXYubGFzdENoaWxkKTsgfVxuICAgIHRoaXMuZGl2LnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuICAgIHRoaXMuZGl2LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAvLyBTaWduYXR1cmVzIG92ZXJsYXlcbiAgICB0aGlzLm92ZXJsYXlTVkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdzdmcnKTtcbiAgICB0aGlzLm92ZXJsYXlTVkcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHRoaXMuZGl2LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheVNWRyk7XG4gICAgdGhpcy5vdmVybGF5RyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5vdmVybGF5U1ZHLCAnb3ZlcmxheScpO1xuICAgIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nID0gZmFsc2U7XG4gICAgdGhpcy5zaWduYXR1cmVzUXVhcnRlcnMgPSAwO1xuICAgIC8vIElubmVyIHNjcm9sbGVhYmxlIENvbnRhaW5lclxuICAgIHRoaXMucGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFyZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLnBhcmVudEVsZW1lbnQpO1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICAgIHRoaXMubGFzdEtub3duU2Nyb2xsTGVmdCA9IDA7XG4gICAgdGhpcy5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsRXZlbnQpO1xuICAgIC8vIFN0YWZmIGRyYXdpbmcgYXJlYVxuICAgIHRoaXMuc3RhZmZTVkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdzdmcnKTtcbiAgICB0aGlzLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdGFmZlNWRyk7XG4gICAgdGhpcy5zdGFmZkcgPSBjcmVhdGVTVkdHcm91cENoaWxkKHRoaXMuc3RhZmZTVkcsICdzdGFmZicpO1xuICAgIC8vIEJhY2tncm91bmQgbGluZXNcbiAgICB0aGlzLmxpbmVzRyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zdGFmZlNWRywgJ2xpbmVzJyk7XG4gICAgc2V0U3Ryb2tlKHRoaXMubGluZXNHLCBMSU5FX1NUUk9LRSwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICB0aGlzLnN0YWZmRy5hcHBlbmRDaGlsZCh0aGlzLmxpbmVzRyk7XG4gICAgLy8gTWlkZGxlIHBsYW5lIHN5bWJvbHNcbiAgICB0aGlzLm11c2ljRyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zdGFmZlNWRywgJ211c2ljJyk7XG4gICAgc2V0RmlsbCh0aGlzLm11c2ljRywgdGhpcy5nZXRDb2xvcigpKTtcbiAgICBzZXRTdHJva2UodGhpcy5tdXNpY0csIDAsIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgdGhpcy5zdGFmZkcuYXBwZW5kQ2hpbGQodGhpcy5tdXNpY0cpO1xuICAgIC8vIEZvcmVncm91bmQgc2lnbmF0dXJlc1xuICAgIHRoaXMuc2lnbmF0dXJlc0cgPSBjcmVhdGVTVkdHcm91cENoaWxkKHRoaXMuc3RhZmZTVkcsICdzaWduYXR1cmVzJyk7XG4gICAgdGhpcy5zdGFmZkcuYXBwZW5kQ2hpbGQodGhpcy5zaWduYXR1cmVzRyk7XG4gICAgLy8gU2lnbmF0dXJlcyB2YWx1ZXNcbiAgICB0aGlzLnNpZ25hdHVyZXNMaXN0ID0gW3t4OiAwLCBxOiAwfV07XG4gICAgdGhpcy5zaWduYXR1cmVDdXJyZW50ID0gMDtcbiAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSAwOyAvLyBUbyByZXNldCBibGlua2luZyBpZiBzY3JvbGxlZFxuICAgIHRoaXMuY2hhbmdlS2V5U2lnbmF0dXJlSWZOZWVkZWQoMCk7XG4gICAgdGhpcy5jaGFuZ2VUaW1lU2lnbmF0dXJlSWZOZWVkZWQoMCk7XG4gICAgLy8gR2VuZXJhbCB2aXN1YWwgcmVmZXJlbmNlc1xuICAgIHRoaXMudlN0ZXBTaXplID0gdGhpcy5jb25maWcubm90ZUhlaWdodCAvIDI7XG4gICAgdGhpcy5oU3RlcFNpemUgPSB0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcDtcbiAgICB0aGlzLnN0YWZmT2Zmc2V0ID0gMDtcbiAgICB0aGlzLmhlaWdodCA9IDA7ICAgIFxuICAgIHRoaXMud2lkdGggPSAwOyAgICBcbiAgICAvLyBQcm9jZXNzZWQgbm90ZXMgc3RvcmFnZSBhbmQgcmVmZXJlbmNlXG4gICAgdGhpcy5wbGF5aW5nTm90ZXMgPSBbXTtcbiAgICB0aGlzLmxhc3RCYXIgPSAwO1xuICAgIHRoaXMubGFzdFEgPSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRyYXdzIHRoZSBlbnRpcmUgYHN0YWZmSW5mb2AgaW4gYSBzdGFmZiBpZiBubyBgYWN0aXZlTm90ZWAgaXMgZ2l2ZW4sXG4gICAqIGhpZ2hsaWdodGluZyBvbiBhbmQgb2ZmIHRoZSBhcHByb3ByaWF0ZSBub3RlcyBvdGhlcndpc2UuIFNob3VsZCB0aGUgXG4gICAqIGBzdGFmZkluZm9gIGhhZCBjaGFuZ2VkIGFkZGluZyBtb3JlIG5vdGVzIGF0IHRoZSBlbmQsIGNhbGxpbmcgdGhpc1xuICAgKiBtZXRob2QgYWdhaW4gd291bGQgY29tcGxldGUgdGhlIHJlZHJhd2luZyBmcm9tIHRoZSB2ZXJ5IGxhc3Qgbm90ZSBpdCB3YXNcbiAgICogZHJhd24sIG1haW50YWluaW5nIHRoZSBhY3RpdmUgbm90ZSBhbmQgdGhlIHNjcm9sbCBwb3NpdGlvbiBhcyB0aGV5IHdlcmUuIFxuICAgKiBUaGlzIGlzIGhhbmR5IGZvciBpbmNyZW1lbnRhbCBjb21wb3NpdGlvbnMuIFxuICAgKiBcbiAgICogR2l2ZW4gdGhlIGNvbXBsZXhpdHkgb2YgYWRhcHRhdGlvbiB0byBhIG1vZGlmaWVkIHNjb3JlLCBtb2RpZnlpZWQgbm90ZXMgXG4gICAqIHByZXZpb3VzbHkgZHJhd24gd2lsbCBiZSBpZ25vcmVkLCBob3dldmVyLCB5b3UgY2FuIGFsd2F5cyBgY2xlYXIoKWAgYW5kIFxuICAgKiBgcmVkcmF3KClgIGZvciBhIGZ1bGwgcmVkcmF3LlxuICAgKiBAcGFyYW0gYWN0aXZlTm90ZSBJZiBzcGVjaWZpZWQsIHRoaXMgYE5vdGVgIHdpbGwgYmUgcGFpbnRlZFxuICAgKiBpbiB0aGUgYWN0aXZlIGNvbG9yIGFuZCB0aGVyZSB3b24ndCBiZSBhbiBhY3R1YWwgcmVkcmF3aW5nLCBidXQgYSBcbiAgICogcmUtY29sb3VyaW5nIG9mIHRoZSBpbnZvbHZlZCBub3RlIGhlYWRzLCBhY2NpZGVudGFscywgZG90cyBhbmQgdGllcyBcbiAgICogKGFjdGl2YXRlZCBhbmQgZGUtYWN0aXZhdGVkIG9uZXMpLiBPdGhlcndpc2UsIGFsbCBtdXNpY2FsIHN5bWJvbHMgd2hpY2ggXG4gICAqIHdlcmUgbm90IHByb2Nlc3NlZCB5ZXQgd2lsbCBiZSBkcmF3biB0byBjb21wbGV0ZSB0aGUgc2NvcmUuXG4gICAqIEBwYXJhbSBzY3JvbGxJbnRvVmlldyBJZiBzcGVjaWZpZWQgYW5kIHRoZSBhY3RpdmUgbm90ZSB0byBiZSBcbiAgICogaGlnaGxpdGVkIGlzIG5vdCB2aXN1YWxpemVkIGluIHRoZSBjb250YWluZXIgRElWLCB0aGUgbGF0ZXIgd2lsbCBiZSBcbiAgICogc2Nyb2xsZWQgc28gdGhhdCB0aGUgbm90ZSBpcyB2aWV3ZWQgaW4gdGhlIHJpZ2h0IHBsYWNlLiBUaGlzIGNhbiBiZSBcbiAgICogYWx0ZXJlZCBieSBgU3RhZmZSZW5kZXJDb25maWcuc2Nyb2xsVHlwZWAuXG4gICAqIEByZXR1cm5zIFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBoaWdobGlnaHRlZCBhY3RpdmUgbm90ZSByZWxhdGl2ZSB0byB0aGUgXG4gICAqIGJlZ2lubmluZyBvZiB0aGUgU1ZHLCBvciAtMSBpZiB0aGVyZSB3YXNuJ3QgYW55IGdpdmVuIGFjdGl2ZSBub3RlLiBVc2VmdWxcbiAgICogZm9yIGF1dG9tYXRpY2FsbHkgYWR2YW5jaW5nIHRoZSB2aXN1YWxpemF0aW9uIGlmIG5lZWRlZC5cbiAgICovXG4gIHB1YmxpYyByZWRyYXcoXG4gICAgYWN0aXZlTm90ZT86IE5vdGVJbmZvLCBcbiAgICBzY3JvbGxJbnRvVmlldz86IGJvb2xlYW4gXG4gICk6IG51bWJlciB7XG4gICAgbGV0IGFjdGl2ZU5vdGVQb3NpdGlvbiA9IC0xO1xuICAgIGNvbnN0IGlzQ29tcGFjdCA9ICh0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9PT0gMCk7XG4gICAgaWYgKGFjdGl2ZU5vdGUpIHsgLy8gR2l2ZW4gYWN0aXZlTm90ZSBtZWFucyBoaWdobGl0aW5nIGl0XG4gICAgICBjb25zdCBrZWVwT25QbGF5aW5nTm90ZXM6IE5vdGVJbmZvW10gPSBbXTtcbiAgICAgIHRoaXMucGxheWluZ05vdGVzLmZvckVhY2goIC8vIFJldmVydCBub24gcGxheWluZyBub3RlcyBoaWdobGl0aW5nXG4gICAgICAgIG5vdGUgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzUGFpbnRpbmdBY3RpdmVOb3RlKG5vdGUsIGFjdGl2ZU5vdGUpKSB7XG4gICAgICAgICAgICBrZWVwT25QbGF5aW5nTm90ZXMucHVzaChub3RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaWdobGlnaHRFbGVtZW50KHRoaXMuZ2V0R3JvdXAobm90ZSksIHRoaXMuZ2V0Q29sb3IoZmFsc2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB0aGlzLnBsYXlpbmdOb3RlcyA9IGtlZXBPblBsYXlpbmdOb3RlcztcbiAgICAgIGNvbnN0IGcgPSB0aGlzLmdldEdyb3VwKGFjdGl2ZU5vdGUpO1xuICAgICAgaWYgKGcpIHtcbiAgICAgICAgdGhpcy5wbGF5aW5nTm90ZXMucHVzaChhY3RpdmVOb3RlKTsgLy8gU3RvcmUgdG8gcmV2ZXJ0IGhpZ2hsaWdodCBsYXRlclxuICAgICAgICBoaWdobGlnaHRFbGVtZW50KGcsIHRoaXMuZ2V0Q29sb3IodHJ1ZSkpO1xuICAgICAgICBhY3RpdmVOb3RlUG9zaXRpb24gPSBnLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBcbiAgICAgICAgICB0aGlzLnN0YWZmU1ZHLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIGNvbnN0IHF1YXJ0ZXJzID0gYWN0aXZlTm90ZS5zdGFydDtcbiAgICAgICAgY29uc3QgaXNCYXJCZWdpbm5pbmcgPSBnLmdldEF0dHJpYnV0ZSgnZGF0YS1pcy1iYXItYmVnaW5uaW5nJyk7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFR5cGUgIT09IFNjcm9sbFR5cGUuQkFSIHx8IGlzQmFyQmVnaW5uaW5nKSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKHNjcm9sbEludG9WaWV3LCBhY3RpdmVOb3RlUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhaXNDb21wYWN0ICYmIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nICYmXG4gICAgICAgICAgcXVhcnRlcnMgPj0gdGhpcy5zaWduYXR1cmVzUXVhcnRlcnNcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcgPSBmYWxzZTtcbiAgICAgICAgICBzZXRGYWRlKHRoaXMub3ZlcmxheUcsIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHsgLy8gTm8gYWN0aXZlTm90ZSBnaXZlbiBtZWFucyByZWRyYXdpbmcgaXQgYWxsIGZyb20gc2NyYXRjaFxuICAgICAgY29uc3QgaXNGaXJzdFJlZHJhdyA9ICh0aGlzLmxhc3RRID09PSAtMSk7XG4gICAgICB0aGlzLnN0YWZmTW9kZWwudXBkYXRlKHRoaXMuc3RhZmZJbmZvLCB0aGlzLmNvbmZpZy5kZWZhdWx0S2V5KTtcbiAgICAgIGxldCB4ID0gMDtcbiAgICAgIGxldCB3aWR0aCA9IDA7XG4gICAgICBpZiAoaXNGaXJzdFJlZHJhdykge1xuICAgICAgICAvLyBDbGVmK0tleStUaW1lIHNpZ25hdHVyZXNcbiAgICAgICAgd2lkdGggPSB0aGlzLmRyYXdTaWduYXR1cmVzKHRoaXMub3ZlcmxheUcsIHgsIHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgICBpZiAoaXNDb21wYWN0KSB7XG4gICAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgICAgLy8gRmlyc3QgcGFkZGluZyBpZiBjb21wYWN0ZWQuIEZvbGxvd2luZyBhcmUgcGxhY2VkIGFmdGVyIGRyYXdpbmdzXG4gICAgICAgICAgd2lkdGggKz0gdGhpcy5jb25maWcubm90ZVNwYWNpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB4ID0gdGhpcy53aWR0aDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxpbmtlZE5vdGVNYXA6IExpbmtlZE5vdGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICB0aGlzLnN0YWZmTW9kZWwuc3RhZmZCbG9ja01hcC5mb3JFYWNoKCAvLyBNdXNpYyBCbG9ja3NcbiAgICAgICAgKHN0YWZmQmxvY2ssIHF1YXJ0ZXJzKSA9PiB7XG4gICAgICAgICAgaWYgKCFpc0NvbXBhY3QpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8ucXVhcnRlcnNUb1RpbWUocXVhcnRlcnMpICogXG4gICAgICAgICAgICAgIHRoaXMuaFN0ZXBTaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocXVhcnRlcnMgPiB0aGlzLmxhc3RRKSB7XG4gICAgICAgICAgICB3aWR0aCArPSB0aGlzLmRyYXdTdGFmZkJsb2NrKHN0YWZmQmxvY2ssIHggKyB3aWR0aCwgbGlua2VkTm90ZU1hcCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RRID0gcXVhcnRlcnM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3Qgc3ZnUmVjdCA9IHRoaXMuc3RhZmZTVkcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBnUmVjdCA9IHRoaXMubXVzaWNHLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy51cGRhdGVWZXJ0aWNhbEJvdW5kYXJpZXMoIC8vIFZlcnRpY2FsIHJlc2l6aW5nXG4gICAgICAgIGdSZWN0LnRvcCAtIHN2Z1JlY3QudG9wLCBnUmVjdC5ib3R0b20gLSBzdmdSZWN0LnRvcFxuICAgICAgKTtcbiAgICAgIGlmIChpc0NvbXBhY3QpIHsgLy8gQ29tcGFjdCBzdGFmZiBob3Jpem9udGFsIHJlc2l6aW5nXG4gICAgICAgIHRoaXMud2lkdGggKz0gd2lkdGg7XG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8gUHJvcG9ydGlvbmFsIHN0YWZmIGhvcml6b250YWwgcmVzaXppbmdcbiAgICAgICAgY29uc3QgbGFzdEJsb2NrID0gdGhpcy5zdGFmZk1vZGVsLnN0YWZmQmxvY2tNYXAuZ2V0KHRoaXMubGFzdFEpO1xuICAgICAgICBjb25zdCBlbmRUaW1lID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLnF1YXJ0ZXJzVG9UaW1lKFxuICAgICAgICAgIHRoaXMubGFzdFEgKyBsYXN0QmxvY2subGVuZ3RoXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMud2lkdGggPSBlbmRUaW1lICogdGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXA7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWZmU1ZHLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGAke3RoaXMud2lkdGh9YCk7XG4gICAgICB0aGlzLnJlZHJhd1N0YWZmTGluZXModGhpcy5saW5lc0csIDAsIHRoaXMud2lkdGgpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aXZlTm90ZVBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIGEgZ2l2ZW4gaGlnaGxpZ2h0ZWQgYG5vdGVgIHNob3VsZCBzdGF5IHRoYXQgd2F5XG4gICAqIFxuICAgKiBBIG5vdGUgaXMgYWN0aXZlIGlmIGl0J3MgbGl0ZXJhbGx5IHRoZSBzYW1lIGFzIHRoZSBub3RlIHdlIGFyZVxuICAgKiBwbGF5aW5nIChha2EgYWN0aXZlTm90ZSksIG9yIGlmIGl0IG92ZXJsYXBzIGJlY2F1c2UgaXQncyBhIGhlbGQgbm90ZS5cbiAgICogQHBhcmFtIG5vdGUgT25lIG9mIHRoZSBoaWdobGlnaHRlZCBub3RlcyB3aGljaCBhcmUgY3VycmVudGx5IGJlZW4gcGxheWVkXG4gICAqIEBwYXJhbSBhY3RpdmVOb3RlIEEgbmV3IGFjdGl2ZSBub3RlIHBlbmRpbmcgdG8gYmUgaGlnaGxpZ2h0ZWRcbiAgICogQHJldHVybnMgSWYgaXQgc2hvdWxkIHN0YXkgaGlnaGxpZ2h0ZWQgb3Igbm90XG4gICAqL1xuICBwcml2YXRlIGlzUGFpbnRpbmdBY3RpdmVOb3RlKFxuICAgIG5vdGU6IE5vdGVJbmZvLCBhY3RpdmVOb3RlOiBOb3RlSW5mb1xuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGlzUGxheWVkTm90ZSA9XG4gICAgICBub3RlLnN0YXJ0ID09PSBhY3RpdmVOb3RlLnN0YXJ0O1xuICBjb25zdCBoZWxkRG93bkR1cmluZ1BsYXllZE5vdGUgPVxuICAgICAgbm90ZS5zdGFydCA8PSBhY3RpdmVOb3RlLnN0YXJ0ICYmXG4gICAgICBub3RlLnN0YXJ0ICsgbm90ZS5sZW5ndGggPj0gYWN0aXZlTm90ZS5zdGFydCArIGFjdGl2ZU5vdGUubGVuZ3RoO1xuICByZXR1cm4gaXNQbGF5ZWROb3RlIHx8IGhlbGREb3duRHVyaW5nUGxheWVkTm90ZTtcbn1cblxuICAvKipcbiAgICogRHJhd3MgYSBzZXQgb2YgbXVzaWNhbCBzeW1ib2xzIGdyb3VwZWQgaW4gYSBibG9jayBpbnRvIGEgc3RhZmZcbiAgICogQHBhcmFtIHN0YWZmQmxvY2sgVGhlIGJsb2NrIHRvIGJlIGRyYXduXG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gdG8gZHJhdyB0aGUgYmxvY2tcbiAgICogQHBhcmFtIGxpbmtlZE5vdGVNYXAgVGVtcG9yYXJ5IHN0b3JhZ2Ugb2YgdmlzdWFsIGRhdGEgYWlkc1xuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIGRyYXduIGJsb2NrXG4gICAqL1xuICBwcml2YXRlIGRyYXdTdGFmZkJsb2NrKFxuICAgIHN0YWZmQmxvY2s6IFN0YWZmQmxvY2ssIHg6IG51bWJlciwgbGlua2VkTm90ZU1hcDogTGlua2VkTm90ZU1hcFxuICApOiBudW1iZXIge1xuICAgIGNvbnN0IHF1YXJ0ZXIgPSBzdGFmZkJsb2NrLnN0YXJ0O1xuICAgIC8vIFByZWNlZGluZyBiYXJcbiAgICBsZXQgd2lkdGggPSB0aGlzLmRyYXdCYXJJZk5lZWRlZChxdWFydGVyLCB4KTtcbiAgICAvLyBTaWduYXR1cmUgY2hhbmdlIGFuYWx5c2lzIGFuZCBwb3NzaWJsZSBkcmF3aW5nXG4gICAgd2lkdGggKz0gdGhpcy5kcmF3U2lnbmF0dXJlc0lmTmVlZGVkKHF1YXJ0ZXIsIHggKyB3aWR0aCk7XG4gICAgaWYgKHN0YWZmQmxvY2subm90ZXMubGVuZ3RoKXtcbiAgICAgIHdpZHRoICs9IHRoaXMuZHJhd05vdGVzKHN0YWZmQmxvY2ssIHggKyB3aWR0aCwgbGlua2VkTm90ZU1hcCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgd2lkdGggKz0gdGhpcy5kcmF3UmVzdHMoc3RhZmZCbG9jaywgeCArIHdpZHRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYWxsIG5vdGVzIG9mIGFgU3RhZmZCbG9ja2AgKGhlYWRzLCBzdGVtLCBmbGFncywgZG90cywgYWNjaWRlbnRhbHMpIFxuICAgKiBpbnRvIGEgc3RhZmZcbiAgICogQHBhcmFtIHN0YWZmQmxvY2sgVGhlIGJsb2NrIGNvbnRhaW5pbmcgdGhlIG5vdGVzIHRvIGJlIGRyYXduXG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gdG8gZHJhdyB0aGUgbm90ZXNcbiAgICogQHBhcmFtIGxpbmtlZE5vdGVNYXAgVGVtcG9yYXJ5IHN0b3JhZ2Ugb2YgdmlzdWFsIGRhdGEgYWlkc1xuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIGRyYXduIG5vdGVzXG4gICAqL1xuICBwcml2YXRlIGRyYXdOb3RlcyhcbiAgICBzdGFmZkJsb2NrOiBTdGFmZkJsb2NrLCB4OiBudW1iZXIsIGxpbmtlZE5vdGVNYXA6IExpbmtlZE5vdGVNYXBcbiAgKTogbnVtYmVyIHtcbiAgICBsZXQgd2lkdGggPSAwO1xuICAgIGNvbnN0IG5vdGVIZWFkID0gTk9URV9QQVRIU1tzdGFmZkJsb2NrLmhlYWRJbmRleF07XG4gICAgLy8gU3RlbSBwbGFjZWhvbGRlciBjcmVhdGVkIGJlZm9yZWhhbmQgYXMgYSBsb3dlciBsYXllclxuICAgIGxldCBzdGVtRzogU1ZHRWxlbWVudDtcbiAgICBpZiAobm90ZUhlYWQuc3RlbUFuY2hvcikge1xuICAgICAgc3RlbUcgPSBjcmVhdGVTVkdHcm91cENoaWxkKHRoaXMubXVzaWNHLCAnc3RlbScpO1xuICAgIH1cblxuICAgIC8vIFBvbHlwaG9uaWMgYmxvY2sgbm90ZXMgcGl0Y2ggcGFydCAoZXZlcnl0aGluZyBidXQgc2hhcmVkIHN0ZW0gYW5kIGZsYWdzKVxuICAgIHN0YWZmQmxvY2subm90ZXMuZm9yRWFjaChcbiAgICAgIG5vdGUgPT4ge1xuICAgICAgICBjb25zdCBvcGFjaXR5ID0gdGhpcy5nZXRPcGFjaXR5KG5vdGUuaW50ZW5zaXR5KTtcbiAgICAgICAgY29uc3QgeSA9IG5vdGUudlN0ZXBzICogdGhpcy52U3RlcFNpemU7XG4gICAgICAgIC8vIE92ZXIgYW5kIHVuZGVyIHN0YWZmIGV4dHJhIGxpbmVzXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gMiAqIChcbiAgICAgICAgICBub3RlLnZTdGVwcyA+IDAgPyBNYXRoLmZsb29yKG5vdGUudlN0ZXBzLzIpIDogTWF0aC5jZWlsKG5vdGUudlN0ZXBzLzIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gbm90ZS52U3RlcHMgPiAwID8gLTIgOiAyO1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IE1hdGguYWJzKGkpID4gNDsgaSArPSBkZWx0YSkge1xuICAgICAgICAgIGRyYXdTVkdQYXRoKHRoaXMubGluZXNHLCBleHRyYUxpbmVQYXRoLCBcbiAgICAgICAgICAgIHggKyB3aWR0aCwgaSAqIHRoaXMudlN0ZXBTaXplLCB0aGlzLnNjYWxlLCAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBIaWdobGlnaHRhYmxlIG92ZXJhbGwgZ3JvdXBpbmcgcGxhY2Vob2xkZXJcbiAgICAgICAgY29uc3QgX2cgPSAobm90ZS50aWVkRnJvbSkgPyBsaW5rZWROb3RlTWFwLmdldChub3RlLnRpZWRGcm9tKS5nIDogXG4gICAgICAgICAgY3JlYXRlU1ZHR3JvdXBDaGlsZCh0aGlzLm11c2ljRywgYCR7bm90ZS5zdGFydH0tJHtub3RlLnBpdGNofWApO1xuICAgICAgICBpZiAoc3RhZmZCbG9jay5pc0JhckJlZ2lubmluZygpKSB7XG4gICAgICAgICAgX2cuc2V0QXR0cmlidXRlKCdkYXRhLWlzLWJhci1iZWdpbm5pbmcnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByZWNlZGluZyBUaWVcbiAgICAgICAgaWYgKG5vdGUudGllZEZyb20pIHtcbiAgICAgICAgICBjb25zdCB0aWVXaWR0aCA9XG4gICAgICAgICAgICB4ICsgd2lkdGggLSBsaW5rZWROb3RlTWFwLmdldChub3RlLnRpZWRGcm9tKS54SGVhZFJpZ2h0O1xuICAgICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgICAgX2csIHRpZVBhdGgsIGxpbmtlZE5vdGVNYXAuZ2V0KG5vdGUudGllZEZyb20pLnhIZWFkUmlnaHQsIHksIFxuICAgICAgICAgICAgdGllV2lkdGgvUEFUSF9TQ0FMRSxcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgKiAobm90ZS52U3RlcHMgPCAwID8gLTEgOiAxKSwgb3BhY2l0eVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90ZSBoZWFkXG4gICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgIF9nLCBub3RlSGVhZC5wYXRoLCBcbiAgICAgICAgICB4ICsgd2lkdGgsIHksIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIG9wYWNpdHlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgX3hIZWFkUmlnaHQgPSB4ICsgd2lkdGggKyBub3RlSGVhZC53aWR0aCp0aGlzLnNjYWxlO1xuICAgICAgICAvLyBEb3R0ZWQgbm90ZVxuICAgICAgICBpZiAoc3RhZmZCbG9jay5oZWFkQWx0ZXJhdGlvbiA9PT0gMSkgeyAvLyBUT0RPOiBUcmlwbGV0cyBhbmQgcXVpbnR1cGxldHNcbiAgICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICAgIF9nLCBkb3RQYXRoLCBcbiAgICAgICAgICAgIHggKyB3aWR0aCArIG5vdGVIZWFkLndpZHRoKnRoaXMuc2NhbGUgKyB0aGlzLnZTdGVwU2l6ZS8yLCBcbiAgICAgICAgICAgIHkgLSB0aGlzLnZTdGVwU2l6ZS8yLCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCBvcGFjaXR5XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBY2NpZGVudGFsc1xuICAgICAgICBpZiAobm90ZS5hY2NpZGVudGFsICE9PSAwKSB7XG4gICAgICAgICAgZHJhd1NWR1BhdGgoXG4gICAgICAgICAgICBfZywgQUNDSURFTlRBTF9QQVRIU1tub3RlLmFjY2lkZW50YWxdLFxuICAgICAgICAgICAgeCArIHdpZHRoLCB5LCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCBvcGFjaXR5XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdG9yZSBmb3IgZnVydGhlciB2aXN1YWwgbGlua2FnZSBpZiBsaW5rZWQgdG8gc29tZSBvdGhlciBub3RlXG4gICAgICAgIGlmIChub3RlLnRpZWRUbykge1xuICAgICAgICAgIGxpbmtlZE5vdGVNYXAuc2V0KG5vdGUsIHtnOiBfZywgeEhlYWRSaWdodDogX3hIZWFkUmlnaHR9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgaWYgKG5vdGVIZWFkLnN0ZW1BbmNob3IpIHsgLy8gVGhlcmUgaXMgYSBzdGVtIGFuZCBwb3RlbnRpYWxseSBzb21lIGZsYWdzXG4gICAgICBsZXQgeFN0ZW0gPSB4ICsgd2lkdGg7XG4gICAgICBsZXQgeTE6IG51bWJlciwgeTI6IG51bWJlcjtcbiAgICAgIGNvbnN0IGFuY2hvciA9IG5vdGVIZWFkLnN0ZW1BbmNob3IqdGhpcy5zY2FsZTtcbiAgICAgIGNvbnN0IGRvd253YXJkcyA9IHN0YWZmQmxvY2subWluVlN0ZXAgKyBzdGFmZkJsb2NrLm1heFZTdGVwIDwgMDtcbiAgICAgIGNvbnN0IG11bHRpcGxlID0gKG5vdGVIZWFkLmZsYWdzID4gMikgPyAyICogKG5vdGVIZWFkLmZsYWdzLTIpIDogMDtcbiAgICAgIGlmIChkb3dud2FyZHMpIHsgLy8gRG93bndhcmRzXG4gICAgICAgIHkxID0gc3RhZmZCbG9jay5tYXhWU3RlcCAqIHRoaXMudlN0ZXBTaXplIC0gYW5jaG9yO1xuICAgICAgICB5MiA9IChzdGFmZkJsb2NrLm1pblZTdGVwICsgNyArIG11bHRpcGxlKSAqIHRoaXMudlN0ZXBTaXplO1xuICAgICAgfVxuICAgICAgZWxzZSB7IC8vIFVwd2FyZHNcbiAgICAgICAgeFN0ZW0gKz0gKG5vdGVIZWFkLndpZHRoIC0gU1RFTV9XSURUSCkgKiB0aGlzLnNjYWxlO1xuICAgICAgICB5MSA9IHN0YWZmQmxvY2subWluVlN0ZXAgKiB0aGlzLnZTdGVwU2l6ZSArIGFuY2hvcjtcbiAgICAgICAgeTIgPSAoc3RhZmZCbG9jay5tYXhWU3RlcCAtIDcgLSBtdWx0aXBsZSkgKiB0aGlzLnZTdGVwU2l6ZTtcbiAgICAgIH1cbiAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICBzdGVtRywgc3RlbVBhdGgsIHhTdGVtLCB5MSwgdGhpcy5zY2FsZSwgKHkyIC0geTEpIC8gUEFUSF9TQ0FMRVxuICAgICAgKTtcbiAgICAgIGlmIChub3RlSGVhZC5mbGFncyA9PT0gMSkgeyAvLyBTaW5nbGUgZmxhZ1xuICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICBzdGVtRywgc2luZ2xlRmxhZ1BhdGgsIHhTdGVtLCB5MiwgXG4gICAgICAgICAgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSAqIChkb3dud2FyZHMgPyAtMSA6IDEpLCAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChub3RlSGVhZC5mbGFncyA+IDEpIHsgLy8gTXVsdGlwbGUgZmxhZ1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVIZWFkLmZsYWdzOyArK2kpIHtcbiAgICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICAgIHN0ZW1HLCBtdWx0aUZsYWdQYXRoLCB4U3RlbSwgeTIsIFxuICAgICAgICAgICAgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSAqIChkb3dud2FyZHMgPyAtMSA6IDEpLCAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICB5MiArPSAoZG93bndhcmRzID8gLTIgOiAyKSAqIHRoaXMudlN0ZXBTaXplO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9PT0gMCkgeyAvLyBDb21wYWN0IHZpc3VhbGl6YXRpb25cbiAgICAgIHdpZHRoICs9IG5vdGVIZWFkLndpZHRoICogdGhpcy5zY2FsZTsgLy8gSGVhZCBzaXplXG4gICAgICBpZiAoc3RlbUcpIHtcbiAgICAgICAgd2lkdGggKz0gc3RlbUcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7IFxuICAgICAgfVxuICAgICAgd2lkdGggKz0gdGhpcy5jb25maWcubm90ZVNwYWNpbmc7IC8vIFBvc3Qtc3BhY2luZ1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgdGhlIHJlc3RzIHdoaWNoIGZvbGxvd3MgYSBtdXNpY2FsIGJsb2NrIGluIGEgc3RhZmZcbiAgICogQHBhcmFtIHN0YWZmQmxvY2sgVGhlIGJsb2NrIHdoaWNoIGluZGljYXRlcyBob3cgbXVjaCByZXN0IHNob3VsZCBiZSBcbiAgICogZGlzcGxheWVkIHRpbGwgdGhlIG5leHQgYmxvY2tcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBkcmF3IHRoZSByZXN0c1xuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIGRyYXduIHJlc3RzXG4gICAqL1xuICBwcml2YXRlIGRyYXdSZXN0cyhzdGFmZkJsb2NrOiBTdGFmZkJsb2NrLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aCA9IDA7XG4gICAgY29uc3QgcmVzdCA9IGRyYXdTVkdQYXRoKFxuICAgICAgdGhpcy5tdXNpY0csIFJFU1RfUEFUSFNbc3RhZmZCbG9jay5oZWFkSW5kZXhdLCBcbiAgICAgIHggKyB3aWR0aCwgMCwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZVxuICAgICk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID4gMCkgeyAvLyBQcm9wb3J0aW9uYWwgdmlzdWFsaXphdGlvblxuICAgICAgeCArPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8ucXVhcnRlcnNUb1RpbWUoc3RhZmZCbG9jay5oZWFkSW5kZXgpICogXG4gICAgICAgIHRoaXMuaFN0ZXBTaXplO1xuICAgIH1cbiAgICBlbHNlIHsgLy8gQ29tcGFjdCB2aXN1YWxpemF0aW9uXG4gICAgICB3aWR0aCArPSByZXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgd2lkdGggKz0gdGhpcy5jb25maWcubm90ZVNwYWNpbmc7IC8vIFBvc3Qtc3BhY2luZ1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgdGhlIGZpdmUgaG9yaXpvbnRhbCBsaW5lcyBvZiBhIHN0YWZmIChwZW50YWdyYW0pIG9yIHNjYWxlcyB0aGVtIHRvIFxuICAgKiB0aGUgY3VycmVudCB3aWR0aCBvZiB0aGUgc2NvcmUgaWYgYWxyZWFkeSBkcmF3blxuICAgKiBAcGFyYW0gZSBUaGUgU1ZHIGNvbnRhaW5lciBvZiB0aGUgbGluZXNcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBzdGFydGluZyBwb2ludCBvZiB0aGUgZHJhd2luZ1xuICAgKiBAcGFyYW0gd2lkdGggV2lkdGggb2YgdGhlIHBlbnRhZ3JhbVxuICAgKiBAcmV0dXJucyBUaGUgU1ZHIHdoaWNoIHJlcHJlc2VudHMgdGhlIHBlbnRhZ3JhbVxuICAgKi9cbiAgcHJpdmF0ZSByZWRyYXdTdGFmZkxpbmVzKGU6IFNWR0VsZW1lbnQsIHg6IG51bWJlciwgd2lkdGg6IG51bWJlcikge1xuICAgIGxldCBzdGFmZiA9IGUucXVlcnlTZWxlY3RvcignZ1tkYXRhLWlkPVwic3RhZmYtZml2ZS1saW5lc1wiXScpIGFzIFNWR0VsZW1lbnQ7XG4gICAgaWYgKHN0YWZmKSB7IC8vIEFscmVhZHkgZHJhd25cbiAgICAgIHN0YWZmLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICBudWxsLCAndHJhbnNmb3JtJywgYHNjYWxlKCR7d2lkdGgvUEFUSF9TQ0FMRX0sIDEpYFxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzdGFmZiA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQoZSwgJ3N0YWZmLWZpdmUtbGluZXMnKTtcbiAgICAgIGNvbnN0IHkgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IC00OyBpIDw9IDQ7IGkgKz0gMikgeyAvLyBEcmF3IGZpdmUgbGluZSBzdGFmZlxuICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICBzdGFmZiwgc3RhZmZMaW5lUGF0aCwgeCwgeSArIGkgKiB0aGlzLnZTdGVwU2l6ZSwgd2lkdGgvUEFUSF9TQ0FMRSwgMVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhZmY7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYSBiYXIgbGluZSBpZiB0aGlzIHF1YXJ0ZXIgZml0cyBvbiB0aGUgYmVnaW5uaW5nIG9mIGEgbmV3IGJhclxuICAgKiBAcGFyYW0gcXVhcnRlcnMgUXVhcnRlcnMgZnJvbSBiZWdpbm5pbmcgd2hlcmUgYmFyIGNvdWxkIHN0YXJ0XG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gaW4gc3RhZmYgdG8gZHJhdyB0aGUgYmFyIGxpbmUsIGlmIGFueS5cbiAgICogQHJldHVybnMgVGhlIHdpdGggb2YgdGhlIGRyYXduIGJhciBsaW5lXG4gICAqL1xuICBwcml2YXRlIGRyYXdCYXJJZk5lZWRlZChxdWFydGVyczogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aCA9IDA7XG4gICAgaWYgKHF1YXJ0ZXJzICE9PSAwKSB7IC8vIDFzdCBiYXIgc2tpcHBlZFxuICAgICAgY29uc3QgbmV4dEJhciA9IHRoaXMubGFzdEJhciArIGdldEJhckxlbmd0aCh0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlKTtcbiAgICAgIGlmIChxdWFydGVycyA+PSBuZXh0QmFyKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA+IDApIHsgLy8gUHJvcG9ydGlvbmFsIHZpc3VhbGl6YXRpb25cbiAgICAgICAgICB4IC09IHRoaXMuY29uZmlnLm5vdGVTcGFjaW5nOyAvLyBOZWdhdGl2ZSB0byBhdm9pZCB0b3VjaGluZyBub3RlIGhlYWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gQ29tcGFjdCB2aXN1YWxpemF0aW9uXG4gICAgICAgICAgd2lkdGggPSB0aGlzLmNvbmZpZy5ub3RlU3BhY2luZztcbiAgICAgICAgfVxuICAgICAgICBkcmF3U1ZHUGF0aCh0aGlzLmxpbmVzRywgYmFyUGF0aCwgeCwgMCwgMSwgdGhpcy5zY2FsZSk7XG4gICAgICAgIHRoaXMubGFzdEJhciA9IG5leHRCYXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFcmFzZXMgYWxsIGdyYXBoaWNhbCBlbGVtZW50cyBvbiB0aGUgc2lnbmF0dXJlIG92ZXJsYXlcbiAgICovXG4gIHByaXZhdGUgY2xlYXJTaWduYXR1cmVPdmVybGF5KCkge1xuICAgIHdoaWxlICh0aGlzLm92ZXJsYXlHLmxhc3RDaGlsZCkge1xuICAgICAgdGhpcy5vdmVybGF5Ry5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXlHLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNpZ25hdHVyZXMgaWYgdGhlcmUncyBhIHNpZ25hdHVyZSBjaGFuZ2Ugb24gc3BlY2lmaWVkIHF1YXJ0ZXJcbiAgICogQHBhcmFtIHF1YXJ0ZXJzIFF1YXJ0ZXJzIGZyb20gYmVnaW5uaW5nIHdoZXJlIHNpZ25hdGl1cmVzIGNvdWxkIHN0YXJ0XG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gd2hlcmUgaXQgc2hvdWxkIGJlIGRyYXduXG4gICAqIEByZXR1cm5zIFdpZHRoIG9mIHRoZSBkcmF3biBzaWduYXR1cmVzIG9yIDAgaWYgcHJvcG9ydGlvbmFsIHZpc3VhbGl6YXRpb25cbiAgICovXG4gIHByaXZhdGUgZHJhd1NpZ25hdHVyZXNJZk5lZWRlZChxdWFydGVyczogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aCA9IDA7XG4gICAgaWYgKHF1YXJ0ZXJzICE9PSAwKSB7IC8vIDFzdCBiYXIgc2tpcHBlZFxuICAgICAgY29uc3Qga2V5Q2hhbmdlZCA9IHRoaXMuY2hhbmdlS2V5U2lnbmF0dXJlSWZOZWVkZWQocXVhcnRlcnMpO1xuICAgICAgY29uc3QgdGltZUNoYW5nZWQgPSB0aGlzLmNoYW5nZVRpbWVTaWduYXR1cmVJZk5lZWRlZChxdWFydGVycyk7XG4gICAgICBpZiAoa2V5Q2hhbmdlZCB8fCB0aW1lQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjbGVmU3BhY2luZyA9IENPTVBBQ1RfU1BBQ0lORyAqIHRoaXMuc2NhbGUgKiBcbiAgICAgICAgICAodGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPiAwID8gMyA6IDIpO1xuICAgICAgICB0aGlzLnNpZ25hdHVyZXNMaXN0LnB1c2goe3g6IHggLSBjbGVmU3BhY2luZyAsIHE6IHF1YXJ0ZXJzfSk7XG4gICAgICAgIGlmICh0aGlzLnNpZ25hdHVyZU5leHQgPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSB4O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZXMgPSBxdWFydGVycyA+IDAgP1xuICAgICAgICAgIGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zaWduYXR1cmVzRywgJ3NpZ25hdHVyZXMnKSA6IHRoaXMub3ZlcmxheUc7XG4gICAgICAgIHdpZHRoICs9IHRoaXMuZHJhd1NpZ25hdHVyZXMoXG4gICAgICAgICAgc2lnbmF0dXJlcywgeCArIHdpZHRoLCBmYWxzZSwga2V5Q2hhbmdlZCwgdGltZUNoYW5nZWRcbiAgICAgICAgKTtcbiAgICAgIH0gIFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPT09IDAgPyB3aWR0aCA6IDA7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgdGhlIHNpZ25hdGlyZXMgaW4gdGhlIGdpdmVuIGNvbnRhaW5lclxuICAgKiBAcGFyYW0gZSBDb250YWluZXIgb2YgdGhlIHNpZ25hdHVyZXMgdG8gYmUgZHJhd25cbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBzdGFydCBkcmF3aW5nIGl0XG4gICAqIEBwYXJhbSBkcmF3Q2xlZiBXZXRoZXIgdG8gZHJhdyB0aGUgY2xlZiBvciBub3RcbiAgICogQHBhcmFtIGRyYXdLZXkgV2V0aGVyIHRvIGRyYXcgdGhlIGtleSBvciBub3RcbiAgICogQHBhcmFtIGRyYXdUaW1lIFdldGhlciB0byBkcmF3IHRoZSB0aW1lIHNpZ25hdHVyZSBvciBub3RcbiAgICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB3aG9sZSBzaWduYXR1cmUgc2V0IGRyYXduXG4gICAqL1xuICBwcml2YXRlIGRyYXdTaWduYXR1cmVzKFxuICAgIGU6IFNWR0VsZW1lbnQsIHg6IG51bWJlciwgXG4gICAgZHJhd0NsZWY6IGJvb2xlYW4sIGRyYXdLZXk6IGJvb2xlYW4sIGRyYXdUaW1lOiBib29sZWFuXG4gICk6IG51bWJlciB7XG4gICAgY29uc3Qgc3BhY2luZyA9IENPTVBBQ1RfU1BBQ0lORyAqIHRoaXMuc2NhbGU7XG4gICAgbGV0IHdpZHRoID0gc3BhY2luZztcbiAgICBsZXQgYmFja2dyb3VuZDogU1ZHUmVjdEVsZW1lbnQ7XG4gICAgY29uc3QgZHJhd0JhY2tncm91bmQgPSBcbiAgICAgIGUgPT09IHRoaXMub3ZlcmxheUcgfHwgdGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPiAwO1xuXG4gICAgaWYgKGRyYXdCYWNrZ3JvdW5kKSB7XG4gICAgICBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR05TLCAncmVjdCcpO1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsIGAke3h9YCk7XG4gICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzAnKTtcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgJzEnKTsgLy8gMSB0byBhdm9pZCBkaXN0b3J0aW9uc1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgJzEnKTsgLy8gMSB0byBhdm9pZCBkaXN0b3J0aW9uc1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCAnYmFja2dyb3VuZCcpO1xuICAgICAgZS5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kKTtcbiAgICAgIGNvbnN0IHVwcGVyU3R5bGUgPSBcbiAgICAgICAgZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRpdi5wYXJlbnRFbGVtZW50KTtcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgIG51bGwsICdmaWxsJywgdXBwZXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChkcmF3Q2xlZikge1xuICAgICAgY29uc3QgY2xlZiA9IGRyYXdTVkdQYXRoKFxuICAgICAgICBlLCBDTEVGX1BBVEhTW3RoaXMuc3RhZmZNb2RlbC5jbGVmXSwgXG4gICAgICAgIHggKyB3aWR0aCwgMCwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZVxuICAgICAgKTtcbiAgICAgIHNldEZpbGwoY2xlZiwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICAgIHdpZHRoICs9IDMgKiBzcGFjaW5nO1xuICAgIH1cbiAgICBpZiAoZHJhd0tleSkge1xuICAgICAgY29uc3QgYWNjaWRlbnRhbCA9IEtFWV9BQ0NJREVOVEFMU1t0aGlzLmN1cnJlbnRLZXldLmFjY2lkZW50YWw7XG4gICAgICBjb25zdCBvZmZzZXQgPSBcbiAgICAgICAgKHRoaXMuc3RhZmZNb2RlbC5jbGVmID09PSA3MSkgPyAwIDogMTQ7IC8vIE1lYXN1cmVkIGluIHZTdGVwXG4gICAgICBLRVlfQUNDSURFTlRBTFNbdGhpcy5jdXJyZW50S2V5XS5waXRjaGVzLmZvckVhY2goXG4gICAgICAgIHBpdGNoID0+IHtcbiAgICAgICAgICBjb25zdCBzdGVwcyA9IFxuICAgICAgICAgICAgZ2V0Tm90ZURldGFpbHMocGl0Y2gsdGhpcy5zdGFmZk1vZGVsLmNsZWYsIHRoaXMuY3VycmVudEtleSkudlN0ZXBzO1xuICAgICAgICAgIGNvbnN0IHAgPSBkcmF3U1ZHUGF0aChlLCBBQ0NJREVOVEFMX1BBVEhTW2FjY2lkZW50YWxdLCBcbiAgICAgICAgICAgIHggKyB3aWR0aCwgKG9mZnNldCArIHN0ZXBzKSAqIHRoaXMudlN0ZXBTaXplLCBcbiAgICAgICAgICAgIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuICAgICAgICAgIHNldEZpbGwocCwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICAgICAgICB3aWR0aCArPSBwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZHJhd1RpbWUpIHsgLy8gMC41IGFuZCAyLjg1IGFyZSBlbXBpcmljYWwgVGltZXMgZm9udCB2YWx1ZXNcbiAgICAgIGNvbnN0IHRpbWVLZXkgPSBjcmVhdGVTVkdHcm91cENoaWxkKGUsICd0aW1lLWtleScpO1xuICAgICAgY29uc3QgZm9udFNpemUgPSBgJHsyLjg1KnRoaXMuY29uZmlnLm5vdGVIZWlnaHR9cHhgO1xuICAgICAgZHJhd1NWR1RleHQoXG4gICAgICAgIHRpbWVLZXksIGAke3RoaXMuY3VycmVudFRpbWVTaWduYXR1cmUubnVtZXJhdG9yfWAsIFxuICAgICAgICB4ICsgd2lkdGgsIC0gMC41LCBmb250U2l6ZSwgdHJ1ZVxuICAgICAgKTtcbiAgICAgIGRyYXdTVkdUZXh0KFxuICAgICAgICB0aW1lS2V5LCBgJHt0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlLmRlbm9taW5hdG9yfWAsIFxuICAgICAgICB4ICsgd2lkdGgsIDQgKiB0aGlzLnZTdGVwU2l6ZSAtIDAuNSwgZm9udFNpemUsIHRydWVcbiAgICAgICk7XG4gICAgICBzZXRGaWxsKHRpbWVLZXksIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgICB3aWR0aCArPSB0aW1lS2V5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICsgc3BhY2luZztcbiAgICB9IC8vIFRPRE86IENlbnRlciBudW1lcmF0b3Igb3IgZGVub21pbmF0b3IgaWYgbmVlZGVkICAgXG4gICAgY29uc3Qgc3RhZmYgPSB0aGlzLnJlZHJhd1N0YWZmTGluZXMoZSwgeCwgd2lkdGgpO1xuICAgIHNldFN0cm9rZShzdGFmZiwgTElORV9TVFJPS0UsIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgLy8gVmVydGljYWwgYW5kIGhvcml6b250YWwgcmVzaXppbmdcbiAgICBjb25zdCBkaXZSZWN0ID0gdGhpcy5kaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZVJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMudXBkYXRlVmVydGljYWxCb3VuZGFyaWVzKFxuICAgICAgZVJlY3QudG9wIC0gZGl2UmVjdC50b3AsIGVSZWN0LmJvdHRvbSAtIGRpdlJlY3QudG9wXG4gICAgKTtcbiAgICBpZiAoZHJhd0JhY2tncm91bmQpIHsgLy8gTGF0ZSByZWRpbWVuc2lvbiBhZnRlciBmb3JlZ3JvdW5kIGRyYXdpbmdcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCBgJHstdGhpcy5zdGFmZk9mZnNldH1gKTtcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsIGAke3RoaXMuaGVpZ2h0fWApO1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCBgJHt3aWR0aH1gKTtcbiAgICB9XG4gICAgLy8gT3ZlcmxhcHBpbmcgR3JhZGllbnQgb25seSBhcHBsaWVzIGluIG92ZXJsYXlcbiAgICBpZiAoZSA9PT0gdGhpcy5vdmVybGF5Rykge1xuICAgICAgdGhpcy5vdmVybGF5U1ZHLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGAke3dpZHRoICsgNX1gKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGdyYWQgPSBkcmF3U1ZHUGF0aChcbiAgICAgICAgICBlLCBzdGVtUGF0aCwgd2lkdGggKyBpLCBpICogaSAtIHRoaXMuc3RhZmZPZmZzZXQsIDEgLyBTVEVNX1dJRFRILCBcbiAgICAgICAgICAodGhpcy5oZWlnaHQgLSAyICogaSAqIGkpIC8gUEFUSF9TQ0FMRSwgXG4gICAgICAgICAgKGkgLSA1KSAqIChpIC0gNSkgKiAyIC8gUEFUSF9TQ0FMRVxuICAgICAgICApO1xuICAgICAgICBzZXRGaWxsKGdyYWQsIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEJsaW5raW5nIHNldCB1cCBhbmQgcmV0dXJuXG4gICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID4gMCkgeyAvLyBQcm9wb3J0aW9uYWwgdmlzdWFsaXphdGlvblxuICAgICAgY29uc3QgZmlyc3RPdmVybGF5ID0gdGhpcy5zaWduYXR1cmVzUXVhcnRlcnMgPT09IDA7XG4gICAgICBpZiAoZmlyc3RPdmVybGF5KSB7IC8vIEZpcnN0IHRpbWUgb3ZlcmxheSBpcyBkcmF3blxuICAgICAgICB0aGlzLnNpZ25hdHVyZXNRdWFydGVycyA9IFxuICAgICAgICAgIHRoaXMuc3RhZmZNb2RlbC5iYXJzSW5mby50aW1lVG9RdWFydGVycyh3aWR0aC90aGlzLmhTdGVwU2l6ZSk7XG4gICAgICB9XG4gICAgICBpZiAoZmlyc3RPdmVybGF5IHx8IHggPiAwKSB7IC8vIEV4Y2x1ZGVzIHNlY29uZCBvdmVybGF5IGRyYXdpbmdzXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nID0gdHJ1ZTtcbiAgICAgICAgc2V0RmFkZShlLCB0aGlzLnNpZ25hdHVyZXNCbGlua2luZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9IFxuICAgIGVsc2UgeyAvLyBDb21wYWN0IHZpc3VhbGl6YXRpb25cbiAgICAgIHJldHVybiB3aWR0aDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgY3VycmVudCBrZXkgYWNjb3JkaW5nIHRvIHRoZSBxdWFydGVyIHBvc2l0aW9uXG4gICAqIEBwYXJhbSBxdWFydGVycyBRdWFydGVycyBmcm9tIGJlZ2lubmluZyB3aGVyZSBjaGFuZ2UgY291bGQgaGFwcGVuXG4gICAqIEByZXR1cm5zIFdldGhlciBpdCBjaGFuZ2VkIG9yIG5vdFxuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VLZXlTaWduYXR1cmVJZk5lZWRlZChxdWFydGVyczogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLmtleVNpZ25hdHVyZUF0UShxdWFydGVycywgdHJ1ZSk7XG4gICAgaWYgKGtleSA+PSAwKSB7IC8vIFJldHVybnMgLTEgaW4gY2FzZSB0aGVyZSB3YXMgbm8gY2hhbmdlIGF0IHF1YXJ0ZXJzXG4gICAgICB0aGlzLmN1cnJlbnRLZXkgPSBrZXk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IFxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IHRpbWUgc2lnbmF0dXJlIGFjY29yZGluZyB0byB0aGUgcXVhcnRlciBwb3NpdGlvblxuICAgKiBAcGFyYW0gcXVhcnRlcnMgUXVhcnRlcnMgZnJvbSBiZWdpbm5pbmcgd2hlcmUgY2hhbmdlIGNvdWxkIGhhcHBlblxuICAgKiBAcmV0dXJucyBXZXRoZXIgaXQgY2hhbmdlZCBvciBub3RcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlVGltZVNpZ25hdHVyZUlmTmVlZGVkKHF1YXJ0ZXJzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB0cyA9IHRoaXMuc3RhZmZNb2RlbC5iYXJzSW5mby50aW1lU2lnbmF0dXJlQXRRKHF1YXJ0ZXJzLCB0cnVlKTtcbiAgICBpZiAodHMpIHsgLy8gUmV0dXJucyBudWxsIGluIGNhc2UgdGhlcmUgd2FzIG5vIGNoYW5nZSBhdCBxdWFydGVyc1xuICAgICAgdGhpcy5jdXJyZW50VGltZVNpZ25hdHVyZSA9IHRzO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyBzaWduYXR1cmVzIGNoYW5nZSBhbmQgZHJhd2luZyBhY2NvcmRpbmcgdG8geCBwb3NpdGlvbi4gSXQncyB1c2VkXG4gICAqIHRvIHJlcGxhY2Ugb3ZlcmxheXMgb24gaG9yaXpvbnRhbCBzY3JvbGxpbmcgYWNjb3JkaW5nIHRvIG5leHQgZGlhZ3JhbTpcbiAgICogYGBgXG4gICAqICAgIGN1cnJlbnQgIHggICAgIG5leHQgICA8PSBjdXJyZW50ICYgbmV4dCBpbmNsdWRlIHRoZSBzdGFydGluZyBwb2ludFxuICAgKiAgICAgICAgICB8ICB8ICAgICB8XG4gICAqIFswICAgICAgKVsxICAgICAgKVsyICAgICApbnVsbFxuICAgKiBgYGBcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBkcmF3IHNpZ25hdHVyZXNcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlQW5kRHJhd1NpZ25hdHVyZXNJZk5lZWRlZCh4OiBudW1iZXIpIHtcbiAgICBsZXQgcXVhcnRlcjogbnVtYmVyO1xuICAgIGlmIChcbiAgICAgIHggPCB0aGlzLnNpZ25hdHVyZUN1cnJlbnQgfHwgXG4gICAgICAodGhpcy5zaWduYXR1cmVOZXh0ICE9PSBudWxsICYmIHRoaXMuc2lnbmF0dXJlTmV4dCA8PSB4KVxuICAgICkge1xuICAgICAgcXVhcnRlciA9IHRoaXMuc2lnbmF0dXJlc0xpc3RbMF0ucTtcbiAgICAgIHRoaXMuc2lnbmF0dXJlTmV4dCA9IG51bGw7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2lnbmF0dXJlc0xpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHggPCB0aGlzLnNpZ25hdHVyZXNMaXN0W2ldLngpIHtcbiAgICAgICAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSB0aGlzLnNpZ25hdHVyZXNMaXN0W2ldLng7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaWduYXR1cmVDdXJyZW50ID0gdGhpcy5zaWduYXR1cmVzTGlzdFtpXS54O1xuICAgICAgICAgIHF1YXJ0ZXIgPSB0aGlzLnNpZ25hdHVyZXNMaXN0W2ldLnE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocXVhcnRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0bXBLZXkgPSB0aGlzLmN1cnJlbnRLZXk7XG4gICAgICBjb25zdCB0bXBUaW1lU2lnbmF0dXJlID0gdGhpcy5jdXJyZW50VGltZVNpZ25hdHVyZTtcbiAgICAgIHRoaXMuY2hhbmdlS2V5U2lnbmF0dXJlSWZOZWVkZWQocXVhcnRlcik7XG4gICAgICB0aGlzLmNoYW5nZVRpbWVTaWduYXR1cmVJZk5lZWRlZChxdWFydGVyKTtcbiAgICAgIHRoaXMuY2xlYXJTaWduYXR1cmVPdmVybGF5KCk7XG4gICAgICB0aGlzLmRyYXdTaWduYXR1cmVzKHRoaXMub3ZlcmxheUcsIDAsIHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgdGhpcy5jdXJyZW50S2V5ID0gdG1wS2V5O1xuICAgICAgdGhpcy5jdXJyZW50VGltZVNpZ25hdHVyZSA9IHRtcFRpbWVTaWduYXR1cmU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID4gMCAmJiB4ID09PSAwKSB7XG4gICAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSAwOyAvLyBUbyByZXNldCBibGlua2luZyBpZiBzY3JvbGxlZFxuICAgICAgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcgPSB0cnVlO1xuICAgICAgc2V0RmFkZSh0aGlzLm92ZXJsYXlHLCB0aGlzLnNpZ25hdHVyZXNCbGlua2luZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGhhbmRsZXIgZm9yIGhvcml6b25hdGFsIHNjcm9sbCBldmVudHNcbiAgICogQHBhcmFtIF9ldmVudCBJZ25vcmVkXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZVNjcm9sbEV2ZW50ID0gKF9ldmVudDogRXZlbnQpID0+IHtcbiAgICB0aGlzLmxhc3RLbm93blNjcm9sbExlZnQgPSB0aGlzLnBhcmVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICBpZiAoIXRoaXMudGlja2luZykge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhbmdlQW5kRHJhd1NpZ25hdHVyZXNJZk5lZWRlZCh0aGlzLmxhc3RLbm93blNjcm9sbExlZnQpO1xuICAgICAgICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnRpY2tpbmcgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBY3R1YXRvciBvbiB0aGUgaG9yaXpvbnRhbCBzY3JvbGwgdG8gc2hvdyBoaWdobGl0ZWQgbm90ZVxuICAgKiBAcGFyYW0gc2Nyb2xsSW50b1ZpZXcgV2V0aGVyIHRoZSBzY3JvbGwgbXVzdCBmb2xsb3cgYWN0aXZlIG5vdGUgb3Igbm90XG4gICAqIEBwYXJhbSBhY3RpdmVOb3RlUG9zaXRpb24gSG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBhY3RpdmUgbm90ZVxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxJbnRvVmlld0lmTmVlZGVkKFxuICAgIHNjcm9sbEludG9WaWV3OiBib29sZWFuLCBhY3RpdmVOb3RlUG9zaXRpb246IG51bWJlclxuICApIHtcbiAgICBpZiAoc2Nyb2xsSW50b1ZpZXcpIHtcbiAgICAgIGlmICh0aGlzLnNjcm9sbFR5cGUgPT09IFNjcm9sbFR5cGUuUEFHRSkge1xuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBzY3JvbGwgdGhlIGNvbnRhaW5lci5cbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGlmIChhY3RpdmVOb3RlUG9zaXRpb24gPlxuICAgICAgICAgICAgKHRoaXMucGFyZW50RWxlbWVudC5zY3JvbGxMZWZ0ICsgY29udGFpbmVyV2lkdGgpKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnNjcm9sbExlZnQgPSBhY3RpdmVOb3RlUG9zaXRpb24gLSAyMDtcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICAgIGVsc2UgeyAvLyBWYWxpZCBmb3IgYm90aCBTY3JvbGxUeXBlLk5PVEUgJiBTY3JvbGxUeXBlLkJBUlxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnNjcm9sbExlZnQgPSBcbiAgICAgICAgICBhY3RpdmVOb3RlUG9zaXRpb24gLSBjb250YWluZXJXaWR0aCAqIDAuNTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplcyBjb250YWluZXJzIHRvIGZ1bGx5IGhvbGQgc3RhZmYgb24gcG9zc2libGUgcmVzaXplc1xuICAgKiBAcGFyYW0gdG9wIFZlcnRpY2FsIHRvcCBwb3NpdGlvbiBvbiBoaWdoZXN0IHN0YWZmIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gYm90dG9tIFZlcnRpY2FsIGJvdHRvbSBwb3NpdGlvbiBvbiBsb3dlc3Qgc3RhZmYgY29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZlcnRpY2FsQm91bmRhcmllcyh0b3A6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcbiAgICBsZXQgbmV3SGVpZ2h0ID0gMDtcbiAgICBpZiAodG9wIDwgMCkge1xuICAgICAgdGhpcy5zdGFmZk9mZnNldCAtPSB0b3A7XG4gICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IGB0cmFuc2xhdGUoMCwgJHt0aGlzLnN0YWZmT2Zmc2V0fSlgO1xuICAgICAgdGhpcy5vdmVybGF5Ry5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgdHJhbnNsYXRpb24pO1xuICAgICAgdGhpcy5zdGFmZkcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsIHRyYW5zbGF0aW9uKTtcbiAgICAgIG5ld0hlaWdodCA9IHRoaXMuaGVpZ2h0IC0gdG9wO1xuICAgIH1cbiAgICBuZXdIZWlnaHQgPSBNYXRoLm1heChuZXdIZWlnaHQsIGJvdHRvbSAtIHRvcCk7XG4gICAgaWYgKG5ld0hlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICAgIHRoaXMub3ZlcmxheVNWRy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgYCR7dGhpcy5oZWlnaHR9YCk7XG4gICAgICB0aGlzLnN0YWZmU1ZHLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBgJHt0aGlzLmhlaWdodH1gKTtcbiAgICAgIGNvbnN0IGVscyA9IHRoaXMuZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJ3JlY3RbZGF0YS1pZD1cImJhY2tncm91bmRcIl0nKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZWxzW2ldO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsIGAkey10aGlzLnN0YWZmT2Zmc2V0fWApO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgYCR7dGhpcy5oZWlnaHR9YCk7XG4gICAgICB9ICBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgaHR0cCBzdHJpbmcgd2l0aCB0aGUgZGVmYXVsdCBjb2xvciAoZGVmYXVsdCkgb3IgdGhlIGFjdGl2ZSBvbmVcbiAgICogQHBhcmFtIGlzQWN0aXZlIFdldGhlciB0aGUgY29sb3IgaXMgYWN0aXZlIChoaWdobGlnaHQpIG9yIG5vdFxuICAgKiBAcmV0dXJucyBUaGUgY29sb3Igc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIGdldENvbG9yKGlzQWN0aXZlPWZhbHNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHJnYigke2lzQWN0aXZlID8gdGhpcy5jb25maWcuYWN0aXZlTm90ZVJHQiA6IHRoaXMuY29uZmlnLm5vdGVSR0J9KWA7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSB3aXRoIGEgc2xpZ2h0IGJ1bXAgdG8gYXZvaWQgXG4gICAqIHF1aWV0IG5vdGVzIHRvIGJlIGludmlzaWJsZVxuICAgKiBAcGFyYW0gbm90ZVZlbG9jaXR5IFRoZSBNSURJIHZlbG9jaXR5IG9mIHRoZSBub3RlIChmcm9tIDAgdG8gMTI3KVxuICAgKiBAcmV0dXJucyBBIG51bWVyaWNhbCB2YWx1ZSBmb3Igb3BhY2l0eSAoZnJvbSAwLjAgPSBmdWxsIHRyYW5zcGFyZW50IHRvIFxuICAgKiAxLjAgPSBmdWxsIG9wYWNpdHkpIFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRPcGFjaXR5KG5vdGVWZWxvY2l0eT86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgb3BhY2l0eUJhc2VsaW5lID0gMC4yOyAgLy8gU2hpZnQgYWxsIHRoZSBvcGFjaXRpZXMgdXAgYSBsaXR0bGUuXG4gICAgcmV0dXJuIG5vdGVWZWxvY2l0eSA/IFxuICAgICAgKG5vdGVWZWxvY2l0eSAvIDEyNykgKiAoMSAtIG9wYWNpdHlCYXNlbGluZSkgKyBvcGFjaXR5QmFzZWxpbmUgOiAxO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2F0ZXMgYSBTVkcgZ3JvdXAgdG8gaGlnaGxpZ2h0IHRoZSBzeW1ib2xzIGl0IGNvbnRhaW5zXG4gICAqIEBwYXJhbSBub3RlIFRoZSBub3RlIHRvIGxvY2F0ZSB0aGUgU1ZHIGdyb3VwIGl0IGJlbG9uZ3MgdG9cbiAgICogQHJldHVybnMgVGhlIFNWRyBHcm91cFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRHcm91cChub3RlOiBOb3RlSW5mbyk6IFNWR0VsZW1lbnQge1xuICAgIGNvbnN0IHF1YXJ0ZXJzID0gbm90ZS5zdGFydDtcbiAgICBjb25zdCBwaXRjaCA9IG5vdGUucGl0Y2g7XG4gICAgcmV0dXJuIHRoaXMuc3RhZmZTVkcucXVlcnlTZWxlY3RvcihgZ1tkYXRhLWlkPVwiJHtxdWFydGVyc30tJHtwaXRjaH1cIl1gKTtcbiAgfVxuXG59IiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKlxuICogQWxsIFNWRyBwYXRocyBoYXZlIGJlZW4gZHJhd24gaW4gYSBzY2FsZSBvZiBgUEFUSF9TQ0FMRSAqIFBBVEhfU0NBTEVgXG4gKiBpbiBhIHJlbGF0aXZlIHBvc2l0aW9uIHRvIHRoZSBzdGFmZiBtaWRkbGUgbGluZSwgYW5jaG9yaW5nIHRvIHRoZVxuICogbGVmdG1vc3Qgc2lkZSBvZiBhIG5vdGUgaGVhZC5cbiAqL1xuZXhwb3J0IGNvbnN0IFBBVEhfU0NBTEUgPSAxMDA7IFxuXG4vKiogRyBjbGVmIFNWRyBwYXRoICovXG5jb25zdCBnQ2xlZlBhdGggPSBgTSAxMzksNDggQyAxMDIsNTcgNzYsMTIwIDEzMSwxNTEgNDEsMTI4IDY0LDI0IDEyOSwyIEwgXG4xMTcsLTU3IEMgLTMyLDQ3IDI2LDIxNyAxNjYsMTgyIFogbSAxMiwtMSAyNywxMzEgQyAyNDIsMTUzIDIxNiw0NiAxNTEsNDcgXG5aIG0gLTM1LC0xNzcgYyAzNCwtMjMgODIsLTExNyA1MCwtMTQwIC0yMywtMTcgLTcxLDMzIC01MCwxNDAgeiBtIC0xMCwxMCBjIFxuLTIzLC03NyAtMjAsLTIwMCA0OCwtMjEzIDE5LC00IDg5LDE3MSAtMjYsMjY2IGwgMTMsNjYgYyAxMjAsLTYgMTM3LDE1NSBcbjM5LDE5MSBsIDEyLDU4IGMgMzAsMTMxIC0xMzcsMTQ1IC0xMzgsNDcgMCwtMjkgMzcsLTU5IDYzLC0zNyAyMSwxOCAyNSw3MSBcbi0yNSw3MCAzMiw0MiAxMDMsMCA5MSwtNjUgTCAxNjcsMTkzIEMgNTYsMjMyIC0xMTIsNjMgMTA2LC0xMjAgWmA7XG4vKiogRiBjbGVmIFNWRyBwYXRoICovXG5jb25zdCBmQ2xlZlBhdGggPSBgbSAxMDEsLTE5OSBjIC00OSwwIC0xMDAsMjggLTEwMCw4MyAwLDM5IDU4LDU3IDgyLDI2IDE1LC0yMCBcbi00LC00NyAtMzIsLTQ3IC0yMywxIC0yNSwwIC0yNSwtOCAwLC0yMiA0MCwtNDYgNzEsLTQxIDkxLDE2IDY3LDIwOCAtMTA1LDMwMiBcbjc1LC0yNyAxOTgsLTk0IDIxMSwtMjAxIDYsLTY2IC00MiwtMTE0IC0xMDIsLTExNCB6IG0gMTQzLDMzIGMgLTEzLDAgLTIzLDExIFxuLTIzLDI0IDAsMTQgMTAsMjQgMjMsMjQgMTMsMCAyMywtMTEgMjMsLTI0IDAsLTEzIC0xMCwtMjQgLTIzLC0yNCB6IG0gMiw4MyBjIFxuLTEzLDAgLTIzLDExIC0yMywyNCAwLDE0IDEwLDI0IDIzLDI0IDEzLDAgMjMsLTExIDIzLC0yNCAwLC0xMyAtMTAsLTI0IC0yMywtMjQgXG56YDtcblxuLyoqIFdob2xlIG5vdGUgaGVhZCBTVkcgcGF0aCAqL1xuY29uc3Qgd2hvbGVIZWFkUGF0aCA9IGBtIDAsMCBjIDAsLTM3IDQ5LC01MSA3OSwtNTEgMzEsMCA4MywxMyA4Myw1MSAwLDM5IFxuLTU1LDUxIC04NCw1MSBDIDQ5LDUxIDAsMzcgMCwwIFogbSAxMTEsMzEgYyAxMywtMTkgMCwtNTggLTIyLC02OCAtMzMsLTE1IFxuLTUzLDEwIC0zOSw0OSA5LDI3IDQ4LDM5IDYxLDE5IHpgO1xuLyoqIEhhbGYgbm90ZSBoZWFkIFNWRyBwYXRoICovXG5jb25zdCBoYWxmSGVhZFBhdGggPSBgbSAwLDEwIGMgMCwtMjUgMzUsLTYwIDgwLC02MCAxNSwwIDQ1LDQgNDUsNDAgQyAxMjUsMTYgXG44OSw1MCA0NSw1MCAxNyw1MCAwLDM2IDAsMTAgWiBtIDcxLDcgYyAxNywtMTEgNDUsLTM0IDM4LC00NSAtNywtMTAgLTM5LDEgXG4tNTcsMTIgLTE5LDExIC00MiwzMSAtMzYsNDIgNiwxMCAzNywyIDU1LC05IHpgO1xuLyoqIFF1YXJ0ZXIgbm90ZSBoZWFkIChhbmQgc2hvcnRlcikgU1ZHIHBhdGggKi9cbmNvbnN0IHF1YXJ0ZXJIZWFkUGF0aCA9IGBNIDAsMTAgQyAwLC0xNSAzNSwtNTAgODAsLTUwIDExMCwtNTAgMTI1LC0zNSAxMjUsLTEwIFxuMTI1LDE1IDkwLDUwIDQ1LDUwIDE1LDUwIDAsMzUgMCwxMCBaYDtcblxuLyoqIFNoYXJwIGFjY2lkZW50YWwgU1ZHIHBhdGggKi9cbmNvbnN0IHNoYXJwUGF0aCA9IGBtIC00OSwtMTIxIHYgNTIgbCAtMjksOSB2IC00OCBoIC04IHYgNTEgbCAtMjAsNiB2IDI5IGwgXG4yMCwtNiB2IDcwIGwgLTIwLDYgdiAzMCBsIDIwLC02IHYgNTEgaCA4IFYgNjkgbCAzMCwtOCB2IDUwIGggOCBWIDU4IGwgMjAsLTYgXG5WIDIzIGwgLTIwLDYgdiAtNzEgbCAyMCwtNiB2IC0yOSBsIC0yMCw2IHYgLTUwIHogbSAxLDgyIHYgNzEgbCAtMjksOSB2IC03MSB6YDtcbi8qKiBGbGF0IGFjY2lkZW50YWwgU1ZHIHBhdGggKi9cbmNvbnN0IGZsYXRQYXRoID0gYE0gLTEwNiwtMTY2IFYgNjcgYyA1MiwtNDIgODUsLTU2IDg1LC05NCAwLC00NyAtNDYsLTUxIFxuLTczLC0yMiB2IC0xMTcgeiBtIDMxLDEyMCBjIDIwLDAgNDIsNDYgLTIwLDkxIFYgLTcgYyAwLC0yOCAxMCwtMzkgMjAsLTM5IHpgO1xuLyoqIE5Ob3JtYWwgYWNjaWRlbnRhbCBTVkcgcGF0aCAqL1xuY29uc3Qgbm9ybWFsUGF0aCA9IGBtIC04MSwtNTggdiAtNDggSCAtOTIgViA3MyBsIDYwLC0xMyB2IDUwIGggMTEgViAtNzIgWiBtIFxuNTAsMjQgdiA1OCBsIC01MCwxMSB2IC01OCB6YDtcblxuLyoqIFdob2xlIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3Qgd2hvbGVSZXN0UGF0aCA9ICdtIDAsLTUwIGggMTI1IHYgLTUwIEggMCBaJztcbi8qKiBIYWxmIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3QgaGFsZlJlc3RQYXRoID0gJ00gMCwwIEggMTI1IFYgLTUwIEggMCBaJztcbi8qKiBRdWFydGVyIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3QgcXVhcnRlclJlc3RQYXRoID0gYG0gMCwtMjUgYyAzOSwtMzkgMzcsLTc1IDgsLTEyMCBsIDYsLTUgNjEsMTAzIEMgXG40MCwtMTMgMzEsNCA3Myw3MSBsIC01LDUgQyAxNCw1MiAxNiwxMjUgNjcsMTQ0IGwgLTQsNiBDIC0zNywxMDIgLTEsMjIgNTksNjAgWmA7XG4vKiogRWlndGggbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCBlaWd0aFJlc3RQYXRoID0gYG0gNTIsLTQ3IGMgMjYsLTIgNDIsLTIxIDQ4LC00MiBsIDEyLDQgTCA2NCw4MyA1Miw3OSBcbjg4LC00OSBjIDAsMCAtMTcsMjIgLTU3LDIyIC0xNiwwIC0zMSwtMTMgLTMxLC0yNyAwLC0xOCAxMCwtMzEgMjcsLTMxIDE3LDAgXG4zMywxNSAyNSwzOCB6YDtcbi8qKiBTaXh0ZWVudGggbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCBzaXh0ZWVudGhSZXN0UGF0aCA9IGBtIDEyOSwtMTkxIGMgLTYsMjEgLTIyLDQwIC00OCw0MiA4LC0yMyAtOCwtMzggXG4tMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyA0MCwwIDU3LC0yMiA1NywtMjIgbCAtMjAsNjkgXG5jIC03LDE4IC0yMiwzMyAtNDUsMzUgOCwtMjMgLTgsLTM4IC0yNSwtMzggLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IFxuMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIGwgLTM2LDEyOCAxMiw0IDc3LC0yNzAgemA7XG4vKiogVGhpcnR5LXNlY29uZHRoIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3QgdGhpcnR5U2Vjb25kUmVzdFBhdGggPSBgbSAxMjksLTE5MSBjIC02LDIxIC0yMiw0MCAtNDgsNDIgOCwtMjMgLTgsLTM4IFxuLTI1LC0zOCAtMTcsMCAtMjcsMTMgLTI3LDMxIDAsMTQgMTUsMjcgMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIGwgLTIwLDY5IFxuYyAtNywxOCAtMjIsMzMgLTQ1LDM1IDgsLTIzIC04LC0zOCAtMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyBcbjMxLDI3IDQwLDAgNTcsLTIyIDU3LC0yMiBMIDY4LDIwIEMgNjEsMzcgNDYsNTEgMjQsNTIgMzIsMjkgMTYsMTQgLTEsMTQgYyBcbi0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyAzOCwwIDU1LC0yMCA1NywtMjIgbCAtMzYsMTI4IDEyLDQgXG4xMDUsLTM2OSB6YDtcbi8qKiBTaXh0eS1mb3V1cnRoIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3Qgc2l4dHlGb3VydGhSZXN0UGF0aCA9IGBtIDE1OCwtMjkyIGMgLTYsMjEgLTIyLDQwIC00OCw0MiA4LC0yMyAtOCwtMzggXG4tMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyA0MCwwIDU3LC0yMiA1NywtMjIgbCAtMTcsNjEgXG52IDAgYyAtNiwyMSAtMjIsNDAgLTQ4LDQyIDgsLTIzIC04LC0zOCAtMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCBcbjE1LDI3IDMxLDI3IDQwLDAgNTcsLTIyIDU3LC0yMiBsIC0yMCw2OSBjIC03LDE4IC0yMiwzMyAtNDUsMzUgOCwtMjMgLTgsLTM4IFxuLTI1LC0zOCAtMTcsMCAtMjcsMTMgLTI3LDMxIDAsMTQgMTUsMjcgMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIEwgNjgsMjAgQyBcbjYxLDM3IDQ2LDUxIDI0LDUyIDMyLDI5IDE2LDE0IC0xLDE0IGMgLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IDMxLDI3IFxuMzgsMCA1NSwtMjAgNTcsLTIyIGwgLTM2LDEyOCAxMiw0IDEzNCwtNDY5IHpgO1xuXG4vKiogU3RhZmYgbGluZSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IHN0YWZmTGluZVBhdGggPSAnbSAwLDAgaCAxMDAnO1xuLyoqIEV4dHJhIGxpbmUgKG92ZXIgb3IgdW5kZXIgc3RhZmYpIFNWRyBwYXRoICovXG5leHBvcnQgY29uc3QgZXh0cmFMaW5lUGF0aCA9ICdtIC0yNSwwIGggMTc1Jztcbi8qKiBCYXIgbGluZSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IGJhclBhdGggPSAnbSAwLC0yMDAgdiA0MDAnO1xuLyoqIE5vdGUgc3RlbSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IHN0ZW1QYXRoID0gJ20gMCwwIHYgMTAwIGggMTUgdiAtMTAwIHonO1xuLyoqIE5vdGUgZmxhZyBmb3Igc2luZ2xlIGluc3RhbmNlICgxLzh0aCBub3RlcykgU1ZHIHBhdGggKi9cbmV4cG9ydCBjb25zdCBzaW5nbGVGbGFnUGF0aCA9IGBNMCwwIGggMTIgYyA3LDEwMCAxNzUsMTU2IDYyLDMxNCA3OSwtMTc3IC00OSxcbi0xOTMgLTYxLC0yMDAgbCAtMTMsLTUgemA7XG4vKiogTm90ZSBmbGFnIGZvciBtdWx0aXBsZSBpbnN0YW5jZSAoMS8xNnRoIG5vdGVzIGFuZCBzaG9ydGVyKSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IG11bHRpRmxhZ1BhdGggPSBgbSAwLDAgaCAxMCBjIDYsNzIgMTczLDY0IDg0LDIyNyA0NCwtMTIwIC00NCxcbi0xMjMgLTk0LC0xNjcgemA7XG4vKiogTm90ZSB0aWUgU1ZHIHBhdGggKi9cbmV4cG9ydCBjb25zdCB0aWVQYXRoID0gYE0gMCwyNSBDIDEwLDQ2IDMwLDY3IDUwLDY3IDY5LDY3IDkwLDQ3IDEwMCwyNSA5NCxcbjY1IDczLDg5IDUwLDg5IDI2LDg5IDUsNjMgMCwyNSBaYDtcbi8qKiBOb3RlIGRvdCBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IGRvdFBhdGggPSAnTSA1IC0yMCBhIDIwIDIwIDAgMSAwIDAuMDAwMDEgMCB6JztcblxuLyoqXG4gKiBBIHN0cnVjdHVyZSB0byBob2xkIGFsbCBkZXRhaWxzIHRvIGNvbXBvc2UgYSBub3RlIGNvbWJpbmluZyBTVkcgcGF0aCBcbiAqIGRldGFpbHMgYW5kIHRoZWlyIGN1YW50aXRpZXMgKHBvc2l0aW9uLCBudW1iZXIgb2YgZmxhZ3MuLi4pXG4gKi9cbmludGVyZmFjZSBOb3RlUGF0aERldGFpbHMge1xuICAvKiogTm90ZSBoZWFkIFNWRyBwYXRoICovXG4gIHBhdGg6IHN0cmluZztcbiAgLyoqIE5vdGUgaGVhZCB3aWR0aCBzY2FsZSAob3ZlciBgUEFUSF9TQ0FMRWAgcHJvcG9ydGlvbnMpICovIFxuICB3aWR0aDogbnVtYmVyO1xuICAvKiogTm90ZSBzdGVtIGxlbmdodCBtZWFzdXJlZCBpbiB2ZXJ0aWNhbCBzdGFmZiBzdGVwcyAoMiBwZXIgc3RhZmYgbGluZSkgKi9cbiAgc3RlbVZTdGVwczogbnVtYmVyO1xuICAvKiogVmVydGljYWwgcG9zaXRpb24gb2Ygbm90ZSBzdGVtIHN0YXJ0IChvdmVyIGBQQVRIX1NDQUxFYCBwcm9wb3J0aW9ucykgKi9cbiAgc3RlbUFuY2hvcjogbnVtYmVyO1xuICAvKiogTnVtYmVyIG9mIG5vdGUgZmxhZ3MgKi9cbiAgZmxhZ3M6IG51bWJlcjtcbn1cblxuLyoqIE5vdGUgcGF0aCBkZXRhaWxzIGluZGV4ZWQgYnkgbnVtYmVyIG9mIG5vdGUgcXVhcnRlcnMgKi9cbmV4cG9ydCBjb25zdCBOT1RFX1BBVEhTOiB7W2luZGV4OiBudW1iZXJdOiBOb3RlUGF0aERldGFpbHN9ID0ge1xuICA0OiB7XG4gICAgcGF0aDogd2hvbGVIZWFkUGF0aCwgd2lkdGg6IDE1MCwgc3RlbVZTdGVwczogMCwgc3RlbUFuY2hvcjogMCwgXG4gICAgZmxhZ3M6IDBcbiAgfSxcbiAgMjoge1xuICAgIHBhdGg6IGhhbGZIZWFkUGF0aCwgd2lkdGg6IDEyNSwgc3RlbVZTdGVwczogNywgc3RlbUFuY2hvcjogLTEwLCBcbiAgICBmbGFnczogMFxuICB9LFxuICAxOiB7XG4gICAgcGF0aDogcXVhcnRlckhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiA3LCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiAwXG4gIH0sXG4gIDAuNToge1xuICAgIHBhdGg6IHF1YXJ0ZXJIZWFkUGF0aCwgd2lkdGg6IDEyNSwgc3RlbVZTdGVwczogNywgc3RlbUFuY2hvcjogLTEwLCBcbiAgICBmbGFnczogMVxuICB9LFxuICAwLjI1OiB7XG4gICAgcGF0aDogcXVhcnRlckhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiA5LCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiAyXG4gIH0sXG4gIDAuMTI1OiB7XG4gICAgcGF0aDogcXVhcnRlckhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiAxMSwgc3RlbUFuY2hvcjogLTEwLCBcbiAgICBmbGFnczogM1xuICB9LFxuICAwLjA2MjU6IHtcbiAgICBwYXRoOiBxdWFydGVySGVhZFBhdGgsIHdpZHRoOiAxMjUsIHN0ZW1WU3RlcHM6IDEzLCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiA0XG4gIH1cbn07XG5cbi8qKiBOb3RlIHJlc3QgcGF0aHMgaW5kZXhlZCBieSBudW1iZXIgb2Ygbm90ZSBxdWFydGVycyAqL1xuZXhwb3J0IGNvbnN0IFJFU1RfUEFUSFM6IHtbaW5kZXg6IG51bWJlcl06IHN0cmluZ30gPSB7XG4gIDQ6IHdob2xlUmVzdFBhdGgsXG4gIDI6IGhhbGZSZXN0UGF0aCxcbiAgMTogcXVhcnRlclJlc3RQYXRoLFxuICAwLjU6IGVpZ3RoUmVzdFBhdGgsXG4gIDAuMjU6IHNpeHRlZW50aFJlc3RQYXRoLFxuICAwLjEyNTogdGhpcnR5U2Vjb25kUmVzdFBhdGgsXG4gIDAuMDYyNTogc2l4dHlGb3VydGhSZXN0UGF0aFxufTtcblxuLyoqIENsZWYgcGF0aHMgaW5kZXhlZCBieSBlcXVpdmFsZW50IE1JREkgbm90ZSAoc3RhZmYgdmVydGljYWwgcG9zaXRpb24pICovXG5leHBvcnQgY29uc3QgQ0xFRl9QQVRIUzoge1tpbmRleDogbnVtYmVyXTogc3RyaW5nfSA9IHtcbiAgNTA6IGZDbGVmUGF0aCxcbiAgNzE6IGdDbGVmUGF0aFxufTtcblxuLyoqIEFjY2lkZW50YWwgcGF0aHMgaW5kZXhlZCBieSBudW1lcmljIGlkZW50aWZpZXIgKi9cbmV4cG9ydCBjb25zdCBBQ0NJREVOVEFMX1BBVEhTID0gW251bGwsIHNoYXJwUGF0aCwgZmxhdFBhdGgsIG5vcm1hbFBhdGhdOyIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG4gLyoqIFNWRyBOYW1lU3BhY2Ugc3RyaW5nICovXG5leHBvcnQgY29uc3QgU1ZHTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG4vKipcbiAqIERyYXdzIGEgU1ZHIHBhdGggb24gYSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSBlIFRoZSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSBwYXRoIFRoZSBTVkcgcGF0aFxuICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0geSBWZXJ0aWNhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0gc2NhbGVYIEhvcml6b250YWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEBwYXJhbSBzY2FsZVkgVmVydGljYWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEBwYXJhbSBvcGFjaXR5IE9wYWNpdHkgKHdoZXJlIDAgaXMgdHJhbnNwYXJlbnQgYW5kIDEgaXMgZnVsbHkgb3BhcXVlKVxuICogQHJldHVybnMgVGhlIGRyYXduIFNWRyBwYXRoIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdTVkdQYXRoKFxuICBlOiBTVkdFbGVtZW50LCBwYXRoOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBcbiAgc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyLCBvcGFjaXR5ID0gMVxuKTogU1ZHRWxlbWVudCB7XG4gIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR05TLCAncGF0aCcpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIHBhdGgpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhcbiAgICBudWxsLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3h9LCAke3l9KSBzY2FsZSgke3NjYWxlWH0sICR7c2NhbGVZfSlgXG4gICk7XG4gIGNoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdvcGFjaXR5JywgYCR7b3BhY2l0eX1gKTtcbiAgZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gKiBEcmF3cyBhIFNWRyB0ZXh0IG9uIGEgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gZSBUaGUgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCB0byBiZSBkcmF3blxuICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0geSBWZXJ0aWNhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0gZm9udFNpemUgVGhlIGZvbnQgc2l6ZVxuICogQHBhcmFtIGlzQm9sZCBXZXRoZXIgdGhlIHRleHQgc2hvdWxkIGJlIGJvbGQgb3Igbm90XG4gKiBAcGFyYW0gc2NhbGVYIEhvcml6b250YWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEBwYXJhbSBzY2FsZVkgVmVydGljYWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEByZXR1cm5zIFRoZSBkcmF3biBTVkcgdGV4dCBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U1ZHVGV4dChcbiAgZTogU1ZHRWxlbWVudCwgdGV4dDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgXG4gIGZvbnRTaXplOiBzdHJpbmcsIGlzQm9sZD1mYWxzZSwgc2NhbGVYID0gMSwgc2NhbGVZID0gMVxuKTogU1ZHRWxlbWVudCB7XG4gIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR05TLCAndGV4dCcpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZm9udC1mYW1pbHknLCAnVGltZXMnKTtcbiAgY2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZvbnQtc2l6ZScsIGZvbnRTaXplKTtcbiAgaWYgKGlzQm9sZCkge2NoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmb250LXdlaWdodCcsICdib2xkJyk7fVxuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhcbiAgICBudWxsLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3h9LCAke3l9KSBzY2FsZSgke3NjYWxlWH0sICR7c2NhbGVZfSlgXG4gICk7XG4gIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gIGNoaWxkLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgU1ZHIGdyb3VwIG9uIGEgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gZSBUaGUgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gaWQgVGhlIHN0cmluZyB0byBpZGVudGlmeSBpdCB3aGVuIHNlYXJjaGVkIGZvclxuICogQHJldHVybnMgVGhlIGNyZWF0ZWQgU1ZHIGdyb3VwIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNWR0dyb3VwQ2hpbGQoZTogU1ZHRWxlbWVudCwgaWQ6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdOUywgJ2cnKTtcbiAgY2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgaWQpO1xuICBlLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmYWRpbmcgYW5pbWF0aW9uIHRvIHBsYXkgb24gYSBTVkcgZWxlbWVudFxuICogQHBhcmFtIGUgVGhlIGVsZW1lbnQgdG8gYmUgYW5pbWF0ZWRcbiAqIEBwYXJhbSBib3VuY2UgV2V0aGVyIHRoZSBhbmltYXRpb24gc2hvdWxkIHJlcGVhdCBiYWNrd2FyZHMgYW5kIGZvcndhcmRcbiAqIEBwYXJhbSBmcm9tIEluaXRpYWwgb3BhY2l0eSAoMSBpcyBmdWxseSBvcGFxdWUpXG4gKiBAcGFyYW0gdG8gRmluYWwgb3BhY2l0eSAoMCBpcyB0cmFuc3BhcmVudClcbiAqIEByZXR1cm5zIFRoZSByZWNlaXZlZCBTVkcgZWxlbWVudCB0byBiZSBhbmltYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmFkZShcbiAgZTogU1ZHRWxlbWVudCwgYm91bmNlID0gZmFsc2UsIGZyb20gPSAxLCB0byA9IDBcbik6IFNWR0VsZW1lbnQge1xuICBsZXQgYW5pbWF0aW9uID0gZS5xdWVyeVNlbGVjdG9yKGBhbmltYXRlYCk7XG4gIGlmICghYW5pbWF0aW9uKXtcbiAgICBhbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdhbmltYXRlJyk7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2R1cicsICc0cycpO1xuICAgIGFuaW1hdGlvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICdmcmVlemUnKTtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2tleVRpbWVzJywgJzA7IDAuMjU7IDAuNTsgMC43NTsgMScpO1xuICAgIGNvbnN0IGVhc3lJbiA9IChmcm9tICsgMyAqIHRvKSAvIDQ7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgbnVsbCwgJ3ZhbHVlcycsIGAke2Zyb219OyAke2Vhc3lJbn07ICR7dG99OyAke2Vhc3lJbn07ICR7ZnJvbX1gXG4gICAgKTtcbiAgfVxuICBpZiAoYm91bmNlKSB7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdyZXBlYXRDb3VudCcsICcxJyk7XG4gIH1cbiAgZS5hcHBlbmRDaGlsZChhbmltYXRpb24pO1xuICByZXR1cm4gZTtcbn1cblxuLyoqXG4gKiBGaWxscyBhIFNWRyBlbGVtZW50IHdpdGggYSBnaXZlbiBjb2xvclxuICogQHBhcmFtIGUgVGhlIFNWRyBlbGVtZW50IGZvIGJlIGZpbGxlZFxuICogQHBhcmFtIGNvbG9yIFRoZSBmaWxsIGNvbG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWxsKGU6IFNWR0VsZW1lbnQsIGNvbG9yOiBzdHJpbmcpIHtcbiAgZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIGNvbG9yKTtcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIHN0cm9rZSB3aWR0aCBhbmQgY29sb3VyIG9mIGEgZ2l2ZW4gU1ZHIGVsZW1lbnRcbiAqIEBwYXJhbSBlIFRoZSBTVkcgZWxlbWVudCB0byBjaGFuZ2UgdGhlIHN0cm9rZSB0b1xuICogQHBhcmFtIHN0cm9rZVdpZHRoIFRoZSBzdHJva2Ugd2lkdGhcbiAqIEBwYXJhbSBjb2xvciBUaGUgbmV3IGNvbG91clxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0U3Ryb2tlKGU6IFNWR0VsZW1lbnQsIHN0cm9rZVdpZHRoOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcbiAgZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnc3Ryb2tlLXdpZHRoJywgYCR7c3Ryb2tlV2lkdGh9YCk7XG4gIGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3N0cm9rZScsIGNvbG9yKTtcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIGJvdGggZmlsbCBhbmQgc3Ryb2tlIGNvbG91cnMgb2YgYSBTVkcgZWxlbWVudFxuICogQHBhcmFtIGUgVGhlIFNWRyBlbGVtZW50IHRvIGNoYW5nZSBjb2xvdXJzXG4gKiBAcGFyYW0gY29sb3IgVGhlIG5ldyBjb2xvdXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZ2hsaWdodEVsZW1lbnQoZTogU1ZHRWxlbWVudCwgY29sb3I6IHN0cmluZykge1xuICBlLnNldEF0dHJpYnV0ZSgnZmlsbCcsIGNvbG9yKTtcbiAgZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIGNvbG9yKTtcbn1cbiIsIi8qKlxuICogRnVuY3Rpb25hbCB1bml0IHRlc3Qgc2V0IGZvciByaHl0aG0gc3BsaXR0aW5nIG9uIHN0YWZmcmVuZGVyIGxpYnJhcnkuXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IFBhc2N1YWwgZGUgSnVhbiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IFRlc3REYXRhIH0gZnJvbSAnLi90ZXN0X2RhdGEnO1xuXG5leHBvcnQgY29uc3QgdGVzdERhdGE6IFRlc3REYXRhW10gPSBbXTtcblxudmFyIHBvc2l0aW9uID0gMDsgLy8gVXNlZCBmb3IgaW5jcmVtZW50YWwgbm90ZSBzdGFydGluZyBwb2ludFxuXG50ZXN0RGF0YVswXSA9IHtcbiAgdGl0bGU6IGBOb3RlIHN5bWJvbHMgYW5kIHRoZWlyIGR1cmF0aW9uc2AsXG4gIGRlc2NyaXB0aW9uOiBgTm90ZXMgb2YgZGlmZmVyZW50IGxlbmd0aCBzaG91bGQgY29tcGxldGUgZWFjaCBiYXIgZ29pbmcgZnJvbSBcXFxuICAgIHdob2xlIG5vdGUgdGhyb3VnaCAxLzJ0aCwgMS80dGgsIDEvOHRoLCAxLzE2dGgsIDEvMzJ0aCBhbmQgMS82NHRoLCB3aGljaCBcXFxuICAgIGlzIHRoZSBsb3dlc3QgaGFuZGxlZCByZXNvbHV0aW9uLiBTdGVtcyBvbiBmaXJzdCBoYWxmIGJhciBzaG91bGQgYmUgXFxcbiAgICB1cHdhcmRzIGFuZCBzaG91bGQgYmUgZG93bndhcmRzIG9uIHNlY29uZCBoYWxmLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW10sXG4gIH1cbn07XG5wb3NpdGlvbiA9IDA7XG5mb3IgKGxldCBuID0gMTsgbiA8IDEyODsgbiAqPSAyKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gNCAvIG47XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgY29uc3Qgbm90ZVBpdGNoID0gNjcgKyAoaSA+PSBuIC8gMiA/IDUgOiAwKTtcbiAgICB0ZXN0RGF0YVswXS5kYXRhLm5vdGVzLnB1c2goXG4gICAgICB7IHN0YXJ0OiBwb3NpdGlvbiwgbGVuZ3RoOiBkdXJhdGlvbiwgcGl0Y2g6IG5vdGVQaXRjaCwgaW50ZW5zaXR5OiAxMjcgfVxuICAgICk7XG4gICAgcG9zaXRpb24gKz0gZHVyYXRpb247XG4gIH1cbn1cblxudGVzdERhdGFbMV0gPSB7IC8vIE5vdCByZXF1aXJlZCBmb3IgdW5pdGFyeSB0ZXN0IGJ1dCBmb3IgdmlzdWFsIHRlc3QuXG4gIHRpdGxlOiBgU3RlbSBkaXJlY3Rpb24gdGhyZXNob2xkYCxcbiAgZGVzY3JpcHRpb246IGBTdGVtIHNob3VsZCBiZSB1cHdhcmRzIHVwIHRvIHRoaXJkIGxpbmUgbm90ZXMgKGluY2x1ZGVkKS5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMSwgcGl0Y2g6IDY5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMSwgbGVuZ3RoOiAxLCBwaXRjaDogNzEsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLCBsZW5ndGg6IDEsIHBpdGNoOiA3MiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogMSwgcGl0Y2g6IDc0LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbMl0gPSB7XG4gIHRpdGxlOiBgUmVzdCBzeW1ib2xzIGFuZCB0aGVpciBkdXJhdGlvbnNgLFxuICBkZXNjcmlwdGlvbjogYE5vdGVzIG9mIGRpZmZlcmVudCBsZW5ndGggc2hvdWxkIGJlIHBhaXJlZCB3aXRoIHRoZWlyIHJlbGF0aXZlIFxcXG4gICAgcmVzdC4gTGFzdCBub3RlIGhhcyBiZWVuIHBsYWNlZCB0byBjb21wbGV0ZSB0aGUgYmFyIGFuZCBtYWtlIHByZXZpb3VzIHJlc3QgXFxcbiAgICBub3RpY2VhYmxlLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW10sXG4gIH1cbn07XG5wb3NpdGlvbiA9IDA7XG5mb3IgKGxldCBuID0gMTsgbiA8IDEyODsgbiAqPSAyKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gNCAvIG47XG4gIHRlc3REYXRhWzJdLmRhdGEubm90ZXMucHVzaChcbiAgICB7IHN0YXJ0OiBwb3NpdGlvbiwgbGVuZ3RoOiBkdXJhdGlvbiwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4gICk7XG4gIHBvc2l0aW9uICs9IDIgKiBkdXJhdGlvbjtcbn1cbnRlc3REYXRhWzJdLmRhdGEubm90ZXMucHVzaChcbiAgeyBzdGFydDogcG9zaXRpb24sIGxlbmd0aDogMC4xMjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfVxuKTsgLy8gQ29tcGxldGluZyBiYXJcblxudGVzdERhdGFbM10gPSB7XG4gIHRpdGxlOiBgRG90dGVkIG5vdGVzYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlIGxlbmd0aCBjYW4gYmUgZXh0ZW5kZWQgdG8gYSAxNTAlIG9mIGl0cyBub21pbmFsIHZhbHVlIFxcXG4gICAgYWRkaW5nIGEgZG90IGFmdGVyIHRoZSBub3RlIHN5bWJvbC4gVGhpcyBhcHBsaWVzIHRvIGFsbCBub3RlIHN5bWJvbHMgYnV0IFxcXG4gICAgaXQgd2lsbCBub3QgYmUgYXBwbGllZCB0byByZXN0cyBzeW1ib2xzLCBiZXNpZGVzIGl0IGlzIG5vdCBmb3JiaWRkZW4gdW5kZXIgXFxcbiAgICBzb21lIGNpcmN1bXN0YW5jZXMsIGZvbGxvd2luZyB0aGUgY2xhc3NpY2FsIG11c2ljIHRyYW5zY3JpcHRpb24gY2hyaXRlcmlhIFxcXG4gICAgZGlzcmVjb21tZW5kaW5nIHRoZSB1c2Ugb2YgZG90dGVkIHJlc3RzIGluIG9yZGVyIHRvIGVhc2UgdGhlIHJlYWRhYmlsaXR5LiBcXFxuICAgIExhc3Qgbm90ZSBpcyBpbmNsdWRlZCB0byBtYWtlIHByZXZpb3VzIHJlc3RzIG5vdGljZWFibGUuYCxcbiAgZGF0YToge1xuICAgIG5vdGVzOiBbXG4gICAgICB7IHN0YXJ0OiAwLCBsZW5ndGg6IDMsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMuNzUsIGxlbmd0aDogMC4yNSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbNF0gPSB7IC8vIE5vdCByZXF1aXJlZCBmb3IgdW5pdGFyeSB0ZXN0IGJ1dCBmb3IgdmlzdWFsIHRlc3QuXG4gIHRpdGxlOiBgVHJlYmxlIENsZWYgKEctQ2xlZilgLFxuICBkZXNjcmlwdGlvbjogYExlZnRtb3N0IHN5bWJvbCAoc3BpcmFsLWxpa2UpIG1ha2VzIGZpdmUgbGluZXMgcGVudGFncmFtIHRvIFxcXG4gICAgY292ZXIgcGl0Y2hlcyBmcm9tIEQzIHRvIEc0IHRvdWNoaW5nIGV4dHJlbWUgbGluZXMuIEhpZ2hlciBhbmQgbG93ZXIgXFxcbiAgICBwaXRjaGVzIGFyZSByZXByZXNlbnRlZCB1c2luZyBleHRyYSBsaW5lcy4gQzMgaXMgY29uc2lkZXJlZCBcIkctQ2xlZiBsb3dlciBcXFxuICAgIGJvdW5kXCIsIGV2ZW4gdGhvdWdoIGxvd2VyIG5vdGVzIGNhbiBiZSByZXByZXNlbnRlZC4gVGhlcmUncyBubyBcInVwcGVyIFxcXG4gICAgYm91bmRcIiBhbmQgaGlnaGVyIG5vdGVzIGZyb20gQTQgY2FuIGJlIHJlcHJlc2VudGVkLiBPbmNlIHNldHRlZCBpbiBhIHN0YWZmIFxcXG4gICAgaXQgY2Fubm90IGJlIHJlcGxhY2VkIGJ5IGFub3RoZXIgQ2xlZi5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMSwgcGl0Y2g6IDYyLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMSwgbGVuZ3RoOiAxLCBwaXRjaDogNjQsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLCBsZW5ndGg6IDEsIHBpdGNoOiA2NSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogMSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNCwgbGVuZ3RoOiAxLCBwaXRjaDogNjksIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA1LCBsZW5ndGg6IDEsIHBpdGNoOiA3MSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDYsIGxlbmd0aDogMSwgcGl0Y2g6IDcyLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNywgbGVuZ3RoOiAxLCBwaXRjaDogNzQsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA4LCBsZW5ndGg6IDEsIHBpdGNoOiA3NiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDksIGxlbmd0aDogMSwgcGl0Y2g6IDc3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTAsIGxlbmd0aDogMSwgcGl0Y2g6IDc5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTEsIGxlbmd0aDogMSwgcGl0Y2g6IDYwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTIsIGxlbmd0aDogMSwgcGl0Y2g6IDU5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTMsIGxlbmd0aDogMSwgcGl0Y2g6IDU3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTQsIGxlbmd0aDogMSwgcGl0Y2g6IDU1LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTUsIGxlbmd0aDogMSwgcGl0Y2g6IDgxLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTYsIGxlbmd0aDogMSwgcGl0Y2g6IDgzLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTcsIGxlbmd0aDogMSwgcGl0Y2g6IDg0LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTgsIGxlbmd0aDogMSwgcGl0Y2g6IDg2LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbNV0gPSB7IC8vIE5vdCByZXF1aXJlZCBmb3IgdW5pdGFyeSB0ZXN0IGJ1dCBmb3IgdmlzdWFsIHRlc3QuXG4gIHRpdGxlOiBgQmFzcyBDbGVmIChGLUNsZWYpYCxcbiAgZGVzY3JpcHRpb246IGBMZWZ0bW9zdCBzeW1ib2wgKHRoZSBjdXJ2ZWQgb25lIGFsb25nc2lkZXdpdGggY29sb24pIG1ha2VzIFxcXG4gICAgZml2ZSBsaW5lcyBwZW50YWdyYW0gdG8gY292ZXIgcGl0Y2hlcyBmcm9tIEYxIHRvIEIyIHRvdWNoaW5nIGV4dHJlbWUgXFxcbiAgICBsaW5lcy4gSGlnaGVyIGFuZCBsb3dlciBwaXRjaGVzIGFyZSByZXByZXNlbnRlZCB1c2luZyBleHRyYSBsaW5lcy4gQzMgaXMgXFxcbiAgICBjb25zaWRlcmVkIFwiRi1DbGVmIHVwcGVyIGJvdW5kXCIsIGV2ZW4gdGhvdWdoIGhpZ2hlciBub3RlcyBjYW4gYmUgXFxcbiAgICByZXByZXNlbnRlZC4gVGhlcmUncyBubyBcImxvd2VyIGJvdW5kXCIgYW5kIGxvd2VyIG5vdGVzIGZyb20gRTEgY2FuIGJlIFxcXG4gICAgcmVwcmVzZW50ZWQuIE9uY2Ugc2V0dGVkIGluIGEgc3RhZmYgaXQgY2Fubm90IGJlIHJlcGxhY2VkIGJ5IGFub3RoZXIgQ2xlZi5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMSwgcGl0Y2g6IDU5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMSwgbGVuZ3RoOiAxLCBwaXRjaDogNTcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLCBsZW5ndGg6IDEsIHBpdGNoOiA1NSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogMSwgcGl0Y2g6IDUzLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNCwgbGVuZ3RoOiAxLCBwaXRjaDogNTIsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA1LCBsZW5ndGg6IDEsIHBpdGNoOiA1MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDYsIGxlbmd0aDogMSwgcGl0Y2g6IDQ4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNywgbGVuZ3RoOiAxLCBwaXRjaDogNDcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA4LCBsZW5ndGg6IDEsIHBpdGNoOiA0NSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDksIGxlbmd0aDogMSwgcGl0Y2g6IDQzLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTAsIGxlbmd0aDogMSwgcGl0Y2g6IDQxLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTEsIGxlbmd0aDogMSwgcGl0Y2g6IDYwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTIsIGxlbmd0aDogMSwgcGl0Y2g6IDYyLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTMsIGxlbmd0aDogMSwgcGl0Y2g6IDY0LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTQsIGxlbmd0aDogMSwgcGl0Y2g6IDY1LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTUsIGxlbmd0aDogMSwgcGl0Y2g6IDQwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTYsIGxlbmd0aDogMSwgcGl0Y2g6IDM4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTcsIGxlbmd0aDogMSwgcGl0Y2g6IDM2LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMTgsIGxlbmd0aDogMSwgcGl0Y2g6IDM1LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbNl0gPSB7XG4gIHRpdGxlOiBgU2hhcnAgQWNjaWRlbnRhbHNgLFxuICBkZXNjcmlwdGlvbjogYE5vdGVzIGNhbiBtb2RpZnkgdGhlaXIgcGl0Y2ggb25lIHNlbWl0b25lIHVwIHVzaW5nIEFjY2lkZW50YWwgXFxcbiAgICBzeW1ib2wgJyMnIChjYWxsZWQgc2hhcnApIGJlZm9yZSBhIG5vdGUgc3ltYm9sLiBPbmNlIG1vZGlmaWVkIChsZXQncyBzYXkgXFxcbiAgICBHMyksIGFsbCBub3RlcyBpbiBzYW1lIHN0YWZmIHBvc2l0aW9uIGFyZSBtb2RpZmllZCBhcyB3ZWxsIHVudGlsIHRoZSBlbmQgXFxcbiAgICBvZiBjdXJyZW50IGJhci4gU2V0dGluZyBhbiBBY2NpZGVudGFsIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBiYXIgaW5zdGVhZCB0byBcXFxuICAgIGEgc2luZ2xlIG5vdGUgbWFrZXMgaXQgYXBwbHkgYWxsIG5vdGVzIG9mIHNhbWUgbmFtZSAoaS5lLiBHMyBhbmQgRzQpIHRvIFxcXG4gICAgdGhpcyBhbmQgZm9sbG93aW5nIGJhcnMuIFRoaXMgaXMgY2FsbGVkIEtleSBTaWduYXR1cmUgYW5kIHJlc2V0cyBwcmV2aW91cyBcXFxuICAgIEtleSBTaWduYXR1cmVzLCBpZiBhbnkuIFRoZXJlIGlzIGEgTm9ybWFsIFN5bWJvbCB0byBhbnVsZSBhY3RpdmUgXFxcbiAgICBub3RlIEFjY2lkZW50YWwgb2YgZm9sbG93aW5nIG5vdGVzIHVudGlsIHRoZSBlbmQgb2YgYmFyLCB3aGVyZSB0aGVyZSB3b3VsZCBcXFxuICAgIGJlIGEgS2V5IFNpZ25hdHVyZSByZS1hY3RpdmF0aW9uLiBEb3VibGUgc2hhcnAgYW5kIHNpbWlsYXIgQWNjaWRlbnRhbHMgYXJlIFxcXG4gICAgbm90IGNvdmVyZWQgYW5kIHdpbGwgYmUgcmVwcmVzZW50ZWQgYXMgbmV4dCBub3RlIGlmIGFwcGxpY2FibGUuIEZvbGxvd2luZyBcXFxuICAgIHNjb3JlIHNob3dzIGEgS2V5IFNpZ25hdHVyZSBhbmQgc29tZSBub3RlcywgaW4gb3JkZXIsIHVuYWx0ZXJlZCwgc2hhcnAsIFxcXG4gICAgc2hhcnAgKG5vIG5lZWQgZm9yIEFjY2lkZW50YWwgc3ltYm9sKSwgc2hhcnAgKGluIG90aGVyIHNjYWxlLCBuZWVkaW5nIGZvciBcXFxuICAgIHNoYXJwIHN5bWJvbCBhZ2FpbiksIG5vcm1hbCAoYmFjayB0byB1bmFsdGVyZWQpLCBzaGFycCAoaW4gaXRoZXIgc2NhbGUgXFxcbiAgICBhZ2FpbiB3aXRoIG5vIG5lZWQgZm9yIEFjY2lkZW50YWwpLCB1bmFsdGVyZWQsIHNoYXJwIGFnYWluLCBlbmQgb2YgYmFyIFxcXG4gICAgd2l0aCBBY2NpZGVudGFscyByZXNldCAoZXhjZXB0IHRoZSBvbmVzIGZyb20ga2V5IHNpZ25hdHVyZSksIHNoYXJwIGFuZCwgXFxcbiAgICBmaW5hbGx5LCBzaGFycCAoYXBwbHlpbmcga2V5IHNpZ25hdHVyZSB0byBzYW1lIG5hbWUgbm90ZSBpbiBvdGhlciBzY2FsZSkuYCxcbiAgZGF0YToge1xuICAgIGtleVNpZ25hdHVyZXM6IFsgeyBzdGFydDogMCwga2V5OiA3IH0gXSxcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDAuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEuMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA4MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDIuMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDIuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA4MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogMC41LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLjUsIGxlbmd0aDogMC41LCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA0LCBsZW5ndGg6IDIsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDYsIGxlbmd0aDogMiwgcGl0Y2g6IDY2LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbN10gPSB7XG4gIHRpdGxlOiBgRmxhdCBBY2NpZGVudGFsc2AsXG4gIGRlc2NyaXB0aW9uOiBgTm90ZXMgY2FuIG1vZGlmeSB0aGVpciBwaXRjaCBvbmUgc2VtaXRvbmUgZG93biB1c2luZyBcXFxuICAgIEFjY2lkZW50YWwgc3ltYm9sICdiJyAoY2FsbGVkIGZsYXQpIGJlZm9yZSBhIG5vdGUgc3ltYm9sLiBTYW1lIHJ1bGVzIGFwcGx5IFxcXG4gICAgYXMgaW4gU2hhcnAgQWNjaWRlbnRhbHMgc2NlbmFyaW8uIERvdWJsZSBmbGF0IGlzIG5vdCBjb3ZlcmVkIGVpdGhlci4gXFxcbiAgICBTaW1pbGFyIHBhdHRlcm4gaGFzIGJlZW4gdXNlZCBvbiBzY29yZWAsXG4gIGRhdGE6IHtcbiAgICBrZXlTaWduYXR1cmVzOiBbIHsgc3RhcnQ6IDAsIGtleTogNSB9IF0sXG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMC41LCBwaXRjaDogNjksIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAwLjUsIGxlbmd0aDogMC41LCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLjAsIGxlbmd0aDogMC41LCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLjUsIGxlbmd0aDogMC41LCBwaXRjaDogODAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLjAsIGxlbmd0aDogMC41LCBwaXRjaDogNjksIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLjUsIGxlbmd0aDogMC41LCBwaXRjaDogODAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMy41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNCwgbGVuZ3RoOiAyLCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA2LCBsZW5ndGg6IDIsIHBpdGNoOiA1OCwgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG5cbnRlc3REYXRhWzhdID0ge1xuICB0aXRsZTogYEtleSBTaWduYXR1cmVzIG9uIGNocm9tYXRpYyBzY2FsZXNgLFxuICBkZXNjcmlwdGlvbjogYFRoZXJlIGlzIGEgY2xvc2Ugc2V0IG9mIDEyIEtleSBTaWduYXR1cmVzLiBIYWxmIG9mIHRoZW0gdXNlIFxcXG4gICAgc2hhcnBzIChmcm9tIDAgdG8gNSBzaGFycHM6IEMsIEcsIEQsIEEsIEUgYW5kIEIga2V5cywgdGhlIHJpZ2h0IHNpZGUgb2YgXFxcbiAgICB0aGUgQ2lyY2xlIG9mIEZpZnRocykgYW5kIHRoZSByZXN0IHVzZSBmbGF0cyAoZnJvbSAxIHRvIDYgZmxhdHM6IEYsIEJiLCBcXFxuICAgIEViLCBBYiwgRGIgYW5kIEdiIGtleXMpLiBGb2xsb3dpbmcgc2NvcmUgd2lsbCBzaG93IGEgY2hyb21hdGljIHNjYWxlIG9uIFxcXG4gICAgZWFjaCBrZXkgaW4gdGhhdCBwcmVjaXNlIG9yZGVyLiBPdmVybGFwcGluZyBrZXlzIHdpdGggZGlmZmVyZW50IG5hbWVzIChHYiBcXFxuICAgID0gRiMpIGhhdmUgYmVlbiByZW1vdmVkIGZvciBzaW1wbGljaXR5IHNha2UuIEFjY2lkZW50YWxzIHdpbGwgYmUgb2YgYSBcXFxuICAgIHVuaXF1ZSBraW5kIGFsb25nIGEgZ2l2ZW4ga2V5LCBzbyB0ZXJlIHdvbid0IGFwcGVhciBhIG1peCBzaGFycHMgYW5kIFxcXG4gICAgZmxhdHMgKGV2ZW4gdGhvdWdoIGl0J3MgYWxsb3dlZCBpbiBtdXNpY2FsIGhhbmR3cml0aW5nKS5gLFxuICBkYXRhOiB7XG4gICAga2V5U2lnbmF0dXJlczogWyBcbiAgICAgIHsgc3RhcnQ6ICAgMCwga2V5OiAgMCB9LFxuICAgICAgeyBzdGFydDogIDEyLCBrZXk6ICA3IH0sXG4gICAgICB7IHN0YXJ0OiAgMjQsIGtleTogIDIgfSxcbiAgICAgIHsgc3RhcnQ6ICAzNiwga2V5OiAgOSB9LFxuICAgICAgeyBzdGFydDogIDQ4LCBrZXk6ICA0IH0sXG4gICAgICB7IHN0YXJ0OiAgNjAsIGtleTogMTEgfSxcbiAgICAgIHsgc3RhcnQ6ICA3Miwga2V5OiAgNSB9LFxuICAgICAgeyBzdGFydDogIDg0LCBrZXk6IDEwIH0sXG4gICAgICB7IHN0YXJ0OiAgOTYsIGtleTogIDMgfSxcbiAgICAgIHsgc3RhcnQ6IDEwOCwga2V5OiAgOCB9LFxuICAgICAgeyBzdGFydDogMTIwLCBrZXk6ICAxIH0sXG4gICAgICB7IHN0YXJ0OiAxMzIsIGtleTogIDYgfVxuICAgIF0sXG4gICAgbm90ZXM6IFtdLFxuICB9XG59O1xucG9zaXRpb24gPSAwO1xuZm9yIChsZXQgbiA9IDA7IG4gPCAxMjsgKytuKSB7XG4gIGZvciAobGV0IHAgPSA2MDsgcCA8IDcyOyArK3ApIHtcbiAgICB0ZXN0RGF0YVs4XS5kYXRhLm5vdGVzLnB1c2goXG4gICAgICB7IHN0YXJ0OiBwb3NpdGlvbisrLCBsZW5ndGg6IDEsIHBpdGNoOiBwLCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgKTtcbiAgfVxufVxuXG50ZXN0RGF0YVs5XSA9IHtcbiAgdGl0bGU6IGBUaW1lIFNpZ25hdHVyZXNgLFxuICBkZXNjcmlwdGlvbjogYE5vdGVzIGNhbiBiZSBncm9wdWVkIG9uIGJhcnMgYWNjb3JkaW5nIHRvIFwiYmVhdFwiIHJoeXRobSBcXFxuICAgIHBhdHRlcm5zLCBkZWZpbmVkIGJ5IFRpbWUgU2lnbmF0dXJlcyBjb25zaXN0aW5nIG9uIGEgbnVtZXJhdG9yIGFuZCBhIFxcXG4gICAgZGVub21pbmF0b3IgbnVtYmVyLiBEZW5vbWluYXRvciBkZWZpbmVzIHRoZSBsZW5ndGggb2YgaXRzIGJlYXQgYXMgdGhlIFxcXG4gICAgZnJhY3Rpb24gb2YgYSB3aG9sZSBub3RlLCBhbmQgbnVtZXJhdG9yIGRlZmluZXMgdGhlIG51bWJlciBvZiBiZWF0cyBcXFxuICAgIG5lZWRlZCB0byBjb21wbGV0ZSBhIGJhci4gQSBUaW1lIFNpZ25hdHVyZSBzaG93biBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgXFxcbiAgICBiYXIgY2hhbmdlcyByaHl0aG0gdG8gdGhhdCBiYXIgYW5kIGZvbGxvd2luZ3MuIE5leHQgc2NvcmUgc2hvd3Mgc2V2ZXJhbCBcXFxuICAgIFRpbWUgU2lnbmF0dXJlcy5gLFxuICBkYXRhOiB7XG4gICAgdGltZVNpZ25hdHVyZXM6IFtdLFxuICAgIG5vdGVzOiBbXSxcbiAgfVxufTtcbnBvc2l0aW9uID0gMDtcbmZvciAobGV0IGQgPSAyOyBkIDw9IDg7IGQgKj0gMikge1xuICBjb25zdCBsID0gNCAvIGQ7XG4gIGNvbnN0IGRhdGEgPSB0ZXN0RGF0YVs5XS5kYXRhO1xuICBmb3IgKGxldCBuID0gMjsgbiA8PSAxMjsgKytuKSB7XG4gICAgZGF0YS50aW1lU2lnbmF0dXJlcy5wdXNoKFxuICAgICAgeyBzdGFydDogcG9zaXRpb24sIG51bWVyYXRvcjogbiwgZGVub21pbmF0b3I6IGQgfVxuICAgIClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgZGF0YS5ub3Rlcy5wdXNoKFxuICAgICAgICB7IHN0YXJ0OiBwb3NpdGlvbiwgbGVuZ3RoOiBsLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgICAgICk7XG4gICAgICBwb3NpdGlvbiArPSBsO1xuICAgIH1cbiAgfVxufVxuXG50ZXN0RGF0YVsxMF0gPSB7XG4gIHRpdGxlOiBgV2hvbGUgcmVzdHNgLFxuICBkZXNjcmlwdGlvbjogYFdob2xlIHJlc3Qgc3ltYm9sIGlzIHVzZWQgdG8gc3BlY2lmeSBhIHdob2xlIHNpbGVudCBiYXIsIG5vIFxcXG4gICAgbWF0dGVyIHdoaWNoIHRoZSB0aW1lIHNpZ25hdHVyZSBpcy5gLFxuICBkYXRhOiB7XG4gICAgdGltZVNpZ25hdHVyZXM6IFsgXG4gICAgICB7IHN0YXJ0OiAgIDAsIG51bWVyYXRvcjogIDMsIGRlbm9taW5hdG9yOiA0IH0sXG4gICAgICB7IHN0YXJ0OiAgIDYsIG51bWVyYXRvcjogIDYsIGRlbm9taW5hdG9yOiA4IH0sXG4gICAgICB7IHN0YXJ0OiAgMTIsIG51bWVyYXRvcjogIDcsIGRlbm9taW5hdG9yOiAyIH0sXG4gICAgICB7IHN0YXJ0OiAgNDAsIG51bWVyYXRvcjogIDQsIGRlbm9taW5hdG9yOiA0IH1cbiAgICBdLFxuICAgIG5vdGVzOiBbIFxuICAgICAgeyBzdGFydDogIDMsIGxlbmd0aDogIDMsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6ICA5LCBsZW5ndGg6ICAzLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyNiwgbGVuZ3RoOiAxNCwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNDQsIGxlbmd0aDogIDQsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICBdXG4gIH1cbn07XG5cbnRlc3REYXRhWzExXSA9IHtcbiAgdGl0bGU6IGBUaWVzYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlcyBsb25nZXIgdGhhbiBhdmlsYWJsZSBub3RlIHN5bWJvbHMgbGVuZ3RoIGNhbiBiZSBhY2hpZXZlZCBcXFxuICBjb21iaW5pbmcgdHdvIG9yIG1vcmUgdGhyb3VnaCB0aWVzLiBOb3RlcyB3aGljaCBzdXJwYXNzIGJhcnMgbXVzdCBiZSBcXFxuICBzcGxpdHRlZCB1c2luZyB0aWVzLiBSZXN0IGFnZ3JlZ2F0aW9uIGRvZXMgbm90IG5lZWQgYW55IHRpZS4gRm9sbG93aW5nIHNjb3JlIFxcXG4gIHNob3dzIHRocmVlIHRpZWQgbm90ZXMsIGEgcmVzdHMgc2V0IGFuZCB0d28gdGllZCBub3RlcyB0byBzdXJwYXNzIGEgYmFyLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAyKzEvMisxLzgsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogNSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcbiIsIi8qKlxuICogRnVuY3Rpb25hbCB1bml0IHRlc3Qgc2V0IGZvciByaHl0aG0gc3BsaXR0aW5nIG9uIHN0YWZmcmVuZGVyIGxpYnJhcnkuXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IFBhc2N1YWwgZGUgSnVhbiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IFRlc3REYXRhIH0gZnJvbSAnLi90ZXN0X2RhdGEnO1xuXG5leHBvcnQgY29uc3QgdGVzdERhdGE6IFRlc3REYXRhW10gPSBbXTtcblxudGVzdERhdGFbMF0gPSB7XG4gIHRpdGxlOiBgVW5jb21wbGV0ZSBiZWF0IGZ1bGZpbGxtZW50YCxcbiAgZGVzY3JpcHRpb246IGBOb3RlcyBzaG91bGQgYmUgc3BsaXRlZCBhbmQgdGllZCB0byBtYWtlIGNsZWFyIHdoZXJlIGRvZXMgYSBcXFxuICAgIGJlYXQgc3RhcnRzIGFuZCBlbmRzLCBlYXNpbmcgdGhlIHJoeXRobSByZWFkYWJpbGl0eS5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMC41LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAwLjUsIGxlbmd0aDogMSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMS41LCBsZW5ndGg6IDIuNSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbMV0gPSB7XG4gIHRpdGxlOiBgVGllcyBhbmQgcmVzdHMgb3JkZXJpbmdgLFxuICBkZXNjcmlwdGlvbjogYFRoZSBvcmRlciBvZiB0aWVkIG5vdGVzIG9yIHJlc3RzIGdyb3VwcyB1c2VzIHRvIGJlIGRlY3JlYXNpbmcgXFxcbiAgICBsZW5ndGhzIGZyb20gbG9uZ2VyIGR1cmF0aW9uIHN5bWJvbHMgdG8gc2hvcnRlciBvbmVzLCB1bmxlc3Mgc3VjaCBncm91cCBvZiBcXFxuICAgIHN5bWJvbHMgY29tcGxldGUgYSBiZWF0IHdpdGhpbiBhIGJhciwgaW4gd2hpY2ggY2FzZSB0aGV5IHdpbGwgYmUgb3JkZXJlZCBcXFxuICAgIGluY3JlYXNpbmcgbGVuZ3RocyBmcm9tIHNob3J0ZXIgdG8gbG9uZ2VyIHN5bWJvbHMgaW4gb3JkZXIgdG8gXFxcbiAgICBzeW1tZXRyaWNhbGx5IGNvbXBsZXRlIHRoZSBzdGFydGluZyBwYXJ0IG9mIHRoZSBiZWF0LiBGb2xsb3dpbmcgc2NvcmUgXFxcbiAgICBzaG93cyB0aHJlZSBkZWNyZWFzaW5nIHRpZWQgbm90ZXMsIGFuIGluY3JlYXNpbmcgcmVzdHMgc2V0LCBmb2xsb3dlZCBieSBhIFxcXG4gICAgZGVjcmVhc2luZyByZXN0IHNldCBhbmQgdHdvIGFzY2VuZGluZyB0aWVkIG5vdGVzIHRpbGwgdGhlIGVuZCBvZiB0aGUgYmFyLCBcXFxuICAgIHRpZWQgYWdhaW4gdG8gbm90ZSBpbiBuZXh0IGJhciwgZm9sbG93ZWQgYnkgYW4gYXNjZW5kaW5nIHJlc3Qgc2V0IHRvIFxcXG4gICAgY29tcGxldGUgdGhlIGJlYXQgYW5kIHRoZW4gYSByZWd1bGFyIGRlY3JlYXNpbmcgcmVzdC4gTGFzdCBub3RlIG1ha2VzIFxcXG4gICAgcHJldmlvdXMgcmVzdCBub3RpY2VhYmxlLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAyKzEvMisxLzgsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDQtKDEvNCsxLzE2KSwgbGVuZ3RoOiAxLzQrMi8xNiwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogOCwgbGVuZ3RoOiA0LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjEgUGFzY3VhbCBkZSBKdWFuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgVGVzdERhdGEgfSBmcm9tICcuLi8uLi90ZXN0L3Rlc3RfZGF0YSc7XG5pbXBvcnQgeyBTdGFmZlNWR1JlbmRlciwgU2Nyb2xsVHlwZSB9IGZyb20gJy4uLy4uL3NyYy9zdGFmZl9zdmdfcmVuZGVyJztcblxuY29uc3QgY29uZmlnID0ge1xuICBub3RlSGVpZ2h0OiAxNSxcbiAgcGl4ZWxzUGVyVGltZVN0ZXA6IDAsXG4gIGluc3RydW1lbnRzOiBbMF0sXG4gIGRlZmF1bHRLZXk6IDAsXG4gIHNjcm9sbFR5cGU6IFNjcm9sbFR5cGUuQkFSXG59XG5cbmZ1bmN0aW9uIHZpc3VhbGl6ZShkaXY6IEhUTUxEaXZFbGVtZW50LCB0ZXN0OiBUZXN0RGF0YSkge1xuICBjb25zdCBkZXRhaWxzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmFwcGVuZENoaWxkKGRldGFpbHNEaXYpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgdGl0bGUuaW5uZXJUZXh0ID0gdGVzdC50aXRsZTtcbiAgZGV0YWlsc0Rpdi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRlc3QuZGVzY3JpcHRpb247XG4gIGRldGFpbHNEaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb250YWluZXJEaXYuY2xhc3NOYW1lID0gJ3Zpc3VhbGl6ZXItY29udGFpbmVyJztcbiAgZGl2LmFwcGVuZENoaWxkKGNvbnRhaW5lckRpdik7XG4gIGNvbnN0IHNjb3JlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHNjb3JlRGl2KTtcbiAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gIG5ldyBTdGFmZlNWR1JlbmRlcih0ZXN0LmRhdGEsIGNvbmZpZywgc2NvcmVEaXYpO1xufVxuXG5pbXBvcnQgKiBhcyBicyBmcm9tICcuLi8uLi90ZXN0L2Jhc2ljX3N5bWJvbHNfZmVhdHVyZXMnO1xuY29uc3QgYnNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFzaWNTeW1ib2xzJykgYXMgSFRNTERpdkVsZW1lbnQ7XG5icy50ZXN0RGF0YS5mb3JFYWNoKCB0ZXN0ID0+IHZpc3VhbGl6ZShic0RpdiwgdGVzdCkgKTtcblxuaW1wb3J0ICogYXMgcnMgZnJvbSAnLi4vLi4vdGVzdC9yaHl0aG1fc3BsaXRfZmVhdHVyZXMnO1xuY29uc3QgcnNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmh5dGhtU3BsaXQnKSBhcyBIVE1MRGl2RWxlbWVudDtcbnJzLnRlc3REYXRhLmZvckVhY2goIHRlc3QgPT4gdmlzdWFsaXplKHJzRGl2LCB0ZXN0KSApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==