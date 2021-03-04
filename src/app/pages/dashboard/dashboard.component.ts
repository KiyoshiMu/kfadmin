import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SalestatService } from 'src/app/services/salestat.service';
import { MealViewService } from 'src/app/services/meal-view.service';
import { MealStat } from 'src/app/services/models/meal';
import { Customer } from 'src/app/services/models/customer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  saleStat$ = this.statService.getSaleStat();
  bestIncomeMeal: MealStat | undefined;
  bestOrderMeal: MealStat | undefined;
  bestOrderCustomer: Customer | undefined;
  bestConsumeCustomer: Customer | undefined;
  cols = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return 1;
      }
      return 2;
    })
  );
  // bad hacking practice
  ngOnInit(): void {
    setTimeout(() => {
      this.bestIncomeMeal = this.mealViewService.mostIncomeMeal;
      this.bestOrderMeal = this.mealViewService.mostIncomeMeal;
      this.bestOrderCustomer = this.mealViewService.mostOrderCustomer;
      this.bestConsumeCustomer = this.mealViewService.mostConsumeCustomer;
    }, 500);
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private statService: SalestatService,
    private mealViewService: MealViewService
  ) {}
}
