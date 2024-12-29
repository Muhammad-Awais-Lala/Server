const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../models/Users");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "user already Registered", success: false })
        }

        let newUser = new userModel({ name, email, password })
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201)
            .json({ message: "Register Successfully", success: true })

    } catch (err) {
        res.status(500)
            .json({ data: "Internel server error", success: false })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }); //user from database 
        const errMessage = "Login Failed, Wrong Email or password"
        if (!user) {
            return res.status(403)
                .json({ message: errMessage, success: false })
        }

        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errMessage, success: false })
        } else {
            const jwtToken = jwt.sign({ email: user.email, uid: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
            res.status(200)
                // .json({ message: "login Successfully", success: true, jwtToken, email, name: user.name })
                .json({ message: "login Successfully", success: true, jwtToken, user })

        }
    } catch (err) {
        res.status(500)
            .json({ data: "Internel server error", success: false })
    }
}

module.exports = {
    register,
    login
};