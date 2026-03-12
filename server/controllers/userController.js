const router = require("express").Router();
const User = require("./../models/user");
const authMiddleware = require("./../middlewares/authMiddleware")

// Get details of currently logged in user

router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.userId);

        res.send({
            message: "user fetched successfully",
            success: true,
            data: user
        });

    } catch (error) {
        res.send({
            message: error.message,
            success: false
        });
    }
});
module.exports = router