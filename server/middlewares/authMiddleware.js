const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return res.send({
                message: "No token provided",
                success: false
            });
        }

        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        req.userId = decodedToken.userId;

        console.log("hamza");

        next();

    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
};