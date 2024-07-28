import { create } from "zustand";
import { produce } from "immer";

const initialOptions = {
  playSounds: true,
};

const initialTest = {
  testArray: [
    { elementPropA: 1, elementPropB: 2 },
    { elementPropA: 3, elementPropB: 4 },
  ],
};

interface Elem {
  elementPropA: number;
  elementPropB: number;
}

interface ElemArr {
  testArray: Elem[];
}

interface OptionsState {
  playSounds: boolean;
  testObj: ElemArr;
  togglePlaySounds: () => void;
  testUpdate: () => void;
  getDeep: () => number;
  getDeep3: () => number;
  getDeep2: () => ElemArr;
}

const useOptionsStore = create<OptionsState>()((set, get) => ({
  playSounds: initialOptions.playSounds,
  testObj: initialTest,
  togglePlaySounds: () =>
    set((state) => ({ ...state, playSounds: !state.playSounds })),
  testUpdate: () =>
    set(
      produce((state) => {
        state.testObj.testArray[1].elementPropB =
          state.testObj.testArray[1].elementPropB + 1;
      })
    ),
  getDeep: () => {
    return get().testObj.testArray[1].elementPropB;
  },
  getDeep2: () => {
    return get().testObj;
  },
  getDeep3: () => {
    return get().testObj.testArray[0].elementPropA;
  },
}));

export default useOptionsStore;
