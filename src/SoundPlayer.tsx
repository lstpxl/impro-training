import useSound from "use-sound";
import bellSfx from "@/assets/bell.mp3";
import successSfx from "@/assets/success.mp3";
import wooSfx from "@/assets/woo.mp3";
import { useEffect, useRef } from "react";
import useWordStore from "./wordStore";
import useOptionsStore from "./optionsStore";
import useLessonStore from "./lessonStore";

function useDidMount() {
  const mountRef = useRef(false);
  useEffect(() => {
    mountRef.current = true;
  }, []);
  return () => mountRef.current;
}

const SoundPlayerBell = () => {
  const [playBellSound] = useSound(bellSfx);
  const word = useWordStore((state) => state.currentWord);
  useEffect(() => {
    playBellSound();
    console.log("bell sound here");
  }, [word]);
  return null;
};

const SoundPlayerWoo = () => {
  const [playWooSound] = useSound(wooSfx);
  const globalScoreCount = useLessonStore((state) => state.globalScoreCount);
  useEffect(() => {
    playWooSound();
    console.log("woo sound here");
  }, [globalScoreCount]);
  return null;
};

const SoundPlayerSuccess = () => {
  const [playSuccessSound] = useSound(successSfx);
  const finishedTimestamp = useLessonStore((state) => state.finishedTimestamp);
  useEffect(() => {
    playSuccessSound();
    console.log("bell sound here");
  }, [finishedTimestamp]);
  return null;
};

const SoundPlayer = () => {
  const didMount = useDidMount();
  const playSounds = useOptionsStore((state) => state.playSounds);

  // const [playSuccessSound] = useSound(successSfx);
  // const word = useWordStore((state) => state.currentWord);
  // const finishedTimestamp = useLessonStore((state) => state.finishedTimestamp);
  const lessonIsStarted = useLessonStore((state) => state.isStarted);

  console.log("sound-trigger-----------------------");
  // console.log("word in sound", word);
  console.log("didMount", didMount());
  console.log("playSounds", playSounds);
  // console.log("playBellSound", playBellSound);
  // console.log("playSuccessSound", playSuccessSound);
  // console.log("finishedTimestamp", finishedTimestamp);
  console.log("lessonIsStarted", lessonIsStarted);
  console.log("^^^^^^^^^^^^^-----------------------");

  /*   useEffect(() => {
    if (didMount() && playSounds && lessonIsStarted) playBellSound();
    console.log("bell sound here");
  }, [word, playSounds, lessonIsStarted]); */

  /*   useEffect(() => {
    if (didMount() && playSounds && lessonIsStarted) playSuccessSound();
    console.log("success sound here");
  }, [finishedTimestamp, playSounds, lessonIsStarted]); */

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
