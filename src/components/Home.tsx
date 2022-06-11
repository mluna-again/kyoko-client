import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
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
      .max(30, "Should be at most 30 characters long"),
    playerName: yup
      .string()
      .required("Required")
      .max(30, "Should be at most 30 characters long"),
  })
  .required();

const Home = () => {
  // clear localstorage
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const startGameHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div animate={{ margin: "3rem" }} className={styles.container}>
      <h3>Choose a name for the room and one for yourself.</h3>

      <form onSubmit={handleSubmit(startGameHandler)}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="room-name"
            placeholder="Room's name"
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
          <input
            type="text"
            id="player-name"
            placeholder="Your name"
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
          <button disabled={isSubmitting || loading}>
            {loading ? (
              <TailSpin
                height="25"
                width="25"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "Create game"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Home;
