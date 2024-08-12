const Contato = require("../models/contatoModel")


exports.index = (req, res) => {

    if (!req.session.user) return res.redirect("/"); // Se não tiver usuário na sessão, redireciono pra index

    res.render("contato", { 
        contato: {}
    });
};

exports.register = async (req, res) => {

    try {

        const newContato = new Contato(req.body);
        await newContato.register();

        if (newContato.errors.length > 0) {
            req.flash("errors", newContato.errors);
            req.session.save(() => res.redirect("back")); // Salvo a sessão, pois o redirect é assíncrono e ele não espera a sessão ser salva
            return;
        }

        req.flash("success", "Contato inserido com Sucesso!");
        req.session.save(() => res.redirect(`/contato/index/${newContato.contato._id}`)); // Entra no contato e pega o id dele "o mesmo do banco de dados"
        return;
    } catch (e) {
        console.log(e)
        res.render("404")
    }
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render("404"); // Se n tiver o parametro id

    const contato = await Contato.buscaPorId(req.params.id)

    if (!contato) return res.render("404")

    res.render("contato", {
        contato
    })
}

exports.edit = async (req, res) => {

    try{ 

        if(!req.params.id) return render("404")
    
        const contato = new Contato(req.body)
        await contato.edit(req.params.id);
    
        if (contato.errors.length > 0) {
            req.flash("errors", contato.errors);
            req.session.save(() => res.redirect("back")); // Salvo a sessão, pois o redirect é assíncrono e ele não espera a sessão ser salva
            return;
        }
    
        req.flash("success", "Contato atualizado com Sucesso!");
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)); // Entra no contato e pega o id dele "o mesmo do banco de dados"
        return;
    } catch (e){
        console.log(e)
        res.render("404")
    }

}

exports.delete = async(req, res) => {
    if (!req.params.id) return res.render("404"); // Se n tiver o parametro id

    const contato = await Contato.delete(req.params.id)

    if (!contato) return res.render("404")

    req.flash("success", "Contato apagado com sucesso");
    req.session.save(() => res.redirect("back")); // Salvo a sessão, pois o redirect é assíncrono e ele não espera a sessão ser salva
    return;
}