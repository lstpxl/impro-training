import rawWordListRu from "./word-list-ru.json";
import rawWordListEn from "./word-list-en.json";

export interface Word {
  position: number;
  word: string;
  frequency: number;
  rank: number;
  used: boolean;
}

export const getInitialWordList = (lng: string) => {
  if (lng === "ru") {
    return rawWordListRu.map((item) => ({
      position: Number(item[0]),
      word: item[1],
      frequency: Number(item[2]),
      rank: Number(item[3]),
      used: false,
    }));
  }
  if (lng === "en") {
    return rawWordListEn.map((item) => ({
      position: Number(item[0]),
      word: item[1],
      frequency: Number(item[2]),
      rank: Number(item[3]),
      used: false,
    }));
  }
  console.error(`Unable to get word list for language (${lng}).`);
  return [];
};

export function getNextWord(wordList: Word[]): string | undefined {
  if (wordList.length < 1) return undefined;
  let filtered = wordList.filter((element) => element.used !== true);
  if (wordList.length < 1) {
    wordList.forEach((element) => (element.used = false));
  }
  filtered = wordList.filter((element) => element.used !== true);
  const index = Math.floor(Math.random() * (filtered.length + 1));
  wordList.forEach((element) => {
    if (element.word === filtered[index].word) element.used = true;
  });
  return filtered[index].word;
}
