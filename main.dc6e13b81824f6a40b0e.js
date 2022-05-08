/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Keyboard.js":
/*!*************************!*\
  !*** ./src/Keyboard.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextAreaHelper */ "./src/TextAreaHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldDestructureSet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); return _classApplyDescriptorDestructureSet(receiver, descriptor); }

function _classApplyDescriptorDestructureSet(receiver, descriptor) { if (descriptor.set) { if (!("__destrObj" in descriptor)) { descriptor.__destrObj = { set value(v) { descriptor.set.call(receiver, v); } }; } return descriptor.__destrObj; } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } return descriptor; } }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _layout = /*#__PURE__*/new WeakMap();

var _textArea = /*#__PURE__*/new WeakMap();

var _keys = /*#__PURE__*/new WeakMap();

var _langs = /*#__PURE__*/new WeakMap();

var _langI = /*#__PURE__*/new WeakMap();

var _shift = /*#__PURE__*/new WeakMap();

var _caps = /*#__PURE__*/new WeakMap();

var _mouseDown = /*#__PURE__*/new WeakMap();

var _getChar = /*#__PURE__*/new WeakMap();

var _redraw = /*#__PURE__*/new WeakMap();

var _specialTextFunc = /*#__PURE__*/new WeakMap();

var Keyboard = /*#__PURE__*/function () {
  function Keyboard(design) {
    var _this = this;

    _classCallCheck(this, Keyboard);

    _classPrivateFieldInitSpec(this, _layout, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _textArea, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _keys, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _langs, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _langI, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _shift, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _caps, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mouseDown, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _getChar, {
      writable: true,
      value: function value(key, lang, shift, caps) {
        return Keyboard.getChar(_classPrivateFieldGet(_this, _keys), key, lang, shift, caps);
      }
    });

    _defineProperty(this, "getLayout", function () {
      return _classPrivateFieldGet(_this, _layout);
    });

    _classPrivateFieldInitSpec(this, _redraw, {
      writable: true,
      value: function value() {
        var shiftKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var _ref = [_classPrivateFieldGet(_this, _langs)[_classPrivateFieldGet(_this, _langI)], _classPrivateFieldGet(_this, _keys), _classPrivateFieldGet(_this, _caps)],
            lang = _ref[0],
            keys = _ref[1],
            caps = _ref[2];
        Object.keys(keys).forEach(function (keyId) {
          var key = keys[keyId];
          var newChar = Keyboard.getChar(keys, keyId, lang, shiftKey, caps);
          key.element.innerText = newChar;
        });
      }
    });

    _defineProperty(this, "toggleLang", function (shiftKey) {
      _classPrivateFieldSet(_this, _langI, _classPrivateFieldGet(_this, _langI) + 1);

      if (_classPrivateFieldGet(_this, _langI) >= _classPrivateFieldGet(_this, _langs).length) {
        _classPrivateFieldSet(_this, _langI, 0);
      }

      localStorage.lang = _classPrivateFieldGet(_this, _langs)[_classPrivateFieldGet(_this, _langI)];

      _classPrivateFieldGet(_this, _redraw).call(_this, shiftKey);
    });

    _defineProperty(this, "doBackspace", function () {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].doBackspace(_classPrivateFieldGet(_this, _textArea));
    });

    _defineProperty(this, "doDelete", function () {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].doDelete(_classPrivateFieldGet(_this, _textArea));
    });

    _defineProperty(this, "doTab", function () {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].doTab(_classPrivateFieldGet(_this, _textArea));
    });

    _defineProperty(this, "doEnter", function () {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].doEnter(_classPrivateFieldGet(_this, _textArea));
    });

    _defineProperty(this, "arrowRight", function (shift) {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arrowRight(_classPrivateFieldGet(_this, _textArea), shift);
    });

    _defineProperty(this, "arrowLeft", function (shift) {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arrowLeft(_classPrivateFieldGet(_this, _textArea), shift);
    });

    _defineProperty(this, "arrowUp", function (shift) {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arrowUp(_classPrivateFieldGet(_this, _textArea), shift);
    });

    _defineProperty(this, "arrowDown", function (shift) {
      return _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arrowDown(_classPrivateFieldGet(_this, _textArea), shift);
    });

    _classPrivateFieldInitSpec(this, _specialTextFunc, {
      writable: true,
      value: {
        Backspace: this.doBackspace,
        Delete: this.doDelete,
        Tab: this.doTab,
        Enter: this.doEnter,
        ArrowRight: this.arrowRight,
        ArrowLeft: this.arrowLeft,
        ArrowUp: this.arrowUp,
        ArrowDown: this.arrowDown
      }
    });

    var Keys = design.Keys,
        Rows = design.Rows,
        StyleKeys = design.StyleKeys,
        KeyStyles = design.KeyStyles,
        Name = design.Name;
    var fragment = document.createDocumentFragment();
    var textArea = document.createElement('textarea');
    textArea.setAttribute('id', "".concat(Name, "__textarea"));
    fragment.appendChild(textArea);
    var board = document.createElement('div');
    board.setAttribute('id', "".concat(Name, "__board"));
    var _keys2 = {};
    var langs = {};
    Rows.forEach(function (row) {
      var rowDiv = document.createElement('div');
      rowDiv.classList.add("".concat(Name, "__row"));
      row.forEach(function (keyId) {
        if (keyId) {
          if (_keys2[keyId]) {
            throw new Error("".concat(keyId, " was already added!"));
          }

          var keyDiv = document.createElement('button');
          keyDiv.classList.add("".concat(Name, "__key"));

          if (KeyStyles[keyId]) {
            keyDiv.classList.add(KeyStyles[keyId]);
          }

          keyDiv.id = keyId;
          rowDiv.appendChild(keyDiv);
          var key = Keys[keyId];
          _keys2[keyId] = _objectSpread(_objectSpread({}, key), {}, {
            element: keyDiv
          });
          Object.keys(key).forEach(function (lang) {
            langs[lang] = null;
          });
        } else {
          var _keyDiv = document.createElement('div');

          _keyDiv.classList.add("".concat(Name, "__empty"));

          rowDiv.appendChild(_keyDiv);
        }
      });
      board.appendChild(rowDiv);
    });
    fragment.appendChild(board);
    Object.keys(StyleKeys).forEach(function (style) {
      (Array.isArray(StyleKeys[style]) ? StyleKeys[style] : [StyleKeys[style]]).forEach(function (key) {
        if (_keys2[key]) {
          _keys2[key].element.classList.add(style);
        }
      });
    });
    var langsArr = Object.keys(langs).filter(function (v) {
      return v !== 'default';
    });
    var langI = localStorage.lang ? Math.max(0, langsArr.indexOf(localStorage.lang)) : 0;
    var _ref2 = [textArea, langsArr, _keys2, langI, fragment];
    _classPrivateFieldDestructureSet(this, _textArea).value = _ref2[0];
    _classPrivateFieldDestructureSet(this, _langs).value = _ref2[1];
    _classPrivateFieldDestructureSet(this, _keys).value = _ref2[2];
    _classPrivateFieldDestructureSet(this, _langI).value = _ref2[3];
    _classPrivateFieldDestructureSet(this, _layout).value = _ref2[4];
    Object.keys(_keys2).forEach(function (key) {
      var _char = _classPrivateFieldGet(_this, _getChar).call(_this, key, langsArr[langI]);

      if (_char) _keys2[key].element.innerHTML = _char;
    });
    document.addEventListener('keyup', this.keyUp.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  _createClass(Keyboard, [{
    key: "doShift",
    value: function doShift(shiftKey, capsKey) {
      if (_classPrivateFieldGet(this, _shift) === shiftKey && !capsKey) return;

      if (capsKey) {
        var capsNew = !_classPrivateFieldGet(this, _caps);

        var keyCaps = _classPrivateFieldGet(this, _keys).CapsLock;

        if (keyCaps) {
          if (capsNew) Keyboard.addActive(keyCaps);else Keyboard.removeActive(keyCaps);
        }

        _classPrivateFieldSet(this, _caps, capsNew);
      }

      _classPrivateFieldGet(this, _redraw).call(this, shiftKey);

      _classPrivateFieldSet(this, _shift, shiftKey);
    }
  }, {
    key: "buttonDown",
    value: function buttonDown(event) {
      if (event.code !== 'F5' && event.code !== 'F12' && event.preventDefault) event.preventDefault();

      _classPrivateFieldGet(this, _textArea).focus();

      var key = _classPrivateFieldGet(this, _keys)[event.code];

      if (!key) return;
      if (event.ctrlKey && event.altKey) this.toggleLang(event.shiftKey);
      var caps = event.code === 'CapsLock';
      if (!caps) Keyboard.addActive(key);

      if (!event.repeat && (event.shiftKey || caps)) {
        this.doShift(event.shiftKey, caps);
      }

      if (_classStaticPrivateFieldSpecGet(Keyboard, Keyboard, _noEvent).includes(event.code)) return;
      if (_classPrivateFieldGet(this, _specialTextFunc)[event.code]) _classPrivateFieldGet(this, _specialTextFunc)[event.code](event.shiftKey);else {
        var e = key.element;
        _TextAreaHelper__WEBPACK_IMPORTED_MODULE_0__["default"].writeKey(_classPrivateFieldGet(this, _textArea), e.innerText.length > 0 ? e.innerText : e.innerHTML);
      }
    }
  }, {
    key: "buttonUp",
    value: function buttonUp(event) {
      if (event.preventDefault) event.preventDefault();

      var key = _classPrivateFieldGet(this, _keys)[event.code];

      if (!key) return;
      if (event.code !== 'CapsLock') Keyboard.removeActive(key);

      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.doShift(event.shiftKey, false);
        if (_classPrivateFieldGet(this, _keys).ShiftLeft) Keyboard.removeActive(_classPrivateFieldGet(this, _keys).ShiftLeft);
        if (_classPrivateFieldGet(this, _keys).ShiftRight) Keyboard.removeActive(_classPrivateFieldGet(this, _keys).ShiftRight);
      }
    }
  }, {
    key: "keyDown",
    value: function keyDown(event) {
      this.buttonDown(event);
    }
  }, {
    key: "keyUp",
    value: function keyUp(event) {
      this.buttonUp(event);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(event) {
      if (event.target.nodeName !== 'BUTTON') return;

      _classPrivateFieldSet(this, _mouseDown, event.target.id);

      this.buttonDown(_objectSpread(_objectSpread({}, event), {}, {
        code: event.target.id
      }));
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(event) {
      this.buttonUp(_objectSpread(_objectSpread({}, event), {}, {
        code: _classPrivateFieldGet(this, _mouseDown)
      }));

      _classPrivateFieldGet(this, _textArea).focus();
    }
  }], [{
    key: "getChar",
    value: function getChar(keys, key, lang) {
      var shift = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var caps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var isCapsIgnored = function isCapsIgnored(kLang, kDef) {
        if (kLang && typeof kLang.isCapsIgnored === 'boolean') {
          return kLang.isCapsIgnored;
        }

        if (kDef && typeof kDef.isCapsIgnored === 'boolean') {
          return kDef.isCapsIgnored;
        }

        return false;
      };

      var k = keys[key];
      if (!k) return null;
      var _ref3 = [k[lang], k["default"]],
          kLang = _ref3[0],
          kDef = _ref3[1];
      var realShift = caps && !isCapsIgnored(kLang, kDef) ? !shift : shift;

      if (realShift) {
        if (kLang && kLang.shift) {
          return kLang.shift;
        }

        if (kDef && kDef.shift) {
          return kDef.shift;
        }
      }

      if (kLang && kLang["char"]) {
        return kLang["char"];
      }

      if (kDef && kDef["char"]) {
        return kDef["char"];
      }

      return null;
    }
  }, {
    key: "addActive",
    value: function addActive(key) {
      key.element.classList.add('active');
    }
  }, {
    key: "removeActive",
    value: function removeActive(key) {
      key.element.classList.remove('active');
    }
  }]);

  return Keyboard;
}();

var _noEvent = {
  writable: true,
  value: ['CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight']
};


/***/ }),

