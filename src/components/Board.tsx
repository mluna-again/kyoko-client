import { Channel } from "phoenix";
import { UserType } from "../constants/types";
import Card from "./Card";
import Option from "./Option";

type Props = {
  users: UserType[];
  channel: Channel;
  playerName: string;
};

const OPTIONS = [0, 1, 2, 3, 5, 8, 13, 21, 34];

const Board = ({ users, channel, playerName }: Props) => {
  const selectionHandler = (num?: number) => {
    channel.push("user_selection", { selection: num, player: playerName });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {users.map((user) => (
          <Card key={user.name} user={user} playerName={playerName} />
        ))}
      </div>

      <div style={{ display: "flex" }}>
        {OPTIONS.map((opt) => (
          <Option key={opt} value={opt} onChange={selectionHandler} />
        ))}
        <Option label="x" value={undefined} onChange={selectionHandler} />
      </div>
    </div>
  );
};

export default Board;
