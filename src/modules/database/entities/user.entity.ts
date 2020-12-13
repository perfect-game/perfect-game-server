import { Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@app/models/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
}
