import { Check, Trophy } from "lucide-react";
import { ExerciseScore } from "./ExerciseScore";
import useLessonStore from "./lessonStore";
import { useTranslation } from "react-i18next";

/* function getFullScoring(short: string): string | undefined {
  if (short === "wpm") return "words per minute";
  if (short === "wpm5") return "words per minute*";
  if (short === "cpw") return "clicks per word";
  if (short === "none") return "completed or not";
  return undefined;
} */

const SingleScore = ({ data }: { data: ExerciseScore }) => {
  const { t } = useTranslation(["exerciseName", "exercises"]);
  // const unit = getFullScoring(data.scoring);
  const unit = t(data.scoring, { ns: "exercises" });
  const displayValue = data.scoring !== "none";
  return (
    <>
      <div className="mr-2 col-start-1">
        <Check />
      </div>
      <div className="mr-1 col-start-2">
        {t(data.code, { ns: "exerciseName" })}
      </div>
      <div className="col-start-3">
        {displayValue ? (
          <>
            <span className="font-normal">{data.value.toFixed(2)}</span>
            <span className="">{" " + unit}</span>
          </>
        ) : (
          "complete"
        )}
      </div>
    </>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  const scores = useLessonStore((state) => state.scores);
  const filtered = scores.filter(
    (score) => score.timestamp > Date.now() - 1000 * 60 * 60 * 2
  );

  if (!filtered.length) return null;

  return (
    <section id="stats" className="bg-gray-50 rounded-md p-4 ">
      {!filtered.length ? (
        <div className="text-gray-500 mb-2 ">
          {t("completeExerciseForStats")}
        </div>
      ) : (
        <div className="text-gray-500 grid grid-cols-[40px_1fr_1fr] text-xs ">
          <div className="col-span-3 mb-4 text-sm flex gap-4">
            <Trophy size={20} className="" />
            {t("lessonStats")}:
          </div>
          {filtered.map((score, index) => (
            <SingleScore key={index} data={score} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Stats;
