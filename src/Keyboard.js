export default class Keyboard {
    #layout; #textArea; #keys; #langs; #langI;

    #getChar(key, lang, shift = false, caps = false) { 
        const isCapsIgnored = (kLang, kDef) => {
            if(kLang && typeof kLang.isCapsIgnored == 'boolean')
                return kLang.isCapsIgnored;
            if(kDef && typeof kDef.isCapsIgnored == 'boolean')
                return kDef.isCapsIgnored;
            return false;
        };

        const k = this.#keys[key];
        if(!k) return null;
        const kLang = k[lang];
        const kDef = k.default;

        shift = caps && !isCapsIgnored(kLang, kDef) ? !shift : shift;

        if(shift) {
            if(kLang && kLang.shift)
                return kLang.shift;
            if(kDef && kDef.shift)
                return kDef.shift;
        } else {
            if(kLang && kLang.char)
                return kLang.char;
            if(kDef && kDef.char)
                return kDef.char;
        }
        return null;
    }

    constructor(design) {
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
                if(key) {
                    if(keys[key])
                        throw new Error(`${key} was already added!`);
                    const keyDiv = document.createElement('button');
                    keyDiv.classList.add(`${Name}__key`);
                    if(KeyStyles[key])
                        keyDiv.classList.add(KeyStyles[key]);
                    keyDiv.id = key;
                    rowDiv.appendChild(keyDiv);
                    keys[key] = {...Keys[key], element: keyDiv };
                    for(const lang in Keys[key]) langs[lang] = null;
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
                    if(keys[key]) 
                        keys[key].element.classList.add(style);
                });
        }

        const langsArr = Object.keys(langs).filter(v => v != 'default');
        const langI = (localStorage.langI) ? Math.max(0, langsArr.indexOf(localStorage.langI)) : 0;

        [this.#textArea, this.#langs, this.#keys, this.#langI, this.#layout] = [textArea, langsArr, keys, langI, fragment];
        
        for(const key in keys) {
            const char = this.#getChar(key, langsArr[langI]);
            if(char) keys[key].element.innerHTML = char;
        }
    }

    getLayout = () => this.#layout;
}
