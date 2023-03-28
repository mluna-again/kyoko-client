import { useState } from "react";
import cx from "classnames";
import { Issue } from "../constants/types";
import useInput from "../hooks/useInput";
import styles from "./NewIssue.module.css";

type Props = {
  addIssue: (issue: Issue) => void;
};
const NewIssue = ({ addIssue }: Props) => {
  const [inputOpen, setInputOpen] = useState(false);
  const openInput = () => setInputOpen(true);
  const closeInput = () => setInputOpen(false);

  const {
    value: issueTitle,
    onChange: onChangeIssueTitle,
    onReset: resetIssueTitle,
  } = useInput();
  const addIssueWrapper = () => {
    addIssue({ title: issueTitle, id: "0" });
    closeInput();
    resetIssueTitle();
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addIssueWrapper();
  };

  const formClasses = cx(styles.form, {
    [styles.open]: inputOpen,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitHandler} className={formClasses}>
        <input
          type="text"
          placeholder="New issue"
          onChange={onChangeIssueTitle}
          value={issueTitle}
        />
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
        >
          Add new issue
        </button>
      </div>
    </div>
  );
};

export default NewIssue;
