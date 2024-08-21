import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

import useLessonStore from "./lessonStore";
import { Check, ScrollText } from "lucide-react";

const LessonOverview = () => {
  const numExercisesTotal = useLessonStore((state) =>
    state.getNumExercisesTotal()
  );
  const filled = numExercisesTotal && numExercisesTotal > 0;
  const lessonName = useLessonStore((state) => state.getLessonName());
  const exerciseListStr = useLessonStore((state) =>
    state.getExerciseListJson()
  );
  const jumpToExercise = useLessonStore((state) => state.jumpToExercise);
  const exerciseList = exerciseListStr ? JSON.parse(exerciseListStr) : [];
  const [open, setOpen] = useState(false);

  function handleJumpToExercise(order: number) {
    setOpen(false);
    jumpToExercise(Number(order));
  }

  interface ExShort {
    order: number;
    name: string;
    finished: boolean;
  }

  if (!filled) return null;

  return (
    <div className="flex items-center gap-4 ">
      <Popover open={open} onOpenChange={() => setOpen(!open)}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <ScrollText />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="md:w-[400px] lg:w-[600px]">
          <div className="grid gap-4">
            <ul className="grid gap-1 lg:grid-cols-2">
              {exerciseList.map((exercise: ExShort) => (
                <li
                  key={exercise.order}
                  value={String(exercise.order)}
                  onClick={() => handleJumpToExercise(exercise.order)}
                  className="rounded-lg hover:bg-gray-100 cursor-pointer p-2 text-sm flex justify-between items-center gap-2"
                >
                  {`${String(exercise.order)}. ${exercise.name}`}

                  {exercise.finished ? <Check /> : null}
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
      {lessonName}
    </div>
  );
};

export default LessonOverview;
