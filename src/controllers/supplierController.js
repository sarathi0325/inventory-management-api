const Supplier =require("../models/supplier");


exports.createSupplier=async(req,res)=>{
    try{
        const supplier=await Supplier.create(req.body);
        res.status(201).json(supplier)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.getSuppliers=async(req,res)=>{
    try{
        const supplier=await Supplier.find();
        res.status(200).json(supplier)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}