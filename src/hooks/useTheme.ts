import { useState } from "react";

export default function useThemes() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleThemes() {
    setIsDarkMode((v) => !v);
  }

  return { isDarkMode, toggleThemes };
}
