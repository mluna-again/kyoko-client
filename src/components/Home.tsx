import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SERVER_URL } from "../constants/values";
import styles from "./Home.module.css";

type Inputs = {
  roomName: string;
  playerName: string;
};

const schema = yup
  .object({
    roomName: yup
      .string()
      .required("Required")
      .matches(/^[A-Z ]+$/i, "Should only contain letters and spaces")
      .max(30, "Should be at most 30 characters long")
      .min(4, "Should be at least 4 characters long"),
    playerName: yup
      .string()
      .required("Required")
      .matches(/^[A-Z ]+$/i, "Should only contain letters and spaces")
      .max(30, "Should be at most 30 characters long")
      .min(4, "Should be at least 4 characters long"),
  })
  .required();

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const startGameHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/rooms`, {
        room: {
          name: data.roomName,
          first: { name: data.playerName },
        },
      });

      toast("Game created!", { type: "success" });
      navigate(`/${response.data.data.code}`, {
        state: { player: data.playerName },
      });
    } catch (error: any) {
      console.error(error);
      toast(`Server says: ${error.message}`, { type: "error" });
    }
  };

  return (
    <motion.div animate={{ margin: "3rem" }} className={styles.container}>
      <h1>Welcome!</h1>

      <form onSubmit={handleSubmit(startGameHandler)}>
        <div className={styles.inputGroup}>
          <label htmlFor="room-name">Room name</label>
          <input
            type="text"
            id="room-name"
            {...register("roomName", {
              required: true,
              maxLength: 30,
              pattern: /^[A-Z]+$/i,
              minLength: 4,
            })}
          />
          {errors.roomName && <span>{errors.roomName?.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="player-name">Player name</label>
          <input
            type="text"
            id="player-name"
            {...register("playerName", {
              required: true,
              maxLength: 30,
              pattern: /^[A-Z]+$/i,
              minLength: 4,
            })}
          />
          {errors.playerName && <span>{errors.playerName?.message}</span>}
        </div>

        <div className={styles.playContainer}>
          <button disabled={isSubmitting}>Play</button>
        </div>
      </form>
    </motion.div>
  );
};

export default Home;
