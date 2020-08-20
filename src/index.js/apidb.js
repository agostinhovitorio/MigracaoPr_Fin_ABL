const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");

//Inicio Servidor

InitiateMongoServer(); 

const app = express();

//Porta

const PORT = process.env.PORT || 4000;

//aplicativo intermediário

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({message: "API rodando"});

});

app.listen(PORT, (req,res) => {
    console.log("Server Started at PORT ${PORT}");

});
