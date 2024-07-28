import Word from "./Word";
import WordProgress from "./WordProgress";
import useLessonStore from "./lessonStore";

const WordSection = () => {
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );

  if (!isDisplayed) return null;

  return (
    <section id="word" className="">
      <Word />
      <WordProgress />
    </section>
  );
};

export default WordSection;
