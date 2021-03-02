import { TestBed } from '@angular/core/testing';

import { SalestatService } from './salestat.service';

describe('SalestatService', () => {
  let service: SalestatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalestatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
