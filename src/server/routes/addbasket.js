const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");

module.exports = async function addBasket(req, res) {

    
    try {
        const user = await User.findOne({ _id: req.session.user  });
        const itemName = req.body.itemName; 
        const product = await Product.findOne({ name: itemName });
        if(user && product) {
            var cart = await Cart.findOne({user: user._id});
            
            if(cart == null) {
                //create new cart
                try {
                        cart = await Cart.create({
                        items: [],
                        user: user._id,
                    });
                }
                catch (err) {
                    res.status(500).json({message: err.message});
                    return;
                }
            }
            
            const existingItem = cart.items.find((item) =>
                item.product.equals(product._id)
            );

            if (!existingItem) {
                cart.items.push({ 
                    product: product._id,
                    quantity: 1,
                 });
            }

            try {
                const dataToSave = await cart.save();
                res.status(200).json(dataToSave);
            }
            catch (err) {
                res.status(500).json({message: err.message});
            }

        }
        else {
            res.status(401).json({message: "Unknown user or product"});
            return;
        }

    } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
