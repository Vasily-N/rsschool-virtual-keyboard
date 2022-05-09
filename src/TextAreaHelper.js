export default class TextAreaHelper {
  static addCharAtSelectionStart(textArea, char) {
    const selStart = textArea.selectionStart;
    const newPos = selStart + (char === '\r\n' ? 1 : char.length);
    textArea.setRangeText(char);
    textArea.setSelectionRange(newPos, newPos, 'none');
  }

  static writeKey(textArea, char) {
    const [selStart, selEnd] = [textArea.selectionStart, textArea.selectionEnd];
    if (selStart !== selEnd) textArea.setRangeText('');
    TextAreaHelper.addCharAtSelectionStart(textArea, char);
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

  static doTab(textArea) { TextAreaHelper.writeKey(textArea, '    '); }

  static doEnter(textArea) { TextAreaHelper.writeKey(textArea, '\r\n'); }

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

  static arrowLeft(textArea, shift) { TextAreaHelper.moveCursorLeft(textArea, shift, 1); }

  static arrowRight(textArea, shift) { TextAreaHelper.moveCursorRight(textArea, shift, 1); }

  static getRowsAndSum = (textArea) => {
    const rowsLength = textArea.value.split('\r\n').reduce((p, c) => [...p, ...c.split('\n')], []).map((v) => v.length);
    const rowsSum = rowsLength.reduce((p, c, i) => [...p, c + 1 + (i > 0 ? p[i - 1] : 0)], []);
    return { rowsLength, rowsSum };
  };

  static arrowUp(textArea, shift) {
    const { rowsLength, rowsSum } = TextAreaHelper.getRowsAndSum(textArea);
    const selVal = (textArea.selectionDirection !== 'forward') ? textArea.selectionStart : textArea.selectionEnd;
    const rowId = rowsSum.findIndex((v) => v > selVal);

    if (rowId === 0) TextAreaHelper.moveCursorLeft(textArea, shift, Infinity);
    else {
      const prevPrevRowSum = rowId > 1 ? rowsSum[rowId - 2] : 0;
      const pos = selVal - rowsSum[rowId - 1];
      const prevRowLength = rowsLength[rowId - 1];
      const newPos = Math.min(prevRowLength, pos);
      const newSelection = prevPrevRowSum + newPos;
      if (shift && textArea.selectionDirection === 'forward' && newSelection <= textArea.selectionStart
            && textArea.selectionStart !== textArea.selectionEnd) {
        textArea.setSelectionRange(textArea.selectionStart, textArea.selectionStart, 'none');
      } else {
        const move = selVal - newSelection;
        TextAreaHelper.moveCursorLeft(textArea, shift, move);
      }
    }
  }

  static arrowDown(textArea, shift) {
    const { rowsLength, rowsSum } = TextAreaHelper.getRowsAndSum(textArea);
    const selVal = (textArea.selectionDirection !== 'backward') ? textArea.selectionEnd : textArea.selectionStart;

    const rowId = rowsSum.findIndex((v) => v > selVal);

    if (rowId === rowsSum.length - 1) TextAreaHelper.moveCursorRight(textArea, shift, Infinity);
    else {
      const pos = selVal - (rowId > 0 ? rowsSum[rowId - 1] : 0);
      const nextRowLength = rowsLength[rowId + 1];
      const newPos = Math.min(nextRowLength, pos);
      const newSelection = rowsSum[rowId] + newPos;
      if (shift && textArea.selectionDirection === 'backward' && newSelection >= textArea.selectionEnd
            && textArea.selectionStart !== textArea.selectionEnd) {
        textArea.setSelectionRange(textArea.selectionEnd, textArea.selectionEnd, 'none');
      } else {
        const move = newSelection - selVal;
        TextAreaHelper.moveCursorRight(textArea, shift, move);
      }
    }
  }
}
