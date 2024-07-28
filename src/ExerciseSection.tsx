import { Button } from "./components/ui/button";
import { Pause } from "lucide-react";
import useLessonStore from "./lessonStore";
import ExerciseProgress from "./ExerciseProgress";

const ExerciseSection = () => {
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRunning = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const name = useLessonStore((state) => state.getDisplayedExerciseName());
  const description = useLessonStore((state) =>
    state.getDisplayedExerciseDescription()
  );
  const pause = useLessonStore((state) => state.pause);

  if (!isDisplayed) return null;

  return (
    <section id="execise" className="bg-gray-50 rounded-md p-4">
      <div className="flex justify-between items-center gap-4">
        <div>
          <div className="font-normal text-gray-800">
            {name ? name : "&mdash;"}
          </div>
          <div className="mt-2 italic text-sm text-gray-500 leading-6">
            {description ? description : "&mdash;"}
          </div>
        </div>

        {isRunning && (
          <Button
            variant="secondary"
            className="hover:bg-gray-300 px-3 py-1"
            onClick={pause}
          >
            <Pause size={20} className="mr-2" /> Pause exercise
          </Button>
        )}
      </div>

      <ExerciseProgress />
    </section>
  );
};

export default ExerciseSection;
