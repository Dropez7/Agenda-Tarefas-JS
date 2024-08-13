const mongoose = require("mongoose");
const validator = require("validator"); // valida email
const bcrypt = require("bcryptjs"); // criptografa senha

const LoginSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const loginModel = mongoose.model("login", LoginSchema);

class Login {

    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

   
    async register() {
        this.validar();
        if (this.errors.length > 0) return; 

        await this.userExists();
        if (this.errors.length > 0) return;

        const salt = await bcrypt.genSalt(); 
        this.body.password = await bcrypt.hashSync(this.body.password, salt);

        this.user = await loginModel.create(this.body); 


        console.log(e);


    }

    async login(){
        this.validar();
        if (this.errors.length > 0) return; 

        this.user = await loginModel.findOne({
            email: this.body.email
        });

        if (!this.user) {
            this.errors.push("Usuário não existe");
            return;
        }

        
        if(!bcrypt.compareSync(this.body.password, this.user.password)){
            this.errors.push("Senha inválida");
            this.user = null;
            return;
        }
    }
    async userExists() {

        this.user = await loginModel.findOne({
            email: this.body.email
        });

        if (this.user) this.errors.push("Usuário já existe");

    }
    validar() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) {
            this.errors.push("E-mail inválido");
        }

        if (this.body.password.length < 3 || this.body.password.length > 12) {
            this.errors.push("A senha precisa ter entre 3 e 12 caracteres");
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        };

    }
}

module.exports = Login;