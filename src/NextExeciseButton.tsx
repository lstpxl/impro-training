import { StepForward } from "lucide-react";
import { Button } from "./components/ui/button";
import useLessonStore from "./lessonStore";

const NextExerciseButton = () => {
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
  // const goNext = useLessonStore((state) => state.goNext);
  const jumpToExercise = useLessonStore((state) => state.jumpToExercise);

  console.log("nextOrder", nextOrder);

  if (!isDisplayed || !isFinished || isRun || nextOrder === undefined)
    return null;
  return (
    <Button
      className="text-lg col-start-3 hover:opacity-60"
      onClick={() => jumpToExercise(nextOrder)}
    >
      <StepForward size={24} className="mr-2" />
      Next execise
    </Button>
  );
};

export default NextExerciseButton;
