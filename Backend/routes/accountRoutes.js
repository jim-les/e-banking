const express = require("express");
const router = express.Router();

const {
  checkPassword,
} = require("../middlewares/userMiddleware/userMiddlewares");

const {
  authUserProtect,
} = require("../middlewares/userMiddleware/authUsersMiddleware");
const {
  createAccount,
  getAccount,
  deleteAccount,
  transfer,
  deposit,
  withdraw,
} = require("../controllers/accountController");
const {
  checkAccount,
} = require("../middlewares/accountMiddlewares/checkAccount");
const {
  checkBalance,
} = require("../middlewares/accountMiddlewares/checkBalance");
const {
  sendNotification,
} = require("../middlewares/notificationMiddleware/sendNotificationMiddleware");
const {
  authAdminProtect,
} = require("../middlewares/adminMiddlewares/authAdminsMiddleware");

router.route("/create").post(authAdminProtect, createAccount, sendNotification);

router
  .route("/:id")
  .get(authUserProtect, getAccount)
  .delete(authUserProtect, checkPassword, deleteAccount);

router
  .route("/transfer/:from_id/:to_id")
  .put(
    authUserProtect,
    checkPassword,
    checkAccount,
    checkBalance,
    transfer,
    sendNotification
  );

router
  .route("/deposit/:id")
  .put(authUserProtect, checkPassword, checkBalance, deposit);

router
  .route("/withdraw/:id")
  .put(authUserProtect, checkPassword, checkBalance, withdraw);

module.exports = router;
