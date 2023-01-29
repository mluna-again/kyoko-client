import styles from "./Teams.module.css";

type Props = { setTeam: (team: string) => void; team?: string };
const Teams = ({ setTeam, team }: Props) => {
  return (
    <div>
      <h2>Select a team!</h2>

      <div>
        <button
          type="button"
          onClick={() => setTeam("white")}
          className={`${styles.teamButton} ${
            team === "white" ? "selected" : ""
          }`}
        >
          White
        </button>

        <button
          type="button"
          onClick={() => setTeam("black")}
          className={`${styles.teamButton} ${
            team === "black" ? "selected" : ""
          }`}
        >
          Black
        </button>
      </div>
    </div>
  );
};

export default Teams;
