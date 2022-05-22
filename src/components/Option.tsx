import styles from "./Option.module.css";

type Props = {
  value?: number;
  onChange: (value?: number) => void;
  label?: string;
};

const Option = ({ value, onChange, label }: Props) => {
  return (
    <button className={styles.container} onClick={() => onChange(value)}>
      <span>{label || value}</span>
    </button>
  );
};

export default Option;
