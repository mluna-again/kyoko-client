import { useState } from "react";
import cx from "classnames";
import { motion } from "framer-motion";
import Switch from "react-switch";
import styles from "./Settings.module.css";

type Props = {
  showClock: boolean;
  showAnimation: boolean;
  setShowClock: any;
  setShowAnimation: any;
};

const Settings = ({
  showClock,
  showAnimation,
  setShowAnimation,
  setShowClock,
}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const menuStates = {
    visible: {
      height: "300px",
      width: "300px",
      borderRadius: "15px",
      backgroundColor: "var(--secondary)",
    },
    hidden: {
      height: "100px",
      width: "100px",
      borderRadius: "150px",
      backgroundColor: "var(--primary)",
    },
  };

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
              <p>Show clock</p>
              <Switch
                checked={showClock}
                onChange={setShowClock}
                onColor="#3993ff"
                checkedIcon={false}
                uncheckedIcon={false}
              />
            </label>
          </div>

          <div>
            <label>
              <p>Same answer animation</p>
              <Switch
                checked={showAnimation}
                onChange={setShowAnimation}
                onColor="#3993ff"
                checkedIcon={false}
                uncheckedIcon={false}
              />
            </label>
          </div>
        </>
      ) : (
        <button onClick={toggleMenu} className={styles.showBtn}>
          ⚙
        </button>
      )}
    </motion.div>
  );
};

export default Settings;
