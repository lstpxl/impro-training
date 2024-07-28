import { ExerciseStorage } from "./Exercise";

export function pingExercise(exercise: ExerciseStorage) {
  if (!exercise) return {};
  if (!exercise.isRun) return {};
  if (!exercise.order) return {};
  if (!exercise.isDisplayed) return {};
  if (!exercise.timestampStarted) return {};

  const toLesson = {};
  let toExercise = {};

  const msPassed = Date.now() - exercise.timestampStarted;

  // const newTimer = Math.round(msPassed / 1000);
  const newProgress = exercise.length
    ? (msPassed / (exercise.length * 1000)) * 100
    : undefined;
  const timeLeft = exercise.length
    ? Math.round(exercise.length - msPassed / 1000)
    : exercise.length;

  toExercise = {
    ...toExercise,
    msPassed: msPassed,
    timeLeft: timeLeft,
    progress: newProgress,
  };

  const finished = exercise.length ? msPassed > exercise.length * 1000 : true;
  if (finished) {
    // console.log("Report to lesson exercise");
    toExercise = {
      ...toExercise,
      isFinished: finished,
      isRun: !finished,
      // justFinished: true,
    };
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

    toExercise = {
      ...toExercise,
      wordNumber: newWordNumber,
      wordProgress: newWordProgress,
    };
    // toLesson = { ...toLesson, wordTimestamp: Date.now() };
  }

  return { toExercise, toLesson };
}
