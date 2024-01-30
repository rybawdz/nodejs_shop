const User = require("../models/user");
const argon2 = require("argon2");
const session = require('express-session');


module.exports = async function login(req, res, next) {
        // Validate request body
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ message: 'Not enough information provided.' });
            return;
        }

        // Hash the password


        // Find user based on email
        const data = await User.findOne({ email: req.body.email });
        if(data == null){
            res.status(400).json({ message: 'Invalid credentials'});
            return;
        }

        if (await argon2.verify(data.password, req.body.password)) {
            const { name } = req.body;

            // Save session
            req.session.regenerate(function (err) {
                if (err) res.status(500).json(err);
                req.session.user = data._id

                req.session.save(function (err) {
                    if (err) {
                        res.status(500).json({ message: 'Server error'})
                    }
                })
            
                // Respond with success and user data
                res.status(200).send();
            })

        } else {
            res.status(400).json({ message: 'Invalid credentials'})
        }


};