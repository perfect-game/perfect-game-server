import { Resolver, Query, Mutation, Context, Args, Int } from '@nestjs/graphql';

import { IGraphQLContext } from '@app/modules/graphql';
import { UserTypeType } from '@app/models/user-type.type';
import { BusinessUserService, IUserTransportModel } from '@app/business/user';

import { UserObjectType, UpdateUserInputType } from './types';

@Resolver()
export class UserResolver {
  constructor(private readonly businessUserService: BusinessUserService) {}

  @Query((returns) => UserObjectType)
  public async getUser(@Args('userId', { type: () => Int }) userId: number): Promise<UserObjectType> {
    const userTransportModel = await this.businessUserService.getUser(userId);
    const userObject = this.convertUsertModelToObject(userTransportModel);

    return userObject;
  }

  @Mutation((returns) => UserObjectType)
  public async createUser(@Context() context: IGraphQLContext): Promise<UserObjectType> {
    const accessToken = context.accessToken;

    if (!accessToken) {
      throw new Error('No exists access token in GraphQL context.');
    }

    const userTransportModel = await this.businessUserService.createUser(accessToken);
    const userObject = this.convertUsertModelToObject(userTransportModel);

    return userObject;
  }

  @Mutation((returns) => UserObjectType)
  public async updateUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('user', { type: () => UpdateUserInputType }) userInput: UpdateUserInputType,
  ): Promise<UserObjectType> {
    const userTransportModel = await this.businessUserService.updateUser(userId, userInput);
    const userObject = this.convertUsertModelToObject(userTransportModel);

    return userObject;
  }

  @Mutation((returns) => Boolean)
  public async enableUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    await this.businessUserService.enableUser(userId);

    return true;
  }

  @Mutation((returns) => Boolean)
  public async disableUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    await this.businessUserService.disableUser(userId);

    return true;
  }

  @Mutation((returns) => Boolean)
  public async changeUserType(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('userType', { type: () => UserTypeType }) userType: UserTypeType,
  ): Promise<boolean> {
    await this.businessUserService.changeUserType(userId, userType);

    return true;
  }

  @Mutation((returns) => Boolean)
  public async deleteUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    await this.businessUserService.deleteUser(userId);

    return true;
  }

  private convertUsertModelToObject(transportModel: IUserTransportModel): UserObjectType {
    const object = new UserObjectType();

    object.id = transportModel.id;
    object.type = transportModel.type;
    object.cognitoUserName = transportModel.cognitoUserName;
    object.email = transportModel.email;
    object.emailVerified = transportModel.emailVerified;
    object.phoneNumber = transportModel.phoneNumber;
    object.phoneNumberVerified = transportModel.phoneNumberVerified;
    object.nickname = transportModel.nickname;
    object.locale = transportModel.locale;
    object.gender = transportModel.gender;
    object.disabledAt = transportModel.disabledAt;
    object.createdAt = transportModel.createdAt;
    object.updatedAt = transportModel.updatedAt;

    return object;
  }
}
