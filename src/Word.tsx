import { useEffect, useState } from "react";
// import useWordStore from "./wordStore";
import useLessonStore from "./lessonStore";
// import { useDidMount } from "./lib/useDidMount";

interface WordProps {
  second: boolean;
}
const Word = ({ second }: WordProps) => {
  // const didMount = useDidMount();
  const word = useLessonStore((state) => state.currentWord);
  const secondWord = useLessonStore((state) => state.currentSecondWord);
  const wordToDisplay = second ? secondWord : word;
  const [animate, setAnimate] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRunning = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const displayWord = isDisplayed && isRunning;

  useEffect(() => {
    // TODO start animation from beginning on refresh
    if (!firstTime) {
      setAnimate(true);
      // console.log("start animation");
      setTimeout(() => {
        setAnimate(false);
        // console.log("stop animation");
      }, 500);
    } else {
      setFirstTime(false);
    }
  }, [word, firstTime]);

  // console.log("animate=", animate);

  return (
    <div
      className={`grow text-4xl px-8 py-2  rounded-lg text-center lowercase  ${
        displayWord ? " text-white bg-gray-600 " : " text-gray-200 bg-gray-100 "
      } ${animate ? " animate-pop " : ""}`}
    >
      {displayWord ? wordToDisplay : "impro 🙊 training"}
    </div>
  );
};

export default Word;
