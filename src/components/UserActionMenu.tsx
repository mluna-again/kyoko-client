import { useState } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEllipsisVertical,
	faDoorOpen
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UserActionMenu.module.css";

const UserActionMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuClasses = cx(styles.menu, {
    [styles.active]: menuOpen,
  });

  return (
    <div className={styles.container}>
      <button className={styles.editButton} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>

      <div className={menuClasses}>
        <button className={styles.editButton}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className={styles.removeButton}>
          <FontAwesomeIcon icon={faDoorOpen} />
        </button>
      </div>
    </div>
  );
};

export default UserActionMenu;
