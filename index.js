const express = require('express')
const app = express();


const rotaDosLaboratorios = require('../apiNodeJS-Laboratorio/laboratorios/laboratoriosApi')
app.use(rotaDosLaboratorios)

app.listen(3003, () =>{console.log('Servidou está rodando');} )