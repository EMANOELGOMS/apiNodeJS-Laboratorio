const express = require('express')
const rotaDosLaboratorios = require('../apiNodeJS-Laboratorio/laboratorios/laboratoriosApi')
const app = express();

// Rotas dos laboratórios
// http://localhost:3003/laboratorio/todos
// http://localhost:3003/laboratorio/novo
// http://localhost:3003/laboratorio/relatorio




app.use(rotaDosLaboratorios)

app.listen(process.env.PORT || 3003,() =>{console.log("O servidor esta rodando");} )
//app.listen(3003, () =>{console.log('Servidou está rodando');} )