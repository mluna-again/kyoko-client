import { Issue as IssueType } from "../constants/types";

type Props = {
	children: IssueType;
	setAsActive: (issue: IssueType|null) => void;
	active: IssueType|null;
}
const Issue = ({ children, setAsActive, active }: Props) => {
	const beingVoted = active?.id === children.id;
	const onVoteHandler = () => {
		if (beingVoted) {
			setAsActive(null);
			return
		}

		setAsActive(children);
	};

	const message = beingVoted ? "Voting" : "Vote";

	return <div>
		<h1>{children.title}</h1>
		<button onClick={onVoteHandler}>{message}</button>
	</div>
}

export default Issue
