import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { LoginUserInput, SignupUserInput } from 'src/auth/dto/auth.input';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async signup(
    @Args('SignUp') signupUserInput: SignupUserInput,
  ): Promise<User> {
    return this.userService.signup(signupUserInput);
  }

  @Mutation(() => User)
  login(@Args('Login') loginUserInput: LoginUserInput): Promise<User> {
    return this.userService.login(loginUserInput);
  }

  @Query(() => User, { name: 'getUserByID' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }
}
