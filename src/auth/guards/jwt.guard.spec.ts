import { beforeEach, expect } from 'vitest';

import { JwtAuthGuard } from '@/auth/guards/jwt.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
