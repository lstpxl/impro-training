export function secondsToReadableStr(value: number): string {
  // if (value < 60) return "0:" + Math.floor(value);
  const seconds = Math.floor(value % 60);
  const minutes = Math.floor(value / 60);
  return "" + minutes + ":" + String(seconds).padStart(2, "0");
}

export function jsonClone(structure) {
  return JSON.parse(JSON.stringify(structure));
}
