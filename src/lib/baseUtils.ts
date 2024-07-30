export function secondsToReadableStr(value: number): string {
  const seconds = Math.floor(value % 60);
  const minutes = Math.floor(value / 60);
  return "" + String(minutes) + ":" + String(seconds).padStart(2, "0");
}

export function jsonClone(structure: unknown) {
  return JSON.parse(JSON.stringify(structure));
}
