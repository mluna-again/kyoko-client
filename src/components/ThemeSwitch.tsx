import { useEffect, useState } from "react";
import Switch from "react-switch";
import styles from "./ThemeSwitch.module.css";

const ThemeSwitch = () => {
  const [dark, setDark] = useState(localStorage.getItem("theme") == "dark");
  useEffect(() => {
    const theme = dark ? "dark" : "light";
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [dark]);

  return (
    <div className={styles.container}>
      <label>
        <Switch
          checked={dark}
          onChange={setDark}
          onColor="#3993ff"
          checkedIcon={false}
          uncheckedIcon={false}
          checkedHandleIcon={<span className={styles.icon}>🌜</span>}
          uncheckedHandleIcon={<span className={styles.icon}>🌞</span>}
        />
      </label>
    </div>
  );
};

export default ThemeSwitch;
