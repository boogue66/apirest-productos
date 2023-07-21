// productModel.js
const mongoose = require('mongoose');
const Producto = mongoose.model('Producto');

const coleccionSchema =  mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  portada: { type: String, required: false },
  precio: { type: Number, default: 1, required: false },
  isActivo: { type: Boolean ,default: false, required: false  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  producto:{ type: Schema.ObjectId, ref: "Producto" }
});

const Coleccion = mongoose.model('Producto', coleccionSchema);

module.exports = Coleccion;