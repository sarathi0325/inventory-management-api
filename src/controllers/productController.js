const mongoose=require("mongoose")
const Product=require("../models/product")


exports.createProduct=async(req,res)=>{
    try{
        const product= await Product.create(req.body)
        res.status(201).json(product)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.getProducts = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      name: { $regex: search, $options: "i" }
    };

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message:"the product u search are not found!!"})
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.updateProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!product) return res.status(404).json({message:"Product Not Found"})
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params);
        if(!product) return res.status(404).json({message:"Product Not Found"})
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}