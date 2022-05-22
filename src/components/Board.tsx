import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Channel } from "phoenix";
import { UserType } from "../constants/types";
import Card from "./Card";
import Option from "./Option";
import styles from "./Board.module.css";

type Props = {
  users: UserType[];
  channel: Channel;
  playerName: string;
};

const OPTIONS = [0, 1, 2, 3, 5, 8, 13, 21, 34];

const Board = ({ users, channel, playerName }: Props) => {
  const [showCards, setShowCards] = useState(false);
  useEffect(() => {
    channel.on("reveal_cards", () => setShowCards(true));
    return () => {
      channel.off("reveal_cards");
    };
  }, [channel]);
  useEffect(() => {
    if (!users.every((user) => Boolean(user.selection))) {
      setShowCards(false);
    }
  }, [users, channel]);

  const selectionHandler = (num?: number) => {
    channel.push("user_selection", { selection: num, player: playerName });
  };

  const revealHandler = () => {
    channel.push("reveal_cards", {});
  };

  const resetHandler = () => {
    channel.push("reset_room", {});
  };

  const selectionSum = users
    .map((user) => user.selection)
    .filter((sel) => !Number.isNaN(sel))
    .reduce((acc, val) => acc! + val!, 0);

  const userPlaying = users.find((user) => user.name === playerName);
  const selectedOption = userPlaying?.selection;

  return (
    <div>
      <div style={{ display: "flex" }}>
        {users.map((user) => (
          <Card
            key={user.name}
            user={user}
            playerName={playerName}
            show={showCards}
          />
        ))}
      </div>

      <div style={{ display: "flex" }}>
        {OPTIONS.map((opt) => (
          <Option
            selected={opt === selectedOption}
            key={opt}
            value={opt}
            onChange={selectionHandler}
          />
        ))}
        <Option label="None" value={undefined} onChange={selectionHandler} />
      </div>

      <div className={styles.resetContainer}>
        <button className={styles.resetBtn} onClick={resetHandler}>
          Reset game
        </button>
      </div>

      <div className={styles.revealContainer}>
        <button
          disabled={!users.every((user) => Boolean(user.selection))}
          onClick={revealHandler}
          className={styles.revealBtn}
        >
          Reveal cards
        </button>
      </div>

      <motion.div
        animate={{ opacity: showCards ? 1 : 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1>Average: {Math.round((selectionSum as number) / users.length)}</h1>
      </motion.div>
    </div>
  );
};

export default Board;
