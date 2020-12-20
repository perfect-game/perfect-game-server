import { IScoreInstanceModel } from './score-intsntace.model';

export interface IScoreInstanceInputModel
  extends Pick<IScoreInstanceModel, 'userId' | 'frameInformation' | 'playedAt' | 'score'> {}
