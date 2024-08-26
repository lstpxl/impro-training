import { Button } from "./components/ui/button";
import { Play } from "lucide-react";
import useLessonStore from "./lessonStore";
import { useTranslation } from "react-i18next";

const StartExeciseButton = () => {
  const { t } = useTranslation();
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRun = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const isFinished = useLessonStore((state) =>
    state.getIsDisplayedExerciseFinished()
  );
  const startExec = useLessonStore((state) => state.runDisplayedExercise);

  if (isRun || !isDisplayed || isFinished) return null;
  return (
    <Button
      className="text-base col-start-1 hover:opacity-60"
      onClick={startExec}
    >
      <Play size={24} className="mr-2" />
      {t("startExecise")}
    </Button>
  );
};

export default StartExeciseButton;
