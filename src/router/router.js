const productsController = require ('../controllers/products.controller')
const cartsController = require ('../controllers/carts.controller')
const addproduct = require('../controllers/addproduct.controller')
const chat = require('../controllers/chat.controller')
const authController = require ('../controllers/auth.controller')
const viewsTemplateController = require ('../controllers/views-template.controller')
const usersController = require ('../controllers/users.controller')
const authMiddleware = require('../middlewares/private-acces-middleware')

const router = app => {
    app.use('/api/products',authMiddleware, productsController)
    app.use('/api/carts',authMiddleware, cartsController)
    app.use('/addproduct',authMiddleware, addproduct)
    app.use('/chat',authMiddleware, chat)
    app.use('/api/auth',authMiddleware, authController)
    app.use('/',authMiddleware, viewsTemplateController)
    app.use('/api/users',authMiddleware, usersController)
}

module.exports = router