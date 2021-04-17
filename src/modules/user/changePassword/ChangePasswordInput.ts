import { Field, InputType } from "type-graphql";

import PasswordInput from "../../shared/PasswordInput";

@InputType()
export default class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
