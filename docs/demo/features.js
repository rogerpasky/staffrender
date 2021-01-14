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
/*! exports provided: MIN_RESOLUTION, MAX_QUARTER_DIVISION, SCALES, KEY_ACCIDENTALS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_RESOLUTION", function() { return MIN_RESOLUTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_QUARTER_DIVISION", function() { return MAX_QUARTER_DIVISION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCALES", function() { return SCALES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_ACCIDENTALS", function() { return KEY_ACCIDENTALS; });
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
            this.length = this.length;
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
        if (splittedBlock && this.pulseEnd) {
            splittedBlock.pulseEnd = true;
            this.pulseEnd = false;
        }
        return splittedBlock;
    }
    splitToPulse(barsInfo) {
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
                this.pulseEnd = true;
            }
        }
        else {
            this.pulseBegin = true;
            const quartersAtBarEnd = Math.round((quartersAtBarBeginning + timeSignature.numerator * metricBeat) *
                1000000) / 1000000;
            splittedBlock = this.split(quartersAtBarEnd, barsInfo);
            if (isSafeZero(this.start + this.length - quartersAtBarEnd)) {
                this.pulseEnd = true;
            }
        }
        if (splittedBlock) {
            this.pulseEnd = true;
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
                const currentBlock = noteToBlocks(staffNote, blocks, barNumber);
                if (currentBlock === lastBlock) {
                    if (staffNote.length < lastBlock.length) {
                        const quarters = staffNote.start + staffNote.length;
                        const splittedBlock = currentBlock.split(quarters, this.barsInfo);
                        blocks.set(splittedBlock.start, splittedBlock);
                    }
                    else if (lastBlock.length < staffNote.length) {
                        const quarters = lastBlock.start + lastBlock.length;
                        const splittedBlock = currentBlock.split(quarters, this.barsInfo);
                        blocks.set(splittedBlock.start, splittedBlock);
                        this.lastQ = staffNoteEnd;
                    }
                }
                else {
                    if (staffNote.start > this.lastQ) {
                        const quarters = this.lastQ;
                        const bar = this.barsInfo.barNumberAtQ(quarters);
                        const restBlock = new _staff_block__WEBPACK_IMPORTED_MODULE_2__["StaffBlock"](quarters, staffNote.start - this.lastQ, [], bar);
                        blocks.set(restBlock.start, restBlock);
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
                        blockToBlocks(splittedBlock, blocks);
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
                    remainingBlock = currentBlock.splitToPulse(this.barsInfo);
                    const increasing = !currentBlock.pulseBegin && currentBlock.pulseEnd;
                    let remainingSymbolsBlock = null;
                    do {
                        remainingSymbolsBlock =
                            currentBlock.splitToSymbols(this.barsInfo, increasing);
                        currentBlock.setBeaming(lastStaffBlock, this.barsInfo);
                        blockToBlocks(currentBlock, staffBlockMap);
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
function blockToBlocks(staffBlock, blocks) {
    if (blocks.has(staffBlock.start)) {
        const existingBlock = blocks.get(staffBlock.start);
        staffBlock.notes.forEach(note => existingBlock.addNote(note));
    }
    else {
        blocks.set(staffBlock.start, staffBlock);
    }
}
function noteToBlocks(note, blocks, barNumber) {
    if (blocks.has(note.start)) {
        const existingBlock = blocks.get(note.start);
        existingBlock.addNote(note);
        return existingBlock;
    }
    else {
        const newBlock = new _staff_block__WEBPACK_IMPORTED_MODULE_2__["StaffBlock"](note.start, note.length, [note], barNumber, note.vSteps, note.vSteps);
        blocks.set(note.start, newBlock);
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
    return averagePitch < 60 ? 50 : 71;
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
    rest. Last note has been placed to complete the bar and make last rest \
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
    Last note is included to make last rests noticeable.`,
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
  splitted using ties. Rest aggregation does not need any tie. Following \
  score shows three tied notes, a rests set, two tied notes to surpass a bar.`,
    data: {
        notes: [
            { start: 0, length: 2 + 1 / 2 + 1 / 8, pitch: 67, intensity: 127 },
            { start: 3, length: 2, pitch: 67, intensity: 127 },
            { start: 7, length: 1, pitch: 67, intensity: 127 }
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
    title: `Uncomplete pulse fulfillment`,
    description: `Notes should be splited and tied to make clear where does a \
    pulse starts and ends, easing the rhythm readability.`,
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
    symbols complete a pulse within a bar, in which case they will be ordered \
    increasing lengths from shorter to longer symbols in order to \
    symmetrically complete the starting part of the pulse. Following score \
    shows three decreasing tied notes, an increasing rests set, followed by a \
    decreasing rest set and two ascending tied notes, a long decreasing rest \
    set and two notes tied to surpass a bar.`,
    data: {
        notes: [
            { start: 0, length: 2 + 1 / 2 + 1 / 8, pitch: 67, intensity: 127 },
            { start: 4 - (1 / 4 + 1 / 16), length: 1 / 4 + 1 / 16, pitch: 67, intensity: 127 },
            { start: 8 - 1 / 16, length: 4 + 1 / 16, pitch: 67, intensity: 127 }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9iYXJzX2luZm8udHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tb2RlbF9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXJfY29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3RhZmZfYmxvY2sudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9zdGFmZl9pbmZvLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3RhZmZfbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9zdGFmZl9zdmdfcmVuZGVyLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3ZnX3BhdGhzLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3ZnX3Rvb2xzLnRzIiwid2VicGFjazovLy8uLi90ZXN0L2Jhc2ljX3N5bWJvbHNfZmVhdHVyZXMudHMiLCJ3ZWJwYWNrOi8vLy4uL3Rlc3Qvcmh5dGhtX3NwbGl0X2ZlYXR1cmVzLnRzIiwid2VicGFjazovLy8uL3NyYy9mZWF0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNB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QUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRTtDQUNqRSxDQUFDO0FBTUssTUFBTSxlQUFlLEdBQUc7SUFDN0IsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUM7SUFDNUIsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztJQUM5QyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0lBQ2xDLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0lBQ3RDLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztJQUMxQyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDOUIsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7SUFDbEQsRUFBQyxV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RUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtTQUNwRDtLQUNGO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRztJQUNaLEtBQUssRUFBRSxvQkFBb0I7SUFDM0IsV0FBVyxFQUFFOzs7OzsrRUFLZ0U7SUFDN0UsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFO1lBQ0wsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ3BEO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQ1osS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixXQUFXLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs4RUFlK0Q7SUFDNUUsSUFBSSxFQUFFO1FBQ0osYUFBYSxFQUFFLENBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBRTtRQUN2QyxLQUFLLEVBQUU7WUFDTCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7U0FDbkQ7S0FDRjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUc7SUFDWixLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLFdBQVcsRUFBRTs7OzJDQUc0QjtJQUN6QyxJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUUsQ0FBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFFO1FBQ3ZDLEtBQUssRUFBRTtZQUNMLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVB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O0FBQ3ZELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFtQixDQUFDO0FBQ3ZFLG9FQUFXLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBRSxDQUFDIiwiZmlsZSI6ImZlYXR1cmVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZmVhdHVyZXMudHNcIik7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBQYXNjdWFsIGRlIEp1YW4uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtcbiAgU3RhZmZJbmZvLCBUZW1wb0luZm8sIFRpbWVTaWduYXR1cmVJbmZvLCBLZXlTaWduYXR1cmVJbmZvLCBnZXRCYXJMZW5ndGhcbn0gZnJvbSAnLi9zdGFmZl9pbmZvJztcblxuaW1wb3J0IHsgXG4gIE1BWF9RVUFSVEVSX0RJVklTSU9OXG59IGZyb20gJy4vbW9kZWxfY29uc3RhbnRzJztcbiAgXG4vKipcbiAqIFN0b3JlcyB0aGUgc2NvcmUgc3RydWN0dXJhbCBpbmZvIGluIGNodW5rcywgbGlrZSBzaWduYXR1cmVzIGFuZCBiYXIgZGV0YWlscywgXG4gKiBpbiBvcmRlciB0byB1c2UgaXQgZm9yIGJhciBoYW5kbGluZy4gRXZlcnkgY2h1bmsgYXBwbGllcyBmcm9tIGl0cyBzdGFydFxuICogcG9pbnQgdG8gdGhlIG5leHQgb25lLiBUaGlzIGluZm8gY2FuIGJlIGVhc2lseSBpbmRleGVkIHRvIGRvIGEgZmFzdCBsb29rdXAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQmFySW5mbyB7XG4gIC8qKiBXaGVyZSBhbGwgdGhpcyBpbmZvIHN0YXJ0cyBhcHBseWluZyAqL1xuICBzdGFydDogbnVtYmVyO1xuICAvKiogVGhlIGFwcGxpY2FibGUgYmFyIG51bWJlciBpbiB0aGlzIGNodW5rICovXG4gIGJhck51bWJlcjogbnVtYmVyO1xuICAvKiogVGhlIGFwcGxpY2FibGUgYmFyIGxlbmd0aCBpbiB0aGlzIGNodW5rICovXG4gIGJhckxlbmd0aDogbnVtYmVyO1xuICAvKiogVGhlIGFwcGxpY2FibGUgdGVtcG8gaW4gdGhpcyBjaHVuayAqL1xuICB0ZW1wbzogVGVtcG9JbmZvO1xuICAvKiogVGhlIGFwcGxpY2FibGUgS2V5IFNpZ25hdHVyZSBpbiB0aGlzIGNodW5rICovXG4gIGtleVNpZ25hdHVyZTogS2V5U2lnbmF0dXJlSW5mbztcbiAgLyoqIFRoZSBhcHBsaWNhYmxlIFRpbWUgU2lnbmF0dXJlIGluIHRoaXMgY2h1bmsgKi9cbiAgdGltZVNpZ25hdHVyZTogVGltZVNpZ25hdHVyZUluZm87XG4gIC8qKiBXZXRoZXIgdGhlIFRlbXBvIGNoYW5nZWQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzIGNodW5rICovXG4gIHRlbXBvQ2hhbmdlPzogYm9vbGVhbjtcbiAgLyoqIFdldGhlciB0aGUgS2V5IFNpZ25hdHVyZSBjaGFuZ2VkIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBjaHVuayAqL1xuICBrZXlDaGFuZ2U/OiBib29sZWFuO1xuICAvKiogV2V0aGVyIHRoZSBUaW1lIFNpZ25hdHVyZSBjaGFuZ2VkIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBjaHVuayAqL1xuICB0aW1lQ2hhbmdlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIGZyYW1ld29yayBmb3IgQmFySW5mbyBpbmRleGluZyBhbmQgZmFzdCB0cmF2ZXJzaW5nIGluIGlyZGVyIHRvIFxuICogbG9jYXRlIHRoZSBzdHJ1Y3R1cmFsIGluZm8gcmVsYXRlZCB0byBhbnkgbm90ZS4gSXQgY3VycmVudGx5IHN0b3JlcyB0aGUgaW5mbyBcbiAqIGluIGNodW5rcyBhcyBzaG9ydCBhcyBhIHNpeHR5Zm91cnRoIG5vdGUsIGkuZS4gdGhlIHNob3J0ZXN0IG1hbmFnZWFibGVcbiAqIHB1bHNlIChsaWtlIGluIDQvNjQgVGltZSBTaWduYXR1cmUpLlxuICovXG5leHBvcnQgY2xhc3MgQmFyc0luZm8ge1xuICAvKiogRmxhZyB0byBkZWZpbmUgZG90dGVkIHJlc3RzIGNvbmZpZ3V0YXJpb24gKG1heSBjaGFuZ2UgaW4gYSBmdXR1cmUpLiAqL1xuICBwdWJsaWMgYWxsb3dEb3R0ZWRSZXN0cz86IGJvb2xlYW47XG4gIC8qKiBJbnRlcm5hbCBzdG9yYWdlIG9mIHN0cnVjdHVyYWwgY2h1bmtzLiAqL1xuICBwcml2YXRlIGJhcnNJbmZvOiBCYXJJbmZvW107XG5cbiAgLyoqIFxuICAgKiBGaWxscyB0aGUgcmVmZXJlbmNlIGluZm8gKGJhciwgdGVtcG8sIHRpbWUgc2lnbmF0dXJlIGFuZCBrZXkgc2lnbmF0dXJlKVxuICAgKiBpbiBhIHBlciBjaHVuayBhcnJheSBhcyBhIGZhc3QgbWV0aG9kIHRvIGZ1cnRoZSBmaWxsIGRldGFpbHMgaW4gYmxvY2tzLlxuICAgKiBAcGFyYW0gc3RhZmZJbmZvIFRoZSBzdGFmZiBpbmZvcm1hdGlvbiBnZXQgcmVmZXJlbmNlcyBmcm9tLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHN0YWZmSW5mbzogU3RhZmZJbmZvLCBsYXN0UTogbnVtYmVyKSB7XG4gICAgdGhpcy5iYXJzSW5mbyA9IFtdO1xuICAgIGxldCB0ZW1wb0luZGV4ID0gMDtcbiAgICBsZXQga2V5SW5kZXggPSAwO1xuICAgIGxldCB0aW1lSW5kZXggPSAwO1xuICAgIGxldCBjdXJyZW50VGVtcG8gPSBzdGFmZkluZm8udGVtcG9zWzBdO1xuICAgIGxldCBjdXJyZW50S2V5U2lnbmF0dXJlID0gc3RhZmZJbmZvLmtleVNpZ25hdHVyZXNbMF07XG4gICAgbGV0IGN1cnJlbnRUaW1lU2lnbmF0dXJlID0gc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzWzBdO1xuICAgIGxldCBiYXJOdW1iZXJBdEN1cnJlbnRUaW1lU2lnbmF0dXJlID0gMDtcbiAgICBsZXQgY3VycmVudEJhckxlbmd0aCA9IGdldEJhckxlbmd0aChjdXJyZW50VGltZVNpZ25hdHVyZSk7XG4gICAgZm9yIChsZXQgcXVhcnRlcnMgPSAwOyBxdWFydGVycyA8IGxhc3RROyBxdWFydGVycyArPSAxLzE2KSB7IC8vIEFsbCBxdWFydGVyc1xuICAgICAgY29uc3QgYmFySW5mbzogQmFySW5mbyA9IHsgXG4gICAgICAgIHN0YXJ0OiBxdWFydGVycyxcbiAgICAgICAgYmFyTnVtYmVyOiBiYXJOdW1iZXJBdEN1cnJlbnRUaW1lU2lnbmF0dXJlICsgXG4gICAgICAgICAgKHF1YXJ0ZXJzIC0gY3VycmVudFRpbWVTaWduYXR1cmUuc3RhcnQpIC8gY3VycmVudEJhckxlbmd0aCwgXG4gICAgICAgIGJhckxlbmd0aDogY3VycmVudEJhckxlbmd0aCxcbiAgICAgICAgdGVtcG86IGN1cnJlbnRUZW1wbyxcbiAgICAgICAga2V5U2lnbmF0dXJlOiBjdXJyZW50S2V5U2lnbmF0dXJlLFxuICAgICAgICB0aW1lU2lnbmF0dXJlOiBjdXJyZW50VGltZVNpZ25hdHVyZVxuICAgICAgfTtcbiAgICAgIGlmIChcbiAgICAgICAgdGVtcG9JbmRleCA8IHN0YWZmSW5mby50ZW1wb3MubGVuZ3RoICYmIFxuICAgICAgICBzdGFmZkluZm8udGVtcG9zW3RlbXBvSW5kZXhdLnN0YXJ0ID09PSBxdWFydGVyc1xuICAgICAgKSB7IC8vIFJlZ2lzdGVyIGEgdGVtcG8gY2hhbmdlIGluIHRoaXMgcXVhcnRlclxuICAgICAgICBjdXJyZW50VGVtcG8gPSBzdGFmZkluZm8udGVtcG9zW3RlbXBvSW5kZXgrK107XG4gICAgICAgIGJhckluZm8udGVtcG8gPSBjdXJyZW50VGVtcG87XG4gICAgICAgIGJhckluZm8udGVtcG9DaGFuZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCAvLyBSZWdpc3RlciBhIGtleSBzaWduYXR1cmUgY2hhbmdlIGluIHRoaXMgcXVhcnRlclxuICAgICAgICBrZXlJbmRleCA8IHN0YWZmSW5mby5rZXlTaWduYXR1cmVzLmxlbmd0aCAmJiBcbiAgICAgICAgc3RhZmZJbmZvLmtleVNpZ25hdHVyZXNba2V5SW5kZXhdLnN0YXJ0ID09PSBxdWFydGVyc1xuICAgICAgKSB7XG4gICAgICAgIGN1cnJlbnRLZXlTaWduYXR1cmUgPSBzdGFmZkluZm8ua2V5U2lnbmF0dXJlc1trZXlJbmRleCsrXTtcbiAgICAgICAgYmFySW5mby5rZXlTaWduYXR1cmUgPSBjdXJyZW50S2V5U2lnbmF0dXJlO1xuICAgICAgICBiYXJJbmZvLmtleUNoYW5nZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRpbWVJbmRleCA8IHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcy5sZW5ndGggJiYgXG4gICAgICAgIHN0YWZmSW5mby50aW1lU2lnbmF0dXJlc1t0aW1lSW5kZXhdLnN0YXJ0ID09PSBxdWFydGVyc1xuICAgICAgKSB7IC8vIFJlZ2lzdGVyIGEgdGltZSBzaWduYXR1cmUgaW4gdGhpcyBxdWFydGVyXG4gICAgICAgIGJhck51bWJlckF0Q3VycmVudFRpbWVTaWduYXR1cmUgPSBiYXJJbmZvLmJhck51bWJlcjsgLy8gTmV3IHQucy4gc3RhcnRcbiAgICAgICAgY3VycmVudFRpbWVTaWduYXR1cmUgPSBzdGFmZkluZm8udGltZVNpZ25hdHVyZXNbdGltZUluZGV4KytdO1xuICAgICAgICBiYXJJbmZvLnRpbWVTaWduYXR1cmUgPSBjdXJyZW50VGltZVNpZ25hdHVyZTtcbiAgICAgICAgY3VycmVudEJhckxlbmd0aCA9IGdldEJhckxlbmd0aChjdXJyZW50VGltZVNpZ25hdHVyZSk7XG4gICAgICAgIGJhckluZm8uYmFyTGVuZ3RoID0gY3VycmVudEJhckxlbmd0aDtcbiAgICAgICAgYmFySW5mby50aW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmFyc0luZm8ucHVzaChiYXJJbmZvKTtcbiAgICB9ICAgICAgXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYmFyIG51bWJlciBvZiBhIG5vdGUgc3RhcnRpbmcgYXQgYSBnaXZlbiBwb3NpdGlvbi4gSXQgd2lsbCBiZSBhblxuICAgKiBpbnRlZ2VyIHZhbHVlIGlmIGl0IHJlbGllcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBiYXIsIGFuZCBpdCB3aWxsIFxuICAgKiByZWZsZWN0IHRoZSBwb3NpdGlvbiB3aXRoaW4gdGhlIGJhciBhbG9uZyB3aXRoIHRoZSBkZWNpbWFscyAoYSBub3RlIFxuICAgKiBzdGFydGluZyBpbiB0aGUgbWlkZGxlIG9mIHRoZSB0aGlyZCA0LzQgYmFyIHdpbGwgcmV0dXJuIDMuNSlcbiAgICogQHBhcmFtIHF1YXJ0ZXJzICBcbiAgICovXG4gIHB1YmxpYyBiYXJOdW1iZXJBdFEoc3RhcnQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5iYXJzSW5mb1tNYXRoLnRydW5jKHN0YXJ0ICogMTYpXTtcbiAgICBjb25zdCBxdWFydGVyc0FkdmFuY2UgPSBzdGFydCAtIHJlZmVyZW5jZS5zdGFydDtcbiAgICBjb25zdCBiYXJBZHZhbmNlU2luY2VSZWZlcmVuY2UgPSBxdWFydGVyc0FkdmFuY2UgLyByZWZlcmVuY2UuYmFyTGVuZ3RoO1xuICAgIHJldHVybiByZWZlcmVuY2UuYmFyTnVtYmVyICsgYmFyQWR2YW5jZVNpbmNlUmVmZXJlbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGJhciBsZW5ndGggYXQgYSBxdWFydGVyIG9uIHRoZSBzdGFmZlxuICAgKiBAcGFyYW0gcXVhcnRlciBRdWFydGVyIHRvIGxvb2sgdGhlIGJhciBsZW5naHQgYXRcbiAgICogQHJldHVybnMgVGhlIGxlbmd0aCBvZiB0aGUgYmFyIGF0IGdpdmVuIHF1YXJ0ZXIgXG4gICAqL1xuICBwdWJsaWMgYmFyTGVuZ2h0QXRRKHN0YXJ0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJhcnNJbmZvW01hdGgudHJ1bmMoc3RhcnQgKiAxNildLmJhckxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0ZW1wbyBpbiBxcG0gYXQgYSBxdWFydGVyIG9uIHRoZSBzdGFmZi4gKipOT1RFKio6IGl0IGRvZXNuJ3QgXG4gICAqIGNvdmVyIHRlbXBvIGNoYW5nZXMgeWV0LCBhbmQgYXNzdW1lcyBzY29yZSBrZWVwcyBpdCBzdGFibGUgdGlsbCB0aGUgZW5kLlxuICAgKiBAcGFyYW0gcXVhcnRlcnMgUXVhcnRlciB0byBsb29rIGtleSBzaWduYXR1cmUgYXRcbiAgICogQHBhcmFtIG9ubHlDaGFuZ2VzIElmIHRydWUgcmV0dXJucyAtMSBpbiBjYXNlIHRoZXJlJ3Mgbm8gY2hhbmdlIGF0IHF1YXJ0ZXJzXG4gICAqIEByZXR1cm5zIFRoZSBrZXkgd2hpY2ggaXMgb3BlcmF0aXZlIGF0IGdpdmVuIHF1YXJ0ZXIsIG9yIC0xIGlmIG5lZWRlZFxuICAgKi9cbiAgcHVibGljIHRlbXBvQXRRKFxuICAgIF9zdGFydDogbnVtYmVyLCBvbmx5Q2hhbmdlcyA9IGZhbHNlXG4gICk6IG51bWJlciB7XG4gICAgY29uc3QgYmFySW5mbyA9IHRoaXMuYmFyc0luZm9bMF07IC8vIFdpbGwgYmUgX3N0YXJ0IGluc3RlYWQgMFxuICAgIHJldHVybiAhb25seUNoYW5nZXMgfHwgYmFySW5mby50ZW1wb0NoYW5nZT8gYmFySW5mby50ZW1wby5xcG06IC0xO1xuICB9IFxuICBcbiAgLyoqXG4gICAqIEdldHMgdGhlIGtleSBzaWduYXR1cmUgYXQgYSBxdWFydGVyIG9uIHRoZSBzdGFmZlxuICAgKiBAcGFyYW0gcXVhcnRlcnMgUXVhcnRlciB0byBsb29rIGtleSBzaWduYXR1cmUgYXRcbiAgICogQHBhcmFtIG9ubHlDaGFuZ2VzIElmIHRydWUgcmV0dXJucyAtMSBpbiBjYXNlIHRoZXJlJ3Mgbm8gY2hhbmdlIGF0IHF1YXJ0ZXJzXG4gICAqIEByZXR1cm5zIFRoZSBrZXkgd2hpY2ggaXMgb3BlcmF0aXZlIGF0IGdpdmVuIHF1YXJ0ZXIsIG9yIC0xIGlmIG5lZWRlZFxuICAgKi9cbiAgcHVibGljIGtleVNpZ25hdHVyZUF0UShcbiAgICBzdGFydDogbnVtYmVyLCBvbmx5Q2hhbmdlcyA9IGZhbHNlXG4gICk6IG51bWJlciB7XG4gICAgY29uc3QgYmFySW5mbyA9IHRoaXMuYmFyc0luZm9bTWF0aC50cnVuYyhzdGFydCAqIDE2KV07XG4gICAgcmV0dXJuICFvbmx5Q2hhbmdlcyB8fCBiYXJJbmZvLmtleUNoYW5nZT8gYmFySW5mby5rZXlTaWduYXR1cmUua2V5OiAtMTtcbiAgfSBcbiAgXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0aW1lIHNpZ25hdHVyZSBhdCBhIHF1YXJ0ZXIgb24gdGhlIHN0YWZmXG4gICAqIEBwYXJhbSBxdWFydGVyIFF1YXJ0ZXIgdG8gbG9vayB0aW1lIHNpZ25hdHVyZSBhdFxuICAgKiBAcGFyYW0gb25seUNoYW5nZXMgSWYgdHJ1ZSByZXR1cm5zIG51bGwgaW4gY2FzZSB0aGVyZSdzIG5vIGNoYW5nZSBhdCBxLlxuICAgKiBAcmV0dXJucyBUaGUgdGltZSBzaWduYXR1cmUgd2hpY2ggaXMgb3BlcmF0aXZlIGF0IGdpdmVuIHF1YXJ0ZXIsIG9yIG51bGxcbiAgICovXG4gIHB1YmxpYyB0aW1lU2lnbmF0dXJlQXRRKFxuICAgIHN0YXJ0OiBudW1iZXIsIG9ubHlDaGFuZ2VzID0gZmFsc2VcbiAgKTogVGltZVNpZ25hdHVyZUluZm8ge1xuICAgIGNvbnN0IGJhckluZm8gPSB0aGlzLmJhcnNJbmZvW01hdGgudHJ1bmMoc3RhcnQgKiAxNildO1xuICAgIHJldHVybiAhb25seUNoYW5nZXMgfHwgYmFySW5mby50aW1lQ2hhbmdlPyBiYXJJbmZvLnRpbWVTaWduYXR1cmU6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGdpdmVuIGFtb3VudCBvZiBxdWFydGVycyB0byBzZWNvbmRzLiAqKk5PVEUqKjogaXQgZG9lc24ndCBcbiAgICogY292ZXIgdGVtcG8gY2hhbmdlcyB5ZXQsIGFuZCBhc3N1bWVzIHNjb3JlIGtlZXBzIGl0IHN0YWJsZSB0aWxsIHRoZSBlbmQuXG4gICAqIEBwYXJhbSBxdWFydGVycyBUaGUgZ2l2ZW4gYW1vdW50IG9mIHF1YXJ0ZXJzXG4gICAqIEByZXR1cm5zIFRoZSBlcXVpdmFsZW50IGFtb3VudCBvZiBzZWNvbmRzXG4gICAqL1xuICBwdWJsaWMgcXVhcnRlcnNUb1RpbWUocXVhcnRlcnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHF1YXJ0ZXJzIC8gdGhpcy5iYXJzSW5mb1swXS50ZW1wby5xcG0gKiA2MDtcbiAgfVxuICBcbiAgLyoqXG4gICAqIENvbnZlcnQgYSBnaXZlbiBhbW91bnQgb2Ygc2Vjb25kcyB0byBxdWFydGVycy4gKipOT1RFKio6IGl0IGRvZXNuJ3QgXG4gICAqIGNvdmVyIHRlbXBvIGNoYW5nZXMgeWV0LCBhbmQgYXNzdW1lcyBzY29yZSBrZWVwcyBpdCBzdGFibGUgdGlsbCB0aGUgZW5kLlxuICAgKiBJdCB3aWxsIGJlIHJvdW5kZWQgdG8gbWluaW11bSBub3RlIGRpdmlzaW9uIHRvIGF2b2lkIEphdmFTY3JpcHQgbnVtYmVyXG4gICAqIHJvdW5kaW5nIGlzc3Vlcy5cbiAgICogQHBhcmFtIHF1YXJ0ZXJzIFRoZSBnaXZlbiBhbW91bnQgb2Ygc2Vjb25kc1xuICAgKiBAcmV0dXJucyBUaGUgZXF1aXZhbGVudCBhbW91bnQgb2YgcXVhcnRlcnNcbiAgICovXG4gIHB1YmxpYyB0aW1lVG9RdWFydGVycyh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHEgPSB0aW1lICogdGhpcy5iYXJzSW5mb1swXS50ZW1wby5xcG0gLyA2MDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChxICogTUFYX1FVQVJURVJfRElWSVNJT04pIC8gTUFYX1FVQVJURVJfRElWSVNJT047XG4gIH1cblxufSAgIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKiAxLzE2IG9mIGEgcXVhcnRlciBub3RlICgxLzY0dGggbm90ZSkgKi9cbmV4cG9ydCBjb25zdCBNSU5fUkVTT0xVVElPTiA9IDAuMDYyNTsgLy8gVE9ETzogVW5pZnlcblxuLyoqIFxuICogTWluaW1hbCBkdXJhdGlvbiByZWNvZ25pemVkIG5vdGUsIHdoaWNoIGN1cnJlbnRseSBpcyB2YWxpZCBmb3Igc2l4dHlmb3VydGggXG4gKiBub3RlICgxLzE2IG9mIGEgcXVhcnRlciBub3RlKSB0cmlwbGV0cyBhbmQgcXVpbnR1cGxldHMuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVhfUVVBUlRFUl9ESVZJU0lPTiA9IDE2KjMqNTsgLy8gVE9ETzogbWVyZ2Ugd2l0aCBlcXVpdmFsZW50IGNvbnN0YW50c1xuXG4vKiogQ2hyb21hdGljIHNjYWxlcyBwZXIga2V5LCBlbmNvZGVkIGZvciBzdGFmZiBub3RlIHBsYWNlbWVudCAqL1xuZXhwb3J0IGNvbnN0IFNDQUxFUyA9IFsgLy8gQWNjaWRlbnRhbHM6IDA9bm9uZSwgMT1zaGFycCwgMj1mbGF0LCAzPW5vcm1hbFxuICB7IC8vIENocm9tYXRpYyAgQyBDIy9EYiBEIEQjL0ViIEUgICBGIEYjL0diIEcgRyMvQWIgQSBBIy9CYiBCICAgLyBLRVlcbiAgICBzdGVwczogICAgICBbIDAsICAwLCAtMSwgLTEsIC0yLCAtMywgLTMsIC00LCAtNCwgLTUsIC01LCAtNl0sIC8vIENcbiAgICBhY2NpZGVudGFsOiBbIDAsICAxLCAgMCwgIDEsICAwLCAgMCwgIDEsICAwLCAgMSwgIDAsICAxLCAgMF0gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgLTEsIC0xLCAtMiwgLTIsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTYsIC02XSwgLy8gRGJcbiAgICBhY2NpZGVudGFsOiBbIDAsICAwLCAgMywgIDAsICAzLCAgMCwgIDAsICAzLCAgMCwgIDMsICAwLCAgM10gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgIDAsIC0xLCAtMSwgLTIsIC0zLCAtMywgLTQsIC00LCAtNSwgLTUsIC02XSwgLy8gRFxuICAgIGFjY2lkZW50YWw6IFsgMywgIDAsICAwLCAgMSwgIDAsICAzLCAgMCwgIDAsICAxLCAgMCwgIDEsICAwXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAtMSwgLTEsIC0yLCAtMiwgLTMsIC00LCAtNCwgLTUsIC01LCAtNiwgLTZdLCAvLyBFYlxuICAgIGFjY2lkZW50YWw6IFsgMCwgIDIsICAwLCAgMCwgIDMsICAwLCAgMiwgIDAsICAwLCAgMywgIDAsICAzXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAgMCwgLTEsIC0xLCAtMiwgLTMsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTZdLCAvLyBFXG4gICAgYWNjaWRlbnRhbDogWyAzLCAgMCwgIDMsICAwLCAgMCwgIDMsICAwLCAgMywgIDAsICAwLCAgMSwgIDBdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsIC0xLCAtMSwgLTIsIC0yLCAtMywgLTQsIC00LCAtNSwgLTUsIC02LCAtNl0sIC8vIEZcbiAgICBhY2NpZGVudGFsOiBbIDAsICAyLCAgMCwgIDIsICAwLCAgMCwgIDIsICAwLCAgMiwgIDAsICAwLCAgM10gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgLTEsIC0xLCAtMiwgLTIsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTYsIC03XSwgLy8gR2JcbiAgICBhY2NpZGVudGFsOiBbIDMsICAwLCAgMywgIDAsICAzLCAgMCwgIDAsICAzLCAgMCwgIDMsICAwLCAgMF0gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgIDAsIC0xLCAtMSwgLTIsIC0zLCAtMywgLTQsIC00LCAtNSwgLTUsIC02XSwgLy8gR1xuICAgIGFjY2lkZW50YWw6IFsgMCwgIDEsICAwLCAgMSwgIDAsICAzLCAgMCwgIDAsICAxLCAgMCwgIDEsICAwXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAtMSwgLTEsIC0yLCAtMiwgLTMsIC00LCAtNCwgLTUsIC01LCAtNiwgLTZdLCAvLyBBYlxuICAgIGFjY2lkZW50YWw6IFsgMCwgIDAsICAzLCAgMCwgIDMsICAwLCAgMiwgIDAsICAwLCAgMywgIDAsICAzXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAgMCwgLTEsIC0xLCAtMiwgLTMsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTZdLCAvLyBBXG4gICAgYWNjaWRlbnRhbDogWyAzLCAgMCwgIDAsICAxLCAgMCwgIDMsICAwLCAgMywgIDAsICAwLCAgMSwgIDBdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsIC0xLCAtMSwgLTIsIC0yLCAtMywgLTQsIC00LCAtNSwgLTUsIC02LCAtNl0sIC8vIEJiXG4gICAgYWNjaWRlbnRhbDogWyAwLCAgMiwgIDAsICAwLCAgMywgIDAsICAyLCAgMCwgIDIsICAwLCAgMCwgIDNdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsICAwLCAtMSwgLTEsIC0yLCAtMywgLTMsIC00LCAtNCwgLTUsIC01LCAtNl0sIC8vIEJcbiAgICBhY2NpZGVudGFsOiBbIDMsICAwLCAgMywgIDAsICAwLCAgMywgIDAsICAzLCAgMCwgIDMsICAwLCAgMF0gfVxuXTtcblxuLyoqIFxuICogQSBsaXN0IG9mIGFsbCBrZXkgYWNjaWRlbnRhbHMgaW5kaWNhdGluZyB0aGUgYWNjaWRlbnRhbCBraW5kICgxID0gc2hhcnBcbiAqIGFuZCAyID0gZmxhdCkgYW5kIHRoZSBNSURJIG5vdGUgaXQgaXMgYXNzb2NpYXRlZCB0b1xuICovXG5leHBvcnQgY29uc3QgS0VZX0FDQ0lERU5UQUxTID0gW1xuICB7YWNjaWRlbnRhbDogMSwgcGl0Y2hlczogW119LCAgICAgICAgICAgICAgICAgICAgICAgLy8gQ1xuICB7YWNjaWRlbnRhbDogMiwgcGl0Y2hlczogWzcwLCA3NSwgNjgsIDczLCA2Nl19LCAgICAgLy8gRGJcbiAge2FjY2lkZW50YWw6IDEsIHBpdGNoZXM6IFs3OCwgNzNdfSwgICAgICAgICAgICAgICAgIC8vIERcbiAge2FjY2lkZW50YWw6IDIsIHBpdGNoZXM6IFs3MCwgNzUsIDY4XX0sICAgICAgICAgICAgIC8vIEViXG4gIHthY2NpZGVudGFsOiAxLCBwaXRjaGVzOiBbNzgsIDczLCA4MCwgNzVdfSwgICAgICAgICAvLyBFXG4gIHthY2NpZGVudGFsOiAyLCBwaXRjaGVzOiBbNzBdfSwgICAgICAgICAgICAgICAgICAgICAvLyBGXG4gIHthY2NpZGVudGFsOiAyLCBwaXRjaGVzOiBbNzAsIDc1LCA2OCwgNzMsIDY2LCA3MV19LCAvLyBHYlxuICB7YWNjaWRlbnRhbDogMSwgcGl0Y2hlczogWzc4XX0sICAgICAgICAgICAgICAgICAgICAgLy8gR1xuICB7YWNjaWRlbnRhbDogMiwgcGl0Y2hlczogWzcwLCA3NSwgNjgsIDczXX0sICAgICAgICAgLy8gQWJcbiAge2FjY2lkZW50YWw6IDEsIHBpdGNoZXM6IFs3OCwgNzMsIDgwXX0sICAgICAgICAgICAgIC8vIEFcbiAge2FjY2lkZW50YWw6IDIsIHBpdGNoZXM6IFs3MCwgNzVdfSwgICAgICAgICAgICAgICAgIC8vIEJiXG4gIHthY2NpZGVudGFsOiAxLCBwaXRjaGVzOiBbNzgsIDczLCA4MCwgNzUsIDcwXX0gICAgICAvLyBCXG5dO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKiAxNSUgb2YgYWNjaWRlbnRhbHMgd2lkdGggKi9cbmV4cG9ydCBjb25zdCBTVEVNX1dJRFRIID0gMTU7XG4vKiogMSBwaXhlbCAqL1xuZXhwb3J0IGNvbnN0IExJTkVfU1RST0tFID0gMTtcbi8qKiAxNTAlIG9mIGFjY2lkZW50YWxzIHdpZHRoICovXG5leHBvcnQgY29uc3QgQ09NUEFDVF9TUEFDSU5HID0gMTUwOyIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1xuICBNSU5fUkVTT0xVVElPTlxufSBmcm9tICcuL21vZGVsX2NvbnN0YW50cyc7XG5cbmltcG9ydCB7XG4gIE5vdGVJbmZvXG59IGZyb20gJy4vc3RhZmZfaW5mbyc7XG5cbmltcG9ydCB7XG4gIEJhcnNJbmZvXG59IGZyb20gJy4vYmFyc19pbmZvJztcblxuLyoqIFN0b3JlcyBwcm9jZXNzZWQgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBhIG11c2ljYWwgbm90ZSBpbiBhIHN0YWZmICovXG5leHBvcnQgaW50ZXJmYWNlIFN0YWZmTm90ZSBleHRlbmRzIE5vdGVJbmZvIHtcbiAgLyoqIFxuICAgKiBWZXJ0aWNhbCBzdGVwcyB0byBwb3NpdGlvbiBhIG5vdGUgb24gc2NvcmUuIEl0IGlzIG1lYXN1cmVkIGluIGludGVnZXIgXG4gICAqIHZhbHVlLCBjb25zaWRlcmluZyAyIHBvc2l0aW9ucyBwZXIgc3RhZmYgbGluZSwgdmVydGljYWxseSBpbnZlcnRlZCwgYmVpbmdcbiAgICogaW4gRyBjbGVmIHZhbHVlIDAgdXNlZCBmb3IgbWlkZGxlIEMgbm90ZSBhbmQgLTEgdXNlZCBmb3IgZm9sbG93aW5nIEQgbm90ZS5cbiAgICovXG4gIHZTdGVwczogbnVtYmVyO1xuICAvKiogXG4gICAqIElkZW50aWZpY2F0b3Igb2YgdGhlIGFjY2lkZW50YWwga2luZCBhcyBmb2xsb3dpbmcgZW5jb2Rpbmc6IFxuICAgKiAwID0gbm9uZSwgMSA9IHNoYXJwLCAyID0gZmxhdCwgMyA9IG5vcm1hbFxuICAgKi9cbiAgYWNjaWRlbnRhbDogbnVtYmVyO1xuICAvKiogUmVmZXJlbmNlIHRvIHByZXZpb3VzIHRpZWQgbm90ZSAqL1xuICB0aWVkRnJvbT86IFN0YWZmTm90ZTtcbiAgLyoqIFJlZmVyZW5jZSB0byBmb2xsb3dpbmcgdGllZCBub3RlICovXG4gIHRpZWRUbz86IFN0YWZmTm90ZTtcbn1cblxuLyoqXG4gKiBTcGxpdHMgYSBub3RlIGluIHR3byBieSBhIHRpbWUgcG9pbnQgbWVhc3VyZWQgaW4gbm90ZSBxdWFydGVyc1xuICogQHBhcmFtIHN0YWZmTm90ZSBub3RlIHRvIGJlIHNwbGl0dGVkXG4gKiBAcGFyYW0gcXVhcnRlcnMgc3BsaXQgcG9pbnRcbiAqIEByZXR1cm5zIFRoZSBzZWNvbmQgaGFsZiBvZiBzcHJpdHRlZCBub3RlLiBGaXJzdCBvbmUgaXMgdGhlIHJlY2VpdmVkIG9uZSxcbiAqIHdoaWNoIGdldHMgbW9kaWZpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdFN0YWZmTm90ZShzdGFmZk5vdGU6IFN0YWZmTm90ZSwgcXVhcnRlcnM6IG51bWJlcik6IFN0YWZmTm90ZSB7XG4gIGNvbnN0IHJlbWFpbkxlbmd0aCA9IChzdGFmZk5vdGUuc3RhcnQgKyBzdGFmZk5vdGUubGVuZ3RoKSAtIHF1YXJ0ZXJzO1xuICBsZXQgc3BsaXR0ZWQ6IFN0YWZmTm90ZSA9IG51bGw7XG4gIGlmIChxdWFydGVycyA+IHN0YWZmTm90ZS5zdGFydCAmJiByZW1haW5MZW5ndGggPiAwKSB7XG4gICAgc3RhZmZOb3RlLmxlbmd0aCAtPSByZW1haW5MZW5ndGg7XG4gICAgc3BsaXR0ZWQgPSB7XG4gICAgICBzdGFydDogcXVhcnRlcnMsXG4gICAgICBsZW5ndGg6IHJlbWFpbkxlbmd0aCxcbiAgICAgIHBpdGNoOiBzdGFmZk5vdGUucGl0Y2gsXG4gICAgICBpbnRlbnNpdHk6IHN0YWZmTm90ZS5pbnRlbnNpdHksXG4gICAgICB2U3RlcHM6IHN0YWZmTm90ZS52U3RlcHMsXG4gICAgICBhY2NpZGVudGFsOiBzdGFmZk5vdGUuYWNjaWRlbnRhbCxcbiAgICAgIHRpZWRGcm9tOiBzdGFmZk5vdGVcbiAgICB9O1xuICAgIGlmIChzdGFmZk5vdGUudGllZFRvKSB7IC8vIFJlbGlua2luZyB0aWVzIGlmIGFueSBpbiBwcmUtc3BsaXR0ZWQgbm90ZVxuICAgICAgc3BsaXR0ZWQudGllZFRvID0gc3RhZmZOb3RlLnRpZWRUbztcbiAgICAgIHN0YWZmTm90ZS50aWVkVG8udGllZEZyb20gPSBzcGxpdHRlZDtcbiAgICB9XG4gICAgc3RhZmZOb3RlLnRpZWRUbyA9IHNwbGl0dGVkO1xuICB9XG4gIHJldHVybiBzcGxpdHRlZDtcbn0gLy8gVE9ETzogcmV2aWV3IHRvIG1vdmUgaW50ZXJmYWNlIHRvIGNsYXNzXG5cbi8qKiBcbiAqIFN0b3JlcyBhIGJsb2NrIG9mIG5vdGVzIGluIGEgc3RhZmYsIGFsbCBvZiB0aGVtIHN0YXJ0aW5nIGFuZCBlbmRpbmcgYXQgb25jZSwgXG4gKiBldmVuIHRob3VnaCBzb21lIG5vdGVzIGNhbiBiZSB0aWVkIHRvIG5vdGVzIGluIG90aGVyIGJsb2Nrcy4gQSBibG9jayB3aXRoIG5vIFxuICogbm90ZXMgaXMgYSByZXN0LiBJdCB3aWxsIHByZS1wcm9jZXNzIGFsbCBhdmFpbGFibGUgY29udGV4dCAoa2V5IHNpZ25hdHVyZXMsXG4gKiByaXRobSBzcGxpdHRpbmdzLCBjbGVmLi4uKSB0byBzdG9yZSBhbGwgc2NvcmUgZGV0YWlscyBpbiBvcmRlciB0byByZXByZXNlbnQgXG4gKiBpdCBpbiBhIHN0YWZmLlxuICovXG5leHBvcnQgY2xhc3MgU3RhZmZCbG9jayB7XG4gIC8qKiBTdGFydGluZyB0aW1lLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpICovXG4gIHB1YmxpYyBzdGFydDogbnVtYmVyO1xuICAvKiogTm90ZSBsZW5ndGgsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgcHVibGljIGxlbmd0aDogbnVtYmVyO1xuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBzeW1ib2wgdG8gYmUgZHJhd24gKG5vdGVzIGFuZCByZXN0cykgYWNjb3JkaW5nIHRvIGl0c1xuICAgKiBsZW5ndGggbWVhc3VyZWQgaW4gcXVhcnRlcnMuXG4gICAqL1xuICBoZWFkSW5kZXg6IG51bWJlcjtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBub3RlIG9yIHJlc3QgbGVuZ3RoIGFsdGVyYXRpb24sIGlmIGFueSwgYXMgZm9sbG93aW5nIGVuY29kaW5nOlxuICAgKiAxID0gZG90LCAzID0gdHJpcGxldCwgNSBxdWludHVwbGV0IChhbnkgb3RoZXIgd2lsbCBiZSBpZ25vcmVkKVxuICAgKi9cbiAgaGVhZEFsdGVyYXRpb24/OiBudW1iZXI7XG4gIC8qKiBCbG9jayBiYXIgbnVtYmVyIChmbG9hdCkgYmVpbmcgLjAgYXQgYmFyIGJlZ2lubmluZyBhbmQgLjUgYXQgYmFyIGhhbGYuICovXG4gIHB1YmxpYyBub3RlczogU3RhZmZOb3RlW107XG4gIC8qKiBVcHBlciBsaW1pdCBvZiB2ZXJ0aWNhbCBzdGVwcyBpbiBibG9jayBub3RlcyAqL1xuICBwdWJsaWMgYmFyTnVtYmVyOiBudW1iZXI7XG4gIC8qKiBUaGUgbGlzdCBvZiBub3RlcyByZWxhdGVkIHRvIHRoZSBibG9jayAqL1xuICBwdWJsaWMgbWF4VlN0ZXA6IG51bWJlcjtcbiAgLyoqIExvd2VyIGxpbWl0IG9mIHZlcnRpY2FsIHN0ZXBzIGluIGJsb2NrIG5vdGVzICovXG4gIHB1YmxpYyBtaW5WU3RlcDogbnVtYmVyO1xuICAvKiogTWVtYmVyIG9mIGEgQmVhbSBzdGFydGluZyBmcm9tIHJlZmVyZW5jZWQgYmxvY2sgKi9cbiAgcHVibGljIGJlYW1lZEZyb20/OiBTdGFmZkJsb2NrO1xuICAvKiogQmVhbWVkIHRvIHByZXZpb3VzIGJsb2NrICovXG4gIHB1YmxpYyBiZWFtaW5nQmFja3dhcmRzPzogYm9vbGVhbjtcbiAgLyoqIEJlYW1lZCB0byBuZXh0IGJsb2NrICovXG4gIHB1YmxpYyBiZWFtaW5nRm9yd2FyZHM/OiBib29sZWFuO1xuICAvKiogV2V0aGVyIHRoZSBibG9jayBiZWdpbnMgYSBuZXcgcHVsc2UgKi9cbiAgcHVibGljIHB1bHNlQmVnaW4/OiBib29sZWFuO1xuICAvKiogV2V0aGVyIHRoZSBibG9jayBlbmRzIGEgbmV3IHB1bHNlICovXG4gIHB1YmxpYyBwdWxzZUVuZD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBgU3RhZmZCbG9ja2Agc3RvcmluZyBtaW5pbWFsIHNjb3JlIGRldGFpbHMsIHdhaXRpbmcgdG8gYmUgXG4gICAqIG1vZGlmaWVkIGZ1cnRoZXIgaW52b2tpbmcgb3RoZXIgbWV0aG9kcy5cbiAgICogQHBhcmFtIHN0YXJ0IFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdClcbiAgICogQHBhcmFtIGxlbmd0aCBOb3RlIGxlbmd0aCwgaW4gcXVhcnRlciBub3RlIHF1YW50aXRpZXMgKGZsb2F0KVxuICAgKiBAcGFyYW0gbm90ZXMgVGhlIGxpc3Qgb2Ygbm90ZXMgcmVsYXRlZCB0byB0aGUgYmxvY2tcbiAgICogQHBhcmFtIG1heFZTdGVwIFVwcGVyIGxpbWl0IG9mIHZlcnRpY2FsIHN0ZXBzIGluIGJsb2NrIG5vdGVzXG4gICAqIEBwYXJhbSBtaW5WU3RlcCBMb3dlciBsaW1pdCBvZiB2ZXJ0aWNhbCBzdGVwcyBpbiBibG9jayBub3Rlc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKFxuICAgIHN0YXJ0PTAsIFxuICAgIGxlbmd0aD0wLCBcbiAgICBub3RlczogU3RhZmZOb3RlW109W10sXG4gICAgYmFyTnVtYmVyPTAsXG4gICAgbWF4VlN0ZXA9TnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gICAgbWluVlN0ZXA9TnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIsXG4gICkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhlYWRJbmRleCA9IDA7XG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgIHRoaXMuYmFyTnVtYmVyID0gYmFyTnVtYmVyO1xuICAgIHRoaXMubWF4VlN0ZXAgPSBtYXhWU3RlcDtcbiAgICB0aGlzLm1pblZTdGVwID0gbWluVlN0ZXA7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5vdGUgdG8gdGhlIGJsb2NrJ3Mgbm90ZSBsaXN0LCBtZXJnaW5nIHJlcGV0aXRpb25zJyBsZW5ndGgsIFxuICAgKiBhZGFwdGluZyBWU3RlcHMgYW5kIGJsb2NrIGxlbmd0aFxuICAgKiBAcGFyYW0gc3RhZmZOb3RlIFRoZSBub3RlIHRvIGJlIGFkZGVkXG4gICAqL1xuICBwdWJsaWMgYWRkTm90ZShzdGFmZk5vdGU6IFN0YWZmTm90ZSkge1xuICAgIGxldCBuZXdOb3RlID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgbmV3Tm90ZSAmJiBpIDwgdGhpcy5ub3Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHN0YWZmTm90ZS5waXRjaCA9PT0gdGhpcy5ub3Rlc1tpXS5waXRjaCkgeyAvLyBSZXBlYXRlZFxuICAgICAgICBuZXdOb3RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm90ZXNbaV0ubGVuZ3RoID0gTWF0aC5tYXgodGhpcy5ub3Rlc1tpXS5sZW5ndGgsIHN0YWZmTm90ZS5sZW5ndGgpO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IE1hdGgubWF4KHRoaXMubGVuZ3RoLCBzdGFmZk5vdGUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5ld05vdGUpIHtcbiAgICAgIHRoaXMubm90ZXMucHVzaChzdGFmZk5vdGUpOyAgXG4gICAgICB0aGlzLm1pblZTdGVwID0gTWF0aC5tYXgoc3RhZmZOb3RlLnZTdGVwcywgdGhpcy5taW5WU3RlcCk7XG4gICAgICB0aGlzLm1heFZTdGVwID0gTWF0aC5taW4oc3RhZmZOb3RlLnZTdGVwcywgdGhpcy5tYXhWU3RlcCk7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdHMgYSBibG9jayBpbiB0d28gYnkgYSB0aW1lIHBvaW50IG1lYXN1cmVkIGluIG5vdGUgcXVhcnRlcnNcbiAgICogQHBhcmFtIHF1YXJ0ZXJzIHNwbGl0IHBvaW50XG4gICAqIEBwYXJhbSBiYXJzSW5mbyBBbiBBcnJheSB3aXRoIGJhciBhbmQgc2lnbmF0dXJlcyBpbmZvIHBlciBxdWFydGVyXG4gICAqIEByZXR1cm5zIFRoZSBzZWNvbmQgaGFsZiBvZiBzcGxpdHRlZCBibG9jay4gRmlyc3Qgb25lIGlzIHRoZSByZWNlaXZlZCBvbmUsXG4gICAqIHdoaWNoIGdldHMgbW9kaWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3BsaXQocXVhcnRlcnM6IG51bWJlciwgYmFyc0luZm86IEJhcnNJbmZvKTogU3RhZmZCbG9jayB7XG4gICAgY29uc3QgcmVtYWluTGVuZ3RoID0gKHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aCkgLSBxdWFydGVycztcbiAgICBsZXQgc3BsaXR0ZWRCbG9jazogU3RhZmZCbG9jayA9IG51bGw7XG4gICAgaWYgKHF1YXJ0ZXJzID4gdGhpcy5zdGFydCAmJiByZW1haW5MZW5ndGggPiAwKSB7XG4gICAgICBzcGxpdHRlZEJsb2NrID0gbmV3IFN0YWZmQmxvY2soXG4gICAgICAgIHF1YXJ0ZXJzLCBcbiAgICAgICAgcmVtYWluTGVuZ3RoLFxuICAgICAgICBbXSwgXG4gICAgICAgIGJhcnNJbmZvLmJhck51bWJlckF0UShxdWFydGVycylcbiAgICAgICk7XG4gICAgICB0aGlzLmxlbmd0aCAtPSByZW1haW5MZW5ndGg7XG4gICAgICB0aGlzLm5vdGVzLmZvckVhY2goXG4gICAgICAgIHN0YWZmTm90ZSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVtYWluU3RhZmZOb3RlID0gc3BsaXRTdGFmZk5vdGUoc3RhZmZOb3RlLCBxdWFydGVycyk7XG4gICAgICAgICAgaWYgKHJlbWFpblN0YWZmTm90ZSkge1xuICAgICAgICAgICAgc3BsaXR0ZWRCbG9jay5hZGROb3RlKHJlbWFpblN0YWZmTm90ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoc3BsaXR0ZWRCbG9jayAmJiB0aGlzLnB1bHNlRW5kKSB7XG4gICAgICBzcGxpdHRlZEJsb2NrLnB1bHNlRW5kID0gdHJ1ZTtcbiAgICAgIHRoaXMucHVsc2VFbmQgPSBmYWxzZTsgLy8gQXBwbGljYWJsZSB0byBzeW1ib2wgc3BsaXR0aW5nIChwb3N0LXB1bHNlKVxuICAgIH1cbiAgICByZXR1cm4gc3BsaXR0ZWRCbG9jaztcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdHMgYSBibG9jayBpbiB0d28gYnkgbmV4dCBwdWxzZSB0byByaXRtaWNhbGx5IGNvbXBsZXRlIHByZXZpb3VzIG9uZS5cbiAgICogSXQgbWFya3MgYXMgd2VsbCBpZiB0aGUgYWZmZWN0ZWQgYmxvY2sgaXMgYmVnaW5uaW5nIG9yIGVuZGluZyBhIHB1bHNlLlxuICAgKiBAcGFyYW0gYmFyc0luZm8gQW4gQXJyYXkgd2l0aCBiYXIgYW5kIHNpZ25hdHVyZXMgaW5mbyBwZXIgcXVhcnRlclxuICAgKiBAcmV0dXJucyBUaGUgc2Vjb25kIGhhbGYgb2Ygc3BsaXR0ZWQgYmxvY2suIEZpcnN0IGhhbGYgcmVtYWlucyBpbiBjdXJyZW50XG4gICAqIG9iamVjdCwgd2hpY2ggZ2V0cyBtb2RpZmllZC5cbiAgICovXG4gIHB1YmxpYyBzcGxpdFRvUHVsc2UoYmFyc0luZm86IEJhcnNJbmZvKTogU3RhZmZCbG9jayB7XG4gICAgY29uc3QgdGltZVNpZ25hdHVyZSA9IGJhcnNJbmZvLnRpbWVTaWduYXR1cmVBdFEodGhpcy5zdGFydCk7XG4gICAgY29uc3QgYmFyTGVuZ3RoID0gYmFyc0luZm8uYmFyTGVuZ2h0QXRRKHRoaXMuc3RhcnQpO1xuICAgIGNvbnN0IGJhckZyYWN0aW9uRnJvbUJhciA9IHRoaXMuYmFyTnVtYmVyIC0gTWF0aC5mbG9vcih0aGlzLmJhck51bWJlcik7XG4gICAgY29uc3QgcXVhcnRlcnNGcm9tQmFyQmVnaW5uaW5nID0gLy8gSmF2YXNjcmlwdCBtYXRoIHNhZmVcbiAgICAgIE1hdGgucm91bmQoYmFyTGVuZ3RoICogYmFyRnJhY3Rpb25Gcm9tQmFyICogMTAwMDAwMCkgLyAxMDAwMDAwO1xuICAgIGNvbnN0IHF1YXJ0ZXJzQXRCYXJCZWdpbm5pbmcgPSB0aGlzLnN0YXJ0IC0gcXVhcnRlcnNGcm9tQmFyQmVnaW5uaW5nO1xuICAgIGNvbnN0IG1ldHJpY0JlYXQgPSA0IC8gdGltZVNpZ25hdHVyZS5kZW5vbWluYXRvcjtcbiAgICBjb25zdCBibG9ja0JlYXQgPSBxdWFydGVyc0Zyb21CYXJCZWdpbm5pbmcgLyBtZXRyaWNCZWF0O1xuICAgIGNvbnN0IHNwbGl0dGluZ0JlYXQgPSBNYXRoLmNlaWwoYmxvY2tCZWF0KTtcbiAgICBsZXQgc3BsaXR0ZWRCbG9jazogU3RhZmZCbG9jayA9IG51bGw7XG4gICAgaWYgKCFpc1NhZmVaZXJvKHNwbGl0dGluZ0JlYXQgLSBibG9ja0JlYXQpKSB7IC8vIFNwbGl0dGluZyBvbiBuZXh0IGJlYXRcbiAgICAgIGNvbnN0IHF1YXJ0ZXJzQXRCZWF0ID0gTWF0aC5yb3VuZCggLy8gSmF2YXNjcmlwdCBtYXRoIHNhZmVcbiAgICAgICAgKHF1YXJ0ZXJzQXRCYXJCZWdpbm5pbmcgKyBzcGxpdHRpbmdCZWF0ICogbWV0cmljQmVhdCkgKiAxMDAwMDAwXG4gICAgICApIC8gMTAwMDAwMDtcbiAgICAgIHNwbGl0dGVkQmxvY2sgPSB0aGlzLnNwbGl0KHF1YXJ0ZXJzQXRCZWF0LCBiYXJzSW5mbyk7XG4gICAgICBpZiAoaXNTYWZlWmVybyh0aGlzLnN0YXJ0ICsgdGhpcy5sZW5ndGggLSBxdWFydGVyc0F0QmVhdCkpIHtcbiAgICAgICAgdGhpcy5wdWxzZUVuZCA9IHRydWU7IC8vIEJsb2NrIGVuZHMgYXQgcHVsc2UgZW5kXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgeyAvLyBCZWdpbm5pbmcgYSBwdWxzZSwgc3BsaXR0aW5nIG9ubHkgYXQgYmFyIGVuZCBpZiBhcHBsaWNhYmxlXG4gICAgICB0aGlzLnB1bHNlQmVnaW4gPSB0cnVlO1xuICAgICAgY29uc3QgcXVhcnRlcnNBdEJhckVuZCA9IE1hdGgucm91bmQoIC8vIEphdmFzY3JpcHQgbWF0aCBzYWZlXG4gICAgICAgIChxdWFydGVyc0F0QmFyQmVnaW5uaW5nICsgdGltZVNpZ25hdHVyZS5udW1lcmF0b3IgKiBtZXRyaWNCZWF0KSAqIFxuICAgICAgICAxMDAwMDAwXG4gICAgICApIC8gMTAwMDAwMDtcbiAgICAgIHNwbGl0dGVkQmxvY2sgPSB0aGlzLnNwbGl0KHF1YXJ0ZXJzQXRCYXJFbmQsIGJhcnNJbmZvKTtcbiAgICAgIGlmIChpc1NhZmVaZXJvKHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aCAtIHF1YXJ0ZXJzQXRCYXJFbmQpKSB7XG4gICAgICAgIHRoaXMucHVsc2VFbmQgPSB0cnVlOyAvLyBCbG9jayBlbmRzIGF0IHB1bHNlIGVuZFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3BsaXR0ZWRCbG9jaykgeyAvLyBJdCB3YXMgc3BsaXR0ZWQgYmVmb3JlIHB1bHNlIGVuZFxuICAgICAgdGhpcy5wdWxzZUVuZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzcGxpdHRlZEJsb2NrO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0cyBhIGJsb2NrIGluIHR3byB0byBtYWtlIHRoZSBmaXJzdCBvbmUgZml0IGluIHRoZSBzaXplIG9mIHN0YW5kYXJkXG4gICAqIG11c2ljYWwgc3ltYm9scyBsZW5ndGguXG4gICAqIEBwYXJhbSBiYXJzSW5mbyBBbiBBcnJheSB3aXRoIGJhciBhbmQgc2lnbmF0dXJlcyBpbmZvIHBlciBxdWFydGVyXG4gICAqIEBwYXJhbSBpbmNyZWFzaW5nIFdldGhlciB0aGUgc3BsaXQgbXVzdCBiZSBkb25lIHNob3J0ZXIgdG8gbG9uZ2VyIG5vdGVzXG4gICAqIEByZXR1cm5zIFRoZSBzZWNvbmQgaGFsZiBvZiBzcGxpdHRlZCBibG9jay4gRmlyc3QgaGFsZiByZW1haW5zIGluIGN1cnJlbnRcbiAgICogb2JqZWN0LCB3aGljaCBnZXRzIG1vZGlmaWVkLlxuICAgKi9cbiAgcHVibGljIHNwbGl0VG9TeW1ib2xzKGJhcnNJbmZvOiBCYXJzSW5mbywgaW5jcmVhc2luZzogYm9vbGVhbik6IFN0YWZmQmxvY2sge1xuICAgIGxldCByZW1haW5CbG9jazogU3RhZmZCbG9jayA9IG51bGw7XG4gICAgaWYgKHRoaXMubGVuZ3RoID49IE1JTl9SRVNPTFVUSU9OKSB7XG4gICAgICBpZiAoIC8vIFdob2xlIHJlc3QgYXBwbGllcyB0byB3aG9sZSBiYXIsIHdoYXRldmVyIGl0cyBsZW5ndGhcbiAgICAgICAgIXRoaXMubm90ZXMubGVuZ3RoICYmIC8vIElzIGEgcmVzdCBhbmQgcHVsc2Ugc3BsaXR0ZWQgdG8gYmFyIGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCA9PT0gYmFyc0luZm8uYmFyTGVuZ2h0QXRRKHRoaXMuc3RhcnQpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5oZWFkSW5kZXggPSA0O1xuICAgICAgfVxuICAgICAgZWxzZSB7IC8vIEtpbmQgb2Ygbm90ZSBzZWxlY3Rpb24gKGFsbCBibG9jayBub3RlcyBoYXZlIHNhbWUgYXNwZWN0KVxuICAgICAgICByZW1haW5CbG9jayA9IGluY3JlYXNpbmc/IFxuICAgICAgICAgIHRoaXMuc3BsaXRTaG9ydGVyKGJhcnNJbmZvKTogdGhpcy5zcGxpdExvbmdlcihiYXJzSW5mbyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEZhbGxiYWNrIGZvciBub3RlcyBzaG9ydGVyIHRoYW4gTUlOX1JFU09MVVRJT04uIEl0IHdpbGwgYmUgd2FybmVkIG9uIFxuICAgIC8vIGNvbnNvbGUgYW5kIE1JTl9SRVNPTFVUSU9OIG5vdGUgd2lsbCBiZSBkcmF3bi5cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IG5vdGVMZW5ndGggPSBpc1NhZmVaZXJvKHRoaXMubGVuZ3RoKSA/ICdbaW5maW5pdGVdJyA6IFxuICAgICAgICBgJHs0IC8gdGhpcy5sZW5ndGh9YDtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJyVjU3RhZmZSZW5kZXI6JywgJ2JhY2tncm91bmQ6b3JhbmdlOyBjb2xvcjp3aGl0ZScsIFxuICAgICAgICAnU3RhZmZSZW5kZXIgZG9lcyBub3QgaGFuZGxlIG5vdGVzIHNob3J0aGVyIHRoYW4gJyArXG4gICAgICAgIGAxLyR7NCAvIE1JTl9SRVNPTFVUSU9OfXRoLCBhbmQgdGhpcyBzY29yZSB0cmllcyB0byBkcmF3IGEgYCArXG4gICAgICAgIGAxLyR7bm90ZUxlbmd0aH10aC4gU2hvcnRlc3QgcG9zc2libGUgbm90ZSB3aWxsIGJlIGRyYXduIGluc3RlYWQuYFxuICAgICAgKTtcbiAgICAgIHRoaXMuaGVhZEluZGV4ID0gTUlOX1JFU09MVVRJT047XG4gICAgICByZW1haW5CbG9jayA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiByZW1haW5CbG9jaztcbiAgfVxuICBcbiAgLyoqXG4gICAqIFNwbGl0cyBhIGJsb2NrIGluIHR3byB0byBtYWtlIHRoZSBmaXJzdCBvbmUgdGhlIHNob3J0ZXN0IHBvc3NpYmxlIHNpemUgb2YgXG4gICAqIHN0YW5kYXJkIG11c2ljYWwgc3ltYm9scy5cbiAgICogQHBhcmFtIGJhcnNJbmZvIEFuIEFycmF5IHdpdGggYmFyIGFuZCBzaWduYXR1cmVzIGluZm8gcGVyIHF1YXJ0ZXJcbiAgICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwbGl0dGVkIGJsb2NrLiBGaXJzdCBoYWxmIHJlbWFpbnMgaW4gY3VycmVudFxuICAgKiBvYmplY3QsIHdoaWNoIGdldHMgbW9kaWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3BsaXRTaG9ydGVyKGJhcnNJbmZvOiBCYXJzSW5mbyk6IFN0YWZmQmxvY2sge1xuICAgIGxldCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICBsZXQgc3BsaXRMZW5ndGggPSAwO1xuICAgIGxldCBoZWFkSW5kZXggPSAwO1xuICAgIGxldCBoZWFkQWx0ZXJhdGlvbiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDQ7ICFpc1NhZmVaZXJvKGxlbmd0aCk7IGkgLz0gMikge1xuICAgICAgaWYgKCAvLyBEb3R0ZWQgbm90ZVxuICAgICAgICBpc1NhZmVaZXJvKGxlbmd0aCAtIGkgKiAzLzIpICYmXG4gICAgICAgIChiYXJzSW5mby5hbGxvd0RvdHRlZFJlc3RzIHx8IHRoaXMubm90ZXMubGVuZ3RoKVxuICAgICAgKSB7XG4gICAgICAgIGxlbmd0aCAtPSBpICogMy8yO1xuICAgICAgICBzcGxpdExlbmd0aCA9IGkgKiAzLzI7XG4gICAgICAgIGhlYWRJbmRleCA9IGk7XG4gICAgICAgIGhlYWRBbHRlcmF0aW9uID0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGxlbmd0aCA+PSBpKSB7IC8vIFBsYWluIG5vdGVcbiAgICAgICAgbGVuZ3RoIC09IGk7XG4gICAgICAgIHNwbGl0TGVuZ3RoID0gaTtcbiAgICAgICAgaGVhZEluZGV4ID0gaTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzU2FmZVplcm8obGVuZ3RoIC0gaSAqIDQvNSkpIHsgLy8gUXVpbnR1cGxldFxuICAgICAgICBsZW5ndGggLT0gaSAqIDQvNTtcbiAgICAgICAgc3BsaXRMZW5ndGggPSBpICogNC81O1xuICAgICAgICBoZWFkSW5kZXggPSBpO1xuICAgICAgICBoZWFkQWx0ZXJhdGlvbiA9IDU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1NhZmVaZXJvKGxlbmd0aCAtIGkgKiAyLzMpKSB7IC8vIFRyaXBsZXRcbiAgICAgICAgbGVuZ3RoIC09IGkgKiAyLzM7XG4gICAgICAgIHNwbGl0TGVuZ3RoID0gaSAqIDIvMztcbiAgICAgICAgaGVhZEluZGV4ID0gaTtcbiAgICAgICAgaGVhZEFsdGVyYXRpb24gPSAzO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZW1haW5CbG9jayA9IHRoaXMuc3BsaXQodGhpcy5zdGFydCArIHNwbGl0TGVuZ3RoLCBiYXJzSW5mbyk7XG4gICAgdGhpcy5oZWFkSW5kZXggPSBoZWFkSW5kZXg7XG4gICAgdGhpcy5oZWFkQWx0ZXJhdGlvbiA9IGhlYWRBbHRlcmF0aW9uO1xuICAgIHJldHVybiByZW1haW5CbG9jaztcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdHMgYSBibG9jayBpbiB0d28gdG8gbWFrZSB0aGUgZmlyc3Qgb25lIHRoZSBsb25nZXN0IHBvc3NpYmxlIHNpemUgb2YgXG4gICAqIHN0YW5kYXJkIG11c2ljYWwgc3ltYm9scy5cbiAgICogQHBhcmFtIGJhcnNJbmZvIEFuIEFycmF5IHdpdGggYmFyIGFuZCBzaWduYXR1cmVzIGluZm8gcGVyIHF1YXJ0ZXJcbiAgICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwbGl0dGVkIGJsb2NrLiBGaXJzdCBoYWxmIHJlbWFpbnMgaW4gY3VycmVudFxuICAgKiBvYmplY3QsIHdoaWNoIGdldHMgbW9kaWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3BsaXRMb25nZXIoYmFyc0luZm86IEJhcnNJbmZvKTogU3RhZmZCbG9jayB7XG4gICAgbGV0IHJlbWFpbkJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gNDsgIXRoaXMuaGVhZEluZGV4OyBpIC89IDIpIHtcbiAgICAgIGlmICggLy8gRG90dGVkIG5vdGVcbiAgICAgICAgaXNTYWZlWmVybyh0aGlzLmxlbmd0aCAtIGkgKiAzLzIpICYmXG4gICAgICAgIChiYXJzSW5mby5hbGxvd0RvdHRlZFJlc3RzIHx8IHRoaXMubm90ZXMubGVuZ3RoKVxuICAgICAgKSB7XG4gICAgICAgIHJlbWFpbkJsb2NrID0gdGhpcy5zcGxpdCh0aGlzLnN0YXJ0ICsgaSAqIDMvMiwgYmFyc0luZm8pO1xuICAgICAgICB0aGlzLmhlYWRJbmRleCA9IGk7XG4gICAgICAgIHRoaXMuaGVhZEFsdGVyYXRpb24gPSAxO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5sZW5ndGggPj0gaSkge1xuICAgICAgICByZW1haW5CbG9jayA9IHRoaXMuc3BsaXQodGhpcy5zdGFydCArIGksIGJhcnNJbmZvKTtcbiAgICAgICAgdGhpcy5oZWFkSW5kZXggPSBpOyAvLyBQbGFpbiBub3RlXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1NhZmVaZXJvKHRoaXMubGVuZ3RoIC0gaSAqIDQvNSkpIHsgLy8gUXVpbnR1cGxldFxuICAgICAgICByZW1haW5CbG9jayA9IHRoaXMuc3BsaXQodGhpcy5zdGFydCArIGkgKiA0LzUsIGJhcnNJbmZvKTtcbiAgICAgICAgdGhpcy5oZWFkSW5kZXggPSBpO1xuICAgICAgICB0aGlzLmhlYWRBbHRlcmF0aW9uID0gNTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzU2FmZVplcm8odGhpcy5sZW5ndGggLSBpICogMi8zKSkgeyAvLyBUcmlwbGV0XG4gICAgICAgIHJlbWFpbkJsb2NrID0gdGhpcy5zcGxpdCh0aGlzLnN0YXJ0ICsgaSAqIDIvMywgYmFyc0luZm8pO1xuICAgICAgICB0aGlzLmhlYWRJbmRleCA9IGk7XG4gICAgICAgIHRoaXMuaGVhZEFsdGVyYXRpb24gPSAzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVtYWluQmxvY2s7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBibG9jayBzdGFydHMgYXQgYmFyIGJlZ2lubmluZ1xuICAgKiBAcmV0dXJucyB0cnVlIGlmIGl0IGlzIHNvXG4gICAqL1xuICBwdWJsaWMgaXNCYXJCZWdpbm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYmFyTnVtYmVyIC0gTWF0aC50cnVuYyh0aGlzLmJhck51bWJlcikgPT09IDAuMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdWxmaWxscyBiZWFtaW5nIGluZm8gYWNjb3JkaW5nIHRvIHByZXZpb3VzIGJsb2NrIGFuZCBzaWduYXR1cmVzIGNvbnRleHRcbiAgICogQHBhcmFtIHByZXZpb3VzU3RhZmZCbG9jayBUaGUgcHJldmlvdXMgYmxvY2sgdG8gcml0bWljYWxseSBjb21wbGV0ZVxuICAgKiBAcGFyYW0gcXVhcnRlcnNJbmZvIEFuIEFycmF5IHdpdGggYmFyIGFuZCBzaWduYXR1cmVzIGluZm8gcGVyIHF1YXJ0ZXJcbiAgICovXG4gIHB1YmxpYyBzZXRCZWFtaW5nKFxuICAgIHByZXZpb3VzU3RhZmZCbG9jazogU3RhZmZCbG9jaywgYmFyc0luZm86IEJhcnNJbmZvXG4gICkge1xuICB9XG59XG5cbi8qKlxuICogVmVyaWZpZXMgaWYgYSBnaXZlbiBudW1iZXIgaXMgY2xvc2VyIHRvIHplcm8gdGhhbiAwLjAwMDAwMDEgaW4gb3JkZXIgdG8gXG4gKiBhdm9pZCBKYXZhc2NyaXB0IG1hdGggaW1wcmVjaXNzaW9ucy5cbiAqIEBwYXJhbSBuIE51bWJlciB0byBiZSBjaGVja2VkXG4gKi9cbmZ1bmN0aW9uIGlzU2FmZVplcm8objogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBNYXRoLnJvdW5kKG4gKiAxMDAwMDAwKSA9PT0gMDtcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG4vKiogU3RvcmVzIG1pbmltYWwgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBhIG11c2ljYWwgbm90ZSAqL1xuZXhwb3J0IGludGVyZmFjZSBOb3RlSW5mbyB7XG4gIC8qKiBTdGFydGluZyB0aW1lLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKiBOb3RlIGxlbmd0aCwgaW4gcXVhcnRlciBub3RlIHF1YW50aXRpZXMgKGZsb2F0KSAqL1xuICBsZW5ndGg6IG51bWJlcjtcbiAgLyoqIE5vdGUgcGl0Y2ggYWNjb3JkaW5nIHRvIE1JREkgc3RhbmRhcmQgKi9cbiAgcGl0Y2g6IG51bWJlcjtcbiAgLyoqIE5vdGUgaW50ZW5zaXR5IGFjY29yZGluZyB0byBNSURJIHZlbG9jaXR5ICovXG4gIGludGVuc2l0eTogbnVtYmVyO1xufVxuICBcbi8qKiBTdG9yZXMgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBhIHRlbXBvIGNoYW5nZSBvbiBhIHNjb3JlIChub3QgdXNlZCB5ZXQpICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbXBvSW5mbyB7XG4gIC8qKiBTdGFydGluZyB0aW1lLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpICovXG4gIHN0YXJ0OiBudW1iZXI7IFxuICAvKiogUXVhcnRlcnMgUGVyIE1pbnV0ZSBmcm9tIHRoaXMgcXVhcnRlciBvbiwgdW5sZXNzIGZ1cnRoZXIgY2hhbmdlcyAqL1xuICBxcG06IG51bWJlcjtcbn1cblxuLyoqIFN0b3JlcyBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGEga2V5IHNpZ25hdHVyZSBjaGFuZ2Ugb24gYSBzY29yZSAqL1xuZXhwb3J0IGludGVyZmFjZSBLZXlTaWduYXR1cmVJbmZvIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgc3RhcnQ6IG51bWJlcjsgXG4gIC8qKiBLZXkgc2lnbmF0dXJlIGZyb20gdGhpcyBxdWFydGVyIG9uLCB1bmxlc3MgZnVydGhlciBjaGFuZ2VzICovXG4gIGtleTogbnVtYmVyO1xufVxuXG4vKiogU3RvcmVzIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gYSB0aW1lIHNpZ25hdHVyZSBjaGFuZ2Ugb24gYSBzY29yZSAqL1xuZXhwb3J0IGludGVyZmFjZSBUaW1lU2lnbmF0dXJlSW5mbyB7XG4gIC8qKiBTdGFydGluZyB0aW1lLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKiBXb3VsZCBob2xkIDMgaW4gYSAzLzQgdGltZSBzaWduYXR1cmUgY2hhbmdlICovXG4gIG51bWVyYXRvcjogbnVtYmVyOyBcbiAgLyoqIFdvdWxkIGhvbGQgNCBpbiBhIDMvNCB0aW1lIHNpZ25hdHVyZSBjaGFuZ2UgKi9cbiAgZGVub21pbmF0b3I6IG51bWJlcjtcbn1cblxuLyoqIFN0b3JlcyB0aGUgYmFyZSBtaW5pbWFsIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gYSBmdWxsIHNpbmdsZSBzdGFmZiBzY29yZSAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGFmZkluZm8ge1xuICAvKiogQWxsIG5vdGVzIGluIGEgc3RhZmYuIFRoZXJlJ3Mgbm8gbmVlZCB0byBiZSBzb3J0ZWQgYnkgc3RhcnQgcSAqL1xuICBub3RlczogTm90ZUluZm9bXTtcbiAgLyoqIEFsbCB0ZW1wbyBjaGFuZ2VzIGluIGEgc3RhZmYuIFRoZXkgd2lsbCBnZXQgc29ydGVkIGJ5IHN0YXJ0IHEgKi9cbiAgdGVtcG9zPzogVGVtcG9JbmZvW107XG4gIC8qKiBBbGwga2V5IHNpZ25hdHVyZSBjaGFuZ2VzIGluIGEgc3RhZmYuIFRoZXkgd2lsbCBnZXQgc29ydGVkIGJ5IHN0YXJ0IHEgKi9cbiAga2V5U2lnbmF0dXJlcz86IEtleVNpZ25hdHVyZUluZm9bXTtcbiAgLyoqIEFsbCB0aW1lIHNpZ25hdHVyZSBjaGFuZ2VzIGluIGEgc3RhZmYuIFRoZXkgd2lsbCBnZXQgc29ydGVkIGJ5IHN0YXJ0IHEgKi9cbiAgdGltZVNpZ25hdHVyZXM/OiBUaW1lU2lnbmF0dXJlSW5mb1tdO1xufVxuXG4vKiogRGVmYXVsdCB0ZW1wbyBpbiBjYXNlIG5vbmUgaXMgZm91bmQgKDYwIGJwbSkgKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RFTVBPOiBUZW1wb0luZm8gPSB7XG4gIHN0YXJ0OiAwLFxuICBxcG06IDYwXG59O1xuLyoqIERlZmF1bHQga2V5IGluIGNhc2Ugbm9uZSBpcyBmb3VuZCAoQyBrZXkpICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9LRVlfU0lHTkFUVVJFOiBLZXlTaWduYXR1cmVJbmZvID0ge1xuICBzdGFydDogMCxcbiAga2V5OiAwXG59O1xuLyoqIERlZmF1bHQgdGltZSBzaWduYXR1cmUgaW4gY2FzZSBub25lIGlzIGZvdW5kICg0LzQpICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FX1NJR05BVFVSRTogVGltZVNpZ25hdHVyZUluZm8gPSB7XG4gIHN0YXJ0OiAwLCBcbiAgbnVtZXJhdG9yOiA0LCBcbiAgZGVub21pbmF0b3I6IDRcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIHF1YXJ0ZXJzIHRoYXQgZml0cyB3aXRoaW4gYSBiYXIgaW4gYSBnaXZlblxuICogdGltZSBzaWduYXR1cmVcbiAqIEBwYXJhbSB0aW1lU2lnbmF0dXJlIFRoZSB0aW1lIHNpZ25hdHVyZVxuICogQHJldHVybnMgVGhlIG51bWJlciBvZiBxdWFydGVycyB0aGF0IGZpdCBpblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmFyTGVuZ3RoKHRpbWVTaWduYXR1cmU6IFRpbWVTaWduYXR1cmVJbmZvKTogbnVtYmVyIHtcbiAgcmV0dXJuIHRpbWVTaWduYXR1cmUubnVtZXJhdG9yICogNCAvIHRpbWVTaWduYXR1cmUuZGVub21pbmF0b3I7XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBQYXNjdWFsIGRlIEp1YW4uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtcbiAgU3RhZmZJbmZvLCBOb3RlSW5mbywgS2V5U2lnbmF0dXJlSW5mbywgXG4gIERFRkFVTFRfVEVNUE8sIERFRkFVTFRfVElNRV9TSUdOQVRVUkUsIERFRkFVTFRfS0VZX1NJR05BVFVSRVxufSBmcm9tICcuL3N0YWZmX2luZm8nO1xuaW1wb3J0IHsgQmFyc0luZm8gfSBmcm9tICcuL2JhcnNfaW5mbyc7XG5pbXBvcnQgeyBTdGFmZkJsb2NrLCBTdGFmZk5vdGUgfSBmcm9tICcuL3N0YWZmX2Jsb2NrJztcbmltcG9ydCB7IFNDQUxFUywgS0VZX0FDQ0lERU5UQUxTIH0gZnJvbSAnLi9tb2RlbF9jb25zdGFudHMnO1xuZXhwb3J0IHsgS0VZX0FDQ0lERU5UQUxTIH07IC8vIFRPRE86IFJldmlld1xuXG4vKiogQSBtYXAgb2Ygc3RhZmYgYmxvY2tzIGluZGV4ZWQgYnkgc3RhcnRpbmcgcXVhcnRlciAqL1xudHlwZSBTdGFmZkJsb2NrTWFwID0gTWFwPG51bWJlciwgU3RhZmZCbG9jaz47XG5cbi8qKiBUZW1wb3Jhcnkgc3RvcmFnZSBvZiBhY2NpZGVudGFscyBhY3RpdmF0ZWQgb24gYSBiYXIgYnkgTUlESSBub3RlICovXG50eXBlIEJhckFjY2lkZW50YWxzID0ge1twaXRjaDogbnVtYmVyXTogbnVtYmVyfTtcblxuLyoqXG4gKiBNb2RlbHMgYSBzdGFmZiBpbmZvIGludG8gYSBtdXNpY2FsIHN0cnVjdHVyZSBvZiBzdGFmZiBibG9ja3MgaW5kZXhlZCBieSB0aGVcbiAqIHF1YXJ0ZXIgdGhleSBzdGFydCBmcm9tXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGFmZk1vZGVsIHtcbiAgLyoqIFRoZSBpbnB1dCBzdGFmZiBpbmZvLCBzdG9yZWQgZm9yIGZ1cnRoZXIgb3V0ZXIgbW9kaWZpY2F0aW9ucyAqL1xuICBwdWJsaWMgc3RhZmZJbmZvOiBTdGFmZkluZm87XG4gIC8qKiAgU3RhZmYgY2xlZiBhcyBNSURJIHBpdGNoIG5vdGUgYXQgdGhlIHN0YWZmIDNyZCBsaW5lIChHIGNsZWYgLT4gQiA9IDcxKSAqL1xuICBwdWJsaWMgY2xlZjogbnVtYmVyO1xuICAvKiogVGhlIGJhciwgdGVtcG8sIHRpbWUgc2lnbmF0dXJlIGFuZCBrZXkgc2lnbmF0dXJlIGluZm8gYnkgcXVhcnRlcnMgKi9cbiAgcHVibGljIGJhcnNJbmZvOiBCYXJzSW5mbztcbiAgLyoqIFRoZSByZXN1dCBvZiBzdGFmZiBhbmFseXNpcyBvbiBzdGFmZiBibG9ja3MgaW5kZXhlZCBieSBzdGFydGluZyBxdWFydGVyICovXG4gIHB1YmxpYyBzdGFmZkJsb2NrTWFwOiBTdGFmZkJsb2NrTWFwO1xuICAvKiogTGFzdCBoYW5kbGVkIHF1YXJ0ZXIsIGkuZS4gc3RhZmYgbGVuZ3RoIGluIHF1YXJ0ZXJzICovXG4gIHByaXZhdGUgbGFzdFE6bnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYFN0YWZmTW9kZWxgIHN0b3JpbmcgaW5wdXQgZGF0YSBhbmQgcmVzdWx0XG4gICAqIEBwYXJhbSBzdGFmZkluZm8gR2VuZXJpYyBpbmZvcm1hdGlvbiBhYm91dCBhIHNjb3JlIHRvIGNyYXRlIGEgc3RhZmYgd2l0aFxuICAgKiBAcGFyYW0gZGVmYXVsdEtleSBEZWZhdWx0IHZhbHVlIHRvIHJlcGxhY2UgbWlzc2luZyBrZXkgYXQgYmFyIDBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YWZmSW5mbzogU3RhZmZJbmZvLCBkZWZhdWx0S2V5PzogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFmZkluZm8gPSBudWxsO1xuICAgIHRoaXMuY2xlZiA9IGd1ZXNzQ2xlZihzdGFmZkluZm8pO1xuICAgIHRoaXMuc3RhZmZCbG9ja01hcCA9IG51bGw7XG4gICAgdGhpcy51cGRhdGUoc3RhZmZJbmZvLCBkZWZhdWx0S2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgbmV3IHN0YWZmIGluZm8gdG8gdXBkYXRlIGludGVybmFsIG1vZGVsLiBJdCB3aWxsIG1vZGlmeSByZWNlaXZlZFxuICAgKiBzdGFmZiBpbmZvIGlmIGl0IGlzIGRpc29yZGVyZWQgb3IgaW5jb21wbGV0ZS5cbiAgICogQHBhcmFtIHN0YWZmSW5mbyBOZXcgc3RhZmYgaW5mb3JtYXRpb24gdG8gcmVwbGFjZSBwcmV2aW91cyBvbmVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoc3RhZmZJbmZvOiBTdGFmZkluZm8sIGRlZmF1bHRLZXk/OiBudW1iZXIpIHtcbiAgICBzdGFmZkluZm8ubm90ZXMuc29ydCggKHgsIHkpID0+IHguc3RhcnQgLSB5LnN0YXJ0ICk7XG5cbiAgICAvLyBUT0RPOiBGdWxsIHJldmlldyB0byBtYWtlIGl0IGluY3JlbWVudGFsIGF2b2lkaW5nIHVubmVkZWQgdXBkYXRlIHdvcmtcbiAgICB0aGlzLmxhc3RRID0gMDtcbiAgICBzdGFmZkluZm8ubm90ZXMuZm9yRWFjaChcbiAgICAgIG5vdGUgPT4ge1xuICAgICAgICBpZiAobm90ZS5zdGFydCArIG5vdGUubGVuZ3RoID4gdGhpcy5sYXN0USkge1xuICAgICAgICAgIHRoaXMubGFzdFEgPSBub3RlLnN0YXJ0ICsgbm90ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKHN0YWZmSW5mby50ZW1wb3MgJiYgc3RhZmZJbmZvLnRlbXBvcy5sZW5ndGgpIHtcbiAgICAgIHN0YWZmSW5mby50ZW1wb3Muc29ydCggKHgsIHkpID0+IHguc3RhcnQgLSB5LnN0YXJ0ICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhZmZJbmZvLnRlbXBvcyA9IFtERUZBVUxUX1RFTVBPXTtcbiAgICB9XG4gICAgaWYgKHN0YWZmSW5mby50ZW1wb3NbMF0uc3RhcnQgIT09IDApIHtcbiAgICAgIHN0YWZmSW5mby50ZW1wb3MgPSBbREVGQVVMVF9URU1QT10uY29uY2F0KHN0YWZmSW5mby50ZW1wb3MpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0aW5nS2V5OiBLZXlTaWduYXR1cmVJbmZvID0gZGVmYXVsdEtleT8gXG4gICAgICB7IHN0YXJ0OiAwLCBrZXk6IGRlZmF1bHRLZXkgfTogREVGQVVMVF9LRVlfU0lHTkFUVVJFO1xuICAgIGlmIChzdGFmZkluZm8ua2V5U2lnbmF0dXJlcyAmJiBzdGFmZkluZm8ua2V5U2lnbmF0dXJlcy5sZW5ndGgpIHtcbiAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzLnNvcnQoICh4LCB5KSA9PiB4LnN0YXJ0IC0geS5zdGFydCApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzID0gW3N0YXJ0aW5nS2V5XTtcbiAgICB9XG4gICAgaWYgKHN0YWZmSW5mby5rZXlTaWduYXR1cmVzWzBdLnN0YXJ0ICE9PSAwKSB7XG4gICAgICBzdGFmZkluZm8ua2V5U2lnbmF0dXJlcyA9IFxuICAgICAgICBbc3RhcnRpbmdLZXldLmNvbmNhdChzdGFmZkluZm8ua2V5U2lnbmF0dXJlcyk7XG4gICAgfVxuXG4gICAgaWYgKHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcyAmJiBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMubGVuZ3RoKSB7XG4gICAgICBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMuc29ydCggKHgsIHkpID0+IHguc3RhcnQgLSB5LnN0YXJ0ICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzID0gW0RFRkFVTFRfVElNRV9TSUdOQVRVUkVdO1xuICAgIH1cbiAgICBpZiAoc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzWzBdLnN0YXJ0ICE9PSAwKSB7XG4gICAgICBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMgPSBcbiAgICAgICAgW0RFRkFVTFRfVElNRV9TSUdOQVRVUkVdLmNvbmNhdChzdGFmZkluZm8udGltZVNpZ25hdHVyZXMpO1xuICAgIH1cblxuICAgIHRoaXMuYmFyc0luZm8gPSBuZXcgQmFyc0luZm8oc3RhZmZJbmZvLCB0aGlzLmxhc3RRKTtcblxuICAgIHRoaXMuaW5mb1RvQmxvY2tzKHN0YWZmSW5mbyk7XG4gIH1cblxuICAvKipcbiAgICogQW5hbHl6ZXMgc3RvcmVkIGluZm8gYW5kIGRlZmF1bHRzIHRvIHVwZGF0ZSBgc3RhZmZCbG9ja01hcGAsIHVubGVzcyB0aGVcbiAgICogc3RhZmYgaW5mbyByZWNlaXZlZCBoYXMgbm90IGNoYW5nZWQgKGluIGxlbmd0aCBvZiBpdHMgbWVtYmVycykuXG4gICAqIEBwYXJhbSBzdGFmZkluZm8gTmV3IHN0YWZmIGluZm9ybWF0aW9uIHRvIHJlcGxhY2UgcHJldmlvdXMgb25lLlxuICAgKiBAcmV0dXJucyBBbmFseXplZCBzdGFmZiBhcyBhbiBpbmRleGVkIHBlciBxdWFydGVyIGBTdGFmZkJsb2NrTWFwYFxuICAgKi9cbiAgcHJpdmF0ZSBpbmZvVG9CbG9ja3Moc3RhZmZJbmZvOiBTdGFmZkluZm8pOiBTdGFmZkJsb2NrTWFwIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YWZmQmxvY2tNYXAgPT09IG51bGwgfHwgLy8gQ29uc3RydWN0b3IgdXNlIGNhc2VcbiAgICAgIHN0YWZmSW5mby5ub3Rlcy5sZW5ndGggIT09IHRoaXMuc3RhZmZJbmZvLm5vdGVzLmxlbmd0aCB8fFxuICAgICAgc3RhZmZJbmZvLnRlbXBvcy5sZW5ndGggIT09IHRoaXMuc3RhZmZJbmZvLnRlbXBvcy5sZW5ndGggfHxcbiAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzLmxlbmd0aCAhPT0gdGhpcy5zdGFmZkluZm8ua2V5U2lnbmF0dXJlcy5sZW5ndGggfHxcbiAgICAgIHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcy5sZW5ndGggIT09IHRoaXMuc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzLmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy5zdGFmZkluZm8gPSBzdGFmZkluZm87XG4gICAgICB0aGlzLmxhc3RRID0gMDtcblxuICAgICAgLy8gR3JvdXAgbm90ZXMgaW50byBibG9ja3MsIHNldCBub3RlIHNwbGl0IHBvaW50c1xuICAgICAgY29uc3QgYmxvY2tzOiBTdGFmZkJsb2NrTWFwID0gbmV3IE1hcCgpO1xuICAgICAgLy8gVE9ETzogRnV0dXJlIGFwcHJvYWNoIHRvIHRoaXMuc3RhZmZCbG9ja01hcCBmb3IgaW5jcmVtZW50YWwgYmxvY2tzXG4gICAgICBjb25zdCBzcGxpdGVzID0gbmV3IFNldDxudW1iZXI+KCk7IC8vIFNwbGl0IHBvaW50cyA9IGJhcnMgKyBzdGFydHMgKyBlbmRzXG4gICAgICBsZXQgYmFyQWNjaWRlbnRhbHM6IEJhckFjY2lkZW50YWxzID0ge307IC8vIFRlbXBvcmFsIGFjY2lkZW50YWxzXG4gICAgICBsZXQgbGFzdEJhciA9IDA7XG4gICAgICBsZXQgbGFzdEJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhZmZJbmZvLm5vdGVzLmZvckVhY2goIFxuICAgICAgICBub3RlID0+IHtcbiAgICAgICAgICBjb25zdCBzdGFmZk5vdGUgPSB0b1N0YWZmTm90ZShub3RlKTtcbiAgICAgICAgICBjb25zdCBiYXJOdW1iZXIgPSB0aGlzLmJhcnNJbmZvLmJhck51bWJlckF0UShzdGFmZk5vdGUuc3RhcnQpO1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRCYXIgPSBNYXRoLnRydW5jKGJhck51bWJlcik7XG4gICAgICAgICAgaWYgKGN1cnJlbnRCYXIgPiBsYXN0QmFyKSB7XG4gICAgICAgICAgICBsYXN0QmFyID0gY3VycmVudEJhcjtcbiAgICAgICAgICAgIGJhckFjY2lkZW50YWxzID0ge307IC8vIFJlc2V0XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGtleVNpZ25hdHVyZSA9IHRoaXMuYmFyc0luZm8ua2V5U2lnbmF0dXJlQXRRKHN0YWZmTm90ZS5zdGFydCk7XG4gICAgICAgICAgcGxhY2VOb3RlKHN0YWZmTm90ZSwgYmFyQWNjaWRlbnRhbHMsIHRoaXMuY2xlZiwga2V5U2lnbmF0dXJlKTtcbiAgICAgICAgICBjb25zdCBzdGFmZk5vdGVFbmQgPSBzdGFmZk5vdGUuc3RhcnQgKyBzdGFmZk5vdGUubGVuZ3RoO1xuXG4gICAgICAgICAgY29uc3QgY3VycmVudEJsb2NrID0gbm90ZVRvQmxvY2tzKHN0YWZmTm90ZSwgYmxvY2tzLCBiYXJOdW1iZXIpO1xuICAgICAgICAgIGlmIChjdXJyZW50QmxvY2sgPT09IGxhc3RCbG9jaykgeyAvLyBBZGRpbmcgbm90ZXMgdG8gY3VycmVudCBibG9ja1xuICAgICAgICAgICAgaWYgKHN0YWZmTm90ZS5sZW5ndGggPCBsYXN0QmxvY2subGVuZ3RoKSB7IC8vIFNwbGl0IHRvIHN0YWZmTm90ZVxuICAgICAgICAgICAgICBjb25zdCBxdWFydGVycyA9IHN0YWZmTm90ZS5zdGFydCArIHN0YWZmTm90ZS5sZW5ndGg7XG4gICAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkQmxvY2sgPSBcbiAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2suc3BsaXQocXVhcnRlcnMsIHRoaXMuYmFyc0luZm8pO1xuICAgICAgICAgICAgICBibG9ja3Muc2V0KHNwbGl0dGVkQmxvY2suc3RhcnQsIHNwbGl0dGVkQmxvY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGFzdEJsb2NrLmxlbmd0aCA8IHN0YWZmTm90ZS5sZW5ndGgpeyAvLyBTcGxpdCB0byBsYXN0QmxvY2tcbiAgICAgICAgICAgICAgY29uc3QgcXVhcnRlcnMgPSBsYXN0QmxvY2suc3RhcnQgKyBsYXN0QmxvY2subGVuZ3RoO1xuICAgICAgICAgICAgICBjb25zdCBzcGxpdHRlZEJsb2NrID0gXG4gICAgICAgICAgICAgICAgY3VycmVudEJsb2NrLnNwbGl0KHF1YXJ0ZXJzLCB0aGlzLmJhcnNJbmZvKTtcbiAgICAgICAgICAgICAgYmxvY2tzLnNldChzcGxpdHRlZEJsb2NrLnN0YXJ0LCBzcGxpdHRlZEJsb2NrKTtcbiAgICAgICAgICAgICAgdGhpcy5sYXN0USA9IHN0YWZmTm90ZUVuZDtcbiAgICAgICAgICAgIH0gLy8gT3RoZXJ3aXNlLCBzYW1lIGxlbmd0aCwgbm90aGluZyB0byBkb1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHsgLy8gQWRkaW5nIG5vdGVzIHRvIGEgbmV3IGJsb2NrXG4gICAgICAgICAgICBpZiAoc3RhZmZOb3RlLnN0YXJ0ID4gdGhpcy5sYXN0USkgeyAvLyBCbG9ja3MgZ2FwIG1lYW5zIGEgcHJpb3IgcmVzdFxuICAgICAgICAgICAgICBjb25zdCBxdWFydGVycyA9IHRoaXMubGFzdFE7XG4gICAgICAgICAgICAgIGNvbnN0IGJhciA9IHRoaXMuYmFyc0luZm8uYmFyTnVtYmVyQXRRKHF1YXJ0ZXJzKTtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdEJsb2NrID0gbmV3IFN0YWZmQmxvY2soXG4gICAgICAgICAgICAgICAgcXVhcnRlcnMsIHN0YWZmTm90ZS5zdGFydCAtIHRoaXMubGFzdFEsIFtdLCBiYXJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgYmxvY2tzLnNldChyZXN0QmxvY2suc3RhcnQsIHJlc3RCbG9jayk7XG4gICAgICAgICAgICAgIHRoaXMubGFzdFEgPSBzdGFmZk5vdGVFbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdGFmZk5vdGUuc3RhcnQgPCB0aGlzLmxhc3RRKSB7IC8vIE5ldyBibG9jayBzdGFydCBvdmVybGFwc1xuICAgICAgICAgICAgICBzcGxpdGVzLmFkZChzdGFmZk5vdGUuc3RhcnQpO1xuICAgICAgICAgICAgICBpZiAoc3RhZmZOb3RlRW5kIDwgdGhpcy5sYXN0USkgeyAvLyBOZXcgYmxvY2sgZW5kIG92ZXJsYXBzIHRvb1xuICAgICAgICAgICAgICAgIHNwbGl0ZXMuYWRkKHN0YWZmTm90ZUVuZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sYXN0USA8IHN0YWZmTm90ZUVuZCkgeyAvLyBPbGQgYmxvY2sgb3ZlcmxhcHMgbmV3XG4gICAgICAgICAgICAgICAgc3BsaXRlcy5hZGQodGhpcy5sYXN0USk7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0USA9IHN0YWZmTm90ZUVuZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIE90aGVyd2lzZSwgY29uc2VjdXRpdmUgYmxvY2tzXG4gICAgICAgICAgICAgIHRoaXMubGFzdFEgPSBzdGFmZk5vdGVFbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0QmxvY2sgPSBjdXJyZW50QmxvY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgXG4gICAgICAvLyBUT0RPOiBJbnNlcnQgaW4gcHJldmlvdXMgcGFzcyBvcHRpbWl6aW5nIHdpdGggaXRlcmF0b3JzIChPXjIgLT4gbGluZWFsKVxuICAgICAgLy8gMm5kIHBhc3MgdG8gYXBwbHkgYWxsIHNwbGl0ZXMgdG8gdGhlIHJpZ2h0IGNodW5rc1xuICAgICAgY29uc3Qgc29ydGVkU3BsaXRlcyA9IEFycmF5LmZyb20oc3BsaXRlcykuc29ydCgoeCwgeSkgPT4geCAtIHkpO1xuICAgICAgc29ydGVkU3BsaXRlcy5mb3JFYWNoKFxuICAgICAgICBxdWFydGVycyA9PiB7XG4gICAgICAgICAgYmxvY2tzLmZvckVhY2goXG4gICAgICAgICAgICBjdXJyZW50QmxvY2sgPT4ge1xuICAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkQmxvY2sgPSBcbiAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2suc3BsaXQocXVhcnRlcnMsIHRoaXMuYmFyc0luZm8pO1xuICAgICAgICAgICAgICBpZiAoc3BsaXR0ZWRCbG9jaykge1xuICAgICAgICAgICAgICAgIGJsb2NrVG9CbG9ja3Moc3BsaXR0ZWRCbG9jaywgYmxvY2tzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBTb3J0aW5nIGZvciBmdXJ0aGVyIGl0ZXJhdGlvblxuICAgICAgdGhpcy5zdGFmZkJsb2NrTWFwID0gXG4gICAgICAgIG5ldyBNYXAoQXJyYXkuZnJvbShibG9ja3MpLnNvcnQoKHgsIHkpID0+IHhbMF0gLSB5WzBdKSk7XG5cbiAgICAgIC8vIDNyZCBwYXNzIHRvIGFwcGx5IHR1cGxldHMgYW5kIHJpdGhtIHNwbGl0dGluZyBhbmQgYXNzb2NpYXRpb25cbiAgICAgIGNvbnN0IHN0YWZmQmxvY2tNYXA6IFN0YWZmQmxvY2tNYXAgPSBuZXcgTWFwKCk7XG4gICAgICBsZXQgbGFzdFN0YWZmQmxvY2s6IFN0YWZmQmxvY2sgPSBudWxsO1xuICAgICAgdGhpcy5zdGFmZkJsb2NrTWFwLmZvckVhY2goXG4gICAgICAgIGN1cnJlbnRCbG9jayA9PiB7XG4gICAgICAgICAgbGV0IHJlbWFpbmluZ0Jsb2NrID0gbnVsbDtcbiAgICAgICAgICBkb3tcbiAgICAgICAgICAgIHJlbWFpbmluZ0Jsb2NrID0gY3VycmVudEJsb2NrLnNwbGl0VG9QdWxzZSh0aGlzLmJhcnNJbmZvKTtcbiAgICAgICAgICAgIGNvbnN0IGluY3JlYXNpbmcgPSBcbiAgICAgICAgICAgICAgIWN1cnJlbnRCbG9jay5wdWxzZUJlZ2luICYmIGN1cnJlbnRCbG9jay5wdWxzZUVuZDtcbiAgICAgICAgICAgIGxldCByZW1haW5pbmdTeW1ib2xzQmxvY2s6IFN0YWZmQmxvY2sgPSBudWxsO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICByZW1haW5pbmdTeW1ib2xzQmxvY2sgPSBcbiAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2suc3BsaXRUb1N5bWJvbHModGhpcy5iYXJzSW5mbywgaW5jcmVhc2luZyk7XG4gICAgICAgICAgICAgIGN1cnJlbnRCbG9jay5zZXRCZWFtaW5nKGxhc3RTdGFmZkJsb2NrLCB0aGlzLmJhcnNJbmZvKTtcbiAgICAgICAgICAgICAgYmxvY2tUb0Jsb2NrcyhjdXJyZW50QmxvY2ssIHN0YWZmQmxvY2tNYXApO1xuICAgICAgICAgICAgICBpZiAocmVtYWluaW5nU3ltYm9sc0Jsb2NrKSB7XG4gICAgICAgICAgICAgICAgbGFzdFN0YWZmQmxvY2sgPSBjdXJyZW50QmxvY2s7XG4gICAgICAgICAgICAgICAgY3VycmVudEJsb2NrID0gcmVtYWluaW5nU3ltYm9sc0Jsb2NrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChyZW1haW5pbmdTeW1ib2xzQmxvY2spO1xuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0Jsb2NrKSB7XG4gICAgICAgICAgICAgIGxhc3RTdGFmZkJsb2NrID0gY3VycmVudEJsb2NrO1xuICAgICAgICAgICAgICBjdXJyZW50QmxvY2sgPSByZW1haW5pbmdCbG9jaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChyZW1haW5pbmdCbG9jayk7IC8vIEVhY2ggYmxvY2sgY2FuIGhvbGQgbW9yZSB0aGFuIG9uZSBwdWxzZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgdGhpcy5zdGFmZkJsb2NrTWFwID0gc3RhZmZCbG9ja01hcDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhZmZCbG9ja01hcDtcbiAgfVxuICBcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIG5vdGUgZnJvbSBgTm90ZUluZm9gIGludGVyZmFjZSB0byBgU3RhZmZOb3RlYCBpbnRlcmZhY2UuIEl0IFxuICogcmVzZXRzIGB2U3RlcGAgYW5kIGBhY2NpZGVudGFsYCB0byB6ZXJvIGFuZCBsZXRzIGB0aWVkRnJvbWAgYW5kIGB0aWVkVG9gXG4gKiBhcyBgdW5kZWZpbmVkYC5cbiAqIEBwYXJhbSBub3RlIFRoZSBub3RlIHRvIGJlIGNvbnZlcnRlZFxuICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBub3RlXG4gKi9cbmZ1bmN0aW9uIHRvU3RhZmZOb3RlKG5vdGU6IE5vdGVJbmZvKTogU3RhZmZOb3RlIHtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDogbm90ZS5zdGFydCxcbiAgICBsZW5ndGg6IG5vdGUubGVuZ3RoLFxuICAgIHBpdGNoOiBub3RlLnBpdGNoLFxuICAgIGludGVuc2l0eTogbm90ZS5pbnRlbnNpdHksXG4gICAgdlN0ZXBzOiAwLCAvLyBEZWxheWVkIGFzc2lnbmF0aW9uIHRpbGwgcGxhY2VOb3RlKCkgY2FsbFxuICAgIGFjY2lkZW50YWw6IDAgLy8gRGVsYXllZCBhc3NpZ25hdGlvbiB0aWxsIHBsYWNlTm90ZSgpIGNhbGxcbiAgfTtcbn1cblxuLyoqXG4gKiBTZXRzIGEgYmxvY2sgaW50byB0aGUgYmxvY2sgbWFwIG9yIGFwcGVuZHMgaXQgaW50byBhbiBleGlzdGluZyBibG9ja1xuICogQHBhcmFtIHN0YWZmQmxvY2sgVGhlIGJsb2NrIHRvIGJlIGNvbnNpZGVyZWQgdG8gc2V0IG9yIGFwcGVuZFxuICogQHBhcmFtIGJsb2NrcyBCbG9jayBtYXAgdG8gaG9sZCBibG9ja3NcbiAqL1xuZnVuY3Rpb24gYmxvY2tUb0Jsb2NrcyhzdGFmZkJsb2NrOiBTdGFmZkJsb2NrLCBibG9ja3M6IFN0YWZmQmxvY2tNYXApIHtcbiAgaWYgKGJsb2Nrcy5oYXMoc3RhZmZCbG9jay5zdGFydCkpIHtcbiAgICBjb25zdCBleGlzdGluZ0Jsb2NrID0gYmxvY2tzLmdldChzdGFmZkJsb2NrLnN0YXJ0KTtcbiAgICBzdGFmZkJsb2NrLm5vdGVzLmZvckVhY2gobm90ZSA9PiBleGlzdGluZ0Jsb2NrLmFkZE5vdGUobm90ZSkpO1xuICB9XG4gIGVsc2Uge1xuICAgIGJsb2Nrcy5zZXQoc3RhZmZCbG9jay5zdGFydCwgc3RhZmZCbG9jayk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZXRzIG9yIGFwcGVuZHMgYSBub3RlIGludG8gYSBuZXcgb3IgZXhpc3RpbmcgYmxvY2ssIHJlc3BlY3RpdmVseSwgXG4gKiByZXR1cm5pbmcgaXQuXG4gKiBAcGFyYW0gbm90ZSBOb3RlIHRvIGJlIGluY2x1ZGVkIGludG8gYSBibG9jayBtYXAgaW5kZXhlZCBieSBzdGFydGluZyBxdWFydGVyXG4gKiBAcGFyYW0gYmxvY2tzIEJsb2NrIG1hcCB0byBob2xkIG5vdGVzXG4gKiBAcmV0dXJucyBUaGUgYmxvY2sgd2hlcmUgdGhlIG5vdGUgaGFzIGJlZW4gc2V0dGVkIG9yIGFwcGVuZGVkXG4gKi9cbmZ1bmN0aW9uIG5vdGVUb0Jsb2Nrcyhub3RlOiBTdGFmZk5vdGUsIGJsb2NrczogU3RhZmZCbG9ja01hcCwgYmFyTnVtYmVyOiBudW1iZXIpXG46IFN0YWZmQmxvY2sge1xuICBpZiAoYmxvY2tzLmhhcyhub3RlLnN0YXJ0KSkge1xuICAgIGNvbnN0IGV4aXN0aW5nQmxvY2sgPSBibG9ja3MuZ2V0KG5vdGUuc3RhcnQpO1xuICAgIGV4aXN0aW5nQmxvY2suYWRkTm90ZShub3RlKTtcbiAgICByZXR1cm4gZXhpc3RpbmdCbG9jaztcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCBuZXdCbG9jayA9IG5ldyBTdGFmZkJsb2NrKFxuICAgICAgbm90ZS5zdGFydCwgbm90ZS5sZW5ndGgsIFtub3RlXSwgYmFyTnVtYmVyLCBub3RlLnZTdGVwcywgbm90ZS52U3RlcHNcbiAgICApO1xuICAgIGJsb2Nrcy5zZXQobm90ZS5zdGFydCwgbmV3QmxvY2spO1xuICAgIHJldHVybiBuZXdCbG9jaztcbiAgfVxufVxuXG4vKipcbiAqIEFuYWx5emVzIGEgbm90ZSBiYXNlZCBvbiBmdWxsIGFjY2lkZW50YWxzIGNvbnRleHQsIHVwZGF0aW5nIGBiYXJBY2NpZGVudGFsc2BcbiAqIEBwYXJhbSBzdGFmZk5vdGUgTm90ZSB0byBiZSBhbmFseXplZCBcbiAqIEBwYXJhbSBiYXJBY2NpZGVudGFscyBBY3RpdmUgYWNjaWRlbnRhbHMgaW4gY3VycmVudCBiYXJcbiAqIEBwYXJhbSBjbGVmIENvbnRleHR1YWwgYXBwbGljYWJsZSBjbGVmXG4gKiBAcGFyYW0ga2V5IENvbnRleHR1YWwgYXBwbGljYWJsZSBrZXlcbiAqL1xuZnVuY3Rpb24gcGxhY2VOb3RlKFxuICBzdGFmZk5vdGU6IFN0YWZmTm90ZSwgYmFyQWNjaWRlbnRhbHM6IEJhckFjY2lkZW50YWxzLCBjbGVmOm51bWJlciwga2V5Om51bWJlclxuKSB7XG4gIGNvbnN0IHBpdGNoRGV0YWlscyA9IGdldE5vdGVEZXRhaWxzKHN0YWZmTm90ZS5waXRjaCwgY2xlZiwga2V5KTtcbiAgaWYgKHBpdGNoRGV0YWlscy52U3RlcHMgaW4gYmFyQWNjaWRlbnRhbHMpIHsgLy8gUHJldmlvdXMgb2NjdXJyZW5jZVxuICAgIGlmIChwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9PT0gYmFyQWNjaWRlbnRhbHNbcGl0Y2hEZXRhaWxzLnZTdGVwc10pIHtcbiAgICAgIHBpdGNoRGV0YWlscy5hY2NpZGVudGFsID0gMDsgLy8gSWdub3JlIHJlcGV0aXRpb25zXG4gICAgfVxuICAgIGVsc2UgeyAvLyBSZXBsYWNlIHdpdGggdGhlIG5ldyBvbmVcbiAgICAgIGlmIChiYXJBY2NpZGVudGFsc1twaXRjaERldGFpbHMudlN0ZXBzXSA9PT0gMykge1xuICAgICAgICAvLyBJZiBjaGFuZ2luZyBmcm9tIG5vcm1hbCBhY2NpZGVudGFsLCBmb3JjZSBrZXkgYWNjaWRlbnRhbFxuICAgICAgICBwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9IHBpdGNoRGV0YWlscy5rZXlBY2NpZGVudGFsO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAocGl0Y2hEZXRhaWxzLmFjY2lkZW50YWwgPT09IDApIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBjaGFuZ2luZyB0byBubyBhY2NpZGVudGFsLCBmb3JjZSBub3JtYWxcbiAgICAgICAgcGl0Y2hEZXRhaWxzLmFjY2lkZW50YWwgPSAzO1xuICAgICAgfVxuICAgICAgYmFyQWNjaWRlbnRhbHNbcGl0Y2hEZXRhaWxzLnZTdGVwc10gPSBwaXRjaERldGFpbHMuYWNjaWRlbnRhbDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7IC8vIFJlZ2lzdGVyIG5ldyBvY2N1cnJlbmNlXG4gICAgaWYgKHN0YWZmTm90ZS50aWVkRnJvbSkgeyAvLyBVbmxlc3MgaXQgaXMgYSB0aWVkIG5vdGUgKGV2ZW4gYWZ0ZXIgYmFyIHJlc2V0KVxuICAgICAgcGl0Y2hEZXRhaWxzLmFjY2lkZW50YWwgPSAwOyAvLyBUaWVkIG5vdGVzIHVzZSB0aGUgaW5pdGFsIGFjY2lkZW50YWxcbiAgICB9XG4gICAgYmFyQWNjaWRlbnRhbHNbcGl0Y2hEZXRhaWxzLnZTdGVwc10gPSBwaXRjaERldGFpbHMuYWNjaWRlbnRhbDtcbiAgfVxuICBzdGFmZk5vdGUudlN0ZXBzID0gcGl0Y2hEZXRhaWxzLnZTdGVwcztcbiAgc3RhZmZOb3RlLmFjY2lkZW50YWwgPSBwaXRjaERldGFpbHMuYWNjaWRlbnRhbDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBub3RlIGRldGFpbHMgZnJvbSBwaXRjaCB2YWx1ZSBhY2NvcmRpbmcgb3ZlcmFsbCBzdGFmZiBjb250ZXh0XG4gKiBAcGFyYW0gbm90ZVBpdGNoIHBpdGNoIG9mIHRoZSBub3RlIHRvIGdldCB0aGUgZGV0YWlscyBmcm9tXG4gKiBAcGFyYW0gY2xlZiBFbmNvZGVkIGFzIE1JREkgcGl0Y2ggbm90ZSBhdCB0aGUgM3JkIGxpbmUgKEcgY2xlZiAtPiBCID0gNzEpXG4gKiBAcGFyYW0ga2V5IEVuY29kZWQgYXMgc2VtaXRvbmVzICgwID0gQywgMSA9IEMjLCAuLi4gMTEgPSBCKVxuICogQHJldHVybnMgQW4gb2JqZWN0IHdoZXJlIGB2U3RlcHM6YCBpcyB0aGUgbm90ZSBoZWlnaHQgaW4gdGhlIHN0YWZmLFxuICogYGFjY2lkZW50YWw6YCBpcyB0aGUgYWNjaWRlbnRhbCB0byBiZSBkcmF3biBpZiBpdCB3ZXJlIGFwcGxpZWQgQyBrZXkgYW5kIFxuICogYGtleUFjY2lkZW50YWw6YCBpcyB0aGUgYWNjaWRlbnRhbCBmb3JjZWQgYnkgY3VycmVudCBrZXksIGlmIGFueVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm90ZURldGFpbHMobm90ZVBpdGNoOiBudW1iZXIsIGNsZWY6IG51bWJlciwga2V5OiBudW1iZXIpXG46IHt2U3RlcHM6IG51bWJlciwgYWNjaWRlbnRhbDogbnVtYmVyLCBrZXlBY2NpZGVudGFsOiBudW1iZXJ9IHtcbiAgY29uc3Qgc2VtaXRvbmVzID0gbm90ZVBpdGNoIC0gNjA7XG4gIGNvbnN0IG9jdGF2ZSA9IE1hdGguZmxvb3Ioc2VtaXRvbmVzIC8gMTIpO1xuICBjb25zdCByZW1pbmRlclNlbWl0b25lcyA9IHNlbWl0b25lcyAtIDEyICogb2N0YXZlO1xuICBjb25zdCBzdGVwcyA9IFNDQUxFU1trZXldLnN0ZXBzW3JlbWluZGVyU2VtaXRvbmVzXTtcbiAgY29uc3Qgb2Zmc2V0ID0gKGNsZWYgPT09IDcxKSA/IDYgOiAtNjtcbiAgY29uc3Qgbm90ZUluS2V5ID0gS0VZX0FDQ0lERU5UQUxTW2tleV0uYWNjaWRlbnRhbCA9PT0gMSA/XG4gICAgNjkgKyAocmVtaW5kZXJTZW1pdG9uZXMgKyAzKSAlIDEyIDogNjQgKyAocmVtaW5kZXJTZW1pdG9uZXMgKyA4KSAlIDEyO1xuICByZXR1cm4ge1xuICAgIHZTdGVwczogb2Zmc2V0IC0gNyAqIG9jdGF2ZSArIHN0ZXBzLCBcbiAgICBhY2NpZGVudGFsOiBTQ0FMRVNba2V5XS5hY2NpZGVudGFsW3JlbWluZGVyU2VtaXRvbmVzXSxcbiAgICBrZXlBY2NpZGVudGFsOiBcbiAgICAgIEtFWV9BQ0NJREVOVEFMU1trZXldLnBpdGNoZXMuaW5kZXhPZihub3RlSW5LZXkpID4gLTEgP1xuICAgICAgICBLRVlfQUNDSURFTlRBTFNba2V5XS5hY2NpZGVudGFsIDogMFxuICB9O1xufVxuXG4vKipcbiAqIENsZWYgZGVkdWN0aW9uOiBBdmVyYWdlIHBpdGNoIHVuZGVyIEM0IC0+IEYgY2xlZiwgb3RoZXJ3aXNlIEcgY2xlZlxuICogQHJldHVybnMgVGhlIGRlZHVjdGVkIGNsZWYgYXMgTWlkaSBwaXRjaCB2YWx1ZXNcbiAqL1xuZnVuY3Rpb24gZ3Vlc3NDbGVmKHN0YWZmSW5mbzogU3RhZmZJbmZvKTogbnVtYmVyIHtcbiAgbGV0IHBpdGNoU3VtID0gMDtcbiAgbGV0IGNvdW50U3VtID0gMDtcbiAgc3RhZmZJbmZvLm5vdGVzLmZvckVhY2goXG4gICAgbm90ZSA9PiB7XG4gICAgICBwaXRjaFN1bSArPSBub3RlLnBpdGNoO1xuICAgICAgKytjb3VudFN1bTtcbiAgICB9XG4gICk7XG4gIGNvbnN0IGF2ZXJhZ2VQaXRjaCA9IHBpdGNoU3VtIC8gY291bnRTdW07XG4gIHJldHVybiBhdmVyYWdlUGl0Y2ggPCA2MCA/IDUwIDogNzE7IC8vIE51bWJlcnMgYXJlIE1JREkgcGl0Y2ggdmFsdWVzICBcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1xuICBTVEVNX1dJRFRILCBMSU5FX1NUUk9LRSwgQ09NUEFDVF9TUEFDSU5HXG59IGZyb20gJy4vcmVuZGVyX2NvbnN0YW50cyc7XG5cbmltcG9ydCB7XG4gIFNWR05TLCBkcmF3U1ZHUGF0aCwgZHJhd1NWR1RleHQsIGNyZWF0ZVNWR0dyb3VwQ2hpbGQsIHNldEZhZGUsIHNldEZpbGwsXG4gIHNldFN0cm9rZSwgaGlnaGxpZ2h0RWxlbWVudFxufSBmcm9tICcuL3N2Z190b29scyc7XG5cbmltcG9ydCAge1xuICBQQVRIX1NDQUxFLCBOT1RFX1BBVEhTLCBSRVNUX1BBVEhTLCBDTEVGX1BBVEhTLCBBQ0NJREVOVEFMX1BBVEhTLFxuICBzdGFmZkxpbmVQYXRoLCBleHRyYUxpbmVQYXRoLCBiYXJQYXRoLCBzdGVtUGF0aCwgc2luZ2xlRmxhZ1BhdGgsIFxuICBtdWx0aUZsYWdQYXRoLCB0aWVQYXRoLCBkb3RQYXRoXG59IGZyb20gJy4vc3ZnX3BhdGhzJztcblxuaW1wb3J0IHtcbiAgU3RhZmZJbmZvLCBUaW1lU2lnbmF0dXJlSW5mbywgTm90ZUluZm8sIGdldEJhckxlbmd0aFxufSBmcm9tICcuL3N0YWZmX2luZm8nO1xuXG5pbXBvcnQge1xuICBTdGFmZkJsb2NrLCBTdGFmZk5vdGVcbn0gZnJvbSAnLi9zdGFmZl9ibG9jayc7XG5cbmltcG9ydCB7XG4gIFN0YWZmTW9kZWwsIGdldE5vdGVEZXRhaWxzLCBLRVlfQUNDSURFTlRBTFNcbn0gZnJvbSAnLi9zdGFmZl9tb2RlbCc7XG5cbi8qKlxuICogTm90ZSByZXNvbHV0aW9uIGluIGZyYWN0aW9ucyBvZiBxdWFydGVyLiBObyBub3RlIHNob3J0ZXIgdGhhbiAxLzE2IG9mIGEgXG4gKiBxdWFydGVyIHdpbGwgYmUgcmVuZGVyZWQuIFRoaXMgbGltaXQgZXF1YWxzIHRvIHNpeHR5LWZvdXJ0aCBub3Rlcy4gXG4gKi9cbmV4cG9ydCBjb25zdCBNQVhfUVVBUlRFUl9ESVZJU0lPTiA9IDE2OyBcblxuLyoqXG4gKiBFbnVtZXJhdGlvbiBvZiBkaWZmZXJlbnQgd2F5cyBvZiBob3Jpem9udGFsIHNjb3JlIHNjcm9sbGluZywgbGlrZSBwYWdpbmFnZWRcbiAqIChQQUdFIGlzIGRlZmF1bHQgdmFsdWUpLCBub3RlIGJ5IG5vdGUgKE5PVEUpIG9yIGluIHBhY2tlZCBjaHVua3MgYnkgZG9pbmcgXG4gKiBzY3JvbGwganVzdCBvbiBiYXIgc3RhcnRpbmcgKEJBUikuXG4gKi9cbmV4cG9ydCBlbnVtIFNjcm9sbFR5cGUge1xuICAvKiogXG4gICAqIFBhZ2luYXRlZCBob3Jpem9udGFsIHNjcm9sbGluZywgYWR2YW5jaW5nIHRoZSBzY3JvbGwgdG8gbmV4dCBwYWdlIG9uY2UgYVxuICAgKiBvdXQgb2Ygc2NyZWVuIG5vdGUgaXMgaGlnaGxpdGVkLCBjb25zaWRlcmluZyBlYWNoIHBhZ2Ugd2hhdCBob3Jpem9udGFsbHkgXG4gICAqIGZpdHMgb24gb25lIHNjcmVlbi4gVGhpcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAgICovXG4gIFBBR0UgPSAwLFxuICAvKipcbiAgICogTm90ZSBieSBub3RlIGhvcml6b250YWwgc2Nyb2xsaW5nLCBhZHZhbmNpbmcgdGhlIHNjcm9sbCB0byBjZW50ZXIgb24gXG4gICAqIHNjcmVlbiBldmVyeSBuZXcgaGlnaGxpZ2h0ZWQgbm90ZS5cbiAgICovXG4gIE5PVEUgPSAxLFxuICAvKipcbiAgICogUGVyIGJhciBob3Jpem9udGFsIHNjcm9sbGluZywgYWR2YW5jaW5nIHRoZSBzY3JvbGwgdG8gY2VudGVyIHRoZSBiZWdpbm5pbmdcbiAgICogb2YgYSBuZXcgc3RhcnRpbmcgYmFyIG9uY2UgaXRzIGZpcnN0IG5vdGUgaXMgaGlnaGxpZ2h0ZWQuXG4gICAqL1xuICBCQVIgPSAyXG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBwcm92aWRpbmcgY29uZmlndXJhYmxlIHByb3BlcnRpZXMgdG8gYSBTdGFmZlJlbmRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGFmZlJlbmRlckNvbmZpZyB7XG4gIC8qKiBUaGUgdmVydGljYWwgaGVpZ2h0IGluIHBpeGVscyBvZiBhIG5vdGUgKi9cbiAgbm90ZUhlaWdodD86IG51bWJlcjtcbiAgLyoqIE51bWJlciBvZiBob3Jpem9udGFsIHBpeGVscyBiZXR3ZWVuIGVhY2ggbm90ZSAqL1xuICBub3RlU3BhY2luZz86IG51bWJlcjtcbiAgLyoqIFxuICAgKiBUaGUgaG9yaXpvbnRhbCBzY2FsZSBhdCB3aGljaCBub3RlcyBhcmUgZHJhd24gKHRoZSBiaWdnZXIgdGhpcyB2YWx1ZSwgXG4gICAqIHRoZSBcIndpZGVyXCIgYSBub3RlIGxvb2tzKVxuICAgKi9cbiAgcGl4ZWxzUGVyVGltZVN0ZXA/OiBudW1iZXI7XG4gIC8qKiBUaGUgY29sb3IgKGFzIGFuIFJHQiBjb21tYSBzZXBhcmF0ZWQgc3RyaW5nKSBvZiBhIG5vbiBwbGF5ZWQgbm90ZSAqL1xuICBub3RlUkdCPzogc3RyaW5nO1xuICAvKiogXG4gICAqIFRoZSBjb2xvciAoYXMgYW4gUkdCIGNvbW1hIHNlcGFyYXRlZCBzdHJpbmcpIG9mIGFuIGFjdGl2ZSBub3RlIGJlaW5nIFxuICAgKiBwbGF5ZWRcbiAgICovXG4gIGFjdGl2ZU5vdGVSR0I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbXVzaWNhbCBrZXkgdGhlIHNjb3JlIG11c3QgdXNlIHRvIGFkYXB0IHRoZSBzY29yZSB0byB0aGUgcmlnaHQgXG4gICAqIGFjY2lkZW50YWxzLiBJdCBjYW4gYmUgb3ZlcndyaXR0ZW4gd2l0aCBgU3RhZmZJbmZvLmtleVNpZ25hdHVyZXNgIFxuICAgKiB2YWx1ZSBhdCB0aW1lIG9yIHN0ZXAgMC4gSWYgbm90IGFzc2lnbmVkIGl0IHdpbGwgYmUgYXN1bWVkIEMga2V5LlxuICAgKi9cbiAgZGVmYXVsdEtleT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNldHMgc2Nyb2xsaW5nIHRvIGZvbGxvdyBzY29yZXBsYXlpbmcgaW4gZGlmZmVyZW50IHdheXMgYWNjb3JkaW5nIHRvIFxuICAgKiBgU2Nyb2xsVHlwZWAgZW51bSB2YWx1ZXMuXG4gICAqL1xuICBzY3JvbGxUeXBlPzogU2Nyb2xsVHlwZTtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgdG8gaG9sZCB0ZW1wb3JhcnkgaW5mb3JtYXRpb24gZm9yIHZpc3VhbCByZW5kZXJpbmdcbiAqL1xuaW50ZXJmYWNlIExpbmtlZFNWR0RldGFpbHMge1xuICAvKiogeCBwb3NpdGlvbiBhdCB0aGUgcmlnaHQgb2YgdGhlIG5vdGUgaGVhZCB0byBkcmF3IHRpZXMgKi9cbiAgeEhlYWRSaWdodDogbnVtYmVyO1xuICAvKiogU1ZHIEdyb3VwIHRvIGhvbGQgdGllZCBub3RlcyBpbnRvICovXG4gIGc/OiBTVkdFbGVtZW50O1xufVxuXG4vKipcbiAqIFRoZSB0ZW1wb3JhcnkgbWFwIHRvIGxvY2F0ZSBsaW5rZWQgdmlzdWFsIHJlc291cmNlcyBvbiBiaW5kaW5nc1xuICovXG50eXBlIExpbmtlZE5vdGVNYXAgPSBNYXA8U3RhZmZOb3RlLCBMaW5rZWRTVkdEZXRhaWxzPjtcblxuLyoqXG4gKiBEaXNwbGF5cyBhIGBTdGFmZkluZm9gIGFzIGEgc3RhZmYgb24gYSBnaXZlbiBgRElWYC4gXG4gKiBcbiAqIFN0YWZmIGlzIHNjYWxlZCB0byBmaXQgdmVydGljYWxseSBgY29uZmlnLm5vdGVIZWlnaHRgIGFuZCBub3RlIGhvcml6b250YWwgXG4gKiBwb3NpdGlvbiBjYW4gYmVoYXZlIGluIHR3byBkaWZmZXJlbnQgd2F5czogSWYgYGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcGAgXG4gKiBpcyBncmVhdGVyIHRoYW4gemVybywgaG9yaXpvbnRhbCBwb3NpdGlvbiB3aWxsIGJlIHByb3BvcnRpb25hbCB0byBpdHMgXG4gKiBzdGFydGluZyB0aW1lLCBhbGxvd2luZyB0byBwaWxlIHNldmVyYWwgaW5zdGFuY2VzIGZvciBkaWZmZXJlbnQgdm9pY2VzIFxuICogKHBhcnRzKS4gT3RoZXJ3aXNlLCByZXN1bHRpbmcgc3RhZmYgd2lsbCBkaXNwbGF5IG5vdGVzIGluIGEgY29tcGFjdCBmb3JtLCBcbiAqIHVzaW5nIG1pbmltdW0gaG9yaXpvbnRhbCBzcGFjZSBiZXR3ZWVuIG11c2ljYWwgc3ltYm9scyBhcyByZWd1bGFyIHBhcGVyIFxuICogc3RhZmYgZG9lcy5cbiAqXG4gKiBDbGVmLCBrZXkgYW5kIHRpbWUgc2lnbmF0dXJlIHdpbGwgYmUgZGlzcGxheWVkIGF0IHRoZSBsZWZ0bW9zdCBzaWRlIGFuZCB0aGUgXG4gKiByZXN0IG9mIHRoZSBzdGFmZiB3aWxsIHNjcm9sbCB1bmRlciB0aGlzIGluaXRpYWwgc2lnbmF0dXJlIGFyZWEgYWNjb3JkaW5nbHkuXG4gKiBJbiBjYXNlIG9mIHByb3BvcnRpb25hbCBub3RlIHBvc2l0aW9uaW5nLCBnaXZlbiBpdCBzdGFydHMgYXQgcGl4ZWwgemVybywgdGhlXG4gKiBzaWduYXR1cmUgYXJlYSB3aWxsIGJsaW5rIG1lYW53aGlsZSBpdCBjb2xsaWRlcyB3aXRoIGluaXRpYWwgYWN0aXZlIG5vdGVzLlxuICogS2V5IGFuZCB0aW1lIHNpZ25hdHVyZSBjaGFuZ2VzIHdpbGwgYmUgc2hvd24gYWNjb3JkaW5nbHkgdGhyb3VnaCBzY29yZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YWZmU1ZHUmVuZGVyIHtcbiAgLyoqIFRoZSBhY3R1YWwgbXVzaWMgc2NvcmUgZGF0YSB0byBiZSByZW5kZXJlZCAqL1xuICBwdWJsaWMgc3RhZmZJbmZvOiBTdGFmZkluZm87XG4gIC8qKiBJbnRlcm1lZGlhdGUgc3RhZmYgbW9kZWwgYXJyYW5nZWQgaW4gbm9uLW92ZXJsYXBwZWQgYmxvY2tzICovXG4gIHB1YmxpYyBzdGFmZk1vZGVsOiBTdGFmZk1vZGVsO1xuICAvKiogSG93IGl0IGhhcyB0byBiZSByZW5kZXJlZCAqL1xuICBwcml2YXRlIGNvbmZpZzogU3RhZmZSZW5kZXJDb25maWc7XG4gIC8qKiBGdWxsIHNjb3JlIGhlaWdodCAocGl4ZWxzKSAqL1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAvKiogRnVsbCBzY29yZSB3aWR0aCAocGl4ZWxzKSAqL1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gIC8qKiBVcHBlciBjb250YWluZXIgKi9cbiAgcHJpdmF0ZSBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgLyoqIE92ZXJhbGwgc3RhZmYgY29udGFpbmVyICovXG4gIHByaXZhdGUgZGl2OiBIVE1MRGl2RWxlbWVudDtcbiAgLyoqIE1haW4gc3RhZmYgZHJhd2luZyBhcmVhICovXG4gIHByaXZhdGUgc3RhZmZTVkc6IFNWR1NWR0VsZW1lbnQ7XG4gIC8qKiBTdGFmZiBjb250YWluZXIgZm9yIHZlcnRpY2FsIHJlcG9zaXRpb25pbmcgKi9cbiAgcHJpdmF0ZSBzdGFmZkc6IFNWR0VsZW1lbnQ7XG4gIC8qKiBBY3RpbmcgYXMgYmFja2dyb3VuZCBsYXllciAqL1xuICBwcml2YXRlIGxpbmVzRzogU1ZHRWxlbWVudDtcbiAgLyoqIEFjdGluZyBhcyBtaWRkbGUgcGxhbmUgbGF5ZXIgKi9cbiAgcHJpdmF0ZSBtdXNpY0c6IFNWR0VsZW1lbnQ7XG4gIC8qKiBBY3RpbmcgYXMgZm9yZWdyb3VuZCBsYXllciAqL1xuICBwcml2YXRlIHNpZ25hdHVyZXNHOiBTVkdFbGVtZW50O1xuICAvKiogT3ZlcmxheSBzaWduYXR1cmUgZHJhd2luZyBhcmVhICovXG4gIHByaXZhdGUgb3ZlcmxheVNWRzogU1ZHU1ZHRWxlbWVudDtcbiAgLyoqIE92ZXJsYXkgY29udGFpbmVyIGZvciB2ZXJ0aWNhbCByZXBvc2l0aW9uaW5nICovXG4gIHByaXZhdGUgb3ZlcmxheUc6IFNWR0VsZW1lbnQ7XG4gIC8qKiBXaGVuIHRvIHN0b3AgYmxpbmtpbmcgKGluIHF1YXJ0ZXJzKSAqL1xuICBwcml2YXRlIHNpZ25hdHVyZXNRdWFydGVyczogbnVtYmVyO1xuICAvKiogU2lnbmF0dXJlcyBkaXNwbGF5aW5nIG1vZGUgc3dpdGNoICovXG4gIHByaXZhdGUgc2lnbmF0dXJlc0JsaW5raW5nOiBib29sZWFuO1xuICAvKiogR2VuZXJhbCBzY2FsZSBhcHBsaWFibGUgdG8gYWxsIFNWRyBlbGVtZW50cyAqL1xuICBwcml2YXRlIHNjYWxlOiBudW1iZXI7XG4gIC8qKiBWZXJ0aWNhbCBmYWN0b3IgaW4gcGl4ZWxzICgyIHZTdGVwL3N0YWZmIGxpbmUpICovXG4gIHByaXZhdGUgdlN0ZXBTaXplOiBudW1iZXI7XG4gIC8qKiBIb3Jpem9udGFsIGZhY3RvciBpbiBwaXhlbHMgKDEgaFN0ZXAvdGltZSB1bml0KSAqL1xuICBwcml2YXRlIGhTdGVwU2l6ZTogbnVtYmVyO1xuICAvKiogVmVydGljYWwgU1ZHIGRpc3RhbmNlIHRvIG1pZGRsZSBzdGFmZiBsaW5lICovXG4gIHByaXZhdGUgc3RhZmZPZmZzZXQ6IG51bWJlcjtcbiAgLyoqIENvZGVkIGluIHNlbWl0b25lcyAoMCA9IEMsIDEgPSBDIywgLi4uIDExID0gQikgKi9cbiAgcHJpdmF0ZSBjdXJyZW50S2V5OiBudW1iZXI7XG4gIC8qKiBMaWtlIDMvNCAqL1xuICBwcml2YXRlIGN1cnJlbnRUaW1lU2lnbmF0dXJlOiBUaW1lU2lnbmF0dXJlSW5mbztcbiAgLyoqIHggcG9zaXRpb25zICovXG4gIHByaXZhdGUgc2lnbmF0dXJlc0xpc3Q6IEFycmF5PHt4OiBudW1iZXI7IHE6IG51bWJlcn0+O1xuICAvKiogQ3VycmVudCBzaWduYXR1cmUgYmVnaW5uaW5nIHggcG9zaXRpb24gKi9cbiAgcHJpdmF0ZSBzaWduYXR1cmVDdXJyZW50OiBudW1iZXI7XG4gIC8qKiBDdXJyZW50IHNpZ25hdHVyZSBlbmQgeCBwb3NpdGlvbiAqL1xuICBwcml2YXRlIHNpZ25hdHVyZU5leHQ6IG51bWJlcjtcbiAgLyoqIEhpZ2hsaXRlZCBvbmVzICovXG4gIHByaXZhdGUgcGxheWluZ05vdGVzOiBOb3RlSW5mb1tdO1xuICAvKiogS2luZCBvZiBzY3JvbGxpbmcgaWYgYW55ICovXG4gIHByaXZhdGUgc2Nyb2xsVHlwZTogU2Nyb2xsVHlwZTtcbiAgLyoqIE11dGV4IHRvIHJlZHVjZSBzY3JvbGwgaGFuZGxpbmcgZXZlcmhlYWQgKi9cbiAgcHJpdmF0ZSB0aWNraW5nOiBib29sZWFuO1xuICAvKiogT3B0aW1pemVkIHNjcm9sbCB2YWx1ZSAqL1xuICBwcml2YXRlIGxhc3RLbm93blNjcm9sbExlZnQ6IG51bWJlcjtcbiAgLyoqIExhc3QgZHJhd24gYmxvY2sgc3RhcnQgdGltZSBpbiBxdWFydGVycyAqL1xuICBwcml2YXRlIGxhc3RROiBudW1iZXI7XG4gIC8qKiBUaW1lIHdoZW4gbGFzdCBiYXIgc3RhcnRlZCBpbiBxdWFydGVycyAqL1xuICBwcml2YXRlIGxhc3RCYXI6IG51bWJlcjtcblxuICAvKipcbiAgICogYFN0YWZmU1ZHUmVuZGVyYCBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzY29yZSBUaGUgYFN0YWZmSW5mb2AgdG8gYmUgdmlzdWFsaXplZC5cbiAgICogQHBhcmFtIGNvbmZpZyBWaXN1YWxpemF0aW9uIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAgICogQHBhcmFtIGRpdiBUaGUgZWxlbWVudCB3aGVyZSB0aGUgdmlzdWFsaXphdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgc2NvcmU6IFN0YWZmSW5mbywgXG4gICAgY29uZmlnOiBTdGFmZlJlbmRlckNvbmZpZyxcbiAgICBkaXY6IEhUTUxEaXZFbGVtZW50XG4gICkge1xuICAgIHRoaXMuc3RhZmZJbmZvID0gc2NvcmU7XG4gICAgY29uc3QgZGVmYXVsdFBpeGVsc1BlclRpbWVTdGVwID0gMzA7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBub3RlSGVpZ2h0OiBjb25maWcubm90ZUhlaWdodCB8fCA2LFxuICAgICAgbm90ZVNwYWNpbmc6IGNvbmZpZy5ub3RlU3BhY2luZyB8fCAxLFxuICAgICAgcGl4ZWxzUGVyVGltZVN0ZXA6IGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCB8fCBkZWZhdWx0UGl4ZWxzUGVyVGltZVN0ZXAsXG4gICAgICBub3RlUkdCOiBjb25maWcubm90ZVJHQiB8fCAnOCwgNDEsIDY0JyxcbiAgICAgIGFjdGl2ZU5vdGVSR0I6IGNvbmZpZy5hY3RpdmVOb3RlUkdCIHx8ICcyNDAsIDg0LCAxMTknLFxuICAgIH07XG4gICAgdGhpcy5kaXYgPSBkaXY7XG5cbiAgICB0aGlzLnNjcm9sbFR5cGUgPSBjb25maWcuc2Nyb2xsVHlwZSB8fCBTY3JvbGxUeXBlLlBBR0U7XG4gICAgdGhpcy5zY2FsZSA9IHRoaXMuY29uZmlnLm5vdGVIZWlnaHQgLyBQQVRIX1NDQUxFO1xuICAgIGlmIChcbiAgICAgIGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA8PSAwXG4gICAgKSB7IC8vIENvbXBhY3QgdmlzdWFsaXphdGlvbiBhcyBkZWZhdWx0XG4gICAgICB0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9IDA7XG4gICAgICB0aGlzLmNvbmZpZy5ub3RlU3BhY2luZyA9IENPTVBBQ1RfU1BBQ0lORyAqIHRoaXMuc2NhbGU7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFmZk1vZGVsID0gbmV3IFN0YWZmTW9kZWwodGhpcy5zdGFmZkluZm8sIGNvbmZpZy5kZWZhdWx0S2V5KTtcbiAgICAvLyBNdXNpY2FsIGRlZmF1bHRzIGNhbiBiZSBvdmVyd3JpdHRlbiBieSBzdGFmZk1vZGVsXG4gICAgdGhpcy5jdXJyZW50S2V5ID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLmtleVNpZ25hdHVyZUF0USgwKTtcbiAgICB0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLnRpbWVTaWduYXR1cmVBdFEoMCk7XG4gICAgdGhpcy5jbGVhcigpOyAvLyBUaGlzIHdpbGwgY29tcGxldGUgcmVzdCBvZiBtZW1iZXIgdmFsdWVzIGluaXRpYWxpemF0aW9uLlxuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFuZCByZXNldHMgdGhlIHZpc3VhbGl6ZXIgb2JqZWN0IGZvciBmdXJ0aGVyIHJlZHJhd3MgZnJvbSBzY3JhdGNoLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIC8vIERpdiBvdmVyYWxsIGNvbnRhaW5lciAoZW1wdHlpbmcgcHJldmlvdXMgZXhpc3RpbmcgU1ZHIGVsZW1lbnRzKVxuICAgIHdoaWxlICh0aGlzLmRpdi5sYXN0Q2hpbGQpIHsgdGhpcy5kaXYucmVtb3ZlQ2hpbGQodGhpcy5kaXYubGFzdENoaWxkKTsgfVxuICAgIHRoaXMuZGl2LnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuICAgIHRoaXMuZGl2LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAvLyBTaWduYXR1cmVzIG92ZXJsYXlcbiAgICB0aGlzLm92ZXJsYXlTVkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdzdmcnKTtcbiAgICB0aGlzLm92ZXJsYXlTVkcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHRoaXMuZGl2LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheVNWRyk7XG4gICAgdGhpcy5vdmVybGF5RyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5vdmVybGF5U1ZHLCAnb3ZlcmxheScpO1xuICAgIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nID0gZmFsc2U7XG4gICAgdGhpcy5zaWduYXR1cmVzUXVhcnRlcnMgPSAwO1xuICAgIC8vIElubmVyIHNjcm9sbGVhYmxlIENvbnRhaW5lclxuICAgIHRoaXMucGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFyZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLnBhcmVudEVsZW1lbnQpO1xuICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICAgIHRoaXMubGFzdEtub3duU2Nyb2xsTGVmdCA9IDA7XG4gICAgdGhpcy5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsRXZlbnQpO1xuICAgIC8vIFN0YWZmIGRyYXdpbmcgYXJlYVxuICAgIHRoaXMuc3RhZmZTVkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdzdmcnKTtcbiAgICB0aGlzLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdGFmZlNWRyk7XG4gICAgdGhpcy5zdGFmZkcgPSBjcmVhdGVTVkdHcm91cENoaWxkKHRoaXMuc3RhZmZTVkcsICdzdGFmZicpO1xuICAgIC8vIEJhY2tncm91bmQgbGluZXNcbiAgICB0aGlzLmxpbmVzRyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zdGFmZlNWRywgJ2xpbmVzJyk7XG4gICAgc2V0U3Ryb2tlKHRoaXMubGluZXNHLCBMSU5FX1NUUk9LRSwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICB0aGlzLnN0YWZmRy5hcHBlbmRDaGlsZCh0aGlzLmxpbmVzRyk7XG4gICAgLy8gTWlkZGxlIHBsYW5lIHN5bWJvbHNcbiAgICB0aGlzLm11c2ljRyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zdGFmZlNWRywgJ211c2ljJyk7XG4gICAgc2V0RmlsbCh0aGlzLm11c2ljRywgdGhpcy5nZXRDb2xvcigpKTtcbiAgICBzZXRTdHJva2UodGhpcy5tdXNpY0csIDAsIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgdGhpcy5zdGFmZkcuYXBwZW5kQ2hpbGQodGhpcy5tdXNpY0cpO1xuICAgIC8vIEZvcmVncm91bmQgc2lnbmF0dXJlc1xuICAgIHRoaXMuc2lnbmF0dXJlc0cgPSBjcmVhdGVTVkdHcm91cENoaWxkKHRoaXMuc3RhZmZTVkcsICdzaWduYXR1cmVzJyk7XG4gICAgdGhpcy5zdGFmZkcuYXBwZW5kQ2hpbGQodGhpcy5zaWduYXR1cmVzRyk7XG4gICAgLy8gU2lnbmF0dXJlcyB2YWx1ZXNcbiAgICB0aGlzLnNpZ25hdHVyZXNMaXN0ID0gW3t4OiAwLCBxOiAwfV07XG4gICAgdGhpcy5zaWduYXR1cmVDdXJyZW50ID0gMDtcbiAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSAwOyAvLyBUbyByZXNldCBibGlua2luZyBpZiBzY3JvbGxlZFxuICAgIHRoaXMuY2hhbmdlS2V5U2lnbmF0dXJlSWZOZWVkZWQoMCk7XG4gICAgdGhpcy5jaGFuZ2VUaW1lU2lnbmF0dXJlSWZOZWVkZWQoMCk7XG4gICAgLy8gR2VuZXJhbCB2aXN1YWwgcmVmZXJlbmNlc1xuICAgIHRoaXMudlN0ZXBTaXplID0gdGhpcy5jb25maWcubm90ZUhlaWdodCAvIDI7XG4gICAgdGhpcy5oU3RlcFNpemUgPSB0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcDtcbiAgICB0aGlzLnN0YWZmT2Zmc2V0ID0gMDtcbiAgICB0aGlzLmhlaWdodCA9IDA7ICAgIFxuICAgIHRoaXMud2lkdGggPSAwOyAgICBcbiAgICAvLyBQcm9jZXNzZWQgbm90ZXMgc3RvcmFnZSBhbmQgcmVmZXJlbmNlXG4gICAgdGhpcy5wbGF5aW5nTm90ZXMgPSBbXTtcbiAgICB0aGlzLmxhc3RCYXIgPSAwO1xuICAgIHRoaXMubGFzdFEgPSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRyYXdzIHRoZSBlbnRpcmUgYHN0YWZmSW5mb2AgaW4gYSBzdGFmZiBpZiBubyBgYWN0aXZlTm90ZWAgaXMgZ2l2ZW4sXG4gICAqIGhpZ2hsaWdodGluZyBvbiBhbmQgb2ZmIHRoZSBhcHByb3ByaWF0ZSBub3RlcyBvdGhlcndpc2UuIFNob3VsZCB0aGUgXG4gICAqIGBzdGFmZkluZm9gIGhhZCBjaGFuZ2VkIGFkZGluZyBtb3JlIG5vdGVzIGF0IHRoZSBlbmQsIGNhbGxpbmcgdGhpc1xuICAgKiBtZXRob2QgYWdhaW4gd291bGQgY29tcGxldGUgdGhlIHJlZHJhd2luZyBmcm9tIHRoZSB2ZXJ5IGxhc3Qgbm90ZSBpdCB3YXNcbiAgICogZHJhd24sIG1haW50YWluaW5nIHRoZSBhY3RpdmUgbm90ZSBhbmQgdGhlIHNjcm9sbCBwb3NpdGlvbiBhcyB0aGV5IHdlcmUuIFxuICAgKiBUaGlzIGlzIGhhbmR5IGZvciBpbmNyZW1lbnRhbCBjb21wb3NpdGlvbnMuIFxuICAgKiBcbiAgICogR2l2ZW4gdGhlIGNvbXBsZXhpdHkgb2YgYWRhcHRhdGlvbiB0byBhIG1vZGlmaWVkIHNjb3JlLCBtb2RpZnlpZWQgbm90ZXMgXG4gICAqIHByZXZpb3VzbHkgZHJhd24gd2lsbCBiZSBpZ25vcmVkLCBob3dldmVyLCB5b3UgY2FuIGFsd2F5cyBgY2xlYXIoKWAgYW5kIFxuICAgKiBgcmVkcmF3KClgIGZvciBhIGZ1bGwgcmVkcmF3LlxuICAgKiBAcGFyYW0gYWN0aXZlTm90ZSBJZiBzcGVjaWZpZWQsIHRoaXMgYE5vdGVgIHdpbGwgYmUgcGFpbnRlZFxuICAgKiBpbiB0aGUgYWN0aXZlIGNvbG9yIGFuZCB0aGVyZSB3b24ndCBiZSBhbiBhY3R1YWwgcmVkcmF3aW5nLCBidXQgYSBcbiAgICogcmUtY29sb3VyaW5nIG9mIHRoZSBpbnZvbHZlZCBub3RlIGhlYWRzLCBhY2NpZGVudGFscywgZG90cyBhbmQgdGllcyBcbiAgICogKGFjdGl2YXRlZCBhbmQgZGUtYWN0aXZhdGVkIG9uZXMpLiBPdGhlcndpc2UsIGFsbCBtdXNpY2FsIHN5bWJvbHMgd2hpY2ggXG4gICAqIHdlcmUgbm90IHByb2Nlc3NlZCB5ZXQgd2lsbCBiZSBkcmF3biB0byBjb21wbGV0ZSB0aGUgc2NvcmUuXG4gICAqIEBwYXJhbSBzY3JvbGxJbnRvVmlldyBJZiBzcGVjaWZpZWQgYW5kIHRoZSBhY3RpdmUgbm90ZSB0byBiZSBcbiAgICogaGlnaGxpdGVkIGlzIG5vdCB2aXN1YWxpemVkIGluIHRoZSBjb250YWluZXIgRElWLCB0aGUgbGF0ZXIgd2lsbCBiZSBcbiAgICogc2Nyb2xsZWQgc28gdGhhdCB0aGUgbm90ZSBpcyB2aWV3ZWQgaW4gdGhlIHJpZ2h0IHBsYWNlLiBUaGlzIGNhbiBiZSBcbiAgICogYWx0ZXJlZCBieSBgU3RhZmZSZW5kZXJDb25maWcuc2Nyb2xsVHlwZWAuXG4gICAqIEByZXR1cm5zIFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBoaWdobGlnaHRlZCBhY3RpdmUgbm90ZSByZWxhdGl2ZSB0byB0aGUgXG4gICAqIGJlZ2lubmluZyBvZiB0aGUgU1ZHLCBvciAtMSBpZiB0aGVyZSB3YXNuJ3QgYW55IGdpdmVuIGFjdGl2ZSBub3RlLiBVc2VmdWxcbiAgICogZm9yIGF1dG9tYXRpY2FsbHkgYWR2YW5jaW5nIHRoZSB2aXN1YWxpemF0aW9uIGlmIG5lZWRlZC5cbiAgICovXG4gIHB1YmxpYyByZWRyYXcoXG4gICAgYWN0aXZlTm90ZT86IE5vdGVJbmZvLCBcbiAgICBzY3JvbGxJbnRvVmlldz86IGJvb2xlYW4gXG4gICk6IG51bWJlciB7XG4gICAgbGV0IGFjdGl2ZU5vdGVQb3NpdGlvbiA9IC0xO1xuICAgIGNvbnN0IGlzQ29tcGFjdCA9ICh0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9PT0gMCk7XG4gICAgaWYgKGFjdGl2ZU5vdGUpIHsgLy8gR2l2ZW4gYWN0aXZlTm90ZSBtZWFucyBoaWdobGl0aW5nIGl0XG4gICAgICBjb25zdCBrZWVwT25QbGF5aW5nTm90ZXM6IE5vdGVJbmZvW10gPSBbXTtcbiAgICAgIHRoaXMucGxheWluZ05vdGVzLmZvckVhY2goIC8vIFJldmVydCBub24gcGxheWluZyBub3RlcyBoaWdobGl0aW5nXG4gICAgICAgIG5vdGUgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzUGFpbnRpbmdBY3RpdmVOb3RlKG5vdGUsIGFjdGl2ZU5vdGUpKSB7XG4gICAgICAgICAgICBrZWVwT25QbGF5aW5nTm90ZXMucHVzaChub3RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaWdobGlnaHRFbGVtZW50KHRoaXMuZ2V0R3JvdXAobm90ZSksIHRoaXMuZ2V0Q29sb3IoZmFsc2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB0aGlzLnBsYXlpbmdOb3RlcyA9IGtlZXBPblBsYXlpbmdOb3RlcztcbiAgICAgIGNvbnN0IGcgPSB0aGlzLmdldEdyb3VwKGFjdGl2ZU5vdGUpO1xuICAgICAgaWYgKGcpIHtcbiAgICAgICAgdGhpcy5wbGF5aW5nTm90ZXMucHVzaChhY3RpdmVOb3RlKTsgLy8gU3RvcmUgdG8gcmV2ZXJ0IGhpZ2hsaWdodCBsYXRlclxuICAgICAgICBoaWdobGlnaHRFbGVtZW50KGcsIHRoaXMuZ2V0Q29sb3IodHJ1ZSkpO1xuICAgICAgICBhY3RpdmVOb3RlUG9zaXRpb24gPSBnLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBcbiAgICAgICAgICB0aGlzLnN0YWZmU1ZHLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIGNvbnN0IHF1YXJ0ZXJzID0gYWN0aXZlTm90ZS5zdGFydDtcbiAgICAgICAgY29uc3QgaXNCYXJCZWdpbm5pbmcgPSBnLmdldEF0dHJpYnV0ZSgnZGF0YS1pcy1iYXItYmVnaW5uaW5nJyk7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFR5cGUgIT09IFNjcm9sbFR5cGUuQkFSIHx8IGlzQmFyQmVnaW5uaW5nKSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKHNjcm9sbEludG9WaWV3LCBhY3RpdmVOb3RlUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhaXNDb21wYWN0ICYmIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nICYmXG4gICAgICAgICAgcXVhcnRlcnMgPj0gdGhpcy5zaWduYXR1cmVzUXVhcnRlcnNcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcgPSBmYWxzZTtcbiAgICAgICAgICBzZXRGYWRlKHRoaXMub3ZlcmxheUcsIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHsgLy8gTm8gYWN0aXZlTm90ZSBnaXZlbiBtZWFucyByZWRyYXdpbmcgaXQgYWxsIGZyb20gc2NyYXRjaFxuICAgICAgY29uc3QgaXNGaXJzdFJlZHJhdyA9ICh0aGlzLmxhc3RRID09PSAtMSk7XG4gICAgICB0aGlzLnN0YWZmTW9kZWwudXBkYXRlKHRoaXMuc3RhZmZJbmZvLCB0aGlzLmNvbmZpZy5kZWZhdWx0S2V5KTtcbiAgICAgIGxldCB4ID0gMDtcbiAgICAgIGxldCB3aWR0aCA9IDA7XG4gICAgICBpZiAoaXNGaXJzdFJlZHJhdykge1xuICAgICAgICAvLyBDbGVmK0tleStUaW1lIHNpZ25hdHVyZXNcbiAgICAgICAgd2lkdGggPSB0aGlzLmRyYXdTaWduYXR1cmVzKHRoaXMub3ZlcmxheUcsIHgsIHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgICBpZiAoaXNDb21wYWN0KSB7XG4gICAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgICAgLy8gRmlyc3QgcGFkZGluZyBpZiBjb21wYWN0ZWQuIEZvbGxvd2luZyBhcmUgcGxhY2VkIGFmdGVyIGRyYXdpbmdzXG4gICAgICAgICAgd2lkdGggKz0gdGhpcy5jb25maWcubm90ZVNwYWNpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB4ID0gdGhpcy53aWR0aDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxpbmtlZE5vdGVNYXA6IExpbmtlZE5vdGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICB0aGlzLnN0YWZmTW9kZWwuc3RhZmZCbG9ja01hcC5mb3JFYWNoKCAvLyBNdXNpYyBCbG9ja3NcbiAgICAgICAgKHN0YWZmQmxvY2ssIHF1YXJ0ZXJzKSA9PiB7XG4gICAgICAgICAgaWYgKCFpc0NvbXBhY3QpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8ucXVhcnRlcnNUb1RpbWUocXVhcnRlcnMpICogXG4gICAgICAgICAgICAgIHRoaXMuaFN0ZXBTaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocXVhcnRlcnMgPiB0aGlzLmxhc3RRKSB7XG4gICAgICAgICAgICB3aWR0aCArPSB0aGlzLmRyYXdTdGFmZkJsb2NrKHN0YWZmQmxvY2ssIHggKyB3aWR0aCwgbGlua2VkTm90ZU1hcCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RRID0gcXVhcnRlcnM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3Qgc3ZnUmVjdCA9IHRoaXMuc3RhZmZTVkcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBnUmVjdCA9IHRoaXMubXVzaWNHLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy51cGRhdGVWZXJ0aWNhbEJvdW5kYXJpZXMoIC8vIFZlcnRpY2FsIHJlc2l6aW5nXG4gICAgICAgIGdSZWN0LnRvcCAtIHN2Z1JlY3QudG9wLCBnUmVjdC5ib3R0b20gLSBzdmdSZWN0LnRvcFxuICAgICAgKTtcbiAgICAgIGlmIChpc0NvbXBhY3QpIHsgLy8gQ29tcGFjdCBzdGFmZiBob3Jpem9udGFsIHJlc2l6aW5nXG4gICAgICAgIHRoaXMud2lkdGggKz0gd2lkdGg7XG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8gUHJvcG9ydGlvbmFsIHN0YWZmIGhvcml6b250YWwgcmVzaXppbmdcbiAgICAgICAgY29uc3QgbGFzdEJsb2NrID0gdGhpcy5zdGFmZk1vZGVsLnN0YWZmQmxvY2tNYXAuZ2V0KHRoaXMubGFzdFEpO1xuICAgICAgICBjb25zdCBlbmRUaW1lID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLnF1YXJ0ZXJzVG9UaW1lKFxuICAgICAgICAgIHRoaXMubGFzdFEgKyBsYXN0QmxvY2subGVuZ3RoXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMud2lkdGggPSBlbmRUaW1lICogdGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXA7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWZmU1ZHLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGAke3RoaXMud2lkdGh9YCk7XG4gICAgICB0aGlzLnJlZHJhd1N0YWZmTGluZXModGhpcy5saW5lc0csIDAsIHRoaXMud2lkdGgpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aXZlTm90ZVBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIGEgZ2l2ZW4gaGlnaGxpZ2h0ZWQgYG5vdGVgIHNob3VsZCBzdGF5IHRoYXQgd2F5XG4gICAqIFxuICAgKiBBIG5vdGUgaXMgYWN0aXZlIGlmIGl0J3MgbGl0ZXJhbGx5IHRoZSBzYW1lIGFzIHRoZSBub3RlIHdlIGFyZVxuICAgKiBwbGF5aW5nIChha2EgYWN0aXZlTm90ZSksIG9yIGlmIGl0IG92ZXJsYXBzIGJlY2F1c2UgaXQncyBhIGhlbGQgbm90ZS5cbiAgICogQHBhcmFtIG5vdGUgT25lIG9mIHRoZSBoaWdobGlnaHRlZCBub3RlcyB3aGljaCBhcmUgY3VycmVudGx5IGJlZW4gcGxheWVkXG4gICAqIEBwYXJhbSBhY3RpdmVOb3RlIEEgbmV3IGFjdGl2ZSBub3RlIHBlbmRpbmcgdG8gYmUgaGlnaGxpZ2h0ZWRcbiAgICogQHJldHVybnMgSWYgaXQgc2hvdWxkIHN0YXkgaGlnaGxpZ2h0ZWQgb3Igbm90XG4gICAqL1xuICBwcml2YXRlIGlzUGFpbnRpbmdBY3RpdmVOb3RlKFxuICAgIG5vdGU6IE5vdGVJbmZvLCBhY3RpdmVOb3RlOiBOb3RlSW5mb1xuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGlzUGxheWVkTm90ZSA9XG4gICAgICBub3RlLnN0YXJ0ID09PSBhY3RpdmVOb3RlLnN0YXJ0O1xuICBjb25zdCBoZWxkRG93bkR1cmluZ1BsYXllZE5vdGUgPVxuICAgICAgbm90ZS5zdGFydCA8PSBhY3RpdmVOb3RlLnN0YXJ0ICYmXG4gICAgICBub3RlLnN0YXJ0ICsgbm90ZS5sZW5ndGggPj0gYWN0aXZlTm90ZS5zdGFydCArIGFjdGl2ZU5vdGUubGVuZ3RoO1xuICByZXR1cm4gaXNQbGF5ZWROb3RlIHx8IGhlbGREb3duRHVyaW5nUGxheWVkTm90ZTtcbn1cblxuICAvKipcbiAgICogRHJhd3MgYSBzZXQgb2YgbXVzaWNhbCBzeW1ib2xzIGdyb3VwZWQgaW4gYSBibG9jayBpbnRvIGEgc3RhZmZcbiAgICogQHBhcmFtIHN0YWZmQmxvY2sgVGhlIGJsb2NrIHRvIGJlIGRyYXduXG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gdG8gZHJhdyB0aGUgYmxvY2tcbiAgICogQHBhcmFtIGxpbmtlZE5vdGVNYXAgVGVtcG9yYXJ5IHN0b3JhZ2Ugb2YgdmlzdWFsIGRhdGEgYWlkc1xuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIGRyYXduIGJsb2NrXG4gICAqL1xuICBwcml2YXRlIGRyYXdTdGFmZkJsb2NrKFxuICAgIHN0YWZmQmxvY2s6IFN0YWZmQmxvY2ssIHg6IG51bWJlciwgbGlua2VkTm90ZU1hcDogTGlua2VkTm90ZU1hcFxuICApOiBudW1iZXIge1xuICAgIGNvbnN0IHF1YXJ0ZXIgPSBzdGFmZkJsb2NrLnN0YXJ0O1xuICAgIC8vIFByZWNlZGluZyBiYXJcbiAgICBsZXQgd2lkdGggPSB0aGlzLmRyYXdCYXJJZk5lZWRlZChxdWFydGVyLCB4KTtcbiAgICAvLyBTaWduYXR1cmUgY2hhbmdlIGFuYWx5c2lzIGFuZCBwb3NzaWJsZSBkcmF3aW5nXG4gICAgd2lkdGggKz0gdGhpcy5kcmF3U2lnbmF0dXJlc0lmTmVlZGVkKHF1YXJ0ZXIsIHggKyB3aWR0aCk7XG4gICAgaWYgKHN0YWZmQmxvY2subm90ZXMubGVuZ3RoKXtcbiAgICAgIHdpZHRoICs9IHRoaXMuZHJhd05vdGVzKHN0YWZmQmxvY2ssIHggKyB3aWR0aCwgbGlua2VkTm90ZU1hcCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgd2lkdGggKz0gdGhpcy5kcmF3UmVzdHMoc3RhZmZCbG9jaywgeCArIHdpZHRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYWxsIG5vdGVzIG9mIGFgU3RhZmZCbG9ja2AgKGhlYWRzLCBzdGVtLCBmbGFncywgZG90cywgYWNjaWRlbnRhbHMpIFxuICAgKiBpbnRvIGEgc3RhZmZcbiAgICogQHBhcmFtIHN0YWZmQmxvY2sgVGhlIGJsb2NrIGNvbnRhaW5pbmcgdGhlIG5vdGVzIHRvIGJlIGRyYXduXG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gdG8gZHJhdyB0aGUgbm90ZXNcbiAgICogQHBhcmFtIGxpbmtlZE5vdGVNYXAgVGVtcG9yYXJ5IHN0b3JhZ2Ugb2YgdmlzdWFsIGRhdGEgYWlkc1xuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIGRyYXduIG5vdGVzXG4gICAqL1xuICBwcml2YXRlIGRyYXdOb3RlcyhcbiAgICBzdGFmZkJsb2NrOiBTdGFmZkJsb2NrLCB4OiBudW1iZXIsIGxpbmtlZE5vdGVNYXA6IExpbmtlZE5vdGVNYXBcbiAgKTogbnVtYmVyIHtcbiAgICBsZXQgd2lkdGggPSAwO1xuICAgIGNvbnN0IG5vdGVIZWFkID0gTk9URV9QQVRIU1tzdGFmZkJsb2NrLmhlYWRJbmRleF07XG4gICAgLy8gU3RlbSBwbGFjZWhvbGRlciBjcmVhdGVkIGJlZm9yZWhhbmQgYXMgYSBsb3dlciBsYXllclxuICAgIGxldCBzdGVtRzogU1ZHRWxlbWVudDtcbiAgICBpZiAobm90ZUhlYWQuc3RlbUFuY2hvcikge1xuICAgICAgc3RlbUcgPSBjcmVhdGVTVkdHcm91cENoaWxkKHRoaXMubXVzaWNHLCAnc3RlbScpO1xuICAgIH1cblxuICAgIC8vIFBvbHlwaG9uaWMgYmxvY2sgbm90ZXMgcGl0Y2ggcGFydCAoZXZlcnl0aGluZyBidXQgc2hhcmVkIHN0ZW0gYW5kIGZsYWdzKVxuICAgIHN0YWZmQmxvY2subm90ZXMuZm9yRWFjaChcbiAgICAgIG5vdGUgPT4ge1xuICAgICAgICBjb25zdCBvcGFjaXR5ID0gdGhpcy5nZXRPcGFjaXR5KG5vdGUuaW50ZW5zaXR5KTtcbiAgICAgICAgY29uc3QgeSA9IG5vdGUudlN0ZXBzICogdGhpcy52U3RlcFNpemU7XG4gICAgICAgIC8vIE92ZXIgYW5kIHVuZGVyIHN0YWZmIGV4dHJhIGxpbmVzXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gMiAqIChcbiAgICAgICAgICBub3RlLnZTdGVwcyA+IDAgPyBNYXRoLmZsb29yKG5vdGUudlN0ZXBzLzIpIDogTWF0aC5jZWlsKG5vdGUudlN0ZXBzLzIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gbm90ZS52U3RlcHMgPiAwID8gLTIgOiAyO1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IE1hdGguYWJzKGkpID4gNDsgaSArPSBkZWx0YSkge1xuICAgICAgICAgIGRyYXdTVkdQYXRoKHRoaXMubGluZXNHLCBleHRyYUxpbmVQYXRoLCBcbiAgICAgICAgICAgIHggKyB3aWR0aCwgaSAqIHRoaXMudlN0ZXBTaXplLCB0aGlzLnNjYWxlLCAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBIaWdobGlnaHRhYmxlIG92ZXJhbGwgZ3JvdXBpbmcgcGxhY2Vob2xkZXJcbiAgICAgICAgY29uc3QgX2cgPSAobm90ZS50aWVkRnJvbSkgPyBsaW5rZWROb3RlTWFwLmdldChub3RlLnRpZWRGcm9tKS5nIDogXG4gICAgICAgICAgY3JlYXRlU1ZHR3JvdXBDaGlsZCh0aGlzLm11c2ljRywgYCR7bm90ZS5zdGFydH0tJHtub3RlLnBpdGNofWApO1xuICAgICAgICBpZiAoc3RhZmZCbG9jay5pc0JhckJlZ2lubmluZygpKSB7XG4gICAgICAgICAgX2cuc2V0QXR0cmlidXRlKCdkYXRhLWlzLWJhci1iZWdpbm5pbmcnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByZWNlZGluZyBUaWVcbiAgICAgICAgaWYgKG5vdGUudGllZEZyb20pIHtcbiAgICAgICAgICBjb25zdCB0aWVXaWR0aCA9XG4gICAgICAgICAgICB4ICsgd2lkdGggLSBsaW5rZWROb3RlTWFwLmdldChub3RlLnRpZWRGcm9tKS54SGVhZFJpZ2h0O1xuICAgICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgICAgX2csIHRpZVBhdGgsIGxpbmtlZE5vdGVNYXAuZ2V0KG5vdGUudGllZEZyb20pLnhIZWFkUmlnaHQsIHksIFxuICAgICAgICAgICAgdGllV2lkdGgvUEFUSF9TQ0FMRSxcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgKiAobm90ZS52U3RlcHMgPCAwID8gLTEgOiAxKSwgb3BhY2l0eVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90ZSBoZWFkXG4gICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgIF9nLCBub3RlSGVhZC5wYXRoLCBcbiAgICAgICAgICB4ICsgd2lkdGgsIHksIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIG9wYWNpdHlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgX3hIZWFkUmlnaHQgPSB4ICsgd2lkdGggKyBub3RlSGVhZC53aWR0aCp0aGlzLnNjYWxlO1xuICAgICAgICAvLyBEb3R0ZWQgbm90ZVxuICAgICAgICBpZiAoc3RhZmZCbG9jay5oZWFkQWx0ZXJhdGlvbiA9PT0gMSkgeyAvLyBUT0RPOiBUcmlwbGV0cyBhbmQgcXVpbnR1cGxldHNcbiAgICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICAgIF9nLCBkb3RQYXRoLCBcbiAgICAgICAgICAgIHggKyB3aWR0aCArIG5vdGVIZWFkLndpZHRoKnRoaXMuc2NhbGUgKyB0aGlzLnZTdGVwU2l6ZS8yLCBcbiAgICAgICAgICAgIHkgLSB0aGlzLnZTdGVwU2l6ZS8yLCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCBvcGFjaXR5XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBY2NpZGVudGFsc1xuICAgICAgICBpZiAobm90ZS5hY2NpZGVudGFsICE9PSAwKSB7XG4gICAgICAgICAgZHJhd1NWR1BhdGgoXG4gICAgICAgICAgICBfZywgQUNDSURFTlRBTF9QQVRIU1tub3RlLmFjY2lkZW50YWxdLFxuICAgICAgICAgICAgeCArIHdpZHRoLCB5LCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCBvcGFjaXR5XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdG9yZSBmb3IgZnVydGhlciB2aXN1YWwgbGlua2FnZSBpZiBsaW5rZWQgdG8gc29tZSBvdGhlciBub3RlXG4gICAgICAgIGlmIChub3RlLnRpZWRUbykge1xuICAgICAgICAgIGxpbmtlZE5vdGVNYXAuc2V0KG5vdGUsIHtnOiBfZywgeEhlYWRSaWdodDogX3hIZWFkUmlnaHR9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgaWYgKG5vdGVIZWFkLnN0ZW1BbmNob3IpIHsgLy8gVGhlcmUgaXMgYSBzdGVtIGFuZCBwb3RlbnRpYWxseSBzb21lIGZsYWdzXG4gICAgICBsZXQgeFN0ZW0gPSB4ICsgd2lkdGg7XG4gICAgICBsZXQgeTE6IG51bWJlciwgeTI6IG51bWJlcjtcbiAgICAgIGNvbnN0IGFuY2hvciA9IG5vdGVIZWFkLnN0ZW1BbmNob3IqdGhpcy5zY2FsZTtcbiAgICAgIGNvbnN0IGRvd253YXJkcyA9IHN0YWZmQmxvY2subWluVlN0ZXAgKyBzdGFmZkJsb2NrLm1heFZTdGVwIDwgMDtcbiAgICAgIGNvbnN0IG11bHRpcGxlID0gKG5vdGVIZWFkLmZsYWdzID4gMikgPyAyICogKG5vdGVIZWFkLmZsYWdzLTIpIDogMDtcbiAgICAgIGlmIChkb3dud2FyZHMpIHsgLy8gRG93bndhcmRzXG4gICAgICAgIHkxID0gc3RhZmZCbG9jay5tYXhWU3RlcCAqIHRoaXMudlN0ZXBTaXplIC0gYW5jaG9yO1xuICAgICAgICB5MiA9IChzdGFmZkJsb2NrLm1pblZTdGVwICsgNyArIG11bHRpcGxlKSAqIHRoaXMudlN0ZXBTaXplO1xuICAgICAgfVxuICAgICAgZWxzZSB7IC8vIFVwd2FyZHNcbiAgICAgICAgeFN0ZW0gKz0gKG5vdGVIZWFkLndpZHRoIC0gU1RFTV9XSURUSCkgKiB0aGlzLnNjYWxlO1xuICAgICAgICB5MSA9IHN0YWZmQmxvY2subWluVlN0ZXAgKiB0aGlzLnZTdGVwU2l6ZSArIGFuY2hvcjtcbiAgICAgICAgeTIgPSAoc3RhZmZCbG9jay5tYXhWU3RlcCAtIDcgLSBtdWx0aXBsZSkgKiB0aGlzLnZTdGVwU2l6ZTtcbiAgICAgIH1cbiAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICBzdGVtRywgc3RlbVBhdGgsIHhTdGVtLCB5MSwgdGhpcy5zY2FsZSwgKHkyIC0geTEpIC8gUEFUSF9TQ0FMRVxuICAgICAgKTtcbiAgICAgIGlmIChub3RlSGVhZC5mbGFncyA9PT0gMSkgeyAvLyBTaW5nbGUgZmxhZ1xuICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICBzdGVtRywgc2luZ2xlRmxhZ1BhdGgsIHhTdGVtLCB5MiwgXG4gICAgICAgICAgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSAqIChkb3dud2FyZHMgPyAtMSA6IDEpLCAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChub3RlSGVhZC5mbGFncyA+IDEpIHsgLy8gTXVsdGlwbGUgZmxhZ1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVIZWFkLmZsYWdzOyArK2kpIHtcbiAgICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICAgIHN0ZW1HLCBtdWx0aUZsYWdQYXRoLCB4U3RlbSwgeTIsIFxuICAgICAgICAgICAgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSAqIChkb3dud2FyZHMgPyAtMSA6IDEpLCAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICB5MiArPSAoZG93bndhcmRzID8gLTIgOiAyKSAqIHRoaXMudlN0ZXBTaXplO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9PT0gMCkgeyAvLyBDb21wYWN0IHZpc3VhbGl6YXRpb25cbiAgICAgIHdpZHRoICs9IG5vdGVIZWFkLndpZHRoICogdGhpcy5zY2FsZTsgLy8gSGVhZCBzaXplXG4gICAgICBpZiAoc3RlbUcpIHtcbiAgICAgICAgd2lkdGggKz0gc3RlbUcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7IFxuICAgICAgfVxuICAgICAgd2lkdGggKz0gdGhpcy5jb25maWcubm90ZVNwYWNpbmc7IC8vIFBvc3Qtc3BhY2luZ1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgdGhlIHJlc3RzIHdoaWNoIGZvbGxvd3MgYSBtdXNpY2FsIGJsb2NrIGluIGEgc3RhZmZcbiAgICogQHBhcmFtIHN0YWZmQmxvY2sgVGhlIGJsb2NrIHdoaWNoIGluZGljYXRlcyBob3cgbXVjaCByZXN0IHNob3VsZCBiZSBcbiAgICogZGlzcGxheWVkIHRpbGwgdGhlIG5leHQgYmxvY2tcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBkcmF3IHRoZSByZXN0c1xuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIGRyYXduIHJlc3RzXG4gICAqL1xuICBwcml2YXRlIGRyYXdSZXN0cyhzdGFmZkJsb2NrOiBTdGFmZkJsb2NrLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aCA9IDA7XG4gICAgY29uc3QgcmVzdCA9IGRyYXdTVkdQYXRoKFxuICAgICAgdGhpcy5tdXNpY0csIFJFU1RfUEFUSFNbc3RhZmZCbG9jay5oZWFkSW5kZXhdLCBcbiAgICAgIHggKyB3aWR0aCwgMCwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZVxuICAgICk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID4gMCkgeyAvLyBQcm9wb3J0aW9uYWwgdmlzdWFsaXphdGlvblxuICAgICAgeCArPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8ucXVhcnRlcnNUb1RpbWUoc3RhZmZCbG9jay5oZWFkSW5kZXgpICogXG4gICAgICAgIHRoaXMuaFN0ZXBTaXplO1xuICAgIH1cbiAgICBlbHNlIHsgLy8gQ29tcGFjdCB2aXN1YWxpemF0aW9uXG4gICAgICB3aWR0aCArPSByZXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgd2lkdGggKz0gdGhpcy5jb25maWcubm90ZVNwYWNpbmc7IC8vIFBvc3Qtc3BhY2luZ1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgdGhlIGZpdmUgaG9yaXpvbnRhbCBsaW5lcyBvZiBhIHN0YWZmIChwZW50YWdyYW0pIG9yIHNjYWxlcyB0aGVtIHRvIFxuICAgKiB0aGUgY3VycmVudCB3aWR0aCBvZiB0aGUgc2NvcmUgaWYgYWxyZWFkeSBkcmF3blxuICAgKiBAcGFyYW0gZSBUaGUgU1ZHIGNvbnRhaW5lciBvZiB0aGUgbGluZXNcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBzdGFydGluZyBwb2ludCBvZiB0aGUgZHJhd2luZ1xuICAgKiBAcGFyYW0gd2lkdGggV2lkdGggb2YgdGhlIHBlbnRhZ3JhbVxuICAgKiBAcmV0dXJucyBUaGUgU1ZHIHdoaWNoIHJlcHJlc2VudHMgdGhlIHBlbnRhZ3JhbVxuICAgKi9cbiAgcHJpdmF0ZSByZWRyYXdTdGFmZkxpbmVzKGU6IFNWR0VsZW1lbnQsIHg6IG51bWJlciwgd2lkdGg6IG51bWJlcikge1xuICAgIGxldCBzdGFmZiA9IGUucXVlcnlTZWxlY3RvcignZ1tkYXRhLWlkPVwic3RhZmYtZml2ZS1saW5lc1wiXScpIGFzIFNWR0VsZW1lbnQ7XG4gICAgaWYgKHN0YWZmKSB7IC8vIEFscmVhZHkgZHJhd25cbiAgICAgIHN0YWZmLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICBudWxsLCAndHJhbnNmb3JtJywgYHNjYWxlKCR7d2lkdGgvUEFUSF9TQ0FMRX0sIDEpYFxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzdGFmZiA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQoZSwgJ3N0YWZmLWZpdmUtbGluZXMnKTtcbiAgICAgIGNvbnN0IHkgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IC00OyBpIDw9IDQ7IGkgKz0gMikgeyAvLyBEcmF3IGZpdmUgbGluZSBzdGFmZlxuICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICBzdGFmZiwgc3RhZmZMaW5lUGF0aCwgeCwgeSArIGkgKiB0aGlzLnZTdGVwU2l6ZSwgd2lkdGgvUEFUSF9TQ0FMRSwgMVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhZmY7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYSBiYXIgbGluZSBpZiB0aGlzIHF1YXJ0ZXIgZml0cyBvbiB0aGUgYmVnaW5uaW5nIG9mIGEgbmV3IGJhclxuICAgKiBAcGFyYW0gcXVhcnRlcnMgUXVhcnRlcnMgZnJvbSBiZWdpbm5pbmcgd2hlcmUgYmFyIGNvdWxkIHN0YXJ0XG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gaW4gc3RhZmYgdG8gZHJhdyB0aGUgYmFyIGxpbmUsIGlmIGFueS5cbiAgICogQHJldHVybnMgVGhlIHdpdGggb2YgdGhlIGRyYXduIGJhciBsaW5lXG4gICAqL1xuICBwcml2YXRlIGRyYXdCYXJJZk5lZWRlZChxdWFydGVyczogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aCA9IDA7XG4gICAgaWYgKHF1YXJ0ZXJzICE9PSAwKSB7IC8vIDFzdCBiYXIgc2tpcHBlZFxuICAgICAgY29uc3QgbmV4dEJhciA9IHRoaXMubGFzdEJhciArIGdldEJhckxlbmd0aCh0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlKTtcbiAgICAgIGlmIChxdWFydGVycyA+PSBuZXh0QmFyKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA+IDApIHsgLy8gUHJvcG9ydGlvbmFsIHZpc3VhbGl6YXRpb25cbiAgICAgICAgICB4IC09IHRoaXMuY29uZmlnLm5vdGVTcGFjaW5nOyAvLyBOZWdhdGl2ZSB0byBhdm9pZCB0b3VjaGluZyBub3RlIGhlYWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gQ29tcGFjdCB2aXN1YWxpemF0aW9uXG4gICAgICAgICAgd2lkdGggPSB0aGlzLmNvbmZpZy5ub3RlU3BhY2luZztcbiAgICAgICAgfVxuICAgICAgICBkcmF3U1ZHUGF0aCh0aGlzLmxpbmVzRywgYmFyUGF0aCwgeCwgMCwgMSwgdGhpcy5zY2FsZSk7XG4gICAgICAgIHRoaXMubGFzdEJhciA9IG5leHRCYXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFcmFzZXMgYWxsIGdyYXBoaWNhbCBlbGVtZW50cyBvbiB0aGUgc2lnbmF0dXJlIG92ZXJsYXlcbiAgICovXG4gIHByaXZhdGUgY2xlYXJTaWduYXR1cmVPdmVybGF5KCkge1xuICAgIHdoaWxlICh0aGlzLm92ZXJsYXlHLmxhc3RDaGlsZCkge1xuICAgICAgdGhpcy5vdmVybGF5Ry5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXlHLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNpZ25hdHVyZXMgaWYgdGhlcmUncyBhIHNpZ25hdHVyZSBjaGFuZ2Ugb24gc3BlY2lmaWVkIHF1YXJ0ZXJcbiAgICogQHBhcmFtIHF1YXJ0ZXJzIFF1YXJ0ZXJzIGZyb20gYmVnaW5uaW5nIHdoZXJlIHNpZ25hdGl1cmVzIGNvdWxkIHN0YXJ0XG4gICAqIEBwYXJhbSB4IEhvcml6b250YWwgcG9zaXRpb24gd2hlcmUgaXQgc2hvdWxkIGJlIGRyYXduXG4gICAqIEByZXR1cm5zIFdpZHRoIG9mIHRoZSBkcmF3biBzaWduYXR1cmVzIG9yIDAgaWYgcHJvcG9ydGlvbmFsIHZpc3VhbGl6YXRpb25cbiAgICovXG4gIHByaXZhdGUgZHJhd1NpZ25hdHVyZXNJZk5lZWRlZChxdWFydGVyczogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aCA9IDA7XG4gICAgaWYgKHF1YXJ0ZXJzICE9PSAwKSB7IC8vIDFzdCBiYXIgc2tpcHBlZFxuICAgICAgY29uc3Qga2V5Q2hhbmdlZCA9IHRoaXMuY2hhbmdlS2V5U2lnbmF0dXJlSWZOZWVkZWQocXVhcnRlcnMpO1xuICAgICAgY29uc3QgdGltZUNoYW5nZWQgPSB0aGlzLmNoYW5nZVRpbWVTaWduYXR1cmVJZk5lZWRlZChxdWFydGVycyk7XG4gICAgICBpZiAoa2V5Q2hhbmdlZCB8fCB0aW1lQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjbGVmU3BhY2luZyA9IENPTVBBQ1RfU1BBQ0lORyAqIHRoaXMuc2NhbGUgKiBcbiAgICAgICAgICAodGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPiAwID8gMyA6IDIpO1xuICAgICAgICB0aGlzLnNpZ25hdHVyZXNMaXN0LnB1c2goe3g6IHggLSBjbGVmU3BhY2luZyAsIHE6IHF1YXJ0ZXJzfSk7XG4gICAgICAgIGlmICh0aGlzLnNpZ25hdHVyZU5leHQgPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSB4O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZXMgPSBxdWFydGVycyA+IDAgP1xuICAgICAgICAgIGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zaWduYXR1cmVzRywgJ3NpZ25hdHVyZXMnKSA6IHRoaXMub3ZlcmxheUc7XG4gICAgICAgIHdpZHRoICs9IHRoaXMuZHJhd1NpZ25hdHVyZXMoXG4gICAgICAgICAgc2lnbmF0dXJlcywgeCArIHdpZHRoLCBmYWxzZSwga2V5Q2hhbmdlZCwgdGltZUNoYW5nZWRcbiAgICAgICAgKTtcbiAgICAgIH0gIFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPT09IDAgPyB3aWR0aCA6IDA7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgdGhlIHNpZ25hdGlyZXMgaW4gdGhlIGdpdmVuIGNvbnRhaW5lclxuICAgKiBAcGFyYW0gZSBDb250YWluZXIgb2YgdGhlIHNpZ25hdHVyZXMgdG8gYmUgZHJhd25cbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBzdGFydCBkcmF3aW5nIGl0XG4gICAqIEBwYXJhbSBkcmF3Q2xlZiBXZXRoZXIgdG8gZHJhdyB0aGUgY2xlZiBvciBub3RcbiAgICogQHBhcmFtIGRyYXdLZXkgV2V0aGVyIHRvIGRyYXcgdGhlIGtleSBvciBub3RcbiAgICogQHBhcmFtIGRyYXdUaW1lIFdldGhlciB0byBkcmF3IHRoZSB0aW1lIHNpZ25hdHVyZSBvciBub3RcbiAgICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB3aG9sZSBzaWduYXR1cmUgc2V0IGRyYXduXG4gICAqL1xuICBwcml2YXRlIGRyYXdTaWduYXR1cmVzKFxuICAgIGU6IFNWR0VsZW1lbnQsIHg6IG51bWJlciwgXG4gICAgZHJhd0NsZWY6IGJvb2xlYW4sIGRyYXdLZXk6IGJvb2xlYW4sIGRyYXdUaW1lOiBib29sZWFuXG4gICk6IG51bWJlciB7XG4gICAgY29uc3Qgc3BhY2luZyA9IENPTVBBQ1RfU1BBQ0lORyAqIHRoaXMuc2NhbGU7XG4gICAgbGV0IHdpZHRoID0gc3BhY2luZztcbiAgICBsZXQgYmFja2dyb3VuZDogU1ZHUmVjdEVsZW1lbnQ7XG4gICAgY29uc3QgZHJhd0JhY2tncm91bmQgPSBcbiAgICAgIGUgPT09IHRoaXMub3ZlcmxheUcgfHwgdGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPiAwO1xuXG4gICAgaWYgKGRyYXdCYWNrZ3JvdW5kKSB7XG4gICAgICBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR05TLCAncmVjdCcpO1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsIGAke3h9YCk7XG4gICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzAnKTtcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgJzEnKTsgLy8gMSB0byBhdm9pZCBkaXN0b3J0aW9uc1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgJzEnKTsgLy8gMSB0byBhdm9pZCBkaXN0b3J0aW9uc1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCAnYmFja2dyb3VuZCcpO1xuICAgICAgZS5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kKTtcbiAgICAgIGNvbnN0IHVwcGVyU3R5bGUgPSBcbiAgICAgICAgZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRpdi5wYXJlbnRFbGVtZW50KTtcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgIG51bGwsICdmaWxsJywgdXBwZXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChkcmF3Q2xlZikge1xuICAgICAgY29uc3QgY2xlZiA9IGRyYXdTVkdQYXRoKFxuICAgICAgICBlLCBDTEVGX1BBVEhTW3RoaXMuc3RhZmZNb2RlbC5jbGVmXSwgXG4gICAgICAgIHggKyB3aWR0aCwgMCwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZVxuICAgICAgKTtcbiAgICAgIHNldEZpbGwoY2xlZiwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICAgIHdpZHRoICs9IDMgKiBzcGFjaW5nO1xuICAgIH1cbiAgICBpZiAoZHJhd0tleSkge1xuICAgICAgY29uc3QgYWNjaWRlbnRhbCA9IEtFWV9BQ0NJREVOVEFMU1t0aGlzLmN1cnJlbnRLZXldLmFjY2lkZW50YWw7XG4gICAgICBjb25zdCBvZmZzZXQgPSBcbiAgICAgICAgKHRoaXMuc3RhZmZNb2RlbC5jbGVmID09PSA3MSkgPyAwIDogMTQ7IC8vIE1lYXN1cmVkIGluIHZTdGVwXG4gICAgICBLRVlfQUNDSURFTlRBTFNbdGhpcy5jdXJyZW50S2V5XS5waXRjaGVzLmZvckVhY2goXG4gICAgICAgIHBpdGNoID0+IHtcbiAgICAgICAgICBjb25zdCBzdGVwcyA9IFxuICAgICAgICAgICAgZ2V0Tm90ZURldGFpbHMocGl0Y2gsdGhpcy5zdGFmZk1vZGVsLmNsZWYsIHRoaXMuY3VycmVudEtleSkudlN0ZXBzO1xuICAgICAgICAgIGNvbnN0IHAgPSBkcmF3U1ZHUGF0aChlLCBBQ0NJREVOVEFMX1BBVEhTW2FjY2lkZW50YWxdLCBcbiAgICAgICAgICAgIHggKyB3aWR0aCwgKG9mZnNldCArIHN0ZXBzKSAqIHRoaXMudlN0ZXBTaXplLCBcbiAgICAgICAgICAgIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuICAgICAgICAgIHNldEZpbGwocCwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICAgICAgICB3aWR0aCArPSBwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZHJhd1RpbWUpIHsgLy8gMC41IGFuZCAyLjg1IGFyZSBlbXBpcmljYWwgVGltZXMgZm9udCB2YWx1ZXNcbiAgICAgIGNvbnN0IHRpbWVLZXkgPSBjcmVhdGVTVkdHcm91cENoaWxkKGUsICd0aW1lLWtleScpO1xuICAgICAgY29uc3QgZm9udFNpemUgPSBgJHsyLjg1KnRoaXMuY29uZmlnLm5vdGVIZWlnaHR9cHhgO1xuICAgICAgZHJhd1NWR1RleHQoXG4gICAgICAgIHRpbWVLZXksIGAke3RoaXMuY3VycmVudFRpbWVTaWduYXR1cmUubnVtZXJhdG9yfWAsIFxuICAgICAgICB4ICsgd2lkdGgsIC0gMC41LCBmb250U2l6ZSwgdHJ1ZVxuICAgICAgKTtcbiAgICAgIGRyYXdTVkdUZXh0KFxuICAgICAgICB0aW1lS2V5LCBgJHt0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlLmRlbm9taW5hdG9yfWAsIFxuICAgICAgICB4ICsgd2lkdGgsIDQgKiB0aGlzLnZTdGVwU2l6ZSAtIDAuNSwgZm9udFNpemUsIHRydWVcbiAgICAgICk7XG4gICAgICBzZXRGaWxsKHRpbWVLZXksIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgICB3aWR0aCArPSB0aW1lS2V5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICsgc3BhY2luZztcbiAgICB9IC8vIFRPRE86IENlbnRlciBudW1lcmF0b3Igb3IgZGVub21pbmF0b3IgaWYgbmVlZGVkICAgXG4gICAgY29uc3Qgc3RhZmYgPSB0aGlzLnJlZHJhd1N0YWZmTGluZXMoZSwgeCwgd2lkdGgpO1xuICAgIHNldFN0cm9rZShzdGFmZiwgTElORV9TVFJPS0UsIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgLy8gVmVydGljYWwgYW5kIGhvcml6b250YWwgcmVzaXppbmdcbiAgICBjb25zdCBkaXZSZWN0ID0gdGhpcy5kaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZVJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMudXBkYXRlVmVydGljYWxCb3VuZGFyaWVzKFxuICAgICAgZVJlY3QudG9wIC0gZGl2UmVjdC50b3AsIGVSZWN0LmJvdHRvbSAtIGRpdlJlY3QudG9wXG4gICAgKTtcbiAgICBpZiAoZHJhd0JhY2tncm91bmQpIHsgLy8gTGF0ZSByZWRpbWVuc2lvbiBhZnRlciBmb3JlZ3JvdW5kIGRyYXdpbmdcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCBgJHstdGhpcy5zdGFmZk9mZnNldH1gKTtcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsIGAke3RoaXMuaGVpZ2h0fWApO1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCBgJHt3aWR0aH1gKTtcbiAgICB9XG4gICAgLy8gT3ZlcmxhcHBpbmcgR3JhZGllbnQgb25seSBhcHBsaWVzIGluIG92ZXJsYXlcbiAgICBpZiAoZSA9PT0gdGhpcy5vdmVybGF5Rykge1xuICAgICAgdGhpcy5vdmVybGF5U1ZHLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGAke3dpZHRoICsgNX1gKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGdyYWQgPSBkcmF3U1ZHUGF0aChcbiAgICAgICAgICBlLCBzdGVtUGF0aCwgd2lkdGggKyBpLCBpICogaSAtIHRoaXMuc3RhZmZPZmZzZXQsIDEgLyBTVEVNX1dJRFRILCBcbiAgICAgICAgICAodGhpcy5oZWlnaHQgLSAyICogaSAqIGkpIC8gUEFUSF9TQ0FMRSwgXG4gICAgICAgICAgKGkgLSA1KSAqIChpIC0gNSkgKiAyIC8gUEFUSF9TQ0FMRVxuICAgICAgICApO1xuICAgICAgICBzZXRGaWxsKGdyYWQsIHRoaXMuZ2V0Q29sb3IoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEJsaW5raW5nIHNldCB1cCBhbmQgcmV0dXJuXG4gICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID4gMCkgeyAvLyBQcm9wb3J0aW9uYWwgdmlzdWFsaXphdGlvblxuICAgICAgY29uc3QgZmlyc3RPdmVybGF5ID0gdGhpcy5zaWduYXR1cmVzUXVhcnRlcnMgPT09IDA7XG4gICAgICBpZiAoZmlyc3RPdmVybGF5KSB7IC8vIEZpcnN0IHRpbWUgb3ZlcmxheSBpcyBkcmF3blxuICAgICAgICB0aGlzLnNpZ25hdHVyZXNRdWFydGVycyA9IFxuICAgICAgICAgIHRoaXMuc3RhZmZNb2RlbC5iYXJzSW5mby50aW1lVG9RdWFydGVycyh3aWR0aC90aGlzLmhTdGVwU2l6ZSk7XG4gICAgICB9XG4gICAgICBpZiAoZmlyc3RPdmVybGF5IHx8IHggPiAwKSB7IC8vIEV4Y2x1ZGVzIHNlY29uZCBvdmVybGF5IGRyYXdpbmdzXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nID0gdHJ1ZTtcbiAgICAgICAgc2V0RmFkZShlLCB0aGlzLnNpZ25hdHVyZXNCbGlua2luZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9IFxuICAgIGVsc2UgeyAvLyBDb21wYWN0IHZpc3VhbGl6YXRpb25cbiAgICAgIHJldHVybiB3aWR0aDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgY3VycmVudCBrZXkgYWNjb3JkaW5nIHRvIHRoZSBxdWFydGVyIHBvc2l0aW9uXG4gICAqIEBwYXJhbSBxdWFydGVycyBRdWFydGVycyBmcm9tIGJlZ2lubmluZyB3aGVyZSBjaGFuZ2UgY291bGQgaGFwcGVuXG4gICAqIEByZXR1cm5zIFdldGhlciBpdCBjaGFuZ2VkIG9yIG5vdFxuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VLZXlTaWduYXR1cmVJZk5lZWRlZChxdWFydGVyczogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLmtleVNpZ25hdHVyZUF0UShxdWFydGVycywgdHJ1ZSk7XG4gICAgaWYgKGtleSA+PSAwKSB7IC8vIFJldHVybnMgLTEgaW4gY2FzZSB0aGVyZSB3YXMgbm8gY2hhbmdlIGF0IHF1YXJ0ZXJzXG4gICAgICB0aGlzLmN1cnJlbnRLZXkgPSBrZXk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IFxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IHRpbWUgc2lnbmF0dXJlIGFjY29yZGluZyB0byB0aGUgcXVhcnRlciBwb3NpdGlvblxuICAgKiBAcGFyYW0gcXVhcnRlcnMgUXVhcnRlcnMgZnJvbSBiZWdpbm5pbmcgd2hlcmUgY2hhbmdlIGNvdWxkIGhhcHBlblxuICAgKiBAcmV0dXJucyBXZXRoZXIgaXQgY2hhbmdlZCBvciBub3RcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlVGltZVNpZ25hdHVyZUlmTmVlZGVkKHF1YXJ0ZXJzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB0cyA9IHRoaXMuc3RhZmZNb2RlbC5iYXJzSW5mby50aW1lU2lnbmF0dXJlQXRRKHF1YXJ0ZXJzLCB0cnVlKTtcbiAgICBpZiAodHMpIHsgLy8gUmV0dXJucyBudWxsIGluIGNhc2UgdGhlcmUgd2FzIG5vIGNoYW5nZSBhdCBxdWFydGVyc1xuICAgICAgdGhpcy5jdXJyZW50VGltZVNpZ25hdHVyZSA9IHRzO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyBzaWduYXR1cmVzIGNoYW5nZSBhbmQgZHJhd2luZyBhY2NvcmRpbmcgdG8geCBwb3NpdGlvbi4gSXQncyB1c2VkXG4gICAqIHRvIHJlcGxhY2Ugb3ZlcmxheXMgb24gaG9yaXpvbnRhbCBzY3JvbGxpbmcgYWNjb3JkaW5nIHRvIG5leHQgZGlhZ3JhbTpcbiAgICogYGBgXG4gICAqICAgIGN1cnJlbnQgIHggICAgIG5leHQgICA8PSBjdXJyZW50ICYgbmV4dCBpbmNsdWRlIHRoZSBzdGFydGluZyBwb2ludFxuICAgKiAgICAgICAgICB8ICB8ICAgICB8XG4gICAqIFswICAgICAgKVsxICAgICAgKVsyICAgICApbnVsbFxuICAgKiBgYGBcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBkcmF3IHNpZ25hdHVyZXNcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlQW5kRHJhd1NpZ25hdHVyZXNJZk5lZWRlZCh4OiBudW1iZXIpIHtcbiAgICBsZXQgcXVhcnRlcjogbnVtYmVyO1xuICAgIGlmIChcbiAgICAgIHggPCB0aGlzLnNpZ25hdHVyZUN1cnJlbnQgfHwgXG4gICAgICAodGhpcy5zaWduYXR1cmVOZXh0ICE9PSBudWxsICYmIHRoaXMuc2lnbmF0dXJlTmV4dCA8PSB4KVxuICAgICkge1xuICAgICAgcXVhcnRlciA9IHRoaXMuc2lnbmF0dXJlc0xpc3RbMF0ucTtcbiAgICAgIHRoaXMuc2lnbmF0dXJlTmV4dCA9IG51bGw7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2lnbmF0dXJlc0xpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHggPCB0aGlzLnNpZ25hdHVyZXNMaXN0W2ldLngpIHtcbiAgICAgICAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSB0aGlzLnNpZ25hdHVyZXNMaXN0W2ldLng7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaWduYXR1cmVDdXJyZW50ID0gdGhpcy5zaWduYXR1cmVzTGlzdFtpXS54O1xuICAgICAgICAgIHF1YXJ0ZXIgPSB0aGlzLnNpZ25hdHVyZXNMaXN0W2ldLnE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocXVhcnRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0bXBLZXkgPSB0aGlzLmN1cnJlbnRLZXk7XG4gICAgICBjb25zdCB0bXBUaW1lU2lnbmF0dXJlID0gdGhpcy5jdXJyZW50VGltZVNpZ25hdHVyZTtcbiAgICAgIHRoaXMuY2hhbmdlS2V5U2lnbmF0dXJlSWZOZWVkZWQocXVhcnRlcik7XG4gICAgICB0aGlzLmNoYW5nZVRpbWVTaWduYXR1cmVJZk5lZWRlZChxdWFydGVyKTtcbiAgICAgIHRoaXMuY2xlYXJTaWduYXR1cmVPdmVybGF5KCk7XG4gICAgICB0aGlzLmRyYXdTaWduYXR1cmVzKHRoaXMub3ZlcmxheUcsIDAsIHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgdGhpcy5jdXJyZW50S2V5ID0gdG1wS2V5O1xuICAgICAgdGhpcy5jdXJyZW50VGltZVNpZ25hdHVyZSA9IHRtcFRpbWVTaWduYXR1cmU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID4gMCAmJiB4ID09PSAwKSB7XG4gICAgICB0aGlzLnNpZ25hdHVyZU5leHQgPSAwOyAvLyBUbyByZXNldCBibGlua2luZyBpZiBzY3JvbGxlZFxuICAgICAgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcgPSB0cnVlO1xuICAgICAgc2V0RmFkZSh0aGlzLm92ZXJsYXlHLCB0aGlzLnNpZ25hdHVyZXNCbGlua2luZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGhhbmRsZXIgZm9yIGhvcml6b25hdGFsIHNjcm9sbCBldmVudHNcbiAgICogQHBhcmFtIF9ldmVudCBJZ25vcmVkXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZVNjcm9sbEV2ZW50ID0gKF9ldmVudDogRXZlbnQpID0+IHtcbiAgICB0aGlzLmxhc3RLbm93blNjcm9sbExlZnQgPSB0aGlzLnBhcmVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICBpZiAoIXRoaXMudGlja2luZykge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhbmdlQW5kRHJhd1NpZ25hdHVyZXNJZk5lZWRlZCh0aGlzLmxhc3RLbm93blNjcm9sbExlZnQpO1xuICAgICAgICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnRpY2tpbmcgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBY3R1YXRvciBvbiB0aGUgaG9yaXpvbnRhbCBzY3JvbGwgdG8gc2hvdyBoaWdobGl0ZWQgbm90ZVxuICAgKiBAcGFyYW0gc2Nyb2xsSW50b1ZpZXcgV2V0aGVyIHRoZSBzY3JvbGwgbXVzdCBmb2xsb3cgYWN0aXZlIG5vdGUgb3Igbm90XG4gICAqIEBwYXJhbSBhY3RpdmVOb3RlUG9zaXRpb24gSG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBhY3RpdmUgbm90ZVxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxJbnRvVmlld0lmTmVlZGVkKFxuICAgIHNjcm9sbEludG9WaWV3OiBib29sZWFuLCBhY3RpdmVOb3RlUG9zaXRpb246IG51bWJlclxuICApIHtcbiAgICBpZiAoc2Nyb2xsSW50b1ZpZXcpIHtcbiAgICAgIGlmICh0aGlzLnNjcm9sbFR5cGUgPT09IFNjcm9sbFR5cGUuUEFHRSkge1xuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBzY3JvbGwgdGhlIGNvbnRhaW5lci5cbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGlmIChhY3RpdmVOb3RlUG9zaXRpb24gPlxuICAgICAgICAgICAgKHRoaXMucGFyZW50RWxlbWVudC5zY3JvbGxMZWZ0ICsgY29udGFpbmVyV2lkdGgpKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnNjcm9sbExlZnQgPSBhY3RpdmVOb3RlUG9zaXRpb24gLSAyMDtcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICAgIGVsc2UgeyAvLyBWYWxpZCBmb3IgYm90aCBTY3JvbGxUeXBlLk5PVEUgJiBTY3JvbGxUeXBlLkJBUlxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnNjcm9sbExlZnQgPSBcbiAgICAgICAgICBhY3RpdmVOb3RlUG9zaXRpb24gLSBjb250YWluZXJXaWR0aCAqIDAuNTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplcyBjb250YWluZXJzIHRvIGZ1bGx5IGhvbGQgc3RhZmYgb24gcG9zc2libGUgcmVzaXplc1xuICAgKiBAcGFyYW0gdG9wIFZlcnRpY2FsIHRvcCBwb3NpdGlvbiBvbiBoaWdoZXN0IHN0YWZmIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gYm90dG9tIFZlcnRpY2FsIGJvdHRvbSBwb3NpdGlvbiBvbiBsb3dlc3Qgc3RhZmYgY29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZlcnRpY2FsQm91bmRhcmllcyh0b3A6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcbiAgICBsZXQgbmV3SGVpZ2h0ID0gMDtcbiAgICBpZiAodG9wIDwgMCkge1xuICAgICAgdGhpcy5zdGFmZk9mZnNldCAtPSB0b3A7XG4gICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IGB0cmFuc2xhdGUoMCwgJHt0aGlzLnN0YWZmT2Zmc2V0fSlgO1xuICAgICAgdGhpcy5vdmVybGF5Ry5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgdHJhbnNsYXRpb24pO1xuICAgICAgdGhpcy5zdGFmZkcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsIHRyYW5zbGF0aW9uKTtcbiAgICAgIG5ld0hlaWdodCA9IHRoaXMuaGVpZ2h0IC0gdG9wO1xuICAgIH1cbiAgICBuZXdIZWlnaHQgPSBNYXRoLm1heChuZXdIZWlnaHQsIGJvdHRvbSAtIHRvcCk7XG4gICAgaWYgKG5ld0hlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICAgIHRoaXMub3ZlcmxheVNWRy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgYCR7dGhpcy5oZWlnaHR9YCk7XG4gICAgICB0aGlzLnN0YWZmU1ZHLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBgJHt0aGlzLmhlaWdodH1gKTtcbiAgICAgIGNvbnN0IGVscyA9IHRoaXMuZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJ3JlY3RbZGF0YS1pZD1cImJhY2tncm91bmRcIl0nKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZWxzW2ldO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsIGAkey10aGlzLnN0YWZmT2Zmc2V0fWApO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgYCR7dGhpcy5oZWlnaHR9YCk7XG4gICAgICB9ICBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgaHR0cCBzdHJpbmcgd2l0aCB0aGUgZGVmYXVsdCBjb2xvciAoZGVmYXVsdCkgb3IgdGhlIGFjdGl2ZSBvbmVcbiAgICogQHBhcmFtIGlzQWN0aXZlIFdldGhlciB0aGUgY29sb3IgaXMgYWN0aXZlIChoaWdobGlnaHQpIG9yIG5vdFxuICAgKiBAcmV0dXJucyBUaGUgY29sb3Igc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIGdldENvbG9yKGlzQWN0aXZlPWZhbHNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHJnYigke2lzQWN0aXZlID8gdGhpcy5jb25maWcuYWN0aXZlTm90ZVJHQiA6IHRoaXMuY29uZmlnLm5vdGVSR0J9KWA7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSB3aXRoIGEgc2xpZ2h0IGJ1bXAgdG8gYXZvaWQgXG4gICAqIHF1aWV0IG5vdGVzIHRvIGJlIGludmlzaWJsZVxuICAgKiBAcGFyYW0gbm90ZVZlbG9jaXR5IFRoZSBNSURJIHZlbG9jaXR5IG9mIHRoZSBub3RlIChmcm9tIDAgdG8gMTI3KVxuICAgKiBAcmV0dXJucyBBIG51bWVyaWNhbCB2YWx1ZSBmb3Igb3BhY2l0eSAoZnJvbSAwLjAgPSBmdWxsIHRyYW5zcGFyZW50IHRvIFxuICAgKiAxLjAgPSBmdWxsIG9wYWNpdHkpIFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRPcGFjaXR5KG5vdGVWZWxvY2l0eT86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgb3BhY2l0eUJhc2VsaW5lID0gMC4yOyAgLy8gU2hpZnQgYWxsIHRoZSBvcGFjaXRpZXMgdXAgYSBsaXR0bGUuXG4gICAgcmV0dXJuIG5vdGVWZWxvY2l0eSA/IFxuICAgICAgKG5vdGVWZWxvY2l0eSAvIDEyNykgKiAoMSAtIG9wYWNpdHlCYXNlbGluZSkgKyBvcGFjaXR5QmFzZWxpbmUgOiAxO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2F0ZXMgYSBTVkcgZ3JvdXAgdG8gaGlnaGxpZ2h0IHRoZSBzeW1ib2xzIGl0IGNvbnRhaW5zXG4gICAqIEBwYXJhbSBub3RlIFRoZSBub3RlIHRvIGxvY2F0ZSB0aGUgU1ZHIGdyb3VwIGl0IGJlbG9uZ3MgdG9cbiAgICogQHJldHVybnMgVGhlIFNWRyBHcm91cFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRHcm91cChub3RlOiBOb3RlSW5mbyk6IFNWR0VsZW1lbnQge1xuICAgIGNvbnN0IHF1YXJ0ZXJzID0gbm90ZS5zdGFydDtcbiAgICBjb25zdCBwaXRjaCA9IG5vdGUucGl0Y2g7XG4gICAgcmV0dXJuIHRoaXMuc3RhZmZTVkcucXVlcnlTZWxlY3RvcihgZ1tkYXRhLWlkPVwiJHtxdWFydGVyc30tJHtwaXRjaH1cIl1gKTtcbiAgfVxuXG59IiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKlxuICogQWxsIFNWRyBwYXRocyBoYXZlIGJlZW4gZHJhd24gaW4gYSBzY2FsZSBvZiBgUEFUSF9TQ0FMRSAqIFBBVEhfU0NBTEVgXG4gKiBpbiBhIHJlbGF0aXZlIHBvc2l0aW9uIHRvIHRoZSBzdGFmZiBtaWRkbGUgbGluZSwgYW5jaG9yaW5nIHRvIHRoZVxuICogbGVmdG1vc3Qgc2lkZSBvZiBhIG5vdGUgaGVhZC5cbiAqL1xuZXhwb3J0IGNvbnN0IFBBVEhfU0NBTEUgPSAxMDA7IFxuXG4vKiogRyBjbGVmIFNWRyBwYXRoICovXG5jb25zdCBnQ2xlZlBhdGggPSBgTSAxMzksNDggQyAxMDIsNTcgNzYsMTIwIDEzMSwxNTEgNDEsMTI4IDY0LDI0IDEyOSwyIEwgXG4xMTcsLTU3IEMgLTMyLDQ3IDI2LDIxNyAxNjYsMTgyIFogbSAxMiwtMSAyNywxMzEgQyAyNDIsMTUzIDIxNiw0NiAxNTEsNDcgXG5aIG0gLTM1LC0xNzcgYyAzNCwtMjMgODIsLTExNyA1MCwtMTQwIC0yMywtMTcgLTcxLDMzIC01MCwxNDAgeiBtIC0xMCwxMCBjIFxuLTIzLC03NyAtMjAsLTIwMCA0OCwtMjEzIDE5LC00IDg5LDE3MSAtMjYsMjY2IGwgMTMsNjYgYyAxMjAsLTYgMTM3LDE1NSBcbjM5LDE5MSBsIDEyLDU4IGMgMzAsMTMxIC0xMzcsMTQ1IC0xMzgsNDcgMCwtMjkgMzcsLTU5IDYzLC0zNyAyMSwxOCAyNSw3MSBcbi0yNSw3MCAzMiw0MiAxMDMsMCA5MSwtNjUgTCAxNjcsMTkzIEMgNTYsMjMyIC0xMTIsNjMgMTA2LC0xMjAgWmA7XG4vKiogRiBjbGVmIFNWRyBwYXRoICovXG5jb25zdCBmQ2xlZlBhdGggPSBgbSAxMDEsLTE5OSBjIC00OSwwIC0xMDAsMjggLTEwMCw4MyAwLDM5IDU4LDU3IDgyLDI2IDE1LC0yMCBcbi00LC00NyAtMzIsLTQ3IC0yMywxIC0yNSwwIC0yNSwtOCAwLC0yMiA0MCwtNDYgNzEsLTQxIDkxLDE2IDY3LDIwOCAtMTA1LDMwMiBcbjc1LC0yNyAxOTgsLTk0IDIxMSwtMjAxIDYsLTY2IC00MiwtMTE0IC0xMDIsLTExNCB6IG0gMTQzLDMzIGMgLTEzLDAgLTIzLDExIFxuLTIzLDI0IDAsMTQgMTAsMjQgMjMsMjQgMTMsMCAyMywtMTEgMjMsLTI0IDAsLTEzIC0xMCwtMjQgLTIzLC0yNCB6IG0gMiw4MyBjIFxuLTEzLDAgLTIzLDExIC0yMywyNCAwLDE0IDEwLDI0IDIzLDI0IDEzLDAgMjMsLTExIDIzLC0yNCAwLC0xMyAtMTAsLTI0IC0yMywtMjQgXG56YDtcblxuLyoqIFdob2xlIG5vdGUgaGVhZCBTVkcgcGF0aCAqL1xuY29uc3Qgd2hvbGVIZWFkUGF0aCA9IGBtIDAsMCBjIDAsLTM3IDQ5LC01MSA3OSwtNTEgMzEsMCA4MywxMyA4Myw1MSAwLDM5IFxuLTU1LDUxIC04NCw1MSBDIDQ5LDUxIDAsMzcgMCwwIFogbSAxMTEsMzEgYyAxMywtMTkgMCwtNTggLTIyLC02OCAtMzMsLTE1IFxuLTUzLDEwIC0zOSw0OSA5LDI3IDQ4LDM5IDYxLDE5IHpgO1xuLyoqIEhhbGYgbm90ZSBoZWFkIFNWRyBwYXRoICovXG5jb25zdCBoYWxmSGVhZFBhdGggPSBgbSAwLDEwIGMgMCwtMjUgMzUsLTYwIDgwLC02MCAxNSwwIDQ1LDQgNDUsNDAgQyAxMjUsMTYgXG44OSw1MCA0NSw1MCAxNyw1MCAwLDM2IDAsMTAgWiBtIDcxLDcgYyAxNywtMTEgNDUsLTM0IDM4LC00NSAtNywtMTAgLTM5LDEgXG4tNTcsMTIgLTE5LDExIC00MiwzMSAtMzYsNDIgNiwxMCAzNywyIDU1LC05IHpgO1xuLyoqIFF1YXJ0ZXIgbm90ZSBoZWFkIChhbmQgc2hvcnRlcikgU1ZHIHBhdGggKi9cbmNvbnN0IHF1YXJ0ZXJIZWFkUGF0aCA9IGBNIDAsMTAgQyAwLC0xNSAzNSwtNTAgODAsLTUwIDExMCwtNTAgMTI1LC0zNSAxMjUsLTEwIFxuMTI1LDE1IDkwLDUwIDQ1LDUwIDE1LDUwIDAsMzUgMCwxMCBaYDtcblxuLyoqIFNoYXJwIGFjY2lkZW50YWwgU1ZHIHBhdGggKi9cbmNvbnN0IHNoYXJwUGF0aCA9IGBtIC00OSwtMTIxIHYgNTIgbCAtMjksOSB2IC00OCBoIC04IHYgNTEgbCAtMjAsNiB2IDI5IGwgXG4yMCwtNiB2IDcwIGwgLTIwLDYgdiAzMCBsIDIwLC02IHYgNTEgaCA4IFYgNjkgbCAzMCwtOCB2IDUwIGggOCBWIDU4IGwgMjAsLTYgXG5WIDIzIGwgLTIwLDYgdiAtNzEgbCAyMCwtNiB2IC0yOSBsIC0yMCw2IHYgLTUwIHogbSAxLDgyIHYgNzEgbCAtMjksOSB2IC03MSB6YDtcbi8qKiBGbGF0IGFjY2lkZW50YWwgU1ZHIHBhdGggKi9cbmNvbnN0IGZsYXRQYXRoID0gYE0gLTEwNiwtMTY2IFYgNjcgYyA1MiwtNDIgODUsLTU2IDg1LC05NCAwLC00NyAtNDYsLTUxIFxuLTczLC0yMiB2IC0xMTcgeiBtIDMxLDEyMCBjIDIwLDAgNDIsNDYgLTIwLDkxIFYgLTcgYyAwLC0yOCAxMCwtMzkgMjAsLTM5IHpgO1xuLyoqIE5Ob3JtYWwgYWNjaWRlbnRhbCBTVkcgcGF0aCAqL1xuY29uc3Qgbm9ybWFsUGF0aCA9IGBtIC04MSwtNTggdiAtNDggSCAtOTIgViA3MyBsIDYwLC0xMyB2IDUwIGggMTEgViAtNzIgWiBtIFxuNTAsMjQgdiA1OCBsIC01MCwxMSB2IC01OCB6YDtcblxuLyoqIFdob2xlIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3Qgd2hvbGVSZXN0UGF0aCA9ICdtIDAsLTUwIGggMTI1IHYgLTUwIEggMCBaJztcbi8qKiBIYWxmIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3QgaGFsZlJlc3RQYXRoID0gJ00gMCwwIEggMTI1IFYgLTUwIEggMCBaJztcbi8qKiBRdWFydGVyIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3QgcXVhcnRlclJlc3RQYXRoID0gYG0gMCwtMjUgYyAzOSwtMzkgMzcsLTc1IDgsLTEyMCBsIDYsLTUgNjEsMTAzIEMgXG40MCwtMTMgMzEsNCA3Myw3MSBsIC01LDUgQyAxNCw1MiAxNiwxMjUgNjcsMTQ0IGwgLTQsNiBDIC0zNywxMDIgLTEsMjIgNTksNjAgWmA7XG4vKiogRWlndGggbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCBlaWd0aFJlc3RQYXRoID0gYG0gNTIsLTQ3IGMgMjYsLTIgNDIsLTIxIDQ4LC00MiBsIDEyLDQgTCA2NCw4MyA1Miw3OSBcbjg4LC00OSBjIDAsMCAtMTcsMjIgLTU3LDIyIC0xNiwwIC0zMSwtMTMgLTMxLC0yNyAwLC0xOCAxMCwtMzEgMjcsLTMxIDE3LDAgXG4zMywxNSAyNSwzOCB6YDtcbi8qKiBTaXh0ZWVudGggbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCBzaXh0ZWVudGhSZXN0UGF0aCA9IGBtIDEyOSwtMTkxIGMgLTYsMjEgLTIyLDQwIC00OCw0MiA4LC0yMyAtOCwtMzggXG4tMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyA0MCwwIDU3LC0yMiA1NywtMjIgbCAtMjAsNjkgXG5jIC03LDE4IC0yMiwzMyAtNDUsMzUgOCwtMjMgLTgsLTM4IC0yNSwtMzggLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IFxuMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIGwgLTM2LDEyOCAxMiw0IDc3LC0yNzAgemA7XG4vKiogVGhpcnR5LXNlY29uZHRoIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3QgdGhpcnR5U2Vjb25kUmVzdFBhdGggPSBgbSAxMjksLTE5MSBjIC02LDIxIC0yMiw0MCAtNDgsNDIgOCwtMjMgLTgsLTM4IFxuLTI1LC0zOCAtMTcsMCAtMjcsMTMgLTI3LDMxIDAsMTQgMTUsMjcgMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIGwgLTIwLDY5IFxuYyAtNywxOCAtMjIsMzMgLTQ1LDM1IDgsLTIzIC04LC0zOCAtMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyBcbjMxLDI3IDQwLDAgNTcsLTIyIDU3LC0yMiBMIDY4LDIwIEMgNjEsMzcgNDYsNTEgMjQsNTIgMzIsMjkgMTYsMTQgLTEsMTQgYyBcbi0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyAzOCwwIDU1LC0yMCA1NywtMjIgbCAtMzYsMTI4IDEyLDQgXG4xMDUsLTM2OSB6YDtcbi8qKiBTaXh0eS1mb3V1cnRoIG5vdGUgcmVzdCBTVkcgcGF0aCAqL1xuY29uc3Qgc2l4dHlGb3VydGhSZXN0UGF0aCA9IGBtIDE1OCwtMjkyIGMgLTYsMjEgLTIyLDQwIC00OCw0MiA4LC0yMyAtOCwtMzggXG4tMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyA0MCwwIDU3LC0yMiA1NywtMjIgbCAtMTcsNjEgXG52IDAgYyAtNiwyMSAtMjIsNDAgLTQ4LDQyIDgsLTIzIC04LC0zOCAtMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCBcbjE1LDI3IDMxLDI3IDQwLDAgNTcsLTIyIDU3LC0yMiBsIC0yMCw2OSBjIC03LDE4IC0yMiwzMyAtNDUsMzUgOCwtMjMgLTgsLTM4IFxuLTI1LC0zOCAtMTcsMCAtMjcsMTMgLTI3LDMxIDAsMTQgMTUsMjcgMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIEwgNjgsMjAgQyBcbjYxLDM3IDQ2LDUxIDI0LDUyIDMyLDI5IDE2LDE0IC0xLDE0IGMgLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IDMxLDI3IFxuMzgsMCA1NSwtMjAgNTcsLTIyIGwgLTM2LDEyOCAxMiw0IDEzNCwtNDY5IHpgO1xuXG4vKiogU3RhZmYgbGluZSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IHN0YWZmTGluZVBhdGggPSAnbSAwLDAgaCAxMDAnO1xuLyoqIEV4dHJhIGxpbmUgKG92ZXIgb3IgdW5kZXIgc3RhZmYpIFNWRyBwYXRoICovXG5leHBvcnQgY29uc3QgZXh0cmFMaW5lUGF0aCA9ICdtIC0yNSwwIGggMTc1Jztcbi8qKiBCYXIgbGluZSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IGJhclBhdGggPSAnbSAwLC0yMDAgdiA0MDAnO1xuLyoqIE5vdGUgc3RlbSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IHN0ZW1QYXRoID0gJ20gMCwwIHYgMTAwIGggMTUgdiAtMTAwIHonO1xuLyoqIE5vdGUgZmxhZyBmb3Igc2luZ2xlIGluc3RhbmNlICgxLzh0aCBub3RlcykgU1ZHIHBhdGggKi9cbmV4cG9ydCBjb25zdCBzaW5nbGVGbGFnUGF0aCA9IGBNMCwwIGggMTIgYyA3LDEwMCAxNzUsMTU2IDYyLDMxNCA3OSwtMTc3IC00OSxcbi0xOTMgLTYxLC0yMDAgbCAtMTMsLTUgemA7XG4vKiogTm90ZSBmbGFnIGZvciBtdWx0aXBsZSBpbnN0YW5jZSAoMS8xNnRoIG5vdGVzIGFuZCBzaG9ydGVyKSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IG11bHRpRmxhZ1BhdGggPSBgbSAwLDAgaCAxMCBjIDYsNzIgMTczLDY0IDg0LDIyNyA0NCwtMTIwIC00NCxcbi0xMjMgLTk0LC0xNjcgemA7XG4vKiogTm90ZSB0aWUgU1ZHIHBhdGggKi9cbmV4cG9ydCBjb25zdCB0aWVQYXRoID0gYE0gMCwyNSBDIDEwLDQ2IDMwLDY3IDUwLDY3IDY5LDY3IDkwLDQ3IDEwMCwyNSA5NCxcbjY1IDczLDg5IDUwLDg5IDI2LDg5IDUsNjMgMCwyNSBaYDtcbi8qKiBOb3RlIGRvdCBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IGRvdFBhdGggPSAnTSA1IC0yMCBhIDIwIDIwIDAgMSAwIDAuMDAwMDEgMCB6JztcblxuLyoqXG4gKiBBIHN0cnVjdHVyZSB0byBob2xkIGFsbCBkZXRhaWxzIHRvIGNvbXBvc2UgYSBub3RlIGNvbWJpbmluZyBTVkcgcGF0aCBcbiAqIGRldGFpbHMgYW5kIHRoZWlyIGN1YW50aXRpZXMgKHBvc2l0aW9uLCBudW1iZXIgb2YgZmxhZ3MuLi4pXG4gKi9cbmludGVyZmFjZSBOb3RlUGF0aERldGFpbHMge1xuICAvKiogTm90ZSBoZWFkIFNWRyBwYXRoICovXG4gIHBhdGg6IHN0cmluZztcbiAgLyoqIE5vdGUgaGVhZCB3aWR0aCBzY2FsZSAob3ZlciBgUEFUSF9TQ0FMRWAgcHJvcG9ydGlvbnMpICovIFxuICB3aWR0aDogbnVtYmVyO1xuICAvKiogTm90ZSBzdGVtIGxlbmdodCBtZWFzdXJlZCBpbiB2ZXJ0aWNhbCBzdGFmZiBzdGVwcyAoMiBwZXIgc3RhZmYgbGluZSkgKi9cbiAgc3RlbVZTdGVwczogbnVtYmVyO1xuICAvKiogVmVydGljYWwgcG9zaXRpb24gb2Ygbm90ZSBzdGVtIHN0YXJ0IChvdmVyIGBQQVRIX1NDQUxFYCBwcm9wb3J0aW9ucykgKi9cbiAgc3RlbUFuY2hvcjogbnVtYmVyO1xuICAvKiogTnVtYmVyIG9mIG5vdGUgZmxhZ3MgKi9cbiAgZmxhZ3M6IG51bWJlcjtcbn1cblxuLyoqIE5vdGUgcGF0aCBkZXRhaWxzIGluZGV4ZWQgYnkgbnVtYmVyIG9mIG5vdGUgcXVhcnRlcnMgKi9cbmV4cG9ydCBjb25zdCBOT1RFX1BBVEhTOiB7W2luZGV4OiBudW1iZXJdOiBOb3RlUGF0aERldGFpbHN9ID0ge1xuICA0OiB7XG4gICAgcGF0aDogd2hvbGVIZWFkUGF0aCwgd2lkdGg6IDE1MCwgc3RlbVZTdGVwczogMCwgc3RlbUFuY2hvcjogMCwgXG4gICAgZmxhZ3M6IDBcbiAgfSxcbiAgMjoge1xuICAgIHBhdGg6IGhhbGZIZWFkUGF0aCwgd2lkdGg6IDEyNSwgc3RlbVZTdGVwczogNywgc3RlbUFuY2hvcjogLTEwLCBcbiAgICBmbGFnczogMFxuICB9LFxuICAxOiB7XG4gICAgcGF0aDogcXVhcnRlckhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiA3LCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiAwXG4gIH0sXG4gIDAuNToge1xuICAgIHBhdGg6IHF1YXJ0ZXJIZWFkUGF0aCwgd2lkdGg6IDEyNSwgc3RlbVZTdGVwczogNywgc3RlbUFuY2hvcjogLTEwLCBcbiAgICBmbGFnczogMVxuICB9LFxuICAwLjI1OiB7XG4gICAgcGF0aDogcXVhcnRlckhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiA5LCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiAyXG4gIH0sXG4gIDAuMTI1OiB7XG4gICAgcGF0aDogcXVhcnRlckhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiAxMSwgc3RlbUFuY2hvcjogLTEwLCBcbiAgICBmbGFnczogM1xuICB9LFxuICAwLjA2MjU6IHtcbiAgICBwYXRoOiBxdWFydGVySGVhZFBhdGgsIHdpZHRoOiAxMjUsIHN0ZW1WU3RlcHM6IDEzLCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiA0XG4gIH1cbn07XG5cbi8qKiBOb3RlIHJlc3QgcGF0aHMgaW5kZXhlZCBieSBudW1iZXIgb2Ygbm90ZSBxdWFydGVycyAqL1xuZXhwb3J0IGNvbnN0IFJFU1RfUEFUSFM6IHtbaW5kZXg6IG51bWJlcl06IHN0cmluZ30gPSB7XG4gIDQ6IHdob2xlUmVzdFBhdGgsXG4gIDI6IGhhbGZSZXN0UGF0aCxcbiAgMTogcXVhcnRlclJlc3RQYXRoLFxuICAwLjU6IGVpZ3RoUmVzdFBhdGgsXG4gIDAuMjU6IHNpeHRlZW50aFJlc3RQYXRoLFxuICAwLjEyNTogdGhpcnR5U2Vjb25kUmVzdFBhdGgsXG4gIDAuMDYyNTogc2l4dHlGb3VydGhSZXN0UGF0aFxufTtcblxuLyoqIENsZWYgcGF0aHMgaW5kZXhlZCBieSBlcXVpdmFsZW50IE1JREkgbm90ZSAoc3RhZmYgdmVydGljYWwgcG9zaXRpb24pICovXG5leHBvcnQgY29uc3QgQ0xFRl9QQVRIUzoge1tpbmRleDogbnVtYmVyXTogc3RyaW5nfSA9IHtcbiAgNTA6IGZDbGVmUGF0aCxcbiAgNzE6IGdDbGVmUGF0aFxufTtcblxuLyoqIEFjY2lkZW50YWwgcGF0aHMgaW5kZXhlZCBieSBudW1lcmljIGlkZW50aWZpZXIgKi9cbmV4cG9ydCBjb25zdCBBQ0NJREVOVEFMX1BBVEhTID0gW251bGwsIHNoYXJwUGF0aCwgZmxhdFBhdGgsIG5vcm1hbFBhdGhdOyIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG4gLyoqIFNWRyBOYW1lU3BhY2Ugc3RyaW5nICovXG5leHBvcnQgY29uc3QgU1ZHTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG4vKipcbiAqIERyYXdzIGEgU1ZHIHBhdGggb24gYSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSBlIFRoZSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSBwYXRoIFRoZSBTVkcgcGF0aFxuICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0geSBWZXJ0aWNhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0gc2NhbGVYIEhvcml6b250YWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEBwYXJhbSBzY2FsZVkgVmVydGljYWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEBwYXJhbSBvcGFjaXR5IE9wYWNpdHkgKHdoZXJlIDAgaXMgdHJhbnNwYXJlbnQgYW5kIDEgaXMgZnVsbHkgb3BhcXVlKVxuICogQHJldHVybnMgVGhlIGRyYXduIFNWRyBwYXRoIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdTVkdQYXRoKFxuICBlOiBTVkdFbGVtZW50LCBwYXRoOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBcbiAgc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyLCBvcGFjaXR5ID0gMVxuKTogU1ZHRWxlbWVudCB7XG4gIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR05TLCAncGF0aCcpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIHBhdGgpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhcbiAgICBudWxsLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3h9LCAke3l9KSBzY2FsZSgke3NjYWxlWH0sICR7c2NhbGVZfSlgXG4gICk7XG4gIGNoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdvcGFjaXR5JywgYCR7b3BhY2l0eX1gKTtcbiAgZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gKiBEcmF3cyBhIFNWRyB0ZXh0IG9uIGEgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gZSBUaGUgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCB0byBiZSBkcmF3blxuICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0geSBWZXJ0aWNhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byBjb250YWluZXIgb3JpZ2luXG4gKiBAcGFyYW0gZm9udFNpemUgVGhlIGZvbnQgc2l6ZVxuICogQHBhcmFtIGlzQm9sZCBXZXRoZXIgdGhlIHRleHQgc2hvdWxkIGJlIGJvbGQgb3Igbm90XG4gKiBAcGFyYW0gc2NhbGVYIEhvcml6b250YWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEBwYXJhbSBzY2FsZVkgVmVydGljYWwgc2NhbGUgaW4gYSBmYWN0b3Igb3ZlciAxLjBcbiAqIEByZXR1cm5zIFRoZSBkcmF3biBTVkcgdGV4dCBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U1ZHVGV4dChcbiAgZTogU1ZHRWxlbWVudCwgdGV4dDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgXG4gIGZvbnRTaXplOiBzdHJpbmcsIGlzQm9sZD1mYWxzZSwgc2NhbGVYID0gMSwgc2NhbGVZID0gMVxuKTogU1ZHRWxlbWVudCB7XG4gIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR05TLCAndGV4dCcpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZm9udC1mYW1pbHknLCAnVGltZXMnKTtcbiAgY2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZvbnQtc2l6ZScsIGZvbnRTaXplKTtcbiAgaWYgKGlzQm9sZCkge2NoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmb250LXdlaWdodCcsICdib2xkJyk7fVxuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhcbiAgICBudWxsLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3h9LCAke3l9KSBzY2FsZSgke3NjYWxlWH0sICR7c2NhbGVZfSlgXG4gICk7XG4gIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gIGNoaWxkLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgU1ZHIGdyb3VwIG9uIGEgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gZSBUaGUgU1ZHIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gaWQgVGhlIHN0cmluZyB0byBpZGVudGlmeSBpdCB3aGVuIHNlYXJjaGVkIGZvclxuICogQHJldHVybnMgVGhlIGNyZWF0ZWQgU1ZHIGdyb3VwIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNWR0dyb3VwQ2hpbGQoZTogU1ZHRWxlbWVudCwgaWQ6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdOUywgJ2cnKTtcbiAgY2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgaWQpO1xuICBlLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmYWRpbmcgYW5pbWF0aW9uIHRvIHBsYXkgb24gYSBTVkcgZWxlbWVudFxuICogQHBhcmFtIGUgVGhlIGVsZW1lbnQgdG8gYmUgYW5pbWF0ZWRcbiAqIEBwYXJhbSBib3VuY2UgV2V0aGVyIHRoZSBhbmltYXRpb24gc2hvdWxkIHJlcGVhdCBiYWNrd2FyZHMgYW5kIGZvcndhcmRcbiAqIEBwYXJhbSBmcm9tIEluaXRpYWwgb3BhY2l0eSAoMSBpcyBmdWxseSBvcGFxdWUpXG4gKiBAcGFyYW0gdG8gRmluYWwgb3BhY2l0eSAoMCBpcyB0cmFuc3BhcmVudClcbiAqIEByZXR1cm5zIFRoZSByZWNlaXZlZCBTVkcgZWxlbWVudCB0byBiZSBhbmltYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmFkZShcbiAgZTogU1ZHRWxlbWVudCwgYm91bmNlID0gZmFsc2UsIGZyb20gPSAxLCB0byA9IDBcbik6IFNWR0VsZW1lbnQge1xuICBsZXQgYW5pbWF0aW9uID0gZS5xdWVyeVNlbGVjdG9yKGBhbmltYXRlYCk7XG4gIGlmICghYW5pbWF0aW9uKXtcbiAgICBhbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdhbmltYXRlJyk7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2R1cicsICc0cycpO1xuICAgIGFuaW1hdGlvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICdmcmVlemUnKTtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2tleVRpbWVzJywgJzA7IDAuMjU7IDAuNTsgMC43NTsgMScpO1xuICAgIGNvbnN0IGVhc3lJbiA9IChmcm9tICsgMyAqIHRvKSAvIDQ7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgbnVsbCwgJ3ZhbHVlcycsIGAke2Zyb219OyAke2Vhc3lJbn07ICR7dG99OyAke2Vhc3lJbn07ICR7ZnJvbX1gXG4gICAgKTtcbiAgfVxuICBpZiAoYm91bmNlKSB7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdyZXBlYXRDb3VudCcsICcxJyk7XG4gIH1cbiAgZS5hcHBlbmRDaGlsZChhbmltYXRpb24pO1xuICByZXR1cm4gZTtcbn1cblxuLyoqXG4gKiBGaWxscyBhIFNWRyBlbGVtZW50IHdpdGggYSBnaXZlbiBjb2xvclxuICogQHBhcmFtIGUgVGhlIFNWRyBlbGVtZW50IGZvIGJlIGZpbGxlZFxuICogQHBhcmFtIGNvbG9yIFRoZSBmaWxsIGNvbG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWxsKGU6IFNWR0VsZW1lbnQsIGNvbG9yOiBzdHJpbmcpIHtcbiAgZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIGNvbG9yKTtcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIHN0cm9rZSB3aWR0aCBhbmQgY29sb3VyIG9mIGEgZ2l2ZW4gU1ZHIGVsZW1lbnRcbiAqIEBwYXJhbSBlIFRoZSBTVkcgZWxlbWVudCB0byBjaGFuZ2UgdGhlIHN0cm9rZSB0b1xuICogQHBhcmFtIHN0cm9rZVdpZHRoIFRoZSBzdHJva2Ugd2lkdGhcbiAqIEBwYXJhbSBjb2xvciBUaGUgbmV3IGNvbG91clxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0U3Ryb2tlKGU6IFNWR0VsZW1lbnQsIHN0cm9rZVdpZHRoOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcbiAgZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnc3Ryb2tlLXdpZHRoJywgYCR7c3Ryb2tlV2lkdGh9YCk7XG4gIGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3N0cm9rZScsIGNvbG9yKTtcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIGJvdGggZmlsbCBhbmQgc3Ryb2tlIGNvbG91cnMgb2YgYSBTVkcgZWxlbWVudFxuICogQHBhcmFtIGUgVGhlIFNWRyBlbGVtZW50IHRvIGNoYW5nZSBjb2xvdXJzXG4gKiBAcGFyYW0gY29sb3IgVGhlIG5ldyBjb2xvdXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZ2hsaWdodEVsZW1lbnQoZTogU1ZHRWxlbWVudCwgY29sb3I6IHN0cmluZykge1xuICBlLnNldEF0dHJpYnV0ZSgnZmlsbCcsIGNvbG9yKTtcbiAgZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIGNvbG9yKTtcbn1cbiIsIi8qKlxuICogRnVuY3Rpb25hbCB1bml0IHRlc3Qgc2V0IGZvciByaHl0aG0gc3BsaXR0aW5nIG9uIHN0YWZmcmVuZGVyIGxpYnJhcnkuXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IFBhc2N1YWwgZGUgSnVhbiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IFRlc3REYXRhIH0gZnJvbSAnLi90ZXN0X2RhdGEnO1xuXG5leHBvcnQgY29uc3QgdGVzdERhdGE6IFRlc3REYXRhW10gPSBbXTtcblxudmFyIHBvc2l0aW9uID0gMDsgLy8gVXNlZCBmb3IgaW5jcmVtZW50YWwgbm90ZSBzdGFydGluZyBwb2ludFxuXG50ZXN0RGF0YVswXSA9IHtcbiAgdGl0bGU6IGBOb3RlIHN5bWJvbHMgYW5kIHRoZWlyIGR1cmF0aW9uc2AsXG4gIGRlc2NyaXB0aW9uOiBgTm90ZXMgb2YgZGlmZmVyZW50IGxlbmd0aCBzaG91bGQgY29tcGxldGUgZWFjaCBiYXIgZ29pbmcgZnJvbSBcXFxuICAgIHdob2xlIG5vdGUgdGhyb3VnaCAxLzJ0aCwgMS80dGgsIDEvOHRoLCAxLzE2dGgsIDEvMzJ0aCBhbmQgMS82NHRoLCB3aGljaCBcXFxuICAgIGlzIHRoZSBsb3dlc3QgaGFuZGxlZCByZXNvbHV0aW9uLiBTdGVtcyBvbiBmaXJzdCBoYWxmIGJhciBzaG91bGQgYmUgXFxcbiAgICB1cHdhcmRzIGFuZCBzaG91bGQgYmUgZG93bndhcmRzIG9uIHNlY29uZCBoYWxmLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW10sXG4gIH1cbn07XG5wb3NpdGlvbiA9IDA7XG5mb3IgKGxldCBuID0gMTsgbiA8IDEyODsgbiAqPSAyKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gNCAvIG47XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgY29uc3Qgbm90ZVBpdGNoID0gNjcgKyAoaSA+PSBuIC8gMiA/IDUgOiAwKTtcbiAgICB0ZXN0RGF0YVswXS5kYXRhLm5vdGVzLnB1c2goXG4gICAgICB7IHN0YXJ0OiBwb3NpdGlvbiwgbGVuZ3RoOiBkdXJhdGlvbiwgcGl0Y2g6IG5vdGVQaXRjaCwgaW50ZW5zaXR5OiAxMjcgfVxuICAgICk7XG4gICAgcG9zaXRpb24gKz0gZHVyYXRpb247XG4gIH1cbn1cblxudGVzdERhdGFbMV0gPSB7IC8vIE5vdCByZXF1aXJlZCBmb3IgdW5pdGFyeSB0ZXN0IGJ1dCBmb3IgdmlzdWFsIHRlc3QuXG4gIHRpdGxlOiBgU3RlbSBkaXJlY3Rpb24gdGhyZXNob2xkYCxcbiAgZGVzY3JpcHRpb246IGBTdGVtIHNob3VsZCBiZSB1cHdhcmRzIHVwIHRvIHRoaXJkIGxpbmUgbm90ZXMgKGluY2x1ZGVkKS5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMSwgcGl0Y2g6IDY5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMSwgbGVuZ3RoOiAxLCBwaXRjaDogNzEsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLCBsZW5ndGg6IDEsIHBpdGNoOiA3MiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogMSwgcGl0Y2g6IDc0LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbMl0gPSB7XG4gIHRpdGxlOiBgUmVzdCBzeW1ib2xzIGFuZCB0aGVpciBkdXJhdGlvbnNgLFxuICBkZXNjcmlwdGlvbjogYE5vdGVzIG9mIGRpZmZlcmVudCBsZW5ndGggc2hvdWxkIGJlIHBhaXJlZCB3aXRoIHRoZWlyIHJlbGF0aXZlIFxcXG4gICAgcmVzdC4gTGFzdCBub3RlIGhhcyBiZWVuIHBsYWNlZCB0byBjb21wbGV0ZSB0aGUgYmFyIGFuZCBtYWtlIGxhc3QgcmVzdCBcXFxuICAgIG5vdGljZWFibGUuYCxcbiAgZGF0YToge1xuICAgIG5vdGVzOiBbXSxcbiAgfVxufTtcbnBvc2l0aW9uID0gMDtcbmZvciAobGV0IG4gPSAxOyBuIDwgMTI4OyBuICo9IDIpIHtcbiAgY29uc3QgZHVyYXRpb24gPSA0IC8gbjtcbiAgdGVzdERhdGFbMl0uZGF0YS5ub3Rlcy5wdXNoKFxuICAgIHsgc3RhcnQ6IHBvc2l0aW9uLCBsZW5ndGg6IGR1cmF0aW9uLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgKTtcbiAgcG9zaXRpb24gKz0gMiAqIGR1cmF0aW9uO1xufVxudGVzdERhdGFbMl0uZGF0YS5ub3Rlcy5wdXNoKFxuICB7IHN0YXJ0OiBwb3NpdGlvbiwgbGVuZ3RoOiAwLjEyNSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4pOyAvLyBDb21wbGV0aW5nIGJhclxuXG50ZXN0RGF0YVszXSA9IHtcbiAgdGl0bGU6IGBEb3R0ZWQgbm90ZXNgLFxuICBkZXNjcmlwdGlvbjogYE5vdGUgbGVuZ3RoIGNhbiBiZSBleHRlbmRlZCB0byBhIDE1MCUgb2YgaXRzIG5vbWluYWwgdmFsdWUgXFxcbiAgICBhZGRpbmcgYSBkb3QgYWZ0ZXIgdGhlIG5vdGUgc3ltYm9sLiBUaGlzIGFwcGxpZXMgdG8gYWxsIG5vdGUgc3ltYm9scyBidXQgXFxcbiAgICBpdCB3aWxsIG5vdCBiZSBhcHBsaWVkIHRvIHJlc3RzIHN5bWJvbHMsIGJlc2lkZXMgaXQgaXMgbm90IGZvcmJpZGRlbiB1bmRlciBcXFxuICAgIHNvbWUgY2lyY3Vtc3RhbmNlcywgZm9sbG93aW5nIHRoZSBjbGFzc2ljYWwgbXVzaWMgdHJhbnNjcmlwdGlvbiBjaHJpdGVyaWEgXFxcbiAgICBkaXNyZWNvbW1lbmRpbmcgdGhlIHVzZSBvZiBkb3R0ZWQgcmVzdHMgaW4gb3JkZXIgdG8gZWFzZSB0aGUgcmVhZGFiaWxpdHkuIFxcXG4gICAgTGFzdCBub3RlIGlzIGluY2x1ZGVkIHRvIG1ha2UgbGFzdCByZXN0cyBub3RpY2VhYmxlLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAzLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLjc1LCBsZW5ndGg6IDAuMjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG5cbnRlc3REYXRhWzRdID0geyAvLyBOb3QgcmVxdWlyZWQgZm9yIHVuaXRhcnkgdGVzdCBidXQgZm9yIHZpc3VhbCB0ZXN0LlxuICB0aXRsZTogYFRyZWJsZSBDbGVmIChHLUNsZWYpYCxcbiAgZGVzY3JpcHRpb246IGBMZWZ0bW9zdCBzeW1ib2wgKHNwaXJhbC1saWtlKSBtYWtlcyBmaXZlIGxpbmVzIHBlbnRhZ3JhbSB0byBcXFxuICAgIGNvdmVyIHBpdGNoZXMgZnJvbSBEMyB0byBHNCB0b3VjaGluZyBleHRyZW1lIGxpbmVzLiBIaWdoZXIgYW5kIGxvd2VyIFxcXG4gICAgcGl0Y2hlcyBhcmUgcmVwcmVzZW50ZWQgdXNpbmcgZXh0cmEgbGluZXMuIEMzIGlzIGNvbnNpZGVyZWQgXCJHLUNsZWYgbG93ZXIgXFxcbiAgICBib3VuZFwiLCBldmVuIHRob3VnaCBsb3dlciBub3RlcyBjYW4gYmUgcmVwcmVzZW50ZWQuIFRoZXJlJ3Mgbm8gXCJ1cHBlciBcXFxuICAgIGJvdW5kXCIgYW5kIGhpZ2hlciBub3RlcyBmcm9tIEE0IGNhbiBiZSByZXByZXNlbnRlZC4gT25jZSBzZXR0ZWQgaW4gYSBzdGFmZiBcXFxuICAgIGl0IGNhbm5vdCBiZSByZXBsYWNlZCBieSBhbm90aGVyIENsZWYuYCxcbiAgZGF0YToge1xuICAgIG5vdGVzOiBbXG4gICAgICB7IHN0YXJ0OiAwLCBsZW5ndGg6IDEsIHBpdGNoOiA2MiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEsIGxlbmd0aDogMSwgcGl0Y2g6IDY0LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMiwgbGVuZ3RoOiAxLCBwaXRjaDogNjUsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLCBsZW5ndGg6IDEsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDQsIGxlbmd0aDogMSwgcGl0Y2g6IDY5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNSwgbGVuZ3RoOiAxLCBwaXRjaDogNzEsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA2LCBsZW5ndGg6IDEsIHBpdGNoOiA3MiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDcsIGxlbmd0aDogMSwgcGl0Y2g6IDc0LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogOCwgbGVuZ3RoOiAxLCBwaXRjaDogNzYsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA5LCBsZW5ndGg6IDEsIHBpdGNoOiA3NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEwLCBsZW5ndGg6IDEsIHBpdGNoOiA3OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDExLCBsZW5ndGg6IDEsIHBpdGNoOiA2MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEyLCBsZW5ndGg6IDEsIHBpdGNoOiA1OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEzLCBsZW5ndGg6IDEsIHBpdGNoOiA1NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE0LCBsZW5ndGg6IDEsIHBpdGNoOiA1NSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE1LCBsZW5ndGg6IDEsIHBpdGNoOiA4MSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE2LCBsZW5ndGg6IDEsIHBpdGNoOiA4MywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE3LCBsZW5ndGg6IDEsIHBpdGNoOiA4NCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE4LCBsZW5ndGg6IDEsIHBpdGNoOiA4NiwgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG5cbnRlc3REYXRhWzVdID0geyAvLyBOb3QgcmVxdWlyZWQgZm9yIHVuaXRhcnkgdGVzdCBidXQgZm9yIHZpc3VhbCB0ZXN0LlxuICB0aXRsZTogYEJhc3MgQ2xlZiAoRi1DbGVmKWAsXG4gIGRlc2NyaXB0aW9uOiBgTGVmdG1vc3Qgc3ltYm9sICh0aGUgY3VydmVkIG9uZSBhbG9uZ3NpZGV3aXRoIGNvbG9uKSBtYWtlcyBcXFxuICAgIGZpdmUgbGluZXMgcGVudGFncmFtIHRvIGNvdmVyIHBpdGNoZXMgZnJvbSBGMSB0byBCMiB0b3VjaGluZyBleHRyZW1lIFxcXG4gICAgbGluZXMuIEhpZ2hlciBhbmQgbG93ZXIgcGl0Y2hlcyBhcmUgcmVwcmVzZW50ZWQgdXNpbmcgZXh0cmEgbGluZXMuIEMzIGlzIFxcXG4gICAgY29uc2lkZXJlZCBcIkYtQ2xlZiB1cHBlciBib3VuZFwiLCBldmVuIHRob3VnaCBoaWdoZXIgbm90ZXMgY2FuIGJlIFxcXG4gICAgcmVwcmVzZW50ZWQuIFRoZXJlJ3Mgbm8gXCJsb3dlciBib3VuZFwiIGFuZCBsb3dlciBub3RlcyBmcm9tIEUxIGNhbiBiZSBcXFxuICAgIHJlcHJlc2VudGVkLiBPbmNlIHNldHRlZCBpbiBhIHN0YWZmIGl0IGNhbm5vdCBiZSByZXBsYWNlZCBieSBhbm90aGVyIENsZWYuYCxcbiAgZGF0YToge1xuICAgIG5vdGVzOiBbXG4gICAgICB7IHN0YXJ0OiAwLCBsZW5ndGg6IDEsIHBpdGNoOiA1OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEsIGxlbmd0aDogMSwgcGl0Y2g6IDU3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMiwgbGVuZ3RoOiAxLCBwaXRjaDogNTUsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLCBsZW5ndGg6IDEsIHBpdGNoOiA1MywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDQsIGxlbmd0aDogMSwgcGl0Y2g6IDUyLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNSwgbGVuZ3RoOiAxLCBwaXRjaDogNTAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA2LCBsZW5ndGg6IDEsIHBpdGNoOiA0OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDcsIGxlbmd0aDogMSwgcGl0Y2g6IDQ3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogOCwgbGVuZ3RoOiAxLCBwaXRjaDogNDUsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA5LCBsZW5ndGg6IDEsIHBpdGNoOiA0MywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEwLCBsZW5ndGg6IDEsIHBpdGNoOiA0MSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDExLCBsZW5ndGg6IDEsIHBpdGNoOiA2MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEyLCBsZW5ndGg6IDEsIHBpdGNoOiA2MiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEzLCBsZW5ndGg6IDEsIHBpdGNoOiA2NCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE0LCBsZW5ndGg6IDEsIHBpdGNoOiA2NSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE1LCBsZW5ndGg6IDEsIHBpdGNoOiA0MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE2LCBsZW5ndGg6IDEsIHBpdGNoOiAzOCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE3LCBsZW5ndGg6IDEsIHBpdGNoOiAzNiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDE4LCBsZW5ndGg6IDEsIHBpdGNoOiAzNSwgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG5cbnRlc3REYXRhWzZdID0ge1xuICB0aXRsZTogYFNoYXJwIEFjY2lkZW50YWxzYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlcyBjYW4gbW9kaWZ5IHRoZWlyIHBpdGNoIG9uZSBzZW1pdG9uZSB1cCB1c2luZyBBY2NpZGVudGFsIFxcXG4gICAgc3ltYm9sICcjJyAoY2FsbGVkIHNoYXJwKSBiZWZvcmUgYSBub3RlIHN5bWJvbC4gT25jZSBtb2RpZmllZCAobGV0J3Mgc2F5IFxcXG4gICAgRzMpLCBhbGwgbm90ZXMgaW4gc2FtZSBzdGFmZiBwb3NpdGlvbiBhcmUgbW9kaWZpZWQgYXMgd2VsbCB1bnRpbCB0aGUgZW5kIFxcXG4gICAgb2YgY3VycmVudCBiYXIuIFNldHRpbmcgYW4gQWNjaWRlbnRhbCBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgYmFyIGluc3RlYWQgdG8gXFxcbiAgICBhIHNpbmdsZSBub3RlIG1ha2VzIGl0IGFwcGx5IGFsbCBub3RlcyBvZiBzYW1lIG5hbWUgKGkuZS4gRzMgYW5kIEc0KSB0byBcXFxuICAgIHRoaXMgYW5kIGZvbGxvd2luZyBiYXJzLiBUaGlzIGlzIGNhbGxlZCBLZXkgU2lnbmF0dXJlIGFuZCByZXNldHMgcHJldmlvdXMgXFxcbiAgICBLZXkgU2lnbmF0dXJlcywgaWYgYW55LiBUaGVyZSBpcyBhIE5vcm1hbCBTeW1ib2wgdG8gYW51bGUgYWN0aXZlIFxcXG4gICAgbm90ZSBBY2NpZGVudGFsIG9mIGZvbGxvd2luZyBub3RlcyB1bnRpbCB0aGUgZW5kIG9mIGJhciwgd2hlcmUgdGhlcmUgd291bGQgXFxcbiAgICBiZSBhIEtleSBTaWduYXR1cmUgcmUtYWN0aXZhdGlvbi4gRG91YmxlIHNoYXJwIGFuZCBzaW1pbGFyIEFjY2lkZW50YWxzIGFyZSBcXFxuICAgIG5vdCBjb3ZlcmVkIGFuZCB3aWxsIGJlIHJlcHJlc2VudGVkIGFzIG5leHQgbm90ZSBpZiBhcHBsaWNhYmxlLiBGb2xsb3dpbmcgXFxcbiAgICBzY29yZSBzaG93cyBhIEtleSBTaWduYXR1cmUgYW5kIHNvbWUgbm90ZXMsIGluIG9yZGVyLCB1bmFsdGVyZWQsIHNoYXJwLCBcXFxuICAgIHNoYXJwIChubyBuZWVkIGZvciBBY2NpZGVudGFsIHN5bWJvbCksIHNoYXJwIChpbiBvdGhlciBzY2FsZSwgbmVlZGluZyBmb3IgXFxcbiAgICBzaGFycCBzeW1ib2wgYWdhaW4pLCBub3JtYWwgKGJhY2sgdG8gdW5hbHRlcmVkKSwgc2hhcnAgKGluIGl0aGVyIHNjYWxlIFxcXG4gICAgYWdhaW4gd2l0aCBubyBuZWVkIGZvciBBY2NpZGVudGFsKSwgdW5hbHRlcmVkLCBzaGFycCBhZ2FpbiwgZW5kIG9mIGJhciBcXFxuICAgIHdpdGggQWNjaWRlbnRhbHMgcmVzZXQgKGV4Y2VwdCB0aGUgb25lcyBmcm9tIGtleSBzaWduYXR1cmUpLCBzaGFycCBhbmQsIFxcXG4gICAgZmluYWxseSwgc2hhcnAgKGFwcGx5aW5nIGtleSBzaWduYXR1cmUgdG8gc2FtZSBuYW1lIG5vdGUgaW4gb3RoZXIgc2NhbGUpLmAsXG4gIGRhdGE6IHtcbiAgICBrZXlTaWduYXR1cmVzOiBbIHsgc3RhcnQ6IDAsIGtleTogNyB9IF0sXG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMC41LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAwLjUsIGxlbmd0aDogMC41LCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLjAsIGxlbmd0aDogMC41LCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLjUsIGxlbmd0aDogMC41LCBwaXRjaDogODAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLjAsIGxlbmd0aDogMC41LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyLjUsIGxlbmd0aDogMC41LCBwaXRjaDogODAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMy41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNCwgbGVuZ3RoOiAyLCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA2LCBsZW5ndGg6IDIsIHBpdGNoOiA2NiwgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG5cbnRlc3REYXRhWzddID0ge1xuICB0aXRsZTogYEZsYXQgQWNjaWRlbnRhbHNgLFxuICBkZXNjcmlwdGlvbjogYE5vdGVzIGNhbiBtb2RpZnkgdGhlaXIgcGl0Y2ggb25lIHNlbWl0b25lIGRvd24gdXNpbmcgXFxcbiAgICBBY2NpZGVudGFsIHN5bWJvbCAnYicgKGNhbGxlZCBmbGF0KSBiZWZvcmUgYSBub3RlIHN5bWJvbC4gU2FtZSBydWxlcyBhcHBseSBcXFxuICAgIGFzIGluIFNoYXJwIEFjY2lkZW50YWxzIHNjZW5hcmlvLiBEb3VibGUgZmxhdCBpcyBub3QgY292ZXJlZCBlaXRoZXIuIFxcXG4gICAgU2ltaWxhciBwYXR0ZXJuIGhhcyBiZWVuIHVzZWQgb24gc2NvcmVgLFxuICBkYXRhOiB7XG4gICAga2V5U2lnbmF0dXJlczogWyB7IHN0YXJ0OiAwLCBrZXk6IDUgfSBdLFxuICAgIG5vdGVzOiBbXG4gICAgICB7IHN0YXJ0OiAwLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMC41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMS4wLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMS41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDgwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMi4wLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY5LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMi41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDgwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMywgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDQsIGxlbmd0aDogMiwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNiwgbGVuZ3RoOiAyLCBwaXRjaDogNTgsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuXG50ZXN0RGF0YVs4XSA9IHtcbiAgdGl0bGU6IGBLZXkgU2lnbmF0dXJlcyBvbiBjaHJvbWF0aWMgc2NhbGVzYCxcbiAgZGVzY3JpcHRpb246IGBUaGVyZSBpcyBhIGNsb3NlIHNldCBvZiAxMiBLZXkgU2lnbmF0dXJlcy4gSGFsZiBvZiB0aGVtIHVzZSBcXFxuICAgIHNoYXJwcyAoZnJvbSAwIHRvIDUgc2hhcnBzOiBDLCBHLCBELCBBLCBFIGFuZCBCIGtleXMsIHRoZSByaWdodCBzaWRlIG9mIFxcXG4gICAgdGhlIENpcmNsZSBvZiBGaWZ0aHMpIGFuZCB0aGUgcmVzdCB1c2UgZmxhdHMgKGZyb20gMSB0byA2IGZsYXRzOiBGLCBCYiwgXFxcbiAgICBFYiwgQWIsIERiIGFuZCBHYiBrZXlzKS4gRm9sbG93aW5nIHNjb3JlIHdpbGwgc2hvdyBhIGNocm9tYXRpYyBzY2FsZSBvbiBcXFxuICAgIGVhY2gga2V5IGluIHRoYXQgcHJlY2lzZSBvcmRlci4gT3ZlcmxhcHBpbmcga2V5cyB3aXRoIGRpZmZlcmVudCBuYW1lcyAoR2IgXFxcbiAgICA9IEYjKSBoYXZlIGJlZW4gcmVtb3ZlZCBmb3Igc2ltcGxpY2l0eSBzYWtlLiBBY2NpZGVudGFscyB3aWxsIGJlIG9mIGEgXFxcbiAgICB1bmlxdWUga2luZCBhbG9uZyBhIGdpdmVuIGtleSwgc28gdGVyZSB3b24ndCBhcHBlYXIgYSBtaXggc2hhcnBzIGFuZCBcXFxuICAgIGZsYXRzIChldmVuIHRob3VnaCBpdCdzIGFsbG93ZWQgaW4gbXVzaWNhbCBoYW5kd3JpdGluZykuYCxcbiAgZGF0YToge1xuICAgIGtleVNpZ25hdHVyZXM6IFsgXG4gICAgICB7IHN0YXJ0OiAgIDAsIGtleTogIDAgfSxcbiAgICAgIHsgc3RhcnQ6ICAxMiwga2V5OiAgNyB9LFxuICAgICAgeyBzdGFydDogIDI0LCBrZXk6ICAyIH0sXG4gICAgICB7IHN0YXJ0OiAgMzYsIGtleTogIDkgfSxcbiAgICAgIHsgc3RhcnQ6ICA0OCwga2V5OiAgNCB9LFxuICAgICAgeyBzdGFydDogIDYwLCBrZXk6IDExIH0sXG4gICAgICB7IHN0YXJ0OiAgNzIsIGtleTogIDUgfSxcbiAgICAgIHsgc3RhcnQ6ICA4NCwga2V5OiAxMCB9LFxuICAgICAgeyBzdGFydDogIDk2LCBrZXk6ICAzIH0sXG4gICAgICB7IHN0YXJ0OiAxMDgsIGtleTogIDggfSxcbiAgICAgIHsgc3RhcnQ6IDEyMCwga2V5OiAgMSB9LFxuICAgICAgeyBzdGFydDogMTMyLCBrZXk6ICA2IH1cbiAgICBdLFxuICAgIG5vdGVzOiBbXSxcbiAgfVxufTtcbnBvc2l0aW9uID0gMDtcbmZvciAobGV0IG4gPSAwOyBuIDwgMTI7ICsrbikge1xuICBmb3IgKGxldCBwID0gNjA7IHAgPCA3MjsgKytwKSB7XG4gICAgdGVzdERhdGFbOF0uZGF0YS5ub3Rlcy5wdXNoKFxuICAgICAgeyBzdGFydDogcG9zaXRpb24rKywgbGVuZ3RoOiAxLCBwaXRjaDogcCwgaW50ZW5zaXR5OiAxMjcgfVxuICAgICk7XG4gIH1cbn1cblxudGVzdERhdGFbOV0gPSB7XG4gIHRpdGxlOiBgVGltZSBTaWduYXR1cmVzYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlcyBjYW4gYmUgZ3JvcHVlZCBvbiBiYXJzIGFjY29yZGluZyB0byBcInB1bHNlXCIgcmh5dGhtIFxcXG4gICAgcGF0dGVybnMsIGRlZmluZWQgYnkgVGltZSBTaWduYXR1cmVzIGNvbnNpc3Rpbmcgb24gYSBudW1lcmF0b3IgYW5kIGEgXFxcbiAgICBkZW5vbWluYXRvciBudW1iZXIuIERlbm9taW5hdG9yIGRlZmluZXMgdGhlIGxlbmd0aCBvZiBpdHMgcHVsc2UgYXMgdGhlIFxcXG4gICAgZnJhY3Rpb24gb2YgYSB3aG9sZSBub3RlLCBhbmQgbnVtZXJhdG9yIGRlZmluZXMgdGhlIG51bWJlciBvZiBwdWxzZXMgXFxcbiAgICBuZWVkZWQgdG8gY29tcGxldGUgYSBiYXIuIEEgVGltZSBTaWduYXR1cmUgc2hvd24gYXQgdGhlIGJlZ2lubmluZyBvZiBhIFxcXG4gICAgYmFyIGNoYW5nZXMgcmh5dGhtIHRvIHRoYXQgYmFyIGFuZCBmb2xsb3dpbmdzLiBOZXh0IHNjb3JlIHNob3dzIHNldmVyYWwgXFxcbiAgICBUaW1lIFNpZ25hdHVyZXMuYCxcbiAgZGF0YToge1xuICAgIHRpbWVTaWduYXR1cmVzOiBbXSxcbiAgICBub3RlczogW10sXG4gIH1cbn07XG5wb3NpdGlvbiA9IDA7XG5mb3IgKGxldCBkID0gMjsgZCA8PSA4OyBkICo9IDIpIHtcbiAgY29uc3QgbCA9IDQgLyBkO1xuICBjb25zdCBkYXRhID0gdGVzdERhdGFbOV0uZGF0YTtcbiAgZm9yIChsZXQgbiA9IDI7IG4gPD0gMTI7ICsrbikge1xuICAgIGRhdGEudGltZVNpZ25hdHVyZXMucHVzaChcbiAgICAgIHsgc3RhcnQ6IHBvc2l0aW9uLCBudW1lcmF0b3I6IG4sIGRlbm9taW5hdG9yOiBkIH1cbiAgICApXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGRhdGEubm90ZXMucHVzaChcbiAgICAgICAgeyBzdGFydDogcG9zaXRpb24sIGxlbmd0aDogbCwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgICApO1xuICAgICAgcG9zaXRpb24gKz0gbDtcbiAgICB9XG4gIH1cbn1cblxudGVzdERhdGFbMTBdID0ge1xuICB0aXRsZTogYFdob2xlIHJlc3RzYCxcbiAgZGVzY3JpcHRpb246IGBXaG9sZSByZXN0IHN5bWJvbCBpcyB1c2VkIHRvIHNwZWNpZnkgYSB3aG9sZSBzaWxlbnQgYmFyLCBubyBcXFxuICAgIG1hdHRlciB3aGljaCB0aGUgdGltZSBzaWduYXR1cmUgaXMuYCxcbiAgZGF0YToge1xuICAgIHRpbWVTaWduYXR1cmVzOiBbIFxuICAgICAgeyBzdGFydDogICAwLCBudW1lcmF0b3I6ICAzLCBkZW5vbWluYXRvcjogNCB9LFxuICAgICAgeyBzdGFydDogICA2LCBudW1lcmF0b3I6ICA2LCBkZW5vbWluYXRvcjogOCB9LFxuICAgICAgeyBzdGFydDogIDEyLCBudW1lcmF0b3I6ICA3LCBkZW5vbWluYXRvcjogMiB9LFxuICAgICAgeyBzdGFydDogIDQwLCBudW1lcmF0b3I6ICA0LCBkZW5vbWluYXRvcjogNCB9XG4gICAgXSxcbiAgICBub3RlczogWyBcbiAgICAgIHsgc3RhcnQ6ICAzLCBsZW5ndGg6ICAzLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAgOSwgbGVuZ3RoOiAgMywgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMjYsIGxlbmd0aDogMTQsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDQ0LCBsZW5ndGg6ICA0LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgXVxuICB9XG59O1xuXG50ZXN0RGF0YVsxMV0gPSB7XG4gIHRpdGxlOiBgVGllc2AsXG4gIGRlc2NyaXB0aW9uOiBgTm90ZXMgbG9uZ2VyIHRoYW4gYXZpbGFibGUgbm90ZSBzeW1ib2xzIGxlbmd0aCBjYW4gYmUgYWNoaWV2ZWQgXFxcbiAgY29tYmluaW5nIHR3byBvciBtb3JlIHRocm91Z2ggdGllcy4gTm90ZXMgd2hpY2ggc3VycGFzcyBiYXJzIG11c3QgYmUgXFxcbiAgc3BsaXR0ZWQgdXNpbmcgdGllcy4gUmVzdCBhZ2dyZWdhdGlvbiBkb2VzIG5vdCBuZWVkIGFueSB0aWUuIEZvbGxvd2luZyBcXFxuICBzY29yZSBzaG93cyB0aHJlZSB0aWVkIG5vdGVzLCBhIHJlc3RzIHNldCwgdHdvIHRpZWQgbm90ZXMgdG8gc3VycGFzcyBhIGJhci5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMisxLzIrMS84LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLCBsZW5ndGg6IDIsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDcsIGxlbmd0aDogMSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcbiIsIi8qKlxuICogRnVuY3Rpb25hbCB1bml0IHRlc3Qgc2V0IGZvciByaHl0aG0gc3BsaXR0aW5nIG9uIHN0YWZmcmVuZGVyIGxpYnJhcnkuXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IFBhc2N1YWwgZGUgSnVhbiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IFRlc3REYXRhIH0gZnJvbSAnLi90ZXN0X2RhdGEnO1xuXG5leHBvcnQgY29uc3QgdGVzdERhdGE6IFRlc3REYXRhW10gPSBbXTtcblxudGVzdERhdGFbMF0gPSB7XG4gIHRpdGxlOiBgVW5jb21wbGV0ZSBwdWxzZSBmdWxmaWxsbWVudGAsXG4gIGRlc2NyaXB0aW9uOiBgTm90ZXMgc2hvdWxkIGJlIHNwbGl0ZWQgYW5kIHRpZWQgdG8gbWFrZSBjbGVhciB3aGVyZSBkb2VzIGEgXFxcbiAgICBwdWxzZSBzdGFydHMgYW5kIGVuZHMsIGVhc2luZyB0aGUgcmh5dGhtIHJlYWRhYmlsaXR5LmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDAuNSwgbGVuZ3RoOiAxLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLjUsIGxlbmd0aDogMi41LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuXG50ZXN0RGF0YVsxXSA9IHtcbiAgdGl0bGU6IGBUaWVzIGFuZCByZXN0cyBvcmRlcmluZ2AsXG4gIGRlc2NyaXB0aW9uOiBgVGhlIG9yZGVyIG9mIHRpZWQgbm90ZXMgb3IgcmVzdHMgZ3JvdXBzIHVzZXMgdG8gYmUgZGVjcmVhc2luZyBcXFxuICAgIGxlbmd0aHMgZnJvbSBsb25nZXIgZHVyYXRpb24gc3ltYm9scyB0byBzaG9ydGVyIG9uZXMsIHVubGVzcyBzdWNoIGdyb3VwIG9mIFxcXG4gICAgc3ltYm9scyBjb21wbGV0ZSBhIHB1bHNlIHdpdGhpbiBhIGJhciwgaW4gd2hpY2ggY2FzZSB0aGV5IHdpbGwgYmUgb3JkZXJlZCBcXFxuICAgIGluY3JlYXNpbmcgbGVuZ3RocyBmcm9tIHNob3J0ZXIgdG8gbG9uZ2VyIHN5bWJvbHMgaW4gb3JkZXIgdG8gXFxcbiAgICBzeW1tZXRyaWNhbGx5IGNvbXBsZXRlIHRoZSBzdGFydGluZyBwYXJ0IG9mIHRoZSBwdWxzZS4gRm9sbG93aW5nIHNjb3JlIFxcXG4gICAgc2hvd3MgdGhyZWUgZGVjcmVhc2luZyB0aWVkIG5vdGVzLCBhbiBpbmNyZWFzaW5nIHJlc3RzIHNldCwgZm9sbG93ZWQgYnkgYSBcXFxuICAgIGRlY3JlYXNpbmcgcmVzdCBzZXQgYW5kIHR3byBhc2NlbmRpbmcgdGllZCBub3RlcywgYSBsb25nIGRlY3JlYXNpbmcgcmVzdCBcXFxuICAgIHNldCBhbmQgdHdvIG5vdGVzIHRpZWQgdG8gc3VycGFzcyBhIGJhci5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMisxLzIrMS84LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA0LSgxLzQrMS8xNiksIGxlbmd0aDogMS80KzEvMTYsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDgtMS8xNiwgbGVuZ3RoOiA0KzEvMTYsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMSBQYXNjdWFsIGRlIEp1YW4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBUZXN0RGF0YSB9IGZyb20gJy4uLy4uL3Rlc3QvdGVzdF9kYXRhJztcbmltcG9ydCB7IFN0YWZmU1ZHUmVuZGVyLCBTY3JvbGxUeXBlIH0gZnJvbSAnLi4vLi4vc3JjL3N0YWZmX3N2Z19yZW5kZXInO1xuXG5jb25zdCBjb25maWcgPSB7XG4gIG5vdGVIZWlnaHQ6IDE1LFxuICBwaXhlbHNQZXJUaW1lU3RlcDogMCxcbiAgaW5zdHJ1bWVudHM6IFswXSxcbiAgZGVmYXVsdEtleTogMCxcbiAgc2Nyb2xsVHlwZTogU2Nyb2xsVHlwZS5CQVJcbn1cblxuZnVuY3Rpb24gdmlzdWFsaXplKGRpdjogSFRNTERpdkVsZW1lbnQsIHRlc3Q6IFRlc3REYXRhKSB7XG4gIGNvbnN0IGRldGFpbHNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0Rpdik7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICB0aXRsZS5pbm5lclRleHQgPSB0ZXN0LnRpdGxlO1xuICBkZXRhaWxzRGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGVzdC5kZXNjcmlwdGlvbjtcbiAgZGV0YWlsc0Rpdi5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSAndmlzdWFsaXplci1jb250YWluZXInO1xuICBkaXYuYXBwZW5kQ2hpbGQoY29udGFpbmVyRGl2KTtcbiAgY29uc3Qgc2NvcmVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoc2NvcmVEaXYpO1xuICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgbmV3IFN0YWZmU1ZHUmVuZGVyKHRlc3QuZGF0YSwgY29uZmlnLCBzY29yZURpdik7XG59XG5cbmltcG9ydCAqIGFzIGJzIGZyb20gJy4uLy4uL3Rlc3QvYmFzaWNfc3ltYm9sc19mZWF0dXJlcyc7XG5jb25zdCBic0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXNpY1N5bWJvbHMnKSBhcyBIVE1MRGl2RWxlbWVudDtcbmJzLnRlc3REYXRhLmZvckVhY2goIHRlc3QgPT4gdmlzdWFsaXplKGJzRGl2LCB0ZXN0KSApO1xuXG5pbXBvcnQgKiBhcyBycyBmcm9tICcuLi8uLi90ZXN0L3JoeXRobV9zcGxpdF9mZWF0dXJlcyc7XG5jb25zdCByc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaHl0aG1TcGxpdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xucnMudGVzdERhdGEuZm9yRWFjaCggdGVzdCA9PiB2aXN1YWxpemUocnNEaXYsIHRlc3QpICk7XG4iXSwic291cmNlUm9vdCI6IiJ9