import { create } from "zustand";
import { defaultExerciseState, ExerciseStorage } from "./Exercise";
import defaultLesson from "./default-lesson.json";
import { jsonClone } from "./lib/baseUtils";
import { produce } from "immer";
import { PairMutation, pingExercise } from "./pingExercise";

interface Lesson {
  name: string;
  exercises: ExerciseStorage[];
}

function getLessonLength(lesson: Lesson | undefined) {
  if (lesson === undefined) return undefined;
  return lesson.exercises.reduce((acc, exercise) => acc + exercise.length, 0);
}

function getLessonFinishedLength(lesson: Lesson | undefined) {
  if (lesson === undefined) return undefined;
  return lesson.exercises.reduce(
    (acc, exercise) => acc + (exercise.isFinished ? exercise.length : 0),
    0
  );
}

function getInitialLesson() {
  const lesson = jsonClone(defaultLesson);
  lesson.exercises.sort(
    (a: ExerciseStorage, b: ExerciseStorage) => a.order - b.order
  );
  lesson.exercises = lesson.exercises.map(
    (e: ExerciseStorage, index: number) => ({
      ...e,
      ...defaultExerciseState,
      order: index + 1,
    })
  );
  return lesson;
}

interface LessonState {
  lesson: Lesson | undefined;
  isStarted: boolean;
  length: number;
  timestampStarted: number | undefined;
  lengthisFinished: number;
  progress: number | undefined;
  status: string;
  activeExercise: ExerciseStorage | undefined;
  finishedTimestamp: number | undefined;
  wordTimestamp: number | undefined;
  globalScoreCount: number;

  init: () => void;
  start: () => void;
  abort: () => void;
  ping: () => void;

  getTotalLength: () => number | undefined;
  getPassedLength: () => number;
  getDisplayedExercise: () => ExerciseStorage | undefined;
  getDisplayedExerciseOrder: () => number | undefined;
  getNumExercisesTotal: () => number | undefined;
  getNumExercisesPassed: () => number | undefined;

  getIsAnyExerciseDisplayed: () => boolean;
  getIsDisplayedExerciseRunning: () => boolean | undefined;
  getIsDisplayedExerciseFinished: () => boolean | undefined;
  runDisplayedExercise: () => void;

  getDisplayedExerciseName: () => string | undefined;
  getDisplayedExerciseDescription: () => string | undefined;
  pause: () => void;

  getDisplayedExerciseLength: () => number | undefined;
  getDisplayedExerciseWordInterval: () => number | undefined;
  getDisplayedExerciseRemainingTime: () => number | undefined;
  getDisplayedExerciseProgress: () => number | undefined;

  getLessonName: () => string | undefined;
  getExerciseListJson: () => string | undefined;

  jumpToExercise: (order: number) => void;

  getNextExerciseOrder: () => number | undefined;

  getDisplayedExerciseIsManualScore: () => boolean | undefined;
  getDisplayedExerciseScoreCount: () => number | undefined;
  addScore: () => void;

  getDisplayedExerciseIsAutoWordAdvance: () => boolean | undefined;
  getDisplayedExerciseWordNumber: () => number | undefined;

  getDisplayedExerciseWordAdvance: () => string | undefined;
  getDisplayedExerciseWordProgress: () => number | undefined;
  getDisplayedExerciseDoubleWords: () => boolean | undefined;
}

function calcStatusStr(lessonState: LessonState) {
  const exercises = lessonState?.lesson?.exercises;
  if (!exercises) return "";
  // console.log("calc status", exercises);
  return exercises.reduce(
    (acc: string, exercise: ExerciseStorage, index: number): string =>
      acc.concat(
        index !== 0 ? "," : "",
        exercise.isFinished ? "f" : exercise.isDisplayed ? "a" : "q"
      ),
    ""
  );
}

