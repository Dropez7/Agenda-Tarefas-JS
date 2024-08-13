import validator from 'validator';

export default class FormularioCadastro {
    constructor(email, senha) {
        this.formulario = document.querySelector("#formLogin");
        this.email = email;
        this.senha = senha;
        
        this.validar(); 
    }

    validarCampoVazio() {
        let valido = true;
        if (this.email === "") {
            inserirErro("erroEmailLogin", "O campo 'email' não pode estar vazio");
            valido = false;
        }

        if (this.senha === "") {
            inserirErro("erroPasswordLogin", "O campo 'senha' não pode estar vazio");
            valido = false;
        }

        return valido;
    }

    validarCaracteresSenha() {
        if (this.senha.length < 6 || this.senha.length > 12) {
            inserirErro("erroPasswordLogin", "A senha deve conter entre 6 e 12 caracteres");
            return false;
        }
        return true;
    }

    validarEmail() {
        if (!validator.isEmail(this.email)) {
            inserirErro("erroEmailLogin", "O email informado é inválido");
            return false;
        }
        return true;
    }

    validar() {
        let valido = true;

        if (!this.validarCampoVazio()) valido = false;
        if (!this.validarCaracteresSenha()) valido = false;
        if (!this.validarEmail()) valido = false;
        
        if (valido) {
            this.formulario.submit(); 
        }
    }

    static limparErros() {
        const camposErro = ["erroEmailLogin", "erroPasswordLogin"];
        camposErro.forEach(campo => {
            document.getElementById(campo).textContent = "";
        });
    }
}

function inserirErro(campo, texto) {
    document.getElementById(campo).innerHTML += `<br/>${texto}`;
}
