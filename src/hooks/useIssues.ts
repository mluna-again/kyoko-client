import { useState } from 'react';
import { Issue } from "../constants/types";

const useIssues = () => {
	const [issues, setIssues] = useState<Issue[]>([]);

	const addIssue = (issue: Issue) => {
		issue.id = Math.random().toString(36);
		setIssues([...issues, issue]);
	};

	const removeIssue = (issue: string) => {
		setIssues(issues.filter((i: any) => i.id !== issue));
	};

	return { issues, addIssue, removeIssue };
}

export default useIssues;
