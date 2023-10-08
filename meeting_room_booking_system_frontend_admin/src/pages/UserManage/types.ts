export interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

export interface UserSearchResult {
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
}
