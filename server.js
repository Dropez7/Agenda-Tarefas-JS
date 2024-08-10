require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        app.emit("pronto"); 
    }).catch(e => console.log(e));


const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionsOptions = session({
    secret: "um segredo",
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTION_STRING
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const { middlewareGlobal, checkCsrtError, csrfMiddleware } = require("./src/middlewares/middleware");    

app.use(middlewareGlobal);
app.use(checkCsrtError);
app.use(csrfMiddleware);
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(flash()); 
app.use(helmet()); 
app.use(csrf());
app.use(sessionsOptions);
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(routes);

app.on("pronto", () => {
    app.listen(3000, () => {
        console.log("Acessar http://localhost:3000");
        console.log("Servidor rodando na porta 3000");
    })
})