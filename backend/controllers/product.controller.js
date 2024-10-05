import mongoose from "mongoose";
import Product from "../models/product.model.js";



export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({success: false, message: "server error"})
    }

}

export const createProduct =  async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:  false, message: "Please fill in all fields" });

    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(200).json({ success: true, data: newProduct });
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "server error"});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid product id"});
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id,product,{new: true});
        res.status(200).json({ success: true,  data: updateProduct });

    } catch (error) {
        res.status(500).json({success: false,  message: "server error"});

    }
}

export const deleteProduct =  async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid product id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "product deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: "server error"})
    }
}