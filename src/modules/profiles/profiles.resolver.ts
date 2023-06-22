import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Profile } from './entities/profile.entity';
import { Request } from 'express';
import { ProfileService } from './profiles.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Args('createProfile') createProfileInput: CreateProfileInput,
    @Context('req') req: Request,
  ): Promise<Profile> {
    return await this.profileService.create(createProfileInput, req);
  }

  @Query(() => [Profile])
  // @UseGuards(JwtAuthGuard)
  async getAllProfiles(): Promise<Profile[]> {
    const result = this.profileService.findAll();
    if (!result) {
      return [];
    }
    return result;
  }

  // @Query(() => Profile)
  // @UseGuards(JwtAuthGuard)
  // async searchProfileByUserId(
  //   @Args('userId') userId: string,
  // ): Promise<Profile> {
  //   try {
  //     return await this.profileService.getProfileByUser(userId);
  //   } catch (err) {
  //     throw new NotFoundException(err.message);
  //   }
  // }

  @Query(() => Profile)
  @UseGuards(JwtAuthGuard)
  async getProfileByUser1(@Context('req') req: Request) {
    return this.profileService.getProfileByUser(req);
  }
}
