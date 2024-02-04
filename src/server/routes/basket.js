const Cart = require("../models/cart");

module.exports = async function basket(req, res) {
    if(!req.session.user) {
        res.status(401);
    }
    try {
        const data = await Cart.findOne({ user: req.session.user })
                                .populate('items.product');

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
