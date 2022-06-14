import cx from "classnames";
import { motion } from "framer-motion";
import { UserType } from "../constants/types";
import styles from "./Card.module.css";

type Props = {
  user: UserType;
  playerName: string;
  show?: boolean;
  showClock: boolean;
};

const Card = ({ user, playerName, show, showClock }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <motion.div
          animate={{
            rotateY: show ? [0, 180] : 0,
            backgroundColor: show ? "white" : "var(--primary)",
            color: show ? "var(--primary)" : "white",
						border: show ? "2px solid var(--primary)" : "none"
          }}
          className={cx(styles.card, {
            [styles.selected]: Number.isInteger(user.selection),
          })}
        >
          <span className={cx(styles.cardEmoji, { [styles.active]: show })}>
            {user.emoji}
          </span>
          <motion.span
            animate={{
              opacity: show ? 1 : 0,
              rotateY: 180,
            }}
            transition={{ delay: showClock ? 0.5 : 0 }}
          >
            {(() => {
              if (Number.isInteger(user.selection) && show)
                return user.selection;
              if (user.selection) return "?";
            })()}
          </motion.span>
          <span className={cx(styles.cardEmoji, { [styles.active]: show })}>
            {user.emoji}
          </span>
        </motion.div>
        <h1
          className={cx(styles.title, {
            [styles.active]: user.name === playerName,
          })}
        >
          {user.name}
          {user.name === playerName && (
            <span className={styles.you}>(You)</span>
          )}
        </h1>
      </div>
    </div>
  );
};

export default Card;
