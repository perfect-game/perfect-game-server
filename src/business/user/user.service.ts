import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { CommonUserService } from '@app/common/user';
import { IUserModel, ICreateUserInputModel, IUpdateUserInputModel } from '@app/models/data-models/user';
import { UserObjectType, UpdateUserInputType } from '@app/models/transport-models/user';

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
    await this.commonUserService.enableUser(userId);

    return true;
  }

  @Transactional()
  public async disableUser(userId: number): Promise<boolean> {
    await this.commonUserService.disableUser(userId);

    return true;
  }

  @Transactional()
  public async deleteUser(userId: number): Promise<boolean> {
    await this.commonUserService.deleteUser(userId);

    return true;
  }

  protected convertUsertModelToObject(model: IUserModel): UserObjectType {
    const object: UserObjectType = {
      id: model.id,
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
