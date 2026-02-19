import { useEffect, useReducer } from "react";

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const starterTodo: Todo[] = [
  { id: crypto.randomUUID(), text: "Complete online JavaScript course", isCompleted: true },
  { id: crypto.randomUUID(), text: "og around the park 3x", isCompleted: false },
  { id: crypto.randomUUID(), text: "10 minutes meditation", isCompleted: false },
  { id: crypto.randomUUID(), text: "Read for 1 hour", isCompleted: false },
  { id: crypto.randomUUID(), text: "Pick up groceries", isCompleted: false },
  { id: crypto.randomUUID(), text: "Complete Todo App on Frontend Mentor", isCompleted: false },
];

localStorage.setItem("todos", JSON.stringify(starterTodo));

type Action =
  | {
      type: "ADD_TODO";
      newTodo: Todo;
    }
  | {
      type: "REMOVE_TODO";
      id: string;
    }
  | {
      type: "CLEAR_COMPLETED";
    }
  | {
      type: "TOGGLE_COMPLETE";
      id: string;
      isChecked: boolean;
    };

function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...todos, action.newTodo];
    case "REMOVE_TODO":
      return todos.filter((todo) => todo.id !== action.id);
    case "CLEAR_COMPLETED":
      return todos.filter((todo) => todo.isCompleted === false);
    case "TOGGLE_COMPLETE":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, isCompleted: action.isChecked } : todo,
      );
    default:
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
}

export default function useTodos() {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    const saved = localStorage.getItem("todos");

    if (saved == null) return;

    return JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return { todos, dispatch };
}
