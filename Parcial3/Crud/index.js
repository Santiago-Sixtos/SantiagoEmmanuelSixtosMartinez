// const { error } = require('console');
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//Mostrar Toda la tabla
app.get('/tdg', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gatitos'
  });
  connection.connect();
  connection.query(`SELECT * FROM tdg `, function (error, results, fields) {
    if (error) {
      res.json(error);
    } else {
      if (results.length === 0) {
        res.json({ Mensaje: "Gatito no encontrada" });
      } else {
        res.json(results);
      }
    }
  });
  connection.end();
});

//CONSULTA2 Mostrar solo uno con el Id
app.get('/tdg/:id', (req, res) => {
  //podria ser req.params.id    tambien con .body.id    query.id
  if (typeof (req.params.id) === 'undefined') {
    res.json({
      estado: 0,
      resultado: "Debe enviar el ID"
    });
  } else {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gatitos'
    });
    connection.connect();
    //podria ser req.params.id   tambine con req.body.id    
    connection.query(`SELECT * FROM tdg WHERE ID=${req.params.id}`, function (error, results, fields) {
      if (error) {
        res.json({ estado: 0, resultado: error.sqlMessage });
      } else {
        if (results.length === 0) {
          res.json({ estado: 0, resultado: "Gatito no encontrado" });
        } else {
          res.json({ estado: 1, resultado: results[0] });
        }
      }
    });
    connection.end();
  }
});

//BORRAR
app.delete('/tdg/:id', (req, res) => {
  //Para validar si el cliente puso un id para buscar el dato
  if (typeof (req.params.id) === `undefined`) {
    res.json({
      estado: 0,
      resultado: "debe de enviar el parametro Id en la cadena de consulta"
    })
  } else {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gatitos'
    });
    connection.connect();
    connection.query(`delete  from tdg where ID = ${req.params.id}`, function (error, results, fields) {
      //para validar si el id que pusierin no esta, si esta mal la forma de la consulta en la linea 26, si no pueron id
      if (error) {
        res.json({ estado: 0, resultado: error.sqlMessage });

      } else {
        if (results.affectedRows == 1) {
          res.json({ estado: 1, resultado: "Gatito borrado" });

        } else {
          res.json({ estado: 0, resultado: "ocurrio un error en la eliminacion" });
        }
      }
    });
    connection.end();
  }
})

//ALTA
app.post('/tdg', (req, res) => {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gatitos'
  });

  let sentenciasql = "insert into tdg values(" + req.body.ID + "," +
    "'" + req.body.Nombre + "'," +
    "'" + req.body.Raza + "'," +
    "'" + req.body.Peso + "'," +
    "'" + req.body.Edad + "'," +
    "'" + req.body.Color + "'" + ")";

  console.log(sentenciasql);
  connection.connect();
  connection.query(sentenciasql, function (error, results, fields) {
    if (error) {
      res.json(error);

    } else {
      console.log(results);
      res.json(results);
    }
  });
  connection.end();
})

//MODIFICAR
app.put('/tdg/:id', (req, res) => {

  let sentenciaSQL = "update tdg set " +
    "Nombre='" + req.body.Nombre + "'," +
    "Raza='" + req.body.Raza + "'," +
    "Peso='" + req.body.Peso + "'," +
    "Edad='" + req.body.Edad + "'," +
    "Color='" + req.body.Color + "'" + "where ID=" + req.params.id;

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gatitos'
  });
  connection.connect();
  connection.query(sentenciaSQL, function (error, results, fields) {
    if (error) {
      res.json(error);
    } else {
      console.log(results);
      if (results.affectedRows == 1) {
        res.json({
          estado: 1,
          resultado: "Gatito Modificado"
        });
      } else {
        res.json({
          estado: 1,
          resultado: "Ocurrio un error"
        });
      }
    }
  });
  connection.end();
});

app.post('/', (req, res) => {
  res.json({ respuesta: "Respuesta a peticion get" })
})

app.listen(8082, (req, res) => {
})
console.log('Servidor express escuchando en puerto 8082')