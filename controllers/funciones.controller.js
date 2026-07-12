import FuncionesModel from '../models/funciones.model.js';
import PeliculasModel from "../models/peliculas.model.js";
import SalasModel from "../models/salas.model.js";

class FuncionesController {
    async listar(req,res) {
        try {
            const funciones =  await FuncionesModel.listarDetallado();
                res.render("funciones",{funciones,usuario:req.usuario});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

}
    async listarApi(req, res) {
        try {
            const funciones = await FuncionesModel.listar();
            return res.json(funciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async crear(req,res) {
        try {
            const nuevaFuncion = await FuncionesModel.crear(req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaFuncion);
            }
            res.redirect('/funciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async crearApi(req, res) {
        try {
            const nuevaFuncion = await FuncionesModel.crear(req.body);
            return res.status(201).json(nuevaFuncion);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editar(req,res) {
        try {
            const funcionActualizada = await FuncionesModel.editar(req.params.id, req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(funcionActualizada);
            }
            res.redirect('/funciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editarApi(req, res) {
        try {
            const funcionActualizada = await FuncionesModel.editar(req.params.id, req.body);
            return res.json(funcionActualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
   async eliminar(req, res) {

    const id = req.params.id;

    FuncionesModel.tieneReservaciones(id)

        .then(tiene => {

            if (tiene) {

                return res.send(`
                    <script>
                        alert("No se puede eliminar: esta función tiene reservaciones asociadas.");
                        window.location.href="/funciones";
                    </script>
                `);

            }

            return FuncionesModel.eliminar(id)

                .then(() => {

                    res.redirect("/funciones");

                });

        })

        .catch(error => {

            res.status(400).json({ error });

        });

}

    async eliminarApi(req, res) {
        try {
            await FuncionesModel.eliminar(req.params.id);
            return res.json({ message: 'Función eliminada correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
async mostrarFormulario(req, res) {
    try {
        const peliculas = await PeliculasModel.listar();
        const salas = await SalasModel.listar();

        res.render("nueva-funcion", {
            peliculas,
            salas,
            usuario: req.usuario
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el formulario.");
    }
}
async obtenerPorId(req, res) {

    try {

        const funcion = await FuncionesModel.obtenerPorId(req.params.id);

        const peliculas = await PeliculasModel.listar();

        const salas = await SalasModel.listar();

        res.render("editar-funcion", {

            funcion,

            peliculas,

            salas,

            usuario: req.usuario

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

}



}




export default new FuncionesController();