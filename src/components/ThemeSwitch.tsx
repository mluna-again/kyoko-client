import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import Switch from "react-switch";
import styles from "./ThemeSwitch.module.css";

const ThemeSwitch = () => {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
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
          checkedHandleIcon={<span className={styles.icon}>
							<FontAwesomeIcon icon={faSun} />
					</span>}
          uncheckedHandleIcon={<span className={styles.icon}>
							<FontAwesomeIcon icon={faMoon} />
					</span>}
        />
      </label>
    </div>
  );
};

export default ThemeSwitch;
