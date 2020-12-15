import { Injectable } from '@nestjs/common';

import { UserEntity } from '@app/modules/database/entities';
import { UserRepository } from '@app/modules/database/repositories';
import {
  IUserModel,
  ICreateUserInputModel,
  IUpdateUserInputModel,
  IUserInstanceModel,
  ICognitoUserModel,
  IUpdateCognitoUserInputModel,
} from '@app/models/data-models/user';

import { CognitoUserService } from './cognito-user.service';

@Injectable()
export class CommonUserService {
  constructor(
    private readonly cognitoUserService: CognitoUserService,
    private readonly userRepository: UserRepository,
  ) {}

  public async getUserById(userId: number): Promise<IUserModel> {
    const userInstance = await this.userRepository.getUserById(userId);
    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    const cognitoUserName = userInstance.cognitoUserName;
    const cognitoUserModel = await this.cognitoUserService.getCognitoUserByUserName(cognitoUserName);

    const userModel = this.mergeUserInstanceModelAndCognitoUserModel(userInstanceModel, cognitoUserModel);

    return userModel;
  }

  public async getUserByAccessToken(accessToken: string): Promise<IUserModel> {
    const cognitoUserModel = await this.getCognitoUserByAccessToken(accessToken);
    const cognitoUserName = cognitoUserModel.userName;

    const userInstance = await this.userRepository.getUserByCognitoUserName(cognitoUserName);
    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    const userModel = this.mergeUserInstanceModelAndCognitoUserModel(userInstanceModel, cognitoUserModel);

    return userModel;
  }

  public async createUser(userInputModel: ICreateUserInputModel): Promise<IUserModel> {
    let userInstance = this.userRepository.create();

    userInstance.cognitoUserName = userInputModel.cognitoUserName;

    userInstance = await this.userRepository.save(userInstance);

    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    const cognitoUserName = userInstance.cognitoUserName;
    const cognitoUserModel = await this.cognitoUserService.getCognitoUserByUserName(cognitoUserName);

    const userModel = this.mergeUserInstanceModelAndCognitoUserModel(userInstanceModel, cognitoUserModel);

    return userModel;
  }

  public async updateUser(userId: number, userInputModel: IUpdateUserInputModel): Promise<IUserModel> {
    let userInstance = await this.userRepository.getUserById(userId);

    userInstance = await this.userRepository.save({ ...userInstance, id: userId });

    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    const cognitoUserName = userInstance.cognitoUserName;
    const updateCognitoUserInputModel = this.convertUserInputModelToCognitoUserUpdateInputModel(userInputModel);
    const cognitoUserModel = await this.cognitoUserService.updateCognitoUser(
      cognitoUserName,
      updateCognitoUserInputModel,
    );

    const userModel = this.mergeUserInstanceModelAndCognitoUserModel(userInstanceModel, cognitoUserModel);

    return userModel;
  }

  public async enableUser(userId: number): Promise<boolean> {
    const userInstance = await this.userRepository.getUserById(userId);

    if (!userInstance.disabledAt) {
      throw new Error('The user is enabled already.');
    }

    userInstance.disabledAt = null;

    await this.userRepository.save(userInstance);

    const cognitoUserName = userInstance.cognitoUserName;

    await this.cognitoUserService.enableUser(cognitoUserName);

    return true;
  }

  public async disableUser(userId: number): Promise<boolean> {
    const userInstance = await this.userRepository.getUserById(userId);

    if (userInstance.disabledAt) {
      throw new Error('The user is disabled already.');
    }

    userInstance.disabledAt = new Date();

    await this.userRepository.save(userInstance);

    const cognitoUserName = userInstance.cognitoUserName;

    await this.cognitoUserService.disableUser(cognitoUserName);

    return true;
  }

  public async deleteUser(userId: number): Promise<boolean> {
    const userInstance = await this.userRepository.getUserById(userId);

    if (!userInstance.disabledAt) {
      throw new Error('The user has to disabled first to be deleted.');
    }

    userInstance.disabledAt = new Date();

    await this.userRepository.deleteUserById(userId);

    const cognitoUserName = userInstance.cognitoUserName;

    await this.cognitoUserService.deleteUser(cognitoUserName);

    return true;
  }

  public async getCognitoUserByAccessToken(accessToken: string): Promise<ICognitoUserModel> {
    const cognitoUserModel = await this.cognitoUserService.getCognitoUserByAccessToken(accessToken);

    return cognitoUserModel;
  }

  private convertUserInstanceToModel(instance: UserEntity): IUserInstanceModel {
    const model: IUserInstanceModel = {
      id: instance.id,
      cognitoUserName: instance.cognitoUserName,
      disabledAt: instance.disabledAt,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return model;
  }

  private convertUserInputModelToCognitoUserUpdateInputModel(
    userInputModel: IUpdateUserInputModel,
  ): IUpdateCognitoUserInputModel {
    const updateCognitoUserInputModel: IUpdateCognitoUserInputModel = {
      phoneNumber: userInputModel.phoneNumber,
      nickname: userInputModel.nickname,
      locale: userInputModel.locale,
      gender: userInputModel.gender,
    };

    return updateCognitoUserInputModel;
  }

  private mergeUserInstanceModelAndCognitoUserModel(
    instanceModel: IUserInstanceModel,
    cognitoUserModel: ICognitoUserModel,
  ): IUserModel {
    const userModel: IUserModel = { ...instanceModel, ...cognitoUserModel };

    return userModel;
  }
}
