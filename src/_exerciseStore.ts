import { create } from "zustand";
import {
  defaultExerciseRule,
  defaultExerciseState,
  ExerciseStorage,
} from "./Exercise";

type ExerciseFullState = ExerciseStorage & {
  start: () => void;
  score: () => void;
  abort: () => void;
  ping: () => void;
  setExercise: (newExercise: ExerciseStorage) => void;
};

const useExerciseStore = create<ExerciseFullState>()((set) => ({
  ...defaultExerciseRule,
  ...defaultExerciseState,
  start: () =>
    set((state) => {
      return {
        ...state,
        isDisplayed: true,
        isRun: true,
        timestampStarted: Date.now(),
        wordNumber: 1,
        scoreCount: 0,
        isFinished: false,
      };
    }),
  abort: () => set((state) => ({ ...state, isRun: false, time: 0 })),
  score: () => set((state) => ({ ...state, scoreCount: state.scoreCount + 1 })),
  ping: () =>
    set((state) => {
      if (
        state.isRun &&
        state.order &&
        state.isDisplayed &&
        state.timestampStarted
      ) {
        const msPassed = Date.now() - state.timestampStarted;

        const newTimer = Math.round(msPassed / 1000);
        const newProgress = state.length
          ? (msPassed / (state.length * 1000)) * 100
          : undefined;
        const finished = state.length ? msPassed > state.length * 1000 : true;
        const timeLeft = state.length
          ? Math.round(state.length - msPassed / 1000)
          : state.length;
        if (finished) {
          if (!state.isFinished) {
            // TODO
            // report that ex is isFinished
          }
          state.isFinished = true;
          state.isRun = false;
          state.progress = 100;
        }
        const newWordNumber =
          state.wordAdvance === "manual" && state.wordInterval
            ? Math.floor(Math.floor(msPassed / 1000) / state.wordInterval)
            : 0;
        const newWordProgress =
          state.wordAdvance === "manual" && state.wordInterval
            ? ((msPassed % (state.wordInterval * 1000)) /
                (state.wordInterval * 1000)) *
              100
            : 0;
        return {
          ...state,
          // isDisplayed: !finished,
          isRun: !finished,
          timer: newTimer,
          progress: newProgress,
          timeLeft: timeLeft,
          wordNumber: newWordNumber,
          wordProgress: newWordProgress,
        };
      } else {
        return state;
      }
    }),
  // setExercise: (newExercise: Exercise) =>
  //   set(() => ({ ...newExercise, isDisplayed: false, time: 0 })),
  setExercise: (newExercise: ExerciseStorage) =>
    set((state) => {
      // return { ...newExercise, name: "boooo", isDisplayed: false, time: 0 };
      return {
        ...state,
        ...newExercise,
        // exercise: newExercise,
        // name: "boooo",
        isDisplayed: true,
        isRun: false,
        time: 0,
      };
    }),
}));

export default useExerciseStore;
