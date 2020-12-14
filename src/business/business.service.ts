export abstract class BusinessService {
  protected abstract convertModelToObject(model: unknown): unknown;
}
