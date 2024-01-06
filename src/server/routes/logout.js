module.exports = async function login(req, res) {
    if(!req.body.email || !req.body.password){
        res.status(400).json({message: 'Not enough information provided.'});
        return;  
    }

    try{
        const data = await User.find({email: req.body.email, password: req.body.password});
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
