const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


//Register
exports.register=async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already Exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({message:"User registered successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


//Login
exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"No Email Exists"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid Password"})
        
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.json({token})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.profile=async(req,res)=>{
    try{
        const user=await User.findById(req.userId).select("-password");
        res.json(user);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
};