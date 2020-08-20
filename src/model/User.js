const mongoose = require("../config/db");

const UserSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
});

// Exportar o modelo de usuário com o UserSchema
module.exports = mongoose.model("user", UserSchema);