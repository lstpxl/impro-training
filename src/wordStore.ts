import { create } from "zustand";
import rawWordList from "./word-list.json";

interface Word {
  position: number;
  word: string;
  frequency: number;
  rank: number;
  used: boolean;
}

const initialWordList = rawWordList.map((item) => ({
  position: Number(item[0]),
  word: item[1],
  frequency: Number(item[2]),
  rank: Number(item[3]),
  used: false,
}));

function getNextWord(wordList: Word[]) {
  console.log("word switch?!!!!!!");
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

interface WordListState {
  wordList: Word[];
  currentWord: string | undefined;
  currentSecondWord: string | undefined;
  switchNextWord: (double: boolean) => void;
}

const useWordStore = create<WordListState>()((set) => ({
  wordList: initialWordList,
  currentWord: undefined,
  currentSecondWord: undefined,
  switchNextWord: (double: boolean) =>
    set((state) => ({
      currentWord: getNextWord(state.wordList),
      currentSecondWord: double ? getNextWord(state.wordList) : undefined,
    })),
}));

export default useWordStore;
