import useSound from "use-sound";
import bellSfx from "@/assets/bell.mp3";
import successSfx from "@/assets/success.mp3";
import wooSfx from "@/assets/woo.mp3";
import { useEffect } from "react";
// import useWordStore from "./wordStore";
import useOptionsStore from "./optionsStore";
import useLessonStore from "./lessonStore";
import { useDidMount } from "./lib/useDidMount";

const SoundPlayerBell = () => {
  const [playBellSound] = useSound(bellSfx);
  const word = useLessonStore((state) => state.currentWord);
  useEffect(() => {
    if (word !== undefined) playBellSound();
  }, [word]);
  return null;
};

const SoundPlayerWoo = () => {
  const [playWooSound] = useSound(wooSfx);
  const scoreAddedTrigger = useLessonStore((state) => state.scoreAddedTrigger);
  useEffect(() => {
    playWooSound();
  }, [scoreAddedTrigger]);
  return null;
};

const SoundPlayerSuccess = () => {
  const [playSuccessSound] = useSound(successSfx);
  const finishedTimestamp = useLessonStore((state) => state.finishedTimestamp);
  useEffect(() => {
    playSuccessSound();
  }, [finishedTimestamp]);
  return null;
};

const SoundPlayer = () => {
  const didMount = useDidMount();
  const playSounds = useOptionsStore((state) => state.playSounds);
  const lessonIsStarted = useLessonStore((state) => state.isStarted);
  const doPlayBell = didMount() && playSounds && lessonIsStarted;
  const doPlaySuccess = didMount() && playSounds && lessonIsStarted;

  return (
    <div>
      {doPlayBell ? <SoundPlayerBell /> : null}
      {doPlaySuccess ? <SoundPlayerSuccess /> : null}
      {doPlayBell ? <SoundPlayerWoo /> : null}
    </div>
  );
};

export default SoundPlayer;
