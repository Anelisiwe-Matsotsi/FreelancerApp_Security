
/* rudderz243, 2026 */

// Import the transaction model to retrieve transaction records
const Transaction = require("../models/transactionModel.js");

// GET: get transactions belonging to the logged in user, admins can view all transactions
const getTransactions = async (req, res) => {
  try {
    let transactions;

    if (req.user.role === "admin") {
      // Administrators can view the complete transaction history
      transactions = await Transaction.find()
        .populate("booking")
        .populate("gig", "title price")
        .populate("client", "username email")
        .populate("freelancer", "username email")
        .sort({ createdAt: -1 });
    } else {
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
      transaction.client._id.toString() === req.user._id.toString() ||
      transaction.freelancer._id.toString() === req.user._id.toString();

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

// Export the controller functions for use in the routes
module.exports = { getTransactions, getTransactionById,
};
