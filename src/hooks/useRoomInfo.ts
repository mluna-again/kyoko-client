import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../constants/values";
import { RoomType } from "../constants/types";
import { useKyokoStore } from "../store";

type useRoomInfoType = (roomId: string) => {
  room: RoomType | undefined;
  error: string | null;
};
export const useRoomInfo: useRoomInfoType = (roomId: string) => {
  const [room, setRoom] = useState<RoomType>();
  const [error, setError] = useState<string | null>(null);

	const { setVotingIssue } = useKyokoStore();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/rooms/${roomId}`)
      .then((response) => {
        const data = response.data.data;
				setVotingIssue(data.issue_being_voted);

        setRoom({
          ...data,
          teamsEnabled: data.teams_enabled,
          ratingType: data.rating_type,
        });
      })
      .catch(() => setError("Server says: No"));
  }, [roomId]);

  return { room, error };
};
