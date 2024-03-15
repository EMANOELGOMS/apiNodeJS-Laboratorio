const express = require('express')
const rotaDosLaboratorios = require('../apiNodeJS-Laboratorio/laboratorios/laboratoriosApi')
const app = express();

app.use(rotaDosLaboratorios)
app.listen(3003, () =>{console.log('Servidou está rodando');} )