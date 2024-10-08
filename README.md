# Agenda-Tarefas-JS

Este projeto é uma aplicação de agenda de contatos desenvolvida utilizando **Express** e **EJS** para renderização de páginas. O objetivo é criar uma interface simples e eficaz para gerenciar tarefas e contatos de forma intuitiva.

## Funcionalidades

- **Adicionar Contato:** Permite a criação de novos contatos com informações detalhadas.
- **Editar Contato:** Possibilita a edição de informações de contatos existentes.
- **Excluir Contato:** Remove contatos da agenda.
- **Visualizar Contatos:** Exibe a lista de contatos salvos na aplicação.
- **Validação de Formulários:** Valida os dados inseridos no formulário de forma eficiente, incluindo validações de CPF, nome, sobrenome, usuário e senha.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o JavaScript.
- **Express.js**: Framework para construção de aplicações web.
- **EJS**: Template engine para renderizar HTML com dados do servidor.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os contatos.
- **JavaScript**: Linguagem de programação principal utilizada no projeto.
- **CSS**: Utilizado para estilização da interface.
- **Webpack**: Ferramenta para empacotamento de módulos JavaScript e CSS.

## Instalação

1. Clone o repositório para o seu ambiente local:

   ```bash
   git clone https://github.com/Dropez7/Agenda-Tarefas-JS.git
   ```

2. Acesse o repositório do Projeto:
   ```bash
   cd Agenda-Tarefas-JS
   ```

3. Instale as dependências necessárias:
   ```bash
   npm install
   ```

4. Crie um arquivo .env na raiz da aplicação contendo a connection_string do MongoDB, assim:
   ```bash
   CONNECTION_STRING=sua_chave
   ```
   Nota: Você pode obter essa chave criando uma conta gratuita no MongoDB Atlas ou configurando um MongoDB local.

5. Inicie a Aplicação
   ```bash
   npm start
   ```

## Uso
A aplicação será executada em 'http://localhost:3000'. Navegue até essa URL em seu navegador para utilizar a agenda de contatos.
