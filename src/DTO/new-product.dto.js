class ProductDetails {
    constructor({ title, description, price, thumbnail, code, stock, category }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = true;
        this.category = category;
    }
}

module.exports = ProductDetails;

