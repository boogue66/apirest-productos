// productRoutes.js
const express = require('express');
const productoSchema = require('../models/productoModel');
const router = express.Router();
const producto = productoSchema;

// Ruta para obtener todos los productos
router.get('/',async (req, res) => {
    const producto = productoSchema;
    try{
      await producto.find()
      .then((data)=> res.json(data))
    }catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos.' });
    }
});

// Ruta para obtener un producto por su ID
router.get('/:id',async (req, res) => {
  const { id } = req.params;
  try{
    await producto
    .findById(id)
    .then((data)=> res.json(data))
  }catch (error) {
    res.status(500).json({ message: 'Error al obtener este Producto.' });
  }
});

// Ruta para crear un nuevo producto
router.post('/',async (req, res) => {
  const producto = productoSchema(req.body);
  try{
    await producto.save()
    .then((data) => res.json(data))
  }catch{(error) => {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Este Producto ya fue registrado antes' });
      } else {
        res.status(500).json({ error: 'Error al guardar el Producto en la base de datos.' });
      }}
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:id',async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion ,isActivo ,avatar} = req.body;
  try{
    const result = await producto
    .updateOne( {id: id},{
      $set: {
        nombre: nombre, 
        descripcion: descripcion, 
        isActivo:isActivo,
        avatar:avatar
      }
    })
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Producto actualizado correctamente.' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado o sin cambios.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar este Producto.' });
  }
});

// Ruta para eliminar un producto por su ID
router.delete('/:id',async (req, res) => {
  const { id } = req.params;
  try{
    await producto.findByIdAndDelete(id)
  }catch (error) {
    res.status(500).json({ message: 'Error al eliminar este Producto.' });
  }
});

module.exports = router;