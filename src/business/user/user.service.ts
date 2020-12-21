import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { UserTypeType } from '@app/models/user-type.type';
import { CommonUserService, IUserModel, ICreateUserInputModel, IUpdateUserInputModel } from '@app/common/user';

import { UserObjectType, UpdateUserInputType } from './transport-models';

@Injectable()
export class BusinessUserService {
  constructor(private readonly commonUserService: CommonUserService) {}

  @Transactional()
  public async getUser(userId: number): Promise<UserObjectType> {
    const userModel = await this.commonUserService.getUserById(userId);
    const userObject = this.convertUsertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async getUserByAccessToken(accessToken: string): Promise<UserObjectType> {
    const userModel = await this.commonUserService.getUserByAccessToken(accessToken);
    const userObject = this.convertUsertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async createUser(accessToken: string): Promise<UserObjectType> {
    const cognitoUser = await this.commonUserService.getCognitoUserByAccessToken(accessToken);
    const cognitoUserName = cognitoUser.userName;

    const createUserInputModel = this.convertCognitoUserNameToCreateUserInstanceInputModel(cognitoUserName);
    const userModel = await this.commonUserService.createUser(createUserInputModel);

    const userObject = this.convertUsertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async updateUser(userId: number, userInput: UpdateUserInputType): Promise<UserObjectType> {
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

  protected convertUsertModelToObject(model: IUserModel): UserObjectType {
    const object = new UserObjectType();

    object.id = model.id;
    object.type = model.type;
    object.cognitoUserName = model.cognitoUserName;
    object.email = model.email;
    object.emailVerified = model.emailVerified;
    object.phoneNumber = model.phoneNumber;
    object.phoneNumberVerified = model.phoneNumberVerified;
    object.nickname = model.nickname;
    object.locale = model.locale;
    object.gender = model.gender;
    object.disabledAt = model.disabledAt;
    object.createdAt = model.createdAt;
    object.updatedAt = model.updatedAt;

    return object;
  }

  private convertCognitoUserNameToCreateUserInstanceInputModel(cognitoUserName: string): ICreateUserInputModel {
    const model: ICreateUserInputModel = {
      cognitoUserName,
    };

    return model;
  }

  private convertUserInputToUpdateInputModel(input: UpdateUserInputType): IUpdateUserInputModel {
    const model: IUpdateUserInputModel = {
      nickname: input.nickname,
      phoneNumber: input.phoneNumber,
      locale: input.locale,
      gender: input.gender,
    };

    return model;
  }
}
