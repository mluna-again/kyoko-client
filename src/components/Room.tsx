import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Socket } from "phoenix";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useRoomChannel from "../hooks/useRoomChannel";
import styles from "./Room.module.css";

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
  const { state } = useLocation();
  const playerName = (state as any)?.player;
  const shouldPromptForName = !Boolean(playerName);

  const [room, setRoom] = useState<RoomType>();
  const { channel, users } = useRoomChannel(socket, room, playerName);
	console.log(users)

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

  const copyLinkHandler = () => {
    toast("Link copied!", { type: "success" });
  };

  if (!room) return <h1>Loading...</h1>;

  return (
    <div className={styles.container}>
      <h1>{`Room \`${room.name}\``}</h1>
      <CopyToClipboard
        text={`${window.origin}/${room.code}`}
        onCopy={copyLinkHandler}
      >
        <button className={styles.inviteContainer}>
          <h3>
            Invite your friends with <span>this</span> link
          </h3>
        </button>
      </CopyToClipboard>

      <div>
        <h3>Players</h3>
      </div>
    </div>
  );
};

export default Room;
