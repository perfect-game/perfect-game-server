import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/modules/database';

import { ScoreRepository } from './score.repository';
import { CommonScoreService } from './score.service';

@Module({
  imports: [DatabaseModule.forFeature([ScoreRepository])],
  exports: [CommonScoreService],
  providers: [CommonScoreService],
})
export class CommonScoreModule {}
