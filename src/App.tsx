import "./styles.css";
import bgDesktopLight from "./assets/images/bg-desktop-light.jpg";
import bgDesktopDark from "./assets/images/bg-desktop-dark.jpg";
import bgMobileLight from "./assets/images/bg-mobile-light.jpg";
import bgMobileDark from "./assets/images/bg-mobile-dark.jpg";
import useThemes from "./hooks/useTheme";
import { useEffect, type ReactNode, type SyntheticEvent } from "react";
import useFilterState, { type FilterState } from "./hooks/useFilterState";
import useFilteredList from "./hooks/useFilteredList";
import useTodos from "./hooks/useTodo";
import useInputRef from "./hooks/useInputRef";

export default function App() {
  const { isDarkMode, toggleThemes } = useThemes();
  const { todos, dispatch } = useTodos();
  const { filterState, changeState } = useFilterState();
  const { FilteredList, activeTodoLength } = useFilteredList(filterState, todos);

  const inputCheckboxRef = useInputRef();
  const inputTextRef = useInputRef();

  function hanldeForm(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const input = inputTextRef.current;
    const inputCheckbox = inputCheckboxRef.current;

    if (!inputCheckbox) return;
    if (!input || input.value.trim() === "") {
      alert("the input is empty");
      return;
    }

    dispatch({
      type: "ADD_TODO",
      newTodo: { id: crypto.randomUUID(), text: input.value, isCompleted: inputCheckbox.checked },
    });
  }

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark-mode")
      : document.documentElement.classList.remove("dark-mode");
  }, [isDarkMode]);

  return (
    <>
      <div className="container">
        <header>
          <h1>T O D O</h1>
          <button aria-label="toggle-themes" onClick={toggleThemes}>
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                />
              </svg>
            )}
          </button>
        </header>

        <main className="todo-list-container">
          <div className="todo-list">
            <form className="new-todo-container" onSubmit={hanldeForm}>
              <input type="checkbox" ref={inputCheckboxRef} />
              <input type="text" name="todo" placeholder="Create a new todo…" ref={inputTextRef} />
            </form>
            <div className="todo-items-container">
              <div className="todo-items">
                {FilteredList.map((todo) => {
                  return (
                    <div className="todo-item" key={todo.id}>
                      <div className="todo-item-content">
                        <input
                          type="checkbox"
                          checked={todo.isCompleted}
                          onChange={(e) =>
                            dispatch({
                              type: "TOGGLE_COMPLETE",
                              id: todo.id,
                              isChecked: e.target.checked,
                            })
                          }
                        />
                        <span
                          onClick={() =>
                            dispatch({
                              type: "TOGGLE_COMPLETE",
                              id: todo.id,
                              isChecked: !todo.isCompleted,
                            })
                          }>
                          {todo.text}
                        </span>
                      </div>
                      <button onClick={() => dispatch({ type: "REMOVE_TODO", id: todo.id })}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
                          <path
                            fill="#494C6B"
                            fillRule="evenodd"
                            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="footer text-preset-2-regular">
                <span>{activeTodoLength} items left</span>
                <FilterOptions filterState={filterState} changeState={changeState} />
                <button
                  aria-label="clear non-active-todo"
                  onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
                  Clear Completed
                </button>
              </div>
            </div>
            <FilterOptions filterState={filterState} changeState={changeState} />
          </div>
          <div className="text-preset-2-regular">Drag and drop to reorder list</div>
        </main>
      </div>
      <div className="background-image-container">
        <picture>
          <source media="(min-width:376px )" srcSet={isDarkMode ? bgDesktopDark : bgDesktopLight} />
          <img src={isDarkMode ? bgMobileDark : bgMobileLight} />
        </picture>
      </div>
    </>
  );
}

type FilterOptionsProps = {
  filterState: FilterState;
  changeState: (state: FilterState) => void;
};

function FilterOptions({ changeState, filterState }: FilterOptionsProps) {
  return (
    <div className="filters-container text-preset-2-bold">
      <ul>
        <li>
          <Button isActive={filterState === "All"} onClick={() => changeState("All")}>
            All
          </Button>
        </li>
        <li>
          <Button isActive={filterState === "Active"} onClick={() => changeState("Active")}>
            Active
          </Button>
        </li>
        <li>
          <Button isActive={filterState === "Completed"} onClick={() => changeState("Completed")}>
            Completed
          </Button>
        </li>
      </ul>
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

function Button({ children, isActive, onClick }: ButtonProps) {
  return (
    <button className={`${isActive && "active"}`} onClick={onClick}>
      {children}
    </button>
  );
}
