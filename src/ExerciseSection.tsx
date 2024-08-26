import { Button } from "./components/ui/button";
import { Ban } from "lucide-react";
import useLessonStore from "./lessonStore";
import ExerciseProgress from "./ExerciseProgress";
import { useTranslation } from "react-i18next";

const ExerciseSection = () => {
  const { t } = useTranslation([
    "translation",
    "exercises",
    "exerciseName",
    "exerciseDesc",
  ]);
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isRunning = useLessonStore((state) =>
    state.getIsDisplayedExerciseRunning()
  );
  // const name = useLessonStore((state) => state.getDisplayedExerciseName());
  /*   const description = useLessonStore((state) =>
    state.getDisplayedExerciseDescription()
  ); */
  const code = useLessonStore((state) => state.getDisplayedExerciseCode());
  const abort = useLessonStore((state) => state.abortExercise);

  if (!isDisplayed) return null;

  return (
    <section id="execise" className="bg-gray-50 rounded-md p-4">
      <div className="grid items-center gap-4 grid-cols-[minmax(100px,auto)_auto_minmax(100px,auto)]">
        <div className="font-normal text-gray-800 text-center col-start-2">
          {code ? t(code, { ns: "exerciseName" }) : "&mdash;"}
        </div>
        {isRunning && (
          <Button
            variant="secondary"
            className="hover:bg-gray-300 px-3 py-1 col-start-3"
            onClick={abort}
          >
            <Ban size={20} className="mr-2" /> {t("abort")}
          </Button>
        )}
      </div>
      <div
        className="mt-2 italic text-sm text-gray-600 leading-6 bg-white px-12 py-3 rounded-sm
         "
      >
        {code ? t(code, { ns: "exerciseDesc" }) : "&mdash;"}
      </div>

      <ExerciseProgress />
    </section>
  );
};

export default ExerciseSection;
