import { Arg, UseMiddleware, Mutation, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";

import User from "../../entity/User";
import RegisterInput from "./register/RegisterInput";
import isAuth from "../middleware/isAuth";
import sendEmail from "../../utils/sendEmail";
import createConfirmationUrl from "../../utils/createConfirmationUrl";

@Resolver()
export default class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "hello world";
  }

  @Mutation(() => User)
  async register(@Arg("data") { firstName, lastName, email, password }: RegisterInput): Promise<User> {
    const hash = await bcrypt.hash(password, 12);
    const user = User.create({ firstName, lastName, email, password: hash });
    await user.save();
    await sendEmail(email, await createConfirmationUrl(user.id));
    return user;
  }
}
