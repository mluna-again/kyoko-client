import { motion } from "framer-motion";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <motion.div animate={{ margin: "3rem" }} className={styles.container}>
      <h1>Welcome!</h1>

      <form>
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
