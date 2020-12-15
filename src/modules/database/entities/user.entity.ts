import { Entity, Unique, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Unique('cognito_user_name', ['cognitoUserName'])
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id!: number;

  @Column({ name: 'cognito_user_name', type: 'varchar', length: 40 })
  public cognitoUserName!: string;

  @Column({ name: 'disabled_at', type: 'timestamp', nullable: true, default: null })
  public disabledAt?: Date | null;
}
