import { Play, RotateCcw } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import useLessonStore from "./lessonStore";
import LessonProgress from "./LessonProgress";

const LessonContent = () => {
  const numExercisesTotal = useLessonStore((state) =>
    state.getNumExercisesTotal()
  );
  const filled = numExercisesTotal && numExercisesTotal > 0;
  const isStarted = useLessonStore((state) => state.isStarted);
  const lessonName = useLessonStore((state) => state.getLessonName());
  const activeOrder = useLessonStore((state) =>
    state.getDisplayedExerciseOrder()
  );
  const exerciseListStr = useLessonStore((state) =>
    state.getExerciseListJson()
  );
  const jumpToExercise = useLessonStore((state) => state.jumpToExercise);
  const exerciseList = exerciseListStr ? JSON.parse(exerciseListStr) : [];

  function handleJumpToExercise(order: string) {
    // console.log("TODO jump to ", order);
    jumpToExercise(Number(order));
  }

  interface ExShort {
    order: number;
    name: string;
  }

  /*   console.log("activeOrder", activeOrder);
  console.log("filled", filled);
  console.log("isStarted", isStarted);
  console.log("lessonName", lessonName);
 */
  return (
    <Select
      onValueChange={handleJumpToExercise}
      defaultValue={filled ? String(1) : undefined}
      value={
        activeOrder
          ? String(activeOrder)
          : undefined /* activeEx ? String(activeEx) : undefined */
      }
    >
      <SelectTrigger className="w-[400px]">
        <SelectValue placeholder={isStarted ? undefined : lessonName} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>{lessonName}</SelectLabel> */}
          {exerciseList.map((exercise: ExShort) => (
            <SelectItem
              key={exercise.order}
              value={String(exercise.order)}
            >{`${String(exercise.order)}) ${exercise.name}`}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const LessonSection = () => {
  const isStarted = useLessonStore((state) => state.isStarted);
  const start = useLessonStore((state) => state.start);
  const reset = useLessonStore((state) => state.init);

  return (
    <section id="lesson" className="bg-gray-50 rounded-md p-4">
      <div className="flex justify-between items-center gap-4">
        <LessonContent />
        <div className="flex justify-between items-center gap-2">
          {isStarted ? (
            <Button
              variant="secondary"
              className="hover:bg-gray-300 px-3 py-1"
              onClick={reset}
            >
              <RotateCcw size={20} className="mr-2" /> Restart lesson
            </Button>
          ) : (
            <Button className="hover:bg-gray-300 px-4 py-1" onClick={start}>
              <Play size={20} className="mr-2" /> Start
            </Button>
          )}
        </div>
      </div>
      <LessonProgress />
    </section>
  );
};

export default LessonSection;
