import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { ScoreEntity } from '@app/entities';

@EntityRepository(ScoreEntity)
export class ScoreRepository extends BaseRepository<ScoreEntity> {
  public async getScoreById(scoreId: number): Promise<ScoreEntity> {
    const scoreInstance = await this.findOneOrFail({
      where: { id: scoreId },
    });

    return scoreInstance;
  }

  public async getScoresByUserId(userId: number): Promise<ScoreEntity[]> {
    const scoreInstances = await this.find({
      where: { userId },
    });

    return scoreInstances;
  }

  public async deleteScoreById(scoreId: number): Promise<boolean> {
    const scoreInstance = await this.getScoreById(scoreId);

    await this.remove(scoreInstance);

    return true;
  }

  public async deleteScoresByUserId(userId: number): Promise<boolean> {
    const scoreInstances = await this.getScoresByUserId(userId);

    await this.remove(scoreInstances);

    return true;
  }
}
