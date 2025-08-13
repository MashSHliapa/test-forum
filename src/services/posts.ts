import { postsListEndpoint, usersEndpoint } from '../api';
import { client } from '../utils/client';

export const requestPostsList = async () => {
  const { data } = await client.get(postsListEndpoint);
  return data;
};

export const requestUsers = async () => {
  const { data } = await client.get(usersEndpoint);
  return data;
};

export const requestCreatePost = async (postData: { userId: number; title: string; body: string }) => {
  const { data } = await client.post(postsListEndpoint, postData);
  return data;
};
