import { UserEntity } from '@app/modules/database/entities';

export interface IUserInstanceModel extends Omit<UserEntity, 'scores'> {}
