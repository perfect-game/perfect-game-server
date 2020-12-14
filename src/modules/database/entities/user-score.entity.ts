import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { FrameInformationType } from '@app/models/frame-information.type';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_score' })
export class UserScoreEntity extends BaseEntity {
  @PrimaryColumn({ name: 'user_id', type: 'int', unsigned: true })
  public userId!: number;

  @Column({ name: 'frame_information', type: 'json', nullable: true })
  public frameInformation?: FrameInformationType | null;

  @Column({ type: 'smallint', unsigned: true })
  public score!: number;

  @Column({ name: 'played_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public playedAt!: Date;

  @ManyToOne((type) => UserEntity, (entity) => entity.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user?: UserEntity;
}
