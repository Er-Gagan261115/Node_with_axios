const express = require("express");
const {registerUser,login,currentUser} = require("../controllers/userController")
const router = express.Router();
const validateToken = require("../midddleware/validataTokenHandler")
router.post("/register",registerUser)
router.post("/login",login)
router.get("/current",validateToken,currentUser)
module.exports = router;