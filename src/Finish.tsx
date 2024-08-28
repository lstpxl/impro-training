import { useTranslation } from "react-i18next";
import { PartyPopper } from "lucide-react";
import useLessonStore from "./lessonStore";

export default function Finish() {
  const { t } = useTranslation();
  const numExercisesTotal = useLessonStore((state) =>
    state.getNumExercisesTotal()
  );
  const numExercisesPassed = useLessonStore((state) =>
    state.getNumExercisesPassed()
  );

  if (numExercisesPassed === undefined || numExercisesTotal === undefined)
    return null;
  const isFinished = numExercisesPassed >= numExercisesTotal;
  if (!isFinished) return null;
  return (
    <section
      id="welcome"
      className="bg-gray-50 rounded-md p-4 text-center flex flex-col items-center gap-4"
    >
      <PartyPopper size={40} />
      <div>{t("finishCongratulation")}</div>
    </section>
  );
}
