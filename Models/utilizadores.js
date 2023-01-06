const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const utilizadoresSchema = new Schema({
    "_id":{
        "type":String,
        "required":true,
        "unique":true
    },
    "nome": {
        "type": String,
        "required": true
    },
    "apelido": {
        "type": String,
        "required": true
    },
    "email": {
        "type": String,
        "required": true,
        "unique": true
    },
    "password": {
        "type": String,
        "required": true
    },
    "telefone": {
        "type": Number,
        "pattern":'^([9][1236])\d{7}',
        "required": true,
        "unique":true
    },
    "data_nascimento":{
        "type":String,
        "format":"date",
        "required": true
    },
    "nif":{
        "type": Number,
        "pattern":'\d{9}',
        "required": true,
        "unique":true
    },
    "admin":{
        "type":Boolean,
        "required": true
    }
}, {
    "timestamps": true
});





module.exports = mongoose.model("Utilizadores", utilizadoresSchema,"Utilizadores");