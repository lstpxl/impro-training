import NextWordButton from "@/NextWordButton";
import ScoreOneButton from "@/ScoreOneButton";
import StartExeciseButton from "@/StartExeciseButton";
import NextExerciseButton from "./NextExeciseButton";

const ButtonBar = () => {
  return (
    <section id="button_bar" className=" my-8 ">
      <div className="grid gap-4 grid-cols-[1fr_2fr_1fr]">
        <StartExeciseButton />
        <NextWordButton />
        <NextExerciseButton />
        <ScoreOneButton />
      </div>
    </section>
  );
};

export default ButtonBar;
