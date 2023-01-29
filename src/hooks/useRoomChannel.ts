import { Socket, Channel, Presence } from "phoenix";
import { useState, useEffect } from "react";
import { RoomType, UserType } from "../constants/types";

type Player = {
  username: string | null;
  team?: string;
};

const useRoomChannel = (
  socket: Socket,
  room: RoomType | undefined,
  player: Player
) => {
  const [error, setError] = useState<String>();

  const [channel, setChannel] = useState<Channel>();
  useEffect(() => {
    if (!room) return;
    if (!player.username) return;

    const chan = socket.channel(`room:${room.code}`, {
      player: player.username,
      team: player.team ?? null,
    });
    chan
      .join()
      .receive("ok", () => () => setError(undefined))
      .receive("error", ({ reason }) => setError(reason));

    setChannel(chan);

    return () => {
      chan.leave();
    };
    // eslint-disable-next-line
  }, [room, player.username, socket]);

  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    if (!channel) return;
    if (!player.username) return;

    const presence = new Presence(channel);
    const syncUsers = () => {
      const users = presence.list().map((user) => user.metas.at(-1));
      setUsers(users);
    };
    presence.onSync(syncUsers);
  }, [channel, player.username, users]);

  return { channel, users, error };
};
export default useRoomChannel;
