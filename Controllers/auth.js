var express = require('express')
var router = express.Router()
const Utilizadores = require("../Models/utilizadores.js")
const bcrypt = require('bcryptjs')
const SECRET_JWT_CODE = "N9hd9DShywkdsa27ujIW"
const JsonWebToken = require('jsonwebtoken')

router.post("/login", (req, res) => {

    Utilizadores.findOne({email:req.body.email}).then(user => {
       if(!user){
              return res.status(404).send("Utilizador não encontrado")
       }else{
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).send("Password incorreta")
        }else{
            const token = JsonWebToken.sign({_id:user._id, email:user.email},SECRET_JWT_CODE)
            return res.status(200).send({token:token, user:user})
        }
       }
    }).catch((err)=>{
        return res.status(500).send(err)
    })
})

router.get("/getprofile", (req, res) => {
    encontrarUserPorToken(req).then((user)=>{
        return res.status(200).send(user)
    }).catch((err)=>{
        return res.status(500).send(err)
    })
})

function encontrarUserPorToken(req){
    return new Promise((resolve, reject)=>{
        if(req.headers && req.headers.authorization){
            let token = req.headers.authorization
            let decode
            try{
                decode = JsonWebToken.verify(token, SECRET_JWT_CODE)
            }catch(e){
                 reject("Token inválido")
                 return
            }
            let userId=decode._id
            Utilizadores.findById(userId).then((user)=>{
                if(user){
                    resolve(user)
                }else{
                    reject("Utilizador não encontrado")
                }
            }).catch((err)=>{
                reject("Erro com o token")
            })
        }else{
            reject("Token não encontrado")
        }
    })
}

module.exports = router