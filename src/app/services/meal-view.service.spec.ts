import { TestBed } from '@angular/core/testing';

import { MealViewService } from './meal-view.service';

describe('MealViewService', () => {
  let service: MealViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
