import { Injectable } from '@nestjs/common';

import { ScoreEntity } from '@app/entities';

import { ScoreRepository } from './score.repository';
import { IScoreInstanceModel, IScoreInstanceInputModel } from './data-models';

@Injectable()
export class CommonScoreService {
  constructor(private readonly scoreRepository: ScoreRepository) {}

  public async getScoreById(scoreId: number): Promise<IScoreInstanceModel> {
    const scoreInstance = await this.scoreRepository.getScoreById(scoreId);
    const scoreInstanceModel = this.convertScoreInstanceToModel(scoreInstance);

    return scoreInstanceModel;
  }

  public async getScoresByUserId(userId: number): Promise<IScoreInstanceModel[]> {
    const scoreInstances = await this.scoreRepository.getScoresByUserId(userId);
    const scoreInstanceModels = scoreInstances.map((scoreInstance) => this.convertScoreInstanceToModel(scoreInstance));

    return scoreInstanceModels;
  }

  public async createScore(scoreInput: IScoreInstanceInputModel): Promise<IScoreInstanceModel> {
    let scoreInstance = this.scoreRepository.create();

    scoreInstance.userId = scoreInput.userId;
    scoreInstance.frameInformation = scoreInput.frameInformation;
    scoreInstance.playedAt = scoreInput.playedAt;
    scoreInstance.score = scoreInput.score;

    scoreInstance = await this.scoreRepository.save(scoreInstance);

    const scoreInstanceModel = this.convertScoreInstanceToModel(scoreInstance);

    return scoreInstanceModel;
  }

  public async updateScore(scoreId: number, scoreInput: IScoreInstanceInputModel): Promise<IScoreInstanceModel> {
    let scoreInstance = await this.scoreRepository.getScoreById(scoreId);

    scoreInstance.frameInformation = scoreInput.frameInformation;
    scoreInstance.playedAt = scoreInput.playedAt;
    scoreInstance.score = scoreInput.score;

    scoreInstance = await this.scoreRepository.save({ ...scoreInstance, id: scoreId });

    const scoreInstanceModel = this.convertScoreInstanceToModel(scoreInstance);

    return scoreInstanceModel;
  }

  public async deleteScoreById(scoreId: number): Promise<boolean> {
    await this.scoreRepository.deleteScoreById(scoreId);

    return true;
  }

  public async deleteScoresByUserId(userId: number): Promise<boolean> {
    await this.scoreRepository.deleteScoresByUserId(userId);

    return true;
  }

  private convertScoreInstanceToModel(scoreInstance: ScoreEntity): IScoreInstanceModel {
    const model: IScoreInstanceModel = {
      id: scoreInstance.id,
      userId: scoreInstance.userId,
      playedAt: scoreInstance.playedAt,
      frameInformation: scoreInstance.frameInformation,
      score: scoreInstance.score,
      createdAt: scoreInstance.createdAt,
      updatedAt: scoreInstance.updatedAt,
    };

    return model;
  }
}
