import { ObjectType, Field, Int } from '@nestjs/graphql';

import { IUserModel } from '@app/common/user';
import { UserTypeType } from '@app/models/user-type.type';
import { LocaleType } from '@app/models/locale.type';
import { GenderType } from '@app/models/gender.type';

@ObjectType()
export class UserObjectType implements Omit<IUserModel, 'userName'> {
  @Field((type) => Int)
  public id!: IUserModel['id'];

  @Field((type) => UserTypeType)
  public type!: IUserModel['type'];

  @Field((type) => String)
  public cognitoUserName!: IUserModel['cognitoUserName'];

  @Field((type) => String)
  public email!: IUserModel['email'];

  @Field((type) => Boolean)
  public emailVerified!: IUserModel['emailVerified'];

  @Field((type) => String)
  public phoneNumber!: IUserModel['phoneNumber'];

  @Field((type) => Boolean)
  public phoneNumberVerified!: IUserModel['phoneNumberVerified'];

  @Field((type) => String)
  public nickname!: IUserModel['nickname'];

  @Field((type) => LocaleType)
  public locale!: IUserModel['locale'];

  @Field((type) => GenderType)
  public gender!: IUserModel['gender'];

  @Field((type) => Date, { nullable: true })
  public disabledAt: IUserModel['disabledAt'];

  @Field((type) => Date)
  public createdAt!: IUserModel['createdAt'];

  @Field((type) => Date)
  public updatedAt!: IUserModel['updatedAt'];
}
