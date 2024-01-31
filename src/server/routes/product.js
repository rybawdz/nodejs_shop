const Product = require("../models/product");
module.exports = async function product(req, res) {
    const { name, description, price } = req.body;

    try{
    var exists = await Product.exists({name: name}); 
    }catch (err) {
        res.status(400).json({ err: { message: err.message, stack: err.stack } });
        return;
    }
    if(exists){
        res.status(400).json({message: 'Product already exists.'});
        return;
    }
    const data = new Product({
        name: name,
        photoUrl: 'localhost:4040/uploads/' + req.file.filename,
        description: description,
        price: price
    });
    try {
        var dataToSave = await data.save();
    }
    catch (error) {
        res.status(500).json({message: error.message});
        return;
    }
    res.status(200).json(dataToSave);
}