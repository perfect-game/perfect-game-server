import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsArray, IsDate, IsNumber } from 'class-validator';

import { IUpdateScoreTransportInputModel } from '@app/business/score';

@InputType()
export class UpdateScoreInputType implements Omit<IUpdateScoreTransportInputModel, 'userId'> {
  @Field((type) => [[Int]], { nullable: true })
  @IsOptional()
  @IsArray()
  public frameInformation: IUpdateScoreTransportInputModel['frameInformation'];

  @Field((type) => Date)
  @IsOptional()
  @IsDate()
  public playedAt!: IUpdateScoreTransportInputModel['playedAt'];

  @Field((type) => Int)
  @IsOptional()
  @IsNumber()
  public score!: IUpdateScoreTransportInputModel['score'];
}
