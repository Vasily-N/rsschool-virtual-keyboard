import TextAreaHelper from "./TextAreaHelper";

export default class Keyboard {
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




  doBackspace = () => TextAreaHelper.doBackspace(this.#textArea);

  doDelete = () => TextAreaHelper.doDelete(this.#textArea);

  doTab = () => TextAreaHelper.doTab(this.#textArea);

  doEnter = () => TextAreaHelper.doEnter(this.#textArea);

  arrowRight = (shift) => TextAreaHelper.arrowRight(this.#textArea, shift);

  arrowLeft = (shift) => TextAreaHelper.arrowLeft(this.#textArea, shift);

  arrowUp = (shift) => TextAreaHelper.arrowUp(this.#textArea, shift);

  arrowDown = (shift) => TextAreaHelper.arrowDown(this.#textArea, shift);

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
      const e = key.element;
      TextAreaHelper.writeKey(this.#textArea, e.innerText.length > 0 ? e.innerText : e.innerHTML);
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
