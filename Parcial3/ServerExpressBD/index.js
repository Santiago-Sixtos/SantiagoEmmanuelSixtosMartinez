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
 
app.get('/tdg', (req, res) => {
 
  connection.query('SELECT * FROM tdg', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
      return;
    }
 
 
    res.json(results);
  });
});
 
 
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const { error } = require('console');
