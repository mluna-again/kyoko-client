import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const SERVER_URL: string = process.env.SERVER_URL ?? "http://localhost:4000";

const Home = () => {
  const navigate = useNavigate();

  const startGameHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await axios.post(`${SERVER_URL}/api/rooms`, {
      room: {
        name: "Friends",
        first: { name: "Mari" },
      },
    });

    navigate(`/${response.data.data.code}`);
  };

  return (
    <motion.div animate={{ margin: "3rem" }} className={styles.container}>
      <h1>Welcome!</h1>

      <form onSubmit={startGameHandler}>
        <div className={styles.inputGroup}>
          <label htmlFor="room-name">Room name</label>
          <input type="text" id="room-name" />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="player-name">Player name</label>
          <input type="text" id="player-name" />
        </div>

        <div className={styles.playContainer}>
          <button>Play</button>
        </div>
      </form>
    </motion.div>
  );
};

export default Home;
