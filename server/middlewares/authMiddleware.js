const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
};
