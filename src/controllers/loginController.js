import Login from "./../models/loginModel.js";

exports.index = (req, res) => {
    res.render("login");
};

exports.register = (req, res) => {
    res.send("Rota de registro");
}

exports.login = (req, res) => {
    const login = new Login(req.body);
    res.send("Rota de login");
}