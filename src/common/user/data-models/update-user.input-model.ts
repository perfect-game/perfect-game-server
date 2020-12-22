import { IUpdateUserInstanceInputModel } from '@app/common/site-user';
import { IUpdateCloudUserInputModel } from '@app/common/cloud-user';

export interface IUpdateUserInputModel
  extends Partial<IUpdateUserInstanceInputModel>,
    Partial<IUpdateCloudUserInputModel> {}
