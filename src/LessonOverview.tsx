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
import { useTranslation } from "react-i18next";

interface ExShort {
  order: number;
  code: string;
  name: string;
  finished: boolean;
  length: number;
}

interface ContentItemProps {
  exercise: ExShort;
  onClick: (a: number) => void;
}

const ContentItem = ({ exercise, onClick }: ContentItemProps) => {
  const { t } = useTranslation(["exerciseName"]);
  return (
    <li
      value={String(exercise.order)}
      onClick={() => onClick(exercise.order)}
      className="rounded-lg hover:bg-gray-100 cursor-pointer p-2 text-sm flex justify-between items-center gap-2"
    >
      <div className="flex gap-2 items-center justify-start">
        <div className="min-w-6 w-6 h-6">
          {exercise.finished ? <Check /> : null}
        </div>
        <p className="text-left">{`${String(exercise.order)}. ${t(
          exercise.code,
          { ns: "exerciseName" }
        )}`}</p>
      </div>
      <p className="text-right">
        {exercise.length ? secondsToReadableStr(exercise.length) : null}
      </p>
    </li>
  );
};

const LessonOverview = () => {
  const { t } = useTranslation(["exercises"]);
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
                  key={exercise.order}
                  exercise={exercise}
                  onClick={handleJumpToExercise}
                />
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
      {/* {lessonName} */}
      {t(lessonName ? lessonName : "unknownLesson", { ns: "exercises" })}
    </div>
  );
};

export default LessonOverview;
