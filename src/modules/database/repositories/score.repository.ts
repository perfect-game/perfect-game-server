import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { ScoreEntity } from '../entities';

@EntityRepository(ScoreEntity)
export class ScoreRepository extends BaseRepository<ScoreEntity> {}
