exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash("errors"); // Vejo se tem algum erro nas flash
    res.locals.success = req.flash("success"); // Vejo se tem algum sucesso nas flash
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