const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reservasSchema = new Schema({
    "_id":{
        "type":String,
        "required":true,
        "unique":true
    },
    "hotel_id":{
        "type":String,
        "required":true
    },
    "quarto_id":{
        "type":String,
        "required":true
    },
    "utilizador_id":{
        "type":String,
        "required":true
    },
    "data_entrada":{
        "type":String,
        "required":true
    },
    "data_saida":{
        "type":String,
        "required":true
    },  
    "preco":{
        "type":Number,
        "required":true
    },
    "estado":{
        "type":String,
        "required":true
    },
    "numero_pessoas": {
        "type":Number,
        "required": true
    },
    "observacoes":{
        "type": String,
    }
}, {
    "timestamps": true
});





module.exports = mongoose.model("Reservas", reservasSchema,"Reservas");