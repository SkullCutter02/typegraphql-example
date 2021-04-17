import { v4 as uuid } from "uuid";

import redis from "../redis";
import { confirmUserPrefix } from "../modules/constants/redisPrefixes";

const createConfirmationUrl = async (userId: number): Promise<string> => {
  const token = uuid();
  await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24); // one day expiration
  return `https://localhost:3000/user/confirm/${token}`;
};

export default createConfirmationUrl;
