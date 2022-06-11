const express = require("express");

const router = express.Router();

const { validatePassword } = require("../middlewares/adminMiddlewares");

const {
  getAdmins,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  updateOwner,
  deleteAdmin,
} = require("../controllers/adminsControllers");

router.route("/").get(getAdmins).post(validatePassword, createAdmin);

router
  .route("/:id")
  .get(getOneAdmin)
  .put(validatePassword, updateAdmin)
  .delete(deleteAdmin);

router.route("/owner/:id").put(validatePassword, updateOwner);

module.exports = router;
