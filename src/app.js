import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import __dirname from './utils.js'
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js'
import messageRouter from './routes/messages.router.js'
import productModel from './dao/mongoManager/models/product.model.js'
import messageModel from './dao/mongoManager/models/message.model.js'

const app = express()

app.use('/', express.static('./src/public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', productsRouter)

app.use('/messages', messageRouter)

app.use('/cart', cartRouter)



const runServer = () => {
    const httpServer = app.listen(8080, () => console.log('Listening...'))
    const io = new Server(httpServer)
    
    io.on('connection', socket => {
        socket.on('new-product',async data => {
            const productManager = new productModel(data)
            const products1 = await productModel.find().lean().exec()
            const id =  products1.length
            if (id == 0) {
            productManager.id = 1
            }else {( productManager.id = id + 1)};
            await productManager.save()
            const products = await productModel.find().lean().exec()
            io.emit('reload-table', products)
            })
            console.log('Nuevo cliente conectado')
            socket.on('new', user => console.log(`${user} se acaba de conectar`))
            socket.on('message', async data => {
                const messageManager = new messageModel(data)
                await messageManager.save()
                const messages = await messageModel.find().lean().exec()
                messages.push(data)
                console.log(messages)
                socket.emit('logs', messages)
            })
    })
    
  

}


const URL = "mongodb+srv://claudioparedes:Cabeza2$@cluster1.rimje8x.mongodb.net/?retryWrites=true&w=majority"

console.log('Connecting...')
mongoose.set('strictQuery', false)
mongoose.connect(URL, {
    dbName: 'ecommerce'
})
.then(() => {
    console.log("DB connected!!!")
    runServer()
})

.catch(e => {
    console.log("Can't connect to DB")
})

    



        
    
