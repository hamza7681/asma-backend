const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-profile", auth, getProfile);
router.patch("/update-profile", auth, updateProfile);

module.exports = router;
