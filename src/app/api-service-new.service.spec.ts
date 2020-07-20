import { TestBed } from '@angular/core/testing';

import { ApiServiceNewService } from './api-service-new.service';

describe('ApiServiceNewService', () => {
  let service: ApiServiceNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
