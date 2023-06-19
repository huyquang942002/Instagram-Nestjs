import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { verifyToken } from '../utils/jwt';
import { Request } from 'express';
import { CreateProfileInput } from './dto/create-profile.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async create(
    createProfileInput: CreateProfileInput,
    req: Request,
  ): Promise<Profile> {
    const userId: string = verifyToken(req);
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
}
