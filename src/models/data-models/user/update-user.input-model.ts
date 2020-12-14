import { IUserModel } from './user.model';

export interface IUpdateUserInputModel extends Pick<IUserModel, 'userName'> {}
