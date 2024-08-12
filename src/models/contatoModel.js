const mongoose = require("mongoose");
const validator = require("validator"); // valida email


const contatoSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    telefone: {
        type: String,
        required: false,
        default: ""
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

// É meu objeto da base de dados
const contatoModel = mongoose.model("contato", contatoSchema);

function Contato(body) {
    this.body = body
    this.errors = []
    this.contato = null
}

// Assim, geral que usar um afunção async tem q ser async também

Contato.prototype.register = async function () {
    this.valida()

    if (this.errors.length > 0) return;

    this.contato = await contatoModel.create(this.body);

}


Contato.prototype.valida = function () {
    this.cleanUp();


    if (this.body.email && !validator.isEmail(this.body.email)) { // Só valida se tiver email, condição curto-circuito
        this.errors.push("E-mail inválido");
    }

    if (!this.body.nome) {
        this.errors.push("Nome é um campo obrigatório")
    }

    if (!this.body.email && !this.body.telefone) {
        this.errors.push("O Contato deve possuir um email ou telefone")
    }

}

// Não pode ser arrow por causa do this
Contato.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== "string") {
            this.body[key] = "";
        }
    }
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };

}

Contato.prototype.edit = async function(id){

    if(typeof id !== 'string') return

    this.valida()
    
    if (this.errors.length > 0) return;

    // Atualiza de acordo com o id, e o new é pra falar que eu quero que me retorne o contato atualizado
    this.contato = await contatoModel.findByIdAndUpdate(id, this.body, { new: true });

}


// static
Contato.buscaPorId = async function(id){

    if(typeof id !== 'string') return; 

    const contato = await contatoModel.findById(id);
    return contato
}

// static
Contato.buscaContatos = async function(){
    const contatos = await contatoModel.find().sort( { criadoEm: -1 }); // Pega tudo mas poderia fazer .find({ email: tal })
    // .sort é o orderby, 1 é ordem crescente e -1 é ordem decrescente

    return contatos
}

// static
Contato.delete = async function(id){

    if(typeof id !== 'string') return; 

    const contato = await contatoModel.findOneAndDelete( { id: id}); // Tem q passar um objeto
    return contato
}


module.exports = Contato;