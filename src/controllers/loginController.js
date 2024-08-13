const Login = require("./../models/loginModel.js");

exports.index = (req, res) => {

    if (req.session.user) return res.redirect("/"); // Se tiver usuário na sessão, redireciono pra index

    return res.render("login");
};

exports.register = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors); 
            req.session.save(function () { 
                res.redirect("back");
            });

            return;
        }
        req.flash("success", "Usuário criado com sucesso"); 
        req.session.save(function () {
            res.redirect("back"); 
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }

}

exports.login = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors); // Coloco nossos erros dentro do flash message
            req.session.save(function () { // salvei na sessao
                res.redirect("back"); // Volta pra onde estava
            });

            return;
        }

        req.flash("success", "Usuário logado com sucesso"); // Coloco nossos sucessos dentro do flash message
        req.session.user = login.user; // Salva o usuário na sessao 
        req.session.save(function () { // salvei na sessao
            res.redirect("back"); // Volta pra onde estava


        // Agora q ele logou posso mandar ele pro middleware
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
}

exports.logout = function (req, res) {
    req.session.destroy(); // Destruo a sessao
    res.redirect("/login/"); // Redireciono pra index
}
