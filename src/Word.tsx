import { AnimationEvent, useEffect, useRef, useState } from "react";
import useLessonStore from "./lessonStore";

interface WordProps {
  second: boolean;
}
const Word = ({ second }: WordProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [displayedWord, setDisplayedWord] = useState<string | undefined>(
    undefined
  );
  const word = useLessonStore((state) => state.currentWord);
  const secondWord = useLessonStore((state) => state.currentSecondWord);
  const wordToDisplay = second ? secondWord : word;
  const [animateClass, setAnimateClass] = useState(false);
  const [timestampFired, setTimestampFired] = useState(0);
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRunning = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const displayWord = isDisplayed && isRunning;

  const fireAnimation = () => {
    const elem = elementRef.current;
    if (elem !== null) {
      elem.style.animation = "none";
      elem.offsetHeight;
      // @ts-expect-error: Type 'null' is not assignable to type 'string'
      elem.style.animation = null;
      setTimestampFired(Date.now());
      setAnimateClass(true);
    }
  };

  const tryClearAnimation = () => {
    if (timestampFired + 500 < Date.now()) {
      setAnimateClass(false);
    }
  };

  useEffect(() => {
    if (displayedWord !== wordToDisplay) {
      setDisplayedWord(wordToDisplay || undefined);
      if (wordToDisplay && wordToDisplay.length > 0) fireAnimation();
    }
  }, [wordToDisplay, displayedWord]);

  const handleAnimationEvent = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.type === "animationend") {
      tryClearAnimation();
    }
  };

  return (
    <div
      ref={elementRef}
      className={`grow text-4xl px-8 py-2  rounded-lg text-center lowercase  ${
        displayWord ? " text-white bg-gray-600 " : " text-gray-200 bg-gray-100 "
      } ${animateClass ? " animate-pop " : ""}`}
      onAnimationEnd={handleAnimationEvent}
      // onAnimationStart={handleAnimationEvent}
    >
      {displayWord ? displayedWord : "impro 🙊 training"}
    </div>
  );
};

export default Word;
