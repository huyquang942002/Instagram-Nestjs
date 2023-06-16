import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  username: string;

  @HideField()
  @Column()
  password: string;

  @Field()
  @Column()
  DOB: Date;

  @Field()
  @Column()
  bio: string;
}
