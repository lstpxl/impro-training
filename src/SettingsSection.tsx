import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { TvMinimalPlay } from "lucide-react";
import useOptionsStore from "./optionsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { languageList } from "./lib/i18n";
import useLessonStore from "./lessonStore";

const LanguageSelector = () => {
  const language = useLessonStore((state) => state.language);
  const switchLanguage = useLessonStore((state) => state.switchLanguage);

  const handleLanguageChange = (lng: string) => {
    switchLanguage(lng);
    i18next.changeLanguage(lng, (err, t) => {
      if (err)
        return console.log(
          "something went wrong while switching language",
          err
        );
      // t("key"); // -> same as i18next.t
      console.log(t("test_key"));
    });
  };

  return (
    <Select
      onValueChange={handleLanguageChange}
      defaultValue={language}
      value={language}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languageList.map((item) => (
          <SelectItem key={item.code} value={item.code}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const SettingsSection = () => {
  const playSounds = useOptionsStore((state) => state.playSounds);
  const switchPlaySounds = useOptionsStore((state) => state.togglePlaySounds);
  const { t } = useTranslation();

  return (
    <section id="option" className=" px-4 py-2  ">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="sound-on"
              checked={playSounds}
              onCheckedChange={switchPlaySounds}
            />
            <Label htmlFor="sound-on">{t("soundLabel")}</Label>
          </div>
          <LanguageSelector />
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
            {t("methodLinkLabel")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SettingsSection;
