const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
 
const app = express();
const port = 8082;
 
// Configuración de CORS
app.use(cors());
 
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gatitos',
  port: 3306,
});
 
// obtener informacion
app.get('/tdg', (req, res) => {
 
  connection.query('SELECT * FROM tdg', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener datos de gatitos' });
      return;
    } 
    res.json(results);
  });
});

// Enviar datos
app.post('/tdg', (req, res) => {
 const nuevoGatito = req.body;
  connection.query('SELECT * FROM tdg', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener datos de gatitos' });
      return;
    }
    res.json(results);
  });
});
 
 
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const { error } = require('console');
