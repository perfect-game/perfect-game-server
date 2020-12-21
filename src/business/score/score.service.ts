import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import {
  CommonScoreService,
  IScoreInstanceModel,
  ICreateScoreInstanceInputModel,
  IUpdateScoreInstanceInputModel,
} from '@app/common/score';

import { ScoreObjectType, CreateScoreInputType, UpdateScoreInputType } from './transport-models';

@Injectable()
export class BusinessScoreService {
  constructor(private readonly commonScoreService: CommonScoreService) {}

  @Transactional()
  public async getScoreById(scoreId: number): Promise<ScoreObjectType> {
    const scoreModel = await this.commonScoreService.getScoreById(scoreId);
    const scoreObject = this.convertModelToObject(scoreModel);

    return scoreObject;
  }

  @Transactional()
  public async getScoresByUserId(userId: number): Promise<ScoreObjectType[]> {
    const scoreModels = await this.commonScoreService.getScoresByUserId(userId);
    const scoreObjects = scoreModels.map((scoreModel) => this.convertModelToObject(scoreModel));

    return scoreObjects;
  }

  @Transactional()
  public async createScore(userId: number, scoreInput: CreateScoreInputType): Promise<ScoreObjectType> {
    const scoreInputModel = this.convertCreateInputToCreateInputModel(userId, scoreInput);
    const scoreModel = await this.commonScoreService.createScore(scoreInputModel);
    const scoreObject = this.convertModelToObject(scoreModel);

    return scoreObject;
  }

  @Transactional()
  public async updateScore(scoreId: number, scoreInput: UpdateScoreInputType): Promise<ScoreObjectType> {
    const scoreInputModel = this.convertUpdateInputToUpdateInputModel(scoreInput);
    const scoreModel = await this.commonScoreService.updateScore(scoreId, scoreInputModel);
    const scoreObject = this.convertModelToObject(scoreModel);

    return scoreObject;
  }

  @Transactional()
  public async deleteScoreById(scoreId: number): Promise<boolean> {
    await this.commonScoreService.deleteScoreById(scoreId);

    return true;
  }

  @Transactional()
  public async deleteScoresByUserId(userId: number): Promise<boolean> {
    await this.commonScoreService.deleteScoresByUserId(userId);

    return true;
  }

  private convertModelToObject(model: IScoreInstanceModel): ScoreObjectType {
    const object = new ScoreObjectType();

    object.id = model.id;
    object.userId = model.userId;
    object.playedAt = model.playedAt;
    object.frameInformation = model.frameInformation;
    object.score = model.score;
    object.createdAt = model.createdAt;
    object.updatedAt = model.updatedAt;

    return object;
  }

  private convertCreateInputToCreateInputModel(
    userId: number,
    input: CreateScoreInputType,
  ): ICreateScoreInstanceInputModel {
    const inputModel: ICreateScoreInstanceInputModel = {
      userId,
      frameInformation: input.frameInformation,
      playedAt: input.playedAt,
      score: input.score,
    };

    return inputModel;
  }

  private convertUpdateInputToUpdateInputModel(input: UpdateScoreInputType): IUpdateScoreInstanceInputModel {
    const inputModel: IUpdateScoreInstanceInputModel = {
      frameInformation: input.frameInformation,
      playedAt: input.playedAt,
      score: input.score,
    };

    return inputModel;
  }
}
