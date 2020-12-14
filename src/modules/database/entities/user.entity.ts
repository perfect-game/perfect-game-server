import { Entity, Unique, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Unique('cognito_user_name', ['cognitoUserName'])
@Unique('user_name', ['userName'])
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id!: number;

  @Column({ name: 'cognito_user_name', type: 'varchar', length: 40 })
  public cognitoUserName!: string;

  @Column({ name: 'user_name', type: 'varchar', length: 20 })
  public userName!: string;

  @Column({ name: 'disabled_at', type: 'timestamp', nullable: true, default: null })
  public disabledAt?: Date | null;
}
