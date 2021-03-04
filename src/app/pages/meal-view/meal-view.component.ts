import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MealViewService } from 'src/app/services/meal-view.service';
import { MealStat, MealUnit } from 'src/app/services/models/meal';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.scss'],
})
export class MealViewComponent implements OnInit {
  @Input() meal$: Observable<MealStat | undefined> | undefined;
  constructor(
    private route: ActivatedRoute,
    private mealViewService: MealViewService
  ) {
    this.route.params.subscribe((params) => {
      const mealId: string = params.mealId;
      if (this.meal$ == undefined) {
        this.meal$ = this.mealViewService.getMealStat(mealId);
      }
    });
  }

  ngOnInit(): void {}
}
