import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';

@Resolver(() => Follow)
export class FollowsResolver {
  constructor(private readonly followsService: FollowsService) {}

  @Mutation(() => Follow)
  createFollow(@Args('createFollowInput') createFollowInput: CreateFollowInput) {
    return this.followsService.create(createFollowInput);
  }

  @Query(() => [Follow], { name: 'follows' })
  findAll() {
    return this.followsService.findAll();
  }

  @Query(() => Follow, { name: 'follow' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followsService.findOne(id);
  }
 

  @Mutation(() => Follow)
  removeFollow(@Args('id', { type: () => Int }) id: number) {
    return this.followsService.remove(id);
  }
}
