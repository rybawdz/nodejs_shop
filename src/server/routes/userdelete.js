const User = require("../models/user");

module.exports = async function userdelete(req, res, next) {
    if(!req.session.user) {
        res.status(401);
    }
    try {

        const data = await User.deleteOne({ _id: req.session.user  });
        res.status(200);



    } catch (error) {
        res.status(500).json({ message: error });
    }
};
