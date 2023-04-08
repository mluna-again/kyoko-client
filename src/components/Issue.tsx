import { useState } from "react";
import { Channel } from "phoenix";
import cx from "classnames";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useKyokoStore } from "../store";
import { Issue as IssueType } from "../constants/types";
import styles from "./Issue.module.css";
import LoadingBars from "./LoadingBars";

type Props = {
  children: IssueType;
  onDelete: (id: string) => Promise<void>;
  channel?: Channel;
};
const Issue = ({ children, onDelete, channel }: Props) => {
  const { votingIssue, setVotingIssue } = useKyokoStore((state) => state);

  const beingVoted = votingIssue?.id === children.id;
  const onVoteHandler = () => {
    if (beingVoted) {
      channel?.push("issues:clearVote", children);
      return;
    }

    channel?.push("issues:setVote", children);
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
            setDeleting(false);
            if (votingIssue?.id === children.id) setVotingIssue(null);
          });
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{children.title}</h1>
      {children.description && (
        <p className={styles.description}>{children.description}</p>
      )}
      {children.result && (
        <span className={styles.result}>Result: {children.result}</span>
      )}

      <div className={styles.buttons}>
        <button onClick={onVoteHandler} className={voteBtnClasses}>
          {message}
        </button>
        <button
          className={cx(styles.button, styles.trash)}
          onClick={deleteHandler}
        >
          {deleting ? (
            <LoadingBars />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Issue;
