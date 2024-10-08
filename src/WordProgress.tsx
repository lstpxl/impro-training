import { Progress } from "./components/ui/progress";
import useLessonStore from "./lessonStore";

const WordProgress = () => {
  const isExecActive = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const wordAdvance = useLessonStore((state) =>
    state.getDisplayedExerciseWordAdvance()
  );
  const wordProgress = useLessonStore((state) =>
    state.getDisplayedExerciseWordProgress()
  );

  const display = wordAdvance === "auto" && isExecActive;

  return (
    <div className="mt-1">
      <Progress
        value={display ? wordProgress : null}
        className={`w-[100%] h-1 bg-gray-300 ${display ? "" : "opacity-0"}`}
      ></Progress>
    </div>
  );
};

export default WordProgress;
