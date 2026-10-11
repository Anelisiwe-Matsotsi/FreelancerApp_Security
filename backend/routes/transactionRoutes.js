/* rudderz243, 2026 */
/*Asmare, 2023 */
const express = require("express");
const router = express.Router();

const { getTransactions, getTransactionById, getMyIncome} = require("../controllers/transactionController.js");

const { validateAuth, validateRole } = require("../middleware/authMiddleware.js");

//All transaction routes require a valid JWT
router.use(validateAuth);

//Income summary freelancers only
router.get("/income", validateRole("freelancer"), getMyIncome);

//List transactions, the controller filters by role so users only see their own
router.get("/", validateRole("client", "freelancer", "admin"), getTransactions);

//One transaction (only the client/freelancer involved, or an admin)
router.get("/:id", validateRole("client", "freelancer", "admin"), getTransactionById);

module.exports = router;
/*Reference List:
Asmare,E. 2023. CRUD operations with Express and MongoDB. (Version 1.0) [Sourcce code] Availabale at:<https://medium.com/@it.ermias.asmare/crud-operations-with-express-and-mongodb-b8bb9af57cc0> [Accessed 10 October 2026].
rudderz243. 2026. bookRoutes.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/routes/bookRoutes.js> [Accessed 10 October 2026]. 
*/