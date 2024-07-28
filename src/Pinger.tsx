import { useEffect } from "react";
import useLessonStore from "./lessonStore";

const pingInterval = 100;

const Pinger = () => {
  const pingLesson = useLessonStore((state) => state.ping);

  useEffect(() => {
    const intervalId = setInterval(() => {
      pingLesson();
    }, pingInterval);
    return () => {
      clearInterval(intervalId);
    };
  }, [pingLesson]);

  return null;
};

export default Pinger;
