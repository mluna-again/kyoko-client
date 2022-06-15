import Switch from "react-switch";

type Props = {
  value: boolean;
  onChange: any;
};

const ThemeSwitch = ({ value, onChange }: Props) => {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      onColor="#3993ff"
      checkedIcon={false}
      uncheckedIcon={false}
    />
  );
};

export default ThemeSwitch;
