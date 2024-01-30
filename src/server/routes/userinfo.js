const User = require("../models/user");


module.exports = async function userinfo(req, res) {
    if(!req.session.user) {
        res.status(401);
    }
    try {
        
        const data = await User.findOne({ _id: req.session.user  });
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
