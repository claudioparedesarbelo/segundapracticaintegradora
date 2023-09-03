import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    id: {type: String},
    categoria: {type: String, require: true},
    marca: {type: String, require: true},
    description: {type: String, require: true},
    code: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    thumbnails: {type: String, require: true},
    
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema)

export default productModel