const User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req,res) => {
    const {name,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password , parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const user = await User.create({...req.body , password: hashedPassword});
    res.status(201).json({message: "User Registered Successfully" , user})
}
exports.login = async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email });
    if(!user) {
        return res.status(404).json({message: "User not Found"})
    }
    const isMatch = await bcrypt.compare (password , user.password);
    if(!isMatch) {
        return res.status(400).json({ message : "Invalid Credentials"})
        
    }
    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: "1d"});
    res.status(200).json({message: "Login Successful" , token})
}