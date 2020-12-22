import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { BusinessScoreService, IScoreTransportModel } from '@app/business/score';

import { ScoreObjectType, CreateScoreInputType } from './types';

@Resolver()
export class ScoreResolver {
  constructor(private readonly businessScoreService: BusinessScoreService) {}

  @Query((returns) => ScoreObjectType)
  public async getScore(@Args('scoreId', { type: () => Int }) scoreId: number): Promise<ScoreObjectType> {
    const scoreTransportModel = await this.businessScoreService.getScoreById(scoreId);
    const scoreObject = this.convertTransportModelToObject(scoreTransportModel);

    return scoreObject;
  }

  @Mutation((returns) => ScoreObjectType)
  public async createScore(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('score', { type: () => CreateScoreInputType }) scoreInput: CreateScoreInputType,
  ): Promise<ScoreObjectType> {
    const scoreTransportModel = await this.businessScoreService.createScore(userId, scoreInput);
    const scoreObject = this.convertTransportModelToObject(scoreTransportModel);

    return scoreObject;
  }

  @Mutation((returns) => ScoreObjectType)
  public async updateScore(
    @Args('scoreId', { type: () => Int }) scoreId: number,
    @Args('score', { type: () => CreateScoreInputType }) scoreInput: CreateScoreInputType,
  ): Promise<ScoreObjectType> {
    const scoreTransportModel = await this.businessScoreService.updateScore(scoreId, scoreInput);
    const scoreObject = this.convertTransportModelToObject(scoreTransportModel);

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

  private convertTransportModelToObject(transportModel: IScoreTransportModel): ScoreObjectType {
    let object = new ScoreObjectType();

    object = { ...object, ...transportModel };

    return object;
  }
}
