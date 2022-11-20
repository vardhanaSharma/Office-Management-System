import { TestBed } from '@angular/core/testing';

import { StandardGuard } from './standard.guard';

describe('StandardGuard', () => {
  let guard: StandardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StandardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
