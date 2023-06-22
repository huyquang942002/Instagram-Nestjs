import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { getIdFromToken } from '../utils/jwt';
import { Request } from 'express';
import { CreateProfileInput } from './dto/create-profile.input';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    private authService: AuthService,
  ) {}

  async create(
    createProfileInput: CreateProfileInput,
    req: Request,
  ): Promise<Profile> {
    const userId: string = getIdFromToken(req);
    const profile: Profile = this.profilesRepository.create(createProfileInput);
    profile.userId = userId;

    const existProfile = await this.existProfile(userId);
    if (existProfile) {
      throw new Error('Your profile is exist!');
    }

    return await this.profilesRepository.save(profile);
  }

  async existProfile(userId: string): Promise<Profile> {
    return await this.profilesRepository.findOneBy({ userId });
  }

  async findAll(): Promise<Profile[]> {
    return await this.profilesRepository.find({
      relations: {
        user: true,
      },
    });
  }

  // async searchProfileByUserId(userId: string): Promise<Profile> {
  //   const profile: Profile = await this.profilesRepository.findOne({
  //     where: {
  //       userId,
  //     },
  //     relations: {
  //       user: true,
  //     },
  //   });

  //   if (!profile) {
  //     throw new NotFoundException('This profile is not exist!');
  //   }
  //   const isActive = profile.user.isActive;

  //   if (!isActive) {
  //     throw new NotFoundException('This user is not exist!');
  //   }
  //   return profile;
  // }

  async findOneById(id: string): Promise<Profile> {
    return await this.profilesRepository.findOneBy({ id });
  }

  async getProfileByUser(req: Request) {
    const userId: string = getIdFromToken(req);
    const profile: Profile = await this.profilesRepository.findOne({
      where: {
        userId,
      },
      relations: {
        user: true,
      },
    });
    if (!profile) {
      throw new NotFoundException('This profile is not exist!');
    }

    const isActive = profile.user.isActive;

    if (!isActive) {
      throw new NotFoundException('The account has been locked by the user!');
    }
    return profile;
  }
}
