import { Resolver } from '@nestjs/graphql';

import { UserGraphQLService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserGraphQLService) {}
}
