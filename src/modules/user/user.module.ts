import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { MailModule } from '../email/email.module'; // Import MailModule
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ], // Include MailModule here
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
