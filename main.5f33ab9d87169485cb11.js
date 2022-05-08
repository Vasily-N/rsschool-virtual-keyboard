/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Keyboard.js":
/*!*************************!*\
  !*** ./src/Keyboard.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
class Keyboard {
  #layout;

  #textArea;

  #keys;

  #langs;

  #langI;

  #shift;

  #caps;

  #mouseDown;

  static getChar(keys, key, lang, shift = false, caps = false) {
    const isCapsIgnored = (kLang, kDef) => {
      if (kLang && typeof kLang.isCapsIgnored === 'boolean') { return kLang.isCapsIgnored; }
      if (kDef && typeof kDef.isCapsIgnored === 'boolean') { return kDef.isCapsIgnored; }
      return false;
    };

    const k = keys[key];
    if (!k) return null;

    const [kLang, kDef] = [k[lang], k.default];
    const realShift = (caps && !isCapsIgnored(kLang, kDef)) ? !shift : shift;
    if (realShift) {
      if (kLang && kLang.shift) { return kLang.shift; }
      if (kDef && kDef.shift) { return kDef.shift; }
    }
    if (kLang && kLang.char) { return kLang.char; }
    if (kDef && kDef.char) { return kDef.char; }
    return null;
  }

  #getChar = (key, lang, shift, caps) => Keyboard.getChar(this.#keys, key, lang, shift, caps);

  getLayout = () => this.#layout;

  #redraw = (shiftKey = false) => {
    const [lang, keys, caps] = [this.#langs[this.#langI], this.#keys, this.#caps];
    Object.keys(keys).forEach((keyId) => {
      const key = keys[keyId];
      const newChar = Keyboard.getChar(keys, keyId, lang, shiftKey, caps);
      key.element.innerText = newChar;
    });
  };

  toggleLang = (shiftKey) => {
    this.#langI += 1;
    if (this.#langI >= this.#langs.length) { this.#langI = 0; }
    localStorage.lang = this.#langs[this.#langI];
    this.#redraw(shiftKey);
  };

  static addCharAtSelectionStart(textArea, char) {
    const selStart = textArea.selectionStart;
    const newPos = selStart + (char === '\r\n' ? 1 : char.length);
    textArea.setRangeText(char);
    textArea.setSelectionRange(newPos, newPos, 'none');
  }

  static writeKey(textArea, char) {
    const [selStart, selEnd] = [textArea.selectionStart, textArea.selectionEnd];
    if (selStart !== selEnd) textArea.setRangeText('');
    Keyboard.addCharAtSelectionStart(textArea, char);
  }

  static deletePartOfTextArea(textArea, selectionStart, selectionEnd) {
    textArea.setSelectionRange(selectionStart, selectionEnd, 'none');
    textArea.setRangeText('');
  }

  static doBackspace(textArea) {
    const [selStart, selEnd] = [textArea.selectionStart, textArea.selectionEnd];
    if (selEnd < 1) return;
    if (selEnd === selStart) { textArea.setSelectionRange(selStart - 1, selEnd, 'none'); }
    textArea.setRangeText('');
  }

  static doDelete(textArea) {
    const [selStart, selEnd] = [textArea.selectionStart, textArea.selectionEnd];
    if (selStart >= textArea.value.length) return;
    if (selEnd === selStart) { textArea.setSelectionRange(selStart, selEnd + 1, 'none'); }
    textArea.setRangeText('');
  }

  static doTab(textArea) { Keyboard.writeKey(textArea, '    '); }

  static doEnter(textArea) { Keyboard.writeKey(textArea, '\r\n'); }

  static moveCursorLeft(textArea, shift, move) {
    let [selStart, selEnd, direction] = [
      textArea.selectionStart, textArea.selectionEnd, textArea.selectionDirection];
    if (selStart === selEnd) {
      direction = 'none';
    }

    if (shift) {
      if (direction !== 'forward' || selStart === selEnd) {
        selStart = Math.max(selStart - move, 0);
        direction = 'backward';
      } else {
        selEnd = Math.max(selEnd - move, 0);
      }

      if (selEnd < selStart) {
        [selStart, selEnd] = [selEnd, selStart];
        direction = 'backward';
      }
    } else {
      if (selStart === selEnd) { selStart = Math.max(selStart - move, 0); }
      selEnd = selStart;

      direction = 'none';
    }

    textArea.setSelectionRange(selStart, selEnd, direction);
  }

  static moveCursorRight(textArea, shift, move) {
    let [selStart, selEnd, direction] = [
      textArea.selectionStart, textArea.selectionEnd, textArea.selectionDirection];
    if (selStart === selEnd) {
      direction = 'none';
    }

    if (shift) {
      if (direction !== 'backward' || selStart === selEnd) {
        selEnd = Math.min(selEnd + move, textArea.value.length);
        direction = 'forward';
      } else {
        selStart = Math.min(selStart + move, textArea.value.length);
      }

      if (selEnd < selStart) {
        [selStart, selEnd] = [selEnd, selStart];
        direction = 'forward';
      }
    } else {
      if (selStart === selEnd) { selEnd = Math.min(selEnd + move, textArea.value.length); }
      selStart = selEnd;
      direction = 'none';
    }

    textArea.setSelectionRange(selStart, selEnd, direction);
  }

  static arrowLeft(textArea, shift) { Keyboard.moveCursorLeft(textArea, shift, 1); }

  static arrowRight(textArea, shift) { Keyboard.moveCursorRight(textArea, shift, 1); }

  static getRowsSum = (textArea) => textArea.value.split('\r\n').reduce((p, c) => [...p, ...c.split('\n')], [])
    .map((v) => v.length).reduce((p, c, i) => [...p, c + 1 + (i > 0 ? p[i - 1] : 0)], []);

  static arrowUp(textArea, shift) {
    const rowsSum = Keyboard.getRowsSum(textArea);
    const selVal = (textArea.selectionDirection !== 'forward') ? textArea.selectionStart : textArea.selectionEnd;
    const rowId = rowsSum.findIndex((v) => v > selVal);

    if (rowId === 0) Keyboard.moveCursorLeft(textArea, shift, Infinity);
    else {
      const prevRowSum = rowsSum[rowId - 1];
      const prevPrevRowSum = rowId > 1 ? rowsSum[rowId - 2] : 0;
      const pos = selVal - prevRowSum;
      const prevRowLength = prevRowSum - prevPrevRowSum;
      const newPos = Math.min(prevRowLength - 1, pos);
      const newSelection = prevPrevRowSum + newPos;
      const move = selVal - newSelection;
      Keyboard.moveCursorLeft(textArea, shift, move);
    }
  }

  static arrowDown(textArea, shift) {
    const rowsSum = Keyboard.getRowsSum(textArea);
    const selVal = (textArea.selectionDirection !== 'backward') ? textArea.selectionEnd : textArea.selectionStart;

    const rowId = rowsSum.findIndex((v) => v > selVal);

    if (rowId === rowsSum.length - 1) Keyboard.moveCursorRight(textArea, shift, Infinity);
    else {
      const pos = selVal - (rowId > 0 ? rowsSum[rowId - 1] : 0);
      const nextRowLength = rowsSum[rowId + 1] - rowsSum[rowId];
      const newPos = Math.min(nextRowLength - 1, pos);
      const newSelection = rowsSum[rowId] + newPos;
      const move = newSelection - selVal;
      Keyboard.moveCursorRight(textArea, shift, move);
    }
  }

  doBackspace = () => Keyboard.doBackspace(this.#textArea);

  doDelete = () => Keyboard.doDelete(this.#textArea);

  doTab = () => Keyboard.doTab(this.#textArea);

  doEnter = () => Keyboard.doEnter(this.#textArea);

  arrowRight = (shift) => Keyboard.arrowRight(this.#textArea, shift);

  arrowLeft = (shift) => Keyboard.arrowLeft(this.#textArea, shift);

  arrowUp = (shift) => Keyboard.arrowUp(this.#textArea, shift);

  arrowDown = (shift) => Keyboard.arrowDown(this.#textArea, shift);

  static addActive(key) {
    key.element.classList.add('active');
  }

  static removeActive(key) {
    key.element.classList.remove('active');
  }

  doShift(shiftKey, capsKey) {
    if (this.#shift === shiftKey && !capsKey) return;
    if (capsKey) {
      const capsNew = !this.#caps;
      const keyCaps = this.#keys.CapsLock;
      if (keyCaps) {
        if (capsNew) Keyboard.addActive(keyCaps);
        else Keyboard.removeActive(keyCaps);
      }
      this.#caps = capsNew;
    }

    this.#redraw(shiftKey);
    this.#shift = shiftKey;
  }

  static #noEvent = ['CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'];

  #specialTextFunc = {
    Backspace: this.doBackspace,
    Delete: this.doDelete,
    Tab: this.doTab,
    Enter: this.doEnter,
    ArrowRight: this.arrowRight,
    ArrowLeft: this.arrowLeft,
    ArrowUp: this.arrowUp,
    ArrowDown: this.arrowDown,
  };

  buttonDown(event) {
    if (event.code !== 'F5' && event.code !== 'F12' && event.preventDefault) event.preventDefault();
    this.#textArea.focus();
    const key = this.#keys[event.code];
    if (!key) return;
    if (event.ctrlKey && event.altKey) this.toggleLang(event.shiftKey);
    const caps = event.code === 'CapsLock';
    if (!caps) Keyboard.addActive(key);
    if (!event.repeat && (event.shiftKey || caps)) {
      this.doShift(event.shiftKey, caps);
    }
    if (Keyboard.#noEvent.includes(event.code)) return;
    if (this.#specialTextFunc[event.code]) this.#specialTextFunc[event.code](event.shiftKey);
    else {
      const el = key.element;
      Keyboard.writeKey(this.#textArea, el.innerText.length > 0 ? el.innerText : el.innerHTML);
    }
  }

  buttonUp(event) {
    if (event.preventDefault) event.preventDefault();
    const key = this.#keys[event.code];
    if (!key) return;
    if (event.code !== 'CapsLock') Keyboard.removeActive(key);

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.doShift(event.shiftKey, false);
      if (this.#keys.ShiftLeft) Keyboard.removeActive(this.#keys.ShiftLeft);
      if (this.#keys.ShiftRight) Keyboard.removeActive(this.#keys.ShiftRight);
    }
  }

  keyDown(event) {
    this.buttonDown(event);
  }

  keyUp(event) {
    this.buttonUp(event);
  }

  mouseDown(event) {
    if (event.target.nodeName !== 'BUTTON') return;
    this.#mouseDown = event.target.id;
    this.buttonDown({ ...event, code: event.target.id });
  }

  mouseUp(event) {
    this.buttonUp({ ...event, code: this.#mouseDown });
    this.#textArea.focus();
  }

  constructor(design) {
    const {
      Keys, Rows, StyleKeys, KeyStyles, Name,
    } = design;
    const fragment = document.createDocumentFragment();

    const textArea = document.createElement('textarea');
    textArea.setAttribute('id', `${Name}__textarea`);
    fragment.appendChild(textArea);

    const board = document.createElement('div');
    board.setAttribute('id', `${Name}__board`);

    const keys = {};
    const langs = {};
    Rows.forEach((row) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add(`${Name}__row`);
      row.forEach((keyId) => {
        if (keyId) {
          if (keys[keyId]) { throw new Error(`${keyId} was already added!`); }
          const keyDiv = document.createElement('button');
          keyDiv.classList.add(`${Name}__key`);
          if (KeyStyles[keyId]) { keyDiv.classList.add(KeyStyles[keyId]); }
          keyDiv.id = keyId;
          rowDiv.appendChild(keyDiv);
          const key = Keys[keyId];
          keys[keyId] = { ...key, element: keyDiv };
          Object.keys(key).forEach((lang) => { langs[lang] = null; });
        } else {
          const keyDiv = document.createElement('div');
          keyDiv.classList.add(`${Name}__empty`);
          rowDiv.appendChild(keyDiv);
        }
      });
      board.appendChild(rowDiv);
    });

    fragment.appendChild(board);

    Object.keys(StyleKeys).forEach((style) => {
      ((Array.isArray(StyleKeys[style])) ? StyleKeys[style] : [StyleKeys[style]])
        .forEach((key) => {
          if (keys[key]) { keys[key].element.classList.add(style); }
        });
    });

    const langsArr = Object.keys(langs).filter((v) => v !== 'default');
    const langI = localStorage.lang ? Math.max(0, langsArr.indexOf(localStorage.lang)) : 0;

    [this.#textArea, this.#langs, this.#keys, this.#langI, this.#layout] = [
      textArea, langsArr, keys, langI, fragment];

    Object.keys(keys).forEach((key) => {
      const char = this.#getChar(key, langsArr[langI]);
      if (char) keys[key].element.innerHTML = char;
    });

    document.addEventListener('keyup', this.keyUp.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));

    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }
}


/***/ }),

