import { Play } from "lucide-react";
import { Button } from "./components/ui/button";
import useLessonStore from "./lessonStore";

const Welcome = () => {
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
      <p>Welcome! Start lesson to display first exercise.</p>
      <Button className="hover:bg-gray-300 px-4 py-1" onClick={start}>
        <Play size={20} className="mr-2" /> Start
      </Button>
    </section>
  );
};

export default Welcome;
