const CartDataAccess = require ('../data-access/cart-dao.mongo')
const NewPurchaseDTO = require('../DTO/new-purchase.dto')
const CartDAO = new CartDataAccess()

const createCart = async () => {
    try {
      const result = await CartDAO.createCart()
      return result
    } catch (error) {
        throw error
      } 
  }

 const getCartById = async cid => {
  try {
       const cart = await CartDAO.getCartById(cid)
       return cart
   } catch (error) {
       throw error
     }  
 }

 const addProductToCart = async (cid,pid) => {
    try {
         const result = await CartDAO.addProductToCart(cid,pid)
         return result
     } catch (error) {
         throw error
       }  
   }

  const createPurchaseOrder = async (purchaseData) => {
    try {
      const result = await CartDAO.createPurchaseOrder(purchaseData)
      return result
  } catch (error) {
      throw error
    }  
}

   const updateCartContents = async (cid, updatedProducts) => {
    try {
         const result = await CartDAO.updateCartContents(cid, updatedProducts)
         return result
     } catch (error) {
         throw error
       }  
   }

   const updateProductQuantityInCart = async (cid, pid, quantity) => {
    try {
         const result = await CartDAO.updateProductQuantityInCart(cid, pid, quantity)
         return result
     } catch (error) {
         throw error
       }  
   }

   const removeProductFromCart = async (cid, pid) => {
    try {
        const result = await CartDAO.removeProductFromCart(cid, pid)
        return result
    } catch (error) {
        throw error
      }  
   }
  
   const clearCartContents = async (cid) => {
    try {
        const result = await CartDAO.clearCartContents(cid)
        return result
    } catch (error) {
        throw error
      }  
   }

  module.exports = {
    createCart, getCartById, addProductToCart, updateCartContents, updateProductQuantityInCart, removeProductFromCart, clearCartContents, createPurchaseOrder
  }
