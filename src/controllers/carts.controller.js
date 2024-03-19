const { Router } = require('express');
const router = Router();

const CartService = require('../services/cart.service.js');
const ProductsService = require('../services/products.service.js');
const calculateSubtotalAndTotal = require('../utils/calculoTotales-Cart.util.js');
const authorization = require('../middlewares/authorization-middleware.js');
const NewPurchaseDTO = require('../DTO/new-purchase.dto.js');
const separateStocks = require('../utils/separateStocks.util');

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { user } = req.session;
        const filterById = await CartService.getCartByID(cid);
        if (!filterById) {
            return res.status(404).json({ error: 'El carrito no existe.' });
        }
        const { subtotal, total } = calculateSubtotalAndTotal(filterById.products);
        res.render('cart', { user, subtotal, filterById, total, style: 'style.css' });
    } catch (error) {
        console.error('Error al obtener el carrito:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:cid/purchase', async (req, res) => {
    try {
        const { cid } = req.params;
        const { user } = req.session;
        const { total, orderNumber } = req.query;
        const filterById = await CartService.getCartByID(cid);
        if (!filterById || !user) {
            return res.status(404).json({ error: 'Error al ver la orden de compra.' });
        }
        res.render('ticket', { user, total, orderNumber, style: 'style.css' });
    } catch (error) {
        console.error('Error al obtener el ticket:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await CartService.addCart();
        res.status(201).json({ message: 'Carrito creado correctamente', cid: result.cid });
    } catch (error) {
        console.error('Error al cargar productos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:cid/products/:pid', authorization('user'), async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = await ProductsService.getProductByID(pid);
        if (!product) {
            return res.status(404).json({ error: 'El producto no existe.' });
        }
        const result = await CartService.addProductInCart(cid, pid);
        if (result.success) {
            req.session.user.cart = cid;
            res.status(201).json({ message: result.message });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error al cargar productos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:cid/purchase', async (req, res) => {
    try {
        const { cid } = req.params;
        const { user } = req.session;
        const filterById = await CartService.getCartByID(cid);
        if (!filterById) {
            return res.status(404).json({ error: 'El carrito no existe.' });
        }
        const { productsInStock, productsOutOfStock } = separateStocks(filterById.products);
        await ProductsService.updateStock(productsInStock);
        const updatedCart = await CartService.updateCart(cid, productsOutOfStock);
        if (!updatedCart.success) {
            return res.status(500).json({ error: updatedCart.message });
        }
        const { total } = calculateSubtotalAndTotal(productsInStock);
        const NewTicketInfo = new NewPurchaseDTO(total, user);
        const order = await CartService.createPurchase(NewTicketInfo);
        const orderNumber = order.createdOrder.code;
        res.status(201).json({ message: 'Ticket creado correctamente', total, orderNumber });
    } catch (error) {
        console.error('Error al crear una orden:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:cid/products/:pid', authorization('user'), async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await CartService.updateProductQuantity(cid, pid, quantity);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
