import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Socket, Channel } from "phoenix";
import axios from "axios";
import useRoomChannel from "../hooks/useRoomChannel";

const SERVER_URL: string = process.env.SERVER_URL ?? "http://localhost:4000";
const SERVER_SOCKET_URL: string =
  process.env.SERVER_SOCKET_URL ?? "ws://localhost:4000/socket";

const socket = new Socket(SERVER_SOCKET_URL);
socket.connect();
socket.onOpen(() => console.log("Socket connected"));
socket.onClose(() => console.log("Socket disconnected"));
socket.onError(console.error);

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
  const { channel, users } = useRoomChannel(socket, room);
  console.log(users);

  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${SERVER_URL}/api/rooms/${params.roomId}`
      );

      setRoom(response.data.data);
    };

    fetchData();
  }, [params.roomId]);

  if (!room) return <h1>Loading...</h1>;

  return <h1>{`Welcome to room \`${room.name}\``}</h1>;
};

export default Room;
