import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsArray, IsDate, IsNumber } from 'class-validator';

import { ICreateScoreTransportInputModel } from '@app/business/score';

@InputType()
export class CreateScoreInputType implements Omit<ICreateScoreTransportInputModel, 'userId'> {
  @Field((type) => [[Int]], { nullable: true })
  @IsOptional()
  @IsArray()
  public frameInformation: ICreateScoreTransportInputModel['frameInformation'];

  @Field((type) => Date)
  @IsNotEmpty()
  @IsDate()
  public playedAt!: ICreateScoreTransportInputModel['playedAt'];

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  public score!: ICreateScoreTransportInputModel['score'];
}
