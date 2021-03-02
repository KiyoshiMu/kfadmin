export interface MealUnit {
  name: string;
  description: string;
  size: string;
  cover: string[];
  totalOrders: number;
  weeklyOrders: number;
}

export interface MealStat {
  name: string;
  size: string;
  weeklyOrders: number;
  totalOrders: number;
}