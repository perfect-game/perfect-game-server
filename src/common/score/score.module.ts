import { Module } from '@nestjs/common';

import { CommonScoreService } from './score.service';

@Module({
  imports: [],
  exports: [CommonScoreService],
  providers: [CommonScoreService],
})
export class CommonScoreModule {}
