import { ScoreEntity } from '@app/entities';

export interface IScoreInstanceModel extends Omit<ScoreEntity, 'user'> {}
