import { Module } from '@nestjs/common';

import { CognitoService } from './cognito.service';
import { CognitoIdentityService } from './cognito-identity.service';

@Module({
  imports: [],
  exports: [CognitoService],
  providers: [CognitoService, CognitoIdentityService],
})
export class CognitoModule {}
