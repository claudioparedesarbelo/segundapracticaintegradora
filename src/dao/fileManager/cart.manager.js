import FileManager from "./file.manager.js";

export default class CartManager extends FileManager {
    
    constructor() {
        super('./carts.json')
    }

    create = async() => {
        const data = {
            products: []            
        }

        return await this.setC(data)
    }

    addProduct = async(idc, idp) => {
        const cart = await this.getById(idc)
        return await this.updateCart(cart, idp)
    }

    list = async () => {
        return await this.get()
    }
}