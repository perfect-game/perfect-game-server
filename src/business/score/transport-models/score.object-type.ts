import { ObjectType, Field, Int } from '@nestjs/graphql';

import { IScoreInstanceModel } from '@app/common/score';

@ObjectType()
export class ScoreObjectType implements IScoreInstanceModel {
  @Field((type) => Int)
  public id!: IScoreInstanceModel['id'];

  @Field((type) => Int)
  public userId!: IScoreInstanceModel['userId'];

  @Field((type) => Date)
  public playedAt!: IScoreInstanceModel['playedAt'];

  @Field((type) => [[Int]], { nullable: true })
  public frameInformation: IScoreInstanceModel['frameInformation'];

  @Field((type) => Number)
  public score!: IScoreInstanceModel['score'];

  @Field((type) => Date)
  public createdAt!: IScoreInstanceModel['createdAt'];

  @Field((type) => Date)
  public updatedAt!: IScoreInstanceModel['updatedAt'];
}
