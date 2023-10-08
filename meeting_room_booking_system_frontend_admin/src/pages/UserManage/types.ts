export interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

export interface UserSearchResult {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
  isFrozen: boolean;
}
