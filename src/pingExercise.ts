import { ExerciseStorage } from "./Exercise";

type MutMap = Map<string, string | number | boolean | undefined>;

export interface PairMutation {
  toExercise: MutMap | undefined;
  toLesson: MutMap | undefined;
}

export function pingExercise(exercise: ExerciseStorage): PairMutation {
  // console.log(exercise);
  if (!exercise) return { toExercise: undefined, toLesson: undefined };
  if (!exercise.isRun) return { toExercise: undefined, toLesson: undefined };
  if (!exercise.order) return { toExercise: undefined, toLesson: undefined };
  if (!exercise.isDisplayed)
    return { toExercise: undefined, toLesson: undefined };
  if (!exercise.timestampStarted)
    return { toExercise: undefined, toLesson: undefined };

  const toLesson: MutMap = new Map();
  const toExercise: MutMap = new Map();

  const msPassed = Date.now() - exercise.timestampStarted;

  // const newTimer = Math.round(msPassed / 1000);
  const newProgress = exercise.length
    ? (msPassed / (exercise.length * 1000)) * 100
    : undefined;
  const timeLeft = exercise.length
    ? Math.round(exercise.length - msPassed / 1000)
    : exercise.length;

  toExercise.set("msPassed", msPassed);
  toExercise.set("timeLeft", timeLeft);
  toExercise.set("progress", newProgress);

  const finished = exercise.length ? msPassed > exercise.length * 1000 : true;
  if (finished) {
    toExercise.set("isFinished", finished);
    toExercise.set("isRun", !finished);
  } else {
    const newWordNumber =
      exercise.wordAdvance === "auto" && exercise.wordInterval
        ? Math.floor(Math.floor(msPassed / 1000) / exercise.wordInterval)
        : 0;
    const newWordProgress =
      exercise.wordAdvance === "auto" && exercise.wordInterval
        ? ((msPassed % (exercise.wordInterval * 1000)) /
            (exercise.wordInterval * 1000)) *
          100
        : 0;

    toExercise.set("wordNumber", newWordNumber);
    toExercise.set("wordProgress", newWordProgress);
  }

  return { toExercise, toLesson };
}
