const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reservasSchema = new Schema({
    "_id":{
        "type":String,
        "required":true,
        "unique":true
    },
    "preco":{
        "type":Number,
        "required":true
    },
    "data_inicio": {
        "type": Date,
        "required": true
    },
    "data_fim": {
        "type": Date,
        "required": true
    },
    "numero_pessoas": {
        "type": Number,
        "required": true
    }
}, {
    "timestamps": true
});





module.exports = mongoose.model("Reservas", reservasSchema,"Reservas");