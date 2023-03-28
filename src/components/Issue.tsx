import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useKyokoStore } from "../store";
import { Issue as IssueType } from "../constants/types";
import styles from "./Issue.module.css";

type Props = {
  children: IssueType;
  onDelete: (id: string) => void;
};
const Issue = ({ children, onDelete }: Props) => {
  const { votingIssue, setVotingIssue } = useKyokoStore((state) => state);

  const beingVoted = votingIssue?.id === children.id;
  const onVoteHandler = () => {
    if (beingVoted) {
      setVotingIssue(null);
      return;
    }

    setVotingIssue(children);
  };

  const message = beingVoted ? "Stop voting" : "Vote";
  const voteBtnClasses = cx(styles.button, styles.vote, {
    [styles.voting]: beingVoted,
  });

  const deleteHandler = () => {
    onDelete(children.id);
  };

  return (
    <div className={styles.container}>
      <h1>{children.title}</h1>

      <div className={styles.buttons}>
        <button onClick={onVoteHandler} className={voteBtnClasses}>
          {message}
        </button>
        <button
          className={cx(styles.button, styles.trash)}
          onClick={deleteHandler}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Issue;
