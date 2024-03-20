const UserManager = require('../managers/user.manager')
const messageSender = require('../services/message.sender')
const userManager = new UserManager()

async function fetchUserCart(uid) {
    try {
        const user = await userManager.getUserById(uid)
        return user ? user.cart : null
    } catch (error) {
        throw new Error('Error al obtener el carrito del usuario')
    }
}

async function updateCartForUser(uid, cid) {
    try {
        await userManager.updateUserCart(uid, cid)
    } catch (error) {
        throw new Error('Error al actualizar el carrito del usuario')
    }
}

async function registerNewUser(newUserDto) {
    try {
        const createdUser = await userManager.createUser(newUserDto);
        // Envía un mensaje de registro
        messageSender.sendMessage(createdUser)
        return createdUser;
    } catch (error) {
        console.error('Error al crear un usuario:', error);
        throw new Error('Error al crear un usuario');
    }
}

module.exports = {
    fetchUserCart,
    updateCartForUser,
    registerNewUser,
}
