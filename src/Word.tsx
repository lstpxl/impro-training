import { useEffect, useState } from "react";
import useWordStore from "./wordStore";
import useLessonStore from "./lessonStore";

interface WordProps {
  second: boolean;
}
const Word = ({ second }: WordProps) => {
  const word = useWordStore((state) => state.currentWord);
  const secondWord = useWordStore((state) => state.currentSecondWord);
  const [animate, setAnimate] = useState(false);
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRunning = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const displayWord = isDisplayed && isRunning;

  useEffect(() => {
    // TODO start animation from beginning on refresh
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  }, [word]);

  return (
    <div
      className={`grow text-4xl px-8 py-2  rounded-lg text-center lowercase  ${
        displayWord ? " text-white bg-gray-600 " : " text-gray-200 bg-gray-100 "
      } ${animate ? " animate-pop " : ""}`}
    >
      {displayWord ? (second ? secondWord : word) : "impro-training"}
    </div>
  );
};

export default Word;
