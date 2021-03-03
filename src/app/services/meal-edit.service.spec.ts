import { TestBed } from '@angular/core/testing';

import { MealEditService } from './meal-edit.service';

describe('MealEditService', () => {
  let service: MealEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
