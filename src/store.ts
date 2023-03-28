import { create } from "zustand";
import { Issue } from "./constants/types";

type KyokoState = {
  votingIssue: Issue | null;
  setVotingIssue: (issue: Issue | null) => void;
};
export const useKyokoStore = create<KyokoState>((set) => ({
  votingIssue: null,
  setVotingIssue: (votingIssue: Issue | null) => set({ votingIssue }),
}));
