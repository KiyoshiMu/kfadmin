import { TestBed } from '@angular/core/testing';

import { MockBuyService } from './mock-buy.service';

describe('MockBuyService', () => {
  let service: MockBuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
