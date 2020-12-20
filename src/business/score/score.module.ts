import { Module } from '@nestjs/common';

import { CommonScoreModule } from '@app/common/score';

import { BusinessScoreService } from './score.service';

@Module({
  imports: [CommonScoreModule],
  exports: [BusinessScoreService],
  providers: [BusinessScoreService],
})
export class BusinessScoreModule {}
