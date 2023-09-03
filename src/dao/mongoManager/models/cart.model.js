import mongoose from "mongoose";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    id: {type: String},
    products: {
        type: [{
            id: String,
            quantity: Number
        }]
    }
    
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel