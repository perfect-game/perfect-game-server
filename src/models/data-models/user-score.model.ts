import { FrameInformationType } from '@app/models/frame-information.type';

export interface IUserScoreModel {
  userId: number;
  frameInformation?: FrameInformationType | null;
  score: number;
  playedAt: Date;
}
