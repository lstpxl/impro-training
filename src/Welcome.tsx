import { Play } from "lucide-react";
import { Button } from "./components/ui/button";
import useLessonStore from "./lessonStore";
import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const start = useLessonStore((state) => state.start);

  if (isDisplayed) return null;
  return (
    <section
      id="welcome"
      className="bg-gray-50 rounded-md p-4 text-center flex flex-col gap-4"
    >
      <p>{t("welcome")}</p>
      <Button className="hover:bg-gray-300 px-4 py-1" onClick={start}>
        <Play size={20} className="mr-2" /> {t("start")}
      </Button>
    </section>
  );
};

export default Welcome;
