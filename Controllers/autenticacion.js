// controllers/autenticacion.js

// Función para cerrar sesión
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            return res.redirect('/agenda'); // Redirigir a la agenda si hay un error
        }
        // Eliminar la cookie de sesión para asegurar que esté completamente cerrada
        res.clearCookie('connect.sid'); // Asegúrate que 'connect.sid' sea el nombre correcto de tu cookie

        // Evitar que el navegador guarde en caché la página de la sesión
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.redirect('/login');
    });
};

// Middleware para proteger rutas
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.medicoId) {
        return next();
    }
    res.redirect('/login');
};

module.exports = { logout, isAuthenticated };
