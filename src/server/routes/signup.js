const argon2 = require("argon2");
const User = require("../models/user");
module.exports = async function signup(req, res) {
        
    try{
    var exists = await User.exists({email: req.body.email}); 
    }catch (err) {
        res.status(400).json({ err: { message: err.message, stack: err.stack } });
        return;
    }
    if(exists){
        res.status(400).json({message: 'User already exists.'});
        return;
    }
    try {
        var hash = await argon2.hash(req.body.password);
    } catch (err) {
        res.status(500).json({ err: { message: err.message, stack: err.stack } });
        return;
    }

    const data = new User({
        email: req.body.email,
        password: hash,
        role: 'user'
    });
    try {
        var dataToSave = await data.save();
    }
    catch (error) {
        res.status(400).json({message: error.message});
        return;
    }
    res.status(200).json(dataToSave);
}