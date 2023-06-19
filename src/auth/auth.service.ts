import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from 'src/modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  JWT_ACCESS_TOKEN_SECRET,
  accessToken,
} from './constants/auth.constant';

@Injectable()
export class AuthService {
  async accessToken(user: User) {
    const token = sign(
      {
        userId: user.id,
      },
      'accessToken',
      { expiresIn: '7d' },
    );
    return token;
  }
}
