import { IScoreInstanceModel } from './score-intsntace.model';

export interface IUpdateScoreInstanceInputModel extends Partial<Omit<IScoreInstanceModel, 'userId'>> {}
