import { Module } from '@nestjs/common';

import { CognitoModule } from '@app/modules/aws/cognito';

import { CommonCloudUserService } from './cloud-user.service';

@Module({
  imports: [CognitoModule],
  exports: [CommonCloudUserService],
  providers: [CommonCloudUserService],
})
export class CommonCloudUserModule {}
