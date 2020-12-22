import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/modules/database';

import { UserRepository } from './user.repository';
import { CommonSiteUserService } from './site-user.service';

@Module({
  imports: [DatabaseModule.forFeature([UserRepository])],
  exports: [CommonSiteUserService],
  providers: [CommonSiteUserService],
})
export class CommonSiteUserModule {}
