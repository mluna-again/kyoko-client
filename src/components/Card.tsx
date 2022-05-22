import cx from "classnames";
import { motion } from "framer-motion";
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
        <motion.div
          animate={{
            rotateY: show ? [0, 180] : 0,
            backgroundColor: user.selection ? "crimson" : "transparent",
          }}
          className={cx(styles.card, {
            [styles.selected]: Boolean(user.selection),
          })}
        >
          <motion.span
            animate={{ opacity: show ? 1 : 0, rotateY: 180 }}
            transition={{ delay: 0.5 }}
          >
            {(() => {
              if (user.selection && show) return user.selection;
              if (user.selection) return "?";
            })()}
          </motion.span>
        </motion.div>
        <h1>
          {user.name}
          {user.name === playerName ? " (Me)" : ""}
        </h1>
      </div>
    </div>
  );
};

export default Card;
