import AbortExeciseButton from "@/AbortExeciseButton";
import NextWordButton from "@/NextWordButton";
import ScoreOneButton from "@/ScoreOneButton";
import StartExeciseButton from "@/StartExeciseButton";
import NextExerciseButton from "./NextExeciseButton";

const ButtonBar = () => {
  return (
    <section id="button_bar" className=" my-8 ">
      <div className="grid grid-cols-3 gap-4">
        <StartExeciseButton />
        <NextWordButton />
        <AbortExeciseButton />
        <NextExerciseButton />
        <ScoreOneButton />
      </div>
    </section>
  );
};

export default ButtonBar;