/***/ "./src/design.json":
/*!*************************!*\
  !*** ./src/design.json ***!
  \*************************/
/***/ ((module) => {

module.exports = JSON.parse('{"Keys":{"Backquote":{"eng":{"isCapsIgnored":true,"char":"`","shift":"~"},"rus":{"char":"ё","shift":"Ё"}},"Digit1":{"default":{"isCapsIgnored":true,"char":"1","shift":"!"}},"Digit2":{"default":{"isCapsIgnored":true,"char":"2","shift":"@"},"rus":{"shift":"\\""}},"Digit3":{"default":{"isCapsIgnored":true,"char":"3","shift":"#"},"rus":{"shift":"№"}},"Digit4":{"default":{"isCapsIgnored":true,"char":"4","shift":"$"},"rus":{"shift":";"}},"Digit5":{"default":{"isCapsIgnored":true,"char":"5","shift":"%"}},"Digit6":{"default":{"isCapsIgnored":true,"char":"6","shift":"^"},"rus":{"shift":":"}},"Digit7":{"default":{"isCapsIgnored":true,"char":"7","shift":"&"},"rus":{"shift":"?"}},"Digit8":{"default":{"isCapsIgnored":true,"char":"8","shift":"*"}},"Digit9":{"default":{"isCapsIgnored":true,"char":"9","shift":"("}},"Digit0":{"default":{"isCapsIgnored":true,"char":"0","shift":")"}},"Minus":{"default":{"isCapsIgnored":true,"char":"-","shift":"_"}},"Equal":{"default":{"isCapsIgnored":true,"char":"=","shift":"+"}},"KeyQ":{"eng":{"char":"q","shift":"Q"},"rus":{"char":"й","shift":"Й"}},"KeyW":{"eng":{"char":"w","shift":"W"},"rus":{"char":"ц","shift":"Ц"}},"KeyE":{"eng":{"char":"e","shift":"E"},"rus":{"char":"у","shift":"У"}},"KeyR":{"eng":{"char":"r","shift":"R"},"rus":{"char":"к","shift":"К"}},"KeyT":{"eng":{"char":"t","shift":"T"},"rus":{"char":"е","shift":"Е"}},"KeyY":{"eng":{"char":"y","shift":"Y"},"rus":{"char":"н","shift":"Н"}},"KeyU":{"eng":{"char":"u","shift":"U"},"rus":{"char":"г","shift":"Г"}},"KeyI":{"eng":{"char":"i","shift":"I"},"rus":{"char":"ш","shift":"Ш"}},"KeyO":{"eng":{"char":"o","shift":"O"},"rus":{"char":"щ","shift":"Щ"}},"KeyP":{"eng":{"char":"p","shift":"P"},"rus":{"char":"з","shift":"З"}},"BracketLeft":{"eng":{"isCapsIgnored":true,"char":"[","shift":"{"},"rus":{"char":"х","shift":"Х"}},"BracketRight":{"eng":{"isCapsIgnored":true,"char":"]","shift":"}"},"rus":{"char":"ъ","shift":"Ъ"}},"Backslash":{"eng":{"isCapsIgnored":true,"char":"\\\\","shift":"|"},"rus":{"isCapsIgnored":true,"char":"\\\\","shift":"/"}},"KeyA":{"eng":{"char":"a","shift":"A"},"rus":{"char":"ф","shift":"Ф"}},"KeyS":{"eng":{"char":"s","shift":"S"},"rus":{"char":"ы","shift":"Ы"}},"KeyD":{"eng":{"char":"d","shift":"D"},"rus":{"char":"в","shift":"В"}},"KeyF":{"eng":{"char":"f","shift":"F"},"rus":{"char":"а","shift":"А"}},"KeyG":{"eng":{"char":"g","shift":"G"},"rus":{"char":"п","shift":"П"}},"KeyH":{"eng":{"char":"h","shift":"H"},"rus":{"char":"р","shift":"Р"}},"KeyJ":{"eng":{"char":"j","shift":"J"},"rus":{"char":"о","shift":"О"}},"KeyK":{"eng":{"char":"k","shift":"K"},"rus":{"char":"л","shift":"Л"}},"KeyL":{"eng":{"char":"l","shift":"L"},"rus":{"char":"д","shift":"Д"}},"Semicolon":{"eng":{"isCapsIgnored":true,"char":";","shift":":"},"rus":{"char":"ж","shift":"Ж"}},"Quote":{"eng":{"isCapsIgnored":true,"char":"\'","shift":"\\""},"rus":{"char":"э","shift":"Э"}},"KeyZ":{"eng":{"char":"z","shift":"Z"},"rus":{"char":"я","shift":"Я"}},"KeyX":{"eng":{"char":"x","shift":"X"},"rus":{"char":"ч","shift":"Ч"}},"KeyC":{"eng":{"char":"c","shift":"C"},"rus":{"char":"с","shift":"С"}},"KeyV":{"eng":{"char":"v","shift":"V"},"rus":{"char":"м","shift":"М"}},"KeyB":{"eng":{"char":"b","shift":"B"},"rus":{"char":"и","shift":"И"}},"KeyN":{"eng":{"char":"n","shift":"N"},"rus":{"char":"т","shift":"Т"}},"KeyM":{"eng":{"char":"m","shift":"M"},"rus":{"char":"ь","shift":"Ь"}},"Comma":{"eng":{"isCapsIgnored":true,"char":",","shift":"<"},"rus":{"char":"б","shift":"Б"}},"Period":{"eng":{"isCapsIgnored":true,"char":".","shift":">"},"rus":{"char":"ю","shift":"Ю"}},"Slash":{"eng":{"isCapsIgnored":true,"char":"/","shift":"?"},"rus":{"isCapsIgnored":true,"char":".","shift":","}},"Space":{"default":{"char":" "}},"Backspace":{"default":{"char":"←"}},"Tab":{"default":{"char":"Tab"}},"Delete":{"default":{"char":"Del"}},"CapsLock":{"default":{"char":"Caps"}},"Enter":{"default":{"char":"Enter"}},"ShiftLeft":{"default":{"char":"Shift"}},"ShiftRight":{"default":{"char":"Shift"}},"ControlLeft":{"default":{"char":"Ctrl"}},"ControlRight":{"default":{"char":"Ctrl"}},"MetaLeft":{"default":{"char":"Win"}},"MetaRight":{"default":{"char":"Win"}},"AltLeft":{"default":{"char":"Alt"}},"AltRight":{"default":{"char":"Alt"}},"ArrowUp":{"default":{"char":"↑"}},"ArrowLeft":{"default":{"char":"←"}},"ArrowDown":{"default":{"char":"↓"}},"ArrowRight":{"default":{"char":"→"}}},"Rows":[["Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace"],["Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash"],["CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter"],["ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","ShiftRight","ArrowUp","Delete"],["ControlLeft","MetaLeft","AltLeft","Space","AltRight","MetaRight","ControlRight","Slash","ArrowLeft","ArrowDown","ArrowRight"]],"StyleKeys":{"special":["Backspace","Delete","Tab","Enter","Space","CapsLock","ShiftLeft","ShiftRight","ControlLeft","ControlRight","AltLeft","AltRight","MetaLeft","MetaRight","ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]},"KeyStyles":{},"Name":"keyboard"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Keyboard */ "./src/Keyboard.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
/* harmony import */ var _design_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./design.json */ "./src/design.json");




const createTitle = () => {
  const pTitle = document.createElement('p');
  pTitle.innerHTML = 'Virtual Keyboard<br>Windows<br>Ctrl+Alt to switch input language';
  pTitle.id = 'title';
  pTitle.classList.add('text');
  return pTitle;
};

const fragment = document.createDocumentFragment();

const baseDIv = document.createElement('div');
baseDIv.id = 'wrapper';
baseDIv.appendChild(createTitle());
baseDIv.appendChild(new _Keyboard__WEBPACK_IMPORTED_MODULE_0__["default"](_design_json__WEBPACK_IMPORTED_MODULE_2__).getLayout());

fragment.appendChild(baseDIv);

document.body.appendChild(fragment);

})();

/******/ })()
;
//# sourceMappingURL=main.5f33ab9d87169485cb11.js.map