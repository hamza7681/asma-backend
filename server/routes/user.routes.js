const {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const dpUpload = require("../middlewares/dp.middleware");
const router = require("express").Router();

router.post("/register", dpUpload.single("dp"), register);
router.post("/login", login);
router.get("/user-profile", auth, getProfile);
router.patch("/update-profile", auth, updateProfile);
router.get("/get-users", getAllUsers);
router.get("/get-user-id/:userId", getUserById);

module.exports = router;
