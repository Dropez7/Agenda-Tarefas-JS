const Login = require("./../models/loginModel.js");

exports.index = (req, res) => {
    res.render("login");
};

exports.register = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors); // Coloco nossos erros dentro do flash message
            req.session.save(function () { // salvei na sessao
                res.redirect("back"); // Volta pra onde estava
            });

            return;
        }
        req.flash("success", "Usuário criado com sucesso"); // Coloco nossos erros dentro do flash message
        req.session.save(function () { // salvei na sessao
            res.redirect("back"); // Volta pra onde estava
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }

}

exports.login = (req, res) => {

    res.send("Rota de login");
}