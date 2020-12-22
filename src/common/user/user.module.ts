import { Module } from '@nestjs/common';

import { CommonSiteUserModule } from '@app/common/site-user';
import { CommonCloudUserModule } from '@app/common/cloud-user';

import { CommonUserService } from './user.service';

@Module({
  imports: [CommonSiteUserModule, CommonCloudUserModule],
  exports: [CommonUserService],
  providers: [CommonUserService],
})
export class CommonUserModule {}
