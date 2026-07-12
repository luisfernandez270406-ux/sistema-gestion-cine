import jwt from "jsonwebtoken";
 
export function verificarToken(req, res, next) {
    // ¿Es una ruta de la API? -> responde siempre JSON en vez de redirigir
    const esApi = req.originalUrl.startsWith('/api');
 
    try {
        let token;
 
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
 
        if (!token) {
            if (esApi) {
                return res.status(401).json({ error: 'Token requerido' });
            }
            return res.redirect('/usuarios/login');
        }
 
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = datos;
        next();
 
    } catch (error) {
        if (esApi) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        res.redirect('/usuarios/login');
    }
}
    


