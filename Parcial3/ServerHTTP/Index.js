const http = require('http');

const server = http.createServer((req, res)=>{
    res.write("Servidor http de Node contestando a petiicion get");
});
server.listen(8802,()=>{
    console.log("Servidor Node corriendo correctamente")
});