const User = require("../models/user");
const Cart = require("../models/cart");

module.exports = async function userorders(req, res) {
    if(!req.session.user) {
        res.status(401);
    }

    try {
        const admin = await User.findOne({_id: req.session.user});
        if(admin.role == "admin"){
        }
        else {
            res.status(401);
        }
    } catch (err) {
    console.log("Something wrong with db?");
    res.redirect('/');
    }

    try {
        
        const data = await Cart.find()
                               .populate("user")
                               .populate("items.product");

        if(data != null){
            res.status(200).json(data);
        }
        else{
            res.status(200).json(req.session.user);
        }
        


    } catch (error) {
        res.status(500).json({ message: error });
    }
};
