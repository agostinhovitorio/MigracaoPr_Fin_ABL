const {validationResult, check} = require("express-validator");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("../routes/client");
const { updateMany, model } = require("../model/User");
const { route } = require("../routes/client");
//const { delete }  = require("../routes/client");

class ClientController {

   async cadastrarUsuario(req, res){ 
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            nome,
            email,
            senha
        } = req.body;

        
        try {
            let user = await User.findOne({
                email
            })
                .then(user => console.log(user))
                .catch(e => console.log(e));
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            console.log("----- 2");

            user = new User({
                nome,
                email,
                senha
            });

            const salt = await bcrypt.genSalt(10);
            user.senha = await bcrypt.hash(senha, salt);

            console.log("----- 3");

            await user.save();

            console.log("----- 4");

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: '2d'
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json(user);
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }

    async loginUsuario(req, res) {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
    
        const { email, senha } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (!user)
                return res.status(400).json({
                message: "User Not Exist"
                });
        
            const isMatch = await bcrypt.compare(senha, user.senha);
            if (!isMatch)
                return res.status(400).json({
                message: "Incorrect Password !"
                });
        
            const payload = {
                user: {
                id: user.id
                }
            };
        
            jwt.sign(
                payload,
                "randomString",
                {
                expiresIn: 3600
                },
                (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }

    async getAll(req, res) {
        await User.find({})
            .then(user => res.status(200).json(user)) 
            .catch(e => console.log(e));
            
        }
       
    async update(req, res) {
        await User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, userUpdated) => {
            if (userUpdated) {
                res.status(200).json(userUpdated);
            }
        }) 

        console.log("ENTROU NO UPDATE"); 
        


   };
   async delete(req, res)  {
    await User.findByIdAndDelete(req.params.id, req.body,(err, userDelete) => { 
        if (userDelete) {
            res.status(200).json(userDelete);
        }
    }) 
    
    console.log("CONTAS DELETADAS");
 }
}    
        

module.exports = new ClientController();