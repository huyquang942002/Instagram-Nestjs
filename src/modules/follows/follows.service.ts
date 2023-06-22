import { Injectable } from '@nestjs/common';
import { CreateFollowInput } from './dto/create-follow.input';

@Injectable()
export class FollowsService {
  create(createFollowInput: CreateFollowInput) {
    return 'This action adds a new follow';
  }

  findAll() {
    return `This action returns all follows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }


  remove(id: number) {
    return `This action removes a #${id} follow`;
  }
}
