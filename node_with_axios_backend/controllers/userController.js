//register user
require("dotenv").config()
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(404);
        throw new Error("All fields are mandatory")
    }
    const UserAvailable = await User.findOne({ email });
    if (UserAvailable) {
        res.status(400);
        throw new Error("User already registered")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("pass",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    // look at this field why password:hashedpassword
    if (user) {
        res.status(200).json({ _id: user.id, email: user.email })
    }
    else {
        res.status(404);
        throw new Error("Data not valid to register ")
    }
})


// login of user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // find whether the user exist in the database or not  
    const user = await User.findOne({ email });
    // compare password entered with that saved in the database 
    // getaccess token for the user who has entered his/her credentials 
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
        // provide here payload (information which we want in our token)
            user: {
                username: user.username,
                email: user.email,
                id: user.id,

            },
            // provide accessToken secret
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
        );
        res.status(200).json({ accessToken })
    }
    else
    {
        res.status(400);
        throw new Error("email or password is  not valid")
    }
})
// current user
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
    // this coming from validatetoken
})
module.exports = { registerUser, login, currentUser }