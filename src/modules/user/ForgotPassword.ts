import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 as uuid } from "uuid";

import sendEmail from "../../utils/sendEmail";
import User from "../../entity/User";
import redis from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export default class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ email });

    if (!user) return false;

    const token = uuid();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration
    await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);
    return true;
  }
}
