
const express = require('express')

const RotasLaboratorios = express()

RotasLaboratorios.use(express.urlencoded({ extended: true })) // para poder usar  o req.body

const Laboratory = [
    {"Nome": "lab1 Infor","Capacidade":"12" ,"Descricçao": ""},
    {"Nome": "lab2 Infor","Capacidade":"55" ,"Descricçao": ""},
    {"Nome": "lab3 Infor","Capacidade":"30" ,"Descricçao": ""},
    {"Nome": "lab4 Infor","Capacidade":"45" ,"Descricçao": ""},
    {"Nome": "lab5 Infor","Capacidade":"20" ,"Descricçao": ""},
    {"Nome": "lab6 Infor","Capacidade":"20" ,"Descricçao": ""}
    ];







    