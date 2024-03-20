const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const paginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true,
    },
    stock: Number,
    active: Boolean,
    category: String,
});


productSchema.plugin(paginate);

const Product = model('Product', productSchema);

module.exports = Product;

