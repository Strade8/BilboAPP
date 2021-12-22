
// importo mongoose e definisco uno schema con i campi della struttura dati ARTICOLO
//questo schema rispecchia la struttura dei documents nelle collection sul database
const mongoose = require('mongoose');

const ArtSchema = mongoose.Schema ({
    anno_pubblicazione : {
        type: String ,
        default : '1995'
    },
    title :{
        type: String ,
        required : true 
    },
    stato :{
        type : String , 
        default : "prenotabile"
    },
    autore : {
        type : String,
        required : true 
    },
    casa_editrice:{
        type:String
    },
    codice_isbn: {
        type:String,
        required: true 
    }
});

// esporto il modulo per potelo utilizzare in index.js
module.exports = mongoose.model('articoli', ArtSchema);