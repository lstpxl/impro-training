import useLessonStore from "./lessonStore";

const Welcome = () => {
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );

  if (isDisplayed) return null;
  return (
    <section id="welcome" className="bg-gray-50 rounded-md p-4">
      Welcome! Start lesson to display first exercise.
    </section>
  );
};

export default Welcome;
