import { ExerciseScore } from "./ExerciseScore";

const collectionLocalStorageKey = "impro-training";

export function loadDataFromLocalStorage() {
  try {
    const serialized = localStorage.getItem(collectionLocalStorageKey);
    if (serialized === null) return [];
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
}

export function saveDataToLocalStorage(data: ExerciseScore[]) {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(collectionLocalStorageKey, serialized);
  } catch (e) {
    console.error("Error saving data to local storage.");
  }
}
