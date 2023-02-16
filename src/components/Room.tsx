import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Socket } from "phoenix";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useRoomChannel from "../hooks/useRoomChannel";
import Board from "./Board";
import { SERVER_SOCKET_URL } from "../constants/values";
import { useRoomInfo } from "../hooks/useRoomInfo";
import styles from "./Room.module.css";
import EnterGameForm from "./EnterGameForm";

const socket = new Socket(SERVER_SOCKET_URL);
socket.connect();

const getUserFromLocalStorage = () => {
  const data = localStorage.getItem("user");
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);

    if (window.location.href === parsed.forUrl) {
      return parsed.username;
    }

    return null;
  } catch (_error) {
    return null;
  }
};

const Room = () => {
  const { state } = useLocation();
  const [playerName, setPlayerName] = useState(
    (state as any)?.player || getUserFromLocalStorage()
  );

  const [team, setTeam] = useState<string | undefined>();

  const params = useParams();
  const { room, error: roomError } = useRoomInfo(params.roomId!);
  const {
    resetUserSelections,
    channel,
    users,
    error: channelError,
  } = useRoomChannel(socket, room, { username: playerName, team });

  const copyLinkHandler = () => {
    toast("Link copied!", { type: "success" });
  };

  if (channelError) return <h1 className={styles.invalidLink}>Invalid room...</h1>;
  if (roomError) return <h1 className={styles.invalidLink}>{roomError}</h1>;

  // no username selected
  if (!room || !channel)
    return (
      <EnterGameForm
        teams={room?.teamsEnabled}
        onSave={(username, team) => {
          setPlayerName(username);
          setTeam(team);
        }}
      />
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
          playerName={playerName}
          channel={channel}
          users={users}
          resetUsers={resetUserSelections}
        />
      </div>
    </div>
  );
};

export default Room;
