import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import cx from "classnames";
import { Channel } from "phoenix";
import { UserType } from "../constants/types";
import { useKyokoStore } from "../store";
import Clock from "./Clock";
import CustomValue from "./CustomValue";
import Settings from "./Settings";
import styles from "./Board.module.css";
import Cards from "./Cards";
import Rating from "./Rating";
import { DEFAULT_EMOJIS } from "../constants/emojis";
import { getShirtMedian } from "../constants/ratings";
import LoadingBars from "./LoadingBars";

type Props = {
  users: UserType[];
  channel: Channel;
  playerName: string;
  initialState: any;
  resetUsers: () => void;
  loading: boolean;
};

const Board = ({
  users,
  channel,
  playerName,
  initialState,
  resetUsers,
  loading,
}: Props) => {
  const { votingIssue } = useKyokoStore((state) => state);

  const [showClock, setShowClock] = useState(
    initialState?.settings?.clock ?? false
  );
  const [showAnimation, setShowAnimation] = useState(
    initialState?.settings?.animation
  );

  const [showingCards, setShowingCards] = useState(false);
  const [gameOver, setGameOver] = useState(
    initialState?.status === "game_over" || false
  );
  const [showCards, setShowCards] = useState(gameOver);
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
      setShowCards(false);
      resetUsers();
    });
    return () => {
      channel.off("reveal_cards");
      channel.off("reset_room");
    };
  }, [channel, showClock, resetUsers]);

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
    channel.on("toggle_emojis", ({ active }) => setEnableEmojis(active));

    return () => {
      channel.off("toggle_clock");
      channel.off("toggle_animation");
      channel.off("toggle_emojis");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  const userPlaying = users.find((user) => user.name === playerName);
  const selectedOption = userPlaying?.selection;

  const selectionHandler = (emoji: string, num?: number) => {
    const selection = num === selectedOption ? null : num;
    channel.push("user_selection", { selection, player: playerName, emoji });
  };

  const revealHandler = () => {
    channel.push("reveal_cards", {});
  };

  const resetHandler = () => {
    channel.push("reset_room", {});
  };

  const usersSelected = users.filter((user) => Boolean(user.selection)).length;
  const selectionSum = users
    .map((user) => user.selection)
    .filter((sel) => !Number.isNaN(sel))
    .filter((sel) => Boolean(sel))
    .reduce((acc, val) => acc! + val!, 0);

  const [optionsType, setOptionsType] = useState<string>("fibonacci");
  const changeOptionsHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOptionsType(event.target.value);
    selectionHandler("", undefined);
  };

  const atLeastOneUserSelected = users.some((user: UserType) =>
    Number.isInteger(user.selection)
  );

  const usersWithSelection = users.filter((user) => Boolean(user.selection));
  const allUsersSameAnswer =
    new Set(usersWithSelection.map((user) => user.selection)).size === 1 &&
    usersWithSelection.length > 1;

  const [emojis, setEmojis] = useState(
    initialState?.settings?.emojis ?? DEFAULT_EMOJIS.join("")
  );
  const [enableEmojis, setEnableEmojis] = useState(true);
  useEffect(() => {
    if (!channel) return;
    channel.on("change_emojis", ({ emojis }) => {
      setEmojis(emojis);
    });
    channel.push("change_emojis", { emojis });

    return () => channel.off("change_emojis");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  const average = Math.round((selectionSum as number) / usersSelected);
  const averageMessage =
    initialState?.ratingType === "shirts"
      ? getShirtMedian(usersWithSelection)
      : average;

  const blackTeam = users.filter((user) => user.team === "black");
  const whiteTeam = users.filter((user) => user.team === "white");

  const blackTeamReady =
    blackTeam.every((user) => Boolean(user.selection)) && blackTeam.length > 0;
  const whiteTeamReady =
    whiteTeam.every((user) => Boolean(user.selection)) && whiteTeam.length > 0;

  return (
    <div>
      <Settings
        showClock={showClock}
        showAnimation={showAnimation}
        setShowAnimation={setShowAnimation}
        setShowClock={setShowClock}
        emojis={emojis}
        setEmojis={(emojis: string) =>
          channel.push("change_emojis", { emojis })
        }
        enableEmojis={enableEmojis}
        setEnableEmojis={(active: boolean) =>
          channel.push("toggle_emojis", { active })
        }
      />
      {votingIssue && <p className={styles.votingIssue}>{votingIssue.title}</p>}
      <div
        className={cx(styles.revealContainer, {
          [styles.active]: atLeastOneUserSelected && !gameOver && !showingCards,
        })}
      >
        <Clock
          show={showingCards}
          allUsersSameAnswer={allUsersSameAnswer}
          showClock={showClock}
          showAnimation={showAnimation}
          emojis={enableEmojis ? emojis : DEFAULT_EMOJIS}
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
          if (atLeastOneUserSelected)
            return (
              <button
                disabled={!atLeastOneUserSelected}
                onClick={revealHandler}
                className={styles.revealBtn}
              >
                Reveal cards
              </button>
            );
          else return <h3>Pick your cards!</h3>;
        })()}
      </div>

      {!gameOver && (
        <div className={styles.resetSecondBtnContainer}>
          <button className={styles.resetSecondBtn} onClick={resetHandler}>
            <FontAwesomeIcon icon={faRotateRight} />
            Reset cards
          </button>
        </div>
      )}

      <div className={styles.banners}>
        {(() => {
          if (!initialState.teamsEnabled) return;

          if (blackTeamReady && whiteTeamReady)
            return <h3>Both teams are ready</h3>;
          if (blackTeamReady) return <h3>Black team is ready</h3>;
          if (whiteTeamReady) return <h3>White team is ready</h3>;
        })()}
      </div>

      <div className={styles.cardsContainer}>
        {loading ? (
          <LoadingBars
            className={styles.loadingSpinner}
            height={35}
            width={35}
            color="var(--primary)"
          />
        ) : (
          <Cards
            ratingType={initialState?.ratingType}
            playerName={playerName}
            users={users}
            showCards={showCards}
            showClock={showClock}
          />
        )}
      </div>

      <div className={styles.optionsContainer}>
        {optionsType !== "custom" ? (
          <Rating
            ratingType={initialState?.ratingType}
            optionsType={optionsType}
            selectedOption={selectedOption}
            selectionHandler={selectionHandler}
            gameOver={gameOver || showingCards}
          />
        ) : (
          <div className={styles.custom}>
            <CustomValue
              gameOver={gameOver || showingCards}
              onConfirm={selectionHandler}
            />
          </div>
        )}

        {initialState?.ratingType === "cards" && (
          <div className={styles.optionsSelectorContainer}>
            <select
              disabled={gameOver || showingCards}
              defaultValue={optionsType}
              onChange={changeOptionsHandler}
            >
              <option value="fibonacci">Fibonacci</option>
              <option value="linear">Linear</option>
              <option value="multiples_of_two">Multiples of 2</option>
              <option value="power_of_two">Power of 2</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        )}
      </div>

      <motion.div
        animate={{ opacity: showCards ? 1 : 0 }}
        transition={{ delay: showClock ? 0.5 : 0 }}
      >
        {allUsersSameAnswer && (
          <h1 className={styles.sameAnswer}>Everyone chose the same answer!</h1>
        )}
        {Boolean(average) && (
          <h1 className={styles.avg}>Average: {averageMessage}</h1>
        )}
      </motion.div>
    </div>
  );
};

export default Board;
