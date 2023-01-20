const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require("express");
const router = express.Router();


const User = require("../model/users");

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields');
    }


    // Check user exists

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    // Create user

    const user = await User.create({
        username,
        email,
        password: hashPassword
    });


    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // check email
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        req.user = {
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        };
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({message:"login failed"});
    }
})

router.get("/", async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        username,
        email
    })

});

router.get("/allusers",async (req, res) => {
    const alllusers= await User.find();
    res.send(alllusers);
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = router;