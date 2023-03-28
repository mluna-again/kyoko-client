import cx from "classnames";
import { useKyokoStore } from "../store";
import styles from "./IssueMenu.module.css";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const IssuesMenu = ({ open, setOpen }: Props) => {
  const { votingIssue, setVotingIssue } = useKyokoStore((state) => state);

  const closeMenu = () => setOpen(false);

  const menuClasses = cx(styles.container, {
    [styles.open]: open,
  });

  const overlayClasses = cx(styles.overlay, {
    [styles.open]: open,
  });

  const votingMessage = votingIssue
    ? `Currently voting \`${votingIssue}\``
    : "Not voting for any issue";

  return (
    <div>
      <div className={overlayClasses} onClick={closeMenu} />
      <div className={menuClasses}>
				<p>{votingMessage}</p>
        <button onClick={() => setVotingIssue("test")}>Set</button>
        <button onClick={() => setVotingIssue(null)}>Remove</button>
      </div>
    </div>
  );
};

export default IssuesMenu;
