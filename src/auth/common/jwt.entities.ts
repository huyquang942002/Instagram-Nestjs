import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class IJwt {
  @Field({ nullable: true })
  id: string;
}

@ObjectType()
export class JwtPayload {
  @Field(() => IJwt, { nullable: true })
  userId: IJwt;

  @Field(() => User, { nullable: true })
  user: User;
}
