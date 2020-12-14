import { ObjectType, Field, Int } from '@nestjs/graphql';

import { IUserModel } from '@app/models/data-models/user';

@ObjectType()
export class UserObjectType implements Omit<IUserModel, 'cognitoUserName'> {
  @Field((type) => Int)
  public id!: IUserModel['id'];

  @Field((type) => String)
  public userName!: IUserModel['userName'];

  @Field((type) => Date)
  public createdAt!: IUserModel['createdAt'];

  @Field((type) => Date)
  public updatedAt!: IUserModel['updatedAt'];

  @Field((type) => Date, { nullable: true })
  public disabledAt: IUserModel['disabledAt'];
}
