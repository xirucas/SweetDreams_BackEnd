const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://SweetDreams:Deloitte303@ac-ojuroaf-shard-00-00.2mzcji7.mongodb.net:27017,ac-ojuroaf-shard-00-01.2mzcji7.mongodb.net:27017,ac-ojuroaf-shard-00-02.2mzcji7.mongodb.net:27017/?ssl=true&replicaSet=atlas-femeg7-shard-0&authSource=admin&retryWrites=true&w=majority"
const dbName = "SweatDreamsDB"
const connect = mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true })
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

connect.then(() => {
    console.log("Base de dados conectada");

    let utilizadoresEndPoint = require("./Controllers/utilizadores.js")
    let reservasEndPoint = require("./Controllers/reservas.js")
    let quartosEndPoint = require("./Controllers/quartos.js")
    let hoteisEndPoint = require("./Controllers/hoteis.js")
    let authEndPoint = require("./Controllers/auth.js")

    app.use(function (req, res, next) {
        console.log("Novo pedido efetuado " + req.method + " na rota " + req.url)
        next()
    })

    app.use("/utilizadores", utilizadoresEndPoint)
    app.use("/utilizador", authEndPoint)
    app.use("/reservas", reservasEndPoint)
    app.use("/quartos", quartosEndPoint)
    app.use("/hoteis", hoteisEndPoint)

    app.listen(port, () => console.log("BackEnd SweetDreams iniciado na porta", port))
}).catch(err => {
    console.log("Impossivel connectar á base de dados! " + err)
    process.exit()
})
