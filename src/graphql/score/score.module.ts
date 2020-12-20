import { Module } from '@nestjs/common';

import { BusinessScoreModule } from '@app/business/score';

import { ScoreResolver } from './score.resolver';

@Module({
  imports: [BusinessScoreModule],
  exports: [],
  providers: [ScoreResolver],
})
export class ScoreGraphQLModule {}
