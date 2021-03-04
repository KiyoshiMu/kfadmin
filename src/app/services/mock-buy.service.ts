import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MealUnit } from './models/meal';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Order } from './models/order';

interface response {
  status: string;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class MockBuyService {
  constructor(private http: HttpClient) {}
  readonly buyUrl =
    'https://us-central1-shadowserver.cloudfunctions.net/app/addOrder';
  readonly completeUrl =
    'https://us-central1-shadowserver.cloudfunctions.net/app/updateOrder';

  buy(customerId: string, meal: MealUnit) {
    const dc: string = new Date(Date.now()).toUTCString();
    const order: Order = {
      customerId: customerId,
      items: [],
      status: 'start',
      price: meal.price,
      dateCreated: dc,
    };
    order.items.push({
      mealId: meal.mealId,
      name: meal.name,
      quantity: 1,
      size: meal.size,
      piecePrice: meal.price,
    });
    return this.http
      .post<response>(this.buyUrl, order)
      .pipe(catchError(this.handleError));
  }

  complete(customerId: string, orderId: string) {
    const status = 'completed';
    console.log({ customerId, orderId, status });
    return this.http
      .post<response>(this.completeUrl, { customerId, orderId, status })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
