import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsArray, IsDate, IsNumber } from 'class-validator';

import { IScoreInstanceInputModel } from '@app/models/data-models/score';

@InputType()
export class ScoreInputType implements Omit<IScoreInstanceInputModel, 'userId'> {
  @Field((type) => [[Int]], { nullable: true })
  @IsOptional()
  @IsArray()
  public frameInformation: IScoreInstanceInputModel['frameInformation'];

  @Field((type) => Date)
  @IsNotEmpty()
  @IsDate()
  public playedAt!: IScoreInstanceInputModel['playedAt'];

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  public score!: IScoreInstanceInputModel['score'];
}
