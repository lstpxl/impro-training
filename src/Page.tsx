import LessonSection from "./LessonSection";
import ExerciseSection from "./ExerciseSection";
import WordSection from "./WordSection";
import ButtonBar from "./ButtonBar";
import SettingsSection from "./SettingsSection";
import Welcome from "./Welcome";
import Header from "./Header";
import Stats from "./Stats";

const Page = () => {
  return (
    <div className="max-w-screen-lg flex flex-col w-full md:w-[768px] gap-6 ">
      <Header />
      <LessonSection />
      <Welcome />
      <ExerciseSection />
      <WordSection />
      <ButtonBar />
      <Stats />
      <SettingsSection />
    </div>
  );
};

export default Page;
