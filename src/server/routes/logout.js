const User = require("../models/user");

module.exports = async function logout(req, res) {
    let name;

    // Check if req.session is defined
    if (!req.session || !req.session.user) {
        return res.status(404).send();
    }

    // Access the name property only if req.session.user is defined
    name = req.session.user.name;

    return res.status(200).send({ name });
};
