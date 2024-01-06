module.exports = async function login(req, res) {
    if(!req.body.email || !req.body.password){
        res.status(400).json({message: 'Not enough information provided.'});
        return;  
    }
    var exists = await User.exists({email: req.body.email, password: req.body.password}); 
    if(exists){
        res.status(400).json({message: 'User already exists.'});
        return;
    }
    try {
        const hash = await argon2.hash(req.body.password);
    } catch (err) {
        res.status(400).json({message: 'Password hashing error'});
    }
    const data = new User({
        email: req.body.email,
        password: hash,
        role: 'user'
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}
