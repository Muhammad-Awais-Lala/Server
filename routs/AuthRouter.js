const { register, login } = require("../controllers/AuthController");
const { registerValidation, loginValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router()




router.post("/register", registerValidation,register);
router.post("/login", loginValidation,login);

module.exports = router