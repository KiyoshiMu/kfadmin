export interface MealUnit {
  id: string;
  name: string;
  description: string;
  size: string;
  cover: string;
  price: number;
  cost: number;
  totalOrders?: number;
  weeklyOrders?: number;
}

export interface MealStat {
  name: string;
  size: string;
  price: number;
  cost: number;
  weeklyOrders: number;
  totalOrders: number;
}
