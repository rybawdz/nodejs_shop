const Order = require("../models/order");
const User = require("../models/user");

module.exports = async function addOrder(req, res) {
  
  try {
    const users = await User.find({ email: req.session.user }).exec();
    
    if(users.length > 1) {
        console.log("There are " + users.length + " users named "
                     + req.session.user);
    }
    if(users.length <= 0) {
        res.status(400).json({message: 'Unknown user'});
        return;
    }

    const itemList = req.body.items.map((item) => ({
      product: item.itemId,
      quantity: item.quantity || 1
    }));

    const order = await Order.create({
      items: itemList,
      user: users[0]._id,
      address: req.body.address,
      date: new Date()
    });

    try {
        var populatedOrder = await Order.populate(order, [
                                        { path: 'items.product', model: 'Product', select: 'name price' },
                                        { path: 'user', model: 'User' }
        ]);                                
    }
    catch (error) {
        res.status(500).json({message: 'Could not populate data'});
        return;
    }

    try {
        var dataToSave = await populatedOrder.save();
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
