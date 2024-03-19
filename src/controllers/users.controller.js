const { Router } = require('express')
const router = Router()
const security = require('passport')
const UserServices = require('../services/user-services')

router.get('/user-basket', async (req, res) => {
    try {
        const basketId = req.session.basket
        if (!basketId) {
            const userId = req.user._id
            const userBasket = await UserServices.fetchUserBasket(userId)
            if (!userBasket) {
                return res.status(404).json({ error: 'User or basket not found' })
            }
            req.session.basket = userBasket
            console.log('User basket ID:', userBasket)
            res.status(200).json({ status: 'success', basketId: userBasket })
        }
    } catch (error) {
        console.error('Error updating user basket:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/', security.authenticate('register', { failureRedirect: '/api/users/failed-registration' }), async (req, res) => {
    try {
        res.status(201).json({ status: 'success', message: 'User successfully registered' })
    } catch (error) {
        console.error('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/failed-registration', (req, res) => {
    console.log('Registration failed')
    res.status(400).json({ status: 'error', error: 'Bad Request' })
})

router.put('/', async (req, res) => {
    try {
        const userId = req.user._id
        const { basket: basketId } = req.body
        await UserServices.updateUserBasket(userId, basketId)
        req.session.user.basket = basketId
        res.status(200).json({ status: 'success', message: 'User basket updated successfully' })
    } catch (error) {
        console.error('Error updating user basket:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router
