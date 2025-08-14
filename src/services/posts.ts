import { commentsEndpoint, postsListEndpoint, usersEndpoint } from '../api';
import { client } from '../utils/client';

export const requestPostsList = async () => {
  const { data } = await client.get(postsListEndpoint);
  return data;
};

export const requestUsers = async () => {
  const { data } = await client.get(usersEndpoint);
  return data;
};

export const requestComments = async (id: string) => {
  const { data } = await client.get(postsListEndpoint + '/' + id + '/' + commentsEndpoint);
  return data;
};

export const requestCardItem = async (id: string) => {
  const { data } = await client.get(postsListEndpoint + '/' + id);
  return data;
};

export const requestCreatePost = async (postData: { userId: number; title: string; body: string }) => {
  const { data } = await client.post(postsListEndpoint, postData);
  return data;
};

export const requestDeletePost = async (id: string) => {
  const { data } = await client.delete(postsListEndpoint + '/' + id);
  return data;
};
