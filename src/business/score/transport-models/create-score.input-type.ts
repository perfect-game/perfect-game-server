import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsArray, IsDate, IsNumber } from 'class-validator';

import { ICreateScoreInstanceInputModel } from '@app/common/score';

@InputType()
export class CreateScoreInputType implements Omit<ICreateScoreInstanceInputModel, 'userId'> {
  @Field((type) => [[Int]], { nullable: true })
  @IsOptional()
  @IsArray()
  public frameInformation: ICreateScoreInstanceInputModel['frameInformation'];

  @Field((type) => Date)
  @IsNotEmpty()
  @IsDate()
  public playedAt!: ICreateScoreInstanceInputModel['playedAt'];

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  public score!: ICreateScoreInstanceInputModel['score'];
}
