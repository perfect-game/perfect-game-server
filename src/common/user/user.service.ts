import { Injectable } from '@nestjs/common';

import { CommonSiteUserService, IUserInstanceModel } from '@app/common/site-user';
import { CommonCloudUserService, ICloudUserModel, IUpdateCloudUserInputModel } from '@app/common/cloud-user';

import { IUserModel, ICreateUserInputModel, IUpdateUserInputModel } from './data-models';

@Injectable()
export class CommonUserService {
  constructor(
    private readonly commonSiteUserService: CommonSiteUserService,
    private readonly commonCloudUserService: CommonCloudUserService,
  ) {}

  public async getUserById(userId: number): Promise<IUserModel> {
    const userInstanceModel = await this.commonSiteUserService.getUserById(userId);

    const cloudUserName = userInstanceModel.cloudUserName;
    const cloudUserModel = await this.commonCloudUserService.getCloudUserByUserName(cloudUserName);

    const userModel = this.mergeUserInstanceModelAndCloudUserModel(userInstanceModel, cloudUserModel);

    return userModel;
  }

  public async getUserByAccessToken(accessToken: string): Promise<IUserModel> {
    const cloudUserModel = await this.getCloudUserByAccessToken(accessToken);
    const cloudUserName = cloudUserModel.userName;

    const userInstanceModel = await this.commonSiteUserService.getUserByCloudUserName(cloudUserName);

    const userModel = this.mergeUserInstanceModelAndCloudUserModel(userInstanceModel, cloudUserModel);

    return userModel;
  }

  public async createUser(userInputModel: ICreateUserInputModel): Promise<IUserModel> {
    const userInstanceModel = await this.commonSiteUserService.createUser(userInputModel);

    const cloudUserName = userInstanceModel.cloudUserName;
    const cloudUserModel = await this.commonCloudUserService.getCloudUserByUserName(cloudUserName);

    const userModel = this.mergeUserInstanceModelAndCloudUserModel(userInstanceModel, cloudUserModel);

    return userModel;
  }

  public async updateUser(userId: number, userInputModel: IUpdateUserInputModel): Promise<IUserModel> {
    const userInstanceModel = await this.commonSiteUserService.updateUser(userId, userInputModel);

    const cloudUserName = userInstanceModel.cloudUserName;
    const updateCloudUserInputModel = this.convertUserUpdateInputModelToCloudUserUpdateInputModel(userInputModel);
    const cloudUserModel = await this.commonCloudUserService.updateCloudUser(cloudUserName, updateCloudUserInputModel);

    const userModel = this.mergeUserInstanceModelAndCloudUserModel(userInstanceModel, cloudUserModel);

    return userModel;
  }

  public async deleteUser(userId: number): Promise<boolean> {
    const userInstanceModel = await this.commonSiteUserService.getUserById(userId);

    if (!userInstanceModel.disabledAt) {
      throw new Error('The user has to disabled first to be deleted.');
    }

    userInstanceModel.disabledAt = new Date();

    await this.commonSiteUserService.deleteUserById(userId);

    const cloudUserName = userInstanceModel.cloudUserName;

    await this.commonCloudUserService.deleteUser(cloudUserName);

    return true;
  }

  public async getCloudUserByAccessToken(accessToken: string): Promise<ICloudUserModel> {
    const cloudUserModel = await this.commonCloudUserService.getCloudUserByAccessToken(accessToken);

    return cloudUserModel;
  }

  private convertUserUpdateInputModelToCloudUserUpdateInputModel(
    userInputModel: IUpdateUserInputModel,
  ): IUpdateCloudUserInputModel {
    const updateCloudUserInputModel: IUpdateCloudUserInputModel = {
      phoneNumber: userInputModel.phoneNumber,
      nickname: userInputModel.nickname,
      locale: userInputModel.locale,
      gender: userInputModel.gender,
    };

    return updateCloudUserInputModel;
  }

  private mergeUserInstanceModelAndCloudUserModel(
    instanceModel: IUserInstanceModel,
    cloudUserModel: ICloudUserModel,
  ): IUserModel {
    const userModel: IUserModel = { ...instanceModel, ...cloudUserModel };

    return userModel;
  }
}
