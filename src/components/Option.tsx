import { useState } from 'react'
import cx from "classnames";
import styles from "./Option.module.css";

type Props = {
  value?: number;
  onChange: (value?: number) => void;
  label?: string;
  selected?: boolean;
  gameOver?: boolean;
};

const EMOJIS = ["♥", "🍀", "♦️", "👑"];
const randomEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

const Option = ({ value, onChange, label, selected, gameOver }: Props) => {
  const [emoji] = useState(randomEmoji());

  return (
    <button
      className={cx(styles.container, { [styles.selected]: selected })}
      onClick={() => onChange(value)}
      disabled={gameOver}
    >
      <span className={styles.firstEmoji}>{emoji}</span>
      <span>{label || value}</span>
      <span className={styles.secondEmoji}>{emoji}</span>
    </button>
  );
};

export default Option;
