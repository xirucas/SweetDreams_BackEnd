const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const hoteisSchema = new Schema({
    "nome": {
        "type": String,
        "required": true
    },
    "cidade": {
        "type": String,
        "required": true
    },
    "endereco": {
        "type": String,
        "required": true
    },
    "serviços": {
        "type": [String],
        "required": true
    }
}, {
    "timestamps": true
});





module.exports = mongoose.model("Hoteis", hoteisSchema,"Hoteis");