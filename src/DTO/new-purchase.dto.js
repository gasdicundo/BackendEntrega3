const { v4: uuidv4 } = require('uuid');

class PurchaseInfo {
    constructor(totalPrice, user) {
        this.purchaseCode = uuidv4();
        this.totalAmount = totalPrice;
        this.buyerEmail = user.email;
    }
}

module.exports = PurchaseInfo;
