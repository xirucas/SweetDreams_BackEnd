var express = require('express')
var router = express.Router()
const Utilizadores = require("../Models/utilizadores.js")
const incrementarId = require('../shared/incrementarId.js');


router.get("/", (req, res) => {

    Utilizadores.find({}).then(result => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err)=>{
        return res.status(500).send(err||"Erro devolvendo todos os utilizadores")
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

    const { nome, apelido, email, password, telefone, data_nascimento, nif } = (req.body)

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

    Utilizadores.create({ _id, nome, apelido, email, password, telefone, data_nascimento, nif, admin }).then(() => {
        return res.status(200).send("Utilizador adicionado")
    }).catch((err) => {
        return res.status(500).send("Algo falhou tenta novamente criar" || err)
    })

})

router.patch("/:_id", (req, res) => {

    const { nome, apelido, email, password, telefone, data_nascimento, nif, admin } = (req.body)

    Utilizadores.findOneAndUpdate(req.params._id, { nome, apelido, email, password, telefone, data_nascimento, nif, admin }).then(() => {
        return res.status(200).send("Utilizador alterado")
    }).catch((err) => {
        return res.status(500).send(err || "Erro guardando alterações ao utilizador Id:" + req.params._id)
    })
})

router.delete("/:_id", (req, res) => {

    Utilizadores.findByIdAndDelete(req.params._id, { useFindAndModify: false }).then((result) => {
        return res.status(200).send("Utilizador excluído com sucesso")
    }).catch((err) => {
        console.log(err)
        return res.status(500).send(err || "Erro ao eliminar o utilizador Id:" + req.params._id)

    });
})

module.exports = router