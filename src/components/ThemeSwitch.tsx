import { useEffect, useState } from "react";
import Switch from "react-switch";
import styles from "./ThemeSwitch.module.css";

const ThemeSwitch = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className={styles.container}>
      <label>
        <span>Theme</span>
        <Switch
          checked={dark}
          onChange={setDark}
          onColor="#3993ff"
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </label>
    </div>
  );
};

export default ThemeSwitch;
