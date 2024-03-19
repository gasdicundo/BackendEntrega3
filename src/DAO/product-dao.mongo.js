const ProductModel = require('./models/product.model');

class ProductDAO {
    async getProductById(productId) {
        try {
            return await ProductModel.findOne({ _id: productId, active: true });
        } catch (error) {
            console.error('Error retrieving product by ID:', error.message);
            throw error;
        }
    }

    async addProduct(newProduct) {
        try {
            const { title, description, price, image, code, stock, category } = newProduct;
            
            if (!title || !description || !price || !code || !stock || !category) {
                console.error('All fields are mandatory. Product not added.');
                return { success: false, message: 'All fields are mandatory. Product not added.' };
            }

            const existingProduct = await ProductModel.findOne({ code: code });
            if (existingProduct) {
                console.error(`Product with code '${code}' already exists. Please choose another code.`);
                return { success: false, message: `Product with code '${code}' already exists. Please choose another code.` };
            }

            await ProductModel.create(newProduct);

            return { success: true };
        } catch (error) {
            console.error('Error adding product:', error.message);
            return { success: false, message: 'Internal error processing the request.' };
        }
    }

    async updateProduct(updatedProduct) {
        try {
            await ProductModel.findByIdAndUpdate(updatedProduct.id, updatedProduct);
            console.log('Product updated successfully:', updatedProduct.id);
        } catch (error) {
            console.error('Error updating product:', error.message);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            await ProductModel.findByIdAndUpdate(productId, { active: false });
            console.log('Product deleted successfully:', productId);
        } catch (error) {
            console.error('Error deleting product:', error.message);
            return false;
        }
    }

    async updateStock(productsInStock) {
        try {
            for (const { product, quantity } of productsInStock) {
                const foundProduct = await ProductModel.findById(product._id);

                if (!foundProduct) {
                    throw new Error(`Product with ID ${product._id} not found`);
                }

                foundProduct.stock -= quantity;
                await foundProduct.save();
                console.log(`Stock updated for product '${foundProduct.title}'`);
            }

            console.log('All stocks updated successfully');
        } catch (error) {
            console.error('Error updating stock:', error.message);
        }
    }
}

module.exports = ProductDAO;
