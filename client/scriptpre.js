const app = document.getElementById('rootpre');
const container = document.createElement('div');
container.setAttribute('class', 'container');


app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8000/bilboApi/prenotazioni', true);
request.send();
request.onload = function () {


    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    console.log(data);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(pren => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            
            const h1 = document.createElement('h1');
            h1.textContent = pren.title;
            const h2 = document.createElement('h1');
            h2.textContent = pren.date;
            const h3 = document.createElement('h1');
            h3.textContent = pren.state;
            const h4 = document.createElement('h1');
            h4.textContent = pren.utente;
            const h5 = document.createElement('h1');
            h5.textContent = pren.obj_prenotato;
    
            const but = document.createElement('button');
            but.innerHTML="cancella prenotazione";
            but.setAttribute('value',pren._id)
            but.addEventListener("click",  async function cancellapre(){

                const data2 = {'_id' : pren._id} ;
                fetch('http://localhost:8000/cancella_prenotazione', {
                  method: 'DELETE', 
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data2),
                })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                  
                  
                })
                .catch((error) => {
                  console.error('Error:', error);
                });    

                
                //index.html deve essere refreshed per visualizzare il cambiamento
                    const data3 = {'_id' : pren.obj_prenotato} ;
                    fetch('http://localhost:8000/bibloApi/articoli/_id/di_nuovo_disponibile', {
                        method: 'PATCH', 
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data3),
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
            card.appendChild(but)
            
         
                    
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}
