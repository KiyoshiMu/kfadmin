import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { SaleStat } from './models/salestat';

@Injectable({
  providedIn: 'root'
})
export class SalestatService {
  private itemDoc: AngularFirestoreDocument<SaleStat>;
  constructor(private afs: AngularFirestore) { 
    this.itemDoc = this.afs.doc<SaleStat>("saleStat/realtimeStat");
  }

  getSaleStat() {
    return this.itemDoc.valueChanges()
  }
}
