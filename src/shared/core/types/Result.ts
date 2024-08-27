export enum ResultKind {
  Ok,
  Err,
}

export interface ResultOk<T> {
  kind: ResultKind.Ok;
  data: T;
}

export interface ResultErr<E> {
  kind: ResultKind.Err;
  error?: E;
}

export type Result<T, E> = ResultOk<T> | ResultErr<E>;
export type PromiseResult<T, E> = Promise<Result<T, E>>;

export const Ok = <T>(data: T): Result<T, never> => ({
  kind: ResultKind.Ok,
  data,
});

export const Err = <E>(error: E): Result<never, E> => ({
  kind: ResultKind.Err,
  error,
});

export const isOk = <T, E>(result: Result<T, E>): result is ResultOk<T> =>
  result.kind === ResultKind.Ok;

export const isErr = <T, E>(result: Result<T, E>): result is ResultErr<E> =>
  result.kind === ResultKind.Err;

export const toResult = async <T, E>(
  fn: () => T | Promise<T> | PromiseLike<T>,
): PromiseResult<T, E> => {
  try {
    const result = await fn();
    return Ok(result);
  } catch (error) {
    return Err(error);
  }
};
