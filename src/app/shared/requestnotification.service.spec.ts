import { TestBed } from '@angular/core/testing';

import { RequestnotificationService } from './requestnotification.service';

describe('RequestnotificationService', () => {
  let service: RequestnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
