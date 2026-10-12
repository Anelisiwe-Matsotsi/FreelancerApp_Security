
// we use the model to determine what the data coming from and going to the API will look like
export interface Gig {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryDays: number;
  freelancer: string | { _id: string; username: string };
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}