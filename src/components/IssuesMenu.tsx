import cx from "classnames";
import { useKyokoStore } from "../store";
import useIssues from "../hooks/useIssues";
import Issue from "./Issue";
import NewIssue from "./NewIssue";
import styles from "./IssueMenu.module.css";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const IssuesMenu = ({ open, setOpen }: Props) => {
  const { votingIssue, setVotingIssue } = useKyokoStore((state) => state);
  const { issues, addIssue } = useIssues();

  const closeMenu = () => setOpen(false);

  const menuClasses = cx(styles.container, {
    [styles.open]: open,
  });

  const overlayClasses = cx(styles.overlay, {
    [styles.open]: open,
  });

  const votingMessage = votingIssue
    ? `Currently voting \`${votingIssue.title}\``
    : "Not voting for any issue";

  return (
    <div>
      <div className={overlayClasses} onClick={closeMenu} />
      <div className={menuClasses}>
        <h1>Issues</h1>
        <p>{votingMessage}</p>

        {issues.map((issue) => (
          <Issue setAsActive={setVotingIssue} active={votingIssue}>{issue}</Issue>
        ))}

        <NewIssue addIssue={addIssue} />
      </div>
    </div>
  );
};

export default IssuesMenu;
