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
