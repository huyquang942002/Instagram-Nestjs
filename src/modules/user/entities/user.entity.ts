import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from 'src/modules/profiles/entities/profile.entity';

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
  @Column({ nullable: true, default: null })
  accessToken?: string;

  // Profiles relationship: 1-1
  @OneToOne(() => Profile, (profile) => profile.user)
  @Field(() => Profile, { nullable: true })
  profile: Profile;
}
