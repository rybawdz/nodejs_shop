const User = require("../models/user");
const argon2 = require("argon2");


module.exports = async function userupdate(req, res, next) {
    try {
        // Validate request body
        if (!req.body.password) {
            return res.status(400).json({ message: 'No password provided.' });
        }
        try {
            var hash = await argon2.hash(req.body.password);
        } catch (err) {
            res.status(400).json({ err: { message: err.message, stack: err.stack } });
            return;
        }

        const filter = { _id: req.params.userId };
        const update = { password: hash };
        let doc = await Character.findOneAndUpdate(filter, update);
        res.status(200);



    } catch (error) {
        res.status(500).json({ message: error });
    }
};
