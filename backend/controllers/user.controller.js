const User = require("../models/user.model");
const generateToken  = require("../token.js");
module.exports.signUp = async (req,res) => {
    try {

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          
        });
        const user = await newUser.save();
        return res.status(200).json({
            success: true,
            user,
            token: generateToken(User._id),
        })
      } catch (err) {
        return res.status(400).json({
            success:false,
            error: err
        })
      }
}
module.exports.signIn = async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.password !== req.body.password) {
          return res.status(400).json("wrong credentials");
        }
    
        const { name,email,isAdmin } = user;
    
        res.status(200).json({
            name,
            email,
            isAdmin,
            token: generateToken(User._id),
        });
      } catch (err) {
        console.log(err.message);
      }
}