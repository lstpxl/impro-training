import { useEffect, useState } from "react";
import useWordStore from "./wordStore";
import useLessonStore from "./lessonStore";

const Word = () => {
  const word = useWordStore((state) => state.currentWord);
  const [animate, setAnimate] = useState(false);
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRunning = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  /*   const wordNumber = useLessonStore((state) =>
    state.getDisplayedExerciseWordNumber()
  ); */

  const displayWord = isDisplayed && isRunning;

  /*   useEffect(() => {
    if (displayWord) switchWord();
  }, [switchWord, wordNumber, displayWord]); */

  useEffect(() => {
    setAnimate(true);
    const newTimer = setTimeout(() => {
      setAnimate(false);
      // if (timerId) {
      //   clearTimeout(timerId);
      // }
    }, 500);
    // if (timerId) {
    //   clearTimeout(timerId);
    //   setTimerId(newTimer);
    // }
    console.log("newTimerId", newTimer);
  }, [word]);

  console.log("Word rerender");
  console.log("animate=", animate);

  return (
    <div
      className={`text-4xl px-8 py-2  rounded-lg text-center lowercase mb-1 ${
        displayWord ? " text-white bg-gray-600 " : " text-gray-200 bg-gray-100 "
      } ${animate ? " animate-pop " : ""}`}
    >
      {displayWord ? word : "impro-training"}
    </div>
  );
};

export default Word;
