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

app.post('/', (req, res) => 
{
    var nroEstado = 201;
    dni_int = parseInt(req.body.dni);
    try 
    {
        if (Object.keys(req.body).length < 4) 
        {

            if (dni_int <= 999999999) 
            {

                if (req.body.apellido != "" && typeof req.body.apellido === 'string') 
                {
                    
                    if ( typeof req.body.nombre ==='string') 
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

                        res.status(nroEstado).send
                        ({
                            nombre:req.body.nombre,
                            apellido: req.body.apellido,
                            dni: dni_int
                        })
                        rp(options)
                            .then(function (rta) 
                            {

                            })
                            .catch(function (error2) 
                            {
                                console.log('error: ' + error2)
                            });
                    } else 
                    {
                        nroEstado = 400 
                          throw new Error("NOMBRE invalido");
                    }
                } else 
                {
                    nroEstado = 400 
                    throw new Error("APELLIDO invalido");
                }
            } else 
            {
                nroEstado = 400 
                throw new Error("DNI invalido");              
            }
        }
        else 
        {
            throw new Error("Demasiados argumentos");
        }
    } catch (error) 
        {
            if (nroEstado === 201)
                nroEstado = 500 
            console.log(error)
            res.status(nroEstado).send("Error no previsto")
        }
});
