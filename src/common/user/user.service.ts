import { Injectable } from '@nestjs/common';

import { UserRepository } from '@app/modules/database/repositories';

@Injectable()
export class CommonUserService {
  constructor(private readonly userRepository: UserRepository) {}
}
