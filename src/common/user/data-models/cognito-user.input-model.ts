import { ICognitoUserModel } from './cognito-user.model';

export interface ICognitoUserInputModel
  extends Omit<ICognitoUserModel, 'email' | 'emailVerified' | 'phoneNumberVerified' | 'userName'> {}
