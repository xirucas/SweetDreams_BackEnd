const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const quartosSchema = new Schema({
    "tipo": {
        "type": String,
        "required": true
    },
    "preco": {
        "type": Number,
        "required": true
    }
}, {
    "timestamps": true
});





module.exports = mongoose.model("Quartos", quartosSchema,"Quartos");