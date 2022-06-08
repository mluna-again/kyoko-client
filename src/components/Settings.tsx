import Switch from "react-switch";
import styles from "./Settings.module.css";

type Props = {
  showClock: boolean;
  showAnimation: boolean;
  setShowClock: any;
  setShowAnimation: any;
};

const Settings = ({
  showClock,
  showAnimation,
  setShowAnimation,
  setShowClock,
}: Props) => {
  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <div>
        <label>
          <p>Show clock</p>
          <Switch
            checked={showClock}
            onChange={setShowClock}
            onColor="#3993ff"
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </label>
      </div>

      <div>
        <label>
          <p>Same answer animation</p>
          <Switch
            checked={showAnimation}
            onChange={setShowAnimation}
            onColor="#3993ff"
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </label>
      </div>
    </div>
  );
};

export default Settings;
