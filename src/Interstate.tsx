import { useEffect } from "react";
import useLessonStore from "./lessonStore";
import useWordStore from "./wordStore";

const Interstate = () => {
  const lesson = useLessonStore((state) => state.lesson);
  const initLesson = useLessonStore((state) => state.init);
  // const activeExercise = useLessonStore((state) => state.activeExercise);
  const statusCodeStr = useLessonStore((state) => state.status);
  // const orderInExercise = useLessonStore((state) => state.getDisplayedExerciseOrder());

  const wordNumber = useLessonStore((state) =>
    state.getDisplayedExerciseWordNumber()
  );
  const switchWord = useWordStore((state) => state.switchNextWord);
  // const wordTimestamp = useLessonStore((state) => state.wordTimestamp);

  useEffect(() => {
    if (wordNumber) switchWord();
  }, [switchWord, wordNumber]);

  useEffect(() => {
    if (initLesson && lesson === undefined) {
      console.log("Initializing lesson...");
      initLesson();
    }
  }, [lesson, initLesson]);

  useEffect(() => {
    console.log("statusCodeStr =", statusCodeStr);
  }, [statusCodeStr]);

  /*   useEffect(() => {
    console.log("activeExercise.order =", activeExercise?.order);
    console.log("orderInExercise =", orderInExercise);
    if (activeExercise && orderInExercise !== activeExercise?.order) {
      console.log("loading exercise =", activeExercise);
      loadExercise(activeExercise);
    }
  }, [activeExercise]); */

  return null;
};

export default Interstate;
