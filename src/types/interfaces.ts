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
