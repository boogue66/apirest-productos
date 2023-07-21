const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const port= process.env.PORT || 9000;


//midleware
app.use(express.json());
app.use('/api/productos',productosRoutes);
app.use('/api/usuarios', usuariosRoutes);


//ruta Inicial 
app.get('/', (req, res) => {
    res.send('Bienvenido a esta API')
;});

//Conexion a Mongo
mongoose
    .connect(process.env.MONGO_URI )
    .then(()=> console.log('Conectado correctamente a MongoDB'))
    .catch((error)=> console.log(error));

//Mensage de que el server esta funcionando
app.listen(
    port,
    console.log('Server run in:',port));