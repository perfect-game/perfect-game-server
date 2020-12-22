import { IUpdateScoreInstanceInputModel } from '@app/common/score';

export interface IUpdateScoreTransportInputModel extends Omit<IUpdateScoreInstanceInputModel, 'userId'> {}
