import { IUpdateUserInstanceInputModel } from './update-user-instance.input-model';
import { IUpdateCognitoUserInputModel } from './update-cognito-user.input-model';

export interface IUpdateUserInputModel
  extends Partial<IUpdateUserInstanceInputModel>,
    Partial<IUpdateCognitoUserInputModel> {}
