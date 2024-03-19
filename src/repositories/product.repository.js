const ProductDAO = require('../database/product-dao.mongo')

class ProductRepository {
    constructor() {
        this.DAO = new ProductDAO()
    }

    async getProductById(id) {
        try {
            return await this.DAO.getProductById(id)
        } catch (error) {
            throw error
        }
    }

    async addProduct(productData) {
        try {
            return await this.DAO.addProduct(productData)
        } catch (error) {
            throw error
        }
    }

    async updateProduct(updatedProduct) {
        try {
            await this.DAO.updateProduct(updatedProduct)
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(productId) {
        try {
            return await this.DAO.deleteProduct(productId)
        } catch (error) {
            throw error
        }
    }

    async updateStock(productsToUpdate) {
        try {
            await this.DAO.updateStock(productsToUpdate) 
        } catch (error) {
            throw error
        }  
    }
}

module.exports = ProductRepository
