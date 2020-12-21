import { UserEntity } from '@app/entities';

export interface IUserInstanceModel extends Omit<UserEntity, 'scores'> {}
