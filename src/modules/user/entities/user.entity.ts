import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { Follow } from 'src/modules/follows/entities/follow.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Field()
  @Column()
  email: string;

  @HideField()
  @Column()
  password: string;

  @HideField()
  @Column({ length: 500, nullable: true, default: null })
  accessToken?: string;

  // Profiles relationship: 1-1
  @OneToOne(() => Profile, (profile) => profile.user)
  @Field(() => Profile, { nullable: true })
  profile: Profile;

  @Field({ defaultValue: true })
  @Column({ default: true })
  isActive: boolean;

  // Followers relationship: 1-n
  @OneToMany(() => Follow, (follow) => follow.following_users)
  followers: Follow[];

  // Followings relationship: 1-n
  @OneToMany(() => Follow, (follow) => follow.follower_users)
  followings: Follow[];
}
