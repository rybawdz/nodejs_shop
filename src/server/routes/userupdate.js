const User = require("../models/user");
const argon2 = require("argon2");


module.exports = async function userupdate(req, res) {
    if(!req.session.user) {
        res.status(401);
    }
 
        // Validate request body
        if (!req.body.password) {
            res.status(400).json({ message: 'No password provided.' });
            return;
        }
        try {
            var hash = await argon2.hash(req.body.password);
        } catch (err) {
            res.status(400).json({ err: { message: err.message, stack: err.stack } });
            return;
        }

        const filter = { _id: req.session.user };
        const update = { password: hash };
        let doc = await User.findOneAndUpdate(filter, update);
        res.status(200).json(doc);
        



    
};
