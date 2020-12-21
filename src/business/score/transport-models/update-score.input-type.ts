import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsArray, IsDate, IsNumber } from 'class-validator';

import { IUpdateScoreInstanceInputModel } from '@app/common/score';

@InputType()
export class UpdateScoreInputType implements Omit<IUpdateScoreInstanceInputModel, 'userId'> {
  @Field((type) => [[Int]], { nullable: true })
  @IsOptional()
  @IsArray()
  public frameInformation: IUpdateScoreInstanceInputModel['frameInformation'];

  @Field((type) => Date)
  @IsOptional()
  @IsDate()
  public playedAt!: IUpdateScoreInstanceInputModel['playedAt'];

  @Field((type) => Int)
  @IsOptional()
  @IsNumber()
  public score!: IUpdateScoreInstanceInputModel['score'];
}
