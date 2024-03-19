function authMiddleware(req, res, next) {
    try {
        if (req.session.user) {
            return next();
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error en el middleware de autenticación:', error.message);
        res.status(401).json({ error: 'Error de autenticación' });
    }
}

module.exports = authMiddleware;
