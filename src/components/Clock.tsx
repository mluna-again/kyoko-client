import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

type Props = {
  show?: boolean;
  allUsersSameAnswer: boolean;
  showClock: boolean;
  showAnimation: boolean;
	emojis: string[]
};

const Clock = ({
  show = false,
  allUsersSameAnswer,
  showClock,
  showAnimation,
	emojis
}: Props) => {
  const [num, setNum] = useState(1);
  useEffect(() => {
    if (!show) {
      setNum(1);
      return;
    }
    setTimeout(() => setNum(2), 500);
    setTimeout(() => setNum(3), 1000);
    setTimeout(
      () => {
        if (!allUsersSameAnswer) return;
        if (!showAnimation) return;
        jsConfetti.addConfetti({
          emojis,
        });
      },
      showClock ? 1500 : 0
    );
  }, [show, allUsersSameAnswer, showClock, showAnimation]);

  if (!show) return null;
  if (!showClock) return null;
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
