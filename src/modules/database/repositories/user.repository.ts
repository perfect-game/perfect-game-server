import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  public async getUser(userId: number): Promise<UserEntity> {
    const userInstance = await this.findOneOrFail({
      where: { id: userId },
    });

    return userInstance;
  }
}
