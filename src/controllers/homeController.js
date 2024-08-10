exports.paginaInicial = (req, res) => {

    res.render("index", {
        titulo: "Esse é o titulo da pagina 2222222",
        numeros: [0, 1, 2, 3, 4, 5]
    });
}

exports.trataPost = (req, res) => {
    res.send(`Olá ${req.body.nome}, sou sua nova rota de POST.`);
};