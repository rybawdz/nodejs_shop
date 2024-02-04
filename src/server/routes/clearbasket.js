const Cart = require("../models/cart");

module.exports = async function clearbasket(req, res) {
    if(!req.session.user) {
        res.status(401);
    }
    try {
        const data = await Cart.deleteOne({ user: req.session.user })
        if(data.count === 1){
            res.status(200).send("Basket truncated");
        }
        else{
            res.status(200).json(req.session.user);
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
};
