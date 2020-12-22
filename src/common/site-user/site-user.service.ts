import { Injectable } from '@nestjs/common';

import { UserEntity } from '@app/entities';

import { UserRepository } from './user.repository';
import { IUserInstanceModel, ICreateUserInstanceInputModel, IUpdateUserInstanceInputModel } from './data-models';

@Injectable()
export class CommonSiteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserById(userId: number): Promise<IUserInstanceModel> {
    const userInstance = await this.userRepository.getUserById(userId);
    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    return userInstanceModel;
  }

  public async getUserByCloudUserName(cloudUserName: string): Promise<IUserInstanceModel> {
    const userInstance = await this.userRepository.getUserByCloudUserName(cloudUserName);
    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    return userInstanceModel;
  }

  public async createUser(userInputModel: ICreateUserInstanceInputModel): Promise<IUserInstanceModel> {
    let userInstance = this.userRepository.create();
    userInstance = { ...userInstance, ...userInputModel };

    userInstance.cloudUserName = userInputModel.cloudUserName;

    userInstance = await this.userRepository.save(userInstance);

    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    return userInstanceModel;
  }

  public async updateUser(userId: number, userInputModel: IUpdateUserInstanceInputModel): Promise<IUserInstanceModel> {
    let userInstance = await this.userRepository.getUserById(userId);
    userInstance = { ...userInstance, ...userInputModel };

    userInstance = await this.userRepository.save({ ...userInstance, id: userId });

    const userInstanceModel = this.convertUserInstanceToModel(userInstance);

    return userInstanceModel;
  }

  public async deleteUserById(userId: number): Promise<boolean> {
    const userInstance = await this.userRepository.getUserById(userId);

    if (!userInstance.disabledAt) {
      throw new Error('The user has to disabled first to be deleted.');
    }

    userInstance.disabledAt = new Date();

    await this.userRepository.deleteUserById(userId);

    return true;
  }

  private convertUserInstanceToModel(instance: UserEntity): IUserInstanceModel {
    const model: IUserInstanceModel = {
      id: instance.id,
      type: instance.type,
      cloudUserName: instance.cloudUserName,
      disabledAt: instance.disabledAt,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return model;
  }
}
