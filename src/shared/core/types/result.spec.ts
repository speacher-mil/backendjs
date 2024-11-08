import {
  Err,
  Ok,
  ResultKind,
  isErr,
  isOk,
  toResult,
} from '@/shared/core/types/result';

describe('Result', () => {
  describe('Helper function', () => {
    it('should return ResultOk', () => {
      const result = Ok('test');

      expect(result).toStrictEqual({
        kind: ResultKind.Ok,
        data: 'test',
      });
    });

    it('should return ResultErr', () => {
      const result = Err('test');

      expect(result).toStrictEqual({
        kind: ResultKind.Err,
        error: 'test',
      });
    });

    it('should detect Result is Ok', () => {
      expect(isOk(Ok('test'))).toBeTruthy();
      expect(isOk(Err('test'))).toBeFalsy();
    });

    it('should detect Result is Err', () => {
      expect(isErr(Err('test'))).toBeTruthy();
      expect(isErr(Ok('test'))).toBeFalsy();
    });
  });

  describe('toResult', () => {
    it('should return Ok', async () => {
      const result = await toResult(() => 'test');
      expect(result).toStrictEqual({
        kind: ResultKind.Ok,
        data: 'test',
      });
    });

    it('should return Err', async () => {
      const err = new Error('test');

      const result = await toResult(() => {
        throw err;
      });

      expect(result).toStrictEqual({
        kind: ResultKind.Err,
        error: err,
      });
    });
  });
});
