const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const hoteisSchema = new Schema({
    "_id":{
        "type":String,
        "required":true,
        "unique":true
    },
    "nome": {
        "type": String,
        "required": true
    },
    "endereco": {
        "type": String,
        "required": true
    },
    "descricao":{
        "type": String,
        "required": true
    },
    "disponivel":{
        "type":Boolean,
        "required":true
    },
    "servicos":{
        "type":[String],
    },
    "imagens":{
        "type":[String],
        "required":true
    }
}, {
    "timestamps": true
});

module.exports = mongoose.model("Hoteis", hoteisSchema,"Hoteis");