
const express = require('express')

const rotasLaboratorios = express()

rotasLaboratorios.use(express.json()) // permite que os dados sejam enviado em formato JSON
rotasLaboratorios.use(express.urlencoded({ extended: true })) // para poder usar  o req.body


const laboratoriosArray = [
    { "Nome": "lab1 Infor", "Capacidade": "12", "Descrição": "Laboratório 1 do Informatica" },
    { "Nome": "lab2 Infor", "Capacidade": "55", "Descrição": "Laboratório 2 de Informatica" },
    { "Nome": "lab3 Infor", "Capacidade": "30", "Descrição": "Laboratório 3 de Informatica" },
    { "Nome": "lab4 Infor", "Capacidade": "45", "Descrição": "Laboratório 4 de Informatica" },
    { "Nome": "lab5 Infor", "Capacidade": "20", "Descrição": "Laboratório 5 de Informatica" },
    { "Nome": "lab6 Infor", "Capacidade": "20", "Descrição": "Laboratório 6 de Informatica" }
];

rotasLaboratorios.get('/labs/todos', (req, res) => {
    try {
        res.json(laboratoriosArray);

    } catch (error) {
        res.status(400).json({ msg: 'Erro na listagem de laboratórios' });
    }
})

rotasLaboratorios.get('/labs/:Nome', (req, res) => {
    try {
        let nomeLab = req.params.Nome;
        let labEncontrado = laboratoriosArray.find((n) => n.Nome == nomeLab);

        if (!labEncontrado) {
            res.status(404).json({ msg: `O laboratório ${nomeLab} não encontrado` });
        }

        res.json(labEncontrado);

    } catch (error) {
        res.status(400).json({ message: 'Falha na requisição' })
    }
})

//Adicionar um novo laboratório
rotasLaboratorios.post('/labs/novo', (req, res) => {
    
    try {
        let novoLabNome = req.body;
        console.log(novoLabNome);
        let LabExiste = laboratoriosArray.some((c) => c.Nome === novoLabNome.Nome);
        if (LabExiste) {
            return res.status(400).json({ msg: "Este laboratório já existe" });
        }
        laboratoriosArray.push(novoLabNome);
        //res.json(novoLabNome)
        res.status(201).send({ message: 'O laboratório foi adicionado' });
    } catch (error) {
        res.status(400).json({ msg: 'Erro no cadastro!' })
    }
})

//localhost:3000/labs/editar?id=2
//rotasLaboratorios.listen(3003, () => (console.log('O servidor está rodando')))


module.exports = rotasLaboratorios;