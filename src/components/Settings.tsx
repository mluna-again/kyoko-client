import { useState } from "react";
import cx from "classnames";
import { motion } from "framer-motion";
import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import styles from "./Settings.module.css";

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
      height: "400px",
      width: "300px",
      borderRadius: "15px",
      backgroundColor: "var(--secondary)",
    },
    hidden: {
      height: "80px",
      width: "80px",
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

          <div className={styles.emojisContainer}>
            <label>
              <p>Custom animation emojis</p>
              <Switch
                checked={enableEmojis}
                onChange={setEnableEmojis}
                onColor="#3993ff"
                checkedIcon={false}
                uncheckedIcon={false}
              />
            </label>
            <input
              className={cx({ [styles.active]: enableEmojis })}
              disabled={!enableEmojis}
              type="text"
              value={emojis}
              onChange={(e) => setEmojis(e.target.value)}
            />
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
