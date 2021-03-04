import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MealUnit } from './models/meal';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class MealEditService {
  mealCollection: AngularFirestoreCollection<MealUnit>;
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.mealCollection = this.afs.collection<MealUnit>('meals');
  }

  async addMeal(mealUnit: MealUnit) {
    try {
      mealUnit.mealId = mealUnit.name + mealUnit.size;
      await this.mealCollection
        .doc(mealUnit.mealId)
        .set(mealUnit, { merge: true });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  uploadFile(file: File) {
    var n = Date.now();
    const filePath = `MealImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return { task, fileRef };
  }

  getAllMeals() {
    return this.mealCollection.valueChanges();
  }

  getMeal(mealId: string) {
    return this.mealCollection.doc(mealId).valueChanges();
  }

  rmMeal(mealId: string) {
    return this.mealCollection.doc(mealId).delete();
  }
}
