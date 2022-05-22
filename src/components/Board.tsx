import { UserType } from "../constants/types";
import Card from "./Card";

type Props = {
  users: UserType[];
};

const Board = ({ users }: Props) => {
  return (
    <div style={{ display: "flex" }}>
      {users.map((user) => (
        <Card user={user} />
      ))}
    </div>
  );
};

export default Board;
