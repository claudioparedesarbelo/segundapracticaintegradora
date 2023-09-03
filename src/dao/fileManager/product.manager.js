import FileManager from "./file.manager.js";

export default class ProductManager extends FileManager {

    constructor() {
        super('./products.json')
    }

    create = async(data) => {
        const result = await this.set(data)
        return result
    }

    list = async (limit) => {
        const result = await this.getLimit(limit)
        return result
    }

    byId = async (id) => {
        const result = await this.getById(id)
        return result
    }

    updateById = async (id, product) => {
        const result = await this.update(id, product)
        return result
    }

    delete = async (id) => {
        const result = await this.deleteProduct(id)
        return result
    }
} 

