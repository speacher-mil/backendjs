import { HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';

import { AllExceptionsFilter } from '@/shared/filters/all-exceptions.filter';

const mockHttpAdapterHost = vi.fn().mockImplementation(() => ({
  getRequestUrl: vi.fn(),
}));

const mockStatus = vi.fn().mockImplementation(() => ({
  json: vi.fn(),
}));

const mockGetResponse = vi.fn().mockImplementation(() => ({
  status: mockStatus,
  getHeader: vi.fn(),
  json: vi.fn(),
}));

const mockGetRequest = vi.fn().mockImplementation(() => ({
  originalUrl: vi.fn(),
}));

const mockHttpArgumentsHost = vi.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: vi.fn(),
  getArgs: vi.fn(),
  getType: vi.fn(),
  switchToRpc: vi.fn(),
  switchToWs: vi.fn(),
};

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: REQUEST,
          useValue: mockHttpAdapterHost,
        },
      ],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    filter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('Http exception', () => {
    filter.catch(
      new HttpException('Http exception', HttpStatus.BAD_REQUEST),
      mockArgumentsHost,
    );
    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockGetRequest).toHaveBeenCalledTimes(1);
    expect(mockGetRequest).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });
});
