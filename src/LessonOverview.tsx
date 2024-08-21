import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./components/ui/navigation-menu";

import useLessonStore from "./lessonStore";

const LessonOverview = () => {
  const numExercisesTotal = useLessonStore((state) =>
    state.getNumExercisesTotal()
  );
  const filled = numExercisesTotal && numExercisesTotal > 0;
  const lessonName = useLessonStore((state) => state.getLessonName());
  const exerciseListStr = useLessonStore((state) =>
    state.getExerciseListJson()
  );
  const jumpToExercise = useLessonStore((state) => state.jumpToExercise);
  const exerciseList = exerciseListStr ? JSON.parse(exerciseListStr) : [];

  function handleJumpToExercise(order: number) {
    jumpToExercise(Number(order));
  }

  interface ExShort {
    order: number;
    name: string;
  }

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {filled ? lessonName : undefined}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-2">
                {exerciseList.map((exercise: ExShort) => (
                  <li
                    key={exercise.order}
                    value={String(exercise.order)}
                    onClick={() => handleJumpToExercise(exercise.order)}
                    className="rounded-lg hover:bg-gray-100 cursor-pointer p-2 text-sm"
                  >{`${String(exercise.order)}) ${exercise.name}`}</li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default LessonOverview;
