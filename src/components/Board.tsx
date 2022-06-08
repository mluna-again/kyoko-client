import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cx from "classnames";
import { Channel } from "phoenix";
import { UserType } from "../constants/types";
import Card from "./Card";
import Option from "./Option";
import Clock from "./Clock";
import styles from "./Board.module.css";

type Props = {
  users: UserType[];
  channel: Channel;
  playerName: string;
};

const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34];
const LINEAR = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const OPTIONS: any = {
  fibonacci: FIBONACCI,
  linear: LINEAR,
};

const Board = ({ users, channel, playerName }: Props) => {
  const [showCards, setShowCards] = useState(false);
  const [showingCards, setShowingCards] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    channel.on("reveal_cards", () => {
      setShowingCards(true);
      setTimeout(() => {
        setShowingCards(false);
        setShowCards(true);
        setGameOver(true);
      }, 1700);
    });

    channel.on("reset_room", () => {
      channel.push("reset_user", {});
      setGameOver(false);
    });
    return () => {
      channel.off("reveal_cards");
      channel.off("reset_room");
    };
  }, [channel]);
  // restart game when someone enters
  useEffect(() => {
    setGameOver(false);
    setShowCards(false);
  }, [users]);

  const userPlaying = users.find((user) => user.name === playerName);
  const selectedOption = userPlaying?.selection;

  const selectionHandler = (num?: number) => {
    const selection = num === selectedOption ? null : num;
    channel.push("user_selection", { selection, player: playerName });
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

  const [optionsType, setOptionsType] = useState<string>("fibonacci");
  const changeOptionsHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOptionsType(event.target.value);
    selectionHandler(undefined);
  };

  const canShowCards =
    users.every((user) => Number.isInteger(user.selection)) || showCards;

  return (
    <div>
      <div
        className={cx(styles.revealContainer, {
          [styles.active]: canShowCards,
        })}
      >
        <Clock show={showingCards} />
        {(() => {
          if (showingCards) return null;
          if (gameOver)
            return (
              <div className={styles.resetContainer}>
                <button className={styles.resetBtn} onClick={resetHandler}>
                  Reset game
                </button>
              </div>
            );
          if (canShowCards)
            return (
              <button
                disabled={!canShowCards}
                onClick={revealHandler}
                className={styles.revealBtn}
              >
                Reveal cards
              </button>
            );
          else return <h3>Pick your cards!</h3>;
        })()}
      </div>
      <div className={styles.cardsContainer}>
        {users.map((user) => (
          <Card
            key={user.name}
            user={user}
            playerName={playerName}
            show={showCards}
          />
        ))}
      </div>

      <div className={styles.optionsSelectorContainer}>
        <select defaultValue={optionsType} onChange={changeOptionsHandler}>
          <option value="fibonacci">Fibonacci</option>
          <option value="linear">Linear</option>
        </select>
      </div>

      <div className={styles.optionsContainer}>
        {OPTIONS[optionsType].map((opt: any) => (
          <Option
            selected={opt === selectedOption}
            key={opt}
            value={opt}
            onChange={selectionHandler}
          />
        ))}
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
