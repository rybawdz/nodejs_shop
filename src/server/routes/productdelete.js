const Product = require("../models/product");
const fs = require('fs').promises; // Import the fs module with promises


module.exports = async function productDelete(req, res, next) {
    /*if(!req.session.role == 'admin') {
        res.status(401);
    }*/
    try {
        if (!req.body.name) {
            res.status(400).json({ message: 'No name provided.' });
            return;
        }
        const product = await Product.findOneAndDelete({ name: req.body.name  });
        res.status(200);
        if(doc){
            const oldImagePath = path.join(__dirname, '..', 'uploads', product.photoUrl);
            await fs.unlink(oldImagePath);
        }


    } catch (error) {
        res.status(500).json({ message: error });
    }
};
