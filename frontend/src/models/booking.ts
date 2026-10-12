export interface Booking {
  _id?: string;
  client: string;
  gig: string | {
    _id: string;
    title: string;
    price: number;
  };

  freelancer: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}