/***/ "./src/TextAreaHelper.js":
/*!*******************************!*\
  !*** ./src/TextAreaHelper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextAreaHelper)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextAreaHelper = /*#__PURE__*/function () {
  function TextAreaHelper() {
    _classCallCheck(this, TextAreaHelper);
  }

  _createClass(TextAreaHelper, null, [{
    key: "addCharAtSelectionStart",
    value: function addCharAtSelectionStart(textArea, _char) {
      var selStart = textArea.selectionStart;
      var newPos = selStart + (_char === '\r\n' ? 1 : _char.length);
      textArea.setRangeText(_char);
      textArea.setSelectionRange(newPos, newPos, 'none');
    }
  }, {
    key: "writeKey",
    value: function writeKey(textArea, _char2) {
      var _ref = [textArea.selectionStart, textArea.selectionEnd],
          selStart = _ref[0],
          selEnd = _ref[1];
      if (selStart !== selEnd) textArea.setRangeText('');
      TextAreaHelper.addCharAtSelectionStart(textArea, _char2);
    }
  }, {
    key: "deletePartOfTextArea",
    value: function deletePartOfTextArea(textArea, selectionStart, selectionEnd) {
      textArea.setSelectionRange(selectionStart, selectionEnd, 'none');
      textArea.setRangeText('');
    }
  }, {
    key: "doBackspace",
    value: function doBackspace(textArea) {
      var _ref2 = [textArea.selectionStart, textArea.selectionEnd],
          selStart = _ref2[0],
          selEnd = _ref2[1];
      if (selEnd < 1) return;

      if (selEnd === selStart) {
        textArea.setSelectionRange(selStart - 1, selEnd, 'none');
      }

      textArea.setRangeText('');
    }
  }, {
    key: "doDelete",
    value: function doDelete(textArea) {
      var _ref3 = [textArea.selectionStart, textArea.selectionEnd],
          selStart = _ref3[0],
          selEnd = _ref3[1];
      if (selStart >= textArea.value.length) return;

      if (selEnd === selStart) {
        textArea.setSelectionRange(selStart, selEnd + 1, 'none');
      }

      textArea.setRangeText('');
    }
  }, {
    key: "doTab",
    value: function doTab(textArea) {
      TextAreaHelper.writeKey(textArea, '    ');
    }
  }, {
    key: "doEnter",
    value: function doEnter(textArea) {
      TextAreaHelper.writeKey(textArea, '\r\n');
    }
  }, {
    key: "moveCursorLeft",
    value: function moveCursorLeft(textArea, shift, move) {
      var _ref4 = [textArea.selectionStart, textArea.selectionEnd, textArea.selectionDirection],
          selStart = _ref4[0],
          selEnd = _ref4[1],
          direction = _ref4[2];

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
          var _ref5 = [selEnd, selStart];
          selStart = _ref5[0];
          selEnd = _ref5[1];
          direction = 'backward';
        }
      } else {
        if (selStart === selEnd) {
          selStart = Math.max(selStart - move, 0);
        }

        selEnd = selStart;
        direction = 'none';
      }

      textArea.setSelectionRange(selStart, selEnd, direction);
    }
  }, {
    key: "moveCursorRight",
    value: function moveCursorRight(textArea, shift, move) {
      var _ref6 = [textArea.selectionStart, textArea.selectionEnd, textArea.selectionDirection],
          selStart = _ref6[0],
          selEnd = _ref6[1],
          direction = _ref6[2];

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
          var _ref7 = [selEnd, selStart];
          selStart = _ref7[0];
          selEnd = _ref7[1];
          direction = 'forward';
        }
      } else {
        if (selStart === selEnd) {
          selEnd = Math.min(selEnd + move, textArea.value.length);
        }

        selStart = selEnd;
        direction = 'none';
      }

      textArea.setSelectionRange(selStart, selEnd, direction);
    }
  }, {
    key: "arrowLeft",
    value: function arrowLeft(textArea, shift) {
      TextAreaHelper.moveCursorLeft(textArea, shift, 1);
    }
  }, {
    key: "arrowRight",
    value: function arrowRight(textArea, shift) {
      TextAreaHelper.moveCursorRight(textArea, shift, 1);
    }
  }, {
    key: "arrowUp",
    value: function arrowUp(textArea, shift) {
      var rowsSum = TextAreaHelper.getRowsSum(textArea);
      var selVal = textArea.selectionDirection !== 'forward' ? textArea.selectionStart : textArea.selectionEnd;
      var rowId = rowsSum.findIndex(function (v) {
        return v > selVal;
      });
      if (rowId === 0) TextAreaHelper.moveCursorLeft(textArea, shift, Infinity);else {
        var prevRowSum = rowsSum[rowId - 1];
        var prevPrevRowSum = rowId > 1 ? rowsSum[rowId - 2] : 0;
        var pos = selVal - prevRowSum;
        var prevRowLength = prevRowSum - prevPrevRowSum;
        var newPos = Math.min(prevRowLength - 1, pos);
        var newSelection = prevPrevRowSum + newPos;
        var move = selVal - newSelection;
        TextAreaHelper.moveCursorLeft(textArea, shift, move);
      }
    }
  }, {
    key: "arrowDown",
    value: function arrowDown(textArea, shift) {
      var rowsSum = TextAreaHelper.getRowsSum(textArea);
      var selVal = textArea.selectionDirection !== 'backward' ? textArea.selectionEnd : textArea.selectionStart;
      var rowId = rowsSum.findIndex(function (v) {
        return v > selVal;
      });
      if (rowId === rowsSum.length - 1) TextAreaHelper.moveCursorRight(textArea, shift, Infinity);else {
        var pos = selVal - (rowId > 0 ? rowsSum[rowId - 1] : 0);
        var nextRowLength = rowsSum[rowId + 1] - rowsSum[rowId];
        var newPos = Math.min(nextRowLength - 1, pos);
        var newSelection = rowsSum[rowId] + newPos;
        var move = newSelection - selVal;
        TextAreaHelper.moveCursorRight(textArea, shift, move);
      }
    }
  }]);

  return TextAreaHelper;
}();

