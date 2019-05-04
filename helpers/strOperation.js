import { word_to_found } from "../constants/GameDataGrid";

export function strCompare(letter) {
  let result = false;
  let wordFound = 0;
  word_to_found.forEach((element, i) => {
    if (letter.includes(element)) {
      result = true;
      wordFound += 1;
    }
  });
  return { result, wordFound };
}

export function generateWord(array) {
  var activeWord = "";
  array.map(value => {
    activeWord += value.key;
  });
  return activeWord;
}
