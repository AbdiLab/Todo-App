import { useState } from "react";

const States = ["All", "Active", "Completed"] as const;

export type FilterState = (typeof States)[number];

export default function useFilterState() {
  const [filterState, setFilterState] = useState<FilterState>("All");

  function changeState(state: FilterState) {
    setFilterState(state);
  }

  return { filterState, changeState };
}
