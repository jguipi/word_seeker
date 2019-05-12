import { word_to_found, first_data_grid } from "../constants/GameDataGrid";

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

export function verifyGameGridWord(array, currentGameGrid) {
  let remainingWord = 6;
  if (currentGameGrid === first_data_grid) {
    if (
      array[23] === 1 &&
      array[24] === 1 &&
      array[25] === 1 &&
      array[26] === 1 &&
      array[27] === 1 &&
      array[28] === 1
    ) {
      remainingWord -= 1;
    }
    if (array[50] === 1 && array[51] === 1 && array[52] === 1 && array[53] === 1) {
      remainingWord -= 1;
    }
    if (
      array[80] === 1 &&
      array[81] === 1 &&
      array[82] === 1 &&
      array[83] === 1 &&
      array[84] === 1
    ) {
      remainingWord -= 1;
    }

    if (
      array[91] === 1 &&
      array[92] === 1 &&
      array[93] === 1 &&
      array[94] === 1 &&
      array[95] === 1 &&
      array[96] === 1
    ) {
      remainingWord -= 1;
    }
    if (
      array[42] === 1 &&
      array[43] === 1 &&
      array[44] === 1 &&
      array[45] === 1 &&
      array[46] === 1 &&
      array[47] === 1 &&
      array[48] === 1 &&
      array[49] === 1
    ) {
      remainingWord -= 1;
    }
    if (
      array[63] === 1 &&
      array[64] === 1 &&
      array[65] === 1 &&
      array[66] === 1 &&
      array[67] === 1 &&
      array[68] === 1 &&
      array[69] === 1
    ) {
      remainingWord -= 1;
    }

    return remainingWord;
  } else {
    if (array[70] === 1 && array[71] === 1 && array[72] === 1 && array[73] === 1) {
      remainingWord -= 1;
    }
    if (
      array[50] === 1 &&
      array[41] === 1 &&
      array[32] === 1 &&
      array[23] === 1 &&
      array[14] === 1
    ) {
      remainingWord -= 1;
    }
    if (
      array[66] === 1 &&
      array[55] === 1 &&
      array[44] === 1 &&
      array[33] === 1 &&
      array[22] === 1 &&
      array[11] === 1
    ) {
      remainingWord -= 1;
    }
    if (
      array[7] === 1 &&
      array[6] === 1 &&
      array[5] === 1 &&
      array[4] === 1 &&
      array[3] === 1 &&
      array[2] === 1 &&
      array[1] === 1 &&
      array[0] === 1
    ) {
      remainingWord -= 1;
    }
    if (
      array[97] === 1 &&
      array[87] === 1 &&
      array[77] === 1 &&
      array[67] === 1 &&
      array[57] === 1 &&
      array[47] === 1
    ) {
      remainingWord -= 1;
    }
    if (
      array[9] === 1 &&
      array[18] === 1 &&
      array[27] === 1 &&
      array[36] === 1 &&
      array[45] === 1 &&
      array[54] === 1 &&
      array[63] === 1 &&
      array[72] === 1 &&
      array[81] === 1 &&
      array[90] === 1
    ) {
      remainingWord -= 1;
    }
    return remainingWord;
  }
}
