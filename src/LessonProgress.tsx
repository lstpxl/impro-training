import { secondsToReadableStr } from "./lib/baseUtils";
import { Progress } from "./components/ui/progress";
import useLessonStore from "./lessonStore";

const LessonProgress = () => {
  const isStarted = useLessonStore((state) => state.isStarted);
  const lessonLength = useLessonStore((state) => state.getTotalLength());
  const lessonPassedLength = useLessonStore((state) => state.getPassedLength());
  const percent = lessonLength
    ? (lessonPassedLength / lessonLength) * 100
    : undefined;
  const percentDisplay =
    percent === undefined ? null : percent > 100 ? 100 : percent;

  const numExercisesTotal = useLessonStore((state) =>
    state.getNumExercisesTotal()
  );
  const numExercisesPassed = useLessonStore((state) =>
    state.getNumExercisesPassed()
  );

  return (
    <div className="mt-2">
      <div className="flex gap-4 justify-between text-gray-500 text-sm mb-1">
        {isStarted ? (
          <>
            <div>
              <span className="mr-2">Lesson progress:</span>
              <span>
                {lessonPassedLength
                  ? secondsToReadableStr(lessonPassedLength)
                  : secondsToReadableStr(0)}
              </span>
              <span className="mx-1">/</span>
              <span>
                {lessonLength ? secondsToReadableStr(lessonLength) : null}
              </span>
            </div>
            <div>
              <span className="font-normal mr-1">
                {numExercisesPassed !== undefined
                  ? Number(numExercisesPassed)
                  : null}
              </span>
              <span className="font-normal mr-1">/</span>
              <span className="font-normal mr-1">
                {numExercisesTotal ? Number(numExercisesTotal) : null}
              </span>
              <span className="">exercises completed</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className=" mr-1">Lesson duration:</span>
              <span className="font-normal">
                {lessonLength ? secondsToReadableStr(lessonLength) : null}
              </span>
            </div>
            <div>
              <span className="font-normal mr-1">
                {numExercisesTotal ? Number(numExercisesTotal) : null}
              </span>
              <span className=" mr-1">exercises</span>
            </div>
          </>
        )}
      </div>
      <Progress
        value={percentDisplay}
        className="w-[100%] h-2 [&>*]:bg-gray-300"
      />
    </div>
  );
};

export default LessonProgress;
