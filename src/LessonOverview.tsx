import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

import useLessonStore from "./lessonStore";
import { Check, ScrollText } from "lucide-react";
import { secondsToReadableStr } from "./lib/baseUtils";

interface ExShort {
  order: number;
  name: string;
  finished: boolean;
  length: number;
}

interface ContentItemProps {
  exercise: ExShort;
  onClick: (a: number) => void;
}

const ContentItem = ({ exercise, onClick }: ContentItemProps) => {
  return (
    <li
      key={exercise.order}
      value={String(exercise.order)}
      onClick={() => onClick(exercise.order)}
      className="rounded-lg hover:bg-gray-100 cursor-pointer p-2 text-sm flex justify-between items-center gap-2"
    >
      <div className="flex gap-2 items-center justify-start">
        <div className="min-w-6 w-6 h-6">
          {exercise.finished ? <Check /> : null}
        </div>
        <p className="text-left">{`${String(exercise.order)}. ${
          exercise.name
        }`}</p>
      </div>
      <p className="text-right">
        {exercise.length ? secondsToReadableStr(exercise.length) : null}
      </p>
    </li>
  );
};

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
                <ContentItem
                  exercise={exercise}
                  onClick={handleJumpToExercise}
                />
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
