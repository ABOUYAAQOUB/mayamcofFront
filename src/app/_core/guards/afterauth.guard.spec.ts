import { TestBed } from '@angular/core/testing';

import { AfterauthGuard } from './afterauth.guard';

describe('AfterauthGuard', () => {
  let guard: AfterauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AfterauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
