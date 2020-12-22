import { IUpdateUserInputModel } from '@app/common/user';

export interface IUpdateUserTransportInputModel
  extends Pick<IUpdateUserInputModel, 'nickname' | 'phoneNumber' | 'locale' | 'gender'> {}
