const Product = require("../models/product");

module.exports = async function productSearch(req, res) {

    try {
        const searchText = req.query.name;
        if (!searchText) {
            return res.status(400).json({ error: 'Missing search query' });
        }
        const data = await Product.find({
            $or: [
              { name: { $regex: searchText, $options: 'i' } }, 
              { description: { $regex: searchText, $options: 'i' } }, 
            ],
          });
          console.log(data);
          console.log(searchText);
        if(data != null){
            res.status(200).json(data);
        }
        
        else{
            res.status(201).json({message: 'No products found.'});
        }
        


    } catch (error) {
        res.status(500).json({ message: error });
    }
};
