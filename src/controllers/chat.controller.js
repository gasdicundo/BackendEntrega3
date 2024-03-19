const { Router } = require('express')
const router = Router()
const authorization = require('../middlewares/authorization-middleware.js')

router.get('/', authorization('user'), async (req, res) => {
    try {
        res.render('liveChat', { style: 'style.css' })
    } catch (error) {
        console.error('Error al cargar la página de chat en vivo:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router
