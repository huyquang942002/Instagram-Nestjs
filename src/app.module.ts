import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/user/user.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Profile } from './modules/profiles/entities/profile.entity';
import { ProfileModule } from './modules/profiles/profiles.module';
import { JwtStrategy } from './auth/strategies/jwt.stategies';
import { MailModule } from './modules/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Follow } from './modules/follows/entities/follow.entity';
import { FollowsModule } from './modules/follows/follows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp-mail.outlook.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: 'hideonbush8405@gmail.com',
    //       pass: 'himfzfdgbjkazlbx',
    //       //hducsfiwooabnuyp
    //     },
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ig',
      entities: [User, Profile, Follow],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
    }),
    ProfileModule,
    UserModule,
    MailModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
