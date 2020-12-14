export abstract class CommonService {
  protected abstract convertInstanceToModel(instance: unknown): unknown;
}
