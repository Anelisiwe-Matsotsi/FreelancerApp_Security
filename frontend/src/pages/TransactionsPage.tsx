import React, { useState, useEffect } from "react";
import type { Transaction, IncomeSummary } from "../models/transaction.ts";
import { getTransactions, getMyIncome } from "../services/api.ts";
import { useAuth } from "../context/useAuth";

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();

  // create a transaction array to hold all the transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // only freelancers have an income summary
  const [income, setIncome] = useState<IncomeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isFreelancer = user?.role === "freelancer";
  const isAdmin = user?.role === "admin";

  // create a helper function to use our API service and update the page
  const loadTransactions = async () => {
    try {
      setTransactions(await getTransactions());
      setError("");
    } catch (err) {
      setTransactions([]);
      setError(
        err instanceof Error ? err.message : "Could not load transactions.",
      );
    } finally {
      setLoading(false);
    }

    // the income summary is a nice extra, so a failure here is ignored
    if (isFreelancer) {
      try {
        setIncome(await getMyIncome());
      } catch {
        setIncome(null);
      }
    }
  };

  // useEffect runs when the page loads
  useEffect(() => {
    loadTransactions();
  }, []);

  // client / freelancer can come back as just an id or as { _id, username }
  const personName = (person: string | { username: string }) =>
    typeof person === "object" ? person.username : undefined;

  // refunded money does not count towards the total
  const currency = transactions[0]?.currency ?? "";
  const total = transactions
    .filter((t) => t.status !== "Refunded")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className='page'>
      <div className='page-inner'>
        <div className='page-head'>
          <div>
            <div className='section-label'>
              {isFreelancer ? "Income" : "Transactions"}
            </div>
            <h1 className='page-title'>
              {isAdmin ? "All " : "Your "}
              <em>{isFreelancer ? "income" : "transactions"}</em>
            </h1>
            <p className='page-sub'>
              {isFreelancer
                ? "What you have earned from your gigs."
                : isAdmin
                  ? "Every payment made on the platform."
                  : "Every payment made for your bookings."}
            </p>
          </div>
          <button className='btn btn-outline' onClick={loadTransactions}>
            Refresh
          </button>
        </div>

        {/* stats */}
        <div className='stat-grid'>
          {isFreelancer && income ? (
            <>
              <div className='stat-card'>
                <div className='stat-num'>
                  {income.currency} {income.totalIncome.toFixed(2)}
                </div>
                <div className='stat-label'>Total income</div>
              </div>
              <div className='stat-card'>
                <div className='stat-num'>{income.totalTransactions}</div>
                <div className='stat-label'>Transactions</div>
              </div>
            </>
          ) : (
            <>
              <div className='stat-card'>
                <div className='stat-num'>
                  {currency} {total.toFixed(2)}
                </div>
                <div className='stat-label'>Total</div>
              </div>
              <div className='stat-card'>
                <div className='stat-num'>{transactions.length}</div>
                <div className='stat-label'>Transactions</div>
              </div>
            </>
          )}
        </div>

        {/* a freelancer also sees what each gig earned */}
        {isFreelancer && income && income.byGig.length > 0 && (
          <div className='panel' style={{ marginBottom: 24 }}>
            <h2 className='panel-title'>Income by gig</h2>
            {income.byGig.map((g) => (
              <div key={g.gigId} className='row-item'>
                <div className='row-main'>
                  <div className='row-title'>{g.gigTitle}</div>
                  <div className='row-meta'>
                    {g.bookings} {g.bookings === 1 ? "booking" : "bookings"}
                  </div>
                </div>
                <div className='row-side'>
                  <span className='row-amount'>
                    {income.currency} {g.income.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* list of all transactions */}
        <div className='panel'>
          {loading && <p className='empty'>Loading transactions...</p>}
          {error && <div className='alert'>{error}</div>}
          {!loading && !error && transactions.length === 0 && (
            <p className='empty'>No transactions yet.</p>
          )}

          {transactions.map((tx, i) => {
            // show the other person in the deal (an admin sees both)
            const clientName = personName(tx.client);
            const freelancerName = personName(tx.freelancer);
            const other = isFreelancer ? clientName : freelancerName;

            return (
              <div key={tx._id ?? tx.reference ?? i} className='row-item'>
                <div className='row-main'>
                  <div className='row-title'>{tx.gigTitle}</div>
                  <div className='row-meta'>
                    Ref {tx.reference}
                    {isAdmin
                      ? clientName &&
                        freelancerName &&
                        ` · ${clientName} → ${freelancerName}`
                      : other && ` · ${isFreelancer ? "from" : "to"} ${other}`}
                    {tx.createdAt &&
                      ` · ${new Date(tx.createdAt).toLocaleDateString()}`}
                  </div>
                </div>
                <div className='row-side'>
                  <span className='row-amount'>
                    {tx.currency} {tx.amount.toFixed(2)}
                  </span>
                  <span className={`badge badge-${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};