const Product = require("../models/product");
const fs = require('fs').promises; // Import the fs module with promises


module.exports = async function productUpdate(req, res) {

        const { name, description, price } = req.body;

        try {
            const filter = { name: name };
            const updateFields = {};
            if (typeof price !== 'undefined') {
                updateFields.price = price;
              }
              
              if (typeof req.file !== 'undefined' && typeof req.file.filename !== 'undefined') {
                updateFields.photoUrl = req.file.filename;
              }
              
              if (typeof description !== 'undefined') {
                updateFields.description = description;
            }

            const update = updateFields;

            let product = await Product.findOne(filter);
            console.log(name, req.body);
            if (product) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(product.photoUrl));
                await fs.unlink(oldImagePath);
              }
            let doc = await Product.findOneAndUpdate(filter, update);
            res.status(200).json(doc);
        }
        catch (error) {
            res.status(500).json({message: error.message});
            return;
        }
        res.status(200);

    
};
