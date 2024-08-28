import LessonSection from "./LessonSection";
import ExerciseSection from "./ExerciseSection";
import WordSection from "./WordSection";
import ButtonBar from "./ButtonBar";
import SettingsSection from "./SettingsSection";
import Welcome from "./Welcome";
import Header from "./Header";
import Stats from "./Stats";
import History from "./History";
import Finish from "./Finish";

const Page = () => {
  return (
    <div className="max-w-screen-lg flex flex-col w-full md:w-[768px] gap-6 ">
      <Header />
      <LessonSection />
      <Welcome />
      <Finish />
      <ExerciseSection />
      <WordSection />
      <ButtonBar />
      <Stats />
      <History />
      <SettingsSection />
    </div>
  );
};

export default Page;
