import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import {
  CommonScoreService,
  IScoreInstanceModel,
  ICreateScoreInstanceInputModel,
  IUpdateScoreInstanceInputModel,
} from '@app/common/score';

import {
  IScoreTransportModel,
  ICreateScoreTransportInputModel,
  IUpdateScoreTransportInputModel,
} from './transport-models';

@Injectable()
export class BusinessScoreService {
  constructor(private readonly commonScoreService: CommonScoreService) {}

  @Transactional()
  public async getScoreById(scoreId: number): Promise<IScoreTransportModel> {
    const scoreModel = await this.commonScoreService.getScoreById(scoreId);
    const scoreObject = this.convertModelToObject(scoreModel);

    return scoreObject;
  }

  @Transactional()
  public async getScoresByUserId(userId: number): Promise<IScoreTransportModel[]> {
    const scoreModels = await this.commonScoreService.getScoresByUserId(userId);
    const scoreObjects = scoreModels.map((scoreModel) => this.convertModelToObject(scoreModel));

    return scoreObjects;
  }

  @Transactional()
  public async createScore(userId: number, scoreInput: ICreateScoreTransportInputModel): Promise<IScoreTransportModel> {
    const scoreInputModel = this.convertCreateInputToCreateInputModel(userId, scoreInput);
    const scoreModel = await this.commonScoreService.createScore(scoreInputModel);
    const scoreObject = this.convertModelToObject(scoreModel);

    return scoreObject;
  }

  @Transactional()
  public async updateScore(
    scoreId: number,
    scoreInput: IUpdateScoreTransportInputModel,
  ): Promise<IScoreTransportModel> {
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

  private convertModelToObject(model: IScoreInstanceModel): IScoreTransportModel {
    const transportModel: IScoreTransportModel = {
      id: model.id,
      userId: model.userId,
      playedAt: model.playedAt,
      frameInformation: model.frameInformation,
      score: model.score,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return transportModel;
  }

  private convertCreateInputToCreateInputModel(
    userId: number,
    input: ICreateScoreTransportInputModel,
  ): ICreateScoreInstanceInputModel {
    const inputModel: ICreateScoreInstanceInputModel = {
      userId,
      frameInformation: input.frameInformation,
      playedAt: input.playedAt,
      score: input.score,
    };

    return inputModel;
  }

  private convertUpdateInputToUpdateInputModel(input: IUpdateScoreTransportInputModel): IUpdateScoreInstanceInputModel {
    const inputModel: IUpdateScoreInstanceInputModel = {
      frameInformation: input.frameInformation,
      playedAt: input.playedAt,
      score: input.score,
    };

    return inputModel;
  }
}
