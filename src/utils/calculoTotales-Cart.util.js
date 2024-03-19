const calculateSubtotalAndTotal = (products) => {
    if (!products || products.length === 0) {
        return { subtotal: 0, total: 0 };
    }

    let subtotal = 0;
    products.forEach(product => {
        subtotal += product.quantity * product.product.price;
    });
    const total = subtotal;

    return { subtotal, total };
};

module.exports = calculateSubtotalAndTotal;
