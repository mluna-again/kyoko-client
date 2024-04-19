import { useEffect, useState } from "react";
import styles from "./ThemeSwitch.module.css";
import { DEFAULT_THEME } from "../constants/theme";

const VALID_THEMES = [
  "light",
  "dark",
  "kanagawa",
  "kanagawa-dragon",
  "gruvbox-dark",
  "gruvbox-light",
];

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || DEFAULT_THEME
  );

  useEffect(() => {
    if (!VALID_THEMES.includes(theme)) {
      setTheme("light");
      localStorage.setItem("theme", "light");
      return;
    }

    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
  };

  return (
    <div className={styles.container}>
      <select
        onChange={changeHandler}
        className={styles.select}
        defaultValue={theme}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="kanagawa">Kanagawa</option>
        <option value="kanagawa-dragon">Kanagawa Dragon</option>
        <option value="gruvbox-dark">Gruvbox Dark</option>
        <option value="gruvbox-light">Gruvbox Light</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;
