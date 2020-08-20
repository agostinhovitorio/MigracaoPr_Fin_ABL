const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth"); 

const clientController = require("../controllers/clientController");
const User = require("../model/User");


router.post(
    "/signup", 
    [
       check("nome", "Favor entrar com um nome de usuário válido")
       .not()
       .isEmpty(),
       check("email", "por favor, entre com um e-mail válido").isEmail(),
       check("senha", "por favor entrar com uma senha válida").isLength({
           min: 5
       })  
    ],
    clientController.cadastrarUsuario
);

router.post("/me", clientController.loginUsuario);

router.get("/getall", clientController.getAll);
router.put("/update/:id", auth, clientController.update);
router.delete("/delete/:id", auth, clientController.delete);

module.exports = router;
    