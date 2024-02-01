const Product = require("../models/product");

module.exports = async function productSearch(req, res) {

    try {
        const searchText = req.query.name;
        let data;
        if (!searchText) {
            data = await Product.find({});
            console.log('no query');
        }
        else{
            data = await Product.find({
                $or: [
                  { name: { $regex: searchText, $options: 'i' } }, 
                  { description: { $regex: searchText, $options: 'i' } }, 
                ],
              });
        }

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
