import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MealStat, MealUnit } from './models/meal';
@Injectable({
  providedIn: 'root'
})
export class MealViewService {

  constructor(private afs: AngularFirestore,) { }

  getMealStat(mealId: string) {
    console.log(mealId)
    return this.afs.collection("mealStat").doc<MealStat>(mealId).valueChanges()
  }

  getMeal(mealId: string) {
    return this.afs.collection('meals').doc<MealUnit>(mealId).valueChanges()
  }
}
