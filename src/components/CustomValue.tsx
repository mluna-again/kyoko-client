import { useState } from "react";
import styles from './CustomValue.module.css';

type Props = {
  onConfirm: (value: number) => void;
  gameOver: boolean;
};

const CustomValue = ({ onConfirm, gameOver }: Props) => {
  const [value, setValue] = useState(0);
  const updateValue = (event: React.FormEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    if (event.currentTarget.value === "") return setValue(0);
    if (!value) return;

    setValue(value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm(value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={value}
          onChange={updateValue}
          disabled={gameOver}
        />
        <button>Confirm</button>
      </form>
    </div>
  );
};

export default CustomValue;
