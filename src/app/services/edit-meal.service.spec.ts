import { TestBed } from '@angular/core/testing';

import { EditMealService } from './edit-meal.service';

describe('EditMealService', () => {
  let service: EditMealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
