import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/modules/database';
import { CognitoModule } from '@app/modules/aws/cognito';

import { UserRepository } from './user.repository';
import { CommonUserService } from './user.service';
import { CognitoUserService } from './cognito-user.service';

@Module({
  imports: [DatabaseModule.forFeature([UserRepository]), CognitoModule],
  exports: [CommonUserService],
  providers: [CommonUserService, CognitoUserService],
})
export class CommonUserModule {}
