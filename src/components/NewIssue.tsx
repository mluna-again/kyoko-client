import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import cx from "classnames";
import { Issue } from "../constants/types";
import useInput from "../hooks/useInput";
import styles from "./NewIssue.module.css";

type Props = {
  addIssue: (issue: Issue) => Promise<void>;
};
const NewIssue = ({ addIssue }: Props) => {
  const [creatingIssue, setCreatingIssue] = useState(false);

  const [inputOpen, setInputOpen] = useState(false);
  const openInput = () => setInputOpen(true);
  const closeInput = () => setInputOpen(false);

  const {
    value: issueTitle,
    onChange: onChangeIssueTitle,
    onReset: resetIssueTitle,
  } = useInput();

  const {
    value: issueDescription,
    onChange: onChangeIssueDescription,
    onReset: resetIssueDescription,
  } = useInput();

  const addIssueWrapper = () => {
    if (!issueTitle) return;
    if (creatingIssue) return;

    const successAlert = () => toast.success("Issue added successfully");
    const failureAlert = () => toast.error("Issue could not be added");

    setCreatingIssue(true);
    closeInput();
    resetIssueTitle();
    resetIssueDescription();
    addIssue({ title: issueTitle, description: issueDescription })
      .then(successAlert)
      .catch(failureAlert)
      .finally(() => setCreatingIssue(false));
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (creatingIssue) return;

    addIssueWrapper();
  };

  const formClasses = cx(styles.form, {
    [styles.open]: inputOpen,
  });

  const containerClasses = cx(styles.container, {
    [styles.open]: inputOpen,
  });

  return (
    <div className={containerClasses}>
      <form onSubmit={onSubmitHandler} className={formClasses}>
        <input
          type="text"
          placeholder="Title"
          onChange={onChangeIssueTitle}
          value={issueTitle}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={onChangeIssueDescription}
          value={issueDescription}
        />
        <input type="submit" hidden />
      </form>

      <div className={styles.buttons}>
        {inputOpen && (
          <button onClick={closeInput} className={styles.cancel}>
            Cancel
          </button>
        )}
        <button
          onClick={inputOpen ? addIssueWrapper : openInput}
          className={styles.open}
          disabled={creatingIssue}
        >
          {creatingIssue ? (
            <TailSpin
              height="25"
              width="25"
              color="white"
              ariaLabel="loading"
            />
          ) : (
            "Add Issue"
          )}
        </button>
      </div>
    </div>
  );
};

export default NewIssue;
