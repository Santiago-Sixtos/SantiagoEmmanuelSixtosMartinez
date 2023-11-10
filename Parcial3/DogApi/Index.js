window.onload = function () {
fetch ("https://dog.ceo/api/breeds/list/all")
    .then(Response => Response.json())
    .then(function(dato) {
        for (const Propiedad in dato.message) {
            let opcion = document.createElement("opcion");
            opcion.value = Propiedad;
            opcion.innerText = Propiedad;
            document.getElementById("Razas").appendChild(opcion);
        }
    });
}

document.getElementById("Btn1").addEventListener("click", () => {
    let opcion = document.getElementById("Razas").value;
    fetch(`https://dog.ceo/api/breed/${opcion}/images/random`)
    .then(Response => Response.json())
    .then(function(dato) {
        document.getElementById("FotoPerro").src = dato.message;
    })
    .catch(error => {
        console.error("Error en la web", error);
    });
})