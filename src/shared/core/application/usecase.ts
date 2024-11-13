export interface Usecase<T, R> {
  execute(request?: T): R | Promise<R>;
}
