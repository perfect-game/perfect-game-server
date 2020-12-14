import { IUserModel } from './user.model';

export interface ICreateUserInputModel extends Pick<IUserModel, 'cognitoUserName' | 'userName'> {}
