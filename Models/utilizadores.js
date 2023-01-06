const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const utilizadores = new Schema({
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
        "required": true
    },
    "password": {
        "type": String,
        "required": true
    },
    "admin":{
        "type":Boolean,
        "required": true
    }
}, {
    "timestamps": true
});





module.exports = mongoose.model("utilizadores", utilizadores);