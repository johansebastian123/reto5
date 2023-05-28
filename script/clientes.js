const inputtablebody = document.getElementById("inputtablebody")
const inputId = document.getElementById("inputId")
const inputNombre = document.getElementById("inputNombre")
const inputCorreo = document.getElementById("inputCorreo")
const inputContraseña = document.getElementById("inputContraseña")
const inputEdad = document.getElementById("inputEdad")
const contenedorId = document.getElementById("contenedorId")

const btnsAgregar = document.getElementsByClassName("btn-agregar")
const btnsDetalles = document.getElementsByClassName("btn-detalles")

function btnAgregar(){
    btnsAgregar[0].style.display = 'block'
    btnsDetalles[0].style.display = 'none'
    btnsDetalles[1].style.display = 'none'
    inputId.style.display = 'none'
    contenedorId.style.display = 'none'

    limpiarInput()
}

function btnDetalles(id){
    btnsAgregar[0].style.display = 'none'
    btnsDetalles[0].style.display = 'block'
    btnsDetalles[1].style.display = 'block'
    inputId.style.display = 'block'
    contenedorId.style.display = 'block'

    obtenerPorId(id)
}

function crear(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": inputNombre.value,
    "email": inputCorreo.value,
    "password": inputContraseña.value,
    "age": inputEdad.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:8090/api/Client/save", requestOptions)
    .then(response => {
        console.log(response)
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8090/api/Client/all", requestOptions)
        .then(response => response.json())
        .then(result => {
            result.forEach(element => {
                tablebody.innerHTML +=
                `
                    <tr>
                        <td>${element.name}</td>
                        <td>${element.email}</td>
                        <td>${element.age}</td>
                        <td><button type="button" class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetalles(${element.idClient})">
                            Detalles
                        </button>
                        </td>
                    </tr>
                `
            });
        })
        .catch(error => console.log('error', error));
}

function obtenerPorId(id){
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
      };
      
      fetch(`http://localhost:8090/api/Client/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result){
                inputId.value = result.idClient
                inputNombre.value = result.name
                inputCorreo.value = result.email
                inputContraseña.value = result.password
                inputEdad.value = result.age
            }
        })
        .catch(error => console.log('error', error));
}

function eliminarPorId(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8090/api/Client/${inputId.value}`, requestOptions)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(error => console.log('error', error));
}

function actualizarPorId(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "idClient": inputId.value,
  "name": inputNombre.value,
  "email": inputCorreo.value,
  "password": inputContraseña.value,
  "age": inputEdad.value
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8090/api/Client/update", requestOptions)
  .then(response => {
    console.log(response)
    window.location.reload()
  })
  .catch(error => console.log('error', error));
}

function limpiarInput(){
    inputId.value = null
    inputNombre.value = null 
    inputCorreo.value = null
    inputContraseña.value = null
    inputEdad.value = null
}

obtener()