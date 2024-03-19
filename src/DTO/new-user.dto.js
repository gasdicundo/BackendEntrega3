const { hashPassword } = require('../utils/cryp-password.util');

class NewUserDTO {
    constructor(userData, password) {
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.age = userData.age;
        this.email = userData.email;
        this.passwordHash = hashPassword(password);
    }
}

module.exports = NewUserDTO;

