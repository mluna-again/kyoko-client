import { useState, useEffect } from "react";
import { Channel } from "phoenix";
import axios from "axios";
import { Issue } from "../constants/types";
import { SERVER_URL } from "../constants/values";
import { useKyokoStore } from "../store";

const useIssues = (room: string, channel?: Channel) => {
	const { setVotingIssue, votingIssue } = useKyokoStore(state => state);
  const [issues, setIssues] = useState<Issue[]>([]);

  const removeIssueHandler = (issue: any) => {
		if (votingIssue?.id === issue.id) {
			setVotingIssue(null)
		}
    setIssues((issues) => issues.filter((i: any) => i.id !== issue.id));
  };
  const addIssueHandler = (issue: any) => {
    setIssues((issues) => [...issues, issue]);
  };
	const clearVote = () => {
		setVotingIssue(null)
	}
	const setVote = (issue: any) => {
		setVotingIssue(issue)
	}

  useEffect(() => {
    const getIssues = async () => {
      const url = `${SERVER_URL}/api/issues/${room}`;
      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error("Error fetching issues");
      }

      setIssues(response.data?.data);
    };

    channel?.on("issues:new", addIssueHandler);
    channel?.on("issues:delete", removeIssueHandler);
		channel?.on("issues:clearVote", clearVote);
		channel?.on("issues:setVote", setVote);

    getIssues();

    return () => {
      channel?.off("issues:new");
      channel?.off("issues:delete");
      channel?.off("issues:clearVote");
      channel?.off("issues:setVote");
    };
  }, [room, channel]);

  const addIssue = async (issue: Issue) => {
    const url = `${SERVER_URL}/api/issues`;
    const response = await axios.post(url, {
      issue: {
        ...issue,
        room,
      },
    });

    const data = response.data?.data;

    if (response.status !== 201) {
      throw new Error("Error creating issue");
    }

    channel?.push("issues:new", data);
  };

  const removeIssue = async (issueId: string) => {
    const url = `${SERVER_URL}/api/issues/${issueId}`;
    const response = await axios.delete(url);

    if (response.status !== 204) {
      throw new Error("Error deleting issue");
    }

    channel?.push("issues:delete", { id: issueId });
  };

  return { issues, addIssue, removeIssue };
};

export default useIssues;
