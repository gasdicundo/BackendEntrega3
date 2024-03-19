const mongoose = require('mongoose');

const collectionName = 'messages';

const messageSchema = new mongoose.Schema({
    sender: String,
    content: String
});

const MessageModel = mongoose.model(collectionName, messageSchema);

module.exports = MessageModel;