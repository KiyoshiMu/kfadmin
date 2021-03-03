import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MealEditService } from 'src/app/services/meal-edit.service';
import { MealUnit } from 'src/app/services/models/meal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MockBuyService } from 'src/app/services/mock-buy.service';

@Component({
  selector: 'app-fake-market',
  templateUrl: './fake-market.component.html',
  styleUrls: ['./fake-market.component.scss']
})
export class FakeMarketComponent {
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
    private MealEditService: MealEditService,
    private mockBuy: MockBuyService,
  ) {
    this.meals = this.MealEditService.getAllMeals();
  }

  async buy(meal: MealUnit) {
    const ret = await this.mockBuy.buy(meal).toPromise();
    console.log(ret.status)
    alert('Thanks!');
  }
}
