import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EditMealService } from 'src/app/services/edit-meal.service';
import { MealUnit } from 'src/app/services/models/meal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mealboard',
  templateUrl: './mealboard.component.html',
  styleUrls: ['./mealboard.component.scss'],
})
export class MealboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  readonly addIcon = { title: 'Add', cols: 1, rows: 1 };
  meals: Observable<MealUnit[]>;
  cols = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return 1;
      }
      return 2;
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private editMealService: EditMealService
  ) {
    this.meals = this.editMealService.getAllMeals();
  }
  async rmMeal(mealId: string) {
    await this.editMealService.rmMeal(mealId);
  }
}
