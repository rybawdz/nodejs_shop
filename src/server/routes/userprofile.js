const User = require("../models/user");
module.exports = async function profile(req, res) {
        let name;
    
        if (!req.session) {
            return res.status(404).send();
        }
    
        name = req.session.user.name;
    
        return res.status(200).send({name});
    }
