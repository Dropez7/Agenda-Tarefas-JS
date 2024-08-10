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

// É meu objeto da base de dados
const loginModel = mongoose.model("login", LoginSchema);

class Login {

    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    // Sempre que quero botar algo na base de dados tenho q trabalhar com async await
    // Por que isso sempre me retorn promisse
    async register() {
        this.validar();
        if(this.errors.length > 0) return; // qnd tiver erro, n faz nada

        await this.userExists();
        if(this.errors.length > 0) return; // verifica denovo, pro questão de segurança é melhor fazer assim do que jogar ele la em cima junto com o validar (pelo oq eu li)
        try {

            const salt = await bcrypt.genSalt(); // Gera um salt, que é um valor aleatório q é concatenado com a senha 
            this.body.password = await bcrypt.hashSync(this.body.password, salt); // 8 é o nível de criptografia
            // await pq é uma promisse

            this.user = await loginModel.create(this.body); // Cria com as chaves e valores, e como foi limpo pela gente ta de boa
            // O usuário foi criado e vira o objeto user daqui
            // ta em await pq é uma promisse
        }
        catch(e){
            console.log(e);
        }
            
    } 

    async userExists(){

        // Procura um usuário com o email q foi passado e de acordo com a chave
        // caso exista, ele vai retornar o usuário
        // caso n exista, ele vai retornar null
        this.user = await loginModel.findOne({email: this.body.email});

        if(this.user) this.errors.push("Usuário já existe");
    
    }
    validar(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) {
            this.errors.push("E-mail inválido");  
        } 

        if(this.body.password.length < 3 || this.body.password.length > 20){
            this.errors.push("A senha precisa ter entre 3 e 20 caracteres");
        }
    }

    // Garante q tudo q for enviado seja string
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== "string"){
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