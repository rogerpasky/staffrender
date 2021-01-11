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

/***/ "../test/rithm_split_features.ts":
/*!***************************************!*\
  !*** ../test/rithm_split_features.ts ***!
  \***************************************/
/*! exports provided: testData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testData", function() { return testData; });
const testData = [];
testData[0] = {
    title: `Uncomplete pulse fulfillment`,
    description: `Notes should be splited and tied to make clear where does a \
    pulse starts and ends, easing the rithm readability.`,
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
/* harmony import */ var _test_rithm_split_features__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../test/rithm_split_features */ "../test/rithm_split_features.ts");

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

const rsDiv = document.getElementById('rithmSplit');
_test_rithm_split_features__WEBPACK_IMPORTED_MODULE_2__["testData"].forEach(test => visualize(rsDiv, test));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9iYXJzX2luZm8udHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tb2RlbF9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXJfY29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3RhZmZfYmxvY2sudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9zdGFmZl9pbmZvLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3RhZmZfbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9zdGFmZl9zdmdfcmVuZGVyLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3ZnX3BhdGhzLnRzIiwid2VicGFjazovLy8uLi9zcmMvc3ZnX3Rvb2xzLnRzIiwid2VicGFjazovLy8uLi90ZXN0L2Jhc2ljX3N5bWJvbHNfZmVhdHVyZXMudHMiLCJ3ZWJwYWNrOi8vLy4uL3Rlc3Qvcml0aG1fc3BsaXRfZmVhdHVyZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZlYXR1cmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRUE7QUFBQTtBQUFBO0FBQUE7QUFFc0I7QUFJSztBQWtDcEIsTUFBTSxRQUFRO0lBV25CLFlBQWEsU0FBb0IsRUFBRSxLQUFhO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksb0JBQW9CLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLCtCQUErQixHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLGdCQUFnQixHQUFHLGdFQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRCxLQUFLLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLEdBQUMsRUFBRSxFQUFFO1lBQ3pELE1BQU0sT0FBTyxHQUFZO2dCQUN2QixLQUFLLEVBQUUsUUFBUTtnQkFDZixTQUFTLEVBQUUsK0JBQStCO29CQUN4QyxDQUFDLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxnQkFBZ0I7Z0JBQzVELFNBQVMsRUFBRSxnQkFBZ0I7Z0JBQzNCLEtBQUssRUFBRSxZQUFZO2dCQUNuQixZQUFZLEVBQUUsbUJBQW1CO2dCQUNqQyxhQUFhLEVBQUUsb0JBQW9CO2FBQ3BDLENBQUM7WUFDRixJQUNFLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ3BDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDL0M7Z0JBQ0EsWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQzVCO1lBQ0QsSUFDRSxRQUFRLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNO2dCQUN6QyxTQUFTLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQ3BEO2dCQUNBLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxDQUFDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQztnQkFDM0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDMUI7WUFDRCxJQUNFLFNBQVMsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQzNDLFNBQVMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDdEQ7Z0JBQ0EsK0JBQStCLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFDcEQsb0JBQW9CLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxPQUFPLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO2dCQUM3QyxnQkFBZ0IsR0FBRyxnRUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ3RELE9BQU8sQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBU00sWUFBWSxDQUFDLEtBQWE7UUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sZUFBZSxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ2hELE1BQU0sd0JBQXdCLEdBQUcsZUFBZSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDdkUsT0FBTyxTQUFTLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDO0lBQ3hELENBQUM7SUFPTSxZQUFZLENBQUMsS0FBYTtRQUMvQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekQsQ0FBQztJQVNNLFFBQVEsQ0FDYixNQUFjLEVBQUUsV0FBVyxHQUFHLEtBQUs7UUFFbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFRTSxlQUFlLENBQ3BCLEtBQWEsRUFBRSxXQUFXLEdBQUcsS0FBSztRQUVsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBUU0sZ0JBQWdCLENBQ3JCLEtBQWEsRUFBRSxXQUFXLEdBQUcsS0FBSztRQUVsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxDQUFDLElBQUksQ0FBQztJQUN6RSxDQUFDO0lBUU0sY0FBYyxDQUFDLFFBQWdCO1FBQ3BDLE9BQU8sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQVVNLGNBQWMsQ0FBQyxJQUFZO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcscUVBQW9CLENBQUMsR0FBRyxxRUFBb0IsQ0FBQztJQUNyRSxDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7QUMzTEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQU05QixNQUFNLG9CQUFvQixHQUFHLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBR3BDLE1BQU0sTUFBTSxHQUFHO0lBQ3BCO1FBQ0UsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxDQUFDO0tBQUUsRUFBRTtRQUNoRSxLQUFLLEVBQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUM7S0FBRSxFQUFFO1FBQ2hFLEtBQUssRUFBTyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFLEVBQUU7UUFDaEUsS0FBSyxFQUFPLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLEVBQUUsQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQztLQUFFO0NBQ2pFLENBQUM7QUFNSyxNQUFNLGVBQWUsR0FBRztJQUM3QixFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQztJQUM1QixFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0lBQzlDLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7SUFDbEMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7SUFDdEMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0lBQzFDLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQztJQUM5QixFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztJQUNsRCxFQUFDLFVB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QUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ3BEO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQ1osS0FBSyxFQUFFLG9CQUFvQjtJQUMzQixXQUFXLEVBQUU7Ozs7OytFQUtnRTtJQUM3RSxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUU7WUFDTCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25ELEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFB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MkNBRzRCO0lBQ3pDLElBQUksRUFBRTtRQUNKLGFBQWEsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUU7UUFDdkMsS0FBSyxFQUFFO1lBQ0wsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3BELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3RELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3BELEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN0RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ25EO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQ1osS0FBSyxFQUFFLG9DQUFvQztJQUMzQyxXQUFXLEVBQUU7Ozs7Ozs7NkRBTzhDO0lBQzNELElBQUksRUFBRTtRQUNKLGFBQWEsRUFBRTtZQUNiLEVBQUUsS0FBSyxFQUFJLENBQUMsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUcsQ0FBQyxFQUFFO1NBQ3hCO1FBQ0QsS0FBSyxFQUFFLEVBQUU7S0FDVjtDQUNGLENBQUM7QUFDRixRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtJQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQzVCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDekIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FDM0QsQ0FBQztLQUNIO0NBQ0Y7QUFFRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUc7SUFDWixLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCLFdBQVcsRUFBRTs7Ozs7O3FCQU1NO0lBQ25CLElBQUksRUFBRTtRQUNKLGNBQWMsRUFBRSxFQUFFO1FBQ2xCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7Q0FDRixDQUFDO0FBQ0YsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUNsRDtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2IsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQzFELENBQUM7WUFDRixRQUFRLElBQUksQ0FBQyxDQUFDO1NBQ2Y7S0FDRjtDQUNGO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHO0lBQ2IsS0FBSyxFQUFFLGFBQWE7SUFDcEIsV0FBVyxFQUFFO3dDQUN5QjtJQUN0QyxJQUFJLEVBQUU7UUFDSixjQUFjLEVBQUU7WUFDZCxFQUFFLEtBQUssRUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFO1lBQzdDLEVBQUUsS0FBSyxFQUFJLENBQUMsRUFBRSxTQUFTLEVBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUU7WUFDN0MsRUFBRSxLQUFLLEVBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRTtZQUM3QyxFQUFFLEtBQUssRUFBRyxFQUFFLEVBQUUsU0FBUyxFQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFO1NBQzlDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsRUFBRSxLQUFLLEVBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3BELEVBQUUsS0FBSyxFQUFHLENBQUMsRUFBRSxNQUFNLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ3JEO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHO0lBQ2IsS0FBSyxFQUFFLE1BQU07SUFDYixXQUFXLEVBQUU7Ozs4RUFHK0Q7SUFDNUUsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFO1lBQ0wsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUMxRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ25EO0tBQ0Y7Q0FDRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDN1NGO0FBQUE7QUFBTyxNQUFNLFFBQVEsR0FBZSxFQUFFLENBQUM7QUFFdkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQ1osS0FBSyxFQUFFLDhCQUE4QjtJQUNyQyxXQUFXLEVBQUU7eURBQzBDO0lBQ3ZELElBQUksRUFBRTtRQUNKLEtBQUssRUFBRTtZQUNMLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1NBQ3ZEO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQ1osS0FBSyxFQUFFLHlCQUF5QjtJQUNoQyxXQUFXLEVBQUU7Ozs7Ozs7NkNBTzhCO0lBQzNDLElBQUksRUFBRTtRQUNKLEtBQUssRUFBRTtZQUNMLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDMUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtTQUM3RDtLQUNGO0NBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3JDRjtBQUFBO0FBQUE7QUFBQTtBQUF3RTtBQUV4RSxNQUFNLE1BQU0sR0FBRztJQUNiLFVBQVUsRUFBRSxFQUFFO0lBQ2QsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEIsVUFBVSxFQUFFLENBQUM7SUFDYixVQUFVLEVBQUUsZ0VBQVUsQ0FBQyxHQUFHO0NBQzNCO0FBRUQsU0FBUyxTQUFTLENBQUMsR0FBbUIsRUFBRSxJQUFjO0lBQ3BELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QixVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3pDLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxZQUFZLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFDO0lBQ2hELEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUksb0VBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRXVEO0FBQ3hELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFtQixDQUFDO0FBQ3hFLHFFQUFXLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBRSxDQUFDO0FBRUE7QUFDdEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQW1CLENBQUM7QUFDdEUsbUVBQVcsQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFFLENBQUMiLCJmaWxlIjoiZmVhdHVyZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9mZWF0dXJlcy50c1wiKTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1xuICBTdGFmZkluZm8sIFRlbXBvSW5mbywgVGltZVNpZ25hdHVyZUluZm8sIEtleVNpZ25hdHVyZUluZm8sIGdldEJhckxlbmd0aFxufSBmcm9tICcuL3N0YWZmX2luZm8nO1xuXG5pbXBvcnQgeyBcbiAgTUFYX1FVQVJURVJfRElWSVNJT05cbn0gZnJvbSAnLi9tb2RlbF9jb25zdGFudHMnO1xuICBcbi8qKlxuICogU3RvcmVzIHRoZSBzY29yZSBzdHJ1Y3R1cmFsIGluZm8gaW4gY2h1bmtzLCBsaWtlIHNpZ25hdHVyZXMgYW5kIGJhciBkZXRhaWxzLCBcbiAqIGluIG9yZGVyIHRvIHVzZSBpdCBmb3IgYmFyIGhhbmRsaW5nLiBFdmVyeSBjaHVuayBhcHBsaWVzIGZyb20gaXRzIHN0YXJ0XG4gKiBwb2ludCB0byB0aGUgbmV4dCBvbmUuIFRoaXMgaW5mbyBjYW4gYmUgZWFzaWx5IGluZGV4ZWQgdG8gZG8gYSBmYXN0IGxvb2t1cC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCYXJJbmZvIHtcbiAgLyoqIFdoZXJlIGFsbCB0aGlzIGluZm8gc3RhcnRzIGFwcGx5aW5nICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKiBUaGUgYXBwbGljYWJsZSBiYXIgbnVtYmVyIGluIHRoaXMgY2h1bmsgKi9cbiAgYmFyTnVtYmVyOiBudW1iZXI7XG4gIC8qKiBUaGUgYXBwbGljYWJsZSBiYXIgbGVuZ3RoIGluIHRoaXMgY2h1bmsgKi9cbiAgYmFyTGVuZ3RoOiBudW1iZXI7XG4gIC8qKiBUaGUgYXBwbGljYWJsZSB0ZW1wbyBpbiB0aGlzIGNodW5rICovXG4gIHRlbXBvOiBUZW1wb0luZm87XG4gIC8qKiBUaGUgYXBwbGljYWJsZSBLZXkgU2lnbmF0dXJlIGluIHRoaXMgY2h1bmsgKi9cbiAga2V5U2lnbmF0dXJlOiBLZXlTaWduYXR1cmVJbmZvO1xuICAvKiogVGhlIGFwcGxpY2FibGUgVGltZSBTaWduYXR1cmUgaW4gdGhpcyBjaHVuayAqL1xuICB0aW1lU2lnbmF0dXJlOiBUaW1lU2lnbmF0dXJlSW5mbztcbiAgLyoqIFdldGhlciB0aGUgVGVtcG8gY2hhbmdlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgY2h1bmsgKi9cbiAgdGVtcG9DaGFuZ2U/OiBib29sZWFuO1xuICAvKiogV2V0aGVyIHRoZSBLZXkgU2lnbmF0dXJlIGNoYW5nZWQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzIGNodW5rICovXG4gIGtleUNoYW5nZT86IGJvb2xlYW47XG4gIC8qKiBXZXRoZXIgdGhlIFRpbWUgU2lnbmF0dXJlIGNoYW5nZWQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzIGNodW5rICovXG4gIHRpbWVDaGFuZ2U/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgZnJhbWV3b3JrIGZvciBCYXJJbmZvIGluZGV4aW5nIGFuZCBmYXN0IHRyYXZlcnNpbmcgaW4gaXJkZXIgdG8gXG4gKiBsb2NhdGUgdGhlIHN0cnVjdHVyYWwgaW5mbyByZWxhdGVkIHRvIGFueSBub3RlLiBJdCBjdXJyZW50bHkgc3RvcmVzIHRoZSBpbmZvIFxuICogaW4gY2h1bmtzIGFzIHNob3J0IGFzIGEgc2l4dHlmb3VydGggbm90ZSwgaS5lLiB0aGUgc2hvcnRlc3QgbWFuYWdlYWJsZVxuICogcHVsc2UgKGxpa2UgaW4gNC82NCBUaW1lIFNpZ25hdHVyZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXJzSW5mbyB7XG4gIC8qKiBGbGFnIHRvIGRlZmluZSBkb3R0ZWQgcmVzdHMgY29uZmlndXRhcmlvbiAobWF5IGNoYW5nZSBpbiBhIGZ1dHVyZSkuICovXG4gIHB1YmxpYyBhbGxvd0RvdHRlZFJlc3RzPzogYm9vbGVhbjtcbiAgLyoqIEludGVybmFsIHN0b3JhZ2Ugb2Ygc3RydWN0dXJhbCBjaHVua3MuICovXG4gIHByaXZhdGUgYmFyc0luZm86IEJhckluZm9bXTtcblxuICAvKiogXG4gICAqIEZpbGxzIHRoZSByZWZlcmVuY2UgaW5mbyAoYmFyLCB0ZW1wbywgdGltZSBzaWduYXR1cmUgYW5kIGtleSBzaWduYXR1cmUpXG4gICAqIGluIGEgcGVyIGNodW5rIGFycmF5IGFzIGEgZmFzdCBtZXRob2QgdG8gZnVydGhlIGZpbGwgZGV0YWlscyBpbiBibG9ja3MuXG4gICAqIEBwYXJhbSBzdGFmZkluZm8gVGhlIHN0YWZmIGluZm9ybWF0aW9uIGdldCByZWZlcmVuY2VzIGZyb20uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoc3RhZmZJbmZvOiBTdGFmZkluZm8sIGxhc3RROiBudW1iZXIpIHtcbiAgICB0aGlzLmJhcnNJbmZvID0gW107XG4gICAgbGV0IHRlbXBvSW5kZXggPSAwO1xuICAgIGxldCBrZXlJbmRleCA9IDA7XG4gICAgbGV0IHRpbWVJbmRleCA9IDA7XG4gICAgbGV0IGN1cnJlbnRUZW1wbyA9IHN0YWZmSW5mby50ZW1wb3NbMF07XG4gICAgbGV0IGN1cnJlbnRLZXlTaWduYXR1cmUgPSBzdGFmZkluZm8ua2V5U2lnbmF0dXJlc1swXTtcbiAgICBsZXQgY3VycmVudFRpbWVTaWduYXR1cmUgPSBzdGFmZkluZm8udGltZVNpZ25hdHVyZXNbMF07XG4gICAgbGV0IGJhck51bWJlckF0Q3VycmVudFRpbWVTaWduYXR1cmUgPSAwO1xuICAgIGxldCBjdXJyZW50QmFyTGVuZ3RoID0gZ2V0QmFyTGVuZ3RoKGN1cnJlbnRUaW1lU2lnbmF0dXJlKTtcbiAgICBmb3IgKGxldCBxdWFydGVycyA9IDA7IHF1YXJ0ZXJzIDwgbGFzdFE7IHF1YXJ0ZXJzICs9IDEvMTYpIHsgLy8gQWxsIHF1YXJ0ZXJzXG4gICAgICBjb25zdCBiYXJJbmZvOiBCYXJJbmZvID0geyBcbiAgICAgICAgc3RhcnQ6IHF1YXJ0ZXJzLFxuICAgICAgICBiYXJOdW1iZXI6IGJhck51bWJlckF0Q3VycmVudFRpbWVTaWduYXR1cmUgKyBcbiAgICAgICAgICAocXVhcnRlcnMgLSBjdXJyZW50VGltZVNpZ25hdHVyZS5zdGFydCkgLyBjdXJyZW50QmFyTGVuZ3RoLCBcbiAgICAgICAgYmFyTGVuZ3RoOiBjdXJyZW50QmFyTGVuZ3RoLFxuICAgICAgICB0ZW1wbzogY3VycmVudFRlbXBvLFxuICAgICAgICBrZXlTaWduYXR1cmU6IGN1cnJlbnRLZXlTaWduYXR1cmUsXG4gICAgICAgIHRpbWVTaWduYXR1cmU6IGN1cnJlbnRUaW1lU2lnbmF0dXJlXG4gICAgICB9O1xuICAgICAgaWYgKFxuICAgICAgICB0ZW1wb0luZGV4IDwgc3RhZmZJbmZvLnRlbXBvcy5sZW5ndGggJiYgXG4gICAgICAgIHN0YWZmSW5mby50ZW1wb3NbdGVtcG9JbmRleF0uc3RhcnQgPT09IHF1YXJ0ZXJzXG4gICAgICApIHsgLy8gUmVnaXN0ZXIgYSB0ZW1wbyBjaGFuZ2UgaW4gdGhpcyBxdWFydGVyXG4gICAgICAgIGN1cnJlbnRUZW1wbyA9IHN0YWZmSW5mby50ZW1wb3NbdGVtcG9JbmRleCsrXTtcbiAgICAgICAgYmFySW5mby50ZW1wbyA9IGN1cnJlbnRUZW1wbztcbiAgICAgICAgYmFySW5mby50ZW1wb0NoYW5nZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIC8vIFJlZ2lzdGVyIGEga2V5IHNpZ25hdHVyZSBjaGFuZ2UgaW4gdGhpcyBxdWFydGVyXG4gICAgICAgIGtleUluZGV4IDwgc3RhZmZJbmZvLmtleVNpZ25hdHVyZXMubGVuZ3RoICYmIFxuICAgICAgICBzdGFmZkluZm8ua2V5U2lnbmF0dXJlc1trZXlJbmRleF0uc3RhcnQgPT09IHF1YXJ0ZXJzXG4gICAgICApIHtcbiAgICAgICAgY3VycmVudEtleVNpZ25hdHVyZSA9IHN0YWZmSW5mby5rZXlTaWduYXR1cmVzW2tleUluZGV4KytdO1xuICAgICAgICBiYXJJbmZvLmtleVNpZ25hdHVyZSA9IGN1cnJlbnRLZXlTaWduYXR1cmU7XG4gICAgICAgIGJhckluZm8ua2V5Q2hhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgdGltZUluZGV4IDwgc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzLmxlbmd0aCAmJiBcbiAgICAgICAgc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzW3RpbWVJbmRleF0uc3RhcnQgPT09IHF1YXJ0ZXJzXG4gICAgICApIHsgLy8gUmVnaXN0ZXIgYSB0aW1lIHNpZ25hdHVyZSBpbiB0aGlzIHF1YXJ0ZXJcbiAgICAgICAgYmFyTnVtYmVyQXRDdXJyZW50VGltZVNpZ25hdHVyZSA9IGJhckluZm8uYmFyTnVtYmVyOyAvLyBOZXcgdC5zLiBzdGFydFxuICAgICAgICBjdXJyZW50VGltZVNpZ25hdHVyZSA9IHN0YWZmSW5mby50aW1lU2lnbmF0dXJlc1t0aW1lSW5kZXgrK107XG4gICAgICAgIGJhckluZm8udGltZVNpZ25hdHVyZSA9IGN1cnJlbnRUaW1lU2lnbmF0dXJlO1xuICAgICAgICBjdXJyZW50QmFyTGVuZ3RoID0gZ2V0QmFyTGVuZ3RoKGN1cnJlbnRUaW1lU2lnbmF0dXJlKTtcbiAgICAgICAgYmFySW5mby5iYXJMZW5ndGggPSBjdXJyZW50QmFyTGVuZ3RoO1xuICAgICAgICBiYXJJbmZvLnRpbWVDaGFuZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5iYXJzSW5mby5wdXNoKGJhckluZm8pO1xuICAgIH0gICAgICBcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBiYXIgbnVtYmVyIG9mIGEgbm90ZSBzdGFydGluZyBhdCBhIGdpdmVuIHBvc2l0aW9uLiBJdCB3aWxsIGJlIGFuXG4gICAqIGludGVnZXIgdmFsdWUgaWYgaXQgcmVsaWVzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGJhciwgYW5kIGl0IHdpbGwgXG4gICAqIHJlZmxlY3QgdGhlIHBvc2l0aW9uIHdpdGhpbiB0aGUgYmFyIGFsb25nIHdpdGggdGhlIGRlY2ltYWxzIChhIG5vdGUgXG4gICAqIHN0YXJ0aW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHRoaXJkIDQvNCBiYXIgd2lsbCByZXR1cm4gMy41KVxuICAgKiBAcGFyYW0gcXVhcnRlcnMgIFxuICAgKi9cbiAgcHVibGljIGJhck51bWJlckF0UShzdGFydDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCByZWZlcmVuY2UgPSB0aGlzLmJhcnNJbmZvW01hdGgudHJ1bmMoc3RhcnQgKiAxNildO1xuICAgIGNvbnN0IHF1YXJ0ZXJzQWR2YW5jZSA9IHN0YXJ0IC0gcmVmZXJlbmNlLnN0YXJ0O1xuICAgIGNvbnN0IGJhckFkdmFuY2VTaW5jZVJlZmVyZW5jZSA9IHF1YXJ0ZXJzQWR2YW5jZSAvIHJlZmVyZW5jZS5iYXJMZW5ndGg7XG4gICAgcmV0dXJuIHJlZmVyZW5jZS5iYXJOdW1iZXIgKyBiYXJBZHZhbmNlU2luY2VSZWZlcmVuY2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYmFyIGxlbmd0aCBhdCBhIHF1YXJ0ZXIgb24gdGhlIHN0YWZmXG4gICAqIEBwYXJhbSBxdWFydGVyIFF1YXJ0ZXIgdG8gbG9vayB0aGUgYmFyIGxlbmdodCBhdFxuICAgKiBAcmV0dXJucyBUaGUgbGVuZ3RoIG9mIHRoZSBiYXIgYXQgZ2l2ZW4gcXVhcnRlciBcbiAgICovXG4gIHB1YmxpYyBiYXJMZW5naHRBdFEoc3RhcnQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYmFyc0luZm9bTWF0aC50cnVuYyhzdGFydCAqIDE2KV0uYmFyTGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRlbXBvIGluIHFwbSBhdCBhIHF1YXJ0ZXIgb24gdGhlIHN0YWZmLiAqKk5PVEUqKjogaXQgZG9lc24ndCBcbiAgICogY292ZXIgdGVtcG8gY2hhbmdlcyB5ZXQsIGFuZCBhc3N1bWVzIHNjb3JlIGtlZXBzIGl0IHN0YWJsZSB0aWxsIHRoZSBlbmQuXG4gICAqIEBwYXJhbSBxdWFydGVycyBRdWFydGVyIHRvIGxvb2sga2V5IHNpZ25hdHVyZSBhdFxuICAgKiBAcGFyYW0gb25seUNoYW5nZXMgSWYgdHJ1ZSByZXR1cm5zIC0xIGluIGNhc2UgdGhlcmUncyBubyBjaGFuZ2UgYXQgcXVhcnRlcnNcbiAgICogQHJldHVybnMgVGhlIGtleSB3aGljaCBpcyBvcGVyYXRpdmUgYXQgZ2l2ZW4gcXVhcnRlciwgb3IgLTEgaWYgbmVlZGVkXG4gICAqL1xuICBwdWJsaWMgdGVtcG9BdFEoXG4gICAgX3N0YXJ0OiBudW1iZXIsIG9ubHlDaGFuZ2VzID0gZmFsc2VcbiAgKTogbnVtYmVyIHtcbiAgICBjb25zdCBiYXJJbmZvID0gdGhpcy5iYXJzSW5mb1swXTsgLy8gV2lsbCBiZSBfc3RhcnQgaW5zdGVhZCAwXG4gICAgcmV0dXJuICFvbmx5Q2hhbmdlcyB8fCBiYXJJbmZvLnRlbXBvQ2hhbmdlPyBiYXJJbmZvLnRlbXBvLnFwbTogLTE7XG4gIH0gXG4gIFxuICAvKipcbiAgICogR2V0cyB0aGUga2V5IHNpZ25hdHVyZSBhdCBhIHF1YXJ0ZXIgb24gdGhlIHN0YWZmXG4gICAqIEBwYXJhbSBxdWFydGVycyBRdWFydGVyIHRvIGxvb2sga2V5IHNpZ25hdHVyZSBhdFxuICAgKiBAcGFyYW0gb25seUNoYW5nZXMgSWYgdHJ1ZSByZXR1cm5zIC0xIGluIGNhc2UgdGhlcmUncyBubyBjaGFuZ2UgYXQgcXVhcnRlcnNcbiAgICogQHJldHVybnMgVGhlIGtleSB3aGljaCBpcyBvcGVyYXRpdmUgYXQgZ2l2ZW4gcXVhcnRlciwgb3IgLTEgaWYgbmVlZGVkXG4gICAqL1xuICBwdWJsaWMga2V5U2lnbmF0dXJlQXRRKFxuICAgIHN0YXJ0OiBudW1iZXIsIG9ubHlDaGFuZ2VzID0gZmFsc2VcbiAgKTogbnVtYmVyIHtcbiAgICBjb25zdCBiYXJJbmZvID0gdGhpcy5iYXJzSW5mb1tNYXRoLnRydW5jKHN0YXJ0ICogMTYpXTtcbiAgICByZXR1cm4gIW9ubHlDaGFuZ2VzIHx8IGJhckluZm8ua2V5Q2hhbmdlPyBiYXJJbmZvLmtleVNpZ25hdHVyZS5rZXk6IC0xO1xuICB9IFxuICBcbiAgLyoqXG4gICAqIEdldHMgdGhlIHRpbWUgc2lnbmF0dXJlIGF0IGEgcXVhcnRlciBvbiB0aGUgc3RhZmZcbiAgICogQHBhcmFtIHF1YXJ0ZXIgUXVhcnRlciB0byBsb29rIHRpbWUgc2lnbmF0dXJlIGF0XG4gICAqIEBwYXJhbSBvbmx5Q2hhbmdlcyBJZiB0cnVlIHJldHVybnMgbnVsbCBpbiBjYXNlIHRoZXJlJ3Mgbm8gY2hhbmdlIGF0IHEuXG4gICAqIEByZXR1cm5zIFRoZSB0aW1lIHNpZ25hdHVyZSB3aGljaCBpcyBvcGVyYXRpdmUgYXQgZ2l2ZW4gcXVhcnRlciwgb3IgbnVsbFxuICAgKi9cbiAgcHVibGljIHRpbWVTaWduYXR1cmVBdFEoXG4gICAgc3RhcnQ6IG51bWJlciwgb25seUNoYW5nZXMgPSBmYWxzZVxuICApOiBUaW1lU2lnbmF0dXJlSW5mbyB7XG4gICAgY29uc3QgYmFySW5mbyA9IHRoaXMuYmFyc0luZm9bTWF0aC50cnVuYyhzdGFydCAqIDE2KV07XG4gICAgcmV0dXJuICFvbmx5Q2hhbmdlcyB8fCBiYXJJbmZvLnRpbWVDaGFuZ2U/IGJhckluZm8udGltZVNpZ25hdHVyZTogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgZ2l2ZW4gYW1vdW50IG9mIHF1YXJ0ZXJzIHRvIHNlY29uZHMuICoqTk9URSoqOiBpdCBkb2Vzbid0IFxuICAgKiBjb3ZlciB0ZW1wbyBjaGFuZ2VzIHlldCwgYW5kIGFzc3VtZXMgc2NvcmUga2VlcHMgaXQgc3RhYmxlIHRpbGwgdGhlIGVuZC5cbiAgICogQHBhcmFtIHF1YXJ0ZXJzIFRoZSBnaXZlbiBhbW91bnQgb2YgcXVhcnRlcnNcbiAgICogQHJldHVybnMgVGhlIGVxdWl2YWxlbnQgYW1vdW50IG9mIHNlY29uZHNcbiAgICovXG4gIHB1YmxpYyBxdWFydGVyc1RvVGltZShxdWFydGVyczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcXVhcnRlcnMgLyB0aGlzLmJhcnNJbmZvWzBdLnRlbXBvLnFwbSAqIDYwO1xuICB9XG4gIFxuICAvKipcbiAgICogQ29udmVydCBhIGdpdmVuIGFtb3VudCBvZiBzZWNvbmRzIHRvIHF1YXJ0ZXJzLiAqKk5PVEUqKjogaXQgZG9lc24ndCBcbiAgICogY292ZXIgdGVtcG8gY2hhbmdlcyB5ZXQsIGFuZCBhc3N1bWVzIHNjb3JlIGtlZXBzIGl0IHN0YWJsZSB0aWxsIHRoZSBlbmQuXG4gICAqIEl0IHdpbGwgYmUgcm91bmRlZCB0byBtaW5pbXVtIG5vdGUgZGl2aXNpb24gdG8gYXZvaWQgSmF2YVNjcmlwdCBudW1iZXJcbiAgICogcm91bmRpbmcgaXNzdWVzLlxuICAgKiBAcGFyYW0gcXVhcnRlcnMgVGhlIGdpdmVuIGFtb3VudCBvZiBzZWNvbmRzXG4gICAqIEByZXR1cm5zIFRoZSBlcXVpdmFsZW50IGFtb3VudCBvZiBxdWFydGVyc1xuICAgKi9cbiAgcHVibGljIHRpbWVUb1F1YXJ0ZXJzKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcSA9IHRpbWUgKiB0aGlzLmJhcnNJbmZvWzBdLnRlbXBvLnFwbSAvIDYwO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHEgKiBNQVhfUVVBUlRFUl9ESVZJU0lPTikgLyBNQVhfUVVBUlRFUl9ESVZJU0lPTjtcbiAgfVxuXG59ICAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBQYXNjdWFsIGRlIEp1YW4uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqIDEvMTYgb2YgYSBxdWFydGVyIG5vdGUgKDEvNjR0aCBub3RlKSAqL1xuZXhwb3J0IGNvbnN0IE1JTl9SRVNPTFVUSU9OID0gMC4wNjI1OyAvLyBUT0RPOiBVbmlmeVxuXG4vKiogXG4gKiBNaW5pbWFsIGR1cmF0aW9uIHJlY29nbml6ZWQgbm90ZSwgd2hpY2ggY3VycmVudGx5IGlzIHZhbGlkIGZvciBzaXh0eWZvdXJ0aCBcbiAqIG5vdGUgKDEvMTYgb2YgYSBxdWFydGVyIG5vdGUpIHRyaXBsZXRzIGFuZCBxdWludHVwbGV0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BWF9RVUFSVEVSX0RJVklTSU9OID0gMTYqMyo1OyAvLyBUT0RPOiBtZXJnZSB3aXRoIGVxdWl2YWxlbnQgY29uc3RhbnRzXG5cbi8qKiBDaHJvbWF0aWMgc2NhbGVzIHBlciBrZXksIGVuY29kZWQgZm9yIHN0YWZmIG5vdGUgcGxhY2VtZW50ICovXG5leHBvcnQgY29uc3QgU0NBTEVTID0gWyAvLyBBY2NpZGVudGFsczogMD1ub25lLCAxPXNoYXJwLCAyPWZsYXQsIDM9bm9ybWFsXG4gIHsgLy8gQ2hyb21hdGljICBDIEMjL0RiIEQgRCMvRWIgRSAgIEYgRiMvR2IgRyBHIy9BYiBBIEEjL0JiIEIgICAvIEtFWVxuICAgIHN0ZXBzOiAgICAgIFsgMCwgIDAsIC0xLCAtMSwgLTIsIC0zLCAtMywgLTQsIC00LCAtNSwgLTUsIC02XSwgLy8gQ1xuICAgIGFjY2lkZW50YWw6IFsgMCwgIDEsICAwLCAgMSwgIDAsICAwLCAgMSwgIDAsICAxLCAgMCwgIDEsICAwXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAtMSwgLTEsIC0yLCAtMiwgLTMsIC00LCAtNCwgLTUsIC01LCAtNiwgLTZdLCAvLyBEYlxuICAgIGFjY2lkZW50YWw6IFsgMCwgIDAsICAzLCAgMCwgIDMsICAwLCAgMCwgIDMsICAwLCAgMywgIDAsICAzXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAgMCwgLTEsIC0xLCAtMiwgLTMsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTZdLCAvLyBEXG4gICAgYWNjaWRlbnRhbDogWyAzLCAgMCwgIDAsICAxLCAgMCwgIDMsICAwLCAgMCwgIDEsICAwLCAgMSwgIDBdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsIC0xLCAtMSwgLTIsIC0yLCAtMywgLTQsIC00LCAtNSwgLTUsIC02LCAtNl0sIC8vIEViXG4gICAgYWNjaWRlbnRhbDogWyAwLCAgMiwgIDAsICAwLCAgMywgIDAsICAyLCAgMCwgIDAsICAzLCAgMCwgIDNdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsICAwLCAtMSwgLTEsIC0yLCAtMywgLTMsIC00LCAtNCwgLTUsIC01LCAtNl0sIC8vIEVcbiAgICBhY2NpZGVudGFsOiBbIDMsICAwLCAgMywgIDAsICAwLCAgMywgIDAsICAzLCAgMCwgIDAsICAxLCAgMF0gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgLTEsIC0xLCAtMiwgLTIsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTYsIC02XSwgLy8gRlxuICAgIGFjY2lkZW50YWw6IFsgMCwgIDIsICAwLCAgMiwgIDAsICAwLCAgMiwgIDAsICAyLCAgMCwgIDAsICAzXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAtMSwgLTEsIC0yLCAtMiwgLTMsIC00LCAtNCwgLTUsIC01LCAtNiwgLTddLCAvLyBHYlxuICAgIGFjY2lkZW50YWw6IFsgMywgIDAsICAzLCAgMCwgIDMsICAwLCAgMCwgIDMsICAwLCAgMywgIDAsICAwXSB9LCB7XG4gICAgc3RlcHM6ICAgICAgWyAwLCAgMCwgLTEsIC0xLCAtMiwgLTMsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTZdLCAvLyBHXG4gICAgYWNjaWRlbnRhbDogWyAwLCAgMSwgIDAsICAxLCAgMCwgIDMsICAwLCAgMCwgIDEsICAwLCAgMSwgIDBdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsIC0xLCAtMSwgLTIsIC0yLCAtMywgLTQsIC00LCAtNSwgLTUsIC02LCAtNl0sIC8vIEFiXG4gICAgYWNjaWRlbnRhbDogWyAwLCAgMCwgIDMsICAwLCAgMywgIDAsICAyLCAgMCwgIDAsICAzLCAgMCwgIDNdIH0sIHtcbiAgICBzdGVwczogICAgICBbIDAsICAwLCAtMSwgLTEsIC0yLCAtMywgLTMsIC00LCAtNCwgLTUsIC01LCAtNl0sIC8vIEFcbiAgICBhY2NpZGVudGFsOiBbIDMsICAwLCAgMCwgIDEsICAwLCAgMywgIDAsICAzLCAgMCwgIDAsICAxLCAgMF0gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgLTEsIC0xLCAtMiwgLTIsIC0zLCAtNCwgLTQsIC01LCAtNSwgLTYsIC02XSwgLy8gQmJcbiAgICBhY2NpZGVudGFsOiBbIDAsICAyLCAgMCwgIDAsICAzLCAgMCwgIDIsICAwLCAgMiwgIDAsICAwLCAgM10gfSwge1xuICAgIHN0ZXBzOiAgICAgIFsgMCwgIDAsIC0xLCAtMSwgLTIsIC0zLCAtMywgLTQsIC00LCAtNSwgLTUsIC02XSwgLy8gQlxuICAgIGFjY2lkZW50YWw6IFsgMywgIDAsICAzLCAgMCwgIDAsICAzLCAgMCwgIDMsICAwLCAgMywgIDAsICAwXSB9XG5dO1xuXG4vKiogXG4gKiBBIGxpc3Qgb2YgYWxsIGtleSBhY2NpZGVudGFscyBpbmRpY2F0aW5nIHRoZSBhY2NpZGVudGFsIGtpbmQgKDEgPSBzaGFycFxuICogYW5kIDIgPSBmbGF0KSBhbmQgdGhlIE1JREkgbm90ZSBpdCBpcyBhc3NvY2lhdGVkIHRvXG4gKi9cbmV4cG9ydCBjb25zdCBLRVlfQUNDSURFTlRBTFMgPSBbXG4gIHthY2NpZGVudGFsOiAxLCBwaXRjaGVzOiBbXX0sICAgICAgICAgICAgICAgICAgICAgICAvLyBDXG4gIHthY2NpZGVudGFsOiAyLCBwaXRjaGVzOiBbNzAsIDc1LCA2OCwgNzMsIDY2XX0sICAgICAvLyBEYlxuICB7YWNjaWRlbnRhbDogMSwgcGl0Y2hlczogWzc4LCA3M119LCAgICAgICAgICAgICAgICAgLy8gRFxuICB7YWNjaWRlbnRhbDogMiwgcGl0Y2hlczogWzcwLCA3NSwgNjhdfSwgICAgICAgICAgICAgLy8gRWJcbiAge2FjY2lkZW50YWw6IDEsIHBpdGNoZXM6IFs3OCwgNzMsIDgwLCA3NV19LCAgICAgICAgIC8vIEVcbiAge2FjY2lkZW50YWw6IDIsIHBpdGNoZXM6IFs3MF19LCAgICAgICAgICAgICAgICAgICAgIC8vIEZcbiAge2FjY2lkZW50YWw6IDIsIHBpdGNoZXM6IFs3MCwgNzUsIDY4LCA3MywgNjYsIDcxXX0sIC8vIEdiXG4gIHthY2NpZGVudGFsOiAxLCBwaXRjaGVzOiBbNzhdfSwgICAgICAgICAgICAgICAgICAgICAvLyBHXG4gIHthY2NpZGVudGFsOiAyLCBwaXRjaGVzOiBbNzAsIDc1LCA2OCwgNzNdfSwgICAgICAgICAvLyBBYlxuICB7YWNjaWRlbnRhbDogMSwgcGl0Y2hlczogWzc4LCA3MywgODBdfSwgICAgICAgICAgICAgLy8gQVxuICB7YWNjaWRlbnRhbDogMiwgcGl0Y2hlczogWzcwLCA3NV19LCAgICAgICAgICAgICAgICAgLy8gQmJcbiAge2FjY2lkZW50YWw6IDEsIHBpdGNoZXM6IFs3OCwgNzMsIDgwLCA3NSwgNzBdfSAgICAgIC8vIEJcbl07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBQYXNjdWFsIGRlIEp1YW4uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqIDE1JSBvZiBhY2NpZGVudGFscyB3aWR0aCAqL1xuZXhwb3J0IGNvbnN0IFNURU1fV0lEVEggPSAxNTtcbi8qKiAxIHBpeGVsICovXG5leHBvcnQgY29uc3QgTElORV9TVFJPS0UgPSAxO1xuLyoqIDE1MCUgb2YgYWNjaWRlbnRhbHMgd2lkdGggKi9cbmV4cG9ydCBjb25zdCBDT01QQUNUX1NQQUNJTkcgPSAxNTA7IiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7XG4gIE1JTl9SRVNPTFVUSU9OXG59IGZyb20gJy4vbW9kZWxfY29uc3RhbnRzJztcblxuaW1wb3J0IHtcbiAgTm90ZUluZm9cbn0gZnJvbSAnLi9zdGFmZl9pbmZvJztcblxuaW1wb3J0IHtcbiAgQmFyc0luZm9cbn0gZnJvbSAnLi9iYXJzX2luZm8nO1xuXG4vKiogU3RvcmVzIHByb2Nlc3NlZCBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGEgbXVzaWNhbCBub3RlIGluIGEgc3RhZmYgKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhZmZOb3RlIGV4dGVuZHMgTm90ZUluZm8ge1xuICAvKiogXG4gICAqIFZlcnRpY2FsIHN0ZXBzIHRvIHBvc2l0aW9uIGEgbm90ZSBvbiBzY29yZS4gSXQgaXMgbWVhc3VyZWQgaW4gaW50ZWdlciBcbiAgICogdmFsdWUsIGNvbnNpZGVyaW5nIDIgcG9zaXRpb25zIHBlciBzdGFmZiBsaW5lLCB2ZXJ0aWNhbGx5IGludmVydGVkLCBiZWluZ1xuICAgKiBpbiBHIGNsZWYgdmFsdWUgMCB1c2VkIGZvciBtaWRkbGUgQyBub3RlIGFuZCAtMSB1c2VkIGZvciBmb2xsb3dpbmcgRCBub3RlLlxuICAgKi9cbiAgdlN0ZXBzOiBudW1iZXI7XG4gIC8qKiBcbiAgICogSWRlbnRpZmljYXRvciBvZiB0aGUgYWNjaWRlbnRhbCBraW5kIGFzIGZvbGxvd2luZyBlbmNvZGluZzogXG4gICAqIDAgPSBub25lLCAxID0gc2hhcnAsIDIgPSBmbGF0LCAzID0gbm9ybWFsXG4gICAqL1xuICBhY2NpZGVudGFsOiBudW1iZXI7XG4gIC8qKiBSZWZlcmVuY2UgdG8gcHJldmlvdXMgdGllZCBub3RlICovXG4gIHRpZWRGcm9tPzogU3RhZmZOb3RlO1xuICAvKiogUmVmZXJlbmNlIHRvIGZvbGxvd2luZyB0aWVkIG5vdGUgKi9cbiAgdGllZFRvPzogU3RhZmZOb3RlO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhIG5vdGUgaW4gdHdvIGJ5IGEgdGltZSBwb2ludCBtZWFzdXJlZCBpbiBub3RlIHF1YXJ0ZXJzXG4gKiBAcGFyYW0gc3RhZmZOb3RlIG5vdGUgdG8gYmUgc3BsaXR0ZWRcbiAqIEBwYXJhbSBxdWFydGVycyBzcGxpdCBwb2ludFxuICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwcml0dGVkIG5vdGUuIEZpcnN0IG9uZSBpcyB0aGUgcmVjZWl2ZWQgb25lLFxuICogd2hpY2ggZ2V0cyBtb2RpZmllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0U3RhZmZOb3RlKHN0YWZmTm90ZTogU3RhZmZOb3RlLCBxdWFydGVyczogbnVtYmVyKTogU3RhZmZOb3RlIHtcbiAgY29uc3QgcmVtYWluTGVuZ3RoID0gKHN0YWZmTm90ZS5zdGFydCArIHN0YWZmTm90ZS5sZW5ndGgpIC0gcXVhcnRlcnM7XG4gIGxldCBzcGxpdHRlZDogU3RhZmZOb3RlID0gbnVsbDtcbiAgaWYgKHF1YXJ0ZXJzID4gc3RhZmZOb3RlLnN0YXJ0ICYmIHJlbWFpbkxlbmd0aCA+IDApIHtcbiAgICBzdGFmZk5vdGUubGVuZ3RoIC09IHJlbWFpbkxlbmd0aDtcbiAgICBzcGxpdHRlZCA9IHtcbiAgICAgIHN0YXJ0OiBxdWFydGVycyxcbiAgICAgIGxlbmd0aDogcmVtYWluTGVuZ3RoLFxuICAgICAgcGl0Y2g6IHN0YWZmTm90ZS5waXRjaCxcbiAgICAgIGludGVuc2l0eTogc3RhZmZOb3RlLmludGVuc2l0eSxcbiAgICAgIHZTdGVwczogc3RhZmZOb3RlLnZTdGVwcyxcbiAgICAgIGFjY2lkZW50YWw6IHN0YWZmTm90ZS5hY2NpZGVudGFsLFxuICAgICAgdGllZEZyb206IHN0YWZmTm90ZVxuICAgIH07XG4gICAgaWYgKHN0YWZmTm90ZS50aWVkVG8pIHsgLy8gUmVsaW5raW5nIHRpZXMgaWYgYW55IGluIHByZS1zcGxpdHRlZCBub3RlXG4gICAgICBzcGxpdHRlZC50aWVkVG8gPSBzdGFmZk5vdGUudGllZFRvO1xuICAgICAgc3RhZmZOb3RlLnRpZWRUby50aWVkRnJvbSA9IHNwbGl0dGVkO1xuICAgIH1cbiAgICBzdGFmZk5vdGUudGllZFRvID0gc3BsaXR0ZWQ7XG4gIH1cbiAgcmV0dXJuIHNwbGl0dGVkO1xufSAvLyBUT0RPOiByZXZpZXcgdG8gbW92ZSBpbnRlcmZhY2UgdG8gY2xhc3NcblxuLyoqIFxuICogU3RvcmVzIGEgYmxvY2sgb2Ygbm90ZXMgaW4gYSBzdGFmZiwgYWxsIG9mIHRoZW0gc3RhcnRpbmcgYW5kIGVuZGluZyBhdCBvbmNlLCBcbiAqIGV2ZW4gdGhvdWdoIHNvbWUgbm90ZXMgY2FuIGJlIHRpZWQgdG8gbm90ZXMgaW4gb3RoZXIgYmxvY2tzLiBBIGJsb2NrIHdpdGggbm8gXG4gKiBub3RlcyBpcyBhIHJlc3QuIEl0IHdpbGwgcHJlLXByb2Nlc3MgYWxsIGF2YWlsYWJsZSBjb250ZXh0IChrZXkgc2lnbmF0dXJlcyxcbiAqIHJpdGhtIHNwbGl0dGluZ3MsIGNsZWYuLi4pIHRvIHN0b3JlIGFsbCBzY29yZSBkZXRhaWxzIGluIG9yZGVyIHRvIHJlcHJlc2VudCBcbiAqIGl0IGluIGEgc3RhZmYuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGFmZkJsb2NrIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgcHVibGljIHN0YXJ0OiBudW1iZXI7XG4gIC8qKiBOb3RlIGxlbmd0aCwgaW4gcXVhcnRlciBub3RlIHF1YW50aXRpZXMgKGZsb2F0KSAqL1xuICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHN5bWJvbCB0byBiZSBkcmF3biAobm90ZXMgYW5kIHJlc3RzKSBhY2NvcmRpbmcgdG8gaXRzXG4gICAqIGxlbmd0aCBtZWFzdXJlZCBpbiBxdWFydGVycy5cbiAgICovXG4gIGhlYWRJbmRleDogbnVtYmVyO1xuICAvKipcbiAgICogU3BlY2lmaWVzIG5vdGUgb3IgcmVzdCBsZW5ndGggYWx0ZXJhdGlvbiwgaWYgYW55LCBhcyBmb2xsb3dpbmcgZW5jb2Rpbmc6XG4gICAqIDEgPSBkb3QsIDMgPSB0cmlwbGV0LCA1IHF1aW50dXBsZXQgKGFueSBvdGhlciB3aWxsIGJlIGlnbm9yZWQpXG4gICAqL1xuICBoZWFkQWx0ZXJhdGlvbj86IG51bWJlcjtcbiAgLyoqIEJsb2NrIGJhciBudW1iZXIgKGZsb2F0KSBiZWluZyAuMCBhdCBiYXIgYmVnaW5uaW5nIGFuZCAuNSBhdCBiYXIgaGFsZi4gKi9cbiAgcHVibGljIG5vdGVzOiBTdGFmZk5vdGVbXTtcbiAgLyoqIFVwcGVyIGxpbWl0IG9mIHZlcnRpY2FsIHN0ZXBzIGluIGJsb2NrIG5vdGVzICovXG4gIHB1YmxpYyBiYXJOdW1iZXI6IG51bWJlcjtcbiAgLyoqIFRoZSBsaXN0IG9mIG5vdGVzIHJlbGF0ZWQgdG8gdGhlIGJsb2NrICovXG4gIHB1YmxpYyBtYXhWU3RlcDogbnVtYmVyO1xuICAvKiogTG93ZXIgbGltaXQgb2YgdmVydGljYWwgc3RlcHMgaW4gYmxvY2sgbm90ZXMgKi9cbiAgcHVibGljIG1pblZTdGVwOiBudW1iZXI7XG4gIC8qKiBNZW1iZXIgb2YgYSBCZWFtIHN0YXJ0aW5nIGZyb20gcmVmZXJlbmNlZCBibG9jayAqL1xuICBwdWJsaWMgYmVhbWVkRnJvbT86IFN0YWZmQmxvY2s7XG4gIC8qKiBCZWFtZWQgdG8gcHJldmlvdXMgYmxvY2sgKi9cbiAgcHVibGljIGJlYW1pbmdCYWNrd2FyZHM/OiBib29sZWFuO1xuICAvKiogQmVhbWVkIHRvIG5leHQgYmxvY2sgKi9cbiAgcHVibGljIGJlYW1pbmdGb3J3YXJkcz86IGJvb2xlYW47XG4gIC8qKiBXZXRoZXIgdGhlIGJsb2NrIGJlZ2lucyBhIG5ldyBwdWxzZSAqL1xuICBwdWJsaWMgcHVsc2VCZWdpbj86IGJvb2xlYW47XG4gIC8qKiBXZXRoZXIgdGhlIGJsb2NrIGVuZHMgYSBuZXcgcHVsc2UgKi9cbiAgcHVibGljIHB1bHNlRW5kPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGBTdGFmZkJsb2NrYCBzdG9yaW5nIG1pbmltYWwgc2NvcmUgZGV0YWlscywgd2FpdGluZyB0byBiZSBcbiAgICogbW9kaWZpZWQgZnVydGhlciBpbnZva2luZyBvdGhlciBtZXRob2RzLlxuICAgKiBAcGFyYW0gc3RhcnQgU3RhcnRpbmcgdGltZSwgaW4gcXVhcnRlciBub3RlIHF1YW50aXRpZXMgKGZsb2F0KVxuICAgKiBAcGFyYW0gbGVuZ3RoIE5vdGUgbGVuZ3RoLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpXG4gICAqIEBwYXJhbSBub3RlcyBUaGUgbGlzdCBvZiBub3RlcyByZWxhdGVkIHRvIHRoZSBibG9ja1xuICAgKiBAcGFyYW0gbWF4VlN0ZXAgVXBwZXIgbGltaXQgb2YgdmVydGljYWwgc3RlcHMgaW4gYmxvY2sgbm90ZXNcbiAgICogQHBhcmFtIG1pblZTdGVwIExvd2VyIGxpbWl0IG9mIHZlcnRpY2FsIHN0ZXBzIGluIGJsb2NrIG5vdGVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoXG4gICAgc3RhcnQ9MCwgXG4gICAgbGVuZ3RoPTAsIFxuICAgIG5vdGVzOiBTdGFmZk5vdGVbXT1bXSxcbiAgICBiYXJOdW1iZXI9MCxcbiAgICBtYXhWU3RlcD1OdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICBtaW5WU3RlcD1OdW1iZXIuTUlOX1NBRkVfSU5URUdFUixcbiAgKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGVhZEluZGV4ID0gMDtcbiAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgdGhpcy5iYXJOdW1iZXIgPSBiYXJOdW1iZXI7XG4gICAgdGhpcy5tYXhWU3RlcCA9IG1heFZTdGVwO1xuICAgIHRoaXMubWluVlN0ZXAgPSBtaW5WU3RlcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbm90ZSB0byB0aGUgYmxvY2sncyBub3RlIGxpc3QsIG1lcmdpbmcgcmVwZXRpdGlvbnMnIGxlbmd0aCwgXG4gICAqIGFkYXB0aW5nIFZTdGVwcyBhbmQgYmxvY2sgbGVuZ3RoXG4gICAqIEBwYXJhbSBzdGFmZk5vdGUgVGhlIG5vdGUgdG8gYmUgYWRkZWRcbiAgICovXG4gIHB1YmxpYyBhZGROb3RlKHN0YWZmTm90ZTogU3RhZmZOb3RlKSB7XG4gICAgbGV0IG5ld05vdGUgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBuZXdOb3RlICYmIGkgPCB0aGlzLm5vdGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoc3RhZmZOb3RlLnBpdGNoID09PSB0aGlzLm5vdGVzW2ldLnBpdGNoKSB7IC8vIFJlcGVhdGVkXG4gICAgICAgIG5ld05vdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3Rlc1tpXS5sZW5ndGggPSBNYXRoLm1heCh0aGlzLm5vdGVzW2ldLmxlbmd0aCwgc3RhZmZOb3RlLmxlbmd0aCk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gTWF0aC5tYXgodGhpcy5sZW5ndGgsIHN0YWZmTm90ZS5sZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobmV3Tm90ZSkge1xuICAgICAgdGhpcy5ub3Rlcy5wdXNoKHN0YWZmTm90ZSk7ICBcbiAgICAgIHRoaXMubWluVlN0ZXAgPSBNYXRoLm1heChzdGFmZk5vdGUudlN0ZXBzLCB0aGlzLm1pblZTdGVwKTtcbiAgICAgIHRoaXMubWF4VlN0ZXAgPSBNYXRoLm1pbihzdGFmZk5vdGUudlN0ZXBzLCB0aGlzLm1heFZTdGVwKTtcbiAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0cyBhIGJsb2NrIGluIHR3byBieSBhIHRpbWUgcG9pbnQgbWVhc3VyZWQgaW4gbm90ZSBxdWFydGVyc1xuICAgKiBAcGFyYW0gcXVhcnRlcnMgc3BsaXQgcG9pbnRcbiAgICogQHBhcmFtIGJhcnNJbmZvIEFuIEFycmF5IHdpdGggYmFyIGFuZCBzaWduYXR1cmVzIGluZm8gcGVyIHF1YXJ0ZXJcbiAgICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwbGl0dGVkIGJsb2NrLiBGaXJzdCBvbmUgaXMgdGhlIHJlY2VpdmVkIG9uZSxcbiAgICogd2hpY2ggZ2V0cyBtb2RpZmllZC5cbiAgICovXG4gIHB1YmxpYyBzcGxpdChxdWFydGVyczogbnVtYmVyLCBiYXJzSW5mbzogQmFyc0luZm8pOiBTdGFmZkJsb2NrIHtcbiAgICBjb25zdCByZW1haW5MZW5ndGggPSAodGhpcy5zdGFydCArIHRoaXMubGVuZ3RoKSAtIHF1YXJ0ZXJzO1xuICAgIGxldCBzcGxpdHRlZEJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICBpZiAocXVhcnRlcnMgPiB0aGlzLnN0YXJ0ICYmIHJlbWFpbkxlbmd0aCA+IDApIHtcbiAgICAgIHNwbGl0dGVkQmxvY2sgPSBuZXcgU3RhZmZCbG9jayhcbiAgICAgICAgcXVhcnRlcnMsIFxuICAgICAgICByZW1haW5MZW5ndGgsXG4gICAgICAgIFtdLCBcbiAgICAgICAgYmFyc0luZm8uYmFyTnVtYmVyQXRRKHF1YXJ0ZXJzKVxuICAgICAgKTtcbiAgICAgIHRoaXMubGVuZ3RoIC09IHJlbWFpbkxlbmd0aDtcbiAgICAgIHRoaXMubm90ZXMuZm9yRWFjaChcbiAgICAgICAgc3RhZmZOb3RlID0+IHtcbiAgICAgICAgICBjb25zdCByZW1haW5TdGFmZk5vdGUgPSBzcGxpdFN0YWZmTm90ZShzdGFmZk5vdGUsIHF1YXJ0ZXJzKTtcbiAgICAgICAgICBpZiAocmVtYWluU3RhZmZOb3RlKSB7XG4gICAgICAgICAgICBzcGxpdHRlZEJsb2NrLmFkZE5vdGUocmVtYWluU3RhZmZOb3RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChzcGxpdHRlZEJsb2NrICYmIHRoaXMucHVsc2VFbmQpIHtcbiAgICAgIHNwbGl0dGVkQmxvY2sucHVsc2VFbmQgPSB0cnVlO1xuICAgICAgdGhpcy5wdWxzZUVuZCA9IGZhbHNlOyAvLyBBcHBsaWNhYmxlIHRvIHN5bWJvbCBzcGxpdHRpbmcgKHBvc3QtcHVsc2UpXG4gICAgfVxuICAgIHJldHVybiBzcGxpdHRlZEJsb2NrO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0cyBhIGJsb2NrIGluIHR3byBieSBuZXh0IHB1bHNlIHRvIHJpdG1pY2FsbHkgY29tcGxldGUgcHJldmlvdXMgb25lLlxuICAgKiBJdCBtYXJrcyBhcyB3ZWxsIGlmIHRoZSBhZmZlY3RlZCBibG9jayBpcyBiZWdpbm5pbmcgb3IgZW5kaW5nIGEgcHVsc2UuXG4gICAqIEBwYXJhbSBiYXJzSW5mbyBBbiBBcnJheSB3aXRoIGJhciBhbmQgc2lnbmF0dXJlcyBpbmZvIHBlciBxdWFydGVyXG4gICAqIEByZXR1cm5zIFRoZSBzZWNvbmQgaGFsZiBvZiBzcGxpdHRlZCBibG9jay4gRmlyc3QgaGFsZiByZW1haW5zIGluIGN1cnJlbnRcbiAgICogb2JqZWN0LCB3aGljaCBnZXRzIG1vZGlmaWVkLlxuICAgKi9cbiAgcHVibGljIHNwbGl0VG9QdWxzZShiYXJzSW5mbzogQmFyc0luZm8pOiBTdGFmZkJsb2NrIHtcbiAgICBjb25zdCB0aW1lU2lnbmF0dXJlID0gYmFyc0luZm8udGltZVNpZ25hdHVyZUF0USh0aGlzLnN0YXJ0KTtcbiAgICBjb25zdCBiYXJMZW5ndGggPSBiYXJzSW5mby5iYXJMZW5naHRBdFEodGhpcy5zdGFydCk7XG4gICAgY29uc3QgYmFyRnJhY3Rpb25Gcm9tQmFyID0gdGhpcy5iYXJOdW1iZXIgLSBNYXRoLmZsb29yKHRoaXMuYmFyTnVtYmVyKTtcbiAgICBjb25zdCBxdWFydGVyc0Zyb21CYXJCZWdpbm5pbmcgPSAvLyBKYXZhc2NyaXB0IG1hdGggc2FmZVxuICAgICAgTWF0aC5yb3VuZChiYXJMZW5ndGggKiBiYXJGcmFjdGlvbkZyb21CYXIgKiAxMDAwMDAwKSAvIDEwMDAwMDA7XG4gICAgY29uc3QgcXVhcnRlcnNBdEJhckJlZ2lubmluZyA9IHRoaXMuc3RhcnQgLSBxdWFydGVyc0Zyb21CYXJCZWdpbm5pbmc7XG4gICAgY29uc3QgbWV0cmljQmVhdCA9IDQgLyB0aW1lU2lnbmF0dXJlLmRlbm9taW5hdG9yO1xuICAgIGNvbnN0IGJsb2NrQmVhdCA9IHF1YXJ0ZXJzRnJvbUJhckJlZ2lubmluZyAvIG1ldHJpY0JlYXQ7XG4gICAgY29uc3Qgc3BsaXR0aW5nQmVhdCA9IE1hdGguY2VpbChibG9ja0JlYXQpO1xuICAgIGxldCBzcGxpdHRlZEJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICBpZiAoIWlzU2FmZVplcm8oc3BsaXR0aW5nQmVhdCAtIGJsb2NrQmVhdCkpIHsgLy8gU3BsaXR0aW5nIG9uIG5leHQgYmVhdFxuICAgICAgY29uc3QgcXVhcnRlcnNBdEJlYXQgPSBNYXRoLnJvdW5kKCAvLyBKYXZhc2NyaXB0IG1hdGggc2FmZVxuICAgICAgICAocXVhcnRlcnNBdEJhckJlZ2lubmluZyArIHNwbGl0dGluZ0JlYXQgKiBtZXRyaWNCZWF0KSAqIDEwMDAwMDBcbiAgICAgICkgLyAxMDAwMDAwO1xuICAgICAgc3BsaXR0ZWRCbG9jayA9IHRoaXMuc3BsaXQocXVhcnRlcnNBdEJlYXQsIGJhcnNJbmZvKTtcbiAgICAgIGlmIChpc1NhZmVaZXJvKHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aCAtIHF1YXJ0ZXJzQXRCZWF0KSkge1xuICAgICAgICB0aGlzLnB1bHNlRW5kID0gdHJ1ZTsgLy8gQmxvY2sgZW5kcyBhdCBwdWxzZSBlbmRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7IC8vIEJlZ2lubmluZyBhIHB1bHNlLCBzcGxpdHRpbmcgb25seSBhdCBiYXIgZW5kIGlmIGFwcGxpY2FibGVcbiAgICAgIHRoaXMucHVsc2VCZWdpbiA9IHRydWU7XG4gICAgICBjb25zdCBxdWFydGVyc0F0QmFyRW5kID0gTWF0aC5yb3VuZCggLy8gSmF2YXNjcmlwdCBtYXRoIHNhZmVcbiAgICAgICAgKHF1YXJ0ZXJzQXRCYXJCZWdpbm5pbmcgKyB0aW1lU2lnbmF0dXJlLm51bWVyYXRvciAqIG1ldHJpY0JlYXQpICogXG4gICAgICAgIDEwMDAwMDBcbiAgICAgICkgLyAxMDAwMDAwO1xuICAgICAgc3BsaXR0ZWRCbG9jayA9IHRoaXMuc3BsaXQocXVhcnRlcnNBdEJhckVuZCwgYmFyc0luZm8pO1xuICAgICAgaWYgKGlzU2FmZVplcm8odGhpcy5zdGFydCArIHRoaXMubGVuZ3RoIC0gcXVhcnRlcnNBdEJhckVuZCkpIHtcbiAgICAgICAgdGhpcy5wdWxzZUVuZCA9IHRydWU7IC8vIEJsb2NrIGVuZHMgYXQgcHVsc2UgZW5kXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzcGxpdHRlZEJsb2NrKSB7IC8vIEl0IHdhcyBzcGxpdHRlZCBiZWZvcmUgcHVsc2UgZW5kXG4gICAgICB0aGlzLnB1bHNlRW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNwbGl0dGVkQmxvY2s7XG4gIH1cblxuICAvKipcbiAgICogU3BsaXRzIGEgYmxvY2sgaW4gdHdvIHRvIG1ha2UgdGhlIGZpcnN0IG9uZSBmaXQgaW4gdGhlIHNpemUgb2Ygc3RhbmRhcmRcbiAgICogbXVzaWNhbCBzeW1ib2xzIGxlbmd0aC5cbiAgICogQHBhcmFtIGJhcnNJbmZvIEFuIEFycmF5IHdpdGggYmFyIGFuZCBzaWduYXR1cmVzIGluZm8gcGVyIHF1YXJ0ZXJcbiAgICogQHBhcmFtIGluY3JlYXNpbmcgV2V0aGVyIHRoZSBzcGxpdCBtdXN0IGJlIGRvbmUgc2hvcnRlciB0byBsb25nZXIgbm90ZXNcbiAgICogQHJldHVybnMgVGhlIHNlY29uZCBoYWxmIG9mIHNwbGl0dGVkIGJsb2NrLiBGaXJzdCBoYWxmIHJlbWFpbnMgaW4gY3VycmVudFxuICAgKiBvYmplY3QsIHdoaWNoIGdldHMgbW9kaWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3BsaXRUb1N5bWJvbHMoYmFyc0luZm86IEJhcnNJbmZvLCBpbmNyZWFzaW5nOiBib29sZWFuKTogU3RhZmZCbG9jayB7XG4gICAgbGV0IHJlbWFpbkJsb2NrOiBTdGFmZkJsb2NrID0gbnVsbDtcbiAgICBpZiAodGhpcy5sZW5ndGggPj0gTUlOX1JFU09MVVRJT04pIHtcbiAgICAgIGlmICggLy8gV2hvbGUgcmVzdCBhcHBsaWVzIHRvIHdob2xlIGJhciwgd2hhdGV2ZXIgaXRzIGxlbmd0aFxuICAgICAgICAhdGhpcy5ub3Rlcy5sZW5ndGggJiYgLy8gSXMgYSByZXN0IGFuZCBwdWxzZSBzcGxpdHRlZCB0byBiYXIgbGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoID09PSBiYXJzSW5mby5iYXJMZW5naHRBdFEodGhpcy5zdGFydClcbiAgICAgICkge1xuICAgICAgICB0aGlzLmhlYWRJbmRleCA9IDQ7XG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8gS2luZCBvZiBub3RlIHNlbGVjdGlvbiAoYWxsIGJsb2NrIG5vdGVzIGhhdmUgc2FtZSBhc3BlY3QpXG4gICAgICAgIHJlbWFpbkJsb2NrID0gaW5jcmVhc2luZz8gXG4gICAgICAgICAgdGhpcy5zcGxpdFNob3J0ZXIoYmFyc0luZm8pOiB0aGlzLnNwbGl0TG9uZ2VyKGJhcnNJbmZvKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vdGVzIHNob3J0ZXIgdGhhbiBNSU5fUkVTT0xVVElPTi4gSXQgd2lsbCBiZSB3YXJuZWQgb24gXG4gICAgLy8gY29uc29sZSBhbmQgTUlOX1JFU09MVVRJT04gbm90ZSB3aWxsIGJlIGRyYXduLlxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qgbm90ZUxlbmd0aCA9IGlzU2FmZVplcm8odGhpcy5sZW5ndGgpID8gJ1tpbmZpbml0ZV0nIDogXG4gICAgICAgIGAkezQgLyB0aGlzLmxlbmd0aH1gO1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnJWNTdGFmZlJlbmRlcjonLCAnYmFja2dyb3VuZDpvcmFuZ2U7IGNvbG9yOndoaXRlJywgXG4gICAgICAgICdTdGFmZlJlbmRlciBkb2VzIG5vdCBoYW5kbGUgbm90ZXMgc2hvcnRoZXIgdGhhbiAnICtcbiAgICAgICAgYDEvJHs0IC8gTUlOX1JFU09MVVRJT059dGgsIGFuZCB0aGlzIHNjb3JlIHRyaWVzIHRvIGRyYXcgYSBgICtcbiAgICAgICAgYDEvJHtub3RlTGVuZ3RofXRoLiBTaG9ydGVzdCBwb3NzaWJsZSBub3RlIHdpbGwgYmUgZHJhd24gaW5zdGVhZC5gXG4gICAgICApO1xuICAgICAgdGhpcy5oZWFkSW5kZXggPSBNSU5fUkVTT0xVVElPTjtcbiAgICAgIHJlbWFpbkJsb2NrID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlbWFpbkJsb2NrO1xuICB9XG4gIFxuICAvKipcbiAgICogU3BsaXRzIGEgYmxvY2sgaW4gdHdvIHRvIG1ha2UgdGhlIGZpcnN0IG9uZSB0aGUgc2hvcnRlc3QgcG9zc2libGUgc2l6ZSBvZiBcbiAgICogc3RhbmRhcmQgbXVzaWNhbCBzeW1ib2xzLlxuICAgKiBAcGFyYW0gYmFyc0luZm8gQW4gQXJyYXkgd2l0aCBiYXIgYW5kIHNpZ25hdHVyZXMgaW5mbyBwZXIgcXVhcnRlclxuICAgKiBAcmV0dXJucyBUaGUgc2Vjb25kIGhhbGYgb2Ygc3BsaXR0ZWQgYmxvY2suIEZpcnN0IGhhbGYgcmVtYWlucyBpbiBjdXJyZW50XG4gICAqIG9iamVjdCwgd2hpY2ggZ2V0cyBtb2RpZmllZC5cbiAgICovXG4gIHB1YmxpYyBzcGxpdFNob3J0ZXIoYmFyc0luZm86IEJhcnNJbmZvKTogU3RhZmZCbG9jayB7XG4gICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgIGxldCBzcGxpdExlbmd0aCA9IDA7XG4gICAgbGV0IGhlYWRJbmRleCA9IDA7XG4gICAgbGV0IGhlYWRBbHRlcmF0aW9uID0gMDtcbiAgICBmb3IgKGxldCBpID0gNDsgIWlzU2FmZVplcm8obGVuZ3RoKTsgaSAvPSAyKSB7XG4gICAgICBpZiAoIC8vIERvdHRlZCBub3RlXG4gICAgICAgIGlzU2FmZVplcm8obGVuZ3RoIC0gaSAqIDMvMikgJiZcbiAgICAgICAgKGJhcnNJbmZvLmFsbG93RG90dGVkUmVzdHMgfHwgdGhpcy5ub3Rlcy5sZW5ndGgpXG4gICAgICApIHtcbiAgICAgICAgbGVuZ3RoIC09IGkgKiAzLzI7XG4gICAgICAgIHNwbGl0TGVuZ3RoID0gaSAqIDMvMjtcbiAgICAgICAgaGVhZEluZGV4ID0gaTtcbiAgICAgICAgaGVhZEFsdGVyYXRpb24gPSAxO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobGVuZ3RoID49IGkpIHsgLy8gUGxhaW4gbm90ZVxuICAgICAgICBsZW5ndGggLT0gaTtcbiAgICAgICAgc3BsaXRMZW5ndGggPSBpO1xuICAgICAgICBoZWFkSW5kZXggPSBpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNTYWZlWmVybyhsZW5ndGggLSBpICogNC81KSkgeyAvLyBRdWludHVwbGV0XG4gICAgICAgIGxlbmd0aCAtPSBpICogNC81O1xuICAgICAgICBzcGxpdExlbmd0aCA9IGkgKiA0LzU7XG4gICAgICAgIGhlYWRJbmRleCA9IGk7XG4gICAgICAgIGhlYWRBbHRlcmF0aW9uID0gNTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzU2FmZVplcm8obGVuZ3RoIC0gaSAqIDIvMykpIHsgLy8gVHJpcGxldFxuICAgICAgICBsZW5ndGggLT0gaSAqIDIvMztcbiAgICAgICAgc3BsaXRMZW5ndGggPSBpICogMi8zO1xuICAgICAgICBoZWFkSW5kZXggPSBpO1xuICAgICAgICBoZWFkQWx0ZXJhdGlvbiA9IDM7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlbWFpbkJsb2NrID0gdGhpcy5zcGxpdCh0aGlzLnN0YXJ0ICsgc3BsaXRMZW5ndGgsIGJhcnNJbmZvKTtcbiAgICB0aGlzLmhlYWRJbmRleCA9IGhlYWRJbmRleDtcbiAgICB0aGlzLmhlYWRBbHRlcmF0aW9uID0gaGVhZEFsdGVyYXRpb247XG4gICAgcmV0dXJuIHJlbWFpbkJsb2NrO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0cyBhIGJsb2NrIGluIHR3byB0byBtYWtlIHRoZSBmaXJzdCBvbmUgdGhlIGxvbmdlc3QgcG9zc2libGUgc2l6ZSBvZiBcbiAgICogc3RhbmRhcmQgbXVzaWNhbCBzeW1ib2xzLlxuICAgKiBAcGFyYW0gYmFyc0luZm8gQW4gQXJyYXkgd2l0aCBiYXIgYW5kIHNpZ25hdHVyZXMgaW5mbyBwZXIgcXVhcnRlclxuICAgKiBAcmV0dXJucyBUaGUgc2Vjb25kIGhhbGYgb2Ygc3BsaXR0ZWQgYmxvY2suIEZpcnN0IGhhbGYgcmVtYWlucyBpbiBjdXJyZW50XG4gICAqIG9iamVjdCwgd2hpY2ggZ2V0cyBtb2RpZmllZC5cbiAgICovXG4gIHB1YmxpYyBzcGxpdExvbmdlcihiYXJzSW5mbzogQmFyc0luZm8pOiBTdGFmZkJsb2NrIHtcbiAgICBsZXQgcmVtYWluQmxvY2s6IFN0YWZmQmxvY2sgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSA0OyAhdGhpcy5oZWFkSW5kZXg7IGkgLz0gMikge1xuICAgICAgaWYgKCAvLyBEb3R0ZWQgbm90ZVxuICAgICAgICBpc1NhZmVaZXJvKHRoaXMubGVuZ3RoIC0gaSAqIDMvMikgJiZcbiAgICAgICAgKGJhcnNJbmZvLmFsbG93RG90dGVkUmVzdHMgfHwgdGhpcy5ub3Rlcy5sZW5ndGgpXG4gICAgICApIHtcbiAgICAgICAgcmVtYWluQmxvY2sgPSB0aGlzLnNwbGl0KHRoaXMuc3RhcnQgKyBpICogMy8yLCBiYXJzSW5mbyk7XG4gICAgICAgIHRoaXMuaGVhZEluZGV4ID0gaTtcbiAgICAgICAgdGhpcy5oZWFkQWx0ZXJhdGlvbiA9IDE7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmxlbmd0aCA+PSBpKSB7XG4gICAgICAgIHJlbWFpbkJsb2NrID0gdGhpcy5zcGxpdCh0aGlzLnN0YXJ0ICsgaSwgYmFyc0luZm8pO1xuICAgICAgICB0aGlzLmhlYWRJbmRleCA9IGk7IC8vIFBsYWluIG5vdGVcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzU2FmZVplcm8odGhpcy5sZW5ndGggLSBpICogNC81KSkgeyAvLyBRdWludHVwbGV0XG4gICAgICAgIHJlbWFpbkJsb2NrID0gdGhpcy5zcGxpdCh0aGlzLnN0YXJ0ICsgaSAqIDQvNSwgYmFyc0luZm8pO1xuICAgICAgICB0aGlzLmhlYWRJbmRleCA9IGk7XG4gICAgICAgIHRoaXMuaGVhZEFsdGVyYXRpb24gPSA1O1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNTYWZlWmVybyh0aGlzLmxlbmd0aCAtIGkgKiAyLzMpKSB7IC8vIFRyaXBsZXRcbiAgICAgICAgcmVtYWluQmxvY2sgPSB0aGlzLnNwbGl0KHRoaXMuc3RhcnQgKyBpICogMi8zLCBiYXJzSW5mbyk7XG4gICAgICAgIHRoaXMuaGVhZEluZGV4ID0gaTtcbiAgICAgICAgdGhpcy5oZWFkQWx0ZXJhdGlvbiA9IDM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1haW5CbG9jaztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGJsb2NrIHN0YXJ0cyBhdCBiYXIgYmVnaW5uaW5nXG4gICAqIEByZXR1cm5zIHRydWUgaWYgaXQgaXMgc29cbiAgICovXG4gIHB1YmxpYyBpc0JhckJlZ2lubmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5iYXJOdW1iZXIgLSBNYXRoLnRydW5jKHRoaXMuYmFyTnVtYmVyKSA9PT0gMC4wO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bGZpbGxzIGJlYW1pbmcgaW5mbyBhY2NvcmRpbmcgdG8gcHJldmlvdXMgYmxvY2sgYW5kIHNpZ25hdHVyZXMgY29udGV4dFxuICAgKiBAcGFyYW0gcHJldmlvdXNTdGFmZkJsb2NrIFRoZSBwcmV2aW91cyBibG9jayB0byByaXRtaWNhbGx5IGNvbXBsZXRlXG4gICAqIEBwYXJhbSBxdWFydGVyc0luZm8gQW4gQXJyYXkgd2l0aCBiYXIgYW5kIHNpZ25hdHVyZXMgaW5mbyBwZXIgcXVhcnRlclxuICAgKi9cbiAgcHVibGljIHNldEJlYW1pbmcoXG4gICAgcHJldmlvdXNTdGFmZkJsb2NrOiBTdGFmZkJsb2NrLCBiYXJzSW5mbzogQmFyc0luZm9cbiAgKSB7XG4gIH1cbn1cblxuLyoqXG4gKiBWZXJpZmllcyBpZiBhIGdpdmVuIG51bWJlciBpcyBjbG9zZXIgdG8gemVybyB0aGFuIDAuMDAwMDAwMSBpbiBvcmRlciB0byBcbiAqIGF2b2lkIEphdmFzY3JpcHQgbWF0aCBpbXByZWNpc3Npb25zLlxuICogQHBhcmFtIG4gTnVtYmVyIHRvIGJlIGNoZWNrZWRcbiAqL1xuZnVuY3Rpb24gaXNTYWZlWmVybyhuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIE1hdGgucm91bmQobiAqIDEwMDAwMDApID09PSAwO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKiBTdG9yZXMgbWluaW1hbCBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGEgbXVzaWNhbCBub3RlICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdGVJbmZvIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgc3RhcnQ6IG51bWJlcjtcbiAgLyoqIE5vdGUgbGVuZ3RoLCBpbiBxdWFydGVyIG5vdGUgcXVhbnRpdGllcyAoZmxvYXQpICovXG4gIGxlbmd0aDogbnVtYmVyO1xuICAvKiogTm90ZSBwaXRjaCBhY2NvcmRpbmcgdG8gTUlESSBzdGFuZGFyZCAqL1xuICBwaXRjaDogbnVtYmVyO1xuICAvKiogTm90ZSBpbnRlbnNpdHkgYWNjb3JkaW5nIHRvIE1JREkgdmVsb2NpdHkgKi9cbiAgaW50ZW5zaXR5OiBudW1iZXI7XG59XG4gIFxuLyoqIFN0b3JlcyBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGEgdGVtcG8gY2hhbmdlIG9uIGEgc2NvcmUgKG5vdCB1c2VkIHlldCkgKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcG9JbmZvIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgc3RhcnQ6IG51bWJlcjsgXG4gIC8qKiBRdWFydGVycyBQZXIgTWludXRlIGZyb20gdGhpcyBxdWFydGVyIG9uLCB1bmxlc3MgZnVydGhlciBjaGFuZ2VzICovXG4gIHFwbTogbnVtYmVyO1xufVxuXG4vKiogU3RvcmVzIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gYSBrZXkgc2lnbmF0dXJlIGNoYW5nZSBvbiBhIHNjb3JlICovXG5leHBvcnQgaW50ZXJmYWNlIEtleVNpZ25hdHVyZUluZm8ge1xuICAvKiogU3RhcnRpbmcgdGltZSwgaW4gcXVhcnRlciBub3RlIHF1YW50aXRpZXMgKGZsb2F0KSAqL1xuICBzdGFydDogbnVtYmVyOyBcbiAgLyoqIEtleSBzaWduYXR1cmUgZnJvbSB0aGlzIHF1YXJ0ZXIgb24sIHVubGVzcyBmdXJ0aGVyIGNoYW5nZXMgKi9cbiAga2V5OiBudW1iZXI7XG59XG5cbi8qKiBTdG9yZXMgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBhIHRpbWUgc2lnbmF0dXJlIGNoYW5nZSBvbiBhIHNjb3JlICovXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVTaWduYXR1cmVJbmZvIHtcbiAgLyoqIFN0YXJ0aW5nIHRpbWUsIGluIHF1YXJ0ZXIgbm90ZSBxdWFudGl0aWVzIChmbG9hdCkgKi9cbiAgc3RhcnQ6IG51bWJlcjtcbiAgLyoqIFdvdWxkIGhvbGQgMyBpbiBhIDMvNCB0aW1lIHNpZ25hdHVyZSBjaGFuZ2UgKi9cbiAgbnVtZXJhdG9yOiBudW1iZXI7IFxuICAvKiogV291bGQgaG9sZCA0IGluIGEgMy80IHRpbWUgc2lnbmF0dXJlIGNoYW5nZSAqL1xuICBkZW5vbWluYXRvcjogbnVtYmVyO1xufVxuXG4vKiogU3RvcmVzIHRoZSBiYXJlIG1pbmltYWwgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBhIGZ1bGwgc2luZ2xlIHN0YWZmIHNjb3JlICovXG5leHBvcnQgaW50ZXJmYWNlIFN0YWZmSW5mbyB7XG4gIC8qKiBBbGwgbm90ZXMgaW4gYSBzdGFmZi4gVGhlcmUncyBubyBuZWVkIHRvIGJlIHNvcnRlZCBieSBzdGFydCBxICovXG4gIG5vdGVzOiBOb3RlSW5mb1tdO1xuICAvKiogQWxsIHRlbXBvIGNoYW5nZXMgaW4gYSBzdGFmZi4gVGhleSB3aWxsIGdldCBzb3J0ZWQgYnkgc3RhcnQgcSAqL1xuICB0ZW1wb3M/OiBUZW1wb0luZm9bXTtcbiAgLyoqIEFsbCBrZXkgc2lnbmF0dXJlIGNoYW5nZXMgaW4gYSBzdGFmZi4gVGhleSB3aWxsIGdldCBzb3J0ZWQgYnkgc3RhcnQgcSAqL1xuICBrZXlTaWduYXR1cmVzPzogS2V5U2lnbmF0dXJlSW5mb1tdO1xuICAvKiogQWxsIHRpbWUgc2lnbmF0dXJlIGNoYW5nZXMgaW4gYSBzdGFmZi4gVGhleSB3aWxsIGdldCBzb3J0ZWQgYnkgc3RhcnQgcSAqL1xuICB0aW1lU2lnbmF0dXJlcz86IFRpbWVTaWduYXR1cmVJbmZvW107XG59XG5cbi8qKiBEZWZhdWx0IHRlbXBvIGluIGNhc2Ugbm9uZSBpcyBmb3VuZCAoNjAgYnBtKSAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEVNUE86IFRlbXBvSW5mbyA9IHtcbiAgc3RhcnQ6IDAsXG4gIHFwbTogNjBcbn07XG4vKiogRGVmYXVsdCBrZXkgaW4gY2FzZSBub25lIGlzIGZvdW5kIChDIGtleSkgKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0tFWV9TSUdOQVRVUkU6IEtleVNpZ25hdHVyZUluZm8gPSB7XG4gIHN0YXJ0OiAwLFxuICBrZXk6IDBcbn07XG4vKiogRGVmYXVsdCB0aW1lIHNpZ25hdHVyZSBpbiBjYXNlIG5vbmUgaXMgZm91bmQgKDQvNCkgKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVfU0lHTkFUVVJFOiBUaW1lU2lnbmF0dXJlSW5mbyA9IHtcbiAgc3RhcnQ6IDAsIFxuICBudW1lcmF0b3I6IDQsIFxuICBkZW5vbWluYXRvcjogNFxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgcXVhcnRlcnMgdGhhdCBmaXRzIHdpdGhpbiBhIGJhciBpbiBhIGdpdmVuXG4gKiB0aW1lIHNpZ25hdHVyZVxuICogQHBhcmFtIHRpbWVTaWduYXR1cmUgVGhlIHRpbWUgc2lnbmF0dXJlXG4gKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIHF1YXJ0ZXJzIHRoYXQgZml0IGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYXJMZW5ndGgodGltZVNpZ25hdHVyZTogVGltZVNpZ25hdHVyZUluZm8pOiBudW1iZXIge1xuICByZXR1cm4gdGltZVNpZ25hdHVyZS5udW1lcmF0b3IgKiA0IC8gdGltZVNpZ25hdHVyZS5kZW5vbWluYXRvcjtcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IFBhc2N1YWwgZGUgSnVhbi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1xuICBTdGFmZkluZm8sIE5vdGVJbmZvLCBLZXlTaWduYXR1cmVJbmZvLCBcbiAgREVGQVVMVF9URU1QTywgREVGQVVMVF9USU1FX1NJR05BVFVSRSwgREVGQVVMVF9LRVlfU0lHTkFUVVJFXG59IGZyb20gJy4vc3RhZmZfaW5mbyc7XG5pbXBvcnQgeyBCYXJzSW5mbyB9IGZyb20gJy4vYmFyc19pbmZvJztcbmltcG9ydCB7IFN0YWZmQmxvY2ssIFN0YWZmTm90ZSB9IGZyb20gJy4vc3RhZmZfYmxvY2snO1xuaW1wb3J0IHsgU0NBTEVTLCBLRVlfQUNDSURFTlRBTFMgfSBmcm9tICcuL21vZGVsX2NvbnN0YW50cyc7XG5leHBvcnQgeyBLRVlfQUNDSURFTlRBTFMgfTsgLy8gVE9ETzogUmV2aWV3XG5cbi8qKiBBIG1hcCBvZiBzdGFmZiBibG9ja3MgaW5kZXhlZCBieSBzdGFydGluZyBxdWFydGVyICovXG50eXBlIFN0YWZmQmxvY2tNYXAgPSBNYXA8bnVtYmVyLCBTdGFmZkJsb2NrPjtcblxuLyoqIFRlbXBvcmFyeSBzdG9yYWdlIG9mIGFjY2lkZW50YWxzIGFjdGl2YXRlZCBvbiBhIGJhciBieSBNSURJIG5vdGUgKi9cbnR5cGUgQmFyQWNjaWRlbnRhbHMgPSB7W3BpdGNoOiBudW1iZXJdOiBudW1iZXJ9O1xuXG4vKipcbiAqIE1vZGVscyBhIHN0YWZmIGluZm8gaW50byBhIG11c2ljYWwgc3RydWN0dXJlIG9mIHN0YWZmIGJsb2NrcyBpbmRleGVkIGJ5IHRoZVxuICogcXVhcnRlciB0aGV5IHN0YXJ0IGZyb21cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YWZmTW9kZWwge1xuICAvKiogVGhlIGlucHV0IHN0YWZmIGluZm8sIHN0b3JlZCBmb3IgZnVydGhlciBvdXRlciBtb2RpZmljYXRpb25zICovXG4gIHB1YmxpYyBzdGFmZkluZm86IFN0YWZmSW5mbztcbiAgLyoqICBTdGFmZiBjbGVmIGFzIE1JREkgcGl0Y2ggbm90ZSBhdCB0aGUgc3RhZmYgM3JkIGxpbmUgKEcgY2xlZiAtPiBCID0gNzEpICovXG4gIHB1YmxpYyBjbGVmOiBudW1iZXI7XG4gIC8qKiBUaGUgYmFyLCB0ZW1wbywgdGltZSBzaWduYXR1cmUgYW5kIGtleSBzaWduYXR1cmUgaW5mbyBieSBxdWFydGVycyAqL1xuICBwdWJsaWMgYmFyc0luZm86IEJhcnNJbmZvO1xuICAvKiogVGhlIHJlc3V0IG9mIHN0YWZmIGFuYWx5c2lzIG9uIHN0YWZmIGJsb2NrcyBpbmRleGVkIGJ5IHN0YXJ0aW5nIHF1YXJ0ZXIgKi9cbiAgcHVibGljIHN0YWZmQmxvY2tNYXA6IFN0YWZmQmxvY2tNYXA7XG4gIC8qKiBMYXN0IGhhbmRsZWQgcXVhcnRlciwgaS5lLiBzdGFmZiBsZW5ndGggaW4gcXVhcnRlcnMgKi9cbiAgcHJpdmF0ZSBsYXN0UTpudW1iZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBgU3RhZmZNb2RlbGAgc3RvcmluZyBpbnB1dCBkYXRhIGFuZCByZXN1bHRcbiAgICogQHBhcmFtIHN0YWZmSW5mbyBHZW5lcmljIGluZm9ybWF0aW9uIGFib3V0IGEgc2NvcmUgdG8gY3JhdGUgYSBzdGFmZiB3aXRoXG4gICAqIEBwYXJhbSBkZWZhdWx0S2V5IERlZmF1bHQgdmFsdWUgdG8gcmVwbGFjZSBtaXNzaW5nIGtleSBhdCBiYXIgMFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhZmZJbmZvOiBTdGFmZkluZm8sIGRlZmF1bHRLZXk/OiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YWZmSW5mbyA9IG51bGw7XG4gICAgdGhpcy5jbGVmID0gZ3Vlc3NDbGVmKHN0YWZmSW5mbyk7XG4gICAgdGhpcy5zdGFmZkJsb2NrTWFwID0gbnVsbDtcbiAgICB0aGlzLnVwZGF0ZShzdGFmZkluZm8sIGRlZmF1bHRLZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBuZXcgc3RhZmYgaW5mbyB0byB1cGRhdGUgaW50ZXJuYWwgbW9kZWwuIEl0IHdpbGwgbW9kaWZ5IHJlY2VpdmVkXG4gICAqIHN0YWZmIGluZm8gaWYgaXQgaXMgZGlzb3JkZXJlZCBvciBpbmNvbXBsZXRlLlxuICAgKiBAcGFyYW0gc3RhZmZJbmZvIE5ldyBzdGFmZiBpbmZvcm1hdGlvbiB0byByZXBsYWNlIHByZXZpb3VzIG9uZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShzdGFmZkluZm86IFN0YWZmSW5mbywgZGVmYXVsdEtleT86IG51bWJlcikge1xuICAgIHN0YWZmSW5mby5ub3Rlcy5zb3J0KCAoeCwgeSkgPT4geC5zdGFydCAtIHkuc3RhcnQgKTtcblxuICAgIC8vIFRPRE86IEZ1bGwgcmV2aWV3IHRvIG1ha2UgaXQgaW5jcmVtZW50YWwgYXZvaWRpbmcgdW5uZWRlZCB1cGRhdGUgd29ya1xuICAgIHRoaXMubGFzdFEgPSAwO1xuICAgIHN0YWZmSW5mby5ub3Rlcy5mb3JFYWNoKFxuICAgICAgbm90ZSA9PiB7XG4gICAgICAgIGlmIChub3RlLnN0YXJ0ICsgbm90ZS5sZW5ndGggPiB0aGlzLmxhc3RRKSB7XG4gICAgICAgICAgdGhpcy5sYXN0USA9IG5vdGUuc3RhcnQgKyBub3RlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoc3RhZmZJbmZvLnRlbXBvcyAmJiBzdGFmZkluZm8udGVtcG9zLmxlbmd0aCkge1xuICAgICAgc3RhZmZJbmZvLnRlbXBvcy5zb3J0KCAoeCwgeSkgPT4geC5zdGFydCAtIHkuc3RhcnQgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzdGFmZkluZm8udGVtcG9zID0gW0RFRkFVTFRfVEVNUE9dO1xuICAgIH1cbiAgICBpZiAoc3RhZmZJbmZvLnRlbXBvc1swXS5zdGFydCAhPT0gMCkge1xuICAgICAgc3RhZmZJbmZvLnRlbXBvcyA9IFtERUZBVUxUX1RFTVBPXS5jb25jYXQoc3RhZmZJbmZvLnRlbXBvcyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRpbmdLZXk6IEtleVNpZ25hdHVyZUluZm8gPSBkZWZhdWx0S2V5PyBcbiAgICAgIHsgc3RhcnQ6IDAsIGtleTogZGVmYXVsdEtleSB9OiBERUZBVUxUX0tFWV9TSUdOQVRVUkU7XG4gICAgaWYgKHN0YWZmSW5mby5rZXlTaWduYXR1cmVzICYmIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzLmxlbmd0aCkge1xuICAgICAgc3RhZmZJbmZvLmtleVNpZ25hdHVyZXMuc29ydCggKHgsIHkpID0+IHguc3RhcnQgLSB5LnN0YXJ0ICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhZmZJbmZvLmtleVNpZ25hdHVyZXMgPSBbc3RhcnRpbmdLZXldO1xuICAgIH1cbiAgICBpZiAoc3RhZmZJbmZvLmtleVNpZ25hdHVyZXNbMF0uc3RhcnQgIT09IDApIHtcbiAgICAgIHN0YWZmSW5mby5rZXlTaWduYXR1cmVzID0gXG4gICAgICAgIFtzdGFydGluZ0tleV0uY29uY2F0KHN0YWZmSW5mby5rZXlTaWduYXR1cmVzKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzICYmIHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcy5sZW5ndGgpIHtcbiAgICAgIHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcy5zb3J0KCAoeCwgeSkgPT4geC5zdGFydCAtIHkuc3RhcnQgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzdGFmZkluZm8udGltZVNpZ25hdHVyZXMgPSBbREVGQVVMVF9USU1FX1NJR05BVFVSRV07XG4gICAgfVxuICAgIGlmIChzdGFmZkluZm8udGltZVNpZ25hdHVyZXNbMF0uc3RhcnQgIT09IDApIHtcbiAgICAgIHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcyA9IFxuICAgICAgICBbREVGQVVMVF9USU1FX1NJR05BVFVSRV0uY29uY2F0KHN0YWZmSW5mby50aW1lU2lnbmF0dXJlcyk7XG4gICAgfVxuXG4gICAgdGhpcy5iYXJzSW5mbyA9IG5ldyBCYXJzSW5mbyhzdGFmZkluZm8sIHRoaXMubGFzdFEpO1xuXG4gICAgdGhpcy5pbmZvVG9CbG9ja3Moc3RhZmZJbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmFseXplcyBzdG9yZWQgaW5mbyBhbmQgZGVmYXVsdHMgdG8gdXBkYXRlIGBzdGFmZkJsb2NrTWFwYCwgdW5sZXNzIHRoZVxuICAgKiBzdGFmZiBpbmZvIHJlY2VpdmVkIGhhcyBub3QgY2hhbmdlZCAoaW4gbGVuZ3RoIG9mIGl0cyBtZW1iZXJzKS5cbiAgICogQHBhcmFtIHN0YWZmSW5mbyBOZXcgc3RhZmYgaW5mb3JtYXRpb24gdG8gcmVwbGFjZSBwcmV2aW91cyBvbmUuXG4gICAqIEByZXR1cm5zIEFuYWx5emVkIHN0YWZmIGFzIGFuIGluZGV4ZWQgcGVyIHF1YXJ0ZXIgYFN0YWZmQmxvY2tNYXBgXG4gICAqL1xuICBwcml2YXRlIGluZm9Ub0Jsb2NrcyhzdGFmZkluZm86IFN0YWZmSW5mbyk6IFN0YWZmQmxvY2tNYXAge1xuICAgIGlmIChcbiAgICAgIHRoaXMuc3RhZmZCbG9ja01hcCA9PT0gbnVsbCB8fCAvLyBDb25zdHJ1Y3RvciB1c2UgY2FzZVxuICAgICAgc3RhZmZJbmZvLm5vdGVzLmxlbmd0aCAhPT0gdGhpcy5zdGFmZkluZm8ubm90ZXMubGVuZ3RoIHx8XG4gICAgICBzdGFmZkluZm8udGVtcG9zLmxlbmd0aCAhPT0gdGhpcy5zdGFmZkluZm8udGVtcG9zLmxlbmd0aCB8fFxuICAgICAgc3RhZmZJbmZvLmtleVNpZ25hdHVyZXMubGVuZ3RoICE9PSB0aGlzLnN0YWZmSW5mby5rZXlTaWduYXR1cmVzLmxlbmd0aCB8fFxuICAgICAgc3RhZmZJbmZvLnRpbWVTaWduYXR1cmVzLmxlbmd0aCAhPT0gdGhpcy5zdGFmZkluZm8udGltZVNpZ25hdHVyZXMubGVuZ3RoXG4gICAgKSB7XG4gICAgICB0aGlzLnN0YWZmSW5mbyA9IHN0YWZmSW5mbztcbiAgICAgIHRoaXMubGFzdFEgPSAwO1xuXG4gICAgICAvLyBHcm91cCBub3RlcyBpbnRvIGJsb2Nrcywgc2V0IG5vdGUgc3BsaXQgcG9pbnRzXG4gICAgICBjb25zdCBibG9ja3M6IFN0YWZmQmxvY2tNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAvLyBUT0RPOiBGdXR1cmUgYXBwcm9hY2ggdG8gdGhpcy5zdGFmZkJsb2NrTWFwIGZvciBpbmNyZW1lbnRhbCBibG9ja3NcbiAgICAgIGNvbnN0IHNwbGl0ZXMgPSBuZXcgU2V0PG51bWJlcj4oKTsgLy8gU3BsaXQgcG9pbnRzID0gYmFycyArIHN0YXJ0cyArIGVuZHNcbiAgICAgIGxldCBiYXJBY2NpZGVudGFsczogQmFyQWNjaWRlbnRhbHMgPSB7fTsgLy8gVGVtcG9yYWwgYWNjaWRlbnRhbHNcbiAgICAgIGxldCBsYXN0QmFyID0gMDtcbiAgICAgIGxldCBsYXN0QmxvY2s6IFN0YWZmQmxvY2sgPSBudWxsO1xuICAgICAgdGhpcy5zdGFmZkluZm8ubm90ZXMuZm9yRWFjaCggXG4gICAgICAgIG5vdGUgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0YWZmTm90ZSA9IHRvU3RhZmZOb3RlKG5vdGUpO1xuICAgICAgICAgIGNvbnN0IGJhck51bWJlciA9IHRoaXMuYmFyc0luZm8uYmFyTnVtYmVyQXRRKHN0YWZmTm90ZS5zdGFydCk7XG4gICAgICAgICAgY29uc3QgY3VycmVudEJhciA9IE1hdGgudHJ1bmMoYmFyTnVtYmVyKTtcbiAgICAgICAgICBpZiAoY3VycmVudEJhciA+IGxhc3RCYXIpIHtcbiAgICAgICAgICAgIGxhc3RCYXIgPSBjdXJyZW50QmFyO1xuICAgICAgICAgICAgYmFyQWNjaWRlbnRhbHMgPSB7fTsgLy8gUmVzZXRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qga2V5U2lnbmF0dXJlID0gdGhpcy5iYXJzSW5mby5rZXlTaWduYXR1cmVBdFEoc3RhZmZOb3RlLnN0YXJ0KTtcbiAgICAgICAgICBwbGFjZU5vdGUoc3RhZmZOb3RlLCBiYXJBY2NpZGVudGFscywgdGhpcy5jbGVmLCBrZXlTaWduYXR1cmUpO1xuICAgICAgICAgIGNvbnN0IHN0YWZmTm90ZUVuZCA9IHN0YWZmTm90ZS5zdGFydCArIHN0YWZmTm90ZS5sZW5ndGg7XG5cbiAgICAgICAgICBjb25zdCBjdXJyZW50QmxvY2sgPSBub3RlVG9CbG9ja3Moc3RhZmZOb3RlLCBibG9ja3MsIGJhck51bWJlcik7XG4gICAgICAgICAgaWYgKGN1cnJlbnRCbG9jayA9PT0gbGFzdEJsb2NrKSB7IC8vIEFkZGluZyBub3RlcyB0byBjdXJyZW50IGJsb2NrXG4gICAgICAgICAgICBpZiAoc3RhZmZOb3RlLmxlbmd0aCA8IGxhc3RCbG9jay5sZW5ndGgpIHsgLy8gU3BsaXQgdG8gc3RhZmZOb3RlXG4gICAgICAgICAgICAgIGNvbnN0IHF1YXJ0ZXJzID0gc3RhZmZOb3RlLnN0YXJ0ICsgc3RhZmZOb3RlLmxlbmd0aDtcbiAgICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWRCbG9jayA9IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9jay5zcGxpdChxdWFydGVycywgdGhpcy5iYXJzSW5mbyk7XG4gICAgICAgICAgICAgIGJsb2Nrcy5zZXQoc3BsaXR0ZWRCbG9jay5zdGFydCwgc3BsaXR0ZWRCbG9jayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsYXN0QmxvY2subGVuZ3RoIDwgc3RhZmZOb3RlLmxlbmd0aCl7IC8vIFNwbGl0IHRvIGxhc3RCbG9ja1xuICAgICAgICAgICAgICBjb25zdCBxdWFydGVycyA9IGxhc3RCbG9jay5zdGFydCArIGxhc3RCbG9jay5sZW5ndGg7XG4gICAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkQmxvY2sgPSBcbiAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2suc3BsaXQocXVhcnRlcnMsIHRoaXMuYmFyc0luZm8pO1xuICAgICAgICAgICAgICBibG9ja3Muc2V0KHNwbGl0dGVkQmxvY2suc3RhcnQsIHNwbGl0dGVkQmxvY2spO1xuICAgICAgICAgICAgICB0aGlzLmxhc3RRID0gc3RhZmZOb3RlRW5kO1xuICAgICAgICAgICAgfSAvLyBPdGhlcndpc2UsIHNhbWUgbGVuZ3RoLCBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgeyAvLyBBZGRpbmcgbm90ZXMgdG8gYSBuZXcgYmxvY2tcbiAgICAgICAgICAgIGlmIChzdGFmZk5vdGUuc3RhcnQgPiB0aGlzLmxhc3RRKSB7IC8vIEJsb2NrcyBnYXAgbWVhbnMgYSBwcmlvciByZXN0XG4gICAgICAgICAgICAgIGNvbnN0IHF1YXJ0ZXJzID0gdGhpcy5sYXN0UTtcbiAgICAgICAgICAgICAgY29uc3QgYmFyID0gdGhpcy5iYXJzSW5mby5iYXJOdW1iZXJBdFEocXVhcnRlcnMpO1xuICAgICAgICAgICAgICBjb25zdCByZXN0QmxvY2sgPSBuZXcgU3RhZmZCbG9jayhcbiAgICAgICAgICAgICAgICBxdWFydGVycywgc3RhZmZOb3RlLnN0YXJ0IC0gdGhpcy5sYXN0USwgW10sIGJhclxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBibG9ja3Muc2V0KHJlc3RCbG9jay5zdGFydCwgcmVzdEJsb2NrKTtcbiAgICAgICAgICAgICAgdGhpcy5sYXN0USA9IHN0YWZmTm90ZUVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YWZmTm90ZS5zdGFydCA8IHRoaXMubGFzdFEpIHsgLy8gTmV3IGJsb2NrIHN0YXJ0IG92ZXJsYXBzXG4gICAgICAgICAgICAgIHNwbGl0ZXMuYWRkKHN0YWZmTm90ZS5zdGFydCk7XG4gICAgICAgICAgICAgIGlmIChzdGFmZk5vdGVFbmQgPCB0aGlzLmxhc3RRKSB7IC8vIE5ldyBibG9jayBlbmQgb3ZlcmxhcHMgdG9vXG4gICAgICAgICAgICAgICAgc3BsaXRlcy5hZGQoc3RhZmZOb3RlRW5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxhc3RRIDwgc3RhZmZOb3RlRW5kKSB7IC8vIE9sZCBibG9jayBvdmVybGFwcyBuZXdcbiAgICAgICAgICAgICAgICBzcGxpdGVzLmFkZCh0aGlzLmxhc3RRKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RRID0gc3RhZmZOb3RlRW5kO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gT3RoZXJ3aXNlLCBjb25zZWN1dGl2ZSBibG9ja3NcbiAgICAgICAgICAgICAgdGhpcy5sYXN0USA9IHN0YWZmTm90ZUVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RCbG9jayA9IGN1cnJlbnRCbG9jaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBcbiAgICAgIC8vIFRPRE86IEluc2VydCBpbiBwcmV2aW91cyBwYXNzIG9wdGltaXppbmcgd2l0aCBpdGVyYXRvcnMgKE9eMiAtPiBsaW5lYWwpXG4gICAgICAvLyAybmQgcGFzcyB0byBhcHBseSBhbGwgc3BsaXRlcyB0byB0aGUgcmlnaHQgY2h1bmtzXG4gICAgICBjb25zdCBzb3J0ZWRTcGxpdGVzID0gQXJyYXkuZnJvbShzcGxpdGVzKS5zb3J0KCh4LCB5KSA9PiB4IC0geSk7XG4gICAgICBzb3J0ZWRTcGxpdGVzLmZvckVhY2goXG4gICAgICAgIHF1YXJ0ZXJzID0+IHtcbiAgICAgICAgICBibG9ja3MuZm9yRWFjaChcbiAgICAgICAgICAgIGN1cnJlbnRCbG9jayA9PiB7XG4gICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWRCbG9jayA9IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9jay5zcGxpdChxdWFydGVycywgdGhpcy5iYXJzSW5mbyk7XG4gICAgICAgICAgICAgIGlmIChzcGxpdHRlZEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tUb0Jsb2NrcyhzcGxpdHRlZEJsb2NrLCBibG9ja3MpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIFNvcnRpbmcgZm9yIGZ1cnRoZXIgaXRlcmF0aW9uXG4gICAgICB0aGlzLnN0YWZmQmxvY2tNYXAgPSBcbiAgICAgICAgbmV3IE1hcChBcnJheS5mcm9tKGJsb2Nrcykuc29ydCgoeCwgeSkgPT4geFswXSAtIHlbMF0pKTtcblxuICAgICAgLy8gM3JkIHBhc3MgdG8gYXBwbHkgdHVwbGV0cyBhbmQgcml0aG0gc3BsaXR0aW5nIGFuZCBhc3NvY2lhdGlvblxuICAgICAgY29uc3Qgc3RhZmZCbG9ja01hcDogU3RhZmZCbG9ja01hcCA9IG5ldyBNYXAoKTtcbiAgICAgIGxldCBsYXN0U3RhZmZCbG9jazogU3RhZmZCbG9jayA9IG51bGw7XG4gICAgICB0aGlzLnN0YWZmQmxvY2tNYXAuZm9yRWFjaChcbiAgICAgICAgY3VycmVudEJsb2NrID0+IHtcbiAgICAgICAgICBsZXQgcmVtYWluaW5nQmxvY2sgPSBudWxsO1xuICAgICAgICAgIGRve1xuICAgICAgICAgICAgcmVtYWluaW5nQmxvY2sgPSBjdXJyZW50QmxvY2suc3BsaXRUb1B1bHNlKHRoaXMuYmFyc0luZm8pO1xuICAgICAgICAgICAgY29uc3QgaW5jcmVhc2luZyA9IFxuICAgICAgICAgICAgICAhY3VycmVudEJsb2NrLnB1bHNlQmVnaW4gJiYgY3VycmVudEJsb2NrLnB1bHNlRW5kO1xuICAgICAgICAgICAgbGV0IHJlbWFpbmluZ1N5bWJvbHNCbG9jazogU3RhZmZCbG9jayA9IG51bGw7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgIHJlbWFpbmluZ1N5bWJvbHNCbG9jayA9IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9jay5zcGxpdFRvU3ltYm9scyh0aGlzLmJhcnNJbmZvLCBpbmNyZWFzaW5nKTtcbiAgICAgICAgICAgICAgY3VycmVudEJsb2NrLnNldEJlYW1pbmcobGFzdFN0YWZmQmxvY2ssIHRoaXMuYmFyc0luZm8pO1xuICAgICAgICAgICAgICBibG9ja1RvQmxvY2tzKGN1cnJlbnRCbG9jaywgc3RhZmZCbG9ja01hcCk7XG4gICAgICAgICAgICAgIGlmIChyZW1haW5pbmdTeW1ib2xzQmxvY2spIHtcbiAgICAgICAgICAgICAgICBsYXN0U3RhZmZCbG9jayA9IGN1cnJlbnRCbG9jaztcbiAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2sgPSByZW1haW5pbmdTeW1ib2xzQmxvY2s7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKHJlbWFpbmluZ1N5bWJvbHNCbG9jayk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nQmxvY2spIHtcbiAgICAgICAgICAgICAgbGFzdFN0YWZmQmxvY2sgPSBjdXJyZW50QmxvY2s7XG4gICAgICAgICAgICAgIGN1cnJlbnRCbG9jayA9IHJlbWFpbmluZ0Jsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKHJlbWFpbmluZ0Jsb2NrKTsgLy8gRWFjaCBibG9jayBjYW4gaG9sZCBtb3JlIHRoYW4gb25lIHB1bHNlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB0aGlzLnN0YWZmQmxvY2tNYXAgPSBzdGFmZkJsb2NrTWFwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGFmZkJsb2NrTWFwO1xuICB9XG4gIFxufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgbm90ZSBmcm9tIGBOb3RlSW5mb2AgaW50ZXJmYWNlIHRvIGBTdGFmZk5vdGVgIGludGVyZmFjZS4gSXQgXG4gKiByZXNldHMgYHZTdGVwYCBhbmQgYGFjY2lkZW50YWxgIHRvIHplcm8gYW5kIGxldHMgYHRpZWRGcm9tYCBhbmQgYHRpZWRUb2BcbiAqIGFzIGB1bmRlZmluZWRgLlxuICogQHBhcmFtIG5vdGUgVGhlIG5vdGUgdG8gYmUgY29udmVydGVkXG4gKiBAcmV0dXJucyBUaGUgY29udmVydGVkIG5vdGVcbiAqL1xuZnVuY3Rpb24gdG9TdGFmZk5vdGUobm90ZTogTm90ZUluZm8pOiBTdGFmZk5vdGUge1xuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBub3RlLnN0YXJ0LFxuICAgIGxlbmd0aDogbm90ZS5sZW5ndGgsXG4gICAgcGl0Y2g6IG5vdGUucGl0Y2gsXG4gICAgaW50ZW5zaXR5OiBub3RlLmludGVuc2l0eSxcbiAgICB2U3RlcHM6IDAsIC8vIERlbGF5ZWQgYXNzaWduYXRpb24gdGlsbCBwbGFjZU5vdGUoKSBjYWxsXG4gICAgYWNjaWRlbnRhbDogMCAvLyBEZWxheWVkIGFzc2lnbmF0aW9uIHRpbGwgcGxhY2VOb3RlKCkgY2FsbFxuICB9O1xufVxuXG4vKipcbiAqIFNldHMgYSBibG9jayBpbnRvIHRoZSBibG9jayBtYXAgb3IgYXBwZW5kcyBpdCBpbnRvIGFuIGV4aXN0aW5nIGJsb2NrXG4gKiBAcGFyYW0gc3RhZmZCbG9jayBUaGUgYmxvY2sgdG8gYmUgY29uc2lkZXJlZCB0byBzZXQgb3IgYXBwZW5kXG4gKiBAcGFyYW0gYmxvY2tzIEJsb2NrIG1hcCB0byBob2xkIGJsb2Nrc1xuICovXG5mdW5jdGlvbiBibG9ja1RvQmxvY2tzKHN0YWZmQmxvY2s6IFN0YWZmQmxvY2ssIGJsb2NrczogU3RhZmZCbG9ja01hcCkge1xuICBpZiAoYmxvY2tzLmhhcyhzdGFmZkJsb2NrLnN0YXJ0KSkge1xuICAgIGNvbnN0IGV4aXN0aW5nQmxvY2sgPSBibG9ja3MuZ2V0KHN0YWZmQmxvY2suc3RhcnQpO1xuICAgIHN0YWZmQmxvY2subm90ZXMuZm9yRWFjaChub3RlID0+IGV4aXN0aW5nQmxvY2suYWRkTm90ZShub3RlKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYmxvY2tzLnNldChzdGFmZkJsb2NrLnN0YXJ0LCBzdGFmZkJsb2NrKTtcbiAgfVxufVxuXG4vKipcbiAqIFNldHMgb3IgYXBwZW5kcyBhIG5vdGUgaW50byBhIG5ldyBvciBleGlzdGluZyBibG9jaywgcmVzcGVjdGl2ZWx5LCBcbiAqIHJldHVybmluZyBpdC5cbiAqIEBwYXJhbSBub3RlIE5vdGUgdG8gYmUgaW5jbHVkZWQgaW50byBhIGJsb2NrIG1hcCBpbmRleGVkIGJ5IHN0YXJ0aW5nIHF1YXJ0ZXJcbiAqIEBwYXJhbSBibG9ja3MgQmxvY2sgbWFwIHRvIGhvbGQgbm90ZXNcbiAqIEByZXR1cm5zIFRoZSBibG9jayB3aGVyZSB0aGUgbm90ZSBoYXMgYmVlbiBzZXR0ZWQgb3IgYXBwZW5kZWRcbiAqL1xuZnVuY3Rpb24gbm90ZVRvQmxvY2tzKG5vdGU6IFN0YWZmTm90ZSwgYmxvY2tzOiBTdGFmZkJsb2NrTWFwLCBiYXJOdW1iZXI6IG51bWJlcilcbjogU3RhZmZCbG9jayB7XG4gIGlmIChibG9ja3MuaGFzKG5vdGUuc3RhcnQpKSB7XG4gICAgY29uc3QgZXhpc3RpbmdCbG9jayA9IGJsb2Nrcy5nZXQobm90ZS5zdGFydCk7XG4gICAgZXhpc3RpbmdCbG9jay5hZGROb3RlKG5vdGUpO1xuICAgIHJldHVybiBleGlzdGluZ0Jsb2NrO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IG5ld0Jsb2NrID0gbmV3IFN0YWZmQmxvY2soXG4gICAgICBub3RlLnN0YXJ0LCBub3RlLmxlbmd0aCwgW25vdGVdLCBiYXJOdW1iZXIsIG5vdGUudlN0ZXBzLCBub3RlLnZTdGVwc1xuICAgICk7XG4gICAgYmxvY2tzLnNldChub3RlLnN0YXJ0LCBuZXdCbG9jayk7XG4gICAgcmV0dXJuIG5ld0Jsb2NrO1xuICB9XG59XG5cbi8qKlxuICogQW5hbHl6ZXMgYSBub3RlIGJhc2VkIG9uIGZ1bGwgYWNjaWRlbnRhbHMgY29udGV4dCwgdXBkYXRpbmcgYGJhckFjY2lkZW50YWxzYFxuICogQHBhcmFtIHN0YWZmTm90ZSBOb3RlIHRvIGJlIGFuYWx5emVkIFxuICogQHBhcmFtIGJhckFjY2lkZW50YWxzIEFjdGl2ZSBhY2NpZGVudGFscyBpbiBjdXJyZW50IGJhclxuICogQHBhcmFtIGNsZWYgQ29udGV4dHVhbCBhcHBsaWNhYmxlIGNsZWZcbiAqIEBwYXJhbSBrZXkgQ29udGV4dHVhbCBhcHBsaWNhYmxlIGtleVxuICovXG5mdW5jdGlvbiBwbGFjZU5vdGUoXG4gIHN0YWZmTm90ZTogU3RhZmZOb3RlLCBiYXJBY2NpZGVudGFsczogQmFyQWNjaWRlbnRhbHMsIGNsZWY6bnVtYmVyLCBrZXk6bnVtYmVyXG4pIHtcbiAgY29uc3QgcGl0Y2hEZXRhaWxzID0gZ2V0Tm90ZURldGFpbHMoc3RhZmZOb3RlLnBpdGNoLCBjbGVmLCBrZXkpO1xuICBpZiAocGl0Y2hEZXRhaWxzLnZTdGVwcyBpbiBiYXJBY2NpZGVudGFscykgeyAvLyBQcmV2aW91cyBvY2N1cnJlbmNlXG4gICAgaWYgKHBpdGNoRGV0YWlscy5hY2NpZGVudGFsID09PSBiYXJBY2NpZGVudGFsc1twaXRjaERldGFpbHMudlN0ZXBzXSkge1xuICAgICAgcGl0Y2hEZXRhaWxzLmFjY2lkZW50YWwgPSAwOyAvLyBJZ25vcmUgcmVwZXRpdGlvbnNcbiAgICB9XG4gICAgZWxzZSB7IC8vIFJlcGxhY2Ugd2l0aCB0aGUgbmV3IG9uZVxuICAgICAgaWYgKGJhckFjY2lkZW50YWxzW3BpdGNoRGV0YWlscy52U3RlcHNdID09PSAzKSB7XG4gICAgICAgIC8vIElmIGNoYW5naW5nIGZyb20gbm9ybWFsIGFjY2lkZW50YWwsIGZvcmNlIGtleSBhY2NpZGVudGFsXG4gICAgICAgIHBpdGNoRGV0YWlscy5hY2NpZGVudGFsID0gcGl0Y2hEZXRhaWxzLmtleUFjY2lkZW50YWw7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9PT0gMCkge1xuICAgICAgICAvLyBPdGhlcndpc2UsIGNoYW5naW5nIHRvIG5vIGFjY2lkZW50YWwsIGZvcmNlIG5vcm1hbFxuICAgICAgICBwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9IDM7XG4gICAgICB9XG4gICAgICBiYXJBY2NpZGVudGFsc1twaXRjaERldGFpbHMudlN0ZXBzXSA9IHBpdGNoRGV0YWlscy5hY2NpZGVudGFsO1xuICAgIH1cbiAgfVxuICBlbHNlIHsgLy8gUmVnaXN0ZXIgbmV3IG9jY3VycmVuY2VcbiAgICBpZiAoc3RhZmZOb3RlLnRpZWRGcm9tKSB7IC8vIFVubGVzcyBpdCBpcyBhIHRpZWQgbm90ZSAoZXZlbiBhZnRlciBiYXIgcmVzZXQpXG4gICAgICBwaXRjaERldGFpbHMuYWNjaWRlbnRhbCA9IDA7IC8vIFRpZWQgbm90ZXMgdXNlIHRoZSBpbml0YWwgYWNjaWRlbnRhbFxuICAgIH1cbiAgICBiYXJBY2NpZGVudGFsc1twaXRjaERldGFpbHMudlN0ZXBzXSA9IHBpdGNoRGV0YWlscy5hY2NpZGVudGFsO1xuICB9XG4gIHN0YWZmTm90ZS52U3RlcHMgPSBwaXRjaERldGFpbHMudlN0ZXBzO1xuICBzdGFmZk5vdGUuYWNjaWRlbnRhbCA9IHBpdGNoRGV0YWlscy5hY2NpZGVudGFsO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5vdGUgZGV0YWlscyBmcm9tIHBpdGNoIHZhbHVlIGFjY29yZGluZyBvdmVyYWxsIHN0YWZmIGNvbnRleHRcbiAqIEBwYXJhbSBub3RlUGl0Y2ggcGl0Y2ggb2YgdGhlIG5vdGUgdG8gZ2V0IHRoZSBkZXRhaWxzIGZyb21cbiAqIEBwYXJhbSBjbGVmIEVuY29kZWQgYXMgTUlESSBwaXRjaCBub3RlIGF0IHRoZSAzcmQgbGluZSAoRyBjbGVmIC0+IEIgPSA3MSlcbiAqIEBwYXJhbSBrZXkgRW5jb2RlZCBhcyBzZW1pdG9uZXMgKDAgPSBDLCAxID0gQyMsIC4uLiAxMSA9IEIpXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2hlcmUgYHZTdGVwczpgIGlzIHRoZSBub3RlIGhlaWdodCBpbiB0aGUgc3RhZmYsXG4gKiBgYWNjaWRlbnRhbDpgIGlzIHRoZSBhY2NpZGVudGFsIHRvIGJlIGRyYXduIGlmIGl0IHdlcmUgYXBwbGllZCBDIGtleSBhbmQgXG4gKiBga2V5QWNjaWRlbnRhbDpgIGlzIHRoZSBhY2NpZGVudGFsIGZvcmNlZCBieSBjdXJyZW50IGtleSwgaWYgYW55XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb3RlRGV0YWlscyhub3RlUGl0Y2g6IG51bWJlciwgY2xlZjogbnVtYmVyLCBrZXk6IG51bWJlcilcbjoge3ZTdGVwczogbnVtYmVyLCBhY2NpZGVudGFsOiBudW1iZXIsIGtleUFjY2lkZW50YWw6IG51bWJlcn0ge1xuICBjb25zdCBzZW1pdG9uZXMgPSBub3RlUGl0Y2ggLSA2MDtcbiAgY29uc3Qgb2N0YXZlID0gTWF0aC5mbG9vcihzZW1pdG9uZXMgLyAxMik7XG4gIGNvbnN0IHJlbWluZGVyU2VtaXRvbmVzID0gc2VtaXRvbmVzIC0gMTIgKiBvY3RhdmU7XG4gIGNvbnN0IHN0ZXBzID0gU0NBTEVTW2tleV0uc3RlcHNbcmVtaW5kZXJTZW1pdG9uZXNdO1xuICBjb25zdCBvZmZzZXQgPSAoY2xlZiA9PT0gNzEpID8gNiA6IC02O1xuICBjb25zdCBub3RlSW5LZXkgPSBLRVlfQUNDSURFTlRBTFNba2V5XS5hY2NpZGVudGFsID09PSAxID9cbiAgICA2OSArIChyZW1pbmRlclNlbWl0b25lcyArIDMpICUgMTIgOiA2NCArIChyZW1pbmRlclNlbWl0b25lcyArIDgpICUgMTI7XG4gIHJldHVybiB7XG4gICAgdlN0ZXBzOiBvZmZzZXQgLSA3ICogb2N0YXZlICsgc3RlcHMsIFxuICAgIGFjY2lkZW50YWw6IFNDQUxFU1trZXldLmFjY2lkZW50YWxbcmVtaW5kZXJTZW1pdG9uZXNdLFxuICAgIGtleUFjY2lkZW50YWw6IFxuICAgICAgS0VZX0FDQ0lERU5UQUxTW2tleV0ucGl0Y2hlcy5pbmRleE9mKG5vdGVJbktleSkgPiAtMSA/XG4gICAgICAgIEtFWV9BQ0NJREVOVEFMU1trZXldLmFjY2lkZW50YWwgOiAwXG4gIH07XG59XG5cbi8qKlxuICogQ2xlZiBkZWR1Y3Rpb246IEF2ZXJhZ2UgcGl0Y2ggdW5kZXIgQzQgLT4gRiBjbGVmLCBvdGhlcndpc2UgRyBjbGVmXG4gKiBAcmV0dXJucyBUaGUgZGVkdWN0ZWQgY2xlZiBhcyBNaWRpIHBpdGNoIHZhbHVlc1xuICovXG5mdW5jdGlvbiBndWVzc0NsZWYoc3RhZmZJbmZvOiBTdGFmZkluZm8pOiBudW1iZXIge1xuICBsZXQgcGl0Y2hTdW0gPSAwO1xuICBsZXQgY291bnRTdW0gPSAwO1xuICBzdGFmZkluZm8ubm90ZXMuZm9yRWFjaChcbiAgICBub3RlID0+IHtcbiAgICAgIHBpdGNoU3VtICs9IG5vdGUucGl0Y2g7XG4gICAgICArK2NvdW50U3VtO1xuICAgIH1cbiAgKTtcbiAgY29uc3QgYXZlcmFnZVBpdGNoID0gcGl0Y2hTdW0gLyBjb3VudFN1bTtcbiAgcmV0dXJuIGF2ZXJhZ2VQaXRjaCA8IDYwID8gNTAgOiA3MTsgLy8gTnVtYmVycyBhcmUgTUlESSBwaXRjaCB2YWx1ZXMgIFxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7XG4gIFNURU1fV0lEVEgsIExJTkVfU1RST0tFLCBDT01QQUNUX1NQQUNJTkdcbn0gZnJvbSAnLi9yZW5kZXJfY29uc3RhbnRzJztcblxuaW1wb3J0IHtcbiAgU1ZHTlMsIGRyYXdTVkdQYXRoLCBkcmF3U1ZHVGV4dCwgY3JlYXRlU1ZHR3JvdXBDaGlsZCwgc2V0RmFkZSwgc2V0RmlsbCxcbiAgc2V0U3Ryb2tlLCBoaWdobGlnaHRFbGVtZW50XG59IGZyb20gJy4vc3ZnX3Rvb2xzJztcblxuaW1wb3J0ICB7XG4gIFBBVEhfU0NBTEUsIE5PVEVfUEFUSFMsIFJFU1RfUEFUSFMsIENMRUZfUEFUSFMsIEFDQ0lERU5UQUxfUEFUSFMsXG4gIHN0YWZmTGluZVBhdGgsIGV4dHJhTGluZVBhdGgsIGJhclBhdGgsIHN0ZW1QYXRoLCBzaW5nbGVGbGFnUGF0aCwgXG4gIG11bHRpRmxhZ1BhdGgsIHRpZVBhdGgsIGRvdFBhdGhcbn0gZnJvbSAnLi9zdmdfcGF0aHMnO1xuXG5pbXBvcnQge1xuICBTdGFmZkluZm8sIFRpbWVTaWduYXR1cmVJbmZvLCBOb3RlSW5mbywgZ2V0QmFyTGVuZ3RoXG59IGZyb20gJy4vc3RhZmZfaW5mbyc7XG5cbmltcG9ydCB7XG4gIFN0YWZmQmxvY2ssIFN0YWZmTm90ZVxufSBmcm9tICcuL3N0YWZmX2Jsb2NrJztcblxuaW1wb3J0IHtcbiAgU3RhZmZNb2RlbCwgZ2V0Tm90ZURldGFpbHMsIEtFWV9BQ0NJREVOVEFMU1xufSBmcm9tICcuL3N0YWZmX21vZGVsJztcblxuLyoqXG4gKiBOb3RlIHJlc29sdXRpb24gaW4gZnJhY3Rpb25zIG9mIHF1YXJ0ZXIuIE5vIG5vdGUgc2hvcnRlciB0aGFuIDEvMTYgb2YgYSBcbiAqIHF1YXJ0ZXIgd2lsbCBiZSByZW5kZXJlZC4gVGhpcyBsaW1pdCBlcXVhbHMgdG8gc2l4dHktZm91cnRoIG5vdGVzLiBcbiAqL1xuZXhwb3J0IGNvbnN0IE1BWF9RVUFSVEVSX0RJVklTSU9OID0gMTY7IFxuXG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIGRpZmZlcmVudCB3YXlzIG9mIGhvcml6b250YWwgc2NvcmUgc2Nyb2xsaW5nLCBsaWtlIHBhZ2luYWdlZFxuICogKFBBR0UgaXMgZGVmYXVsdCB2YWx1ZSksIG5vdGUgYnkgbm90ZSAoTk9URSkgb3IgaW4gcGFja2VkIGNodW5rcyBieSBkb2luZyBcbiAqIHNjcm9sbCBqdXN0IG9uIGJhciBzdGFydGluZyAoQkFSKS5cbiAqL1xuZXhwb3J0IGVudW0gU2Nyb2xsVHlwZSB7XG4gIC8qKiBcbiAgICogUGFnaW5hdGVkIGhvcml6b250YWwgc2Nyb2xsaW5nLCBhZHZhbmNpbmcgdGhlIHNjcm9sbCB0byBuZXh0IHBhZ2Ugb25jZSBhXG4gICAqIG91dCBvZiBzY3JlZW4gbm90ZSBpcyBoaWdobGl0ZWQsIGNvbnNpZGVyaW5nIGVhY2ggcGFnZSB3aGF0IGhvcml6b250YWxseSBcbiAgICogZml0cyBvbiBvbmUgc2NyZWVuLiBUaGlzIGlzIHRoZSBkZWZhdWx0IHZhbHVlLlxuICAgKi9cbiAgUEFHRSA9IDAsXG4gIC8qKlxuICAgKiBOb3RlIGJ5IG5vdGUgaG9yaXpvbnRhbCBzY3JvbGxpbmcsIGFkdmFuY2luZyB0aGUgc2Nyb2xsIHRvIGNlbnRlciBvbiBcbiAgICogc2NyZWVuIGV2ZXJ5IG5ldyBoaWdobGlnaHRlZCBub3RlLlxuICAgKi9cbiAgTk9URSA9IDEsXG4gIC8qKlxuICAgKiBQZXIgYmFyIGhvcml6b250YWwgc2Nyb2xsaW5nLCBhZHZhbmNpbmcgdGhlIHNjcm9sbCB0byBjZW50ZXIgdGhlIGJlZ2lubmluZ1xuICAgKiBvZiBhIG5ldyBzdGFydGluZyBiYXIgb25jZSBpdHMgZmlyc3Qgbm90ZSBpcyBoaWdobGlnaHRlZC5cbiAgICovXG4gIEJBUiA9IDJcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIHByb3ZpZGluZyBjb25maWd1cmFibGUgcHJvcGVydGllcyB0byBhIFN0YWZmUmVuZGVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN0YWZmUmVuZGVyQ29uZmlnIHtcbiAgLyoqIFRoZSB2ZXJ0aWNhbCBoZWlnaHQgaW4gcGl4ZWxzIG9mIGEgbm90ZSAqL1xuICBub3RlSGVpZ2h0PzogbnVtYmVyO1xuICAvKiogTnVtYmVyIG9mIGhvcml6b250YWwgcGl4ZWxzIGJldHdlZW4gZWFjaCBub3RlICovXG4gIG5vdGVTcGFjaW5nPzogbnVtYmVyO1xuICAvKiogXG4gICAqIFRoZSBob3Jpem9udGFsIHNjYWxlIGF0IHdoaWNoIG5vdGVzIGFyZSBkcmF3biAodGhlIGJpZ2dlciB0aGlzIHZhbHVlLCBcbiAgICogdGhlIFwid2lkZXJcIiBhIG5vdGUgbG9va3MpXG4gICAqL1xuICBwaXhlbHNQZXJUaW1lU3RlcD86IG51bWJlcjtcbiAgLyoqIFRoZSBjb2xvciAoYXMgYW4gUkdCIGNvbW1hIHNlcGFyYXRlZCBzdHJpbmcpIG9mIGEgbm9uIHBsYXllZCBub3RlICovXG4gIG5vdGVSR0I/OiBzdHJpbmc7XG4gIC8qKiBcbiAgICogVGhlIGNvbG9yIChhcyBhbiBSR0IgY29tbWEgc2VwYXJhdGVkIHN0cmluZykgb2YgYW4gYWN0aXZlIG5vdGUgYmVpbmcgXG4gICAqIHBsYXllZFxuICAgKi9cbiAgYWN0aXZlTm90ZVJHQj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBtdXNpY2FsIGtleSB0aGUgc2NvcmUgbXVzdCB1c2UgdG8gYWRhcHQgdGhlIHNjb3JlIHRvIHRoZSByaWdodCBcbiAgICogYWNjaWRlbnRhbHMuIEl0IGNhbiBiZSBvdmVyd3JpdHRlbiB3aXRoIGBTdGFmZkluZm8ua2V5U2lnbmF0dXJlc2AgXG4gICAqIHZhbHVlIGF0IHRpbWUgb3Igc3RlcCAwLiBJZiBub3QgYXNzaWduZWQgaXQgd2lsbCBiZSBhc3VtZWQgQyBrZXkuXG4gICAqL1xuICBkZWZhdWx0S2V5PzogbnVtYmVyO1xuICAvKipcbiAgICogU2V0cyBzY3JvbGxpbmcgdG8gZm9sbG93IHNjb3JlcGxheWluZyBpbiBkaWZmZXJlbnQgd2F5cyBhY2NvcmRpbmcgdG8gXG4gICAqIGBTY3JvbGxUeXBlYCBlbnVtIHZhbHVlcy5cbiAgICovXG4gIHNjcm9sbFR5cGU/OiBTY3JvbGxUeXBlO1xufVxuXG4vKipcbiAqIEFuIGludGVyZmFjZSB0byBob2xkIHRlbXBvcmFyeSBpbmZvcm1hdGlvbiBmb3IgdmlzdWFsIHJlbmRlcmluZ1xuICovXG5pbnRlcmZhY2UgTGlua2VkU1ZHRGV0YWlscyB7XG4gIC8qKiB4IHBvc2l0aW9uIGF0IHRoZSByaWdodCBvZiB0aGUgbm90ZSBoZWFkIHRvIGRyYXcgdGllcyAqL1xuICB4SGVhZFJpZ2h0OiBudW1iZXI7XG4gIC8qKiBTVkcgR3JvdXAgdG8gaG9sZCB0aWVkIG5vdGVzIGludG8gKi9cbiAgZz86IFNWR0VsZW1lbnQ7XG59XG5cbi8qKlxuICogVGhlIHRlbXBvcmFyeSBtYXAgdG8gbG9jYXRlIGxpbmtlZCB2aXN1YWwgcmVzb3VyY2VzIG9uIGJpbmRpbmdzXG4gKi9cbnR5cGUgTGlua2VkTm90ZU1hcCA9IE1hcDxTdGFmZk5vdGUsIExpbmtlZFNWR0RldGFpbHM+O1xuXG4vKipcbiAqIERpc3BsYXlzIGEgYFN0YWZmSW5mb2AgYXMgYSBzdGFmZiBvbiBhIGdpdmVuIGBESVZgLiBcbiAqIFxuICogU3RhZmYgaXMgc2NhbGVkIHRvIGZpdCB2ZXJ0aWNhbGx5IGBjb25maWcubm90ZUhlaWdodGAgYW5kIG5vdGUgaG9yaXpvbnRhbCBcbiAqIHBvc2l0aW9uIGNhbiBiZWhhdmUgaW4gdHdvIGRpZmZlcmVudCB3YXlzOiBJZiBgY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwYCBcbiAqIGlzIGdyZWF0ZXIgdGhhbiB6ZXJvLCBob3Jpem9udGFsIHBvc2l0aW9uIHdpbGwgYmUgcHJvcG9ydGlvbmFsIHRvIGl0cyBcbiAqIHN0YXJ0aW5nIHRpbWUsIGFsbG93aW5nIHRvIHBpbGUgc2V2ZXJhbCBpbnN0YW5jZXMgZm9yIGRpZmZlcmVudCB2b2ljZXMgXG4gKiAocGFydHMpLiBPdGhlcndpc2UsIHJlc3VsdGluZyBzdGFmZiB3aWxsIGRpc3BsYXkgbm90ZXMgaW4gYSBjb21wYWN0IGZvcm0sIFxuICogdXNpbmcgbWluaW11bSBob3Jpem9udGFsIHNwYWNlIGJldHdlZW4gbXVzaWNhbCBzeW1ib2xzIGFzIHJlZ3VsYXIgcGFwZXIgXG4gKiBzdGFmZiBkb2VzLlxuICpcbiAqIENsZWYsIGtleSBhbmQgdGltZSBzaWduYXR1cmUgd2lsbCBiZSBkaXNwbGF5ZWQgYXQgdGhlIGxlZnRtb3N0IHNpZGUgYW5kIHRoZSBcbiAqIHJlc3Qgb2YgdGhlIHN0YWZmIHdpbGwgc2Nyb2xsIHVuZGVyIHRoaXMgaW5pdGlhbCBzaWduYXR1cmUgYXJlYSBhY2NvcmRpbmdseS5cbiAqIEluIGNhc2Ugb2YgcHJvcG9ydGlvbmFsIG5vdGUgcG9zaXRpb25pbmcsIGdpdmVuIGl0IHN0YXJ0cyBhdCBwaXhlbCB6ZXJvLCB0aGVcbiAqIHNpZ25hdHVyZSBhcmVhIHdpbGwgYmxpbmsgbWVhbndoaWxlIGl0IGNvbGxpZGVzIHdpdGggaW5pdGlhbCBhY3RpdmUgbm90ZXMuXG4gKiBLZXkgYW5kIHRpbWUgc2lnbmF0dXJlIGNoYW5nZXMgd2lsbCBiZSBzaG93biBhY2NvcmRpbmdseSB0aHJvdWdoIHNjb3JlLlxuICovXG5leHBvcnQgY2xhc3MgU3RhZmZTVkdSZW5kZXIge1xuICAvKiogVGhlIGFjdHVhbCBtdXNpYyBzY29yZSBkYXRhIHRvIGJlIHJlbmRlcmVkICovXG4gIHB1YmxpYyBzdGFmZkluZm86IFN0YWZmSW5mbztcbiAgLyoqIEludGVybWVkaWF0ZSBzdGFmZiBtb2RlbCBhcnJhbmdlZCBpbiBub24tb3ZlcmxhcHBlZCBibG9ja3MgKi9cbiAgcHVibGljIHN0YWZmTW9kZWw6IFN0YWZmTW9kZWw7XG4gIC8qKiBIb3cgaXQgaGFzIHRvIGJlIHJlbmRlcmVkICovXG4gIHByaXZhdGUgY29uZmlnOiBTdGFmZlJlbmRlckNvbmZpZztcbiAgLyoqIEZ1bGwgc2NvcmUgaGVpZ2h0IChwaXhlbHMpICovXG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gIC8qKiBGdWxsIHNjb3JlIHdpZHRoIChwaXhlbHMpICovXG4gIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgLyoqIFVwcGVyIGNvbnRhaW5lciAqL1xuICBwcml2YXRlIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAvKiogT3ZlcmFsbCBzdGFmZiBjb250YWluZXIgKi9cbiAgcHJpdmF0ZSBkaXY6IEhUTUxEaXZFbGVtZW50O1xuICAvKiogTWFpbiBzdGFmZiBkcmF3aW5nIGFyZWEgKi9cbiAgcHJpdmF0ZSBzdGFmZlNWRzogU1ZHU1ZHRWxlbWVudDtcbiAgLyoqIFN0YWZmIGNvbnRhaW5lciBmb3IgdmVydGljYWwgcmVwb3NpdGlvbmluZyAqL1xuICBwcml2YXRlIHN0YWZmRzogU1ZHRWxlbWVudDtcbiAgLyoqIEFjdGluZyBhcyBiYWNrZ3JvdW5kIGxheWVyICovXG4gIHByaXZhdGUgbGluZXNHOiBTVkdFbGVtZW50O1xuICAvKiogQWN0aW5nIGFzIG1pZGRsZSBwbGFuZSBsYXllciAqL1xuICBwcml2YXRlIG11c2ljRzogU1ZHRWxlbWVudDtcbiAgLyoqIEFjdGluZyBhcyBmb3JlZ3JvdW5kIGxheWVyICovXG4gIHByaXZhdGUgc2lnbmF0dXJlc0c6IFNWR0VsZW1lbnQ7XG4gIC8qKiBPdmVybGF5IHNpZ25hdHVyZSBkcmF3aW5nIGFyZWEgKi9cbiAgcHJpdmF0ZSBvdmVybGF5U1ZHOiBTVkdTVkdFbGVtZW50O1xuICAvKiogT3ZlcmxheSBjb250YWluZXIgZm9yIHZlcnRpY2FsIHJlcG9zaXRpb25pbmcgKi9cbiAgcHJpdmF0ZSBvdmVybGF5RzogU1ZHRWxlbWVudDtcbiAgLyoqIFdoZW4gdG8gc3RvcCBibGlua2luZyAoaW4gcXVhcnRlcnMpICovXG4gIHByaXZhdGUgc2lnbmF0dXJlc1F1YXJ0ZXJzOiBudW1iZXI7XG4gIC8qKiBTaWduYXR1cmVzIGRpc3BsYXlpbmcgbW9kZSBzd2l0Y2ggKi9cbiAgcHJpdmF0ZSBzaWduYXR1cmVzQmxpbmtpbmc6IGJvb2xlYW47XG4gIC8qKiBHZW5lcmFsIHNjYWxlIGFwcGxpYWJsZSB0byBhbGwgU1ZHIGVsZW1lbnRzICovXG4gIHByaXZhdGUgc2NhbGU6IG51bWJlcjtcbiAgLyoqIFZlcnRpY2FsIGZhY3RvciBpbiBwaXhlbHMgKDIgdlN0ZXAvc3RhZmYgbGluZSkgKi9cbiAgcHJpdmF0ZSB2U3RlcFNpemU6IG51bWJlcjtcbiAgLyoqIEhvcml6b250YWwgZmFjdG9yIGluIHBpeGVscyAoMSBoU3RlcC90aW1lIHVuaXQpICovXG4gIHByaXZhdGUgaFN0ZXBTaXplOiBudW1iZXI7XG4gIC8qKiBWZXJ0aWNhbCBTVkcgZGlzdGFuY2UgdG8gbWlkZGxlIHN0YWZmIGxpbmUgKi9cbiAgcHJpdmF0ZSBzdGFmZk9mZnNldDogbnVtYmVyO1xuICAvKiogQ29kZWQgaW4gc2VtaXRvbmVzICgwID0gQywgMSA9IEMjLCAuLi4gMTEgPSBCKSAqL1xuICBwcml2YXRlIGN1cnJlbnRLZXk6IG51bWJlcjtcbiAgLyoqIExpa2UgMy80ICovXG4gIHByaXZhdGUgY3VycmVudFRpbWVTaWduYXR1cmU6IFRpbWVTaWduYXR1cmVJbmZvO1xuICAvKiogeCBwb3NpdGlvbnMgKi9cbiAgcHJpdmF0ZSBzaWduYXR1cmVzTGlzdDogQXJyYXk8e3g6IG51bWJlcjsgcTogbnVtYmVyfT47XG4gIC8qKiBDdXJyZW50IHNpZ25hdHVyZSBiZWdpbm5pbmcgeCBwb3NpdGlvbiAqL1xuICBwcml2YXRlIHNpZ25hdHVyZUN1cnJlbnQ6IG51bWJlcjtcbiAgLyoqIEN1cnJlbnQgc2lnbmF0dXJlIGVuZCB4IHBvc2l0aW9uICovXG4gIHByaXZhdGUgc2lnbmF0dXJlTmV4dDogbnVtYmVyO1xuICAvKiogSGlnaGxpdGVkIG9uZXMgKi9cbiAgcHJpdmF0ZSBwbGF5aW5nTm90ZXM6IE5vdGVJbmZvW107XG4gIC8qKiBLaW5kIG9mIHNjcm9sbGluZyBpZiBhbnkgKi9cbiAgcHJpdmF0ZSBzY3JvbGxUeXBlOiBTY3JvbGxUeXBlO1xuICAvKiogTXV0ZXggdG8gcmVkdWNlIHNjcm9sbCBoYW5kbGluZyBldmVyaGVhZCAqL1xuICBwcml2YXRlIHRpY2tpbmc6IGJvb2xlYW47XG4gIC8qKiBPcHRpbWl6ZWQgc2Nyb2xsIHZhbHVlICovXG4gIHByaXZhdGUgbGFzdEtub3duU2Nyb2xsTGVmdDogbnVtYmVyO1xuICAvKiogTGFzdCBkcmF3biBibG9jayBzdGFydCB0aW1lIGluIHF1YXJ0ZXJzICovXG4gIHByaXZhdGUgbGFzdFE6IG51bWJlcjtcbiAgLyoqIFRpbWUgd2hlbiBsYXN0IGJhciBzdGFydGVkIGluIHF1YXJ0ZXJzICovXG4gIHByaXZhdGUgbGFzdEJhcjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBgU3RhZmZTVkdSZW5kZXJgIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNjb3JlIFRoZSBgU3RhZmZJbmZvYCB0byBiZSB2aXN1YWxpemVkLlxuICAgKiBAcGFyYW0gY29uZmlnIFZpc3VhbGl6YXRpb24gY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICAgKiBAcGFyYW0gZGl2IFRoZSBlbGVtZW50IHdoZXJlIHRoZSB2aXN1YWxpemF0aW9uIHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBzY29yZTogU3RhZmZJbmZvLCBcbiAgICBjb25maWc6IFN0YWZmUmVuZGVyQ29uZmlnLFxuICAgIGRpdjogSFRNTERpdkVsZW1lbnRcbiAgKSB7XG4gICAgdGhpcy5zdGFmZkluZm8gPSBzY29yZTtcbiAgICBjb25zdCBkZWZhdWx0UGl4ZWxzUGVyVGltZVN0ZXAgPSAzMDtcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIG5vdGVIZWlnaHQ6IGNvbmZpZy5ub3RlSGVpZ2h0IHx8IDYsXG4gICAgICBub3RlU3BhY2luZzogY29uZmlnLm5vdGVTcGFjaW5nIHx8IDEsXG4gICAgICBwaXhlbHNQZXJUaW1lU3RlcDogY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwIHx8IGRlZmF1bHRQaXhlbHNQZXJUaW1lU3RlcCxcbiAgICAgIG5vdGVSR0I6IGNvbmZpZy5ub3RlUkdCIHx8ICc4LCA0MSwgNjQnLFxuICAgICAgYWN0aXZlTm90ZVJHQjogY29uZmlnLmFjdGl2ZU5vdGVSR0IgfHwgJzI0MCwgODQsIDExOScsXG4gICAgfTtcbiAgICB0aGlzLmRpdiA9IGRpdjtcblxuICAgIHRoaXMuc2Nyb2xsVHlwZSA9IGNvbmZpZy5zY3JvbGxUeXBlIHx8IFNjcm9sbFR5cGUuUEFHRTtcbiAgICB0aGlzLnNjYWxlID0gdGhpcy5jb25maWcubm90ZUhlaWdodCAvIFBBVEhfU0NBTEU7XG4gICAgaWYgKFxuICAgICAgY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwIDw9IDBcbiAgICApIHsgLy8gQ29tcGFjdCB2aXN1YWxpemF0aW9uIGFzIGRlZmF1bHRcbiAgICAgIHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID0gMDtcbiAgICAgIHRoaXMuY29uZmlnLm5vdGVTcGFjaW5nID0gQ09NUEFDVF9TUEFDSU5HICogdGhpcy5zY2FsZTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YWZmTW9kZWwgPSBuZXcgU3RhZmZNb2RlbCh0aGlzLnN0YWZmSW5mbywgY29uZmlnLmRlZmF1bHRLZXkpO1xuICAgIC8vIE11c2ljYWwgZGVmYXVsdHMgY2FuIGJlIG92ZXJ3cml0dGVuIGJ5IHN0YWZmTW9kZWxcbiAgICB0aGlzLmN1cnJlbnRLZXkgPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8ua2V5U2lnbmF0dXJlQXRRKDApO1xuICAgIHRoaXMuY3VycmVudFRpbWVTaWduYXR1cmUgPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8udGltZVNpZ25hdHVyZUF0USgwKTtcbiAgICB0aGlzLmNsZWFyKCk7IC8vIFRoaXMgd2lsbCBjb21wbGV0ZSByZXN0IG9mIG1lbWJlciB2YWx1ZXMgaW5pdGlhbGl6YXRpb24uXG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYW5kIHJlc2V0cyB0aGUgdmlzdWFsaXplciBvYmplY3QgZm9yIGZ1cnRoZXIgcmVkcmF3cyBmcm9tIHNjcmF0Y2guXG4gICAqL1xuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgLy8gRGl2IG92ZXJhbGwgY29udGFpbmVyIChlbXB0eWluZyBwcmV2aW91cyBleGlzdGluZyBTVkcgZWxlbWVudHMpXG4gICAgd2hpbGUgKHRoaXMuZGl2Lmxhc3RDaGlsZCkgeyB0aGlzLmRpdi5yZW1vdmVDaGlsZCh0aGlzLmRpdi5sYXN0Q2hpbGQpOyB9XG4gICAgdGhpcy5kaXYuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG4gICAgdGhpcy5kaXYuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIC8vIFNpZ25hdHVyZXMgb3ZlcmxheVxuICAgIHRoaXMub3ZlcmxheVNWRyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdOUywgJ3N2ZycpO1xuICAgIHRoaXMub3ZlcmxheVNWRy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5U1ZHKTtcbiAgICB0aGlzLm92ZXJsYXlHID0gY3JlYXRlU1ZHR3JvdXBDaGlsZCh0aGlzLm92ZXJsYXlTVkcsICdvdmVybGF5Jyk7XG4gICAgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNpZ25hdHVyZXNRdWFydGVycyA9IDA7XG4gICAgLy8gSW5uZXIgc2Nyb2xsZWFibGUgQ29udGFpbmVyXG4gICAgdGhpcy5wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYXJlbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuICAgIHRoaXMuZGl2LmFwcGVuZENoaWxkKHRoaXMucGFyZW50RWxlbWVudCk7XG4gICAgdGhpcy50aWNraW5nID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0S25vd25TY3JvbGxMZWZ0ID0gMDtcbiAgICB0aGlzLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVTY3JvbGxFdmVudCk7XG4gICAgLy8gU3RhZmYgZHJhd2luZyBhcmVhXG4gICAgdGhpcy5zdGFmZlNWRyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdOUywgJ3N2ZycpO1xuICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YWZmU1ZHKTtcbiAgICB0aGlzLnN0YWZmRyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zdGFmZlNWRywgJ3N0YWZmJyk7XG4gICAgLy8gQmFja2dyb3VuZCBsaW5lc1xuICAgIHRoaXMubGluZXNHID0gY3JlYXRlU1ZHR3JvdXBDaGlsZCh0aGlzLnN0YWZmU1ZHLCAnbGluZXMnKTtcbiAgICBzZXRTdHJva2UodGhpcy5saW5lc0csIExJTkVfU1RST0tFLCB0aGlzLmdldENvbG9yKCkpO1xuICAgIHRoaXMuc3RhZmZHLmFwcGVuZENoaWxkKHRoaXMubGluZXNHKTtcbiAgICAvLyBNaWRkbGUgcGxhbmUgc3ltYm9sc1xuICAgIHRoaXMubXVzaWNHID0gY3JlYXRlU1ZHR3JvdXBDaGlsZCh0aGlzLnN0YWZmU1ZHLCAnbXVzaWMnKTtcbiAgICBzZXRGaWxsKHRoaXMubXVzaWNHLCB0aGlzLmdldENvbG9yKCkpO1xuICAgIHNldFN0cm9rZSh0aGlzLm11c2ljRywgMCwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICB0aGlzLnN0YWZmRy5hcHBlbmRDaGlsZCh0aGlzLm11c2ljRyk7XG4gICAgLy8gRm9yZWdyb3VuZCBzaWduYXR1cmVzXG4gICAgdGhpcy5zaWduYXR1cmVzRyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5zdGFmZlNWRywgJ3NpZ25hdHVyZXMnKTtcbiAgICB0aGlzLnN0YWZmRy5hcHBlbmRDaGlsZCh0aGlzLnNpZ25hdHVyZXNHKTtcbiAgICAvLyBTaWduYXR1cmVzIHZhbHVlc1xuICAgIHRoaXMuc2lnbmF0dXJlc0xpc3QgPSBbe3g6IDAsIHE6IDB9XTtcbiAgICB0aGlzLnNpZ25hdHVyZUN1cnJlbnQgPSAwO1xuICAgIHRoaXMuc2lnbmF0dXJlTmV4dCA9IDA7IC8vIFRvIHJlc2V0IGJsaW5raW5nIGlmIHNjcm9sbGVkXG4gICAgdGhpcy5jaGFuZ2VLZXlTaWduYXR1cmVJZk5lZWRlZCgwKTtcbiAgICB0aGlzLmNoYW5nZVRpbWVTaWduYXR1cmVJZk5lZWRlZCgwKTtcbiAgICAvLyBHZW5lcmFsIHZpc3VhbCByZWZlcmVuY2VzXG4gICAgdGhpcy52U3RlcFNpemUgPSB0aGlzLmNvbmZpZy5ub3RlSGVpZ2h0IC8gMjtcbiAgICB0aGlzLmhTdGVwU2l6ZSA9IHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwO1xuICAgIHRoaXMuc3RhZmZPZmZzZXQgPSAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMDsgICAgXG4gICAgdGhpcy53aWR0aCA9IDA7ICAgIFxuICAgIC8vIFByb2Nlc3NlZCBub3RlcyBzdG9yYWdlIGFuZCByZWZlcmVuY2VcbiAgICB0aGlzLnBsYXlpbmdOb3RlcyA9IFtdO1xuICAgIHRoaXMubGFzdEJhciA9IDA7XG4gICAgdGhpcy5sYXN0USA9IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZHJhd3MgdGhlIGVudGlyZSBgc3RhZmZJbmZvYCBpbiBhIHN0YWZmIGlmIG5vIGBhY3RpdmVOb3RlYCBpcyBnaXZlbixcbiAgICogaGlnaGxpZ2h0aW5nIG9uIGFuZCBvZmYgdGhlIGFwcHJvcHJpYXRlIG5vdGVzIG90aGVyd2lzZS4gU2hvdWxkIHRoZSBcbiAgICogYHN0YWZmSW5mb2AgaGFkIGNoYW5nZWQgYWRkaW5nIG1vcmUgbm90ZXMgYXQgdGhlIGVuZCwgY2FsbGluZyB0aGlzXG4gICAqIG1ldGhvZCBhZ2FpbiB3b3VsZCBjb21wbGV0ZSB0aGUgcmVkcmF3aW5nIGZyb20gdGhlIHZlcnkgbGFzdCBub3RlIGl0IHdhc1xuICAgKiBkcmF3biwgbWFpbnRhaW5pbmcgdGhlIGFjdGl2ZSBub3RlIGFuZCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFzIHRoZXkgd2VyZS4gXG4gICAqIFRoaXMgaXMgaGFuZHkgZm9yIGluY3JlbWVudGFsIGNvbXBvc2l0aW9ucy4gXG4gICAqIFxuICAgKiBHaXZlbiB0aGUgY29tcGxleGl0eSBvZiBhZGFwdGF0aW9uIHRvIGEgbW9kaWZpZWQgc2NvcmUsIG1vZGlmeWllZCBub3RlcyBcbiAgICogcHJldmlvdXNseSBkcmF3biB3aWxsIGJlIGlnbm9yZWQsIGhvd2V2ZXIsIHlvdSBjYW4gYWx3YXlzIGBjbGVhcigpYCBhbmQgXG4gICAqIGByZWRyYXcoKWAgZm9yIGEgZnVsbCByZWRyYXcuXG4gICAqIEBwYXJhbSBhY3RpdmVOb3RlIElmIHNwZWNpZmllZCwgdGhpcyBgTm90ZWAgd2lsbCBiZSBwYWludGVkXG4gICAqIGluIHRoZSBhY3RpdmUgY29sb3IgYW5kIHRoZXJlIHdvbid0IGJlIGFuIGFjdHVhbCByZWRyYXdpbmcsIGJ1dCBhIFxuICAgKiByZS1jb2xvdXJpbmcgb2YgdGhlIGludm9sdmVkIG5vdGUgaGVhZHMsIGFjY2lkZW50YWxzLCBkb3RzIGFuZCB0aWVzIFxuICAgKiAoYWN0aXZhdGVkIGFuZCBkZS1hY3RpdmF0ZWQgb25lcykuIE90aGVyd2lzZSwgYWxsIG11c2ljYWwgc3ltYm9scyB3aGljaCBcbiAgICogd2VyZSBub3QgcHJvY2Vzc2VkIHlldCB3aWxsIGJlIGRyYXduIHRvIGNvbXBsZXRlIHRoZSBzY29yZS5cbiAgICogQHBhcmFtIHNjcm9sbEludG9WaWV3IElmIHNwZWNpZmllZCBhbmQgdGhlIGFjdGl2ZSBub3RlIHRvIGJlIFxuICAgKiBoaWdobGl0ZWQgaXMgbm90IHZpc3VhbGl6ZWQgaW4gdGhlIGNvbnRhaW5lciBESVYsIHRoZSBsYXRlciB3aWxsIGJlIFxuICAgKiBzY3JvbGxlZCBzbyB0aGF0IHRoZSBub3RlIGlzIHZpZXdlZCBpbiB0aGUgcmlnaHQgcGxhY2UuIFRoaXMgY2FuIGJlIFxuICAgKiBhbHRlcmVkIGJ5IGBTdGFmZlJlbmRlckNvbmZpZy5zY3JvbGxUeXBlYC5cbiAgICogQHJldHVybnMgVGhlIHggcG9zaXRpb24gb2YgdGhlIGhpZ2hsaWdodGVkIGFjdGl2ZSBub3RlIHJlbGF0aXZlIHRvIHRoZSBcbiAgICogYmVnaW5uaW5nIG9mIHRoZSBTVkcsIG9yIC0xIGlmIHRoZXJlIHdhc24ndCBhbnkgZ2l2ZW4gYWN0aXZlIG5vdGUuIFVzZWZ1bFxuICAgKiBmb3IgYXV0b21hdGljYWxseSBhZHZhbmNpbmcgdGhlIHZpc3VhbGl6YXRpb24gaWYgbmVlZGVkLlxuICAgKi9cbiAgcHVibGljIHJlZHJhdyhcbiAgICBhY3RpdmVOb3RlPzogTm90ZUluZm8sIFxuICAgIHNjcm9sbEludG9WaWV3PzogYm9vbGVhbiBcbiAgKTogbnVtYmVyIHtcbiAgICBsZXQgYWN0aXZlTm90ZVBvc2l0aW9uID0gLTE7XG4gICAgY29uc3QgaXNDb21wYWN0ID0gKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID09PSAwKTtcbiAgICBpZiAoYWN0aXZlTm90ZSkgeyAvLyBHaXZlbiBhY3RpdmVOb3RlIG1lYW5zIGhpZ2hsaXRpbmcgaXRcbiAgICAgIGNvbnN0IGtlZXBPblBsYXlpbmdOb3RlczogTm90ZUluZm9bXSA9IFtdO1xuICAgICAgdGhpcy5wbGF5aW5nTm90ZXMuZm9yRWFjaCggLy8gUmV2ZXJ0IG5vbiBwbGF5aW5nIG5vdGVzIGhpZ2hsaXRpbmdcbiAgICAgICAgbm90ZSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQYWludGluZ0FjdGl2ZU5vdGUobm90ZSwgYWN0aXZlTm90ZSkpIHtcbiAgICAgICAgICAgIGtlZXBPblBsYXlpbmdOb3Rlcy5wdXNoKG5vdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhpZ2hsaWdodEVsZW1lbnQodGhpcy5nZXRHcm91cChub3RlKSwgdGhpcy5nZXRDb2xvcihmYWxzZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHRoaXMucGxheWluZ05vdGVzID0ga2VlcE9uUGxheWluZ05vdGVzO1xuICAgICAgY29uc3QgZyA9IHRoaXMuZ2V0R3JvdXAoYWN0aXZlTm90ZSk7XG4gICAgICBpZiAoZykge1xuICAgICAgICB0aGlzLnBsYXlpbmdOb3Rlcy5wdXNoKGFjdGl2ZU5vdGUpOyAvLyBTdG9yZSB0byByZXZlcnQgaGlnaGxpZ2h0IGxhdGVyXG4gICAgICAgIGhpZ2hsaWdodEVsZW1lbnQoZywgdGhpcy5nZXRDb2xvcih0cnVlKSk7XG4gICAgICAgIGFjdGl2ZU5vdGVQb3NpdGlvbiA9IGcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIFxuICAgICAgICAgIHRoaXMuc3RhZmZTVkcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgY29uc3QgcXVhcnRlcnMgPSBhY3RpdmVOb3RlLnN0YXJ0O1xuICAgICAgICBjb25zdCBpc0JhckJlZ2lubmluZyA9IGcuZ2V0QXR0cmlidXRlKCdkYXRhLWlzLWJhci1iZWdpbm5pbmcnKTtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVHlwZSAhPT0gU2Nyb2xsVHlwZS5CQVIgfHwgaXNCYXJCZWdpbm5pbmcpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbEludG9WaWV3SWZOZWVkZWQoc2Nyb2xsSW50b1ZpZXcsIGFjdGl2ZU5vdGVQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFpc0NvbXBhY3QgJiYgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcgJiZcbiAgICAgICAgICBxdWFydGVycyA+PSB0aGlzLnNpZ25hdHVyZXNRdWFydGVyc1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnNpZ25hdHVyZXNCbGlua2luZyA9IGZhbHNlO1xuICAgICAgICAgIHNldEZhZGUodGhpcy5vdmVybGF5RywgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgeyAvLyBObyBhY3RpdmVOb3RlIGdpdmVuIG1lYW5zIHJlZHJhd2luZyBpdCBhbGwgZnJvbSBzY3JhdGNoXG4gICAgICBjb25zdCBpc0ZpcnN0UmVkcmF3ID0gKHRoaXMubGFzdFEgPT09IC0xKTtcbiAgICAgIHRoaXMuc3RhZmZNb2RlbC51cGRhdGUodGhpcy5zdGFmZkluZm8sIHRoaXMuY29uZmlnLmRlZmF1bHRLZXkpO1xuICAgICAgbGV0IHggPSAwO1xuICAgICAgbGV0IHdpZHRoID0gMDtcbiAgICAgIGlmIChpc0ZpcnN0UmVkcmF3KSB7XG4gICAgICAgIC8vIENsZWYrS2V5K1RpbWUgc2lnbmF0dXJlc1xuICAgICAgICB3aWR0aCA9IHRoaXMuZHJhd1NpZ25hdHVyZXModGhpcy5vdmVybGF5RywgeCwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChpc0NvbXBhY3QpIHtcbiAgICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgICAvLyBGaXJzdCBwYWRkaW5nIGlmIGNvbXBhY3RlZC4gRm9sbG93aW5nIGFyZSBwbGFjZWQgYWZ0ZXIgZHJhd2luZ3NcbiAgICAgICAgICB3aWR0aCArPSB0aGlzLmNvbmZpZy5ub3RlU3BhY2luZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHggPSB0aGlzLndpZHRoO1xuICAgICAgfVxuICAgICAgY29uc3QgbGlua2VkTm90ZU1hcDogTGlua2VkTm90ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgIHRoaXMuc3RhZmZNb2RlbC5zdGFmZkJsb2NrTWFwLmZvckVhY2goIC8vIE11c2ljIEJsb2Nrc1xuICAgICAgICAoc3RhZmZCbG9jaywgcXVhcnRlcnMpID0+IHtcbiAgICAgICAgICBpZiAoIWlzQ29tcGFjdCkge1xuICAgICAgICAgICAgeCA9IHRoaXMuc3RhZmZNb2RlbC5iYXJzSW5mby5xdWFydGVyc1RvVGltZShxdWFydGVycykgKiBcbiAgICAgICAgICAgICAgdGhpcy5oU3RlcFNpemU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChxdWFydGVycyA+IHRoaXMubGFzdFEpIHtcbiAgICAgICAgICAgIHdpZHRoICs9IHRoaXMuZHJhd1N0YWZmQmxvY2soc3RhZmZCbG9jaywgeCArIHdpZHRoLCBsaW5rZWROb3RlTWFwKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFEgPSBxdWFydGVycztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBjb25zdCBzdmdSZWN0ID0gdGhpcy5zdGFmZlNWRy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGdSZWN0ID0gdGhpcy5tdXNpY0cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLnVwZGF0ZVZlcnRpY2FsQm91bmRhcmllcyggLy8gVmVydGljYWwgcmVzaXppbmdcbiAgICAgICAgZ1JlY3QudG9wIC0gc3ZnUmVjdC50b3AsIGdSZWN0LmJvdHRvbSAtIHN2Z1JlY3QudG9wXG4gICAgICApO1xuICAgICAgaWYgKGlzQ29tcGFjdCkgeyAvLyBDb21wYWN0IHN0YWZmIGhvcml6b250YWwgcmVzaXppbmdcbiAgICAgICAgdGhpcy53aWR0aCArPSB3aWR0aDtcbiAgICAgIH1cbiAgICAgIGVsc2UgeyAvLyBQcm9wb3J0aW9uYWwgc3RhZmYgaG9yaXpvbnRhbCByZXNpemluZ1xuICAgICAgICBjb25zdCBsYXN0QmxvY2sgPSB0aGlzLnN0YWZmTW9kZWwuc3RhZmZCbG9ja01hcC5nZXQodGhpcy5sYXN0USk7XG4gICAgICAgIGNvbnN0IGVuZFRpbWUgPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8ucXVhcnRlcnNUb1RpbWUoXG4gICAgICAgICAgdGhpcy5sYXN0USArIGxhc3RCbG9jay5sZW5ndGhcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IGVuZFRpbWUgKiB0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZmZTVkcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgYCR7dGhpcy53aWR0aH1gKTtcbiAgICAgIHRoaXMucmVkcmF3U3RhZmZMaW5lcyh0aGlzLmxpbmVzRywgMCwgdGhpcy53aWR0aCk7XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVOb3RlUG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgaWYgYSBnaXZlbiBoaWdobGlnaHRlZCBgbm90ZWAgc2hvdWxkIHN0YXkgdGhhdCB3YXlcbiAgICogXG4gICAqIEEgbm90ZSBpcyBhY3RpdmUgaWYgaXQncyBsaXRlcmFsbHkgdGhlIHNhbWUgYXMgdGhlIG5vdGUgd2UgYXJlXG4gICAqIHBsYXlpbmcgKGFrYSBhY3RpdmVOb3RlKSwgb3IgaWYgaXQgb3ZlcmxhcHMgYmVjYXVzZSBpdCdzIGEgaGVsZCBub3RlLlxuICAgKiBAcGFyYW0gbm90ZSBPbmUgb2YgdGhlIGhpZ2hsaWdodGVkIG5vdGVzIHdoaWNoIGFyZSBjdXJyZW50bHkgYmVlbiBwbGF5ZWRcbiAgICogQHBhcmFtIGFjdGl2ZU5vdGUgQSBuZXcgYWN0aXZlIG5vdGUgcGVuZGluZyB0byBiZSBoaWdobGlnaHRlZFxuICAgKiBAcmV0dXJucyBJZiBpdCBzaG91bGQgc3RheSBoaWdobGlnaHRlZCBvciBub3RcbiAgICovXG4gIHByaXZhdGUgaXNQYWludGluZ0FjdGl2ZU5vdGUoXG4gICAgbm90ZTogTm90ZUluZm8sIGFjdGl2ZU5vdGU6IE5vdGVJbmZvXG4pOiBib29sZWFuIHtcbiAgY29uc3QgaXNQbGF5ZWROb3RlID1cbiAgICAgIG5vdGUuc3RhcnQgPT09IGFjdGl2ZU5vdGUuc3RhcnQ7XG4gIGNvbnN0IGhlbGREb3duRHVyaW5nUGxheWVkTm90ZSA9XG4gICAgICBub3RlLnN0YXJ0IDw9IGFjdGl2ZU5vdGUuc3RhcnQgJiZcbiAgICAgIG5vdGUuc3RhcnQgKyBub3RlLmxlbmd0aCA+PSBhY3RpdmVOb3RlLnN0YXJ0ICsgYWN0aXZlTm90ZS5sZW5ndGg7XG4gIHJldHVybiBpc1BsYXllZE5vdGUgfHwgaGVsZERvd25EdXJpbmdQbGF5ZWROb3RlO1xufVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhIHNldCBvZiBtdXNpY2FsIHN5bWJvbHMgZ3JvdXBlZCBpbiBhIGJsb2NrIGludG8gYSBzdGFmZlxuICAgKiBAcGFyYW0gc3RhZmZCbG9jayBUaGUgYmxvY2sgdG8gYmUgZHJhd25cbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBkcmF3IHRoZSBibG9ja1xuICAgKiBAcGFyYW0gbGlua2VkTm90ZU1hcCBUZW1wb3Jhcnkgc3RvcmFnZSBvZiB2aXN1YWwgZGF0YSBhaWRzXG4gICAqIEByZXR1cm5zIFRoZSB3aWR0aCBvZiB0aGUgZHJhd24gYmxvY2tcbiAgICovXG4gIHByaXZhdGUgZHJhd1N0YWZmQmxvY2soXG4gICAgc3RhZmZCbG9jazogU3RhZmZCbG9jaywgeDogbnVtYmVyLCBsaW5rZWROb3RlTWFwOiBMaW5rZWROb3RlTWFwXG4gICk6IG51bWJlciB7XG4gICAgY29uc3QgcXVhcnRlciA9IHN0YWZmQmxvY2suc3RhcnQ7XG4gICAgLy8gUHJlY2VkaW5nIGJhclxuICAgIGxldCB3aWR0aCA9IHRoaXMuZHJhd0JhcklmTmVlZGVkKHF1YXJ0ZXIsIHgpO1xuICAgIC8vIFNpZ25hdHVyZSBjaGFuZ2UgYW5hbHlzaXMgYW5kIHBvc3NpYmxlIGRyYXdpbmdcbiAgICB3aWR0aCArPSB0aGlzLmRyYXdTaWduYXR1cmVzSWZOZWVkZWQocXVhcnRlciwgeCArIHdpZHRoKTtcbiAgICBpZiAoc3RhZmZCbG9jay5ub3Rlcy5sZW5ndGgpe1xuICAgICAgd2lkdGggKz0gdGhpcy5kcmF3Tm90ZXMoc3RhZmZCbG9jaywgeCArIHdpZHRoLCBsaW5rZWROb3RlTWFwKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB3aWR0aCArPSB0aGlzLmRyYXdSZXN0cyhzdGFmZkJsb2NrLCB4ICsgd2lkdGgpO1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhbGwgbm90ZXMgb2YgYWBTdGFmZkJsb2NrYCAoaGVhZHMsIHN0ZW0sIGZsYWdzLCBkb3RzLCBhY2NpZGVudGFscykgXG4gICAqIGludG8gYSBzdGFmZlxuICAgKiBAcGFyYW0gc3RhZmZCbG9jayBUaGUgYmxvY2sgY29udGFpbmluZyB0aGUgbm90ZXMgdG8gYmUgZHJhd25cbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB0byBkcmF3IHRoZSBub3Rlc1xuICAgKiBAcGFyYW0gbGlua2VkTm90ZU1hcCBUZW1wb3Jhcnkgc3RvcmFnZSBvZiB2aXN1YWwgZGF0YSBhaWRzXG4gICAqIEByZXR1cm5zIFRoZSB3aWR0aCBvZiB0aGUgZHJhd24gbm90ZXNcbiAgICovXG4gIHByaXZhdGUgZHJhd05vdGVzKFxuICAgIHN0YWZmQmxvY2s6IFN0YWZmQmxvY2ssIHg6IG51bWJlciwgbGlua2VkTm90ZU1hcDogTGlua2VkTm90ZU1hcFxuICApOiBudW1iZXIge1xuICAgIGxldCB3aWR0aCA9IDA7XG4gICAgY29uc3Qgbm90ZUhlYWQgPSBOT1RFX1BBVEhTW3N0YWZmQmxvY2suaGVhZEluZGV4XTtcbiAgICAvLyBTdGVtIHBsYWNlaG9sZGVyIGNyZWF0ZWQgYmVmb3JlaGFuZCBhcyBhIGxvd2VyIGxheWVyXG4gICAgbGV0IHN0ZW1HOiBTVkdFbGVtZW50O1xuICAgIGlmIChub3RlSGVhZC5zdGVtQW5jaG9yKSB7XG4gICAgICBzdGVtRyA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQodGhpcy5tdXNpY0csICdzdGVtJyk7XG4gICAgfVxuXG4gICAgLy8gUG9seXBob25pYyBibG9jayBub3RlcyBwaXRjaCBwYXJ0IChldmVyeXRoaW5nIGJ1dCBzaGFyZWQgc3RlbSBhbmQgZmxhZ3MpXG4gICAgc3RhZmZCbG9jay5ub3Rlcy5mb3JFYWNoKFxuICAgICAgbm90ZSA9PiB7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSB0aGlzLmdldE9wYWNpdHkobm90ZS5pbnRlbnNpdHkpO1xuICAgICAgICBjb25zdCB5ID0gbm90ZS52U3RlcHMgKiB0aGlzLnZTdGVwU2l6ZTtcbiAgICAgICAgLy8gT3ZlciBhbmQgdW5kZXIgc3RhZmYgZXh0cmEgbGluZXNcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAyICogKFxuICAgICAgICAgIG5vdGUudlN0ZXBzID4gMCA/IE1hdGguZmxvb3Iobm90ZS52U3RlcHMvMikgOiBNYXRoLmNlaWwobm90ZS52U3RlcHMvMilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3RlLnZTdGVwcyA+IDAgPyAtMiA6IDI7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgTWF0aC5hYnMoaSkgPiA0OyBpICs9IGRlbHRhKSB7XG4gICAgICAgICAgZHJhd1NWR1BhdGgodGhpcy5saW5lc0csIGV4dHJhTGluZVBhdGgsIFxuICAgICAgICAgICAgeCArIHdpZHRoLCBpICogdGhpcy52U3RlcFNpemUsIHRoaXMuc2NhbGUsIDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhpZ2hsaWdodGFibGUgb3ZlcmFsbCBncm91cGluZyBwbGFjZWhvbGRlclxuICAgICAgICBjb25zdCBfZyA9IChub3RlLnRpZWRGcm9tKSA/IGxpbmtlZE5vdGVNYXAuZ2V0KG5vdGUudGllZEZyb20pLmcgOiBcbiAgICAgICAgICBjcmVhdGVTVkdHcm91cENoaWxkKHRoaXMubXVzaWNHLCBgJHtub3RlLnN0YXJ0fS0ke25vdGUucGl0Y2h9YCk7XG4gICAgICAgIGlmIChzdGFmZkJsb2NrLmlzQmFyQmVnaW5uaW5nKCkpIHtcbiAgICAgICAgICBfZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtaXMtYmFyLWJlZ2lubmluZycsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJlY2VkaW5nIFRpZVxuICAgICAgICBpZiAobm90ZS50aWVkRnJvbSkge1xuICAgICAgICAgIGNvbnN0IHRpZVdpZHRoID1cbiAgICAgICAgICAgIHggKyB3aWR0aCAtIGxpbmtlZE5vdGVNYXAuZ2V0KG5vdGUudGllZEZyb20pLnhIZWFkUmlnaHQ7XG4gICAgICAgICAgZHJhd1NWR1BhdGgoXG4gICAgICAgICAgICBfZywgdGllUGF0aCwgbGlua2VkTm90ZU1hcC5nZXQobm90ZS50aWVkRnJvbSkueEhlYWRSaWdodCwgeSwgXG4gICAgICAgICAgICB0aWVXaWR0aC9QQVRIX1NDQUxFLFxuICAgICAgICAgICAgdGhpcy5zY2FsZSAqIChub3RlLnZTdGVwcyA8IDAgPyAtMSA6IDEpLCBvcGFjaXR5XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlIGhlYWRcbiAgICAgICAgZHJhd1NWR1BhdGgoXG4gICAgICAgICAgX2csIG5vdGVIZWFkLnBhdGgsIFxuICAgICAgICAgIHggKyB3aWR0aCwgeSwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSwgb3BhY2l0eVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBfeEhlYWRSaWdodCA9IHggKyB3aWR0aCArIG5vdGVIZWFkLndpZHRoKnRoaXMuc2NhbGU7XG4gICAgICAgIC8vIERvdHRlZCBub3RlXG4gICAgICAgIGlmIChzdGFmZkJsb2NrLmhlYWRBbHRlcmF0aW9uID09PSAxKSB7IC8vIFRPRE86IFRyaXBsZXRzIGFuZCBxdWludHVwbGV0c1xuICAgICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgICAgX2csIGRvdFBhdGgsIFxuICAgICAgICAgICAgeCArIHdpZHRoICsgbm90ZUhlYWQud2lkdGgqdGhpcy5zY2FsZSArIHRoaXMudlN0ZXBTaXplLzIsIFxuICAgICAgICAgICAgeSAtIHRoaXMudlN0ZXBTaXplLzIsIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIG9wYWNpdHlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFjY2lkZW50YWxzXG4gICAgICAgIGlmIChub3RlLmFjY2lkZW50YWwgIT09IDApIHtcbiAgICAgICAgICBkcmF3U1ZHUGF0aChcbiAgICAgICAgICAgIF9nLCBBQ0NJREVOVEFMX1BBVEhTW25vdGUuYWNjaWRlbnRhbF0sXG4gICAgICAgICAgICB4ICsgd2lkdGgsIHksIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIG9wYWNpdHlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0b3JlIGZvciBmdXJ0aGVyIHZpc3VhbCBsaW5rYWdlIGlmIGxpbmtlZCB0byBzb21lIG90aGVyIG5vdGVcbiAgICAgICAgaWYgKG5vdGUudGllZFRvKSB7XG4gICAgICAgICAgbGlua2VkTm90ZU1hcC5zZXQobm90ZSwge2c6IF9nLCB4SGVhZFJpZ2h0OiBfeEhlYWRSaWdodH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBpZiAobm90ZUhlYWQuc3RlbUFuY2hvcikgeyAvLyBUaGVyZSBpcyBhIHN0ZW0gYW5kIHBvdGVudGlhbGx5IHNvbWUgZmxhZ3NcbiAgICAgIGxldCB4U3RlbSA9IHggKyB3aWR0aDtcbiAgICAgIGxldCB5MTogbnVtYmVyLCB5MjogbnVtYmVyO1xuICAgICAgY29uc3QgYW5jaG9yID0gbm90ZUhlYWQuc3RlbUFuY2hvcip0aGlzLnNjYWxlO1xuICAgICAgY29uc3QgZG93bndhcmRzID0gc3RhZmZCbG9jay5taW5WU3RlcCArIHN0YWZmQmxvY2subWF4VlN0ZXAgPCAwO1xuICAgICAgY29uc3QgbXVsdGlwbGUgPSAobm90ZUhlYWQuZmxhZ3MgPiAyKSA/IDIgKiAobm90ZUhlYWQuZmxhZ3MtMikgOiAwO1xuICAgICAgaWYgKGRvd253YXJkcykgeyAvLyBEb3dud2FyZHNcbiAgICAgICAgeTEgPSBzdGFmZkJsb2NrLm1heFZTdGVwICogdGhpcy52U3RlcFNpemUgLSBhbmNob3I7XG4gICAgICAgIHkyID0gKHN0YWZmQmxvY2subWluVlN0ZXAgKyA3ICsgbXVsdGlwbGUpICogdGhpcy52U3RlcFNpemU7XG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8gVXB3YXJkc1xuICAgICAgICB4U3RlbSArPSAobm90ZUhlYWQud2lkdGggLSBTVEVNX1dJRFRIKSAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHkxID0gc3RhZmZCbG9jay5taW5WU3RlcCAqIHRoaXMudlN0ZXBTaXplICsgYW5jaG9yO1xuICAgICAgICB5MiA9IChzdGFmZkJsb2NrLm1heFZTdGVwIC0gNyAtIG11bHRpcGxlKSAqIHRoaXMudlN0ZXBTaXplO1xuICAgICAgfVxuICAgICAgZHJhd1NWR1BhdGgoXG4gICAgICAgIHN0ZW1HLCBzdGVtUGF0aCwgeFN0ZW0sIHkxLCB0aGlzLnNjYWxlLCAoeTIgLSB5MSkgLyBQQVRIX1NDQUxFXG4gICAgICApO1xuICAgICAgaWYgKG5vdGVIZWFkLmZsYWdzID09PSAxKSB7IC8vIFNpbmdsZSBmbGFnXG4gICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgIHN0ZW1HLCBzaW5nbGVGbGFnUGF0aCwgeFN0ZW0sIHkyLCBcbiAgICAgICAgICB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlICogKGRvd253YXJkcyA/IC0xIDogMSksIDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG5vdGVIZWFkLmZsYWdzID4gMSkgeyAvLyBNdWx0aXBsZSBmbGFnXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZUhlYWQuZmxhZ3M7ICsraSkge1xuICAgICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgICAgc3RlbUcsIG11bHRpRmxhZ1BhdGgsIHhTdGVtLCB5MiwgXG4gICAgICAgICAgICB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlICogKGRvd253YXJkcyA/IC0xIDogMSksIDFcbiAgICAgICAgICApO1xuICAgICAgICAgIHkyICs9IChkb3dud2FyZHMgPyAtMiA6IDIpICogdGhpcy52U3RlcFNpemU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID09PSAwKSB7IC8vIENvbXBhY3QgdmlzdWFsaXphdGlvblxuICAgICAgd2lkdGggKz0gbm90ZUhlYWQud2lkdGggKiB0aGlzLnNjYWxlOyAvLyBIZWFkIHNpemVcbiAgICAgIGlmIChzdGVtRykge1xuICAgICAgICB3aWR0aCArPSBzdGVtRy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDsgXG4gICAgICB9XG4gICAgICB3aWR0aCArPSB0aGlzLmNvbmZpZy5ub3RlU3BhY2luZzsgLy8gUG9zdC1zcGFjaW5nXG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyB0aGUgcmVzdHMgd2hpY2ggZm9sbG93cyBhIG11c2ljYWwgYmxvY2sgaW4gYSBzdGFmZlxuICAgKiBAcGFyYW0gc3RhZmZCbG9jayBUaGUgYmxvY2sgd2hpY2ggaW5kaWNhdGVzIGhvdyBtdWNoIHJlc3Qgc2hvdWxkIGJlIFxuICAgKiBkaXNwbGF5ZWQgdGlsbCB0aGUgbmV4dCBibG9ja1xuICAgKiBAcGFyYW0geCBIb3Jpem9udGFsIHBvc2l0aW9uIHRvIGRyYXcgdGhlIHJlc3RzXG4gICAqIEByZXR1cm5zIFRoZSB3aWR0aCBvZiB0aGUgZHJhd24gcmVzdHNcbiAgICovXG4gIHByaXZhdGUgZHJhd1Jlc3RzKHN0YWZmQmxvY2s6IFN0YWZmQmxvY2ssIHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoID0gMDtcbiAgICBjb25zdCByZXN0ID0gZHJhd1NWR1BhdGgoXG4gICAgICB0aGlzLm11c2ljRywgUkVTVF9QQVRIU1tzdGFmZkJsb2NrLmhlYWRJbmRleF0sIFxuICAgICAgeCArIHdpZHRoLCAwLCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlXG4gICAgKTtcbiAgICBpZiAodGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPiAwKSB7IC8vIFByb3BvcnRpb25hbCB2aXN1YWxpemF0aW9uXG4gICAgICB4ICs9IHRoaXMuc3RhZmZNb2RlbC5iYXJzSW5mby5xdWFydGVyc1RvVGltZShzdGFmZkJsb2NrLmhlYWRJbmRleCkgKiBcbiAgICAgICAgdGhpcy5oU3RlcFNpemU7XG4gICAgfVxuICAgIGVsc2UgeyAvLyBDb21wYWN0IHZpc3VhbGl6YXRpb25cbiAgICAgIHdpZHRoICs9IHJlc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICB3aWR0aCArPSB0aGlzLmNvbmZpZy5ub3RlU3BhY2luZzsgLy8gUG9zdC1zcGFjaW5nXG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyB0aGUgZml2ZSBob3Jpem9udGFsIGxpbmVzIG9mIGEgc3RhZmYgKHBlbnRhZ3JhbSkgb3Igc2NhbGVzIHRoZW0gdG8gXG4gICAqIHRoZSBjdXJyZW50IHdpZHRoIG9mIHRoZSBzY29yZSBpZiBhbHJlYWR5IGRyYXduXG4gICAqIEBwYXJhbSBlIFRoZSBTVkcgY29udGFpbmVyIG9mIHRoZSBsaW5lc1xuICAgKiBAcGFyYW0geCBIb3Jpem9udGFsIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBkcmF3aW5nXG4gICAqIEBwYXJhbSB3aWR0aCBXaWR0aCBvZiB0aGUgcGVudGFncmFtXG4gICAqIEByZXR1cm5zIFRoZSBTVkcgd2hpY2ggcmVwcmVzZW50cyB0aGUgcGVudGFncmFtXG4gICAqL1xuICBwcml2YXRlIHJlZHJhd1N0YWZmTGluZXMoZTogU1ZHRWxlbWVudCwgeDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKSB7XG4gICAgbGV0IHN0YWZmID0gZS5xdWVyeVNlbGVjdG9yKCdnW2RhdGEtaWQ9XCJzdGFmZi1maXZlLWxpbmVzXCJdJykgYXMgU1ZHRWxlbWVudDtcbiAgICBpZiAoc3RhZmYpIHsgLy8gQWxyZWFkeSBkcmF3blxuICAgICAgc3RhZmYuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgIG51bGwsICd0cmFuc2Zvcm0nLCBgc2NhbGUoJHt3aWR0aC9QQVRIX1NDQUxFfSwgMSlgXG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHN0YWZmID0gY3JlYXRlU1ZHR3JvdXBDaGlsZChlLCAnc3RhZmYtZml2ZS1saW5lcycpO1xuICAgICAgY29uc3QgeSA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gLTQ7IGkgPD0gNDsgaSArPSAyKSB7IC8vIERyYXcgZml2ZSBsaW5lIHN0YWZmXG4gICAgICAgIGRyYXdTVkdQYXRoKFxuICAgICAgICAgIHN0YWZmLCBzdGFmZkxpbmVQYXRoLCB4LCB5ICsgaSAqIHRoaXMudlN0ZXBTaXplLCB3aWR0aC9QQVRIX1NDQUxFLCAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGFmZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhIGJhciBsaW5lIGlmIHRoaXMgcXVhcnRlciBmaXRzIG9uIHRoZSBiZWdpbm5pbmcgb2YgYSBuZXcgYmFyXG4gICAqIEBwYXJhbSBxdWFydGVycyBRdWFydGVycyBmcm9tIGJlZ2lubmluZyB3aGVyZSBiYXIgY291bGQgc3RhcnRcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiBpbiBzdGFmZiB0byBkcmF3IHRoZSBiYXIgbGluZSwgaWYgYW55LlxuICAgKiBAcmV0dXJucyBUaGUgd2l0aCBvZiB0aGUgZHJhd24gYmFyIGxpbmVcbiAgICovXG4gIHByaXZhdGUgZHJhd0JhcklmTmVlZGVkKHF1YXJ0ZXJzOiBudW1iZXIsIHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoID0gMDtcbiAgICBpZiAocXVhcnRlcnMgIT09IDApIHsgLy8gMXN0IGJhciBza2lwcGVkXG4gICAgICBjb25zdCBuZXh0QmFyID0gdGhpcy5sYXN0QmFyICsgZ2V0QmFyTGVuZ3RoKHRoaXMuY3VycmVudFRpbWVTaWduYXR1cmUpO1xuICAgICAgaWYgKHF1YXJ0ZXJzID49IG5leHRCYXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnBpeGVsc1BlclRpbWVTdGVwID4gMCkgeyAvLyBQcm9wb3J0aW9uYWwgdmlzdWFsaXphdGlvblxuICAgICAgICAgIHggLT0gdGhpcy5jb25maWcubm90ZVNwYWNpbmc7IC8vIE5lZ2F0aXZlIHRvIGF2b2lkIHRvdWNoaW5nIG5vdGUgaGVhZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBDb21wYWN0IHZpc3VhbGl6YXRpb25cbiAgICAgICAgICB3aWR0aCA9IHRoaXMuY29uZmlnLm5vdGVTcGFjaW5nO1xuICAgICAgICB9XG4gICAgICAgIGRyYXdTVkdQYXRoKHRoaXMubGluZXNHLCBiYXJQYXRoLCB4LCAwLCAxLCB0aGlzLnNjYWxlKTtcbiAgICAgICAgdGhpcy5sYXN0QmFyID0gbmV4dEJhcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIEVyYXNlcyBhbGwgZ3JhcGhpY2FsIGVsZW1lbnRzIG9uIHRoZSBzaWduYXR1cmUgb3ZlcmxheVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhclNpZ25hdHVyZU92ZXJsYXkoKSB7XG4gICAgd2hpbGUgKHRoaXMub3ZlcmxheUcubGFzdENoaWxkKSB7XG4gICAgICB0aGlzLm92ZXJsYXlHLnJlbW92ZUNoaWxkKHRoaXMub3ZlcmxheUcubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhd3Mgc2lnbmF0dXJlcyBpZiB0aGVyZSdzIGEgc2lnbmF0dXJlIGNoYW5nZSBvbiBzcGVjaWZpZWQgcXVhcnRlclxuICAgKiBAcGFyYW0gcXVhcnRlcnMgUXVhcnRlcnMgZnJvbSBiZWdpbm5pbmcgd2hlcmUgc2lnbmF0aXVyZXMgY291bGQgc3RhcnRcbiAgICogQHBhcmFtIHggSG9yaXpvbnRhbCBwb3NpdGlvbiB3aGVyZSBpdCBzaG91bGQgYmUgZHJhd25cbiAgICogQHJldHVybnMgV2lkdGggb2YgdGhlIGRyYXduIHNpZ25hdHVyZXMgb3IgMCBpZiBwcm9wb3J0aW9uYWwgdmlzdWFsaXphdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBkcmF3U2lnbmF0dXJlc0lmTmVlZGVkKHF1YXJ0ZXJzOiBudW1iZXIsIHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoID0gMDtcbiAgICBpZiAocXVhcnRlcnMgIT09IDApIHsgLy8gMXN0IGJhciBza2lwcGVkXG4gICAgICBjb25zdCBrZXlDaGFuZ2VkID0gdGhpcy5jaGFuZ2VLZXlTaWduYXR1cmVJZk5lZWRlZChxdWFydGVycyk7XG4gICAgICBjb25zdCB0aW1lQ2hhbmdlZCA9IHRoaXMuY2hhbmdlVGltZVNpZ25hdHVyZUlmTmVlZGVkKHF1YXJ0ZXJzKTtcbiAgICAgIGlmIChrZXlDaGFuZ2VkIHx8IHRpbWVDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNsZWZTcGFjaW5nID0gQ09NUEFDVF9TUEFDSU5HICogdGhpcy5zY2FsZSAqIFxuICAgICAgICAgICh0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA+IDAgPyAzIDogMik7XG4gICAgICAgIHRoaXMuc2lnbmF0dXJlc0xpc3QucHVzaCh7eDogeCAtIGNsZWZTcGFjaW5nICwgcTogcXVhcnRlcnN9KTtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmF0dXJlTmV4dCA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuc2lnbmF0dXJlTmV4dCA9IHg7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlcyA9IHF1YXJ0ZXJzID4gMCA/XG4gICAgICAgICAgY3JlYXRlU1ZHR3JvdXBDaGlsZCh0aGlzLnNpZ25hdHVyZXNHLCAnc2lnbmF0dXJlcycpIDogdGhpcy5vdmVybGF5RztcbiAgICAgICAgd2lkdGggKz0gdGhpcy5kcmF3U2lnbmF0dXJlcyhcbiAgICAgICAgICBzaWduYXR1cmVzLCB4ICsgd2lkdGgsIGZhbHNlLCBrZXlDaGFuZ2VkLCB0aW1lQ2hhbmdlZFxuICAgICAgICApO1xuICAgICAgfSAgXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA9PT0gMCA/IHdpZHRoIDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyB0aGUgc2lnbmF0aXJlcyBpbiB0aGUgZ2l2ZW4gY29udGFpbmVyXG4gICAqIEBwYXJhbSBlIENvbnRhaW5lciBvZiB0aGUgc2lnbmF0dXJlcyB0byBiZSBkcmF3blxuICAgKiBAcGFyYW0geCBIb3Jpem9udGFsIHBvc2l0aW9uIHRvIHN0YXJ0IGRyYXdpbmcgaXRcbiAgICogQHBhcmFtIGRyYXdDbGVmIFdldGhlciB0byBkcmF3IHRoZSBjbGVmIG9yIG5vdFxuICAgKiBAcGFyYW0gZHJhd0tleSBXZXRoZXIgdG8gZHJhdyB0aGUga2V5IG9yIG5vdFxuICAgKiBAcGFyYW0gZHJhd1RpbWUgV2V0aGVyIHRvIGRyYXcgdGhlIHRpbWUgc2lnbmF0dXJlIG9yIG5vdFxuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIHdob2xlIHNpZ25hdHVyZSBzZXQgZHJhd25cbiAgICovXG4gIHByaXZhdGUgZHJhd1NpZ25hdHVyZXMoXG4gICAgZTogU1ZHRWxlbWVudCwgeDogbnVtYmVyLCBcbiAgICBkcmF3Q2xlZjogYm9vbGVhbiwgZHJhd0tleTogYm9vbGVhbiwgZHJhd1RpbWU6IGJvb2xlYW5cbiAgKTogbnVtYmVyIHtcbiAgICBjb25zdCBzcGFjaW5nID0gQ09NUEFDVF9TUEFDSU5HICogdGhpcy5zY2FsZTtcbiAgICBsZXQgd2lkdGggPSBzcGFjaW5nO1xuICAgIGxldCBiYWNrZ3JvdW5kOiBTVkdSZWN0RWxlbWVudDtcbiAgICBjb25zdCBkcmF3QmFja2dyb3VuZCA9IFxuICAgICAgZSA9PT0gdGhpcy5vdmVybGF5RyB8fCB0aGlzLmNvbmZpZy5waXhlbHNQZXJUaW1lU3RlcCA+IDA7XG5cbiAgICBpZiAoZHJhd0JhY2tncm91bmQpIHtcbiAgICAgIGJhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdyZWN0Jyk7XG4gICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgYCR7eH1gKTtcbiAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMCcpO1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCAnMScpOyAvLyAxIHRvIGF2b2lkIGRpc3RvcnRpb25zXG4gICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCAnMScpOyAvLyAxIHRvIGF2b2lkIGRpc3RvcnRpb25zXG4gICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsICdiYWNrZ3JvdW5kJyk7XG4gICAgICBlLmFwcGVuZENoaWxkKGJhY2tncm91bmQpO1xuICAgICAgY29uc3QgdXBwZXJTdHlsZSA9IFxuICAgICAgICBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZGl2LnBhcmVudEVsZW1lbnQpO1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgbnVsbCwgJ2ZpbGwnLCB1cHBlclN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGRyYXdDbGVmKSB7XG4gICAgICBjb25zdCBjbGVmID0gZHJhd1NWR1BhdGgoXG4gICAgICAgIGUsIENMRUZfUEFUSFNbdGhpcy5zdGFmZk1vZGVsLmNsZWZdLCBcbiAgICAgICAgeCArIHdpZHRoLCAwLCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlXG4gICAgICApO1xuICAgICAgc2V0RmlsbChjbGVmLCB0aGlzLmdldENvbG9yKCkpO1xuICAgICAgd2lkdGggKz0gMyAqIHNwYWNpbmc7XG4gICAgfVxuICAgIGlmIChkcmF3S2V5KSB7XG4gICAgICBjb25zdCBhY2NpZGVudGFsID0gS0VZX0FDQ0lERU5UQUxTW3RoaXMuY3VycmVudEtleV0uYWNjaWRlbnRhbDtcbiAgICAgIGNvbnN0IG9mZnNldCA9IFxuICAgICAgICAodGhpcy5zdGFmZk1vZGVsLmNsZWYgPT09IDcxKSA/IDAgOiAxNDsgLy8gTWVhc3VyZWQgaW4gdlN0ZXBcbiAgICAgIEtFWV9BQ0NJREVOVEFMU1t0aGlzLmN1cnJlbnRLZXldLnBpdGNoZXMuZm9yRWFjaChcbiAgICAgICAgcGl0Y2ggPT4ge1xuICAgICAgICAgIGNvbnN0IHN0ZXBzID0gXG4gICAgICAgICAgICBnZXROb3RlRGV0YWlscyhwaXRjaCx0aGlzLnN0YWZmTW9kZWwuY2xlZiwgdGhpcy5jdXJyZW50S2V5KS52U3RlcHM7XG4gICAgICAgICAgY29uc3QgcCA9IGRyYXdTVkdQYXRoKGUsIEFDQ0lERU5UQUxfUEFUSFNbYWNjaWRlbnRhbF0sIFxuICAgICAgICAgICAgeCArIHdpZHRoLCAob2Zmc2V0ICsgc3RlcHMpICogdGhpcy52U3RlcFNpemUsIFxuICAgICAgICAgICAgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG4gICAgICAgICAgc2V0RmlsbChwLCB0aGlzLmdldENvbG9yKCkpO1xuICAgICAgICAgIHdpZHRoICs9IHAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChkcmF3VGltZSkgeyAvLyAwLjUgYW5kIDIuODUgYXJlIGVtcGlyaWNhbCBUaW1lcyBmb250IHZhbHVlc1xuICAgICAgY29uc3QgdGltZUtleSA9IGNyZWF0ZVNWR0dyb3VwQ2hpbGQoZSwgJ3RpbWUta2V5Jyk7XG4gICAgICBjb25zdCBmb250U2l6ZSA9IGAkezIuODUqdGhpcy5jb25maWcubm90ZUhlaWdodH1weGA7XG4gICAgICBkcmF3U1ZHVGV4dChcbiAgICAgICAgdGltZUtleSwgYCR7dGhpcy5jdXJyZW50VGltZVNpZ25hdHVyZS5udW1lcmF0b3J9YCwgXG4gICAgICAgIHggKyB3aWR0aCwgLSAwLjUsIGZvbnRTaXplLCB0cnVlXG4gICAgICApO1xuICAgICAgZHJhd1NWR1RleHQoXG4gICAgICAgIHRpbWVLZXksIGAke3RoaXMuY3VycmVudFRpbWVTaWduYXR1cmUuZGVub21pbmF0b3J9YCwgXG4gICAgICAgIHggKyB3aWR0aCwgNCAqIHRoaXMudlN0ZXBTaXplIC0gMC41LCBmb250U2l6ZSwgdHJ1ZVxuICAgICAgKTtcbiAgICAgIHNldEZpbGwodGltZUtleSwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICAgIHdpZHRoICs9IHRpbWVLZXkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKyBzcGFjaW5nO1xuICAgIH0gLy8gVE9ETzogQ2VudGVyIG51bWVyYXRvciBvciBkZW5vbWluYXRvciBpZiBuZWVkZWQgICBcbiAgICBjb25zdCBzdGFmZiA9IHRoaXMucmVkcmF3U3RhZmZMaW5lcyhlLCB4LCB3aWR0aCk7XG4gICAgc2V0U3Ryb2tlKHN0YWZmLCBMSU5FX1NUUk9LRSwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICAvLyBWZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCByZXNpemluZ1xuICAgIGNvbnN0IGRpdlJlY3QgPSB0aGlzLmRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBlUmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy51cGRhdGVWZXJ0aWNhbEJvdW5kYXJpZXMoXG4gICAgICBlUmVjdC50b3AgLSBkaXZSZWN0LnRvcCwgZVJlY3QuYm90dG9tIC0gZGl2UmVjdC50b3BcbiAgICApO1xuICAgIGlmIChkcmF3QmFja2dyb3VuZCkgeyAvLyBMYXRlIHJlZGltZW5zaW9uIGFmdGVyIGZvcmVncm91bmQgZHJhd2luZ1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsIGAkey10aGlzLnN0YWZmT2Zmc2V0fWApO1xuICAgICAgYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgYCR7dGhpcy5oZWlnaHR9YCk7XG4gICAgICBiYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGAke3dpZHRofWApO1xuICAgIH1cbiAgICAvLyBPdmVybGFwcGluZyBHcmFkaWVudCBvbmx5IGFwcGxpZXMgaW4gb3ZlcmxheVxuICAgIGlmIChlID09PSB0aGlzLm92ZXJsYXlHKSB7XG4gICAgICB0aGlzLm92ZXJsYXlTVkcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgYCR7d2lkdGggKyA1fWApO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgY29uc3QgZ3JhZCA9IGRyYXdTVkdQYXRoKFxuICAgICAgICAgIGUsIHN0ZW1QYXRoLCB3aWR0aCArIGksIGkgKiBpIC0gdGhpcy5zdGFmZk9mZnNldCwgMSAvIFNURU1fV0lEVEgsIFxuICAgICAgICAgICh0aGlzLmhlaWdodCAtIDIgKiBpICogaSkgLyBQQVRIX1NDQUxFLCBcbiAgICAgICAgICAoaSAtIDUpICogKGkgLSA1KSAqIDIgLyBQQVRIX1NDQUxFXG4gICAgICAgICk7XG4gICAgICAgIHNldEZpbGwoZ3JhZCwgdGhpcy5nZXRDb2xvcigpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQmxpbmtpbmcgc2V0IHVwIGFuZCByZXR1cm5cbiAgICBpZiAodGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPiAwKSB7IC8vIFByb3BvcnRpb25hbCB2aXN1YWxpemF0aW9uXG4gICAgICBjb25zdCBmaXJzdE92ZXJsYXkgPSB0aGlzLnNpZ25hdHVyZXNRdWFydGVycyA9PT0gMDtcbiAgICAgIGlmIChmaXJzdE92ZXJsYXkpIHsgLy8gRmlyc3QgdGltZSBvdmVybGF5IGlzIGRyYXduXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlc1F1YXJ0ZXJzID0gXG4gICAgICAgICAgdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLnRpbWVUb1F1YXJ0ZXJzKHdpZHRoL3RoaXMuaFN0ZXBTaXplKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaXJzdE92ZXJsYXkgfHwgeCA+IDApIHsgLy8gRXhjbHVkZXMgc2Vjb25kIG92ZXJsYXkgZHJhd2luZ3NcbiAgICAgICAgdGhpcy5zaWduYXR1cmVzQmxpbmtpbmcgPSB0cnVlO1xuICAgICAgICBzZXRGYWRlKGUsIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH0gXG4gICAgZWxzZSB7IC8vIENvbXBhY3QgdmlzdWFsaXphdGlvblxuICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IGtleSBhY2NvcmRpbmcgdG8gdGhlIHF1YXJ0ZXIgcG9zaXRpb25cbiAgICogQHBhcmFtIHF1YXJ0ZXJzIFF1YXJ0ZXJzIGZyb20gYmVnaW5uaW5nIHdoZXJlIGNoYW5nZSBjb3VsZCBoYXBwZW5cbiAgICogQHJldHVybnMgV2V0aGVyIGl0IGNoYW5nZWQgb3Igbm90XG4gICAqL1xuICBwcml2YXRlIGNoYW5nZUtleVNpZ25hdHVyZUlmTmVlZGVkKHF1YXJ0ZXJzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLnN0YWZmTW9kZWwuYmFyc0luZm8ua2V5U2lnbmF0dXJlQXRRKHF1YXJ0ZXJzLCB0cnVlKTtcbiAgICBpZiAoa2V5ID49IDApIHsgLy8gUmV0dXJucyAtMSBpbiBjYXNlIHRoZXJlIHdhcyBubyBjaGFuZ2UgYXQgcXVhcnRlcnNcbiAgICAgIHRoaXMuY3VycmVudEtleSA9IGtleTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gXG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgdGltZSBzaWduYXR1cmUgYWNjb3JkaW5nIHRvIHRoZSBxdWFydGVyIHBvc2l0aW9uXG4gICAqIEBwYXJhbSBxdWFydGVycyBRdWFydGVycyBmcm9tIGJlZ2lubmluZyB3aGVyZSBjaGFuZ2UgY291bGQgaGFwcGVuXG4gICAqIEByZXR1cm5zIFdldGhlciBpdCBjaGFuZ2VkIG9yIG5vdFxuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VUaW1lU2lnbmF0dXJlSWZOZWVkZWQocXVhcnRlcnM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRzID0gdGhpcy5zdGFmZk1vZGVsLmJhcnNJbmZvLnRpbWVTaWduYXR1cmVBdFEocXVhcnRlcnMsIHRydWUpO1xuICAgIGlmICh0cykgeyAvLyBSZXR1cm5zIG51bGwgaW4gY2FzZSB0aGVyZSB3YXMgbm8gY2hhbmdlIGF0IHF1YXJ0ZXJzXG4gICAgICB0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlID0gdHM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHNpZ25hdHVyZXMgY2hhbmdlIGFuZCBkcmF3aW5nIGFjY29yZGluZyB0byB4IHBvc2l0aW9uLiBJdCdzIHVzZWRcbiAgICogdG8gcmVwbGFjZSBvdmVybGF5cyBvbiBob3Jpem9udGFsIHNjcm9sbGluZyBhY2NvcmRpbmcgdG8gbmV4dCBkaWFncmFtOlxuICAgKiBgYGBcbiAgICogICAgY3VycmVudCAgeCAgICAgbmV4dCAgIDw9IGN1cnJlbnQgJiBuZXh0IGluY2x1ZGUgdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAqICAgICAgICAgIHwgIHwgICAgIHxcbiAgICogWzAgICAgICApWzEgICAgICApWzIgICAgICludWxsXG4gICAqIGBgYFxuICAgKiBAcGFyYW0geCBIb3Jpem9udGFsIHBvc2l0aW9uIHRvIGRyYXcgc2lnbmF0dXJlc1xuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VBbmREcmF3U2lnbmF0dXJlc0lmTmVlZGVkKHg6IG51bWJlcikge1xuICAgIGxldCBxdWFydGVyOiBudW1iZXI7XG4gICAgaWYgKFxuICAgICAgeCA8IHRoaXMuc2lnbmF0dXJlQ3VycmVudCB8fCBcbiAgICAgICh0aGlzLnNpZ25hdHVyZU5leHQgIT09IG51bGwgJiYgdGhpcy5zaWduYXR1cmVOZXh0IDw9IHgpXG4gICAgKSB7XG4gICAgICBxdWFydGVyID0gdGhpcy5zaWduYXR1cmVzTGlzdFswXS5xO1xuICAgICAgdGhpcy5zaWduYXR1cmVOZXh0ID0gbnVsbDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaWduYXR1cmVzTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoeCA8IHRoaXMuc2lnbmF0dXJlc0xpc3RbaV0ueCkge1xuICAgICAgICAgIHRoaXMuc2lnbmF0dXJlTmV4dCA9IHRoaXMuc2lnbmF0dXJlc0xpc3RbaV0ueDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNpZ25hdHVyZUN1cnJlbnQgPSB0aGlzLnNpZ25hdHVyZXNMaXN0W2ldLng7XG4gICAgICAgICAgcXVhcnRlciA9IHRoaXMuc2lnbmF0dXJlc0xpc3RbaV0ucTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChxdWFydGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRtcEtleSA9IHRoaXMuY3VycmVudEtleTtcbiAgICAgIGNvbnN0IHRtcFRpbWVTaWduYXR1cmUgPSB0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlO1xuICAgICAgdGhpcy5jaGFuZ2VLZXlTaWduYXR1cmVJZk5lZWRlZChxdWFydGVyKTtcbiAgICAgIHRoaXMuY2hhbmdlVGltZVNpZ25hdHVyZUlmTmVlZGVkKHF1YXJ0ZXIpO1xuICAgICAgdGhpcy5jbGVhclNpZ25hdHVyZU92ZXJsYXkoKTtcbiAgICAgIHRoaXMuZHJhd1NpZ25hdHVyZXModGhpcy5vdmVybGF5RywgMCwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB0aGlzLmN1cnJlbnRLZXkgPSB0bXBLZXk7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lU2lnbmF0dXJlID0gdG1wVGltZVNpZ25hdHVyZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucGl4ZWxzUGVyVGltZVN0ZXAgPiAwICYmIHggPT09IDApIHtcbiAgICAgIHRoaXMuc2lnbmF0dXJlTmV4dCA9IDA7IC8vIFRvIHJlc2V0IGJsaW5raW5nIGlmIHNjcm9sbGVkXG4gICAgICB0aGlzLnNpZ25hdHVyZXNCbGlua2luZyA9IHRydWU7XG4gICAgICBzZXRGYWRlKHRoaXMub3ZlcmxheUcsIHRoaXMuc2lnbmF0dXJlc0JsaW5raW5nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgaGFuZGxlciBmb3IgaG9yaXpvbmF0YWwgc2Nyb2xsIGV2ZW50c1xuICAgKiBAcGFyYW0gX2V2ZW50IElnbm9yZWRcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlU2Nyb2xsRXZlbnQgPSAoX2V2ZW50OiBFdmVudCkgPT4ge1xuICAgIHRoaXMubGFzdEtub3duU2Nyb2xsTGVmdCA9IHRoaXMucGFyZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIGlmICghdGhpcy50aWNraW5nKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VBbmREcmF3U2lnbmF0dXJlc0lmTmVlZGVkKHRoaXMubGFzdEtub3duU2Nyb2xsTGVmdCk7XG4gICAgICAgICAgdGhpcy50aWNraW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMudGlja2luZyA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFjdHVhdG9yIG9uIHRoZSBob3Jpem9udGFsIHNjcm9sbCB0byBzaG93IGhpZ2hsaXRlZCBub3RlXG4gICAqIEBwYXJhbSBzY3JvbGxJbnRvVmlldyBXZXRoZXIgdGhlIHNjcm9sbCBtdXN0IGZvbGxvdyBhY3RpdmUgbm90ZSBvciBub3RcbiAgICogQHBhcmFtIGFjdGl2ZU5vdGVQb3NpdGlvbiBIb3Jpem9udGFsIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGFjdGl2ZSBub3RlXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEludG9WaWV3SWZOZWVkZWQoXG4gICAgc2Nyb2xsSW50b1ZpZXc6IGJvb2xlYW4sIGFjdGl2ZU5vdGVQb3NpdGlvbjogbnVtYmVyXG4gICkge1xuICAgIGlmIChzY3JvbGxJbnRvVmlldykge1xuICAgICAgaWYgKHRoaXMuc2Nyb2xsVHlwZSA9PT0gU2Nyb2xsVHlwZS5QQUdFKSB7XG4gICAgICAgIC8vIFNlZSBpZiB3ZSBuZWVkIHRvIHNjcm9sbCB0aGUgY29udGFpbmVyLlxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgaWYgKGFjdGl2ZU5vdGVQb3NpdGlvbiA+XG4gICAgICAgICAgICAodGhpcy5wYXJlbnRFbGVtZW50LnNjcm9sbExlZnQgKyBjb250YWluZXJXaWR0aCkpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuc2Nyb2xsTGVmdCA9IGFjdGl2ZU5vdGVQb3NpdGlvbiAtIDIwO1xuICAgICAgICB9XG4gICAgICB9IFxuICAgICAgZWxzZSB7IC8vIFZhbGlkIGZvciBib3RoIFNjcm9sbFR5cGUuTk9URSAmIFNjcm9sbFR5cGUuQkFSXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuc2Nyb2xsTGVmdCA9IFxuICAgICAgICAgIGFjdGl2ZU5vdGVQb3NpdGlvbiAtIGNvbnRhaW5lcldpZHRoICogMC41O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemVzIGNvbnRhaW5lcnMgdG8gZnVsbHkgaG9sZCBzdGFmZiBvbiBwb3NzaWJsZSByZXNpemVzXG4gICAqIEBwYXJhbSB0b3AgVmVydGljYWwgdG9wIHBvc2l0aW9uIG9uIGhpZ2hlc3Qgc3RhZmYgY29tcG9uZW50XG4gICAqIEBwYXJhbSBib3R0b20gVmVydGljYWwgYm90dG9tIHBvc2l0aW9uIG9uIGxvd2VzdCBzdGFmZiBjb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlVmVydGljYWxCb3VuZGFyaWVzKHRvcDogbnVtYmVyLCBib3R0b206IG51bWJlcikge1xuICAgIGxldCBuZXdIZWlnaHQgPSAwO1xuICAgIGlmICh0b3AgPCAwKSB7XG4gICAgICB0aGlzLnN0YWZmT2Zmc2V0IC09IHRvcDtcbiAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gYHRyYW5zbGF0ZSgwLCAke3RoaXMuc3RhZmZPZmZzZXR9KWA7XG4gICAgICB0aGlzLm92ZXJsYXlHLnNldEF0dHJpYnV0ZU5TKG51bGwsICd0cmFuc2Zvcm0nLCB0cmFuc2xhdGlvbik7XG4gICAgICB0aGlzLnN0YWZmRy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgdHJhbnNsYXRpb24pO1xuICAgICAgbmV3SGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSB0b3A7XG4gICAgfVxuICAgIG5ld0hlaWdodCA9IE1hdGgubWF4KG5ld0hlaWdodCwgYm90dG9tIC0gdG9wKTtcbiAgICBpZiAobmV3SGVpZ2h0ID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgICAgdGhpcy5vdmVybGF5U1ZHLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBgJHt0aGlzLmhlaWdodH1gKTtcbiAgICAgIHRoaXMuc3RhZmZTVkcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsIGAke3RoaXMuaGVpZ2h0fWApO1xuICAgICAgY29uc3QgZWxzID0gdGhpcy5kaXYucXVlcnlTZWxlY3RvckFsbCgncmVjdFtkYXRhLWlkPVwiYmFja2dyb3VuZFwiXScpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgZWwgPSBlbHNbaV07XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgYCR7LXRoaXMuc3RhZmZPZmZzZXR9YCk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBgJHt0aGlzLmhlaWdodH1gKTtcbiAgICAgIH0gIFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBodHRwIHN0cmluZyB3aXRoIHRoZSBkZWZhdWx0IGNvbG9yIChkZWZhdWx0KSBvciB0aGUgYWN0aXZlIG9uZVxuICAgKiBAcGFyYW0gaXNBY3RpdmUgV2V0aGVyIHRoZSBjb2xvciBpcyBhY3RpdmUgKGhpZ2hsaWdodCkgb3Igbm90XG4gICAqIEByZXR1cm5zIFRoZSBjb2xvciBzdHJpbmdcbiAgICovXG4gIHByaXZhdGUgZ2V0Q29sb3IoaXNBY3RpdmU9ZmFsc2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBgcmdiKCR7aXNBY3RpdmUgPyB0aGlzLmNvbmZpZy5hY3RpdmVOb3RlUkdCIDogdGhpcy5jb25maWcubm90ZVJHQn0pYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYWxwaGEgdHJhbnNwYXJlbmN5IHZhbHVlIHdpdGggYSBzbGlnaHQgYnVtcCB0byBhdm9pZCBcbiAgICogcXVpZXQgbm90ZXMgdG8gYmUgaW52aXNpYmxlXG4gICAqIEBwYXJhbSBub3RlVmVsb2NpdHkgVGhlIE1JREkgdmVsb2NpdHkgb2YgdGhlIG5vdGUgKGZyb20gMCB0byAxMjcpXG4gICAqIEByZXR1cm5zIEEgbnVtZXJpY2FsIHZhbHVlIGZvciBvcGFjaXR5IChmcm9tIDAuMCA9IGZ1bGwgdHJhbnNwYXJlbnQgdG8gXG4gICAqIDEuMCA9IGZ1bGwgb3BhY2l0eSkgXG4gICAqL1xuICBwcml2YXRlIGdldE9wYWNpdHkobm90ZVZlbG9jaXR5PzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBvcGFjaXR5QmFzZWxpbmUgPSAwLjI7ICAvLyBTaGlmdCBhbGwgdGhlIG9wYWNpdGllcyB1cCBhIGxpdHRsZS5cbiAgICByZXR1cm4gbm90ZVZlbG9jaXR5ID8gXG4gICAgICAobm90ZVZlbG9jaXR5IC8gMTI3KSAqICgxIC0gb3BhY2l0eUJhc2VsaW5lKSArIG9wYWNpdHlCYXNlbGluZSA6IDE7XG4gIH1cblxuICAvKipcbiAgICogTG9jYXRlcyBhIFNWRyBncm91cCB0byBoaWdobGlnaHQgdGhlIHN5bWJvbHMgaXQgY29udGFpbnNcbiAgICogQHBhcmFtIG5vdGUgVGhlIG5vdGUgdG8gbG9jYXRlIHRoZSBTVkcgZ3JvdXAgaXQgYmVsb25ncyB0b1xuICAgKiBAcmV0dXJucyBUaGUgU1ZHIEdyb3VwXG4gICAqL1xuICBwcml2YXRlIGdldEdyb3VwKG5vdGU6IE5vdGVJbmZvKTogU1ZHRWxlbWVudCB7XG4gICAgY29uc3QgcXVhcnRlcnMgPSBub3RlLnN0YXJ0O1xuICAgIGNvbnN0IHBpdGNoID0gbm90ZS5waXRjaDtcbiAgICByZXR1cm4gdGhpcy5zdGFmZlNWRy5xdWVyeVNlbGVjdG9yKGBnW2RhdGEtaWQ9XCIke3F1YXJ0ZXJzfS0ke3BpdGNofVwiXWApO1xuICB9XG5cbn0iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBQYXNjdWFsIGRlIEp1YW4uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqXG4gKiBBbGwgU1ZHIHBhdGhzIGhhdmUgYmVlbiBkcmF3biBpbiBhIHNjYWxlIG9mIGBQQVRIX1NDQUxFICogUEFUSF9TQ0FMRWBcbiAqIGluIGEgcmVsYXRpdmUgcG9zaXRpb24gdG8gdGhlIHN0YWZmIG1pZGRsZSBsaW5lLCBhbmNob3JpbmcgdG8gdGhlXG4gKiBsZWZ0bW9zdCBzaWRlIG9mIGEgbm90ZSBoZWFkLlxuICovXG5leHBvcnQgY29uc3QgUEFUSF9TQ0FMRSA9IDEwMDsgXG5cbi8qKiBHIGNsZWYgU1ZHIHBhdGggKi9cbmNvbnN0IGdDbGVmUGF0aCA9IGBNIDEzOSw0OCBDIDEwMiw1NyA3NiwxMjAgMTMxLDE1MSA0MSwxMjggNjQsMjQgMTI5LDIgTCBcbjExNywtNTcgQyAtMzIsNDcgMjYsMjE3IDE2NiwxODIgWiBtIDEyLC0xIDI3LDEzMSBDIDI0MiwxNTMgMjE2LDQ2IDE1MSw0NyBcblogbSAtMzUsLTE3NyBjIDM0LC0yMyA4MiwtMTE3IDUwLC0xNDAgLTIzLC0xNyAtNzEsMzMgLTUwLDE0MCB6IG0gLTEwLDEwIGMgXG4tMjMsLTc3IC0yMCwtMjAwIDQ4LC0yMTMgMTksLTQgODksMTcxIC0yNiwyNjYgbCAxMyw2NiBjIDEyMCwtNiAxMzcsMTU1IFxuMzksMTkxIGwgMTIsNTggYyAzMCwxMzEgLTEzNywxNDUgLTEzOCw0NyAwLC0yOSAzNywtNTkgNjMsLTM3IDIxLDE4IDI1LDcxIFxuLTI1LDcwIDMyLDQyIDEwMywwIDkxLC02NSBMIDE2NywxOTMgQyA1NiwyMzIgLTExMiw2MyAxMDYsLTEyMCBaYDtcbi8qKiBGIGNsZWYgU1ZHIHBhdGggKi9cbmNvbnN0IGZDbGVmUGF0aCA9IGBtIDEwMSwtMTk5IGMgLTQ5LDAgLTEwMCwyOCAtMTAwLDgzIDAsMzkgNTgsNTcgODIsMjYgMTUsLTIwIFxuLTQsLTQ3IC0zMiwtNDcgLTIzLDEgLTI1LDAgLTI1LC04IDAsLTIyIDQwLC00NiA3MSwtNDEgOTEsMTYgNjcsMjA4IC0xMDUsMzAyIFxuNzUsLTI3IDE5OCwtOTQgMjExLC0yMDEgNiwtNjYgLTQyLC0xMTQgLTEwMiwtMTE0IHogbSAxNDMsMzMgYyAtMTMsMCAtMjMsMTEgXG4tMjMsMjQgMCwxNCAxMCwyNCAyMywyNCAxMywwIDIzLC0xMSAyMywtMjQgMCwtMTMgLTEwLC0yNCAtMjMsLTI0IHogbSAyLDgzIGMgXG4tMTMsMCAtMjMsMTEgLTIzLDI0IDAsMTQgMTAsMjQgMjMsMjQgMTMsMCAyMywtMTEgMjMsLTI0IDAsLTEzIC0xMCwtMjQgLTIzLC0yNCBcbnpgO1xuXG4vKiogV2hvbGUgbm90ZSBoZWFkIFNWRyBwYXRoICovXG5jb25zdCB3aG9sZUhlYWRQYXRoID0gYG0gMCwwIGMgMCwtMzcgNDksLTUxIDc5LC01MSAzMSwwIDgzLDEzIDgzLDUxIDAsMzkgXG4tNTUsNTEgLTg0LDUxIEMgNDksNTEgMCwzNyAwLDAgWiBtIDExMSwzMSBjIDEzLC0xOSAwLC01OCAtMjIsLTY4IC0zMywtMTUgXG4tNTMsMTAgLTM5LDQ5IDksMjcgNDgsMzkgNjEsMTkgemA7XG4vKiogSGFsZiBub3RlIGhlYWQgU1ZHIHBhdGggKi9cbmNvbnN0IGhhbGZIZWFkUGF0aCA9IGBtIDAsMTAgYyAwLC0yNSAzNSwtNjAgODAsLTYwIDE1LDAgNDUsNCA0NSw0MCBDIDEyNSwxNiBcbjg5LDUwIDQ1LDUwIDE3LDUwIDAsMzYgMCwxMCBaIG0gNzEsNyBjIDE3LC0xMSA0NSwtMzQgMzgsLTQ1IC03LC0xMCAtMzksMSBcbi01NywxMiAtMTksMTEgLTQyLDMxIC0zNiw0MiA2LDEwIDM3LDIgNTUsLTkgemA7XG4vKiogUXVhcnRlciBub3RlIGhlYWQgKGFuZCBzaG9ydGVyKSBTVkcgcGF0aCAqL1xuY29uc3QgcXVhcnRlckhlYWRQYXRoID0gYE0gMCwxMCBDIDAsLTE1IDM1LC01MCA4MCwtNTAgMTEwLC01MCAxMjUsLTM1IDEyNSwtMTAgXG4xMjUsMTUgOTAsNTAgNDUsNTAgMTUsNTAgMCwzNSAwLDEwIFpgO1xuXG4vKiogU2hhcnAgYWNjaWRlbnRhbCBTVkcgcGF0aCAqL1xuY29uc3Qgc2hhcnBQYXRoID0gYG0gLTQ5LC0xMjEgdiA1MiBsIC0yOSw5IHYgLTQ4IGggLTggdiA1MSBsIC0yMCw2IHYgMjkgbCBcbjIwLC02IHYgNzAgbCAtMjAsNiB2IDMwIGwgMjAsLTYgdiA1MSBoIDggViA2OSBsIDMwLC04IHYgNTAgaCA4IFYgNTggbCAyMCwtNiBcblYgMjMgbCAtMjAsNiB2IC03MSBsIDIwLC02IHYgLTI5IGwgLTIwLDYgdiAtNTAgeiBtIDEsODIgdiA3MSBsIC0yOSw5IHYgLTcxIHpgO1xuLyoqIEZsYXQgYWNjaWRlbnRhbCBTVkcgcGF0aCAqL1xuY29uc3QgZmxhdFBhdGggPSBgTSAtMTA2LC0xNjYgViA2NyBjIDUyLC00MiA4NSwtNTYgODUsLTk0IDAsLTQ3IC00NiwtNTEgXG4tNzMsLTIyIHYgLTExNyB6IG0gMzEsMTIwIGMgMjAsMCA0Miw0NiAtMjAsOTEgViAtNyBjIDAsLTI4IDEwLC0zOSAyMCwtMzkgemA7XG4vKiogTk5vcm1hbCBhY2NpZGVudGFsIFNWRyBwYXRoICovXG5jb25zdCBub3JtYWxQYXRoID0gYG0gLTgxLC01OCB2IC00OCBIIC05MiBWIDczIGwgNjAsLTEzIHYgNTAgaCAxMSBWIC03MiBaIG0gXG41MCwyNCB2IDU4IGwgLTUwLDExIHYgLTU4IHpgO1xuXG4vKiogV2hvbGUgbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCB3aG9sZVJlc3RQYXRoID0gJ20gMCwtNTAgaCAxMjUgdiAtNTAgSCAwIFonO1xuLyoqIEhhbGYgbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCBoYWxmUmVzdFBhdGggPSAnTSAwLDAgSCAxMjUgViAtNTAgSCAwIFonO1xuLyoqIFF1YXJ0ZXIgbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCBxdWFydGVyUmVzdFBhdGggPSBgbSAwLC0yNSBjIDM5LC0zOSAzNywtNzUgOCwtMTIwIGwgNiwtNSA2MSwxMDMgQyBcbjQwLC0xMyAzMSw0IDczLDcxIGwgLTUsNSBDIDE0LDUyIDE2LDEyNSA2NywxNDQgbCAtNCw2IEMgLTM3LDEwMiAtMSwyMiA1OSw2MCBaYDtcbi8qKiBFaWd0aCBub3RlIHJlc3QgU1ZHIHBhdGggKi9cbmNvbnN0IGVpZ3RoUmVzdFBhdGggPSBgbSA1MiwtNDcgYyAyNiwtMiA0MiwtMjEgNDgsLTQyIGwgMTIsNCBMIDY0LDgzIDUyLDc5IFxuODgsLTQ5IGMgMCwwIC0xNywyMiAtNTcsMjIgLTE2LDAgLTMxLC0xMyAtMzEsLTI3IDAsLTE4IDEwLC0zMSAyNywtMzEgMTcsMCBcbjMzLDE1IDI1LDM4IHpgO1xuLyoqIFNpeHRlZW50aCBub3RlIHJlc3QgU1ZHIHBhdGggKi9cbmNvbnN0IHNpeHRlZW50aFJlc3RQYXRoID0gYG0gMTI5LC0xOTEgYyAtNiwyMSAtMjIsNDAgLTQ4LDQyIDgsLTIzIC04LC0zOCBcbi0yNSwtMzggLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IDMxLDI3IDQwLDAgNTcsLTIyIDU3LC0yMiBsIC0yMCw2OSBcbmMgLTcsMTggLTIyLDMzIC00NSwzNSA4LC0yMyAtOCwtMzggLTI1LC0zOCAtMTcsMCAtMjcsMTMgLTI3LDMxIDAsMTQgMTUsMjcgXG4zMSwyNyA0MCwwIDU3LC0yMiA1NywtMjIgbCAtMzYsMTI4IDEyLDQgNzcsLTI3MCB6YDtcbi8qKiBUaGlydHktc2Vjb25kdGggbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCB0aGlydHlTZWNvbmRSZXN0UGF0aCA9IGBtIDEyOSwtMTkxIGMgLTYsMjEgLTIyLDQwIC00OCw0MiA4LC0yMyAtOCwtMzggXG4tMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyA0MCwwIDU3LC0yMiA1NywtMjIgbCAtMjAsNjkgXG5jIC03LDE4IC0yMiwzMyAtNDUsMzUgOCwtMjMgLTgsLTM4IC0yNSwtMzggLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IFxuMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIEwgNjgsMjAgQyA2MSwzNyA0Niw1MSAyNCw1MiAzMiwyOSAxNiwxNCAtMSwxNCBjIFxuLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IDMxLDI3IDM4LDAgNTUsLTIwIDU3LC0yMiBsIC0zNiwxMjggMTIsNCBcbjEwNSwtMzY5IHpgO1xuLyoqIFNpeHR5LWZvdXVydGggbm90ZSByZXN0IFNWRyBwYXRoICovXG5jb25zdCBzaXh0eUZvdXJ0aFJlc3RQYXRoID0gYG0gMTU4LC0yOTIgYyAtNiwyMSAtMjIsNDAgLTQ4LDQyIDgsLTIzIC04LC0zOCBcbi0yNSwtMzggLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IDE1LDI3IDMxLDI3IDQwLDAgNTcsLTIyIDU3LC0yMiBsIC0xNyw2MSBcbnYgMCBjIC02LDIxIC0yMiw0MCAtNDgsNDIgOCwtMjMgLTgsLTM4IC0yNSwtMzggLTE3LDAgLTI3LDEzIC0yNywzMSAwLDE0IFxuMTUsMjcgMzEsMjcgNDAsMCA1NywtMjIgNTcsLTIyIGwgLTIwLDY5IGMgLTcsMTggLTIyLDMzIC00NSwzNSA4LC0yMyAtOCwtMzggXG4tMjUsLTM4IC0xNywwIC0yNywxMyAtMjcsMzEgMCwxNCAxNSwyNyAzMSwyNyA0MCwwIDU3LC0yMiA1NywtMjIgTCA2OCwyMCBDIFxuNjEsMzcgNDYsNTEgMjQsNTIgMzIsMjkgMTYsMTQgLTEsMTQgYyAtMTcsMCAtMjcsMTMgLTI3LDMxIDAsMTQgMTUsMjcgMzEsMjcgXG4zOCwwIDU1LC0yMCA1NywtMjIgbCAtMzYsMTI4IDEyLDQgMTM0LC00NjkgemA7XG5cbi8qKiBTdGFmZiBsaW5lIFNWRyBwYXRoICovXG5leHBvcnQgY29uc3Qgc3RhZmZMaW5lUGF0aCA9ICdtIDAsMCBoIDEwMCc7XG4vKiogRXh0cmEgbGluZSAob3ZlciBvciB1bmRlciBzdGFmZikgU1ZHIHBhdGggKi9cbmV4cG9ydCBjb25zdCBleHRyYUxpbmVQYXRoID0gJ20gLTI1LDAgaCAxNzUnO1xuLyoqIEJhciBsaW5lIFNWRyBwYXRoICovXG5leHBvcnQgY29uc3QgYmFyUGF0aCA9ICdtIDAsLTIwMCB2IDQwMCc7XG4vKiogTm90ZSBzdGVtIFNWRyBwYXRoICovXG5leHBvcnQgY29uc3Qgc3RlbVBhdGggPSAnbSAwLDAgdiAxMDAgaCAxNSB2IC0xMDAgeic7XG4vKiogTm90ZSBmbGFnIGZvciBzaW5nbGUgaW5zdGFuY2UgKDEvOHRoIG5vdGVzKSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IHNpbmdsZUZsYWdQYXRoID0gYE0wLDAgaCAxMiBjIDcsMTAwIDE3NSwxNTYgNjIsMzE0IDc5LC0xNzcgLTQ5LFxuLTE5MyAtNjEsLTIwMCBsIC0xMywtNSB6YDtcbi8qKiBOb3RlIGZsYWcgZm9yIG11bHRpcGxlIGluc3RhbmNlICgxLzE2dGggbm90ZXMgYW5kIHNob3J0ZXIpIFNWRyBwYXRoICovXG5leHBvcnQgY29uc3QgbXVsdGlGbGFnUGF0aCA9IGBtIDAsMCBoIDEwIGMgNiw3MiAxNzMsNjQgODQsMjI3IDQ0LC0xMjAgLTQ0LFxuLTEyMyAtOTQsLTE2NyB6YDtcbi8qKiBOb3RlIHRpZSBTVkcgcGF0aCAqL1xuZXhwb3J0IGNvbnN0IHRpZVBhdGggPSBgTSAwLDI1IEMgMTAsNDYgMzAsNjcgNTAsNjcgNjksNjcgOTAsNDcgMTAwLDI1IDk0LFxuNjUgNzMsODkgNTAsODkgMjYsODkgNSw2MyAwLDI1IFpgO1xuLyoqIE5vdGUgZG90IFNWRyBwYXRoICovXG5leHBvcnQgY29uc3QgZG90UGF0aCA9ICdNIDUgLTIwIGEgMjAgMjAgMCAxIDAgMC4wMDAwMSAwIHonO1xuXG4vKipcbiAqIEEgc3RydWN0dXJlIHRvIGhvbGQgYWxsIGRldGFpbHMgdG8gY29tcG9zZSBhIG5vdGUgY29tYmluaW5nIFNWRyBwYXRoIFxuICogZGV0YWlscyBhbmQgdGhlaXIgY3VhbnRpdGllcyAocG9zaXRpb24sIG51bWJlciBvZiBmbGFncy4uLilcbiAqL1xuaW50ZXJmYWNlIE5vdGVQYXRoRGV0YWlscyB7XG4gIC8qKiBOb3RlIGhlYWQgU1ZHIHBhdGggKi9cbiAgcGF0aDogc3RyaW5nO1xuICAvKiogTm90ZSBoZWFkIHdpZHRoIHNjYWxlIChvdmVyIGBQQVRIX1NDQUxFYCBwcm9wb3J0aW9ucykgKi8gXG4gIHdpZHRoOiBudW1iZXI7XG4gIC8qKiBOb3RlIHN0ZW0gbGVuZ2h0IG1lYXN1cmVkIGluIHZlcnRpY2FsIHN0YWZmIHN0ZXBzICgyIHBlciBzdGFmZiBsaW5lKSAqL1xuICBzdGVtVlN0ZXBzOiBudW1iZXI7XG4gIC8qKiBWZXJ0aWNhbCBwb3NpdGlvbiBvZiBub3RlIHN0ZW0gc3RhcnQgKG92ZXIgYFBBVEhfU0NBTEVgIHByb3BvcnRpb25zKSAqL1xuICBzdGVtQW5jaG9yOiBudW1iZXI7XG4gIC8qKiBOdW1iZXIgb2Ygbm90ZSBmbGFncyAqL1xuICBmbGFnczogbnVtYmVyO1xufVxuXG4vKiogTm90ZSBwYXRoIGRldGFpbHMgaW5kZXhlZCBieSBudW1iZXIgb2Ygbm90ZSBxdWFydGVycyAqL1xuZXhwb3J0IGNvbnN0IE5PVEVfUEFUSFM6IHtbaW5kZXg6IG51bWJlcl06IE5vdGVQYXRoRGV0YWlsc30gPSB7XG4gIDQ6IHtcbiAgICBwYXRoOiB3aG9sZUhlYWRQYXRoLCB3aWR0aDogMTUwLCBzdGVtVlN0ZXBzOiAwLCBzdGVtQW5jaG9yOiAwLCBcbiAgICBmbGFnczogMFxuICB9LFxuICAyOiB7XG4gICAgcGF0aDogaGFsZkhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiA3LCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiAwXG4gIH0sXG4gIDE6IHtcbiAgICBwYXRoOiBxdWFydGVySGVhZFBhdGgsIHdpZHRoOiAxMjUsIHN0ZW1WU3RlcHM6IDcsIHN0ZW1BbmNob3I6IC0xMCwgXG4gICAgZmxhZ3M6IDBcbiAgfSxcbiAgMC41OiB7XG4gICAgcGF0aDogcXVhcnRlckhlYWRQYXRoLCB3aWR0aDogMTI1LCBzdGVtVlN0ZXBzOiA3LCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiAxXG4gIH0sXG4gIDAuMjU6IHtcbiAgICBwYXRoOiBxdWFydGVySGVhZFBhdGgsIHdpZHRoOiAxMjUsIHN0ZW1WU3RlcHM6IDksIHN0ZW1BbmNob3I6IC0xMCwgXG4gICAgZmxhZ3M6IDJcbiAgfSxcbiAgMC4xMjU6IHtcbiAgICBwYXRoOiBxdWFydGVySGVhZFBhdGgsIHdpZHRoOiAxMjUsIHN0ZW1WU3RlcHM6IDExLCBzdGVtQW5jaG9yOiAtMTAsIFxuICAgIGZsYWdzOiAzXG4gIH0sXG4gIDAuMDYyNToge1xuICAgIHBhdGg6IHF1YXJ0ZXJIZWFkUGF0aCwgd2lkdGg6IDEyNSwgc3RlbVZTdGVwczogMTMsIHN0ZW1BbmNob3I6IC0xMCwgXG4gICAgZmxhZ3M6IDRcbiAgfVxufTtcblxuLyoqIE5vdGUgcmVzdCBwYXRocyBpbmRleGVkIGJ5IG51bWJlciBvZiBub3RlIHF1YXJ0ZXJzICovXG5leHBvcnQgY29uc3QgUkVTVF9QQVRIUzoge1tpbmRleDogbnVtYmVyXTogc3RyaW5nfSA9IHtcbiAgNDogd2hvbGVSZXN0UGF0aCxcbiAgMjogaGFsZlJlc3RQYXRoLFxuICAxOiBxdWFydGVyUmVzdFBhdGgsXG4gIDAuNTogZWlndGhSZXN0UGF0aCxcbiAgMC4yNTogc2l4dGVlbnRoUmVzdFBhdGgsXG4gIDAuMTI1OiB0aGlydHlTZWNvbmRSZXN0UGF0aCxcbiAgMC4wNjI1OiBzaXh0eUZvdXJ0aFJlc3RQYXRoXG59O1xuXG4vKiogQ2xlZiBwYXRocyBpbmRleGVkIGJ5IGVxdWl2YWxlbnQgTUlESSBub3RlIChzdGFmZiB2ZXJ0aWNhbCBwb3NpdGlvbikgKi9cbmV4cG9ydCBjb25zdCBDTEVGX1BBVEhTOiB7W2luZGV4OiBudW1iZXJdOiBzdHJpbmd9ID0ge1xuICA1MDogZkNsZWZQYXRoLFxuICA3MTogZ0NsZWZQYXRoXG59O1xuXG4vKiogQWNjaWRlbnRhbCBwYXRocyBpbmRleGVkIGJ5IG51bWVyaWMgaWRlbnRpZmllciAqL1xuZXhwb3J0IGNvbnN0IEFDQ0lERU5UQUxfUEFUSFMgPSBbbnVsbCwgc2hhcnBQYXRoLCBmbGF0UGF0aCwgbm9ybWFsUGF0aF07IiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgUGFzY3VhbCBkZSBKdWFuLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbiAvKiogU1ZHIE5hbWVTcGFjZSBzdHJpbmcgKi9cbmV4cG9ydCBjb25zdCBTVkdOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbi8qKlxuICogRHJhd3MgYSBTVkcgcGF0aCBvbiBhIFNWRyBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtIGUgVGhlIFNWRyBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtIHBhdGggVGhlIFNWRyBwYXRoXG4gKiBAcGFyYW0geCBIb3Jpem9udGFsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGNvbnRhaW5lciBvcmlnaW5cbiAqIEBwYXJhbSB5IFZlcnRpY2FsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGNvbnRhaW5lciBvcmlnaW5cbiAqIEBwYXJhbSBzY2FsZVggSG9yaXpvbnRhbCBzY2FsZSBpbiBhIGZhY3RvciBvdmVyIDEuMFxuICogQHBhcmFtIHNjYWxlWSBWZXJ0aWNhbCBzY2FsZSBpbiBhIGZhY3RvciBvdmVyIDEuMFxuICogQHBhcmFtIG9wYWNpdHkgT3BhY2l0eSAod2hlcmUgMCBpcyB0cmFuc3BhcmVudCBhbmQgMSBpcyBmdWxseSBvcGFxdWUpXG4gKiBAcmV0dXJucyBUaGUgZHJhd24gU1ZHIHBhdGggZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1NWR1BhdGgoXG4gIGU6IFNWR0VsZW1lbnQsIHBhdGg6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIFxuICBzY2FsZVg6IG51bWJlciwgc2NhbGVZOiBudW1iZXIsIG9wYWNpdHkgPSAxXG4pOiBTVkdFbGVtZW50IHtcbiAgY29uc3QgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICdwYXRoJyk7XG4gIGNoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgcGF0aCk7XG4gIGNoaWxkLnNldEF0dHJpYnV0ZU5TKFxuICAgIG51bGwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7eH0sICR7eX0pIHNjYWxlKCR7c2NhbGVYfSwgJHtzY2FsZVl9KWBcbiAgKTtcbiAgY2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ29wYWNpdHknLCBgJHtvcGFjaXR5fWApO1xuICBlLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAqIERyYXdzIGEgU1ZHIHRleHQgb24gYSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSBlIFRoZSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IHRvIGJlIGRyYXduXG4gKiBAcGFyYW0geCBIb3Jpem9udGFsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGNvbnRhaW5lciBvcmlnaW5cbiAqIEBwYXJhbSB5IFZlcnRpY2FsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGNvbnRhaW5lciBvcmlnaW5cbiAqIEBwYXJhbSBmb250U2l6ZSBUaGUgZm9udCBzaXplXG4gKiBAcGFyYW0gaXNCb2xkIFdldGhlciB0aGUgdGV4dCBzaG91bGQgYmUgYm9sZCBvciBub3RcbiAqIEBwYXJhbSBzY2FsZVggSG9yaXpvbnRhbCBzY2FsZSBpbiBhIGZhY3RvciBvdmVyIDEuMFxuICogQHBhcmFtIHNjYWxlWSBWZXJ0aWNhbCBzY2FsZSBpbiBhIGZhY3RvciBvdmVyIDEuMFxuICogQHJldHVybnMgVGhlIGRyYXduIFNWRyB0ZXh0IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdTVkdUZXh0KFxuICBlOiBTVkdFbGVtZW50LCB0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBcbiAgZm9udFNpemU6IHN0cmluZywgaXNCb2xkPWZhbHNlLCBzY2FsZVggPSAxLCBzY2FsZVkgPSAxXG4pOiBTVkdFbGVtZW50IHtcbiAgY29uc3QgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHTlMsICd0ZXh0Jyk7XG4gIGNoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmb250LWZhbWlseScsICdUaW1lcycpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZm9udC1zaXplJywgZm9udFNpemUpO1xuICBpZiAoaXNCb2xkKSB7Y2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZvbnQtd2VpZ2h0JywgJ2JvbGQnKTt9XG4gIGNoaWxkLnNldEF0dHJpYnV0ZU5TKFxuICAgIG51bGwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7eH0sICR7eX0pIHNjYWxlKCR7c2NhbGVYfSwgJHtzY2FsZVl9KWBcbiAgKTtcbiAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgY2hpbGQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICBlLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBTVkcgZ3JvdXAgb24gYSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSBlIFRoZSBTVkcgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSBpZCBUaGUgc3RyaW5nIHRvIGlkZW50aWZ5IGl0IHdoZW4gc2VhcmNoZWQgZm9yXG4gKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBTVkcgZ3JvdXAgZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHR3JvdXBDaGlsZChlOiBTVkdFbGVtZW50LCBpZDogc3RyaW5nKTogU1ZHRWxlbWVudCB7XG4gIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR05TLCAnZycpO1xuICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpZCk7XG4gIGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICByZXR1cm4gY2hpbGQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZhZGluZyBhbmltYXRpb24gdG8gcGxheSBvbiBhIFNWRyBlbGVtZW50XG4gKiBAcGFyYW0gZSBUaGUgZWxlbWVudCB0byBiZSBhbmltYXRlZFxuICogQHBhcmFtIGJvdW5jZSBXZXRoZXIgdGhlIGFuaW1hdGlvbiBzaG91bGQgcmVwZWF0IGJhY2t3YXJkcyBhbmQgZm9yd2FyZFxuICogQHBhcmFtIGZyb20gSW5pdGlhbCBvcGFjaXR5ICgxIGlzIGZ1bGx5IG9wYXF1ZSlcbiAqIEBwYXJhbSB0byBGaW5hbCBvcGFjaXR5ICgwIGlzIHRyYW5zcGFyZW50KVxuICogQHJldHVybnMgVGhlIHJlY2VpdmVkIFNWRyBlbGVtZW50IHRvIGJlIGFuaW1hdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGYWRlKFxuICBlOiBTVkdFbGVtZW50LCBib3VuY2UgPSBmYWxzZSwgZnJvbSA9IDEsIHRvID0gMFxuKTogU1ZHRWxlbWVudCB7XG4gIGxldCBhbmltYXRpb24gPSBlLnF1ZXJ5U2VsZWN0b3IoYGFuaW1hdGVgKTtcbiAgaWYgKCFhbmltYXRpb24pe1xuICAgIGFuaW1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdOUywgJ2FuaW1hdGUnKTtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2F0dHJpYnV0ZU5hbWUnLCAnb3BhY2l0eScpO1xuICAgIGFuaW1hdGlvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHVyJywgJzRzJyk7XG4gICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJ2ZyZWV6ZScpO1xuICAgIGFuaW1hdGlvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAna2V5VGltZXMnLCAnMDsgMC4yNTsgMC41OyAwLjc1OyAxJyk7XG4gICAgY29uc3QgZWFzeUluID0gKGZyb20gKyAzICogdG8pIC8gNDtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMoXG4gICAgICBudWxsLCAndmFsdWVzJywgYCR7ZnJvbX07ICR7ZWFzeUlufTsgJHt0b307ICR7ZWFzeUlufTsgJHtmcm9tfWBcbiAgICApO1xuICB9XG4gIGlmIChib3VuY2UpIHtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3JlcGVhdENvdW50JywgJ2luZGVmaW5pdGUnKTtcbiAgfVxuICBlbHNlIHtcbiAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3JlcGVhdENvdW50JywgJzEnKTtcbiAgfVxuICBlLmFwcGVuZENoaWxkKGFuaW1hdGlvbik7XG4gIHJldHVybiBlO1xufVxuXG4vKipcbiAqIEZpbGxzIGEgU1ZHIGVsZW1lbnQgd2l0aCBhIGdpdmVuIGNvbG9yXG4gKiBAcGFyYW0gZSBUaGUgU1ZHIGVsZW1lbnQgZm8gYmUgZmlsbGVkXG4gKiBAcGFyYW0gY29sb3IgVGhlIGZpbGwgY29sb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbGwoZTogU1ZHRWxlbWVudCwgY29sb3I6IHN0cmluZykge1xuICBlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgY29sb3IpO1xufVxuXG4vKipcbiAqIENoYW5nZXMgc3Ryb2tlIHdpZHRoIGFuZCBjb2xvdXIgb2YgYSBnaXZlbiBTVkcgZWxlbWVudFxuICogQHBhcmFtIGUgVGhlIFNWRyBlbGVtZW50IHRvIGNoYW5nZSB0aGUgc3Ryb2tlIHRvXG4gKiBAcGFyYW0gc3Ryb2tlV2lkdGggVGhlIHN0cm9rZSB3aWR0aFxuICogQHBhcmFtIGNvbG9yIFRoZSBuZXcgY29sb3VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdHJva2UoZTogU1ZHRWxlbWVudCwgc3Ryb2tlV2lkdGg6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xuICBlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdzdHJva2Utd2lkdGgnLCBgJHtzdHJva2VXaWR0aH1gKTtcbiAgZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnc3Ryb2tlJywgY29sb3IpO1xufVxuXG4vKipcbiAqIENoYW5nZXMgYm90aCBmaWxsIGFuZCBzdHJva2UgY29sb3VycyBvZiBhIFNWRyBlbGVtZW50XG4gKiBAcGFyYW0gZSBUaGUgU1ZHIGVsZW1lbnQgdG8gY2hhbmdlIGNvbG91cnNcbiAqIEBwYXJhbSBjb2xvciBUaGUgbmV3IGNvbG91clxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0RWxlbWVudChlOiBTVkdFbGVtZW50LCBjb2xvcjogc3RyaW5nKSB7XG4gIGUuc2V0QXR0cmlidXRlKCdmaWxsJywgY29sb3IpO1xuICBlLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgY29sb3IpO1xufVxuIiwiLyoqXG4gKiBGdW5jdGlvbmFsIHVuaXQgdGVzdCBzZXQgZm9yIHJpdGhtIHNwbGl0dGluZyBvbiBzdGFmZnJlbmRlciBsaWJyYXJ5LlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBQYXNjdWFsIGRlIEp1YW4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogSW1wb3J0c1xuICovXG5pbXBvcnQgeyBUZXN0RGF0YSB9IGZyb20gJy4vdGVzdF9kYXRhJztcblxuZXhwb3J0IGNvbnN0IHRlc3REYXRhOiBUZXN0RGF0YVtdID0gW107XG5cbnZhciBwb3NpdGlvbiA9IDA7IC8vIFVzZWQgZm9yIGluY3JlbWVudGFsIG5vdGUgc3RhcnRpbmcgcG9pbnRcblxudGVzdERhdGFbMF0gPSB7XG4gIHRpdGxlOiBgTm90ZSBzeW1ib2xzIGFuZCB0aGVpciBkdXJhdGlvbnNgLFxuICBkZXNjcmlwdGlvbjogYE5vdGVzIG9mIGRpZmZlcmVudCBsZW5ndGggc2hvdWxkIGNvbXBsZXRlIGVhY2ggYmFyIGdvaW5nIGZyb20gXFxcbiAgICB3aG9sZSBub3RlIHRocm91Z2ggMS8ydGgsIDEvNHRoLCAxLzh0aCwgMS8xNnRoLCAxLzMydGggYW5kIDEvNjR0aCwgd2hpY2ggXFxcbiAgICBpcyB0aGUgbG93ZXN0IGhhbmRsZWQgcmVzb2x1dGlvbi4gU3RlbXMgb24gZmlyc3QgaGFsZiBiYXIgc2hvdWxkIGJlIFxcXG4gICAgdXB3YXJkcyBhbmQgc2hvdWxkIGJlIGRvd253YXJkcyBvbiBzZWNvbmQgaGFsZi5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtdLFxuICB9XG59O1xucG9zaXRpb24gPSAwO1xuZm9yIChsZXQgbiA9IDE7IG4gPCAxMjg7IG4gKj0gMikge1xuICBjb25zdCBkdXJhdGlvbiA9IDQgLyBuO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgIGNvbnN0IG5vdGVQaXRjaCA9IDY3ICsgKGkgPj0gbiAvIDIgPyA1IDogMCk7XG4gICAgdGVzdERhdGFbMF0uZGF0YS5ub3Rlcy5wdXNoKFxuICAgICAgeyBzdGFydDogcG9zaXRpb24sIGxlbmd0aDogZHVyYXRpb24sIHBpdGNoOiBub3RlUGl0Y2gsIGludGVuc2l0eTogMTI3IH1cbiAgICApO1xuICAgIHBvc2l0aW9uICs9IGR1cmF0aW9uO1xuICB9XG59XG5cbnRlc3REYXRhWzFdID0geyAvLyBOb3QgcmVxdWlyZWQgZm9yIHVuaXRhcnkgdGVzdCBidXQgZm9yIHZpc3VhbCB0ZXN0LlxuICB0aXRsZTogYFN0ZW0gZGlyZWN0aW9uIHRocmVzaG9sZGAsXG4gIGRlc2NyaXB0aW9uOiBgU3RlbSBzaG91bGQgYmUgdXB3YXJkcyB1cCB0byB0aGlyZCBsaW5lIG5vdGVzIChpbmNsdWRlZCkuYCxcbiAgZGF0YToge1xuICAgIG5vdGVzOiBbXG4gICAgICB7IHN0YXJ0OiAwLCBsZW5ndGg6IDEsIHBpdGNoOiA2OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEsIGxlbmd0aDogMSwgcGl0Y2g6IDcxLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMiwgbGVuZ3RoOiAxLCBwaXRjaDogNzIsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLCBsZW5ndGg6IDEsIHBpdGNoOiA3NCwgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG5cbnRlc3REYXRhWzJdID0ge1xuICB0aXRsZTogYFJlc3Qgc3ltYm9scyBhbmQgdGhlaXIgZHVyYXRpb25zYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlcyBvZiBkaWZmZXJlbnQgbGVuZ3RoIHNob3VsZCBiZSBwYWlyZWQgd2l0aCB0aGVpciByZWxhdGl2ZSBcXFxuICAgIHJlc3QuIExhc3Qgbm90ZSBoYXMgYmVlbiBwbGFjZWQgdG8gY29tcGxldGUgdGhlIGJhciBhbmQgbWFrZSBsYXN0IHJlc3QgXFxcbiAgICBub3RpY2VhYmxlLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW10sXG4gIH1cbn07XG5wb3NpdGlvbiA9IDA7XG5mb3IgKGxldCBuID0gMTsgbiA8IDEyODsgbiAqPSAyKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gNCAvIG47XG4gIHRlc3REYXRhWzJdLmRhdGEubm90ZXMucHVzaChcbiAgICB7IHN0YXJ0OiBwb3NpdGlvbiwgbGVuZ3RoOiBkdXJhdGlvbiwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9XG4gICk7XG4gIHBvc2l0aW9uICs9IDIgKiBkdXJhdGlvbjtcbn1cbnRlc3REYXRhWzJdLmRhdGEubm90ZXMucHVzaChcbiAgeyBzdGFydDogcG9zaXRpb24sIGxlbmd0aDogMC4xMjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfVxuKTsgLy8gQ29tcGxldGluZyBiYXJcblxudGVzdERhdGFbM10gPSB7IC8vIE5vdCByZXF1aXJlZCBmb3IgdW5pdGFyeSB0ZXN0IGJ1dCBmb3IgdmlzdWFsIHRlc3QuXG4gIHRpdGxlOiBgRG90dGVkIG5vdGVzYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlIGxlbmd0aCBjYW4gYmUgZXh0ZW5kZWQgdG8gYSAxNTAlIG9mIGl0cyBub21pbmFsIHZhbHVlIFxcXG4gICAgYWRkaW5nIGEgZG90IGFmdGVyIHRoZSBub3RlIHN5bWJvbC4gVGhpcyBhcHBsaWVzIHRvIGFsbCBub3RlIHN5bWJvbHMgYnV0IFxcXG4gICAgaXQgd2lsbCBub3QgYmUgYXBwbGllZCB0byByZXN0cyBzeW1ib2xzLCBiZXNpZGVzIGl0IGlzIG5vdCBmb3JiaWRkZW4gdW5kZXIgXFxcbiAgICBzb21lIGNpcmN1bXN0YW5jZXMsIGZvbGxvd2luZyB0aGUgY2xhc3NpY2FsIG11c2ljIHRyYW5zY3JpcHRpb24gY2hyaXRlcmlhIFxcXG4gICAgZGlzcmVjb21tZW5kaW5nIHRoZSB1c2Ugb2YgZG90dGVkIHJlc3RzIGluIG9yZGVyIHRvIGVhc2UgdGhlIHJlYWRhYmlsaXR5LiBcXFxuICAgIExhc3Qgbm90ZSBpcyBpbmNsdWRlZCB0byBtYWtlIGxhc3QgcmVzdHMgbm90aWNlYWJsZS5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMywgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMy43NSwgbGVuZ3RoOiAwLjI1LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuXG50ZXN0RGF0YVs0XSA9IHsgLy8gTm90IHJlcXVpcmVkIGZvciB1bml0YXJ5IHRlc3QgYnV0IGZvciB2aXN1YWwgdGVzdC5cbiAgdGl0bGU6IGBUcmVibGUgQ2xlZiAoRy1DbGVmKWAsXG4gIGRlc2NyaXB0aW9uOiBgTGVmdG1vc3Qgc3ltYm9sIChzcGlyYWwtbGlrZSkgbWFrZXMgZml2ZSBsaW5lcyBwZW50YWdyYW0gdG8gXFxcbiAgICBjb3ZlciBwaXRjaGVzIGZyb20gRDMgdG8gRzQgdG91Y2hpbmcgZXh0cmVtZSBsaW5lcy4gSGlnaGVyIGFuZCBsb3dlciBcXFxuICAgIHBpdGNoZXMgYXJlIHJlcHJlc2VudGVkIHVzaW5nIGV4dHJhIGxpbmVzLiBDMyBpcyBjb25zaWRlcmVkIFwiRy1DbGVmIGxvd2VyIFxcXG4gICAgYm91bmRcIiwgZXZlbiB0aG91Z2ggbG93ZXIgbm90ZXMgY2FuIGJlIHJlcHJlc2VudGVkLiBUaGVyZSdzIG5vIFwidXBwZXIgXFxcbiAgICBib3VuZFwiIGFuZCBoaWdoZXIgbm90ZXMgZnJvbSBBNCBjYW4gYmUgcmVwcmVzZW50ZWQuIE9uY2Ugc2V0dGVkIGluIGEgc3RhZmYgXFxcbiAgICBpdCBjYW5ub3QgYmUgcmVwbGFjZWQgYnkgYW5vdGhlciBDbGVmLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAxLCBwaXRjaDogNjIsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLCBsZW5ndGg6IDEsIHBpdGNoOiA2NCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDIsIGxlbmd0aDogMSwgcGl0Y2g6IDY1LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMywgbGVuZ3RoOiAxLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA0LCBsZW5ndGg6IDEsIHBpdGNoOiA2OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDUsIGxlbmd0aDogMSwgcGl0Y2g6IDcxLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNiwgbGVuZ3RoOiAxLCBwaXRjaDogNzIsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA3LCBsZW5ndGg6IDEsIHBpdGNoOiA3NCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDgsIGxlbmd0aDogMSwgcGl0Y2g6IDc2LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogOSwgbGVuZ3RoOiAxLCBwaXRjaDogNzcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMCwgbGVuZ3RoOiAxLCBwaXRjaDogNzksIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMSwgbGVuZ3RoOiAxLCBwaXRjaDogNjAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMiwgbGVuZ3RoOiAxLCBwaXRjaDogNTksIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMywgbGVuZ3RoOiAxLCBwaXRjaDogNTcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNCwgbGVuZ3RoOiAxLCBwaXRjaDogNTUsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNSwgbGVuZ3RoOiAxLCBwaXRjaDogODEsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNiwgbGVuZ3RoOiAxLCBwaXRjaDogODMsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNywgbGVuZ3RoOiAxLCBwaXRjaDogODQsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxOCwgbGVuZ3RoOiAxLCBwaXRjaDogODYsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuXG50ZXN0RGF0YVs1XSA9IHsgLy8gTm90IHJlcXVpcmVkIGZvciB1bml0YXJ5IHRlc3QgYnV0IGZvciB2aXN1YWwgdGVzdC5cbiAgdGl0bGU6IGBCYXNzIENsZWYgKEYtQ2xlZilgLFxuICBkZXNjcmlwdGlvbjogYExlZnRtb3N0IHN5bWJvbCAodGhlIGN1cnZlZCBvbmUgYWxvbmdzaWRld2l0aCBjb2xvbikgbWFrZXMgXFxcbiAgICBmaXZlIGxpbmVzIHBlbnRhZ3JhbSB0byBjb3ZlciBwaXRjaGVzIGZyb20gRjEgdG8gQjIgdG91Y2hpbmcgZXh0cmVtZSBcXFxuICAgIGxpbmVzLiBIaWdoZXIgYW5kIGxvd2VyIHBpdGNoZXMgYXJlIHJlcHJlc2VudGVkIHVzaW5nIGV4dHJhIGxpbmVzLiBDMyBpcyBcXFxuICAgIGNvbnNpZGVyZWQgXCJGLUNsZWYgdXBwZXIgYm91bmRcIiwgZXZlbiB0aG91Z2ggaGlnaGVyIG5vdGVzIGNhbiBiZSBcXFxuICAgIHJlcHJlc2VudGVkLiBUaGVyZSdzIG5vIFwibG93ZXIgYm91bmRcIiBhbmQgbG93ZXIgbm90ZXMgZnJvbSBFMSBjYW4gYmUgXFxcbiAgICByZXByZXNlbnRlZC4gT25jZSBzZXR0ZWQgaW4gYSBzdGFmZiBpdCBjYW5ub3QgYmUgcmVwbGFjZWQgYnkgYW5vdGhlciBDbGVmLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAxLCBwaXRjaDogNTksIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLCBsZW5ndGg6IDEsIHBpdGNoOiA1NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDIsIGxlbmd0aDogMSwgcGl0Y2g6IDU1LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMywgbGVuZ3RoOiAxLCBwaXRjaDogNTMsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA0LCBsZW5ndGg6IDEsIHBpdGNoOiA1MiwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDUsIGxlbmd0aDogMSwgcGl0Y2g6IDUwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNiwgbGVuZ3RoOiAxLCBwaXRjaDogNDgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA3LCBsZW5ndGg6IDEsIHBpdGNoOiA0NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDgsIGxlbmd0aDogMSwgcGl0Y2g6IDQ1LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogOSwgbGVuZ3RoOiAxLCBwaXRjaDogNDMsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMCwgbGVuZ3RoOiAxLCBwaXRjaDogNDEsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMSwgbGVuZ3RoOiAxLCBwaXRjaDogNjAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMiwgbGVuZ3RoOiAxLCBwaXRjaDogNjIsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxMywgbGVuZ3RoOiAxLCBwaXRjaDogNjQsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNCwgbGVuZ3RoOiAxLCBwaXRjaDogNjUsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNSwgbGVuZ3RoOiAxLCBwaXRjaDogNDAsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNiwgbGVuZ3RoOiAxLCBwaXRjaDogMzgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxNywgbGVuZ3RoOiAxLCBwaXRjaDogMzYsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxOCwgbGVuZ3RoOiAxLCBwaXRjaDogMzUsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuXG50ZXN0RGF0YVs2XSA9IHtcbiAgdGl0bGU6IGBTaGFycCBBY2NpZGVudGFsc2AsXG4gIGRlc2NyaXB0aW9uOiBgTm90ZXMgY2FuIG1vZGlmeSB0aGVpciBwaXRjaCBvbmUgc2VtaXRvbmUgdXAgdXNpbmcgQWNjaWRlbnRhbCBcXFxuICAgIHN5bWJvbCAnIycgKGNhbGxlZCBzaGFycCkgYmVmb3JlIGEgbm90ZSBzeW1ib2wuIE9uY2UgbW9kaWZpZWQgKGxldCdzIHNheSBcXFxuICAgIEczKSwgYWxsIG5vdGVzIGluIHNhbWUgc3RhZmYgcG9zaXRpb24gYXJlIG1vZGlmaWVkIGFzIHdlbGwgdW50aWwgdGhlIGVuZCBcXFxuICAgIG9mIGN1cnJlbnQgYmFyLiBTZXR0aW5nIGFuIEFjY2lkZW50YWwgYXQgdGhlIGJlZ2lubmluZyBvZiBhIGJhciBpbnN0ZWFkIHRvIFxcXG4gICAgYSBzaW5nbGUgbm90ZSBtYWtlcyBpdCBhcHBseSBhbGwgbm90ZXMgb2Ygc2FtZSBuYW1lIChpLmUuIEczIGFuZCBHNCkgdG8gXFxcbiAgICB0aGlzIGFuZCBmb2xsb3dpbmcgYmFycy4gVGhpcyBpcyBjYWxsZWQgS2V5IFNpZ25hdHVyZSBhbmQgcmVzZXRzIHByZXZpb3VzIFxcXG4gICAgS2V5IFNpZ25hdHVyZXMsIGlmIGFueS4gVGhlcmUgaXMgYSBOb3JtYWwgU3ltYm9sIHRvIGFudWxlIGFjdGl2ZSBcXFxuICAgIG5vdGUgQWNjaWRlbnRhbCBvZiBmb2xsb3dpbmcgbm90ZXMgdW50aWwgdGhlIGVuZCBvZiBiYXIsIHdoZXJlIHRoZXJlIHdvdWxkIFxcXG4gICAgYmUgYSBLZXkgU2lnbmF0dXJlIHJlLWFjdGl2YXRpb24uIERvdWJsZSBzaGFycCBhbmQgc2ltaWxhciBBY2NpZGVudGFscyBhcmUgXFxcbiAgICBub3QgY292ZXJlZCBhbmQgd2lsbCBiZSByZXByZXNlbnRlZCBhcyBuZXh0IG5vdGUgaWYgYXBwbGljYWJsZS4gRm9sbG93aW5nIFxcXG4gICAgc2NvcmUgc2hvd3MgYSBLZXkgU2lnbmF0dXJlIGFuZCBzb21lIG5vdGVzLCBpbiBvcmRlciwgdW5hbHRlcmVkLCBzaGFycCwgXFxcbiAgICBzaGFycCAobm8gbmVlZCBmb3IgQWNjaWRlbnRhbCBzeW1ib2wpLCBzaGFycCAoaW4gb3RoZXIgc2NhbGUsIG5lZWRpbmcgZm9yIFxcXG4gICAgc2hhcnAgc3ltYm9sIGFnYWluKSwgbm9ybWFsIChiYWNrIHRvIHVuYWx0ZXJlZCksIHNoYXJwIChpbiBpdGhlciBzY2FsZSBcXFxuICAgIGFnYWluIHdpdGggbm8gbmVlZCBmb3IgQWNjaWRlbnRhbCksIHVuYWx0ZXJlZCwgc2hhcnAgYWdhaW4sIGVuZCBvZiBiYXIgXFxcbiAgICB3aXRoIEFjY2lkZW50YWxzIHJlc2V0IChleGNlcHQgdGhlIG9uZXMgZnJvbSBrZXkgc2lnbmF0dXJlKSwgc2hhcnAgYW5kLCBcXFxuICAgIGZpbmFsbHksIHNoYXJwIChhcHBseWluZyBrZXkgc2lnbmF0dXJlIHRvIHNhbWUgbmFtZSBub3RlIGluIG90aGVyIHNjYWxlKS5gLFxuICBkYXRhOiB7XG4gICAga2V5U2lnbmF0dXJlczogWyB7IHN0YXJ0OiAwLCBrZXk6IDcgfSBdLFxuICAgIG5vdGVzOiBbXG4gICAgICB7IHN0YXJ0OiAwLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMC41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMS4wLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMS41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDgwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMi4wLCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMi41LCBsZW5ndGg6IDAuNSwgcGl0Y2g6IDgwLCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogMywgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDQsIGxlbmd0aDogMiwgcGl0Y2g6IDY4LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNiwgbGVuZ3RoOiAyLCBwaXRjaDogNjYsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuXG50ZXN0RGF0YVs3XSA9IHtcbiAgdGl0bGU6IGBGbGF0IEFjY2lkZW50YWxzYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlcyBjYW4gbW9kaWZ5IHRoZWlyIHBpdGNoIG9uZSBzZW1pdG9uZSBkb3duIHVzaW5nIFxcXG4gICAgQWNjaWRlbnRhbCBzeW1ib2wgJ2InIChjYWxsZWQgZmxhdCkgYmVmb3JlIGEgbm90ZSBzeW1ib2wuIFNhbWUgcnVsZXMgYXBwbHkgXFxcbiAgICBhcyBpbiBTaGFycCBBY2NpZGVudGFscyBzY2VuYXJpby4gRG91YmxlIGZsYXQgaXMgbm90IGNvdmVyZWQgZWl0aGVyLiBcXFxuICAgIFNpbWlsYXIgcGF0dGVybiBoYXMgYmVlbiB1c2VkIG9uIHNjb3JlYCxcbiAgZGF0YToge1xuICAgIGtleVNpZ25hdHVyZXM6IFsgeyBzdGFydDogMCwga2V5OiA1IH0gXSxcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDAuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEuMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDEuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA4MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDIuMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2OSwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDIuNSwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA4MCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogMC41LCBwaXRjaDogNjksIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAzLjUsIGxlbmd0aDogMC41LCBwaXRjaDogNjgsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA0LCBsZW5ndGg6IDIsIHBpdGNoOiA2OCwgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDYsIGxlbmd0aDogMiwgcGl0Y2g6IDU4LCBpbnRlbnNpdHk6IDEyNyB9XG4gICAgXSxcbiAgfVxufTtcblxudGVzdERhdGFbOF0gPSB7XG4gIHRpdGxlOiBgS2V5IFNpZ25hdHVyZXMgb24gY2hyb21hdGljIHNjYWxlc2AsXG4gIGRlc2NyaXB0aW9uOiBgVGhlcmUgaXMgYSBjbG9zZSBzZXQgb2YgMTIgS2V5IFNpZ25hdHVyZXMuIEhhbGYgb2YgdGhlbSB1c2UgXFxcbiAgICBzaGFycHMgKGZyb20gMCB0byA1IHNoYXJwczogQywgRywgRCwgQSwgRSBhbmQgQiBrZXlzLCB0aGUgcmlnaHQgc2lkZSBvZiBcXFxuICAgIHRoZSBDaXJjbGUgb2YgRmlmdGhzKSBhbmQgdGhlIHJlc3QgdXNlIGZsYXRzIChmcm9tIDEgdG8gNiBmbGF0czogRiwgQmIsIFxcXG4gICAgRWIsIEFiLCBEYiBhbmQgR2Iga2V5cykuIEZvbGxvd2luZyBzY29yZSB3aWxsIHNob3cgYSBjaHJvbWF0aWMgc2NhbGUgb24gXFxcbiAgICBlYWNoIGtleSBpbiB0aGF0IHByZWNpc2Ugb3JkZXIuIE92ZXJsYXBwaW5nIGtleXMgd2l0aCBkaWZmZXJlbnQgbmFtZXMgKEdiIFxcXG4gICAgPSBGIykgaGF2ZSBiZWVuIHJlbW92ZWQgZm9yIHNpbXBsaWNpdHkgc2FrZS4gQWNjaWRlbnRhbHMgd2lsbCBiZSBvZiBhIFxcXG4gICAgdW5pcXVlIGtpbmQgYWxvbmcgYSBnaXZlbiBrZXksIHNvIHRlcmUgd29uJ3QgYXBwZWFyIGEgbWl4IHNoYXJwcyBhbmQgXFxcbiAgICBmbGF0cyAoZXZlbiB0aG91Z2ggaXQncyBhbGxvd2VkIGluIG11c2ljYWwgaGFuZHdyaXRpbmcpLmAsXG4gIGRhdGE6IHtcbiAgICBrZXlTaWduYXR1cmVzOiBbIFxuICAgICAgeyBzdGFydDogICAwLCBrZXk6ICAwIH0sXG4gICAgICB7IHN0YXJ0OiAgMTIsIGtleTogIDcgfSxcbiAgICAgIHsgc3RhcnQ6ICAyNCwga2V5OiAgMiB9LFxuICAgICAgeyBzdGFydDogIDM2LCBrZXk6ICA5IH0sXG4gICAgICB7IHN0YXJ0OiAgNDgsIGtleTogIDQgfSxcbiAgICAgIHsgc3RhcnQ6ICA2MCwga2V5OiAxMSB9LFxuICAgICAgeyBzdGFydDogIDcyLCBrZXk6ICA1IH0sXG4gICAgICB7IHN0YXJ0OiAgODQsIGtleTogMTAgfSxcbiAgICAgIHsgc3RhcnQ6ICA5Niwga2V5OiAgMyB9LFxuICAgICAgeyBzdGFydDogMTA4LCBrZXk6ICA4IH0sXG4gICAgICB7IHN0YXJ0OiAxMjAsIGtleTogIDEgfSxcbiAgICAgIHsgc3RhcnQ6IDEzMiwga2V5OiAgNiB9XG4gICAgXSxcbiAgICBub3RlczogW10sXG4gIH1cbn07XG5wb3NpdGlvbiA9IDA7XG5mb3IgKGxldCBuID0gMDsgbiA8IDEyOyArK24pIHtcbiAgZm9yIChsZXQgcCA9IDYwOyBwIDwgNzI7ICsrcCkge1xuICAgIHRlc3REYXRhWzhdLmRhdGEubm90ZXMucHVzaChcbiAgICAgIHsgc3RhcnQ6IHBvc2l0aW9uKyssIGxlbmd0aDogMSwgcGl0Y2g6IHAsIGludGVuc2l0eTogMTI3IH1cbiAgICApO1xuICB9XG59XG5cbnRlc3REYXRhWzldID0ge1xuICB0aXRsZTogYFRpbWUgU2lnbmF0dXJlc2AsXG4gIGRlc2NyaXB0aW9uOiBgTm90ZXMgY2FuIGJlIGdyb3B1ZWQgb24gYmFycyBhY2NvcmRpbmcgdG8gXCJwdWxzZVwiIHJpdGhtIFxcXG4gICAgcGF0dGVybnMsIGRlZmluZWQgYnkgVGltZSBTaWduYXR1cmVzIGNvbnNpc3Rpbmcgb24gYSBudW1lcmF0b3IgYW5kIGEgXFxcbiAgICBkZW5vbWluYXRvciBudW1iZXIuIERlbm9taW5hdG9yIGRlZmluZXMgdGhlIGxlbmd0aCBvZiBpdHMgcHVsc2UgYXMgdGhlIFxcXG4gICAgZnJhY3Rpb24gb2YgYSB3aG9sZSBub3RlLCBhbmQgbnVtZXJhdG9yIGRlZmluZXMgdGhlIG51bWJlciBvZiBwdWxzZXMgXFxcbiAgICBuZWVkZWQgdG8gY29tcGxldGUgYSBiYXIuIEEgVGltZSBTaWduYXR1cmUgc2hvd24gYXQgdGhlIGJlZ2lubmluZyBvZiBhIFxcXG4gICAgYmFyIGNoYW5nZXMgcml0aG0gdG8gdGhhdCBiYXIgYW5kIGZvbGxvd2luZ3MuIE5leHQgc2NvcmUgc2hvd3Mgc2V2ZXJhbCBcXFxuICAgIFRpbWUgU2lnbmF0dXJlcy5gLFxuICBkYXRhOiB7XG4gICAgdGltZVNpZ25hdHVyZXM6IFtdLFxuICAgIG5vdGVzOiBbXSxcbiAgfVxufTtcbnBvc2l0aW9uID0gMDtcbmZvciAobGV0IGQgPSAyOyBkIDw9IDg7IGQgKj0gMikge1xuICBjb25zdCBsID0gNCAvIGQ7XG4gIGNvbnN0IGRhdGEgPSB0ZXN0RGF0YVs5XS5kYXRhO1xuICBmb3IgKGxldCBuID0gMjsgbiA8PSAxMjsgKytuKSB7XG4gICAgZGF0YS50aW1lU2lnbmF0dXJlcy5wdXNoKFxuICAgICAgeyBzdGFydDogcG9zaXRpb24sIG51bWVyYXRvcjogbiwgZGVub21pbmF0b3I6IGQgfVxuICAgIClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgZGF0YS5ub3Rlcy5wdXNoKFxuICAgICAgICB7IHN0YXJ0OiBwb3NpdGlvbiwgbGVuZ3RoOiBsLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgICAgICk7XG4gICAgICBwb3NpdGlvbiArPSBsO1xuICAgIH1cbiAgfVxufVxuXG50ZXN0RGF0YVsxMF0gPSB7XG4gIHRpdGxlOiBgV2hvbGUgcmVzdHNgLFxuICBkZXNjcmlwdGlvbjogYFdob2xlIHJlc3Qgc3ltYm9sIGlzIHVzZWQgdG8gc3BlY2lmeSBhIHdob2xlIHNpbGVudCBiYXIsIG5vIFxcXG4gICAgbWF0dGVyIHdoaWNoIHRoZSB0aW1lIHNpZ25hdHVyZSBpcy5gLFxuICBkYXRhOiB7XG4gICAgdGltZVNpZ25hdHVyZXM6IFsgXG4gICAgICB7IHN0YXJ0OiAgIDAsIG51bWVyYXRvcjogIDMsIGRlbm9taW5hdG9yOiA0IH0sXG4gICAgICB7IHN0YXJ0OiAgIDYsIG51bWVyYXRvcjogIDYsIGRlbm9taW5hdG9yOiA4IH0sXG4gICAgICB7IHN0YXJ0OiAgMTIsIG51bWVyYXRvcjogIDcsIGRlbm9taW5hdG9yOiAyIH0sXG4gICAgICB7IHN0YXJ0OiAgNDAsIG51bWVyYXRvcjogIDQsIGRlbm9taW5hdG9yOiA0IH1cbiAgICBdLFxuICAgIG5vdGVzOiBbIFxuICAgICAgeyBzdGFydDogIDMsIGxlbmd0aDogIDMsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6ICA5LCBsZW5ndGg6ICAzLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAyNiwgbGVuZ3RoOiAxNCwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNDQsIGxlbmd0aDogIDQsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICBdXG4gIH1cbn07XG5cbnRlc3REYXRhWzExXSA9IHtcbiAgdGl0bGU6IGBUaWVzYCxcbiAgZGVzY3JpcHRpb246IGBOb3RlcyBsb25nZXIgdGhhbiBhdmlsYWJsZSBub3RlIHN5bWJvbHMgbGVuZ3RoIGNhbiBiZSBhY2hpZXZlZCBcXFxuICBjb21iaW5pbmcgdHdvIG9yIG1vcmUgdGhyb3VnaCB0aWVzLiBOb3RlcyB3aGljaCBzdXJwYXNzIGJhcnMgbXVzdCBiZSBcXFxuICBzcGxpdHRlZCB1c2luZyB0aWVzLiBSZXN0IGFnZ3JlZ2F0aW9uIGRvZXMgbm90IG5lZWQgYW55IHRpZS4gRm9sbG93aW5nIFxcXG4gIHNjb3JlIHNob3dzIHRocmVlIHRpZWQgbm90ZXMsIGEgcmVzdHMgc2V0LCB0d28gdGllZCBub3RlcyB0byBzdXJwYXNzIGEgYmFyLmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAyKzEvMisxLzgsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDMsIGxlbmd0aDogMiwgcGl0Y2g6IDY3LCBpbnRlbnNpdHk6IDEyNyB9LFxuICAgICAgeyBzdGFydDogNywgbGVuZ3RoOiAxLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuIiwiLyoqXG4gKiBGdW5jdGlvbmFsIHVuaXQgdGVzdCBzZXQgZm9yIHJpdGhtIHNwbGl0dGluZyBvbiBzdGFmZnJlbmRlciBsaWJyYXJ5LlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBQYXNjdWFsIGRlIEp1YW4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogSW1wb3J0c1xuICovXG5pbXBvcnQgeyBUZXN0RGF0YSB9IGZyb20gJy4vdGVzdF9kYXRhJztcblxuZXhwb3J0IGNvbnN0IHRlc3REYXRhOiBUZXN0RGF0YVtdID0gW107XG5cbnRlc3REYXRhWzBdID0ge1xuICB0aXRsZTogYFVuY29tcGxldGUgcHVsc2UgZnVsZmlsbG1lbnRgLFxuICBkZXNjcmlwdGlvbjogYE5vdGVzIHNob3VsZCBiZSBzcGxpdGVkIGFuZCB0aWVkIHRvIG1ha2UgY2xlYXIgd2hlcmUgZG9lcyBhIFxcXG4gICAgcHVsc2Ugc3RhcnRzIGFuZCBlbmRzLCBlYXNpbmcgdGhlIHJpdGhtIHJlYWRhYmlsaXR5LmAsXG4gIGRhdGE6IHtcbiAgICBub3RlczogW1xuICAgICAgeyBzdGFydDogMCwgbGVuZ3RoOiAwLjUsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDAuNSwgbGVuZ3RoOiAxLCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiAxLjUsIGxlbmd0aDogMi41LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH1cbiAgICBdLFxuICB9XG59O1xuXG50ZXN0RGF0YVsxXSA9IHtcbiAgdGl0bGU6IGBUaWVzIGFuZCByZXN0cyBvcmRlcmluZ2AsXG4gIGRlc2NyaXB0aW9uOiBgVGhlIG9yZGVyIG9mIHRpZWQgbm90ZXMgb3IgcmVzdHMgZ3JvdXBzIHVzZXMgdG8gYmUgZGVjcmVhc2luZyBcXFxuICAgIGxlbmd0aHMgZnJvbSBsb25nZXIgZHVyYXRpb24gc3ltYm9scyB0byBzaG9ydGVyIG9uZXMsIHVubGVzcyBzdWNoIGdyb3VwIG9mIFxcXG4gICAgc3ltYm9scyBjb21wbGV0ZSBhIHB1bHNlIHdpdGhpbiBhIGJhciwgaW4gd2hpY2ggY2FzZSB0aGV5IHdpbGwgYmUgb3JkZXJlZCBcXFxuICAgIGluY3JlYXNpbmcgbGVuZ3RocyBmcm9tIHNob3J0ZXIgdG8gbG9uZ2VyIHN5bWJvbHMgaW4gb3JkZXIgdG8gXFxcbiAgICBzeW1tZXRyaWNhbGx5IGNvbXBsZXRlIHRoZSBzdGFydGluZyBwYXJ0IG9mIHRoZSBwdWxzZS4gRm9sbG93aW5nIHNjb3JlIFxcXG4gICAgc2hvd3MgdGhyZWUgZGVjcmVhc2luZyB0aWVkIG5vdGVzLCBhbiBpbmNyZWFzaW5nIHJlc3RzIHNldCwgZm9sbG93ZWQgYnkgYSBcXFxuICAgIGRlY3JlYXNpbmcgcmVzdCBzZXQgYW5kIHR3byBhc2NlbmRpbmcgdGllZCBub3RlcywgYSBsb25nIGRlY3JlYXNpbmcgcmVzdCBcXFxuICAgIHNldCBhbmQgdHdvIG5vdGVzIHRpZWQgdG8gc3VycGFzcyBhIGJhci5gLFxuICBkYXRhOiB7XG4gICAgbm90ZXM6IFtcbiAgICAgIHsgc3RhcnQ6IDAsIGxlbmd0aDogMisxLzIrMS84LCBwaXRjaDogNjcsIGludGVuc2l0eTogMTI3IH0sXG4gICAgICB7IHN0YXJ0OiA0LSgxLzQrMS8xNiksIGxlbmd0aDogMS80KzEvMTYsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfSxcbiAgICAgIHsgc3RhcnQ6IDgtMS8xNiwgbGVuZ3RoOiA0KzEvMTYsIHBpdGNoOiA2NywgaW50ZW5zaXR5OiAxMjcgfVxuICAgIF0sXG4gIH1cbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMSBQYXNjdWFsIGRlIEp1YW4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBUZXN0RGF0YSB9IGZyb20gJy4uLy4uL3Rlc3QvdGVzdF9kYXRhJztcbmltcG9ydCB7IFN0YWZmU1ZHUmVuZGVyLCBTY3JvbGxUeXBlIH0gZnJvbSAnLi4vLi4vc3JjL3N0YWZmX3N2Z19yZW5kZXInO1xuXG5jb25zdCBjb25maWcgPSB7XG4gIG5vdGVIZWlnaHQ6IDE1LFxuICBwaXhlbHNQZXJUaW1lU3RlcDogMCxcbiAgaW5zdHJ1bWVudHM6IFswXSxcbiAgZGVmYXVsdEtleTogMCxcbiAgc2Nyb2xsVHlwZTogU2Nyb2xsVHlwZS5CQVJcbn1cblxuZnVuY3Rpb24gdmlzdWFsaXplKGRpdjogSFRNTERpdkVsZW1lbnQsIHRlc3Q6IFRlc3REYXRhKSB7XG4gIGNvbnN0IGRldGFpbHNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0Rpdik7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICB0aXRsZS5pbm5lclRleHQgPSB0ZXN0LnRpdGxlO1xuICBkZXRhaWxzRGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGVzdC5kZXNjcmlwdGlvbjtcbiAgZGV0YWlsc0Rpdi5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSAndmlzdWFsaXplci1jb250YWluZXInO1xuICBkaXYuYXBwZW5kQ2hpbGQoY29udGFpbmVyRGl2KTtcbiAgY29uc3Qgc2NvcmVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoc2NvcmVEaXYpO1xuICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgbmV3IFN0YWZmU1ZHUmVuZGVyKHRlc3QuZGF0YSwgY29uZmlnLCBzY29yZURpdik7XG59XG5cbmltcG9ydCAqIGFzIGJzIGZyb20gJy4uLy4uL3Rlc3QvYmFzaWNfc3ltYm9sc19mZWF0dXJlcyc7XG5jb25zdCBic0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXNpY1N5bWJvbHMnKSBhcyBIVE1MRGl2RWxlbWVudDtcbmJzLnRlc3REYXRhLmZvckVhY2goIHRlc3QgPT4gdmlzdWFsaXplKGJzRGl2LCB0ZXN0KSApO1xuXG5pbXBvcnQgKiBhcyBycyBmcm9tICcuLi8uLi90ZXN0L3JpdGhtX3NwbGl0X2ZlYXR1cmVzJztcbmNvbnN0IHJzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpdGhtU3BsaXQnKSBhcyBIVE1MRGl2RWxlbWVudDtcbnJzLnRlc3REYXRhLmZvckVhY2goIHRlc3QgPT4gdmlzdWFsaXplKHJzRGl2LCB0ZXN0KSApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==