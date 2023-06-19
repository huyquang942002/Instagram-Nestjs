import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsEmail } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SignupUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  // @MinLength(6)
  password: string;
}
