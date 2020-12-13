import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/modules/database';
import { GraphQLModule } from '@app/modules/graphql';
import { LoggerModule } from '@app/modules/logger';

import { HealthModule } from '@app/api/health';

import { HealthModule as HealthGraphQLModule } from '@app/graphql/health';
import { UserModule } from '@app/graphql/user';

@Module({
  imports: [
    /* Global Modules */
    DatabaseModule,
    GraphQLModule,
    LoggerModule,

    /* API Modules */
    HealthModule,

    /* GraphQL Modules */
    HealthGraphQLModule,
    UserModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
