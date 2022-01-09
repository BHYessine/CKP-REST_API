const express = require("express");
const router = express.Router();
const {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.post("/adduser", addUser);
router.get("/allusers", getAllUsers);
router.put("/edituser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
