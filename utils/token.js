import jwt from 'jsonwebtoken';
export function generarToken(usuario) {
    return jwt.sign(
        {
            id: usuario.id,
            nombre: usuario.nombre,
            usuario: usuario.usuario,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );


}