import { useState, useEffect } from "react";
import axios from "axios";
import { Issue } from "../constants/types";
import { SERVER_URL } from "../constants/values";

const useIssues = (room: string) => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const getIssues = async () => {
      const url = `${SERVER_URL}/api/issues/${room}`;
      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error("Error fetching issues");
      }

      setIssues(response.data?.data);
    };

    getIssues();
  }, [room]);

  const addIssue = async (issue: Issue) => {
    const url = `${SERVER_URL}/api/issues`;
    const response = await axios.post(url, {
      issue: {
        ...issue,
        room,
      },
    });

    if (response.status !== 201) {
      throw new Error("Error creating issue");
    }

    setIssues([...issues, response.data?.data]);
  };

  const removeIssue = async (issueId: string) => {
		const url = `${SERVER_URL}/api/issues/${issueId}`;
		const response = await axios.delete(url);

		if (response.status !== 204) {
			throw new Error("Error deleting issue");
		}

    setIssues(issues.filter((i: any) => i.id !== issueId));
  };

  return { issues, addIssue, removeIssue };
};

export default useIssues;
