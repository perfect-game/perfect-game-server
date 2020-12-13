import { Module } from '@nestjs/common';

import { CommonUserModule } from '@app/common/user';

import { UserResolver } from './user.resolver';
import { UserGraphQLService } from './user.service';

@Module({
  imports: [CommonUserModule],
  exports: [UserGraphQLService],
  providers: [UserResolver, UserGraphQLService],
})
export class UserGraphQLModule {}
