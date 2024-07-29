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
  // const isStarted = useLessonStore((state) => state.isStarted);
  const lessonName = useLessonStore((state) => state.getLessonName());
  /*   const activeOrder = useLessonStore((state) =>
    state.getDisplayedExerciseOrder()
  ); */
  const exerciseListStr = useLessonStore((state) =>
    state.getExerciseListJson()
  );
  const jumpToExercise = useLessonStore((state) => state.jumpToExercise);
  const exerciseList = exerciseListStr ? JSON.parse(exerciseListStr) : [];

  function handleJumpToExercise(order: number) {
    // console.log("TODO jump to ", order);
    jumpToExercise(Number(order));
  }

  interface ExShort {
    order: number;
    name: string;
  }

  /*   console.log("activeOrder", activeOrder);
  console.log("filled", filled);
  console.log("isStarted", isStarted);
  console.log("lessonName", lessonName);
 */
  return (
    <div>
      {/* <Select
        onValueChange={handleJumpToExercise}
        defaultValue={filled ? String(1) : undefined}
        value={
          activeOrder
            ? String(activeOrder)
            : undefined 
        }
      >
        <SelectTrigger className="w-[400px]">
          <SelectValue placeholder={isStarted ? undefined : lessonName} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>

            {exerciseList.map((exercise: ExShort) => (
              <SelectItem
                key={exercise.order}
                value={String(exercise.order)}
              >{`${String(exercise.order)}) ${exercise.name}`}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {filled ? lessonName : undefined}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {/*                 <li href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </li>
                <li href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </li>
                <li href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </li> */}
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
