import { useEffect } from "react";
import useLessonStore from "./lessonStore";
import useWordStore from "./wordStore";

const Interstate = () => {
  const lesson = useLessonStore((state) => state.lesson);
  const initLesson = useLessonStore((state) => state.init);
  const statusCodeStr = useLessonStore((state) => state.status);

  const doubleWords = useLessonStore((state) =>
    state.getDisplayedExerciseDoubleWords()
  );
  const wordNumber = useLessonStore((state) =>
    state.getDisplayedExerciseWordNumber()
  );
  const switchWord = useWordStore((state) => state.switchNextWord);

  useEffect(() => {
    if (wordNumber) switchWord(doubleWords === true);
  }, [switchWord, wordNumber, doubleWords]);

  useEffect(() => {
    if (initLesson && lesson === undefined) {
      console.log("Initializing lesson...");
      initLesson();
    }
  }, [lesson, initLesson]);

  useEffect(() => {
    console.log("statusCodeStr =", statusCodeStr);
  }, [statusCodeStr]);

  return null;
};

export default Interstate;
