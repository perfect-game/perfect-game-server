import { IUserInstanceInputModel } from './user-instance.input-model';

export interface IUpdateUserInstanceInputModel extends Partial<Omit<IUserInstanceInputModel, 'cognitoUserName'>> {}
