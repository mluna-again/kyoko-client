import { useState } from "react";
import styles from "./CustomValue.module.css";

type Props = {
  onConfirm: (emoji: string, value: number) => void;
  gameOver: boolean;
};

const CustomValue = ({ onConfirm, gameOver }: Props) => {
  const [value, setValue] = useState("");
  const updateValue = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (gameOver) return;

    setValue(value);
  };

  const isValidNumber = Boolean(Number(value));
  const isNegative = isValidNumber && Number(value) < 0;
  const isTooBiG = isValidNumber && Number(value) > 100;
  const shouldDisplayEmoji =
    Boolean(value && !isValidNumber) || isNegative || isTooBiG;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (gameOver) return;
    if (!isValidNumber || isNegative) return;
    onConfirm("❓", Number(value));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          {shouldDisplayEmoji && <span className={styles.emoji}>🤨</span>}
          <input
            type="text"
            value={value}
            onChange={updateValue}
            disabled={gameOver}
          />
        </div>
        <button>Confirm</button>
      </form>
    </div>
  );
};

export default CustomValue;
