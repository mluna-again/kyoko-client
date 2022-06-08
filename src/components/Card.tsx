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
            backgroundColor: Number.isInteger(user.selection)
              ? "var(--primary)"
              : "transparent",
          }}
          className={cx(styles.card, {
            [styles.selected]: Number.isInteger(user.selection),
          })}
        >
          <motion.span
            animate={{ opacity: show ? 1 : 0, rotateY: 180 }}
            transition={{ delay: showClock ? 0.5 : 0 }}
          >
            {(() => {
              if (Number.isInteger(user.selection) && show)
                return user.selection;
              if (user.selection) return "?";
            })()}
          </motion.span>
        </motion.div>
        <h1 className={styles.title}>
          {user.name}
          {user.name === playerName ? " (Me)" : ""}
        </h1>
      </div>
    </div>
  );
};

export default Card;
