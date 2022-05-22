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
  }, []);

  const selectionHandler = (num?: number) => {
    channel.push("user_selection", { selection: num, player: playerName });
  };

  const revealHandler = () => {
    channel.push("reveal_cards", {});
  };

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
    </div>
  );
};

export default Board;
