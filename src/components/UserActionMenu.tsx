import { useContext, useState } from "react";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEllipsisVertical,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UserActionMenu.module.css";
import { UserType } from "../constants/types";
import RoomContext from "../contexts/RoomContext";

type Props = {
  user: UserType;
};
const UserActionMenu = ({ user }: Props) => {
  const { loggedUser } = useContext(RoomContext);
  const isLoggedUser = loggedUser === user.name;

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuClasses = cx(styles.menu, {
    [styles.active]: menuOpen,
  });

  const changeName = ({ value }: any) => {
    if (!value) return;

    toast(`You are now ${value}!`, { type: "success" });
  };

  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isLoggedUser)
      return toast("You can't change the name of other people (it's rude 😠)", {
        type: "error",
      });

    swal
      .fire({
        title: "Change your username",
        input: "text",
        confirmButtonColor: "var(--primary)",
        confirmButtonText: "Change",
        showClass: {
          popup: styles.slideIn,
        },
        hideClass: {
          popup: styles.slideOut,
        },
      })
      .then(changeName)
      .finally(toggleMenu);
  };

  const kickPlayer = () => {
    toast(`User ${user.name} kicked`, { type: "warning" });
  };

  const kickPlayerHandker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const message = isLoggedUser
      ? "Do you want to leave?"
      : `Kick ${user.name}?`;
    const confirmMessage = isLoggedUser ? "Leave" : "Kick";

    swal
      .fire({
        title: message,
        confirmButtonColor: "crimson",
        confirmButtonText: confirmMessage,
        cancelButtonText: "Cancel",
        showClass: {
          popup: styles.slideIn,
        },
        hideClass: {
          popup: styles.slideOut,
        },
      })
      .then(({ isConfirmed }) => isConfirmed && kickPlayer())
      .finally(toggleMenu);
  };

  return (
    <div className={styles.container}>
      <button className={styles.editButton} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>

      <div className={menuClasses}>
        <button className={styles.editButton} onClick={editHandler}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className={styles.removeButton} onClick={kickPlayerHandker}>
          <FontAwesomeIcon icon={faDoorOpen} />
        </button>
      </div>
    </div>
  );
};

export default UserActionMenu;
