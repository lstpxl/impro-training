import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import useLessonStore from "./lessonStore";

const ScoreOneButton = () => {
  const isRun = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const manualScore = useLessonStore((state) =>
    state.getDisplayedExerciseIsManualScore()
  );
  const scoreCount = useLessonStore((state) =>
    state.getDisplayedExerciseScoreCount()
  );
  const addScore = useLessonStore((state) => state.addScore);

  const display = manualScore && isRun;
  if (!display) return null;
  return (
    <Button className="text-lg col-start-2 hover:opacity-60" onClick={addScore}>
      {scoreCount ? `${scoreCount}` : <Plus size={24} />}
    </Button>
  );
};

export default ScoreOneButton;
