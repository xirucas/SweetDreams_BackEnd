var express = require('express')
var router = express.Router()
const Hoteis = require("../Models/hoteis.js");
const Quartos = require('../Models/quartos.js');
const incrementarId = require('../shared/incrementarId.js');

router.get('/', function (req, res) {
    Hoteis.find({}).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo todos os hoteis")
    })
})

router.get('/:id', function (req, res) {
    Hoteis.findById(req.params.id).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo o hotel com Id:" + req.params.id)
    })
})



router.post('/', async (req, res) => {
    const { nome, cidade, endereco, descricao, disponivel } = (req.body)

    const ultimoId = await Hoteis.find({}).sort({ _id: -1 }).limit(1)
        .then((result) => {
            if (result[0] != undefined) {
                return result[0]._id
            } else {
                return "H000"
            }
        })

    const _id=incrementarId(ultimoId)

    Hoteis.create({ _id, nome, cidade, endereco, descricao, disponivel }).then(() => {
        return res.status(200).send("Hotel adicionado")
    }).catch((err) => {
        return res.status(500).send("Algo falhou tenta novamente criar" + err)
    })
})

router.patch("/:_id", (req,res)=>{

    Hoteis.findByIdAndUpdate(req.params._id, req.body,{ useFindAndModify: false }).then(() => {
        return res.status(200).send("Hotel alterado")
    }).catch((err) => {
        return res.status(500).send(err || "Erro guardando alterações ao hotel Id:" + req.params._id)
    })
})

router.delete("/:_id", (req, res) => {
    Hoteis.findByIdAndDelete(req.params._id, { useFindAndModify: false })
    .then((result) => {
        return res.status(200).send("Hotel excluído com sucesso")
    }).catch((err) => {
        return res.status(500).send(err + " Erro ao eliminar o hotel Id:" + req.params._id)

    })
})


module.exports = router