const router = require("express").Router();
const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    try {
        //1 if the user already exists
        const user = await User.findOne({ email: req.body.email });

        //2 if user exists send an error response
        if (user) {
            return res.status(400).send({
                message: "User already exists!",
                success: false,
            });
        }

        //3 encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        //4 Create new user, save in db
        const newUser = await new User(req.body);
        await newUser.save();

        res.status(201).send({
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        //1 check if user already exists in the db with the same email as req body
        const user = await User.findOne({ email: req.body.email }).select("+password");
        console.log(user)
        if (!user) {
            return res.status(400).send({
                message: "User does not exist",
                success: false,
            });
        }

        //2 email exists, now check the password is correct or not
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(400).send({
                message: "Password does not match",
                success: false,
            });
        }

        //3 if the user exists, and password match, then create a json web token and
        // send it in the response.

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        res.send({
            message: "User loggedIn successfully",
            success: true,
            token: token,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;
