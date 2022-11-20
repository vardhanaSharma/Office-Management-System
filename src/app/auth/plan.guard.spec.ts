import { TestBed } from '@angular/core/testing';

import { PlanGuard } from './plan.guard';

describe('PlanGuard', () => {
  let guard: PlanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
