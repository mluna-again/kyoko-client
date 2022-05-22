import { useState, useEffect } from "react";
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

  const selectionSum = users
    .map((user) => user.selection)
    .filter((sel) => !Number.isNaN(sel))
    .reduce((acc, val) => acc! + val!, 0);

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
          <Option key={opt} value={opt} onChange={selectionHandler} />
        ))}
        <Option label="x" value={undefined} onChange={selectionHandler} />
      </div>

      <div className={styles.revealContainer}>
        <button onClick={revealHandler} className={styles.revealBtn}>
          Reveal cards
        </button>
      </div>

      {showCards && (
        <div>
          <h1>
            Average: {Math.round((selectionSum as number) / users.length)}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Board;
