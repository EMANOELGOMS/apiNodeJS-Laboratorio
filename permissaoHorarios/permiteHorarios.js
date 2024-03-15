const validacaoHorarios = (req, res, next) => {
    let date = new Date();
    let hora = date.getHours();

    if (hora <= 8 || hora > 17) {
        return res.status(403).send({ message: 'Não é permitido acessar a API neste horário' });
    }

    next();
}
module.exports = validacaoHorarios

