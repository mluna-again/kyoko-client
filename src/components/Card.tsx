import cx from "classnames";
import { UserType } from "../constants/types";
import styles from "./Card.module.css";

type Props = {
  user: UserType;
  playerName: string;
};

const Card = ({ user, playerName }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div
          className={cx(styles.card, {
            [styles.selected]: Boolean(user.selection),
          })}
        >
          <span>{user.selection && "?"}</span>
        </div>
        <h1>
          {user.name}
          {user.name === playerName ? " (Me)" : ""}
        </h1>
      </div>
    </div>
  );
};

export default Card;
