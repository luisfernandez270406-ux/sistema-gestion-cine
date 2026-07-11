import jwt from 'jsonwebtoken';
export function verificarToken(req,res,next) {
    try {
        const authHeader = req.headers.autorization;
        if(!authHeader) {
            return res.status(401).json({ error: 'Token requerido' });
        }

    
    const token = authHeader.split(' ')[1];
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = datos;
    next();
    }
    catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }  
}
    


