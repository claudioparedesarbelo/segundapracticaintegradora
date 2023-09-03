import { Router } from 'express'
import ProductManager from '../dao/fileManager/product.manager.js'


const router = Router()


router.get('/', async(req, res) => {
    try{
    const limit = (req.query.limit)
    const products = await productManager.list()
    const result =  products.slice(0, limit)
    res.send(result)
    
    } catch {
        return res.status(404).json({status: "error", message: 'List not found'})
    }
})

router.get('/:pid', async(req, res) => {
    try{
    const pid = parseInt(req.params.pid)
    const productById = await productManager.byId(pid);
    if (!productById) return res.status(404).json({status:"error", message:"Product not found"});
    return res.send(productById)
    }catch {
        return res.status(404).json({status: "error", message: 'Product not found'})
    }
    })


router.post('/', async (req, res) => {
    try{
    const data = req.body
    const result = await productManager.create(data)
    res.send(result)
    }catch {res.status(500).json({status: "error", message:`Internal server error. ${error}`})}
})

router.put('/:pid', async(req, res) =>{
    try{
    const pid = parseInt(req.params.pid)
    const product = req.body
    const updateById = await productManager.updateById(pid, product);
    if (!updateById) return res.status(404).json({ status: "error", message: "Product not found" });
    return res.send(updateById);
    }catch {
        res.status(500).json({status: "error", message: `Internal server error. ${error}`})
    }
})

router.delete('/:pid', async(req, res) => {
    try{
    const pid = parseInt(req.params.pid)
    const deleteById = await productManager.delete(pid);
      if(deleteById){
          res.status(200).send("Producto eliminado")
      }else{
      res.status(404).send("Producto no encontrado")
      }
    } catch {
      res.status(404).json({status: "error", message: "Product not delete"})
    }
  })

export default router