import { useRef } from "react";

export default function useInputRef() {
  const inputref = useRef<HTMLInputElement>(null);

  return inputref;
}
