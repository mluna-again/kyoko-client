import axios from "axios";
import { SERVER_URL } from "../constants/values";

export const wakeMeUpInside = () => {
  axios
    .get(`${SERVER_URL}/ping`)
    .then(() => console.log("Server is on :)"))
    .catch(() => console.error("Server is dead :( (maybe)"));
};
