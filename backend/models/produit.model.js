const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
    price: {
        type: Number,
        required: true
    },
    favorie: {
        type:Boolean,
        default:false
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie"
    } 
})

module.exports = mongoose.model("Produit",produitSchema)