_defineProperty(TextAreaHelper, "getRowsSum", function (textArea) {
  return textArea.value.split('\r\n').reduce(function (p, c) {
    return [].concat(_toConsumableArray(p), _toConsumableArray(c.split('\n')));
  }, []).map(function (v) {
    return v.length;
  }).reduce(function (p, c, i) {
    return [].concat(_toConsumableArray(p), [c + 1 + (i > 0 ? p[i - 1] : 0)]);
  }, []);
});



/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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




var createTitle = function createTitle() {
  var pTitle = document.createElement('p');
  pTitle.innerHTML = 'Virtual Keyboard<br>Windows<br>Ctrl+Alt to switch input language';
  pTitle.id = 'title';
  pTitle.classList.add('text');
  return pTitle;
};

var fragment = document.createDocumentFragment();
var baseDIv = document.createElement('div');
baseDIv.id = 'wrapper';
baseDIv.appendChild(createTitle());
baseDIv.appendChild(new _Keyboard__WEBPACK_IMPORTED_MODULE_0__["default"](_design_json__WEBPACK_IMPORTED_MODULE_2__).getLayout());
fragment.appendChild(baseDIv);
document.body.appendChild(fragment);
})();

/******/ })()
;
//# sourceMappingURL=main.dc6e13b81824f6a40b0e.js.map