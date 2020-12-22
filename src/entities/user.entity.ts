import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { UserTypeType } from '@app/models/user-type.type';

import { BaseEntity } from './base.entity';
import { ScoreEntity } from './score.entity';

@Unique('cloud_user_name', ['cloudUserName'])
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id!: number;

  @Column({ name: 'type', type: 'enum', enum: UserTypeType, default: UserTypeType.Normal })
  public type!: UserTypeType;

  @Column({ name: 'cloud_user_name', type: 'varchar', length: 40, comment: 'Cloud User UUID' })
  public cloudUserName!: string;

  @Column({ name: 'disabled_at', type: 'timestamp', nullable: true, default: null })
  public disabledAt?: Date | null;

  @OneToMany((type) => ScoreEntity, (entity) => entity.userId, { cascade: true })
  public scores?: ScoreEntity[] | null;
}
