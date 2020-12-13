import { Module } from '@nestjs/common';

import { CommonUserService } from './user.service';

@Module({
  imports: [],
  exports: [CommonUserService],
  providers: [CommonUserService],
})
export class CommonUserModule {}
