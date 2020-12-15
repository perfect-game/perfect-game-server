import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import config from 'config';

import { IGraphQLContext } from './graphql-context.interface';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  public createGqlOptions(): GqlModuleOptions {
    return {
      cors: config.get<string>('application.cors'),
      debug: config.get<boolean>('application.graphql.debug'),
      playground: config.get<boolean>('application.graphql.playground'),
      path: config.get<string>('application.graphql.path'),
      autoSchemaFile: true,
      // TODO Separate to context builder function
      context: ({ req, res }: { req: Request; res: Response }): IGraphQLContext => {
        const headers = <Record<string, unknown>>(<unknown>req.headers);
        const accessToken = headers['authorization'];

        const graphQLContext: IGraphQLContext = {
          req,
          res,
          accessToken: accessToken ? String(accessToken) : null,
        };

        return graphQLContext;
      },
    };
  }
}
