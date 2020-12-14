import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { IUserModel } from '@app/models/data-models/user';

@InputType()
export class UpdateUserInputType implements Pick<IUserModel, 'userName'> {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  public userName!: IUserModel['userName'];
}
