const argon2 = require("argon2");
const User = require("../models/user");

module.exports = async function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: "Email and password are required." });
        
        return;
    }
    var exists = await User.exists({email: req.body.email, password: req.body.password}); 
    if(exists){
        res.status(400).json({message: 'User already exists.'});
        return;
    }

    const userExists = await User.exists({ email: req.body.email, password: req.body.password });
    if (userExists) {
        res.status(400).json({ message: "User already exists." });
        return;
    }

    try {
        const hashedPassword = await argon2.hash(req.body.password);
    } catch (err) {
        res.status(400).json({ error: { message: err.message, stack: err.stack } });
        return;
    }

    const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
        role: 'user'
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
};
