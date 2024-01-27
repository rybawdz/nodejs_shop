const User = require("../models/user");


module.exports = async function userinfo(req, res, next) {
    try {

        const data = await User.findOne({ _id: req.params.userId  });
        res.status(200).json(data);



    } catch (error) {
        res.status(500).json({ message: error });
    }
};
