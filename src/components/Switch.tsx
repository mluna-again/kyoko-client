import cx from "classnames";
import styles from "./Switch.module.css";

type CustomProps = {
  onChange?: (checked: boolean) => void;
};
type Props = React.HTMLProps<HTMLInputElement> & CustomProps;
const Switch = ({ checked, ...props }: Props) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (props.onChange) props.onChange(checked);
  };

  return (
    <div className={cx(styles.container, { [styles.checked]: checked })}>
      <input
        className={styles.checkbox}
        type="checkbox"
        {...props}
        onChange={onChangeHandler}
        checked={Boolean(checked)}
      />

      <div className={styles.thumb} />
    </div>
  );
};

export default Switch;
