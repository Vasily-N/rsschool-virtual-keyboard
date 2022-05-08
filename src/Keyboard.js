export default class Keyboard {
    #layout; #textArea; #keys; #langs; #langI; #shift; #caps;

    static getChar (keys, key, lang, shift = false, caps = false) {
        const isCapsIgnored = (kLang, kDef) => {
            if (kLang && typeof kLang.isCapsIgnored == 'boolean')
                return kLang.isCapsIgnored;
            if (kDef && typeof kDef.isCapsIgnored == 'boolean')
                return kDef.isCapsIgnored;
            return false;
        };

        const k = keys[key];
        if (!k) return null;

        const [kLang, kDef] = [k[lang], k.default];
        shift = caps && !isCapsIgnored(kLang, kDef) ? !shift : shift;
        if (shift) {
            if (kLang && kLang.shift)
                return kLang.shift;
            if (kDef && kDef.shift)
                return kDef.shift;
        }
        if (kLang && kLang.char)
            return kLang.char;
        if (kDef && kDef.char)
            return kDef.char;
        return null;
    }

    #getChar = (key, lang, shift = false, caps = false) =>
        Keyboard.getChar(this.#keys, key, lang, shift, caps);

    getLayout = () => this.#layout;

    #redraw = (shiftKey = false) => {
        const [lang, keys, caps] = [this.#langs[this.#langI], this.#keys, this.#caps];
        for (const keyId in keys) {
            const key = keys[keyId];
            const newChar = Keyboard.getChar(keys, keyId, lang, shiftKey, caps);
            key.element.innerText = newChar;
        }
    };

    toggleLang = shiftKey => {
        if ( ++this.#langI >= this.#langs.length)
            this.#langI = 0;
        localStorage.lang = this.#langs[this.#langI];
        this.#redraw(shiftKey);
    };

    static addCharAtSelectionStart (textArea, char) {
        const [taVal, selStart] = [textArea.value, textArea.selectionStart];
        if (selStart >= taVal.length) {
            textArea.value += char;
            return;
        }
        const newPos = selStart + 1;
        [textArea.value, textArea.selectionStart, textArea.selectionEnd] = 
        [taVal.slice(0, selStart) + char + taVal.slice(selStart, taVal.length), 
            newPos, newPos];
    }

    static writeKey (textArea, char) {
        const [selStart, selEnd] = [textArea.selectionStart, textArea.selectionEnd];
        if (selStart != selEnd) Keyboard.deletePartOfTextArea(textArea, selStart, selEnd);
        Keyboard.addCharAtSelectionStart(textArea, char);
    }

    static deletePartOfTextArea (textArea, taSelStartNew, taSelEndNew) {
        [textArea.value, textArea.selectionStart, textArea.selectionEnd] = 
        [textArea.value.slice(0, taSelStartNew) + textArea.value.slice(taSelEndNew, textArea.value.length), 
            taSelStartNew, taSelStartNew];
    }

    static doBackspace (textArea) {
        const [taSelStart, taSelEnd] = [textArea.selectionStart, textArea.selectionEnd];
        if (taSelEnd < 1) return;
        Keyboard.deletePartOfTextArea(textArea, Math.max(0, taSelEnd == taSelStart ? taSelStart - 1 : taSelStart), taSelEnd);
    }

    static doDelete (textArea) {
        const [length, selStart, selEnd] = [textArea.value.length, textArea.selectionStart, textArea.selectionEnd];
        if (selStart >= length) return;
        Keyboard.deletePartOfTextArea(textArea, selStart, Math.min(length, selEnd == selStart ? selEnd + 1 : selEnd));
    }

    static doTab (textArea) { Keyboard.addCharAtSelectionStart(textArea, '    '); } 
    static doEnter (textArea) { Keyboard.addCharAtSelectionStart(textArea, '\r\n'); }

    static moveCursorLeft (textArea, shift, move) {
        let [selStart, selEnd, direction] = [textArea.selectionStart, textArea.selectionEnd, textArea.selectionDirection];
        if (selStart == selEnd) {
            direction = 'none';
        }

        if (shift) {
            if (direction != 'forward' || selStart == selEnd) {
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
            if (selStart == selEnd)
                selStart = Math.max(selStart - move, 0);
            selEnd = selStart;

            direction = 'none';
        }

        textArea.setSelectionRange(selStart, selEnd, direction);
    }

    static moveCursorRight (textArea, shift, move) {
        let [selStart, selEnd, direction] = [textArea.selectionStart, textArea.selectionEnd, textArea.selectionDirection];
        if (selStart == selEnd) {
            direction = 'none';
        }

        if (shift) {
            if (direction != 'backward' || selStart == selEnd) {
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
            if (selStart == selEnd)
                selEnd = Math.min(selEnd + move, textArea.value.length);
            selStart = selEnd;
            direction = 'none';
        }

        textArea.setSelectionRange(selStart, selEnd, direction);
    }

    static arrowLeft (textArea, shift) { Keyboard.moveCursorLeft(textArea, shift, 1); }
    static arrowRight (textArea, shift) { Keyboard.moveCursorRight(textArea, shift, 1); }

    static getRowsSum = textArea => textArea.value.split('\r\n').reduce((p, c) => [...p, ...c.split('\n')], [])
        .map(v => v.length).reduce((p, c, i) => [...p, c + 1 + (i > 0 ? p[i-1] : 0)], []);

    static arrowUp (textArea, shift) {
        const rowsSum = Keyboard.getRowsSum(textArea);
        const selVal = (textArea.selectionDirection != 'forward') ? textArea.selectionStart : textArea.selectionEnd;
        const rowId = rowsSum.findIndex(v => v > selVal);

        if (rowId == 0) Keyboard.moveCursorLeft(textArea, shift, Infinity);
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

    static arrowDown (textArea, shift) {
        const rowsSum = Keyboard.getRowsSum(textArea);
        const selVal = (textArea.selectionDirection != 'backward') ? textArea.selectionEnd : textArea.selectionStart;

        const rowId = rowsSum.findIndex(v => v > selVal);

        if (rowId == rowsSum.length - 1) Keyboard.moveCursorRight(textArea, shift, Infinity);
        else {
            const pos = selVal - (rowId > 0 ? rowsSum[rowId - 1] : 0);
            const nextRowLength = rowsSum[rowId + 1] - rowsSum[rowId];
            const newPos = Math.min(nextRowLength - 1, pos);
            const newSelection = rowsSum[rowId] + newPos;
            const move = newSelection - selVal;
            Keyboard. moveCursorRight(textArea, shift, move);
        }
    }

    doBackspace = () => Keyboard.doBackspace(this.#textArea);
    doDelete = () => Keyboard.doDelete(this.#textArea);
    doTab = () => Keyboard.doTab(this.#textArea);
    doEnter = () => Keyboard.doEnter(this.#textArea);
    arrowRight = shift => Keyboard.arrowRight(this.#textArea, shift);
    arrowLeft = shift => Keyboard.arrowLeft(this.#textArea, shift);
    arrowUp = shift => Keyboard.arrowUp(this.#textArea, shift);
    arrowDown = shift => Keyboard.arrowDown(this.#textArea, shift);

    doShift (shiftKey, capsKey) {
        if (this.#shift == shiftKey && !capsKey) return;
        if (capsKey) {
            const capsNew = !this.#caps;
            const keyCaps = this.#keys['CapsLock'];
            if (keyCaps) {
                if (capsNew)
                    keyCaps.element.classList.add('active');
                else
                    keyCaps.element.classList.remove('active');
            }
            this.#caps = capsNew;
        }

        this.#redraw(shiftKey);
        this.#shift = shiftKey;
    }

    static #noEvent = ['CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'];
    #specialTextFunc = { 'Backspace': this.doBackspace, 'Delete': this.doDelete, 'Tab': this.doTab, 'Enter': this.doEnter, 
        'ArrowRight': this.arrowRight, 'ArrowLeft': this.arrowLeft, 'ArrowUp': this.arrowUp, 'ArrowDown': this.arrowDown };

    keyDown (event) {
        if (event.code != 'F5' && event.code != 'F12') event.preventDefault();
        this.#textArea.focus();
        const key = this.#keys[event.code];
        if (!key) return; 
        if (event.ctrlKey && event.altKey) this.toggleLang(event.shiftKey);
        const caps = event.code == 'CapsLock';
        if (!caps)
            key.element.classList.add('active');
        if (!event.repeat && (event.shiftKey || caps)) {
            this.doShift(event.shiftKey, caps);
        }
        if (Keyboard.#noEvent.includes(event.code)) return;
        if (this.#specialTextFunc[event.code]) this.#specialTextFunc[event.code](event.shiftKey);
        else Keyboard.writeKey(this.#textArea, key.element.innerText);
    }

    keyUp (event) {
        event.preventDefault();
        const key = this.#keys[event.code];
        if (!key) return; 
        if (event.code !== 'CapsLock')
            key.element.classList.remove('active');
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
            this.doShift(event.shiftKey, false);
            if (this.#keys['ShiftLeft'])
                this.#keys['ShiftLeft'].element.classList.remove('active');
            if (this.#keys['ShiftRight'])
                this.#keys['ShiftRight'].element.classList.remove('active');
        }
    }

    constructor (design) {
        const {Keys, Rows, StyleKeys, KeyStyles, Name } = design;
        const fragment = document.createDocumentFragment();

        const textArea = document.createElement('textarea');
        textArea.setAttribute('id', `${Name}__textarea`);
        fragment.appendChild(textArea);

        const board = document.createElement('div');
        board.setAttribute('id', `${Name}__board`);

        const keys = {};
        const langs = {};
        Rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add(`${Name}__row`);
            row.forEach(key => {
                if (key) {
                    if (keys[key])
                        throw new Error(`${key} was already added!`);
                    const keyDiv = document.createElement('button');
                    keyDiv.classList.add(`${Name}__key`);
                    if (KeyStyles[key])
                        keyDiv.classList.add(KeyStyles[key]);
                    keyDiv.id = key;
                    rowDiv.appendChild(keyDiv);
                    keys[key] = {...Keys[key], element: keyDiv };
                    for (const lang in Keys[key]) langs[lang] = null;
                } else {
                    const keyDiv = document.createElement('div');
                    keyDiv.classList.add(`${Name}__empty`);
                    rowDiv.appendChild(keyDiv);
                }
            });
            board.appendChild(rowDiv);
        });

        fragment.appendChild(board);

        for (const style in StyleKeys) {
            ((Array.isArray(StyleKeys[style])) ? StyleKeys[style] : [StyleKeys[style]])
                .forEach(key => {
                    if (keys[key]) 
                        keys[key].element.classList.add(style);
                });
        }

        const langsArr = Object.keys(langs).filter(v => v != 'default');
        const langI = localStorage.lang ? Math.max(0, langsArr.indexOf(localStorage.lang)) : 0;

        [this.#textArea, this.#langs, this.#keys, this.#langI, this.#layout] = [textArea, langsArr, keys, langI, fragment];

        for (const key in keys) {
            const char = this.#getChar(key, langsArr[langI]);
            if (char) keys[key].element.innerHTML = char;
        }

        document.addEventListener('keyup', this.keyUp.bind(this));
        document.addEventListener('keydown', this.keyDown.bind(this));
    }
}
