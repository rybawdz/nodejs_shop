const User = require("../models/user");

module.exports = async function login() {
    const data = new User({
        email: req.body.name,
        password: req.body.age,
        role: 'user'
    })
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
