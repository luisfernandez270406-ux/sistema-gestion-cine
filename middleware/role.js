
export function verificarRol(...rolesPermitidos) {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.usuario.role)) {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        next();
    };
}
