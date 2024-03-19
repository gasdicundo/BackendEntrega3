const { Router } = require('express');
const router = Router();
const authorizationMiddleware = require('../middlewares/authorization-middleware');

router.get('/', authorizationMiddleware('admin'), async (req, res) => {
    try {
        const { user } = req.session;
        res.render('addProduct', {
            user,
            style: 'style.css',
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
