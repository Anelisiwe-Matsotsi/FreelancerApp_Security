export type TransactionStatus = "Completed" | "Refunded";

export interface Transaction {
  _id?: string;
  reference: string;
  booking: string | object;
  gig: string | {
    _id: string;
    title: string;
    price: number;
  };
  
  client: string | {
    _id: string;
    username: string;
    email?: string;
  };

  freelancer: string | {
    _id: string;
    username: string;
    email?: string;
  };

  gigTitle: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IncomeSummary {
  currency: string;
  totalIncome: number;
  totalTransactions: number;
  byGig: {
    gigId: string;
    gigTitle: string;
    bookings: number;
    income: number;
  }[];
}