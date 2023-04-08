import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SERVER_URL } from "../constants/values";
import styles from "./Home.module.css";
import Teams from "./Teams";
import Switch from "./Switch";
import { wakeMeUpInside } from "../api/wakeMeUp";
import LoadingBars from "./LoadingBars";

// disabled by default
const DEFAULT_TEAMS_OPTION = false;

type Inputs = {
  roomName: string;
  playerName: string;
  ratingType: "cards" | "shirts";
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
    ratingType: yup.string().required("Required"),
  })
  .required();

const Home = () => {
  // clear localstorage
  useEffect(() => {
    wakeMeUpInside();
    localStorage.removeItem("user");
  }, []);

  const [team, setTeam] = useState<string | undefined>();
  const [teamsEnabled, setTeamsEnabled] = useState(DEFAULT_TEAMS_OPTION);

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
          first: {
            name: data.playerName,
            team: teamsEnabled ? team : undefined,
          },
          teams_enabled: teamsEnabled,
          rating_type: data.ratingType,
        },
      });

      toast("Game created!", { type: "success" });
      localStorage.setItem(
        "user",
        JSON.stringify({ username: data.playerName })
      );
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

  const submitDisabled = isSubmitting || loading || (teamsEnabled && !team);

  return (
    <motion.div animate={{ margin: "3rem" }} className={styles.container}>
      <h1>Create a new game</h1>

      <form onSubmit={handleSubmit(startGameHandler)}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="room-name"
            placeholder="Room's name"
            autoComplete="off"
            {...register("roomName", {
              required: true,
              maxLength: 30,
              pattern: /^[A-Z]+$/i,
              minLength: 4,
            })}
          />
          {errors.roomName && <p>{errors.roomName?.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            id="player-name"
            placeholder="Your name"
            autoComplete="off"
            {...register("playerName", {
              required: true,
              maxLength: 30,
              pattern: /^[A-Z]+$/i,
              minLength: 4,
            })}
          />
          {errors.playerName && <p>{errors.playerName?.message}</p>}
        </div>

        <div className={styles.selectContainer}>
          <label htmlFor="ratingType" className={styles.selectLabel}>
            Rating System
          </label>
          <select
            id="ratingType"
            className={styles.select}
            defaultValue="cards"
            {...register("ratingType", { required: true })}
          >
            <option value="shirts">T-shirt size</option>
            <option value="cards">Cards</option>
          </select>
        </div>

        <div className={styles.checkbox}>
          <label htmlFor="teams">Enable teams</label>
          <Switch
            id="teams"
            onChange={(checked) => setTeamsEnabled(checked as boolean)}
            checked={teamsEnabled}
          />
        </div>

        {teamsEnabled && <Teams team={team} setTeam={setTeam} />}

        <div className={styles.playContainer}>
          <button disabled={submitDisabled}>
            {true ? (
              <LoadingBars />
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
