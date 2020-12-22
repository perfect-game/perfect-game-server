import { ICreateScoreInstanceInputModel } from '@app/common/score';

export interface ICreateScoreTransportInputModel extends Omit<ICreateScoreInstanceInputModel, 'userId'> {}
