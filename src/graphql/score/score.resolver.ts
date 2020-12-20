import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { BusinessScoreService } from '@app/business/score';
import { ScoreObjectType, ScoreInputType } from '@app/models/transport-models/score';

@Resolver()
export class ScoreResolver {
  constructor(private readonly businessScoreService: BusinessScoreService) {}

  @Query((returns) => ScoreObjectType)
  public async getScore(@Args('scoreId', { type: () => Int }) scoreId: number): Promise<ScoreObjectType> {
    const scoreObject = await this.businessScoreService.getScoreById(scoreId);

    return scoreObject;
  }

  @Mutation((returns) => ScoreObjectType)
  public async createScore(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('score', { type: () => ScoreInputType }) scoreInput: ScoreInputType,
  ): Promise<ScoreObjectType> {
    const scoreObject = await this.businessScoreService.createScore(userId, scoreInput);

    return scoreObject;
  }

  @Mutation((returns) => ScoreObjectType)
  public async updateScore(
    @Args('scoreId', { type: () => Int }) scoreId: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('score', { type: () => ScoreInputType }) scoreInput: ScoreInputType,
  ): Promise<ScoreObjectType> {
    const scoreObject = await this.businessScoreService.updateScore(scoreId, userId, scoreInput);

    return scoreObject;
  }

  @Mutation((returns) => Boolean)
  public async deleteScore(@Args('scoreId', { type: () => Int }) scoreId: number): Promise<boolean> {
    await this.businessScoreService.deleteScoreById(scoreId);

    return true;
  }

  @Mutation((returns) => Boolean)
  public async deleteScoreByUserId(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    await this.businessScoreService.deleteScoresByUserId(userId);

    return true;
  }
}
