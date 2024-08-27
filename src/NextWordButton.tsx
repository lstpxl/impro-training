import { ArrowBigRight } from "lucide-react";
import { Button } from "./components/ui/button";
// import useWordStore from "./wordStore";
import useLessonStore from "./lessonStore";
import { useTranslation } from "react-i18next";

const NextWordButton = () => {
  const { t } = useTranslation();
  const switchWord = useLessonStore((state) => state.switchNextWord);
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
  /*   const doubleWords = useLessonStore((state) =>
    state.getDisplayedExerciseDoubleWords()
  ); */

  const display = wordAdvance === "manual" && isDisplayed && isRun;
  if (!display) return null;
  return (
    <Button
      className="text-lg col-start-2 hover:opacity-60 flex gap-2"
      onClick={() => {
        switchWord();
        addWordCount();
      }}
    >
      <ArrowBigRight size={32} className="mr-2" />
      <div className="text-wrap text-left">{t("nextWord")}</div>
    </Button>
  );
};

export default NextWordButton;
