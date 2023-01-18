const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const quartosSchema = new Schema({
    "_id":{
        "type":String,
        "required":true,
        "unique":true
    },
    "hotel_id":{
        "type":String,
        "required":true
    },
    "andar":{
        "type":Number,
        "required":true
    },
    "tipo": {
        "type": String,
        "required": true
    },
    "preco": {
        "type": Number,
        "required": true
    },
    "descricao":{
        "type": String,
        "required":true
    },
    "disponivel":{
        "type":Boolean,
        "required":true
    }
    
}, {
    "timestamps": true
});





module.exports = mongoose.model("Quartos", quartosSchema,"Quartos");