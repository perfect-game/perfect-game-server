import { Injectable } from '@nestjs/common';

import { UserEntity } from '@app/modules/database/entities';
import { UserRepository } from '@app/modules/database/repositories';
import { IUserModel, ICreateUserInputModel, IUpdateUserInputModel } from '@app/models/data-models/user';

import { CommonService } from '@app/common/common.service';

@Injectable()
export class CommonUserService extends CommonService {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  public async getUser(userId: number): Promise<IUserModel> {
    const userInstance = await this.userRepository.getUser(userId);
    const userModel = this.convertInstanceToModel(userInstance);

    return userModel;
  }

  public async createUser(createUserInputModel: ICreateUserInputModel): Promise<IUserModel> {
    let userInstance = this.userRepository.create();

    userInstance.cognitoUserName = createUserInputModel.cognitoUserName;
    userInstance.userName = createUserInputModel.userName;

    userInstance = await this.userRepository.save(userInstance);

    const userModel = this.convertInstanceToModel(userInstance);

    return userModel;
  }

  public async updateUser(userId: number, updateUserInputModel: IUpdateUserInputModel): Promise<IUserModel> {
    let userInstance = await this.userRepository.getUser(userId);

    userInstance.userName = updateUserInputModel.userName;

    userInstance = await this.userRepository.save({ ...userInstance, id: userId });

    const userModel = this.convertInstanceToModel(userInstance);

    return userModel;
  }

  public async enableUser(userId: number): Promise<boolean> {
    const userInstance = await this.userRepository.getUser(userId);

    if (!userInstance.disabledAt) {
      throw new Error('The user is enabled already.');
    }

    userInstance.disabledAt = null;

    await this.userRepository.save(userInstance);

    return true;
  }

  public async disableUser(userId: number): Promise<boolean> {
    const userInstance = await this.userRepository.getUser(userId);

    if (userInstance.disabledAt) {
      throw new Error('The user is disabled already.');
    }

    userInstance.disabledAt = new Date();

    await this.userRepository.save(userInstance);

    return true;
  }

  protected convertInstanceToModel(instance: UserEntity): IUserModel {
    const model: IUserModel = {
      id: instance.id,
      cognitoUserName: instance.cognitoUserName,
      userName: instance.userName,
      disabledAt: instance.disabledAt,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return model;
  }
}
