var express = require('express')
var router = express.Router()
const Utilizadores = require("../Models/utilizadores.js")

router.get("/", (req, res) => {

    Utilizadores.find({}).then(result => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(400).send("Nada encontrado")
        }
    })
})

module.exports = router
