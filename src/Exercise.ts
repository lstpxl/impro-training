export interface ExerciseRule {
  order: number;
  name: string;
  length: number;
  wordAdvance: string;
  wordInterval: number | undefined;
  doubleWords: boolean | undefined;
  manualScore: boolean;
  description: string;
  scoring: string;
}
export const defaultExerciseRule: ExerciseRule = {
  order: 0,
  name: "",
  length: 0,
  wordAdvance: "manual",
  manualScore: false,
  wordInterval: undefined,
  doubleWords: false,
  description: "",
  scoring: "none",
};
export interface ExerciseState {
  isDisplayed: boolean;
  isRun: boolean;
  isFinished: boolean;
  time: number;
  timerId: number | undefined;
  wordTimerId: number | undefined;
  timestampStarted: number | undefined;
  timer: number;
  progress: number | undefined;
  wordProgress: number | undefined;
  timeLeft: number | undefined;
  wordNumber: number;
  scoreCount: number;
  wordCount: number;
  msPassed: number;
}
export const defaultExerciseState: ExerciseState = {
  isDisplayed: false,
  isRun: false,
  isFinished: false,
  time: 0,
  timerId: undefined,
  wordTimerId: undefined,
  timestampStarted: undefined,
  timer: 0,
  progress: undefined,
  timeLeft: undefined,
  wordNumber: 0,
  wordProgress: 0,
  scoreCount: 0,
  wordCount: 0,
  msPassed: 0,
};

export type ExerciseStorage = ExerciseRule & ExerciseState;
