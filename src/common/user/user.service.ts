import { Injectable } from '@nestjs/common';

import { UserEntity } from '@app/entities';
import { isEmpty } from '@app/utils';

import { UserRepository } from './user.repository';
import { CognitoUserService } from './cognito-user.service';
import {
  IUserModel,
  ICreateUserInputModel,
  IUpdateUserInputModel,
  IUserInstanceModel,
  ICognitoUserModel,
  IUpdateCognitoUserInputModel,
} from './data-models';

@Injectable()
export class CommonUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cognitoUserService: CognitoUserService,
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

  public async updateUser(userId: number, userInputModel: Partial<IUpdateUserInputModel>): Promise<IUserModel> {
    let userInstance = await this.userRepository.getUserById(userId);

    if (userInputModel.type !== undefined) {
      userInstance.type = userInputModel.type;
    }

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
      type: instance.type,
      cognitoUserName: instance.cognitoUserName,
      disabledAt: instance.disabledAt,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return model;
  }

  private convertUserInputModelToCognitoUserUpdateInputModel(
    userInputModel: Partial<IUpdateUserInputModel>,
  ): Partial<IUpdateCognitoUserInputModel> {
    const updateCognitoUserInputModel: Partial<IUpdateCognitoUserInputModel> = {
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
