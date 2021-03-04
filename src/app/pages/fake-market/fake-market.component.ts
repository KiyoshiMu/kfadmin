import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MealEditService } from 'src/app/services/meal-edit.service';
import { MealUnit } from 'src/app/services/models/meal';
import { Observable } from 'rxjs';
import { MockBuyService } from 'src/app/services/mock-buy.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fake-market',
  templateUrl: './fake-market.component.html',
  styleUrls: ['./fake-market.component.scss'],
})
export class FakeMarketComponent {
  /** Based on the screen size, switch from standard to one column per row */
  meals: Observable<MealUnit[]>;
  customerForm = this.fb.group({
    customerId: null,
    address: null,
    orderId: null,
  });

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
    private fb: FormBuilder
  ) {
    this.meals = this.MealEditService.getAllMeals();
  }

  async buy(meal: MealUnit) {
    const ret = await this.mockBuy
      .buy(this.customerForm.get('customerId')?.value ?? 'customerId', meal)
      .toPromise();
    console.log(ret.status);
    alert('Thanks!');
    this.customerForm.get('orderId')?.setValue(ret.data.orderId);
  }

  async complete() {
    const orderId = this.customerForm.get('orderId')?.value;
    console.log(orderId);
    if (orderId) {
      console.log('start complete');
      const ret = await this.mockBuy
        .complete(
          this.customerForm.get('customerId')?.value ?? 'customerId',
          this.customerForm.get('orderId')?.value
        )
        .toPromise();
      console.log(ret.status);
      alert('Complete!');
    }
  }
}
