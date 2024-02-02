const Product = require("../models/product");

module.exports = async function productSearch(req, res) {

    try {
        const searchText = req.query.name;
        let data;
        if (!searchText) {
            data = await Product.find({});
            console.log('b')
        }
        else{
            console.log('a')
            data = await Product.find({
                $or: [
                  { name: { $regex: searchText, $options: 'i' } }, 
                  { description: { $regex: searchText, $options: 'i' } }, 
                ],
              });
        }


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
