import { Module } from '@nestjs/common';

import { CommonUserModule } from '@app/common/user';
import { UserService } from './user.service';

@Module({
  imports: [CommonUserModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
