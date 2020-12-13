import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { UserScoreEntity } from '../entities';

@EntityRepository(UserScoreEntity)
export class UserScoreRepository extends BaseRepository<UserScoreEntity> {}
