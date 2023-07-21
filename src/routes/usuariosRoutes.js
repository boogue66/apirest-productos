// userRoutes.js
const express = require('express');
const usuarioSchema = require('../models/usuarioModel');
const router = express.Router();
const usuario = usuarioSchema;

// Rutas de usuarios
//Obtener todos los usuarios
router.get('/',async (req, res) => {
  const usuario = usuarioSchema;
  try{
    usuario.find()
    .then((data)=> res.json(data))
  }catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
});

//Obtener un usuario por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarioSchema;
  try{
    usuario
    .findById(id)
    .then((data)=> res.json(data))
  }catch (error) {
    res.status(500).json({ message: 'Error al obtener este usuario.' });
  }
});


//Crear un nuevo usuario
router.post('/', async (req, res) => {
 const usuario = usuarioSchema(req.body);
  try{
    await usuario.save()
    .then((data) => res.json(data))
  }catch{(error) => {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Este email ya fue registrado antes' });
      } else {
        res.status(500).json({ error: 'Error al guardar el usuario en la base de datos.' });
      }}
    }
});

// Actualizar un usuario por su ID
router.put('/:id',async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const usuario = usuarioSchema;
  try{
    const result = await usuario
    .updateOne( {_id: id},{$set: {nombre: nombre, email: email}} )
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Usuario actualizado correctamente.' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado o sin cambios.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar este usuario.' });
  }
});

// Eliminar un usuario por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try{
    usuario.findByIdAndDelete(id)
  }catch (error) {
    res.status(500).json({ message: 'Error al eliminar este usuario.' });
  }

});

module.exports = router;