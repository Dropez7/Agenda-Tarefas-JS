import validator from 'validator';

export default class FormularioContato {
    constructor(nome, sobrenome, email, telefone) {
        this.formulario = document.querySelector("#formContato");
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;

        this.validar(); 
    }

    validarCampoVazio() {
        let valido = true;
        if (this.nome === "") {
            inserirErro("erroNomeContato", "O campo 'nome' não pode estar vazio");
            valido = false;
        }

        return valido;
    }

    validarEmail() {
        if (!validator.isEmail(this.email)) {
            inserirErro("erroEmailContato", "O email informado é inválido");
            return false;
        }
        return true;
    }

    validarEmailOuTelefone() {
        if (this.email === "" && this.telefone === "") {
            inserirErro("erroEmailContato", "O email ou o telefone devem ser preenchidos");
            inserirErro("erroTelefoneContato", "O email ou o telefone devem ser preenchidos");
            return false;
        }
        return true;
    }

    validar() {
        let valido = true;

        if (!this.validarCampoVazio()) valido = false;
        if (!this.validarEmailOuTelefone()) valido = false;
        if (!this.validarEmail()) valido = false;
        
        if (valido) {
            this.formulario.submit();
        }
    }

    static limparErros() {
        const camposErro = ["erroNomeContato", "erroSobrenomeContato", "erroEmailContato", "erroTelefoneContato"];
        camposErro.forEach(campo => {
            document.getElementById(campo).textContent = "";
        });
    }
}


function inserirErro(campo, texto) {
    document.getElementById(campo).innerHTML += `${texto}<br/>`;
}
