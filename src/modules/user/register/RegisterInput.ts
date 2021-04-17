import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";

import PasswordInput from "../../shared/PasswordInput";

@InputType()
export default class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;
}
