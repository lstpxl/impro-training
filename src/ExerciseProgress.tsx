import { secondsToReadableStr } from "./lib/baseUtils";
import useLessonStore from "./lessonStore";
import ExerciseProgressBar from "./ExerciseProgressBar";
import { useTranslation } from "react-i18next";

const ExerciseProgress = () => {
  const { t } = useTranslation();
  const isRunning = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  const length = useLessonStore((state) => state.getDisplayedExerciseLength());
  const wordInterval = useLessonStore((state) =>
    state.getDisplayedExerciseWordInterval()
  );
  const timeLeft = useLessonStore((state) =>
    state.getDisplayedExerciseRemainingTime()
  );

  return (
    <div className="mt-2">
      <div className="flex gap-4 justify-between text-gray-500 text-sm mb-1">
        {isRunning ? (
          <>
            <div>
              <span className="mr-2">{t("exerciseProgress")}:</span>
              <span className="font-normal mr-1">
                {length && timeLeft !== undefined
                  ? secondsToReadableStr(length - timeLeft)
                  : null}
              </span>
              <span className="mr-1"> / </span>
              <span className="font-normal mr-1">
                {length ? secondsToReadableStr(length) : null}
              </span>
            </div>
            <div>
              <span className="font-normal mr-1">
                {timeLeft !== undefined ? secondsToReadableStr(timeLeft) : null}
              </span>
              <span className="">{t("left")}</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className=" mr-1">{t("exerciseDuration")}:</span>
              <span className="font-normal">
                {length ? secondsToReadableStr(length) : null}
              </span>
            </div>
            <div>
              {wordInterval ? (
                <>
                  <span className=" mr-1">{t("wordChangeInterval")}:</span>
                  <span className="font-normal">
                    {length ? secondsToReadableStr(wordInterval) : null}
                  </span>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
      <ExerciseProgressBar />
    </div>
  );
};

export default ExerciseProgress;
