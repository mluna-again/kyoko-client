export type UserType = {
  name: string;
  selection?: number;
  emoji?: string;
};
export type RoomType = {
  code: string;
  name: string;
  users: UserType[];
};
