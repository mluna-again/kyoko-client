import { useState } from "react";
import { Issue } from "../constants/types";
import useInput from "../hooks/useInput";

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

  return (
    <div>
      {inputOpen && (
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="New issue"
            onChange={onChangeIssueTitle}
            value={issueTitle}
          />
        </form>
      )}

      <div>
        {inputOpen && <button onClick={closeInput}>Cancel</button>}
        <button onClick={inputOpen ? addIssueWrapper : openInput}>
          Add new issue
        </button>
      </div>
    </div>
  );
};

export default NewIssue;
