import { Play, RotateCcw } from "lucide-react";
import { Button } from "./components/ui/button";

import useLessonStore from "./lessonStore";
import LessonProgress from "./LessonProgress";
import LessonOverview from "./LessonOverview";

const LessonSection = () => {
  const isStarted = useLessonStore((state) => state.isStarted);
  const start = useLessonStore((state) => state.start);
  const reset = useLessonStore((state) => state.restart);

  return (
    <section id="lesson" className="bg-gray-50 rounded-md p-4">
      <div className="flex justify-between items-center gap-4">
        <LessonOverview />
        <div className="flex justify-between items-center gap-2">
          {isStarted ? (
            <Button
              variant="secondary"
              className="hover:bg-gray-300 px-3 py-1"
              onClick={reset}
            >
              <RotateCcw size={20} className="mr-2" /> Restart lesson
            </Button>
          ) : (
            <Button className="hover:bg-gray-300 px-4 py-1" onClick={start}>
              <Play size={20} className="mr-2" /> Start
            </Button>
          )}
        </div>
      </div>
      <LessonProgress />
    </section>
  );
};

export default LessonSection;
