const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

const pre= document.createElement('button');
pre.innerHTML="Le mie Prenotazioni";
pre.setAttribute('class','pren')
pre.addEventListener("click",paginapre);
app.appendChild(pre)

app.appendChild(container);

function paginapre(){
    location.href = "prenotazioni.html";
                    
    window.open("prenotazioni.html");

}



var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8000/bilboApi/articoli', true);
request.send();
request.onload = function () {


    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    console.log(data);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            /* const data3 = {'_id' : movie._id} ;
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
                        
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                      }); */
            
            
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
    
            const but = document.createElement('button');
            but.innerHTML="dettagli";
            but.setAttribute('value',movie._id)
            but.addEventListener("click",paginadt);
            
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(h2);
            card.appendChild(h3);
            card.appendChild(h4);
            card.appendChild(h5);
            card.appendChild(but)

            function paginadt(){
                console.log(but.value);
            
                    let idd=but.value;
                
                    let urll=new URLSearchParams();
                    
                    urll.append("id",idd);
                    
                    let url="dettaglia.html?"+urll;
                    location.href = url;
                    
                       window.open(url);
                    }
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}
