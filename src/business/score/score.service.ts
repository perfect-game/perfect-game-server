import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { CommonScoreService } from '@app/common/score';
import { IScoreInstanceModel, IScoreInstanceInputModel } from '@app/models/data-models/score';
import { ScoreObjectType, ScoreInputType } from '@app/models/transport-models/score';

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
  public async createScore(userId: number, scoreInput: ScoreInputType): Promise<ScoreObjectType> {
    const scoreInputModel = this.convertInputToInputModel(userId, scoreInput);
    const scoreModel = await this.commonScoreService.createScore(scoreInputModel);
    const scoreObject = this.convertModelToObject(scoreModel);

    return scoreObject;
  }

  @Transactional()
  public async updateScore(scoreId: number, userId: number, scoreInput: ScoreInputType): Promise<ScoreObjectType> {
    const scoreInputModel = this.convertInputToInputModel(userId, scoreInput);
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
    const object: ScoreObjectType = {
      id: model.id,
      userId: model.userId,
      playedAt: model.playedAt,
      frameInformation: model.frameInformation,
      score: model.score,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return object;
  }

  private convertInputToInputModel(userId: number, input: ScoreInputType): IScoreInstanceInputModel {
    const inputModel: IScoreInstanceInputModel = {
      userId,
      frameInformation: input.frameInformation,
      playedAt: input.playedAt,
      score: input.score,
    };

    return inputModel;
  }
}
