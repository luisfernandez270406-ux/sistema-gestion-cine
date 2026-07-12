export function verificarRol(...rolesPermitidos) {
    return (req, res, next) => {
        const esApi = req.originalUrl.startsWith('/api');
 
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            if (esApi) {
                return res.status(403).json({ error: 'Acceso denegado' });
            }
            return res.send(`
                <script>
                    alert("No tienes permisos para acceder.");
                    history.back();
                </script>
            `);
        }
        next();
    };
}