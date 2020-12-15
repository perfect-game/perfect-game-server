import { IUserInstanceModel } from './user-instance.model';
import { ICognitoUserModel } from './cognito-user.model';

export interface IUserModel extends IUserInstanceModel, ICognitoUserModel {}
