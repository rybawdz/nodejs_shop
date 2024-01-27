const session = require('express-session');
module.exports = async function logout(req, res) {
    let name;

    // Check if req.session is defined
    name = req.session.user;
    
    try {
        await req.session.destroy();
    } catch (err) {
        res.status(400).json({ err: { message: 'Error logging out' + err.message, stack: err.stack } });
    }

    return res.status(200).send({ name });
};
