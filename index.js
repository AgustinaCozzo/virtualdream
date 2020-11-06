//Importo las librerias que voy a usar
const express = require('express');
const path = require("path");
const bodyparser = require("body-parser")
var rp = require('request-promise');
const { throws } = require('assert');
const { type } = require('os');
/////////////////////////////////////////

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

//Defino el puerto
const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}` )
}
)
////////////////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "crearPersonas.html"))
});

function validar(body) 
{
    if (Object.keys(body).length < 4) 
        {
            dni_int = parseInt(body.dni);
            
            if (dni_int <= 999999999) 
            {

                if (body.apellido != "" && typeof body.apellido === 'string') 
                {
                    
                    if ( typeof body.nombre ==='string') 
                    {
                        return true;
                    }
                 }
             }
          }
return false;
}
    

app.post('/', (req, res) => 
{
    var nroEstado = 201;
    dni_int = parseInt(req.body.dni);
    try 
    {
        
    if (validar(req.body))
    {
        var options = 
        {
            method: 'POST',
            uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
            body: 
                {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    dni: dni_int
                },
                json: true
            };

        rp(options)
            .then(function (rta) 
            {
                res.status(nroEstado).send
                ({
                    nombre:req.body.nombre,
                    apellido: req.body.apellido,
                    dni: dni_int
                })
            })
            .catch(function (error2) 
            {
                res.status(500).send("Error al realizar el POST: " + error2);
                console.log('error: ' + error2)
            });
        }
        else
        {
            nroEstado=400;
            throw new Error ("Error al validar el body");
        }

    } catch (error) 
        {
            if (nroEstado === 201) 
           {
                nroEstado = 500
               console.log(error)
               res.status(nroEstado).send("Error inesperado");
           }
            else
           {
            console.log(error)
            res.status(nroEstado).send(String(error));
           }
        }
});
