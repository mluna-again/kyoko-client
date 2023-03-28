import { useState } from "react";
import cx from "classnames";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useKyokoStore } from "../store";
import { Issue as IssueType } from "../constants/types";
import styles from "./Issue.module.css";

type Props = {
  children: IssueType;
  onDelete: (id: string) => Promise<void>;
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

  const [deleting, setDeleting] = useState(false);
  const deleteHandler = () => {
    if (deleting) return;
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
        if (!children.id) return;

        setDeleting(true);
        onDelete(children.id)
          .then(() => toast.success("Issue deleted successfully"))
          .catch(() => toast.error("Failed to delete issue"))
          .finally(() => {
            setVotingIssue(null);
            setDeleting(false);
          });
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
          {deleting ? (
            <TailSpin
              height="25"
              width="25"
              color="white"
              ariaLabel="loading"
            />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Issue;
