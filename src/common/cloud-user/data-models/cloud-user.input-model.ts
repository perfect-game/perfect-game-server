import { ICloudUserModel } from './cloud-user.model';

export interface ICloudUserInputModel
  extends Omit<ICloudUserModel, 'email' | 'emailVerified' | 'phoneNumberVerified' | 'userName'> {}
