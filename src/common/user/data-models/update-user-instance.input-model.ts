import { IUserInstanceInputModel } from './user-instance.input-model';

export interface IUpdateUserInstanceInputModel extends Omit<IUserInstanceInputModel, 'cognitoUserName'> {}
