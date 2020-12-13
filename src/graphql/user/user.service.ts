import { Injectable } from '@nestjs/common';

import { CommonUserService } from '@app/common/user';

@Injectable()
export class UserService {
  constructor(private readonly commonUserService: CommonUserService) {}
}
