// productModel.js
const mongoose = require('mongoose');

const productoSchema =  mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  avatar: { type: String, required: false },
  isActivo: { type: Boolean ,default: false, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, 
  
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;