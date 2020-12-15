import { IUserInstanceModel } from './user-instance.model';

export interface IUserInstanceInputModel extends Omit<IUserInstanceModel, 'id' | 'createdAt' | 'updatedAt'> {}
