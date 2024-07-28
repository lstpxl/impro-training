import { Progress } from "./components/ui/progress";
import useLessonStore from "./lessonStore";

const ExerciseProgressBar = () => {
  const exerciseProgress = useLessonStore((state) =>
    state.getDisplayedExerciseProgress()
  );

  return <Progress value={exerciseProgress || null} className="w-[100%] h-2" />;
};

export default ExerciseProgressBar;
