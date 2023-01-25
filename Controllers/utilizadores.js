var express = require('express')
var router = express.Router()
const Utilizadores = require("../Models/utilizadores.js")
const incrementarId = require('../shared/incrementarId.js');
const bcrypt = require('bcryptjs')

router.get("/", (req, res) => {

    Utilizadores.find({}).then(result => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo todos os utilizadores")
    })
})

router.get("/:_id", (req, res) => {

    Utilizadores.findById(req.params._id).then(result => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }

    }).catch((err) => {
        return res.status(500).send(err || "Erro retornando o utilizador Id:" + req.params._id)
    })
})

router.post("/", async (req, res) => {


    const { nome, apelido, email, telefone, data_nascimento, nif, genero } = (req.body)

    const ultimoId = await Utilizadores.find({}).sort({ _id: -1 }).limit(1)
        .then((result) => {
            if (result[0] != undefined) {
                return result[0]._id
            } else {
                return "U000"
            }
        })

    const _id = incrementarId(ultimoId)
    const admin = false

    const password = bcrypt.hashSync(req.body.password, 10)

    Utilizadores.create({ _id, nome, apelido, password, email, telefone, data_nascimento, nif, genero, admin }).then(() => {
        return res.status(200).send("Utilizador adicionado")
    }).catch((err) => {
        return res.status(500).send("Algo falhou tenta novamente criar" || err)
    })

})


router.patch("/:_id", (req, res) => {

    if (!req.body) {
        return res.status(400).send("Nada para fazer update");
      }

    Utilizadores.findByIdAndUpdate(req.params._id, req.body, { useFindAndModify: false }).then((result) => {
        return res.status(200).send(result);
    }).catch((err) => {
        return res.status(500).send(err || "Erro guardando alterações ao utilizador Id:" + req.params._id)
    })

})

router.delete("/:_id", (req, res) => {

    Utilizadores.findByIdAndDelete(req.params._id, { useFindAndModify: false }).then(() => {
        return res.status(200).send("Utilizador excluído com sucesso")
    }).catch((err) => {
        console.log(err)
        return res.status(500).send(err || "Erro ao eliminar o utilizador Id:" + _id)

    })
})

module.exports = router