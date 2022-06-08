import { useState, useEffect } from "react";

type Props = {
  show?: boolean;
};

const Clock = ({ show = false }: Props) => {
  const [num, setNum] = useState(1);
  useEffect(() => {
    if (!show) {
      setNum(1);
      return;
    }
    setTimeout(() => setNum(2), 500);
    setTimeout(() => setNum(3), 1000);
  }, [show]);

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
