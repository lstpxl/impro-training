import LessonSection from "./LessonSection";
import ExerciseSection from "./ExerciseSection";
import WordSection from "./WordSection";
import ButtonBar from "./ButtonBar";
import SettingsSection from "./SettingsSection";
import Welcome from "./Welcome";

const Page = () => {
  return (
    <div className="max-w-screen-lg flex flex-col w-full md:w-[768px] gap-4 ">
      <header className=" px-4 py-2 ">
        <h1 className="text-2xl text-gray-400">impro-training</h1>
      </header>

      <LessonSection />
      <Welcome />
      <ExerciseSection />
      <WordSection />
      <ButtonBar />

      <section id="stats" className="bg-gray-50 rounded-md p-4 ">
        <div className="text-sm text-gray-500">
          Current exercise statistics... avg(score/words)
        </div>
      </section>

      <SettingsSection />
    </div>
  );
};

export default Page;
