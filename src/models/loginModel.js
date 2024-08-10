const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    
    descricao: String
});

const loginModel = mongoose.model("Home", LoginSchema);

class Login {

    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
}

module.exports = Login;