import cx from "classnames";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { UserType } from "../constants/types";
import UserBadge from "./UserBadge";
import Shirt from "../svg/Shirt";
import UserActionMenu from "./UserActionMenu";
import { SHIRT_SIZES } from "../constants/ratings";
import styles from "./Card.module.css";

type Props = {
  user: UserType;
  playerName: string;
  show?: boolean;
  showClock: boolean;
  team?: string;
  ratingType?: string;
};

const Card = ({
  user,
  playerName,
  show,
  showClock,
  team,
  ratingType,
}: Props) => {
  const selected = Number.isInteger(user.selection);
  return (
    <div className={styles.container}>
      <UserActionMenu user={user} />

      <div className={styles.cardContainer}>
        <motion.div
          animate={{
            rotateY: show ? [0, 180] : 0,
            color: show ? "var(--primary)" : "white",
            border:
              selected && !show
                ? "2px solid var(--primary)"
                : "2px dashed var(--primary)",
          }}
          className={cx(styles.card, {
            [styles.selected]: selected,
            [styles.selectedOver]: selected && show,
            [styles.white]: team === "white",
            [styles.black]: team === "black",
            [styles.shirt]: ratingType === "shirts",
          })}
        >
          {ratingType === "shirts" ? (
            <div>
              <Shirt />
              <motion.span
                animate={{
                  color: show ? "white" : "transparent",
                  opacity: show ? 1 : 0,
                }}
                transition={{ delay: showClock ? 0.5 : 0 }}
              >
                {
                  SHIRT_SIZES.find(({ value }) => value === user.selection)
                    ?.label
                }
              </motion.span>
            </div>
          ) : (
            <>
              <span className={cx(styles.cardEmoji, { [styles.active]: show })}>
                {user.emoji}
              </span>
              <motion.span
                animate={{
                  color: "white",
                  rotateY: show ? 180 : 0,
                  fontSize: show ? "18px" : "10px",
                }}
                transition={{ delay: showClock ? 0.5 : 0 }}
              >
                {(() => {
                  if (!show && !user.selection) return "";

                  if (Number.isInteger(user.selection) && show) {
                    const tooLarge = String(user?.selection).length > 3;
                    return tooLarge ? "a lot" : user.selection;
                  }

                  return (
                    <span className={styles.logo}>
                      <FontAwesomeIcon icon={faDiamond} />
                      Kyoko
                    </span>
                  );
                })()}
              </motion.span>
              <span className={cx(styles.cardEmoji, { [styles.active]: show })}>
                {user.emoji}
              </span>
            </>
          )}
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
