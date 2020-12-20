import { ScoreEntity } from '@app/modules/database/entities';

export interface IScoreInstanceModel extends Omit<ScoreEntity, 'user'> {}
