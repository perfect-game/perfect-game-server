import { IUserModel } from '@app/common/user';

export interface IUserTransportModel extends Omit<IUserModel, 'userName'> {}
