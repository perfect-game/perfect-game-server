import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/modules/database';
import { GraphQLModule } from '@app/modules/graphql';
import { LoggerModule } from '@app/modules/logger';

import * as Entities from '@app/entities';

import { HealthAPIModule } from '@app/api/health';

import { HealthGraphQLModule } from '@app/graphql/health';
import { UserGraphQLModule } from '@app/graphql/user';
import { ScoreGraphQLModule } from '@app/graphql/score';

@Module({
  imports: [
    /* Global Modules */
    DatabaseModule.forRoot(Object.values(Entities)),
    GraphQLModule,
    LoggerModule,

    /* API Modules */
    HealthAPIModule,

    /* GraphQL Modules */
    HealthGraphQLModule,
    UserGraphQLModule,
    ScoreGraphQLModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
