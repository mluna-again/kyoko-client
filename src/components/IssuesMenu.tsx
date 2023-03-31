import cx from "classnames";
import { Channel } from "phoenix";
import { useKyokoStore } from "../store";
import useIssues from "../hooks/useIssues";
import Issue from "./Issue";
import NewIssue from "./NewIssue";
import styles from "./IssueMenu.module.css";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  room: string;
  channel?: Channel;
};
const IssuesMenu = ({ open, setOpen, room, channel }: Props) => {
  const { votingIssue } = useKyokoStore((state) => state);
  const { issues, addIssue, removeIssue } = useIssues(room, channel);

  const closeMenu = () => setOpen(false);

  const menuClasses = cx(styles.container, {
    [styles.open]: open,
  });

  const overlayClasses = cx(styles.overlay, {
    [styles.open]: open,
  });

  const votingMessage = votingIssue
    ? `Currently voting "${votingIssue.title}"`
    : "Not voting for any issue";

  return (
    <div>
      <div className={overlayClasses} onClick={closeMenu} />
      <div className={menuClasses}>
        <h1 className={styles.title}>Issues</h1>
        <p className={styles.info}>{votingMessage}</p>

        <div className={styles.list}>
          {issues.map((issue) => (
            <Issue key={issue.id} onDelete={removeIssue} channel={channel}>
              {issue}
            </Issue>
          ))}
          <NewIssue addIssue={addIssue} />
        </div>
      </div>
    </div>
  );
};

export default IssuesMenu;
