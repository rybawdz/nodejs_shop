const Cart = require("../models/cart");

module.exports = async function basketremove(req, res) {
    if (!req.session.user) {
        res.status(401);
    }

    try {

        const result = await Cart.updateOne({user: req.session.user},
             { $pull: { items: { _id: req.body.id } } });

        const cart = await Cart.findOne({user: req.session.user});
        if(cart.items.length <= 0) {
            await Cart.deleteOne({ user: req.session.user});
        }
    
        res.status(200).send('Order deleted');
    } catch (err) {
        console.error('Error removing item from basket:', err);
        res.status(500).send('Internal Server Error');
    }
    
};
