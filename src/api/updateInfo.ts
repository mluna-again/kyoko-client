import axios from "axios";
import { SERVER_URL } from "../constants/values";
import { UserType } from "../constants/types";

type UpdateNameParams = {
  user: UserType;
  roomId: string;
  newName: string;
};
export async function updateName({ user, roomId, newName }: UpdateNameParams) {

  const url = `${SERVER_URL}/api/users/${user.name}`;
  const response = await axios.patch(url, {
    name: newName,
    room_code: roomId,
    user: user.name,
  });

  if (response.status !== 200) {
    throw new Error("Failed to update name");
  }

  localStorage.setItem("user", JSON.stringify({ username: newName }));

  return response.data;
}
