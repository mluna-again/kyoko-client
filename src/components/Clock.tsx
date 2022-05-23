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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <h1
        style={{
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "var(--white)",
          fontSize: "80px",
        }}
      >
        {num}
      </h1>
    </div>
  );
};

export default Clock;
