import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupUserInput } from 'src/auth/dto/auth.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async signup(signupUserInput: SignupUserInput) {
    if (!signupUserInput.email || !signupUserInput.password) {
      throw new NotFoundException('Please provide a valid email or password!');
    }
    const isExistEmail = await this.findOneByEmail(signupUserInput.email);

    if (isExistEmail) {
      throw new NotFoundException('Email has been sign up!');
    }

    // const otp = this.mailService.generateOTP();

    // console.log(otp)

    const user = this.usersRepository.create(signupUserInput);

    await this.usersRepository.save(user);

    // await this.mailService.sendOTPEmail(user.email, otp);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }
}
