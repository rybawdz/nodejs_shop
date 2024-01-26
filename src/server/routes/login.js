const User = require("../models/user");
const argon2 = require("argon2");
const session = require('express-session');


module.exports = async function login(req, res, next) {
    try {
        // Validate request body
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Not enough information provided.' });
        }

        // Hash the password


        // Find user based on email and hashed password
        const data = await User.findOne({ email: req.body.email });

        if (await argon2.verify(data.password, req.body.password)) {
            const { name } = req.body;
            req.session.user = {
                name,
                isLoggedIn: true
            };

            // Save session
            await req.session.save();

            // Respond with success and user data
            res.status(200).json(data);
        } else {
            return res.status(401).json({ message: 'Invalid credentials: ' + req.body.email + " " + hash });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
};
