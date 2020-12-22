import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsEnum } from 'class-validator';

import { IUpdateUserInputModel } from '@app/common/user';
import { GenderType } from '@app/models/gender.type';
import { LocaleType } from '@app/models/locale.type';

@InputType()
export class UpdateUserInputType
  implements Pick<IUpdateUserInputModel, 'nickname' | 'phoneNumber' | 'locale' | 'gender'> {
  @Field((type) => String)
  @IsOptional()
  @IsString()
  public nickname: IUpdateUserInputModel['nickname'];

  @Field((type) => String)
  @IsOptional()
  @IsString()
  public phoneNumber: IUpdateUserInputModel['phoneNumber'];

  @Field((type) => LocaleType)
  @IsOptional()
  @IsEnum(LocaleType)
  public locale: IUpdateUserInputModel['locale'];

  @Field((type) => GenderType)
  @IsOptional()
  @IsEnum(GenderType)
  public gender: IUpdateUserInputModel['gender'];
}
