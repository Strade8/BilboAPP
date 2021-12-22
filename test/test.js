var test = require('tape');
var request = require('supertest');
var app = require('../api/index');

test('TEST1: Correct atricles returned', function (assert) {
    request(app)
        .get('/bilboApi/articoli')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            
            var NumOfBook = res.body.length;
            var result = false;
            if (NumOfBook == 0) {
                result = true;
            }

            assert.error(err, 'No error');
            assert.notEqual(true, result, 'articles retrieved Correctly');
            assert.end();
        });
});

test('TEST2: correct article added', function (assert) {
    request(app)
        .post('/bilboApi/aggiungi_articolo')
        .send({
            "anno_pubblicazione" : "1998",
            "title" : "Dumbo",
            "autore" : "W_Disney",
            "casa_editrice" : "Bompiani",
            "codice_isbn" : "21678763521s4421321adqwd22"
        })
       
        .end(function (err, res)  {
            if (err) {
                reject(new Error('An error occured with the employee Adding API, err: ' + err))
            }
            assert.error(err, 'No error');
            assert.isEqual("Added Successfully", res.body, "Article added correctly")
            assert.end();
        });
});

test('TEST3: Prenotazioni deleted', function (assert) {
    request(app)
        .del('/cancella_prenotazione')
        .send({
            "_id" : "61b4ef5620f4a93575048f03"
        })
        .end( function (err, res) {
            if (err) {
                reject(new Error('An error occured with the prenotazioni deleting API, err: ' + err))
            }
            assert.error(err, 'No error');
            assert.isEqual("Deleted Successfully", res.body, "Prenotazione deleted correctly")
            assert.end();
        });
});