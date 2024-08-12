exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash("errors"); // Vejo se tem algum erro nas flash
    res.locals.success = req.flash("success"); // Vejo se tem algum sucesso nas flash
    res.locals.user = req.session.user; // Vejo se tem algum usuário na sessão
    next();
};

exports.checkCsrtError = (err, req, res, next) => {
    if (err) {
        return res.render("404");
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash("errors", "Você precisa fazer login.");
        req.session.save(() => res.redirect("/")); // Salvo a sessão, pois o redirect é assíncrono e ele não espera a sessão ser salva
        return;
    }
    next();
}