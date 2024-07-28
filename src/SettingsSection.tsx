import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { TvMinimalPlay } from "lucide-react";
import useOptionsStore from "./optionsStore";

const SettingsSection = () => {
  const playSounds = useOptionsStore((state) => state.playSounds);
  const switchPlaySounds = useOptionsStore((state) => state.togglePlaySounds);

  return (
    <section id="option" className=" px-4 py-2  ">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-500">
          <Switch
            id="sound-on"
            checked={playSounds}
            onCheckedChange={switchPlaySounds}
          />
          <Label htmlFor="sound-on">Sound</Label>
        </div>
        <div className="text-sm text-gray-500">
          <Button
            variant="secondary"
            className="text-gray-500 hover:text-gray-700 underline cursor-pointer hover:opacity-60"
            onClick={() =>
              window.open("https://www.youtube.com/watch?v=Ip33PRAYGrE")
            }
          >
            <TvMinimalPlay className="mr-2" />
            Method explained in russian
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SettingsSection;
