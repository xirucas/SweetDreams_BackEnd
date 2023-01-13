var express = require('express')
var router = express.Router()
const Quartos = require('../Models/quartos.js');
const incrementarId = require('../shared/incrementarId.js');

router.get('/', function (req, res) {
    Quartos.find({}).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo todos os Quartos")
    })
})

router.get('/:id', function (req, res) {
    Quartos.findById(req.params.id).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo o quarto com Id:" + req.params.id)
    })
})


router.post('/', async (req, res) => {
    const { hotel_id , andar, tipo, preco, descricao, disponivel } = (req.body)

    const ultimoId = await Quartos.find({}).sort({ _id: -1 }).limit(1)
        .then((result) => {
            if (result[0] != undefined) {
                return result[0]._id
            } else {
                return "Q000"
            }
        })

    const _id=incrementarId(ultimoId)

    Quartos.create({ _id, hotel_id , andar, tipo, preco, descricao, disponivel }).then(() => {
        return res.status(200).send("quarto adicionado")
    }).catch((err) => {
        return res.status(500).send("Algo falhou tenta novamente criar" + err)
    })
})



router.patch("/:_id", (req,res)=>{
    const { hotel_id , andar, tipo, preco, descricao, disponivel } = (req.body)

    Quartos.findOneAndUpdate(req.params._id, { hotel_id , andar, tipo, preco, descricao, disponivel }).then(() => {
        return res.status(200).send("quarto alterado")
    }).catch((err) => {
        return res.status(500).send(err || "Erro guardando alterações ao quarto Id:" + req.params._id)
    })
})

//ainda por mudar

router.delete("/:_id", (req, res) => {
    Quartos.findByIdAndDelete(req.params._id, { useFindAndModify: false }).then((result) => {
        return res.status(200).send("Quarto excluído com sucesso")
    }).catch((err) => {
        console.log(err)
        return res.status(500).send(err + " Erro ao eliminar o quarto Id:" + req.params._id)

    })
})


module.exports = router





