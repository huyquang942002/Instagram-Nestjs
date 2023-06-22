import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ProfileResolver } from './profiles.resolver';
import { ProfileService } from './profiles.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    // PassportModule,
    // JwtModule.register({
    //   secret: 'accessToken',
    //   signOptions: { expiresIn: '7d' },
    // }),
    AuthModule,
  ],

  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
