import { useContext, useState } from "react";
import swal from "sweetalert2";
import { useParams } from "react-router-dom";
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
import { updateName } from "../api/updateInfo";

type Props = {
  user: UserType;
};
const UserActionMenu = ({ user }: Props) => {
  const { loggedUser, channel } = useContext(RoomContext);
  const isLoggedUser = loggedUser === user.name;

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const menuClasses = cx(styles.menu, {
    [styles.active]: menuOpen,
  });

  const { roomId } = useParams();
  const changeName = ({ value }: any) => {
    if (!value) return;
    const newName = (value as string).trim();
    if (newName === user.name.trim()) {
      return toast.error("You can't choose the same name again.");
    }

    updateName({ roomId: roomId!, newName, user })
      .then(() => toast(`You are now ${value}!`, { type: "success" }))
      .catch(() => toast("Could not update your name...", { type: "error" }));
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
          popup: "slideIn",
        },
        hideClass: {
          popup: "slideOut",
        },
      })
      .then(changeName)
      .finally(toggleMenu);
  };

  const kickPlayer = () => {
    if (!channel) {
      return toast("Could not kick player...", { type: "error" });
    }
    channel
      .push("user:kick", user)
      .receive("ok", () =>
        toast(`User ${user.name} kicked`, { type: "warning" })
      )
      .receive("error", () =>
        toast("Could not kick player...", { type: "error" })
      )
      .receive("timeout", () =>
        toast("Could not kick player...", { type: "error" })
      );
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
          popup: "slideIn",
        },
        hideClass: {
          popup: "slideOut",
        },
      })
      .then(({ isConfirmed }) => isConfirmed && kickPlayer())
      .finally(toggleMenu);
  };

  const closeOverlayClasses = cx(styles.closeBackground, {
    [styles.closeBackgroundOpen]: menuOpen,
  });

  return (
    <div className={styles.container}>
      <div className={closeOverlayClasses} onClick={closeMenu} />

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
