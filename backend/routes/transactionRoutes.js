/* rudderz243, 2026 */
const express = require("express");
const router = express.Router();

const { getTransactions, getTransactionById,} = require("../controllers/transactionController.js");

const { validateAuth, } = require("../middleware/authMiddleware.js");

// get only the transactions the logged in user is allowed to see
router.get("/", validateAuth, getTransactions);
router.get("/:id", validateAuth, getTransactionById);

module.exports = router;