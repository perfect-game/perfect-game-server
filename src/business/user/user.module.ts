import { Module } from '@nestjs/common';

import { CommonUserModule } from '@app/common/user';

import { BusinessUserService } from './user.service';

@Module({
  imports: [CommonUserModule],
  exports: [BusinessUserService],
  providers: [BusinessUserService],
})
export class BusinessUserModule {}
