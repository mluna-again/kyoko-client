export type UserType = {
  name: string;
  selection?: boolean|number;
  emoji?: string;
  team?: string;
  offline?: boolean;
};

export type UserWithSelection = {
  name: string;
  selection?: number;
  emoji?: string;
  team?: string;
  offline?: boolean;
};

export type RoomType = {
  code: string;
  name: string;
  users: UserType[];
  teamsEnabled: boolean;
  ratingType: string;
};

export type Issue = {
  id?: string;
  title: string;
  description?: string;
  result?: number;
};
