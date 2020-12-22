import { IUserInstanceModel } from '@app/common/site-user';
import { ICloudUserModel } from '@app/common/cloud-user';

export interface IUserModel extends IUserInstanceModel, ICloudUserModel {}
