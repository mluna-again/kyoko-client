import cx from "classnames";
import { motion } from "framer-motion";
import { UserType } from "../constants/types";
import UserBadge from "./UserBadge";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

type Props = {
  user: UserType;
  playerName: string;
  show?: boolean;
  showClock: boolean;
  team?: string;
};

const Card = ({ user, playerName, show, showClock, team }: Props) => {
  const selected = Number.isInteger(user.selection);
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <motion.div
          animate={{
            rotateY: show ? [0, 180] : 0,
            backgroundColor: selected && !show ? "var(--primary)" : "white",
            color: show ? "var(--primary)" : "white",
            border:
              selected && !show
                ? "2px solid white"
                : "2px solid var(--primary)",
          }}
          className={cx(styles.card, {
            [styles.selected]: selected,
            [styles.white]: team === "white",
            [styles.black]: team === "black",
          })}
        >
          <span className={cx(styles.cardEmoji, { [styles.active]: show })}>
            {user.emoji || <FontAwesomeIcon icon={faQuestion} />}
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
              if (user.selection) return "";
            })()}
          </motion.span>
          <span className={cx(styles.cardEmoji, { [styles.active]: show })}>
            {user.emoji || <FontAwesomeIcon icon={faQuestion} />}
          </span>
        </motion.div>
        <div className={styles.user}>
          <h1
            className={cx(styles.title, {
              [styles.active]: user.name === playerName,
              [styles.offline]: user.offline,
            })}
          >
            {user.name}
            {user.name === playerName && (
              <span className={styles.you}>(You)</span>
            )}
          </h1>
          <div className={styles.badge}>
            <UserBadge team={user.team} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
