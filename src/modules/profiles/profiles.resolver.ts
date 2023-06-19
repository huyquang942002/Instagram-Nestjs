import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Profile } from './entities/profile.entity';
import { Request } from 'express';
import { ProfileService } from './profiles.service';
import { CreateProfileInput } from './dto/create-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('createProfile') createProfileInput: CreateProfileInput,
    @Context('req') req: Request,
  ): Promise<Profile> {
    return await this.profileService.create(createProfileInput, req);
  }

  @Query(() => [Profile])
  async getAllProfiles(): Promise<Profile[]> {
    const result = this.profileService.findAll();
    if (!result) {
      return [];
    }
    return result;
  }
}
