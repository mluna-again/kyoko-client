import styles from "./UserBadge.module.css";

type Props = { team?: string };
const UserBadge = ({ team }: Props) => {
console.log(team);
  if (team === "white")
    return <img className={styles.white} src="queen.png" alt="chess queen" />;
  if (team === "black")
    return <img className={styles.black} src="queen.png" alt="chess queen" />;

  return null;
};

export default UserBadge;
