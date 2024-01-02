const User = require("../models/user");

module.exports = async function login() {
    const data = new User({
        email: req.body.name,
        password: req.body.age,
        role: 'user'
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
