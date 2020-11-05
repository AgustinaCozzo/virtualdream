 var rp = require('request-promise');
 var options = {
     metod: 'GET',
     uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
     json: true 
 };
 
 rp(options)
     .then(function (rta) {
        console.log(rta);
    })
    .catch(function (error2) {
        console.log('error: ' + error2)
    });
