export type UserType = {
  name: string;
  selection?: number;
};
export type RoomType = {
  code: string;
  name: string;
  users: UserType[];
};
