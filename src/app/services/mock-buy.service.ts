import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MealUnit } from './models/meal';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Order } from './models/order';

interface response {
  status: string,
  message: string,
  data: any,
}

@Injectable({
  providedIn: 'root'
})
export class MockBuyService {

  constructor(private http: HttpClient) { }
  readonly url = "https://us-central1-shadowserver.cloudfunctions.net/app/orders"

  buy(meal: MealUnit) {
    const order: Order = {
      "First Name": "Anthony",
      "Last Name": "Costa",
      "Address": "1280 Main XXXXX Hamilton CA",
      "Phone": "905 xxx xxxx",
      "Email": "1111@gmail.com",
      "Customer Notes": "",
      "Payment method": "Cash on delivery",
      "Items": [],
      "Price": 40,
      "Discount": 0,
      "Refund Value": 0,
      "Total Order Value": 0,
      "Refund Reason": "",
      "Date Created": "2019-08-19T18:04:05",
      "Date Modified": "2019-09-02T18:07:51",
      "Status": "completed",
      "FromLastWeek": 0,
      "FromLastFourWeeks": 0
    }
    order.Items.push({
      "Name": meal.name,
      "Quantity": 1,
      "Size": meal.size,
      "Piece Price": meal.price
    })
    return this.http.post<response>(this.url, order).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
