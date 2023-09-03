import { Router } from "express";
import productModel from "../dao/mongoManager/models/product.model.js";


const router = Router()



router.get('/', async(req, res) =>{
    const page = parseInt(req.query?.page || 1)
    const limit = parseInt(req.query?.limit || 8)
    const queryParams = req.query?.query || ''
    const query = {}
    if (queryParams) {
        const field = queryParams.split(',')[0]
        let value = queryParams.split(',')[1]
            if(!isNaN(parseInt(value))) value = parseInt(value)
            query[field] = value            

    }

    const result = await productModel.paginate(query,{
        page,
        limit,
        lean: true
    })
    res.render('index', result)
   
    
})


router.get('/products', async (req, res) => {
    const products = await productModel.find().lean().exec()
    res.render('home', {products})
})

router.get('/products-realtime', async (req, res) => {
    const products = await productModel.find().lean().exec()
    res.render('products_realtime', {products})
})

router.get('/form-products', async (req, res) => {
    res.render('form', {})
})

router.post('/form-products', async (req, res) => {
    const data = req.body
    const products = await productModel.find().lean().exec()
    const dataGenerated = new productModel(data)
    const id =  products.length
    if (id == 0) {
        dataGenerated.id = 1
    }else {( dataGenerated.id = id + 1)};
    await dataGenerated.save()
    res.redirect('/')
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    await productModel.deleteOne({ _id: id })
    res.redirect('/products-realtime')
})

router.post('/', async (req, res) => {
    const marca = req.body.marca
    const product = await productModel.findOne({marca})
    res.render('one', product)
})

router.put('/update/:id', async (req, res) =>{
    const id = req.params.id
    await productModel.updateOne({_id:id})
    res.redirect('/')
})

export default router