import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MealEditService } from 'src/app/services/meal-edit.service';
import { MealUnit } from 'src/app/services/models/meal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mealboard',
  templateUrl: './mealboard.component.html',
  styleUrls: ['./mealboard.component.scss'],
})
export class MealboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
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
    private MealEditService: MealEditService
  ) {
    this.meals = this.MealEditService.getAllMeals();
  }
  async rmMeal(mealId: string) {
    await this.MealEditService.rmMeal(mealId);
  }
}
