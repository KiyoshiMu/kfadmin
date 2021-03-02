import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './pages/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MealboardComponent } from './pages/mealboard/mealboard.component';
import { MealInfoComponent } from './pages/meal-info/meal-info.component';
const routes: Routes = [
  {
    path: 'home',
    component: NavComponent,
    children: [
      {
        path: 'board', // child route path
        component: DashboardComponent, // child route component that the router renders
      },
      {
        path: 'meals/:mealId',
        component: MealInfoComponent, // another child route component that the router renders
      },
      {
        path: 'meals',
        component: MealboardComponent, // another child route component that the router renders
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: NavComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
