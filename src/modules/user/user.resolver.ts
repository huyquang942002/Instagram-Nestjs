import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { LoginUserInput, SignupUserInput } from 'src/auth/dto/auth.input';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

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

  // @Query(() => User, { name: 'getUserByID' })
  // findOne(@Args('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Query(() => User, { name: 'deActive' })
  @UseGuards(JwtAuthGuard)
  async deActive(@Context('req') req: Request) {
    return await this.userService.deActive(req);
  }
}
