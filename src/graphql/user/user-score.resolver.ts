import { Resolver, ResolveField, Parent, Float } from '@nestjs/graphql';

import { BusinessScoreService, IScoreTransportModel } from '@app/business/score';
import { UserObjectType } from '@app/business/user';

import { ScoreObjectType } from '@app/graphql/score';

@Resolver(() => UserObjectType)
export class UserScoreResolver {
  constructor(private readonly businessScoreService: BusinessScoreService) {}

  @ResolveField((returns) => [ScoreObjectType])
  public async scores(@Parent() userObject: UserObjectType): Promise<ScoreObjectType[]> {
    const userId = userObject.id;
    const scoreTransportModels = await this.businessScoreService.getScoresByUserId(userId);
    const scoreObjects = scoreTransportModels.map((scoreTransportModel) =>
      this.convertTransportModelToObject(scoreTransportModel),
    );

    return scoreObjects;
  }

  @ResolveField((returns) => Float)
  public async averageScore(@Parent() userObject: UserObjectType): Promise<number> {
    const userId = userObject.id;
    const userObjects = await this.businessScoreService.getScoresByUserId(userId);
    const scoreSum = userObjects.map((userObject) => userObject.score).reduce((sum, score) => sum + score, 0);
    const averageScore = scoreSum / userObjects.length || 0;

    return averageScore;
  }

  private convertTransportModelToObject(transportModel: IScoreTransportModel): ScoreObjectType {
    let object = new ScoreObjectType();

    object = { ...object, ...transportModel };

    return object;
  }
}
