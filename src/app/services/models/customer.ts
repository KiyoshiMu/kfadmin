export interface Customer {
  customerId: string;
  orders: number;
  consume: number;
  history?: any;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  point?: number;
  latestOrderDate?: number;
}
