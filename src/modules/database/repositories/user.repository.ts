import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  public async getUserById(userId: number): Promise<UserEntity> {
    const userInstance = await this.findOneOrFail({
      where: { id: userId },
    });

    return userInstance;
  }

  public async getUserByCognitoUserName(cognitoUserName: string): Promise<UserEntity> {
    const userInstance = await this.findOneOrFail({
      where: { cognitoUserName },
    });

    return userInstance;
  }

  public async deleteUserById(userId: number): Promise<boolean> {
    const userInstance = await this.getUserById(userId);

    await this.remove(userInstance);

    return true;
  }
}
