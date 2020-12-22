import { ObjectType, Field, Int } from '@nestjs/graphql';

import { IScoreTransportModel } from '@app/business/score';

@ObjectType()
export class ScoreObjectType implements IScoreTransportModel {
  @Field((type) => Int)
  public id!: IScoreTransportModel['id'];

  @Field((type) => Int)
  public userId!: IScoreTransportModel['userId'];

  @Field((type) => Date)
  public playedAt!: IScoreTransportModel['playedAt'];

  @Field((type) => [[Int]], { nullable: true })
  public frameInformation: IScoreTransportModel['frameInformation'];

  @Field((type) => Number)
  public score!: IScoreTransportModel['score'];

  @Field((type) => Date)
  public createdAt!: IScoreTransportModel['createdAt'];

  @Field((type) => Date)
  public updatedAt!: IScoreTransportModel['updatedAt'];
}
