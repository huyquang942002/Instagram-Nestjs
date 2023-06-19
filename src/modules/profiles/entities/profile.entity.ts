import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Profile {
  @Field()
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Field()
  @Column()
  userName: string;

  @Field({ nullable: true, defaultValue: null })
  @Column({ nullable: true, default: null })
  dob: String;

  @Field({ nullable: true, defaultValue: null })
  @Column({ nullable: true, default: null })
  bio: string;

  // Users relationships: 1-1
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;

  @Column()
  @Field()
  userId: string;
}
