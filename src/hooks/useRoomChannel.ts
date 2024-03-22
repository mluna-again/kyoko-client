import swal from "sweetalert2";
import { toast } from "react-toastify";
import { Socket, Channel, Presence } from "phoenix";
import { useState, useEffect } from "react";
import { RoomType, UserType } from "../constants/types";

type Player = {
  username: string | null;
  team?: string;
};

const diffUsers = (existingUsers: any[], newUsers: any[]) => {
  const nextState = newUsers;

  existingUsers.forEach((user) => {
    const offline = !Boolean(newUsers.find((u) => u.name === user.name));

    if (!offline) return;

    nextState.push({ ...user, offline });
  });

  return nextState;
};

type Config = {
  onUserUpdate: (user: UserType) => void;
};
const useRoomChannel = (
  socket: Socket,
  room: RoomType | undefined,
  player: Player,
  config: Config,
) => {
  const [alerted, setAlerted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alert = () => {
      if (alerted) return;

      toast.error("Looks like you don't have internet... So sad...", {
        autoClose: false,
        closeButton: false,
        toastId: "back-online",
      });
      setAlerted(true);
    };

    const onOpen = socket.onOpen(() => {
      if (alerted) {
        toast.dismiss("connected");
        toast.success("You are back online!", {
          className: "back-online",
          toastId: "connected",
          closeButton: false,
          closeOnClick: true,
          icon: false,
        });
      }

      toast.dismiss("back-online");
      setAlerted(false);
    });
    const onError = socket.onError(alert);

    return () => {
      socket.off([onError, onOpen]);
    };
  }, [socket, alerted]);

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
      .receive("ok", () => setError(undefined))
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

    channel.on("users:update_selections", ({ users }: { users: any }) => {
      setUsers(users as UserType[]);
    });

    channel.on("user:update", (user: any) => {
      setUsers((users) =>
        users.map((u) =>
          u.name === user.old_name ? { ...u, name: user.name } : u,
        ),
      );

      if (player.username === user.old_name) {
        config.onUserUpdate(user);
        channel.push("user:kick", { name: user.old_name });
      }
    });

    channel.on("user:kicked", (user: any) => {
      setUsers((users) => users.filter((u) => u.name !== user.name));
      if (player.username === user.name) {
        channel.leave();
        localStorage.removeItem("user");
        swal
          .fire({
            title: "You have been kicked from the room",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "var(--primary)",
          })
          .then(() => {
            window.location.href = "/";
          });
      }
    });

    const presence = new Presence(channel);
    const syncUsers = () => {
      setLoading(false);

      const newUsers = presence.list().map((user) => user.metas.at(-1));

      setUsers((users) => diffUsers(users, newUsers));
    };

    presence.onSync(syncUsers);
    channel.push("startup:sync", {});

    return () => {
      channel.off("user:update");
      channel.off("user:kicked");
    };

    // eslint-disable-next-line
  }, [channel, player.username]);

  const resetUserSelections = () => {
    const resetter = (user: UserType) => ({
      ...user,
      selection: undefined,
      emoji: undefined,
    });
    setUsers((users) => users.map(resetter));
  };

  return { channel, users, error, resetUserSelections, loading };
};
export default useRoomChannel;
