import { useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
import { Socket } from "phoenix";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useRoomChannel from "../hooks/useRoomChannel";
import Board from "./Board";
import { SERVER_SOCKET_URL } from "../constants/values";
import { useRoomInfo } from "../hooks/useRoomInfo";
import styles from "./Room.module.css";

const socket = new Socket(SERVER_SOCKET_URL);
socket.connect();

const Room = () => {
  const { state } = useLocation();
  const playerName = useRef(
    (state as any)?.player || localStorage.getItem("user")
  );

  const params = useParams();
  const { room, error: roomError } = useRoomInfo(params.roomId!);
  const {
    channel,
    users,
    error: channelError,
  } = useRoomChannel(socket, room, playerName.current);

  const copyLinkHandler = () => {
    toast("Link copied!", { type: "success" });
  };

  if (channelError) return <h1>Invalid room...</h1>;
  if (roomError) return <h1>{roomError}</h1>;

  // no username selected
  if (!room || !channel)
    return (
      <div>
        <h1>Select a username</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      <CopyToClipboard
        text={`${window.origin}/${room.code}`}
        onCopy={copyLinkHandler}
      >
        <button className={styles.inviteContainer}>
          <h3>Feeling lonely?😴</h3>
          <h3 className={styles.inviteLink}>Invite your friends</h3>
        </button>
      </CopyToClipboard>

      <div>
        <Board
          initialState={room}
          playerName={playerName.current}
          channel={channel}
          users={users}
        />
      </div>
    </div>
  );
};

export default Room;
