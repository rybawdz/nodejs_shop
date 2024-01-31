const Product = require("../models/product");

module.exports = async function productDelete(req, res, next) {
    /*if(!req.session.role == 'admin') {
        res.status(401);
    }*/
    try {

        const data = await Product.deleteOne({ name: req.body.name  });
        res.status(200);



    } catch (error) {
        res.status(500).json({ message: error });
    }
};
