
const express = require('express')
const validacaoHorarios = require('../permissaoHorarios/permiteHorarios');

const rotasLaboratorios = express()

rotasLaboratorios.use(express.json()) // permite que os dados sejam enviado em formato JSON
rotasLaboratorios.use(express.urlencoded({ extended: true })) // para poder usar  o req.body

const laboratoriosArray = [
    { "Nome": "lab1 Infor", "Capacidade": "12", "Descrição": "Laboratório 1 de Informatica" },
    { "Nome": "lab2 Infor", "Capacidade": "55", "Descrição": "Laboratório 2 de Informatica" },
    { "Nome": "lab3 Infor", "Capacidade": "30", "Descrição": "Laboratório 3 de Informatica" },
    { "Nome": "lab4 Infor", "Capacidade": "45", "Descrição": "Laboratório 4 de Informatica" },
    { "Nome": "lab5 Infor", "Capacidade": "20", "Descrição": "Laboratório 5 de Informatica" },
    { "Nome": "lab6 Infor", "Capacidade": "20", "Descrição": "Laboratório 6 de Informatica" }
];

// Traz todos os laboratorios cadastrados
rotasLaboratorios.get('/labs/todos', validacaoHorarios, (req, res) => {
    try {
        res.json(laboratoriosArray);

    } catch (error) {
        res.status(400).json({ msg: 'Erro na listagem de laboratórios' });
    }
})

// Filtar por nome
rotasLaboratorios.get('/labs/:Nome', validacaoHorarios, (req, res) => {
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
rotasLaboratorios.post('/labs/novo', validacaoHorarios, (req, res) => {

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


// gerando um arquivo pdf  com os dados dos laboratórios 
const fs = require('fs');
var PDFDocument = require('pdfkit');

rotasLaboratorios.get('/labs/relatorio/pdf', (req, res) => {
    try {
        // Criar um novo documento PDF
        const doc = new PDFDocument();
        // Configurar cabeçalho para download
        res.setHeader('Content-Disposition', 'attachment; filename="laboratoriosArray.pdf"');
        // Pipe para o response (direcionar a saída do PDF para a resposta HTTP)
        doc.pipe(res);

        // Escrever cabeçalho no PDF
        doc.fontSize(12).text('Lista de Laboratórios\n\n');

        // Iterar sobre cada item no array de laboratórios e escrever no PDF
        laboratoriosArray.forEach((item, index) => {
            doc.fontSize(10).text(`${index + 1}. ${item.Nome}: ${item.Capacidade} ${item.Descrição}`);
        });
        // Finalizar e enviar o PDF
        doc.end();
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao criar relatório!' });
    }

});

//rotasLaboratorios.listen(3003, () => (console.log('O servidor está rodando')))
module.exports = rotasLaboratorios;