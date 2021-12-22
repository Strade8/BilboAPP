// importo mongoose e definisco uno schema con i campi della struttura dati PRENOTAZIONE
//questo schema rispecchia la struttura dei documents nelle collection sul database
const mongoose = require('mongoose');

const prenSchema = mongoose.Schema ({
    date : {
        type: Date ,
        default : Date.now
    },
    title :{
        type: String ,
       
    },
    state :{
        type : String , 
        default : "in_consegna"
    },
    utente : {
        type : String,
        
    },
// obj_prenotato dovrebbe essere un _id di un oggetto presente nella collezione articolis
    obj_prenotato : {
    type: mongoose.Schema.Types.ObjectId,
 }
});
// esporto il modulo per potelo utilizzare in index.js
module.exports = mongoose.model('prenotazione', prenSchema);
