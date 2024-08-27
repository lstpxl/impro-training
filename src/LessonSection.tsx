import { useTranslation } from "react-i18next";
import { CircleStop } from "lucide-react";
import { Button } from "./components/ui/button";
import useLessonStore from "./lessonStore";
import LessonProgress from "./LessonProgress";
import LessonOverview from "./LessonOverview";

const LessonSection = () => {
  const { t } = useTranslation();
  const isStarted = useLessonStore((state) => state.isStarted);
  const reset = useLessonStore((state) => state.restart);

  return (
    <section id="lesson" className="bg-gray-50 rounded-md p-4">
      <div className="flex justify-between items-center gap-4">
        <LessonOverview />

        <div className="flex justify-between items-center gap-2">
          {isStarted ? (
            <Button
              variant="secondary"
              className="hover:bg-gray-300 px-3 py-4 flex gap-2"
              onClick={reset}
            >
              <CircleStop size={20} />
              <div className="text-wrap text-left">{t("quitLesson")}</div>
            </Button>
          ) : null}
        </div>
      </div>
      <LessonProgress />
    </section>
  );
};

export default LessonSection;
