import styles from "./ShirtRating.module.css";
import { SHIRT_SIZES } from "../constants/ratings";
import Shirt from "../svg/Shirt";

type Props = {
  selected?: number | null;
  onChange: any;
  gameOver: boolean;
};
const ShirtRating = ({ selected, onChange, gameOver }: Props) => {
  return (
    <div className={styles.shirts}>
      {SHIRT_SIZES.map(({ label, value }) => (
        <div className={styles.shirt} key={label}>
          <button
            className={`${styles.shirt} ${
              selected === value ? styles.selected : ""
            }`}
            onClick={() => onChange("", value)}
            disabled={gameOver}
          >
            <Shirt />
            <span>{label}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShirtRating;
