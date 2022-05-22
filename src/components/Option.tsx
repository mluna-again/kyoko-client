import cx from "classnames";
import styles from "./Option.module.css";

type Props = {
  value?: number;
  onChange: (value?: number) => void;
  label?: string;
  selected?: boolean;
};

const Option = ({ value, onChange, label, selected }: Props) => {
  return (
    <button
      className={cx(styles.container, { [styles.selected]: selected })}
      onClick={() => onChange(value)}
    >
      <span>{label || value}</span>
    </button>
  );
};

export default Option;
