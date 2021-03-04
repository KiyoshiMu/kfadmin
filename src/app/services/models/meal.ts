export interface MealUnit {
  mealId: string;
  name: string;
  price: number;
  size: string;
  cover: string;
  cost?: number;
  description?: string;
  totalOrders?: number;
  weeklyOrders?: number;
}
export interface MealStat {
  mealId: string;
  name: string;
  price: number;
  size: string;
  cover: string;
  cost?: number;
  description?: string;
  weeklyOrder: number;
  totalOrder: number;
  totalIncome: number;
  weeklyIncome: number;
}
