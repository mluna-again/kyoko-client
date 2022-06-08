import { useState, useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
  show?: boolean;
  allUsersSameAnswer: boolean;
};

const Clock = ({ show = false, allUsersSameAnswer }: Props) => {
  const [num, setNum] = useState(1);
  useEffect(() => {
    if (!show) {
      setNum(1);
      return;
    }
    setTimeout(() => setNum(2), 500);
    setTimeout(() => setNum(3), 1000);
    setTimeout(() => {
      if (!allUsersSameAnswer) return;
      toast("Great! Everyone has the same answer :D", { type: "success" });
    }, 1500);
  }, [show, allUsersSameAnswer]);

  if (!show) return null;
  return (
    <div>
      <h1
        style={{
          color: "var(--primary)",
          fontSize: "30px",
        }}
      >
        {num}
      </h1>
    </div>
  );
};

export default Clock;
