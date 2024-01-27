const User = require("../models/user");

module.exports = async function userdelete(req, res, next) {
    try {
        // Validate request body
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Not enough information provided.' });
        }


        const data = await User.deleteOne({ _id: req.params.userId  });
        res.status(200);



    } catch (error) {
        res.status(500).json({ message: error });
    }
};
