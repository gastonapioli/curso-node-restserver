const { response } = require("express");
const Categoria = require("../models/categoria");


// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
}

// obtenerCategoria
const obtenerCategoria = async (req, res = response) => {

    const { idcategoria } = req.params;
    const categoria = await Categoria.findOne(idcategoria).populate('usuario', 'nombre');
    res.status(200).json(categoria);

}

//crearcategoria
const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        res.status(400).json({
            msg: 'La categoria ya existe'
        })
    }
    //generer la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await new Categoria(data);
    //graba en DB
    await categoria.save();
    res.status(201).json(categoria);
}

//actualizarCategoria

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);

}


//borrarCategoria - estado: false
const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.status(200).json(categoria);
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    borrarCategoria,
    actualizarCategoria
}