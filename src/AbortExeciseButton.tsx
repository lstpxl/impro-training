import { Button } from "./components/ui/button";
import { Ban } from "lucide-react";
import useLessonStore from "./lessonStore";

const AbortExeciseButton = () => {
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRun = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const pause = useLessonStore((state) => state.pause);

  if (!isRun || !isDisplayed) return null;

  return (
    <Button
      variant="destructive"
      className="text-lg col-start-3 hover:opacity-60"
      onClick={pause}
    >
      <Ban size={24} className="mr-2" />
      Abort exercise
    </Button>
  );
};

export default AbortExeciseButton;
