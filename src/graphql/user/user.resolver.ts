import { Resolver, Query, Mutation, Context, Args, Int } from '@nestjs/graphql';

import { IGraphQLContext } from '@app/modules/graphql';
import { BusinessUserService } from '@app/business/user';
import { UserObjectType, UpdateUserInputType } from '@app/business/user/transport-models';

@Resolver()
export class UserResolver {
  constructor(private readonly businessUserService: BusinessUserService) {}

  @Query((returns) => UserObjectType)
  public async getUser(@Args('userId', { type: () => Int }) userId: number): Promise<UserObjectType> {
    const userObject = await this.businessUserService.getUser(userId);

    return userObject;
  }

  @Mutation((returns) => UserObjectType)
  public async createUser(@Context() context: IGraphQLContext): Promise<UserObjectType> {
    const accessToken = context.accessToken;

    if (!accessToken) {
      throw new Error('No exists access token in GraphQL context.');
    }

    const userObject = await this.businessUserService.createUser(accessToken);

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
    await this.businessUserService.enableUser(userId);

    return true;
  }

  @Mutation((returns) => Boolean)
  public async disableUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    await this.businessUserService.disableUser(userId);

    return true;
  }

  @Mutation((returns) => Boolean)
  public async deleteUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    await this.businessUserService.deleteUser(userId);

    return true;
  }
}
