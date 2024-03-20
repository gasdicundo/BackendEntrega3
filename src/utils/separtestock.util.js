function classifyProductsByStock(products) {
    const availableProducts = []
    const outOfStockProducts = []

    products.forEach(product => {
        if (product.stock > 0) {
            availableProducts.push(product)
        } else {
            outOfStockProducts.push(product)
        }
    })

    return { availableProducts, outOfStockProducts }
}

module.exports = classifyProductsByStock
