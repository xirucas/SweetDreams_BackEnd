const express = require('express');
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://SweetDreams:Deloitte303@ac-ojuroaf-shard-00-00.2mzcji7.mongodb.net:27017,ac-ojuroaf-shard-00-01.2mzcji7.mongodb.net:27017,ac-ojuroaf-shard-00-02.2mzcji7.mongodb.net:27017/?ssl=true&replicaSet=atlas-femeg7-shard-0&authSource=admin&retryWrites=true&w=majority"
const dbName = "app_menu"
const connect = mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true })
const port = process.env.PORT || 8080;
app.use(express.json());

const users = require("./Models/utilizadores")

connect.then(() => {
    console.log("Connected correctly to server");

    let utilizadoresEndPoint = require("./Controllers/utilizadores")

    app.use(function (req, res, next) {
        console.log("Novo pedido efetuado" + req.method + req.app)
        next()
    })

    app.use("/utilizadores", utilizadoresEndPoint)

    app.listen(port, () => console.log("SweetDreams BackEnd Iniciado", port))
})
    .catch(err => console.error(err))
