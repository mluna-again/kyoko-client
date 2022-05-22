import { Socket, Channel, Presence } from "phoenix";
import { useState, useEffect } from "react";
import { RoomType, UserType } from "../constants/types";

const useRoomChannel = (
  socket: Socket,
  room: RoomType | undefined,
  player: string | null
) => {
  const [error, setError] = useState<String>();

  const [channel, setChannel] = useState<Channel>();
  useEffect(() => {
    if (!room) return;
    if (!player) return;

    const chan = socket.channel(`room:${room.code}`, { player });
    chan
      .join()
      .receive("ok", () => () => setError(undefined))
      .receive("error", ({ reason }) => setError(reason));

    setChannel(chan);

    return () => {
      chan.leave();
    };
  }, [room, player, socket]);

  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    if (!channel) return;
    if (!player) return;

    const presence = new Presence(channel);
    presence.onSync(() => {
      const users = presence.list().map((user) => user.metas.at(-1));
      setUsers(users);
    });
    channel.on("user_selection", (data) => {
      const updatedUsers = users.map((user) => {
        if (user.name === data.player)
          return { ...user, selection: data.selection };
        return user;
      });

      setUsers(updatedUsers);
    });

    return () => {
      channel.off("user_selection");
    };
  }, [channel, player, users]);

  return { channel, users, error };
};
export default useRoomChannel;
