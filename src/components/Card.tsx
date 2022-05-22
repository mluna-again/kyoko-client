import cx from "classnames";
import { UserType } from "../constants/types";
import styles from "./Card.module.css";

type Props = {
  user: UserType;
  playerName: string;
  show?: boolean;
};

const Card = ({ user, playerName, show }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div
          className={cx(styles.card, {
            [styles.selected]: Boolean(user.selection),
          })}
        >
          <span>
            {(() => {
              if (user.selection && show) return user.selection;
              if (user.selection) return "?";
            })()}
          </span>
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
