import { ExerciseStorage } from "./Exercise";
import { ExerciseScore } from "./ExerciseScore";

export function calcScore(exercise: ExerciseStorage): ExerciseScore {
  let score = 0;
  if (exercise.scoring === "none") {
    score = 1;
  }
  if (exercise.scoring === "wpm") {
    if (exercise.length > 0) {
      score = exercise.wordCount / (exercise.length / 60);
    }
  }
  if (exercise.scoring === "cpw") {
    if (
      exercise.length > 0 &&
      exercise.wordInterval &&
      exercise.wordInterval > 0
    ) {
      score = exercise.scoreCount / (exercise.length / exercise.wordInterval);
    }
  }
  if (exercise.scoring === "wpm5") {
    if (exercise.length > 0) {
      score = exercise.scoreCount / 5 / (exercise.length / 60);
    }
  }
  return {
    exerciseId: exercise.order,
    name: exercise.name,
    scoring: exercise.scoring,
    value: score,
    timestamp: Date.now(),
  };
}
