const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const utilizadores = new Schema({
    "Utilizador": {
        "type": String,
        "required": true
    },
    "Password": {
        "type": String,
        "required": true
    },
    "Admin":{
        "type":Boolean,
        "required": true
    }
}, {
    "timestamps": true
});

module.exports = mongoose.model("utilizadores", utilizadores);