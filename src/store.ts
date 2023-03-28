import { create } from "zustand"

type KyokoState = {
	votingIssue: string|null
	setVotingIssue: (issue: string|null) => void
}
export const useKyokoStore = create<KyokoState>(set => ({
	votingIssue: null,
	setVotingIssue: (votingIssue: string|null) => set({ votingIssue })
}));
