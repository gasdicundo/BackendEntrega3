const { Router } = require('express');
const router = Router();
const { obtenerProductos } = require('../utils/products.util.js');
const ServicioProductos = require('../services/products.service.js');
const middlewareAutorizacion = require('../middlewares/authorization-middleware.js');
const generarProductosFalsos = require('../utils/mock-products.util');

router.get('/', async (req, res) => {
    try {
        const { limite, pagina, ordenar, categoria, existencia } = req.query;
        const { docs, tienePaginaAnterior, tienePaginaSiguiente, siguientePagina, paginaAnterior, totalPaginas } = await obtenerProductos({ limite, pagina, ordenar, categoria, existencia });

        if (totalPaginas && parseInt(pagina) > totalPaginas) {
            return res.redirect(`/api/productos?pagina=${totalPaginas}`);
        }

        const productos = docs;
        const { usuario } = req.session;

        res.render('pagina_principal', {
            usuario,
            productos,
            tienePaginaAnterior,
            tienePaginaSiguiente,
            siguientePagina,
            paginaAnterior,
            limite,
            ordenar,
            estilo: 'estilo-personalizado.css'
        });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/productos-falsos', async (req, res) => {
    try {
        const productosFalsos = generarProductosFalsos();
        res.json({ mensaje: productosFalsos });
    } catch (error) {
        console.error('Error al obtener productos falsos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:idProducto', async (req, res) => {
    try {
        const { idProducto } = req.params;
        const { usuario } = req.session;
        const producto = await ServicioProductos.obtenerProductoPorId(idProducto);

        if (!producto) {
            return res.status(404).json({ error: 'El producto con el ID proporcionado no existe.' });
        }

        res.render('detalles_producto', {
            usuario,
            producto,
            idProducto,
            estilo: 'estilo-personalizado.css'
        });
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post("/", middlewareAutorizacion('admin'), async (req, res) => {
    try {
        const { codigo, descripcion, precio, existencia, miniatura, titulo, categoria } = req.body;
        const resultado = await ServicioProductos.agregarProducto({ codigo, descripcion, precio, existencia, miniatura, titulo, categoria });

        if (resultado.exito) {
            res.status(201).json({ mensaje: "Producto creado exitosamente" });
        } else {
            res.status(400).json({ error: resultado.mensaje });
        }
    } catch (error) {
        console.error("Error al agregar producto:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put('/:idProducto', middlewareAutorizacion('admin'), async (req, res) => {
    try {
        const { idProducto } = req.params;
        const { ...datosProducto } = req.body;

        if (!datosProducto.titulo || !datosProducto.descripcion || !datosProducto.precio || !datosProducto.codigo || !datosProducto.existencia || !datosProducto.categoria) {
            return res.status(400).json({ error: "Todos los campos son requeridos. Producto no actualizado." });
        }

        await ServicioProductos.actualizarProducto({ ...datosProducto, id: idProducto });
        res.json({ mensaje: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

router.delete('/:idProducto', middlewareAutorizacion('admin'), async (req, res) => {
    try {
        const { idProducto } = req.params;
        const resultado = await ServicioProductos.eliminarProducto(idProducto);

        if (resultado === false) {
            return res.status(404).json({ error: 'El producto con el ID proporcionado no existe.' });
        }

        res.json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;
