import { Router } from "express";
import cartModel from "../dao/mongoManager/models/cart.model.js";



const router = Router()


router.get('/', async (req, res) => {
    try{
    const result = await cartModel.find().lean().exec()
    res.send(result)
    }catch {
        res.status(404).json({status: "error", message: "file not found"})
    }
})

router.post('/:idc/product/:idp', async (req, res) => {
    try{
        const idc = parseInt(req.params.idc)
        const idp = parseInt(req.params.idp)
        const list = await cartModel.find()
        const cart = await cartModel.findOne({id: idc})
        const indexCart = list.findIndex((el) => el.id === cart.id)
            if(indexCart === -1){
            return 
        }
        const indiceProducto = cart.products.findIndex((product) => product.id == idp)
        
        if (indiceProducto === -1){
            cart.products.push({id: idp, quantity: 1})
        } else{
            cart.products[indiceProducto].quantity+=1 
            
        } 
        
         const result = cart.save()
         res.send(result) 
    
    }catch {
        res.status(500).json({status: "error", message: "Internal server error"})
    }
})

router.post('/:idc', async (req, res) => {
    const id = req.params.idc
    const result = await cartModel.create({id: id})
    res.send(result)
})

export default router