import { IUserInstanceInputModel } from './user-instance.input-model';

export interface ICreateUserInstanceInputModel extends Omit<IUserInstanceInputModel, 'type' | 'disabledAt'> {}
