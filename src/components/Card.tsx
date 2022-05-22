import cx from "classnames";
import { UserType } from "../constants/types";
import styles from "./Card.module.css";

type Props = {
  user: UserType;
};

const Card = ({ user }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div
          className={cx(styles.card, {
            [styles.selected]: Boolean(user.selection),
          })}
        >
          {user.selection}
        </div>
        <h1>{user.name}</h1>
      </div>
    </div>
  );
};

export default Card;
