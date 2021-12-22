
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

let param =new URLSearchParams(window.location.search);
artid=param.get("id");

const data = { id: artid };

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8000/bilboApi/articoli', true);
request.send();
request.onload = function () {


    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    console.log(data);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
            if(movie._id==artid){
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;
            const h2 = document.createElement('h1');
            h2.textContent = movie.autore;
            const h3 = document.createElement('h1');
            h3.textContent = movie.stato;
            const h4 = document.createElement('h1');
            h4.textContent = movie.anno_pubblicazione;
            const h5 = document.createElement('h1');
            h5.textContent = movie.casa_editrice;
            const h6 = document.createElement('h1');
            h6.textContent ="Isbn: "+ movie.codice_isbn;
            const h7 = document.createElement('h1');
            h7.textContent ="Id: " +movie._id;

            const but = document.createElement('button');
            but.textContent = "Prenota articolo";
            but.addEventListener("click",  async function prenota(){
                const data = {'title' : movie.title,
                    'utente' : "massimo",
                    'obj_prenotato' : movie._id};
                const data2 = {'_id' : movie._id} ;
                console.log(data2);
                fetch('http://localhost:8000/bilboApi/aggiungi_prenotazione', {
                  method: 'POST', 
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });


                
                fetch('http://localhost:8000/bibloApi/articoli/_id/update_disponibilita', {
                  method: 'PATCH', 
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data2),
                })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                  window.location.reload(true);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
                
                  

                });
            
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(h2);
            card.appendChild(h3);
            card.appendChild(h4);
            card.appendChild(h5);
            card.appendChild(h6);
            card.appendChild(h7);
            if(movie.stato=="disponibile"){
            card.appendChild(but);}
            
              

            }  
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}