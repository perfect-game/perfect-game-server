import { Module } from '@nestjs/common';

import { BusinessUserModule } from '@app/business/user';

import { UserResolver } from './user.resolver';

@Module({
  imports: [BusinessUserModule],
  exports: [],
  providers: [UserResolver],
})
export class UserGraphQLModule {}
