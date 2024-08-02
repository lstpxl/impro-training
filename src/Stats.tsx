import { Check } from "lucide-react";
import { ExerciseScore } from "./ExerciseScore";
import useLessonStore from "./lessonStore";

function getFullScoring(short: string): string | undefined {
  if (short === "wpm") return "words per minute";
  if (short === "wpm5") return "words per minute*";
  if (short === "cpw") return "clicks per word";
  if (short === "none") return "completed or not";
  return undefined;
}

const SingleScore = ({ data }: { data: ExerciseScore }) => {
  console.log(data);
  const unit = getFullScoring(data.scoring);
  const displayValue = data.scoring !== "none";
  return (
    <>
      <div className="mr-2 col-start-1">
        <Check />
      </div>
      <div className="mr-1 col-start-2">{data.name}</div>
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
  const scores = useLessonStore((state) => state.scores);
  const filtered = scores.filter(
    (score) => score.timestamp > Date.now() - 1000 * 60 * 60 * 2
  );

  // store filtered to localStorage

  if (!filtered.length) return null;

  return (
    <section id="stats" className="bg-gray-50 rounded-md p-4 ">
      {!filtered.length ? (
        <div className="text-gray-500 mb-2 ">
          Complete at least one exercise to see statistics.
        </div>
      ) : (
        <div className="text-gray-500 grid grid-cols-[40px_1fr_1fr] text-xs ">
          <div className="col-span-3 mb-4 text-sm">
            Current lesson statistics:
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
