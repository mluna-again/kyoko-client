import styles from "./Option.module.css";

type Props = {
  value?: number;
  onChange: (value?: number) => void;
};

const Option = ({ value, onChange }: Props) => {
  return (
    <button className={styles.container} onClick={() => onChange(value)}>
      <span>{value}</span>
    </button>
  );
};

export default Option;
