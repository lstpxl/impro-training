import { ArrowBigRight } from "lucide-react";
import { Button } from "./components/ui/button";
import useWordStore from "./wordStore";
import useLessonStore from "./lessonStore";

const NextWordButton = () => {
  const switchWord = useWordStore((state) => state.switchNextWord);
  const addWordCount = useLessonStore((state) => state.addWordCount);

  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRun = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const wordAdvance = useLessonStore((state) =>
    state.getDisplayedExerciseWordAdvance()
  );
  const doubleWords = useLessonStore((state) =>
    state.getDisplayedExerciseDoubleWords()
  );

  const display = wordAdvance === "manual" && isDisplayed && isRun;
  if (!display) return null;
  return (
    <Button
      className="text-xl col-start-2 hover:opacity-60"
      onClick={() => {
        switchWord(doubleWords === true);
        addWordCount();
      }}
    >
      <ArrowBigRight size={32} className="mr-2" />
      Next word
    </Button>
  );
};

export default NextWordButton;
