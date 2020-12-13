import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/modules/database';
import { GraphQLModule } from '@app/modules/graphql';
import { LoggerModule } from '@app/modules/logger';

import { HealthAPIModule } from '@app/api/health';

import { HealthGraphQLModule } from '@app/graphql/health';
import { UserGraphQLModule } from '@app/graphql/user';

@Module({
  imports: [
    /* Global Modules */
    DatabaseModule,
    GraphQLModule,
    LoggerModule,

    /* API Modules */
    HealthAPIModule,

    /* GraphQL Modules */
    HealthGraphQLModule,
    UserGraphQLModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
