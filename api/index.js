//setting Express
const express = require ('express');
const app = express();
//setting Moongoose connection to our mongodb database
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Strade:5300etsd@cluster0.qrpit.mongodb.net/IDLDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
});
// import articoli and prenotazioni mongoose schemas 
const articoli = require("./models/articoli");
const prenotazioni = require("./models/prenotazione");



// enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors())

//import body parser
const bodyParser = require ('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// server listening on port 8000
app.listen(8000, () => {
    console.log("Server is Running");
});




//      API 


//get API that retrive all the articoli and send them as a response (as a json)
app.get('/bilboApi/articoli', (req, res, next)=>{
//the api  uses find() method of the "articoli" schema chained with exec() method to execute a query to retrive 
//all documents in articoli collection 
    articoli.find().exec().then(docs=> {

//this little loop was used for debugging the code
        /* docs.forEach(movie => {
            console.log(movie.title); used for debugging });*/


// the send() method send the retrived documents as a response if there are no errors 
        res.send(docs);
        
    }).catch(err=>{
        res.status(500).json({
            error: "file_not_found"
        });
    });

//print a message to console to help debugging    
    console.log('handling GET request to Articoli')

});


//api that create a new document using a mongoose schema and save the document on the database 
//the api expect to receive anno_pubblicazione, title, autore, casa_editrice amd codice_isbn fields in the request body 
app.post('/bilboApi/aggiungi_articolo', (req, res, next)=>{

//creating an article using "articoli" schema defined in api/models/articoli.js
    const new_articolo  = new articoli({
        anno_pubblicazione : req.body.anno_pubblicazione,
        title : req.body.title,
        stato : "disponibile",
        autore : req.body.autore,
        casa_editrice: req.body.casa_editrice,
        codice_isbn: req.body.codice_isbn
    });

//adding the new document created to the  "articoli" collection on the Atlas database
    new_articolo.save();
// sending a response    
    res.json("Added Successfully");

//added for debugging
console.log('handling POST request to Articoli')

});





// get api that retrive an item and send it (as a json)
// the api expect a json like {"_id" : "actul_id_of_the_object"} as the body of the request
app.get('/bilboApi/articoli/_id', (req, res, next)=>{

// the api uses findBtId() method chained with exex() method to execute a query and retrive the firts documents from 
// articoli collection in our atlas databse having _id = req.body._id and send the document ( a json) as a response      
    articoli.findById(req.body._id).exec().then(docs=>{

// used for debug 
        //console.log(docs);
        /*console.log(req.body);         
        console.log(docs.title);*/
       
        res.send(docs); 

/*the response is a json like this 
{"_id": "61bcace3dd257804af0f64fa",
"anno_pubblicazione": "1995",
"title": "harry_potter",
"stato": "prenotabile",
"autore": "j.k.r",
"casa_editrice": "zanichelli",        
"codice_isbn": "1ederf3123" }     
*/

//cathing errors          
        }).catch(err=>{
        res.status(500).json({error: "file_not_found"});
    });
//used for debugging
    console.log('handling GET request to dettagli articolo')
});


// patch api that update the "stato" field of the selected document in the articoli collection. 
// the api expect the id of the document to be updated as the body of the request
// the request body sould be like this :  {"_id" : "actul_id_of_the_object"} 
app.patch('/bibloApi/articoli/_id/update_disponibilita', (req, res, next) =>{
   
// var filter is the id of the document to be updated
    var filter = req.body;

// storing in update the field to be updated and its new value
    
    var update = {stato : "non_prenotabile"};

// passing the id of the document (filter) and the field to update to the findOneAndUpdate() method 
// this method find the first document in the articoli collection and update the "stato" field of the document to "non_prenotabile"
    articoli.findOneAndUpdate(filter, update, function (err){
        if (err){
            res.json('non sono riuscito ad aggiornare');
        }
        else{
            res.json('sono riuscito ad aggiornare');
        }
    })
});

// copia dell'api soprastante, lo stato diventa in questo caso disponibile
// patch api that update the "stato" field of the selected document in the articoli collection. 
// the api expect the id of the document to be updated as the body of the request
// the request body sould be like this :  {"_id" : "actul_id_of_the_object"} 
app.patch('/bibloApi/articoli/_id/di_nuovo_disponibile', (req, res, next) =>{
   
    // var filter is the id of the document to be updated
        var filter = req.body;
    
    // storing in update the field to be updated and its new value
        
        var update = {stato : "disponibile"};
        
    // passing the id of the document (filter) and the field to update to the findOneAndUpdate() method 
    // this method find the first document in the articoli collection and update the "stato" field of the document to "non_prenotabile"
        articoli.findOneAndUpdate(filter, update, function (err){
            if (err){
                res.json('non sono riuscito ad aggiornare');
            }
            else{
                res.json('sono riuscito ad aggiornare');
            }
        })
    });




//get api that retrive all the documents in the "prenotazioni" collection and send them in the resposne (as a json )
app.get('/bilboApi/prenotazioni', (req, res, next)=>{
//the api  uses find() method of the "prenotazioni" schema chained with exec() method to execute a query to retrive 
//all documents in prenotazioni collection 
    prenotazioni.find().exec().then(docs=> {

// the send() method send the retrived documents as a response if there are no errors 
        res.send(docs);
        
    }).catch(err=>{
        res.status(500).json({
            error: "file_not_found"
        });
    });

//esed for debug  
    console.log('handling GET request to Prenotazioni')
});



//delete api that delete a documents from the "prenotazioni" collection 
//the api expect the id of documents to be deleted as the respose body 
// the request body sould be like this :  {"_id" : "actul_id_of_the_object"} 
app.delete('/cancella_prenotazione', (req, res, next)=>{

// using the deleteOne() method of the "prenotazioni" schema to delete the document whit the _id matching the _id passed in the request
     prenotazioni.deleteOne({"_id" : req.body._id}).then(
// logging a succes message in the console        
        console.log("eliminazione effettuata")

     );

     res.json("Deleted Successfully");

 });



//api that create a new document using a mongoose schema and save the document on the database 
//the api expect to receive anno_pubblicazione, title, autore, casa_editrice amd codice_isbn fields in the request body 
app.post('/bilboApi/aggiungi_prenotazione', (req, res, next)=>{

//creating an article using  "prenotazioni" schema defined in api/models/prenotazione.js 
    const new_prenotazione  = new prenotazioni({    
       
        title :req.body.title,
        utente :req.body.utente,
        obj_prenotato : req.body.obj_prenotato
    });
    

//adding the new document created to the  "articoli" collection on the Atlas database
    new_prenotazione.save();
    res.json("Added Successfully");
console.log('handling POST request to prenotazioni')
});

module.exports = app;


