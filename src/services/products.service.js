const ProductManager = require ('../managers/product.manager')
const productManager = new ProductManager()

const findProductById = async pid => {
    try {
      const product = await productManager.findProductById(pid)
      return product
    } catch (error) {
        throw error
      } 
  }

const addNewProduct = async productData => {
 try {
      const result = await productManager.addNewProduct(productData) 
      return result
  } catch (error) {
      throw error
    }  
}

const updateExistingProduct = async updatedProductData => {
  try {
       await productManager.updateExistingProduct(updatedProductData) 
   } catch (error) {
       throw error
     }  
 }

 const deleteExistingProduct = async pid => {
  try {
       const result = await productManager.deleteExistingProduct(pid) 
       return result
   } catch (error) {
       throw error
     }  
 }
 
 const updateStockLevels = async productsInStock => {
  try {
      const result = await productManager.updateStockLevels(productsInStock) 
      return result
  } catch (error) {
      throw error
    }  
 }
 
  module.exports = {
    findProductById, addNewProduct, updateExistingProduct, deleteExistingProduct, updateStockLevels
  }
