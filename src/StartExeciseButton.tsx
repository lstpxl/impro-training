import { Button } from "./components/ui/button";
import { Play } from "lucide-react";
import useLessonStore from "./lessonStore";

const StartExeciseButton = () => {
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
      className="text-lg col-start-1 hover:opacity-60"
      onClick={startExec}
    >
      <Play size={24} className="mr-2" />
      Start execise
    </Button>
  );
};

export default StartExeciseButton;
