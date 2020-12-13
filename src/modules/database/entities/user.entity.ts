import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { IUserModel } from '@app/models/data-models';

import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUserModel {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id!: number;

  @Column({ name: 'cognito_user_name', type: 'varchar', length: 40, unique: true })
  public cognitoUserName!: string;

  @Column({ name: 'user_name', type: 'varchar', length: 20 })
  public userName!: string;
}
