import axios from "axios";
import { SERVER_URL } from "../constants/values";

type UpdateNameParams = {
  username: string;
  roomId: string;
  newName: string;
};
export async function updateName({ username, roomId, newName }: UpdateNameParams) {
  const url = `${SERVER_URL}/api/users/${username}`;
  const response = await axios.patch(url, {
    name: newName,
    room_code: roomId,
    user: username,
  });

  if (response.status !== 200) {
    throw new Error("Failed to update name");
  }

  localStorage.setItem("user", JSON.stringify({ username: newName }));

  return response.data;
}
