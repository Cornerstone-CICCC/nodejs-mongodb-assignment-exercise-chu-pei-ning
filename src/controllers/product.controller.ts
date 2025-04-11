import { Request, Response } from "express";
import { IProduct, Product } from "../models/product.model";

// get all products
const getAllProduct = async ( req: Request, res: Response ) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to fetch products" })
  }
}

//get product by id
const getProductById = async (req: Request<{id: string}>, res: Response) => {
  try {
    const product = await Product.findById(req.params.id) 
    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to get the product" })
  }
}

//add new product
const addProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
  try {
    const { productName, productPrice} = req.body
    const product =  await Product.create({productName, productPrice})
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to add product" })
  }
}

//edit product by id
const editProductById = async (req: Request <{id: string}, {}, Partial<IProduct>>, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true // return updated data
    })
    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to edit product" })
  }
}

//delete product by id
const deleteProductById = async (req: Request <{id: string}>, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "unable to delete product" })
  }
}

export default {
  getAllProduct,
  getProductById,
  addProduct,
  editProductById,
  deleteProductById
}