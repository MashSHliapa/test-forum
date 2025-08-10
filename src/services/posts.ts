import { postsListEndpoint } from '../api';
import { client } from '../utils/client';

export const requestPostsList = async () => {
  const { data } = await client.get(postsListEndpoint);
  return data;
};
