import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { UserTypeType } from '@app/models/user-type.type';

import { BaseEntity } from './base.entity';
import { ScoreEntity } from './score.entity';

@Unique('cognito_user_name', ['cognitoUserName'])
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id!: number;

  @Column({ name: 'type', type: 'enum', enum: UserTypeType, default: UserTypeType.Normal })
  public type!: UserTypeType;

  @Column({ name: 'cognito_user_name', type: 'varchar', length: 40, comment: 'Cognito User UUID' })
  public cognitoUserName!: string;

  @Column({ name: 'disabled_at', type: 'timestamp', nullable: true, default: null })
  public disabledAt?: Date | null;

  @OneToMany((type) => ScoreEntity, (entity) => entity.userId, { cascade: true })
  public scores?: ScoreEntity[] | null;
}
