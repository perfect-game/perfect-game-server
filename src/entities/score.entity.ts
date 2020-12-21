import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import { FrameInformationType } from '@app/models/frame-information.type';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'score' })
export class ScoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id!: number;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  public userId!: number;

  @Column({ name: 'played_at', type: 'timestamp' })
  public playedAt!: Date;

  @Column({ name: 'frame_information', type: 'json', nullable: true, default: null })
  public frameInformation?: FrameInformationType | null;

  @Column({ name: 'score', type: 'smallint', unsigned: true })
  public score!: number;

  @ManyToOne((type) => UserEntity, (entity) => entity.scores)
  @JoinColumn({ name: 'user_id' })
  public user!: UserEntity;
}
