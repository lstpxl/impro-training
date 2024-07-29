import Word from "./Word";
import WordProgress from "./WordProgress";
import useLessonStore from "./lessonStore";

const WordSection = () => {
  const isDisplayed = useLessonStore((state) =>
    state.getIsAnyExerciseDisplayed()
  );
  const isDoubleWords = useLessonStore((state) =>
    state.getDisplayedExerciseDoubleWords()
  );

  if (!isDisplayed) return null;

  return (
    <section id="word" className={"mb-1"}>
      {isDoubleWords ? (
        <div className="flex justify-between gap-4">
          <Word second={false} />
          <Word second={true} />
        </div>
      ) : (
        <Word second={false} />
      )}
      <WordProgress />
    </section>
  );
};

export default WordSection;
