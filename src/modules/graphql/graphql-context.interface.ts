export interface IGraphQLContext {
  req: Request;
  res: Response;
  accessToken: string | null;
}
