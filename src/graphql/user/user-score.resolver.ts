import { Resolver, ResolveField, Parent, Int, Float } from '@nestjs/graphql';

import { BusinessScoreService } from '@app/business/score';
import { UserObjectType } from '@app/business/user/transport-models';
import { ScoreObjectType } from '@app/business/score/transport-models';

@Resolver(() => UserObjectType)
export class UserScoreResolver {
  constructor(private readonly businessScoreService: BusinessScoreService) {}

  @ResolveField((returns) => [ScoreObjectType])
  public async scores(@Parent() userObject: UserObjectType): Promise<ScoreObjectType[]> {
    const userId = userObject.id;
    const userObjects = this.businessScoreService.getScoresByUserId(userId);

    return userObjects;
  }

  @ResolveField((returns) => Float)
  public async averageScore(@Parent() userObject: UserObjectType): Promise<number> {
    const userId = userObject.id;
    const userObjects = await this.businessScoreService.getScoresByUserId(userId);
    const scoreSum = userObjects.map((userObject) => userObject.score).reduce((sum, score) => sum + score, 0);
    const averageScore = scoreSum / userObjects.length || 0;

    return averageScore;
  }
}
