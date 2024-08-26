import { useEffect } from "react";
import useLessonStore from "./lessonStore";
// import useWordStore from "./wordStore";

const Interstate = () => {
  const doubleWords = useLessonStore((state) =>
    state.getDisplayedExerciseDoubleWords()
  );
  const wordNumber = useLessonStore((state) =>
    state.getDisplayedExerciseWordNumber()
  );
  const switchWord = useLessonStore((state) => state.switchNextWord);

  useEffect(() => {
    if (wordNumber) switchWord();
  }, [switchWord, wordNumber, doubleWords]);

  return null;
};

export default Interstate;
