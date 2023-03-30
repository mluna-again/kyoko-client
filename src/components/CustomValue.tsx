import { useState } from "react";
import cx from "classnames";
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

  // Number("10.") is a valid call for some reason...
  const hasADot = value.includes(".");
  const isEmpty = value === "";
  const isInteger = !hasADot && !isEmpty && Number.isInteger(Number(value));
  const isNegative = isInteger && Number(value) < 0;
  const isTooBiG = isInteger && Number(value) > 500;
  const shouldDisplayEmoji =
    Boolean(value && !isInteger) || isNegative || isTooBiG;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (gameOver) return;
    if (!isInteger) return;
    onConfirm("🕵️", Number(value));
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
        <button
          disabled={!isInteger}
          className={cx({
            [styles.disabled]: !isInteger,
            [styles.valid]: isInteger,
          })}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default CustomValue;
