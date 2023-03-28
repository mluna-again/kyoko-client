import cx from "classnames";
import { Issue as IssueType } from "../constants/types";
import styles from "./Issue.module.css";

type Props = {
  children: IssueType;
  setAsActive: (issue: IssueType | null) => void;
  active: IssueType | null;
};
const Issue = ({ children, setAsActive, active }: Props) => {
  const beingVoted = active?.id === children.id;
  const onVoteHandler = () => {
    if (beingVoted) {
      setAsActive(null);
      return;
    }

    setAsActive(children);
  };

  const message = beingVoted ? "Stop voting" : "Vote";
  const buttonClasses = cx(styles.button, {
    [styles.voting]: beingVoted,
  });

  return (
    <div className={styles.container}>
      <h1>{children.title}</h1>
      <button onClick={onVoteHandler} className={buttonClasses}>
        {message}
      </button>
    </div>
  );
};

export default Issue;
