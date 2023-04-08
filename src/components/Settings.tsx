import { useState } from "react";
import cx from "classnames";
import { motion } from "framer-motion";
import ThemeSwitch from "./ThemeSwitch";
import Switch from "./Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "../hooks/useDebounce";
import styles from "./Settings.module.css";
import LoadingBars from "./LoadingBars";

type Props = {
  showClock: boolean;
  showAnimation: boolean;
  setShowClock: any;
  setShowAnimation: any;
  emojis: string;
  setEmojis: any;
  enableEmojis: boolean;
  setEnableEmojis: any;
};

const Settings = ({
  showClock,
  showAnimation,
  setShowAnimation,
  setShowClock,
  emojis,
  setEmojis,
  enableEmojis,
  setEnableEmojis,
}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const menuStates = {
    visible: {
      height: "450px",
      width: "300px",
      borderRadius: "15px",
    },
    hidden: {
      height: "80px",
      width: "80px",
      borderRadius: "150px",
    },
  };

  const [debouncedEmojis, setDebouncedEmojis, debouncingEmojis] = useDebounce(
    emojis,
    setEmojis,
    500
  );

  return (
    <motion.div
      className={cx(styles.container, { [styles.active]: showMenu })}
      variants={menuStates}
      initial="hidden"
      animate={showMenu ? "visible" : "hidden"}
    >
      {showMenu ? (
        <>
          <h1 onClick={toggleMenu}>Settings</h1>
          <div>
            <label>
              <p>Theme</p>
              <ThemeSwitch />
            </label>
          </div>

          <div>
            <label>
              <p>Show countdown</p>
              <Switch checked={showClock} onChange={setShowClock} />
            </label>
          </div>

          <div>
            <label>
              <p>Same answer animation</p>
              <Switch checked={showAnimation} onChange={setShowAnimation} />
            </label>
          </div>

          <div className={styles.emojisContainer}>
            <label>
              <p>Custom animation emojis</p>
              <Switch checked={enableEmojis} onChange={setEnableEmojis} />
            </label>
            <div className={styles.inputContainer}>
              <input
                className={cx({ [styles.active]: enableEmojis })}
                disabled={!enableEmojis}
                type="text"
                value={debouncedEmojis}
                onChange={setDebouncedEmojis}
              />
              {debouncingEmojis && (
                <LoadingBars
                  height={20}
                  width={20}
                  className={styles.loadingSpinner}
                  color="var(--primary)"
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <button onClick={toggleMenu} className={styles.showBtn}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      )}
    </motion.div>
  );
};

export default Settings;
