var express = require("express");
var router = express.Router();
const Reservas = require("../Models/reservas.js");
const incrementarId = require('../shared/incrementarId.js');

router.get("/", function (req, res) {
  Reservas.find({})
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res.status(500).send(err || "Erro devolvendo todas as Reservas");
    });
});

router.get("/:id", function (req, res) {
  Reservas.findById(req.params.id)
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .send(err || "Erro devolvendo a reserva com Id:" + req.params.id);
    });
});

router.get("/hotel/:hotel_id", function (req, res) {
  Reservas.find({ hotel_id: req.params.hotel_id })
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .send(
          err ||
          "Erro devolvendo as reservas do hotel Id:" + req.params.hotel_id
        );
    });
});

router.get("/user/:user_id", function (req, res) {
  Reservas.find({ utilizador_id: req.params.user_id })
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res.status(500).send(err || "Erro devolvendo as reservas do utilizador Id:" + req.params.user_id);
    });
});

router.post("/", async (req, res) => {
  const {
    hotel_id,
    quarto_id,
    utilizador_id,
    data_entrada,
    data_saida,
    preco,
    numero_pessoas,
    estado,
    observacoes,
  } = req.body;

  const ultimoId = await Reservas.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((result) => {
      if (result[0] != undefined) {
        return result[0]._id;
      } else {
        return "R000";
      }
    });

  const _id = incrementarId(ultimoId);

  Reservas.create({
    _id,
    hotel_id,
    quarto_id,
    utilizador_id,
    data_entrada,
    data_saida,
    preco,
    numero_pessoas,
    estado,
    observacoes,
  })
    .then(() => {
      return res.status(200).send("reserva adicionada");
    })
    .catch((err) => {
      return res.status(500).send("Algo falhou tenta novamente criar" + err);
    });
});

router.patch("/:_id", function (req, res) {
  Reservas.findByIdAndUpdate(req.params._id, req.body, { useFindAndModify: false })
    .then((result) => {
      if (result != null) {
        return res.status(200).send("Reserva atualizada");
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res.status(500).
        send(err || "Erro atualizando a reserva com Id:" + req.params.id);
    });
});

router.delete("/:id", function (req, res) {
  Reservas.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result != null) {
        return res.status(200).send("Reserva eliminada");
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res.status(500).
        send(err || "Erro eliminando a reserva com Id:" + req.params.id);
    });
});



module.exports = router;