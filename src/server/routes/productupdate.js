const Product = require("../models/product");
const fs = require('fs').promises;
const path = require('path');


module.exports = async function productUpdate(req, res) {

  const { name, description, price } = req.body;

  try {
    const filter = { name: name };
    const updateFields = {};
    if (typeof price !== 'undefined' && price != '') {
      updateFields.price = price;
    }

    if (typeof req.file !== 'undefined' && typeof req.file.filename !== 'undefined') {
      updateFields.photoUrl = req.file.filename;
    }

    if (typeof description !== 'undefined' && description != '') {
      updateFields.description = description;
    }

    const update = updateFields;
    console.log(update);

    let product = await Product.findOne(filter);
    console.log(name, product);

    if (product && req.file !== 'undefined') {
      const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(product.photoUrl));
      await fs.unlink(oldImagePath);
    }

    let doc = await Product.findOneAndUpdate(filter, update);
    res.status(200).json(doc);
    console.log(doc);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
  res.status(200);


};
