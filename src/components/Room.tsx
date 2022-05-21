import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL: string = process.env.SERVER_URL ?? "http://localhost:4000";

type UserType = {
  name: string;
};
type RoomType = {
  code: string;
  name: string;
  users: UserType[];
};

const Room = () => {
  const [room, setRoom] = useState<RoomType>();

  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${SERVER_URL}/api/rooms/${params.roomId}`
      );

      setRoom(response.data.data);
    };

    fetchData();
  }, []);

  if (!room) return <h1>Loading...</h1>;

  return <h1>{`Welcome to room ${room.name}`}</h1>;
};

export default Room;
