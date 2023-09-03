import fs from 'fs'

class FileManager {

    constructor(filename = './db.json') {
        this.filename = filename
    }

    getNextId = (list) => {
        return (list.length == 0) ? 1 : list[list.length - 1].id + 1
    }

     get = async () => {
        return fs.promises.readFile(this.filename, 'utf-8')
        .then((r => JSON.parse(r)))
        .catch(e => {
            return []
        })
    } 

    getLimit = async (limit) => {
        const data = await fs.promises.readFile(this.filename, 'utf-8')
        const dataParse = JSON.parse(data)
        return dataParse.slice(0, limit) }
    
    getById = async (id) => {
        const data = await this.get()
        return data.find(d => d.id == id)
        }
    
    
    
    set = async (data) => {
        const list = await this.get()
        data.id = this.getNextId(list)
        data.status = true
        list.push(data)
        return fs.promises.writeFile(this.filename, JSON.stringify(list))
    }

    setC = async (data) => {
        const list = await this.get()
        data.id = this.getNextId(list)
        list.push(data)
        return fs.promises.writeFile(this.filename, JSON.stringify(list))
    }
    updateCart = async (cart, idp) => {
        const list = await this.get()
        const indexCart = list.findIndex((el) => el.id === cart.id)
        if(indexCart === -1){
            return
        }
        const indiceProducto = cart.products.findIndex((product) => product.id === idp)
        console.log(indiceProducto)
        if (indiceProducto === -1){
            cart.products.push({id: idp, quantity: 1})
        } else{
            cart.products[indiceProducto].quantity+=1 
            
        }   
        list[indexCart] = cart
       return fs.promises.writeFile(this.filename, JSON.stringify(list))
    }

    update = async (id, product) => {
        const list = await this.get()
        const nuevaLista = list.findIndex(p => p.id === id)
        if (nuevaLista < 0) { 
                console.log('no se encuentra ese id'); 
                return;
        } 
        product.id = id   
        list [nuevaLista] = product
       
        return fs.promises.writeFile(this.filename, JSON.stringify(list))  
    } 
        
    deleteProduct = async (id) => {
        const data = await this.get()
        const prodTrue = data.findIndex(product=>product.id == id)
        if(prodTrue < 0 ) {
            return false
        }else {
        const dataObj = data.filter(product=>product.id != id)
        console.log("Producto Eliminado")
        await fs.promises.writeFile(this.filename, JSON.stringify(dataObj))
        return true
       } }
}

export default FileManager