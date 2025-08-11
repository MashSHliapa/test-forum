export interface IPostsCard {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IDataPostsListResponse {
  loading: boolean;
  error: null | string;
  data: IPostsCard[];
}

export interface IUsersCard {
  userId: number;
  id: number;
  name: string;
  username: string;
  website: string;
  company: {
    name: string;
  };
}

export interface IDataUsersResponse {
  loading: boolean;
  error: null | string;
  data: IUsersCard[];
}
