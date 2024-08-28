import { useTranslation } from "react-i18next";
import { CircleStop, RotateCcw } from "lucide-react";
import { Button } from "./components/ui/button";
import useLessonStore from "./lessonStore";
import LessonProgress from "./LessonProgress";
import LessonOverview from "./LessonOverview";

const QuitLessonButton = ({ reset }: { reset: () => void }) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="secondary"
      className="hover:bg-gray-300 px-3 py-4 flex gap-2"
      onClick={reset}
    >
      <CircleStop size={20} />
      <div className="text-wrap text-left">{t("quitLesson")}</div>
    </Button>
  );
};

const RestartLessonButton = ({ restart }: { restart: () => void }) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="secondary"
      className="hover:bg-gray-300 px-3 py-4 flex gap-2"
      onClick={restart}
    >
      <RotateCcw size={20} />
      <div className="text-wrap text-left">{t("restartLesson")}</div>
    </Button>
  );
};

const LessonSection = () => {
  const isStarted = useLessonStore((state) => state.isStarted);
  const reset = useLessonStore((state) => state.reset);
  const restart = useLessonStore((state) => state.restart);

  const numExercisesTotal = useLessonStore((state) =>
    state.getNumExercisesTotal()
  );
  const numExercisesPassed = useLessonStore((state) =>
    state.getNumExercisesPassed()
  );
  const isFinished =
    numExercisesTotal !== undefined &&
    numExercisesPassed !== undefined &&
    numExercisesPassed >= numExercisesTotal;

  return (
    <section id="lesson" className="bg-gray-50 rounded-md p-4">
      <div className="flex justify-between items-center gap-4">
        <LessonOverview />

        <div className="flex justify-between items-center gap-2">
          {isStarted && !isFinished ? <QuitLessonButton reset={reset} /> : null}
          {isStarted && isFinished ? (
            <RestartLessonButton restart={restart} />
          ) : null}
        </div>
      </div>
      <LessonProgress />
    </section>
  );
};

export default LessonSection;