function calcDisplayedExercise(
  lesson: Lesson | undefined
): ExerciseStorage | undefined {
  if (!lesson) return undefined;
  return lesson.exercises.reduce(
    (
      acc: ExerciseStorage | undefined,
      exercise: ExerciseStorage
    ): ExerciseStorage | undefined =>
      acc !== undefined ? acc : exercise.isDisplayed ? exercise : acc,
    undefined
  );
}

function calcExerciseWithOrder(
  lesson: Lesson | undefined,
  order: number
): ExerciseStorage | undefined {
  if (!lesson) return undefined;
  return lesson.exercises.reduce(
    (
      acc: ExerciseStorage | undefined,
      exercise: ExerciseStorage
    ): ExerciseStorage | undefined =>
      acc !== undefined ? acc : exercise.order === order ? exercise : acc,
    undefined
  );
}

function calcNextExerciseOrder(lesson: Lesson | undefined): number | undefined {
  if (!lesson?.exercises) return undefined;
  for (let i = 0; i < lesson.exercises.length; i++) {
    if (lesson.exercises[i].isDisplayed) {
      return i < lesson.exercises.length - 1 ? i + 2 : undefined;
    }
  }
  return undefined;
}

const useLessonStore = create<LessonState>()((set, get) => ({
  lesson: undefined,
  isStarted: false,
  length: 0,
  lengthisFinished: 0,
  timestampStarted: undefined,
  progress: undefined,
  status: "",
  activeExercise: undefined,
  finishedTimestamp: undefined,
  wordTimestamp: undefined,
  globalScoreCount: 0,
  init: () =>
    set((state) => {
      const newLesson = getInitialLesson();
      const newStatus = calcStatusStr(state);
      return {
        ...state,
        lesson: newLesson,
        length: getLessonLength(newLesson),
        lengthisFinished: 0,
        isStarted: false,
        timestampStarted: undefined,
        status: newStatus,
        progress: undefined,
        activeExercise: newLesson[0],
      };
    }),
  start: () =>
    set(
      produce((state) => {
        const nextExercise = state?.lesson?.exercises.reduce(
          (
            acc: ExerciseStorage | undefined,
            exercise: ExerciseStorage
          ): ExerciseStorage | undefined =>
            acc !== undefined ? acc : exercise.isFinished ? acc : exercise,
          undefined
        );
        if (state.activeExercise) {
          state.activeExercise.isDisplayed = false;
          state.activeExercise.isRun = false;
        }
        if (nextExercise) {
          console.log(nextExercise);
          nextExercise.isDisplayed = true;
          nextExercise.isRun = false;
          // nextExercise.wordNumber = 1;
        }
        /*       const newActiveExercise = state?.lesson?.exercises.filter(
        (exercise: ExerciseStorage): ExerciseStorage | undefined =>
          exercise.isDisplayed ? acc : exercise,
        undefined
      ); */
        const newStatus = calcStatusStr(state);
        // console.log("status calculated", newStatus);
        /*         return {
          ...state,
          isStarted: true,
          timestampStarted: Date.now(),
          progress: 2,
          status: newStatus,
          activeExercise: nextExercise,
        }; */
        state.isStarted = true;
        state.timestampStarted = Date.now();
        state.progress = 0;
        state.status = newStatus;
        state.activeExercise = nextExercise;
      })
    ),
  abort: () => set((state) => ({ ...state, isStarted: false, time: 0 })),
  ping: () =>
    set(
      produce((state) => {
        const current = get();
        if (!current.isStarted) return;
        if (!current.lesson?.exercises?.length) return;
        const exercise = calcDisplayedExercise(current.lesson);
        if (!exercise) return;
        if (
          !exercise.isDisplayed ||
          !exercise.isRun ||
          exercise.isFinished ||
          !exercise.timestampStarted
        )
          return;
        const mutation: PairMutation = pingExercise(exercise);
        if (mutation.toExercise?.get("isFinished") && !exercise.isFinished) {
          state.finishedTimestamp = Date.now();
        }
        /*         const assignee = calcDisplayedExercise(state.lesson);
        state.lesson.exercises[exercise.order - 1] = {
          ...assignee,
          ...mutation.toLesson,
        }; */
        mutation.toLesson?.forEach((value, key) => {
          state[key] = value;
        });
        /*         for (const [key, value] of Object.entries(mutation.toLesson)) {
          state[key] = value;
          } */
        mutation.toExercise?.forEach((value, key) => {
          state.lesson.exercises[exercise.order - 1][key] = value;
        });
        /*         for (const [key, value] of Object.entries(mutation.toExercise)) {
          state.lesson.exercises[exercise.order - 1][key] = value;
        } */
      })
    ),

  getTotalLength: () => {
    return getLessonLength(get().lesson);
  },
  getPassedLength: () => {
    const result = getLessonFinishedLength(get().lesson);
    return result ? result : 0;
  },
  getDisplayedExercise: () => calcDisplayedExercise(get().lesson),
  getDisplayedExerciseOrder: () => {
    return calcDisplayedExercise(get().lesson)?.order;
  },
  getDisplayedExerciseWordAdvance: () => {
    return calcDisplayedExercise(get().lesson)?.wordAdvance;
  },
  getNextExerciseOrder: () => {
    return calcNextExerciseOrder(get().lesson);
  },
  getNumExercisesTotal: () => {
    return get().lesson?.exercises?.length;
  },
  getNumExercisesPassed: () => {
    const exercises = get().lesson?.exercises;
    if (exercises === undefined) return undefined;
    return exercises.reduce(
      (acc, exercise) => acc + (exercise.isFinished ? 1 : 0),
      0
    );
  },
  getIsAnyExerciseDisplayed: () => {
    return calcDisplayedExercise(get().lesson) !== undefined;
  },
  getIsDisplayedExerciseRunning: () => {
    return calcDisplayedExercise(get().lesson)?.isRun;
  },
  getIsDisplayedExerciseFinished: () => {
    return calcDisplayedExercise(get().lesson)?.isFinished;
  },
  runDisplayedExercise: () =>
    set(
      produce((state) => {
        if (!state.lesson?.exercises?.length) return;
        const exercise = calcDisplayedExercise(state.lesson);
        if (exercise) {
          exercise.isRun = true;
          exercise.timestampStarted = Date.now();
          exercise.wordNumber = 1;
        }
      })
    ),
  getDisplayedExerciseName: () => {
    return calcDisplayedExercise(get().lesson)?.name;
  },
  getLessonName: () => {
    return get()?.lesson?.name;
  },
  getDisplayedExerciseDescription: () => {
    return calcDisplayedExercise(get().lesson)?.description;
  },
  pause: () =>
    set(
      produce((state) => {
        if (!state.lesson?.exercises?.length) return;
        const exercise = calcDisplayedExercise(state.lesson);
        if (exercise) exercise.isRun = false;
      })
    ),
  getDisplayedExerciseLength: () => {
    return calcDisplayedExercise(get().lesson)?.length;
  },
  getDisplayedExerciseWordInterval: () => {
    const exercise = calcDisplayedExercise(get().lesson);
    if (exercise?.wordAdvance !== "auto") return undefined;
    return exercise?.wordInterval;
  },
  getDisplayedExerciseDoubleWords: () => {
    const exercise = calcDisplayedExercise(get().lesson);
    return exercise?.doubleWords;
  },
  getDisplayedExerciseRemainingTime: () => {
    const exercise = calcDisplayedExercise(get().lesson);
    if (!exercise?.length) return undefined;
    return Math.round(exercise.length - exercise.msPassed / 1000);
  },
  getDisplayedExerciseProgress: () => {
    const exercise = calcDisplayedExercise(get().lesson);
    if (!exercise?.length) return undefined;
    let result = (exercise.msPassed / (exercise.length * 1000)) * 100;
    if (result > 100) result = 100;
    return result;
  },
  getDisplayedExerciseWordProgress: () => {
    const exercise = calcDisplayedExercise(get().lesson);
    if (!exercise?.length) return undefined;
    return exercise.wordProgress;
  },
  getExerciseListJson: () => {
    const exercises = get().lesson?.exercises;
    if (exercises === undefined) return undefined;
    const list = exercises.map(
      (exercise) => ({ order: exercise.order, name: exercise.name }),
      []
    );
    return JSON.stringify(list);
  },
  jumpToExercise: (order: number) =>
    set(
      produce((state) => {
        const targetExercise = calcExerciseWithOrder(state.lesson, order);
        if (!targetExercise) return;
        const currentExercise = calcDisplayedExercise(state.lesson);
        if (currentExercise) {
          currentExercise.isRun = false;
          currentExercise.isDisplayed = false;
        }
        targetExercise.isRun = false;
        targetExercise.isDisplayed = true;
      })
    ),
  getDisplayedExerciseIsManualScore: () => {
    return calcDisplayedExercise(get().lesson)?.manualScore;
  },
  getDisplayedExerciseScoreCount: () => {
    return calcDisplayedExercise(get().lesson)?.scoreCount;
  },
  addScore: () =>
    set(
      produce((state) => {
        if (!state.lesson?.exercises?.length) return;
        const exercise = calcDisplayedExercise(state.lesson);
        if (!exercise) return;
        if (exercise) exercise.scoreCount++;
        state.globalScoreCount++;
        if (exercise.wordAdvance === "fivewords") {
          if (exercise.scoreCount % 5 === 0) {
            exercise.wordNumber++;
          }
        }
      })
    ),
  getDisplayedExerciseIsAutoWordAdvance: () => {
    return calcDisplayedExercise(get().lesson)?.wordAdvance === "auto";
  },
  getDisplayedExerciseWordNumber: () => {
    return calcDisplayedExercise(get().lesson)?.wordNumber;
  },
}));

