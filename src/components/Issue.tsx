import cx from "classnames";
import { toast } from "react-toastify";
import swal from "sweetalert2";
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
    swal
      .fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this issue!",
        icon: "warning",
        cancelButtonText: "Cancel",
        confirmButtonColor: "var(--secondary-dark)",
        cancelButtonColor: "var(--primary)",
        showCancelButton: true,
        showClass: {
          popup: "slideIn",
        },
        hideClass: {
          popup: "slideOut",
        },
      })
      .then(({ isConfirmed }) => {
        if (!isConfirmed) return;

        onDelete(children.id);
				setVotingIssue(null);
        toast.success("Issue deleted successfully");
      });
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
