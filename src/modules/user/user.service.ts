import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserInput, SignupUserInput } from 'src/auth/dto/auth.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService,
    private authService: AuthService,
  ) {}

  async signup(signupUserInput: SignupUserInput): Promise<User> {
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

    user.password = await bcrypt.hash(signupUserInput.password, 10);

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

  async login(loginInput: LoginUserInput): Promise<User> {
    if (!loginInput.email || !loginInput.password) {
      throw new NotFoundException('Please input email or password');
    }

    const user = await this.findOneByEmail(loginInput.email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isValid = await bcrypt.compare(loginInput.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException("You've entered an incorrect password!");
    }

    const accessToken = await this.authService.accessToken(user);

    user.accessToken = accessToken;

    await this.usersRepository.save(user);

    return user;
  }
}
