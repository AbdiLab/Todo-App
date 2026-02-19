import { useMemo } from "react";
import type { FilterState } from "./useFilterState";
import type { Todo } from "./useTodo";

export default function useFilteredList(state: FilterState, todos: Todo[]) {
  const FilteredList = useMemo(() => {
    switch (state) {
      case "All":
        return todos;
      case "Active":
        return todos.filter((todo) => todo.isCompleted == false);
      case "Completed":
        return todos.filter((todo) => todo.isCompleted == true);
      default:
        const _exhaustiveCheck: never = state;
        return _exhaustiveCheck;
    }
  }, [todos]);

  const activeTodoLength = useMemo(() => {
    return todos.filter((todo) => todo.isCompleted === false).length;
  }, [todos]);

  return { FilteredList, activeTodoLength };
}
