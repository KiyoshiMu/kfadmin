import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';
import { MealStat, MealUnit } from './models/meal';
@Injectable({
  providedIn: 'root',
})
export class MealViewService {
  mostIncomeMeal: MealStat | undefined;
  mostOrderMeal: MealStat | undefined;
  mostOrderCustomer: Customer | undefined;
  mostConsumeCustomer: Customer | undefined;
  constructor(private afs: AngularFirestore) {
    this.afs
      .collection<MealStat>('meals')
      .valueChanges()
      .subscribe((docs) => {
        this.mostIncomeMeal = docs.sort(
          (a, b) => b.totalIncome - a.totalIncome
        )[0];
        this.mostOrderMeal = docs.sort(
          (a, b) => b.totalOrder - a.totalOrder
        )[0];
      });

    this.afs
      .collection<Customer>('customer')
      .valueChanges()
      .subscribe((docs) => {
        this.mostOrderCustomer = docs.sort((a, b) => b.orders - a.orders)[0];
        this.mostConsumeCustomer = docs.sort(
          (a, b) => b.consume - a.consume
        )[0];
      });
  }

  getMealStat(mealId: string) {
    return this.afs.collection('meals').doc<MealStat>(mealId).valueChanges();
  }

  getAllMeal() {
    return this.afs.collection<MealStat>('meals').valueChanges();
  }
}
