import { Resolver } from '@nestjs/graphql';

import { BusinessUserService } from '@app/business/user';

@Resolver()
export class UserResolver {
  constructor(private readonly businessUserService: BusinessUserService) {}
}
