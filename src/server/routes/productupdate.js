const Product = require("../models/product");


module.exports = async function productUpdate(req, res) {
    if(!req.session.user) {
        res.status(401);
    }
 
        // Validate request body
        if (!req.body.name) {
            res.status(400).json({ message: 'No name provided.' });
            return;
        }

        const filter = { name: req.body.name };
        const update = { price: req.body.price , photoUrl: req.body.photoUrl, description: req.body.description};
        let doc = await Product.findOneAndUpdate(filter, update);
        res.status(200).json(doc);
        



    
};
