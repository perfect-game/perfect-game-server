import { Module } from '@nestjs/common';

import { CommonUserModule } from '@app/common/user';
import { UserGraphQLService } from './user.service';

@Module({
  imports: [CommonUserModule],
  exports: [UserGraphQLService],
  providers: [UserGraphQLService],
})
export class UserGraphQLModule {}
