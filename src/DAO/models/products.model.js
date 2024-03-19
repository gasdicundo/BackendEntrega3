const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const collectionName = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true,
    },
    stock: Number,
    status: Boolean,
    category: String,
});

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model(collectionName, productSchema);

module.exports = ProductModel;
