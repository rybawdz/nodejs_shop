const Order = require("../models/order");
const User = require("../models/user");

module.exports = async function addOrder(req, res) {
  
  try {
    const user = await User.findOne({ _id: req.session.user  });

    const itemList = req.body.items.map((item) => ({
      product: item.itemId,
      quantity: item.quantity || 1
    }));

    const order = await Order.create({
      items: itemList,
      user: user._id,
      address: req.body.address,
      date: new Date()
    });

    // cos to populate nie działa :C
    // try {
    //     var populatedOrder = await Order.populate(order, [
    //                                     { path: 'items.product', model: 'Product', select: 'name price' },
    //                                     { path: 'user', model: 'User' }
    //     ]);                                
    // }
    // catch (error) {
    //     res.status(500).json({message: 'Could not populate data'});
    //     return;
    // }

    try {
        var dataToSave = await order.save();
    }
    catch (error) {
        res.status(500).json({message: error.message});
        return;
    }
    res.status(200).json(dataToSave);
  
} catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
