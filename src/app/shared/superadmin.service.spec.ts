import { TestBed } from '@angular/core/testing';

import { SuperadminService } from './superadmin.service';

describe('SuperadminService', () => {
  let service: SuperadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
