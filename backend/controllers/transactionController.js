
/* rudderz243, 2026 */

// Import the transaction model to retrieve transaction records
const Transaction = require("../models/transactionModel.js");
const crypto = require("crypto");
const mongoose = require("mongoose");


const createTransactionForBooking = async ({ bookingId, gig, clientId }) => {
  if (!bookingId || !gig || !clientId) {
    throw new Error("bookingId, gig and clientId are required to create a transaction.");
  }
  // a freelancer must not be able to book their own gig
  if (String(gig.freelancer) === String(clientId)) {
    throw new Error("A user cannot book their own gig.");
  }

  // timestamp + random bytes so references cannot be guessed (Stack Overflow, 2024)
  const reference = `TXN-${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}`.toUpperCase();

  return Transaction.create({
    reference,
    booking: bookingId,
    gig: gig._id,
    client: clientId,
    freelancer: gig.freelancer,
    gigTitle: gig.title, 
    amount: gig.price, 
    currency: "ZAR",
    status: "Completed",
  });
};

const refundTransactionForBooking = async (bookingId) => {
  return Transaction.findOneAndUpdate(
    { booking: bookingId },
    { status: "Refunded" },
    { new: true }
  );
};

// GET: get transactions belonging to the logged in user, admins can view all transactions
const getTransactions = async (req, res) => {
  try {
    let transactions;

    if (req.user.role === "admin") {
         /*Stack Overflow, 2021 */
      // Administrators can view the complete transaction history
      transactions = await Transaction.find()
        .populate("booking")
        .populate("gig", "title price")
        .populate("client", "username email")
        .populate("freelancer", "username email")
        .sort({ createdAt: -1 });
    } else {
        /*Asmare, 2023 */
      // Clients and freelancers can only view transactions they are involved in
      transactions = await Transaction.find({
        $or: [
          { client: req.user._id },
          { freelancer: req.user._id },
        ],
      })
        .populate("gig", "title price")
        .populate("client", "username")
        .populate("freelancer", "username")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error.message);

    return res.status(500).json({
      message: "Server error while retrieving transactions.",
    });
  }
};

// GET: Retrieve one transaction ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("gig", "title price")
      .populate("client", "username email")
      .populate("freelancer", "username email");

    // Return 404 if the transaction does not exist
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }

    const isInvolved =
      String(transaction.client?._id) === req.user._id.toString() ||
      String(transaction.freelancer?._id) === req.user._id.toString();

    if (!isInvolved && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You do not have permission to view this transaction.",
      });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid transaction ID.",
      });
    }

    console.error("Error retrieving transaction:", error.message);

    return res.status(500).json({
      message: "Server error while retrieving the transaction.",
    });
  }
};

// GET: income summary for the logged in freelancer 
const getMyIncome = async (req, res) => {
  try {
    const freelancerId = new mongoose.Types.ObjectId(String(req.user._id));

    // only "Completed" transactions count, so refunded/cancelled bookings are left out
    const [result] = await Transaction.aggregate([
      { $match: { freelancer: freelancerId, status: "Completed" } },
      {
        $facet: {
          totals: [
            { $group: { _id: null, totalIncome: { $sum: "$amount" }, totalTransactions: { $sum: 1 } } },
          ],
          byGig: [
            {
              $group: {
                _id: "$gig",
                gigTitle: { $last: "$gigTitle" },
                bookings: { $sum: 1 },
                income: { $sum: "$amount" },
              },
            },
            { $sort: { income: -1 } },
          ],
        },
      },
    ]);

    const totals = result.totals[0] || { totalIncome: 0, totalTransactions: 0 };

    return res.status(200).json({
      currency: "ZAR",
      // Math.round(x * 100) / 100 keeps money to 2 decimal places (Stack Overflow, 2021)
      totalIncome: Math.round(totals.totalIncome * 100) / 100,
      totalTransactions: totals.totalTransactions,
      byGig: result.byGig.map((g) => ({
        gigId: g._id,
        gigTitle: g.gigTitle,
        bookings: g.bookings,
        income: Math.round(g.income * 100) / 100,
      })),
    });
  } catch (error) {
    console.error("Error calculating income:", error.message);
    return res.status(500).json({ message: "Server error while calculating income." });
  }
};


// Export the controller functions for use in the routes
module.exports = { getTransactions, getTransactionById, createTransactionForBooking, refundTransactionForBooking, getMyIncome,
};
/*Reference list:
Asmare,E. 2023. CRUD operations with Express and MongoDB. (Version 1.0) [Sourcce code] Availabale at:<https://medium.com/@it.ermias.asmare/crud-operations-with-express-and-mongodb-b8bb9af57cc0> [Accessed 10 October 2026].
Stack Overflow. 2021. How to round up to the nearest 100 in JavaScript. (Version 1.0) [Source code] Available at:<https://stackoverflow.com/questions/19621455/how-to-round-up-to-the-nearest-100-in-javascript> [Accessed 10 October 2026].
Stack Overflow. 2024. Generate a string of random characters. (Version 1.0) [Source code] Available at:<https://stackoverflow.com/questions/1349404/generate-a-string-of-random-characters> [Accessed 10 October 2026].
*/
