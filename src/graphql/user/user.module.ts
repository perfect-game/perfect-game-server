import { Module } from '@nestjs/common';

import { BusinessUserModule } from '@app/business/user';
import { BusinessScoreModule } from '@app/business/score';

import { UserResolver } from './user.resolver';
import { UserScoreResolver } from './user-score.resolver';

@Module({
  imports: [BusinessUserModule, BusinessScoreModule],
  exports: [],
  providers: [UserResolver, UserScoreResolver],
})
export class UserGraphQLModule {}