export function useLessonActiveExerciseOrder() {
  const lesson = useLessonStore((state) => state.lesson);
  return lesson?.exercises.reduce(
    (acc: number | undefined, exercise: ExerciseStorage) =>
      exercise.isDisplayed ? exercise.order : acc,
    undefined
  );
}

/* export function useLessonActiveExercise(): ExerciseStorage | undefined {
  const lesson = useLessonStore((state) => state.lesson);
  return lesson?.exercises?.reduce(
    (acc: ExerciseStorage | undefined, exercise: ExerciseStorage) =>
      exercise.isDisplayed ? exercise : acc,
    undefined
  );
} */

export function useNextUnisFinishedExercise() {
  const lesson = useLessonStore((state) => state.lesson);
  return lesson?.exercises.reduce(
    (
      acc: ExerciseStorage | undefined,
      exercise: ExerciseStorage
    ): ExerciseStorage | undefined =>
      acc !== undefined ? acc : exercise.isFinished ? acc : exercise,
    undefined
  );
}

export function getExerciseWithOrder(
  exercises: ExerciseStorage[],
  order: number
): ExerciseStorage | undefined {
  const filtered = exercises.filter(
    (exercise: ExerciseStorage): boolean => exercise.order === order
  );
  if (filtered?.length >= 1) return filtered[0];
  return undefined;
}

export function useActiveExerciseOrder(): number | undefined {
  const lesson = useLessonStore((state) => state.lesson);
  return lesson?.exercises.reduce(
    (acc: number | undefined, exercise: ExerciseStorage): number | undefined =>
      acc !== undefined ? acc : exercise.isDisplayed ? exercise.order : acc,
    undefined
  );
}

export function useLessonStatusCode(): string {
  const lesson = useLessonStore((state) => state.lesson);
  if (!lesson || !lesson.exercises) return "";
  return lesson.exercises.reduce(
    (acc: string, exercise: ExerciseStorage, index: number): string =>
      acc + (index !== 0 ? "," : "") + exercise.isFinished
        ? "f"
        : exercise.isDisplayed
        ? "a"
        : "q",
    ""
  );
}

export default useLessonStore;
