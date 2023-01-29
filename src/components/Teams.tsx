import styles from "./Teams.module.css";

type Props = { setTeam: (team: string) => void; team?: string };
const Teams = ({ setTeam, team }: Props) => {
  return (
    <div className={styles.container}>
      <h2>Select a team</h2>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => setTeam("white")}
          className={`${styles.teamButton} ${styles.white} ${
            team === "white" ? styles.selected : ""
          }`}
        >
          <img src="queen.png" alt="chess queen" />
        </button>

        <button
          type="button"
          onClick={() => setTeam("black")}
          className={`${styles.teamButton} ${styles.black} ${
            team === "black" ? styles.selected : ""
          }`}
        >
          <img src="queen.png" alt="chess queen" />
        </button>
      </div>
    </div>
  );
};

export default Teams;
