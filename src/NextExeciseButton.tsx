import { StepForward } from "lucide-react";
import { Button } from "./components/ui/button";
import useLessonStore from "./lessonStore";
import { useTranslation } from "react-i18next";

const NextExerciseButton = () => {
  const { t } = useTranslation();
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isFinished = useLessonStore((state) =>
    state.getIsDisplayedExerciseFinished()
  );
  const isRun = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const nextOrder = useLessonStore((state) => state.getNextExerciseOrder());
  const jumpToExercise = useLessonStore((state) => state.jumpToExercise);

  if (!isDisplayed || !isFinished || isRun || nextOrder === undefined)
    return null;

  return (
    <Button
      className="text-base col-start-3 hover:opacity-60"
      onClick={() => jumpToExercise(nextOrder)}
    >
      <StepForward size={24} className="mr-2" />
      Next execise {t("nextExecise")}
    </Button>
  );
};

export default NextExerciseButton;
