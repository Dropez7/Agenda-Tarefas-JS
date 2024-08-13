import "./assets/css/style.css";
import "core-js/stable";
import "regenerator-runtime/runtime"; 
import FormularioCadastro from "./modules/FormularioCadastro";
import FormularioLogin from "./modules/FormularioLogin";
import FormularioContato from "./modules/FormularioContato";

const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
    formCadastro.addEventListener("submit", function(e) {
        e.preventDefault();
        FormularioCadastro.limparErros();
        
        let email = document.getElementById("emailCadastro").value;
        let senha = document.getElementById("passwordCadastro").value;

        new FormularioCadastro(email, senha);
    });
}

const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault();
        FormularioLogin.limparErros();
        
        let email = document.getElementById("emailLogin").value;
        let senha = document.getElementById("passwordLogin").value;

        new FormularioLogin(email, senha);
    });
}

const formContato = document.getElementById("formContato");
if (formContato) {
    formContato.addEventListener("submit", function(e) {
        e.preventDefault(); 
        FormularioContato.limparErros();
        
        let nome = document.getElementById("nomeContato").value;
        let sobrenome = document.getElementById("sobrenomeContato").value;
        let email = document.getElementById("emailContato").value;
        let telefone = document.getElementById("telefoneContato").value;

        new FormularioContato(nome, sobrenome, email, telefone);
    });
}
