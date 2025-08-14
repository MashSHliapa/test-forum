import type { JSX } from 'react';

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

export interface IDataPostResponse {
  loading: boolean;
  error: null | string;
  data: IPostsCard;
}

export interface IUsersCard {
  userId: number;
  id: number;
  name: string;
  username: string;
  website: string;
  email?: string;
  company: {
    name: string;
  };
}

export interface IDataUsersResponse {
  loading: boolean;
  error: null | string;
  data: IUsersCard[];
}

export interface FormDataType {
  name?: string;
  username?: string;
  email?: string;
  website?: string;
  company?: string;
}

export interface IProtectedRouteProps {
  children: JSX.Element;
}

export interface ICreatePostResponse {
  data: IPostsCard[];
  loading: boolean;
  error: string | null;
}

export interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IDataCommentsResponse {
  data: IComments[];
  loading: boolean;
  error: string | null;
}
