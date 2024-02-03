const Order = require("../models/order");

module.exports = async function userorders(req, res) {
    if(!req.session.user) {
        res.status(401);
    }
    try {
        
        const data = await Order.find({ user: req.session.user  })
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
