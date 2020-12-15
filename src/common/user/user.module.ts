import { Module } from '@nestjs/common';

import { CognitoModule } from '@app/modules/aws/cognito';

import { CommonUserService } from './user.service';
import { CognitoUserService } from './cognito-user.service';

@Module({
  imports: [CognitoModule],
  exports: [CommonUserService],
  providers: [CommonUserService, CognitoUserService],
})
export class CommonUserModule {}
