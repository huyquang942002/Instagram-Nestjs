import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { MailModule } from '../email/email.module'; // Import MailModule
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule, AuthModule], // Include MailModule here
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
