import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { BusinessUserService } from '@app/business/user';
import { UserObjectType, CreateUserInputType, UpdateUserInputType } from '@app/models/transport-models/user';

@Resolver()
export class UserResolver {
  constructor(private readonly businessUserService: BusinessUserService) {}

  @Query((returns) => UserObjectType)
  public async getUser(@Args('userId', { type: () => Int }) userId: number): Promise<UserObjectType> {
    const userObject = await this.businessUserService.getUser(userId);

    return userObject;
  }

  @Mutation((returns) => UserObjectType)
  public async createUser(
    @Args('user', { type: () => CreateUserInputType }) userInput: CreateUserInputType,
  ): Promise<UserObjectType> {
    const userObject = await this.businessUserService.createUser(userInput);

    return userObject;
  }

  @Mutation((returns) => UserObjectType)
  public async updateUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('user', { type: () => UpdateUserInputType }) userInput: UpdateUserInputType,
  ): Promise<UserObjectType> {
    const userObject = await this.businessUserService.updateUser(userId, userInput);

    return userObject;
  }

  @Mutation((returns) => Boolean)
  public async enableUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    const result = await this.businessUserService.enableUser(userId);

    return result;
  }

  @Mutation((returns) => Boolean)
  public async disableUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    const result = await this.businessUserService.disableUser(userId);

    return result;
  }
}
