import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cx from "classnames";
import { Channel } from "phoenix";
import { UserType } from "../constants/types";
import Card from "./Card";
import Option from "./Option";
import Clock from "./Clock";
import Settings from "./Settings";
import styles from "./Board.module.css";

type Props = {
  users: UserType[];
  channel: Channel;
  playerName: string;
};

const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34];
const LINEAR = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const POWER_OF_TWO = [2, 4, 8, 16, 32, 64, 128, 256, 512];
const MULTIPLES_OF_TWO = [2, 4, 6, 8, 10, 12, 14, 16, 18];
const OPTIONS: any = {
  fibonacci: FIBONACCI,
  linear: LINEAR,
  power_of_two: POWER_OF_TWO,
  multiples_of_two: MULTIPLES_OF_TWO,
};

const Board = ({ users, channel, playerName }: Props) => {
  const [showClock, setShowClock] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  const [showCards, setShowCards] = useState(false);
  const [showingCards, setShowingCards] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    channel.on("reveal_cards", () => {
      setShowingCards(true);
      setTimeout(
        () => {
          setShowingCards(false);
          setShowCards(true);
          setGameOver(true);
        },
        showClock ? 1700 : 0
      );
    });

    channel.on("reset_room", () => {
      channel.push("reset_user", {});
      setGameOver(false);
    });
    return () => {
      channel.off("reveal_cards");
      channel.off("reset_room");
    };
  }, [channel, showClock]);
  // restart game when someone enters
  useEffect(() => {
    setGameOver(false);
    setShowCards(false);
  }, [users]);

  // sync settings
  // TODO: refactor to a hook
  useEffect(() => {
    if (!channel) return;
    channel.push("toggle_clock", { active: showClock });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showClock, channel]);
  useEffect(() => {
    if (!channel) return;
    channel.push("toggle_animation", { active: showAnimation });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAnimation, channel]);
  useEffect(() => {
    channel.on("toggle_clock", ({ active }) => setShowClock(active));
    channel.on("toggle_animation", ({ active }) => setShowAnimation(active));

    return () => {
      channel.off("toggle_clock");
      channel.off("toggle_animation");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

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

  const allUsersSameAnswer =
    new Set(users.map((user) => user.selection)).size === 1 && users.length > 1;

  return (
    <div>
      <Settings
        showClock={showClock}
        showAnimation={showAnimation}
        setShowAnimation={setShowAnimation}
        setShowClock={setShowClock}
      />
      <div
        className={cx(styles.revealContainer, {
          [styles.active]: canShowCards && !gameOver && !showingCards,
        })}
      >
        <Clock
          show={showingCards}
          allUsersSameAnswer={allUsersSameAnswer}
          showClock={showClock}
          showAnimation={showAnimation}
        />
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
            showClock={showClock}
          />
        ))}
      </div>

      <div className={styles.optionsSelectorContainer}>
        <select
          disabled={gameOver}
          defaultValue={optionsType}
          onChange={changeOptionsHandler}
        >
          <option value="fibonacci">Fibonacci</option>
          <option value="linear">Linear</option>
          <option value="multiples_of_two">Multiples of 2</option>
          <option value="power_of_two">Power of 2</option>
        </select>
      </div>

      <div className={styles.optionsContainer}>
        {OPTIONS[optionsType].map((opt: any) => (
          <Option
            selected={opt === selectedOption}
            key={opt}
            value={opt}
            onChange={selectionHandler}
            gameOver={gameOver}
          />
        ))}
      </div>

      <motion.div
        animate={{ opacity: showCards ? 1 : 0 }}
        transition={{ delay: showClock ? 0.5 : 0 }}
      >
        {allUsersSameAnswer && <h1>Everyone chose the same answer!</h1>}
        <h1>Average: {Math.round((selectionSum as number) / users.length)}</h1>
      </motion.div>
    </div>
  );
};

export default Board;
