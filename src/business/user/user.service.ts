import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { CommonUserService } from '@app/common/user';
import { IUserModel, ICreateUserInputModel, IUpdateUserInputModel } from '@app/models/data-models/user';
import { UserObjectType, CreateUserInputType, UpdateUserInputType } from '@app/models/transport-models/user';

import { BusinessService } from '@app/business/business.service';

@Injectable()
export class BusinessUserService extends BusinessService {
  constructor(private readonly commonUserService: CommonUserService) {
    super();
  }

  @Transactional()
  public async getUser(userId: number): Promise<UserObjectType> {
    const userModel = await this.commonUserService.getUser(userId);
    const userObject = this.convertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async createUser(userInput: CreateUserInputType): Promise<UserObjectType> {
    const createUserInputModel = this.convertCreateInputToModel(userInput);
    const userModel = await this.commonUserService.createUser(createUserInputModel);
    const userObject = this.convertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async updateUser(userId: number, userInput: UpdateUserInputType): Promise<UserObjectType> {
    const updateUserInputModel = this.convertUpdateInputToModel(userInput);
    const userModel = await this.commonUserService.updateUser(userId, updateUserInputModel);
    const userObject = this.convertModelToObject(userModel);

    return userObject;
  }

  @Transactional()
  public async enableUser(userId: number): Promise<boolean> {
    const result = await this.commonUserService.enableUser(userId);

    return result;
  }

  @Transactional()
  public async disableUser(userId: number): Promise<boolean> {
    const result = await this.commonUserService.disableUser(userId);

    return result;
  }

  protected convertModelToObject(model: IUserModel): UserObjectType {
    const object: UserObjectType = {
      id: model.id,
      userName: model.userName,
      disabledAt: model.disabledAt,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return object;
  }

  protected convertCreateInputToModel(input: CreateUserInputType): ICreateUserInputModel {
    const model: ICreateUserInputModel = {
      cognitoUserName: input.cognitoUserName,
      userName: input.userName,
    };

    return model;
  }

  protected convertUpdateInputToModel(input: UpdateUserInputType): IUpdateUserInputModel {
    const model: IUpdateUserInputModel = {
      userName: input.userName,
    };

    return model;
  }
}
