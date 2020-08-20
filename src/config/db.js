//Arquivo database

const mongoose = require("mongoose");

const MONGOURI = "mongodb://localhost:27017/crud-usuarios";

mongoose.connect(MONGOURI, { useNewUrlParser: true,useUnifiedTopology: true });

module.exports = mongoose;
