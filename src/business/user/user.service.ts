import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { UserTypeType } from '@app/models/user-type.type';
import { CommonUserService, IUserModel, ICreateUserInputModel, IUpdateUserInputModel } from '@app/common/user';

import { IUserTransportModel, IUpdateUserTransportInputModel } from './transport-models';

@Injectable()
export class BusinessUserService {
  constructor(private readonly commonUserService: CommonUserService) {}

  @Transactional()
  public async getUser(userId: number): Promise<IUserTransportModel> {
    const userModel = await this.commonUserService.getUserById(userId);
    const userObject = this.convertUsertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async getUserByAccessToken(accessToken: string): Promise<IUserTransportModel> {
    const userModel = await this.commonUserService.getUserByAccessToken(accessToken);
    const userObject = this.convertUsertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async createUser(accessToken: string): Promise<IUserTransportModel> {
    const cognitoUser = await this.commonUserService.getCognitoUserByAccessToken(accessToken);
    const cognitoUserName = cognitoUser.userName;

    const createUserInputModel = this.convertCognitoUserNameToCreateUserInstanceInputModel(cognitoUserName);
    const userModel = await this.commonUserService.createUser(createUserInputModel);

    const userObject = this.convertUsertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async updateUser(userId: number, userInput: IUpdateUserTransportInputModel): Promise<IUserTransportModel> {
    const updateUserInputModel = this.convertUserInputToUpdateInputModel(userInput);
    const userModel = await this.commonUserService.updateUser(userId, updateUserInputModel);
    const userObject = this.convertUsertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async enableUser(userId: number): Promise<boolean> {
    const userModel = await this.commonUserService.getUserById(userId);

    if (!userModel.disabledAt) {
      throw new Error('The user is enabled already.');
    }

    const updateUserInputModel: IUpdateUserInputModel = { disabledAt: null };

    await this.commonUserService.updateUser(userId, updateUserInputModel);

    return true;
  }

  @Transactional()
  public async disableUser(userId: number): Promise<boolean> {
    const userModel = await this.commonUserService.getUserById(userId);

    if (userModel.disabledAt) {
      throw new Error('The user is disabled already.');
    }

    const updateUserInputModel: IUpdateUserInputModel = { disabledAt: new Date() };

    await this.commonUserService.updateUser(userId, updateUserInputModel);

    return true;
  }

  @Transactional()
  public async changeUserType(userId: number, userType: UserTypeType): Promise<boolean> {
    const updateUserInputModel: IUpdateUserInputModel = { type: userType };

    await this.commonUserService.updateUser(userId, updateUserInputModel);

    return true;
  }

  @Transactional()
  public async deleteUser(userId: number): Promise<boolean> {
    await this.commonUserService.deleteUser(userId);

    return true;
  }

  private convertUsertModelToObject(model: IUserModel): IUserTransportModel {
    const object: IUserTransportModel = {
      id: model.id,
      type: model.type,
      cognitoUserName: model.cognitoUserName,
      email: model.email,
      emailVerified: model.emailVerified,
      phoneNumber: model.phoneNumber,
      phoneNumberVerified: model.phoneNumberVerified,
      nickname: model.nickname,
      locale: model.locale,
      gender: model.gender,
      disabledAt: model.disabledAt,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return object;
  }

  private convertCognitoUserNameToCreateUserInstanceInputModel(cognitoUserName: string): ICreateUserInputModel {
    const model: ICreateUserInputModel = {
      cognitoUserName,
    };

    return model;
  }

  private convertUserInputToUpdateInputModel(input: IUpdateUserTransportInputModel): IUpdateUserInputModel {
    const model: IUpdateUserInputModel = {
      nickname: input.nickname,
      phoneNumber: input.phoneNumber,
      locale: input.locale,
      gender: input.gender,
    };

    return model;
  }
}
